/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameSaveSchema, CharacterData, HeroClass } from '../types/game';
import { assignQuestionVariantsForCharacter } from './questionEngine';

const STORAGE_KEY = 'hanh_trinh_tri_thuc_save_v1';
const CURRENT_SCHEMA_VERSION = 1;

export function loadGameData(): GameSaveSchema {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getEmptySaveSchema();
    }
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.schemaVersion) {
      return parsed as GameSaveSchema;
    }
  } catch (err) {
    console.error('Failed to parse save game from localStorage:', err);
  }
  return getEmptySaveSchema();
}

export function saveGameData(data: GameSaveSchema): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save game to localStorage:', err);
  }
}

export function getEmptySaveSchema(): GameSaveSchema {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    activeCharacterId: null,
    characters: {},
    backupCharacter: null
  };
}

export function createNewCharacter(
  name: string,
  classGroup: string,
  heroClass: HeroClass
): CharacterData {
  const characterId = 'char_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  
  const newChar: CharacterData = {
    profile: {
      characterId,
      name: name.trim() || 'Hiệp Sĩ Trẻ',
      classGroup: classGroup.trim() || 'Lớp 7',
      heroClass,
      createdAt: Date.now()
    },
    stats: {
      level: 1,
      exp: 0,
      gold: 0,
      hp: 2,
      maxHp: 2
    },
    titles: {
      systemTitleId: 'Tân Binh Tri Thức',
      customTitle: null
    },
    inventory: {
      activeItems: {},
      passiveItems: {},
      activeEffects: {}
    },
    journey: {
      chapterId: 1,
      stageId: 1,
      completedStages: [],
      unlockedStages: ['1-1'],
      failedQuestions: []
    },
    questionVariantsAssigned: assignQuestionVariantsForCharacter(characterId),
    session: {
      currentChapterId: 1,
      currentStageId: 1,
      selectedCardType: null,
      attemptId: null,
      deadlineTimestamp: null,
      isSecondChance: false,
      isShieldProtected: false,
      isParallelWorld: false,
      parallelIndex: 0
    }
  };

  return newChar;
}

export function exportSaveToFile(data: GameSaveSchema): void {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  const activeChar = data.activeCharacterId ? data.characters[data.activeCharacterId] : null;
  const charName = activeChar ? activeChar.profile.name.replace(/\s+/g, '_') : 'HanhTrinhTriThuc';
  downloadAnchor.setAttribute('download', `${charName}_SaveData.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importSaveFromFile(file: File): Promise<GameSaveSchema> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed && parsed.schemaVersion && parsed.characters) {
          resolve(parsed as GameSaveSchema);
        } else {
          reject(new Error('Định dạng file lưu không hợp lệ!'));
        }
      } catch {
        reject(new Error('Không thể đọc file JSON lưu trữ!'));
      }
    };
    reader.onerror = () => reject(new Error('Lỗi khi đọc file!'));
    reader.readAsText(file);
  });
}
