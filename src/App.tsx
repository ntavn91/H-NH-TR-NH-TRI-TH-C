/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  CharacterData,
  GameSaveSchema,
  HeroClass,
  ItemDefinition,
  QuestionVariant,
  QuestionOption,
  FailedQuestionRecord,
} from './types/game';
import {
  loadGameData,
  saveGameData,
  createNewCharacter,
  exportSaveToFile,
  importSaveFromFile,
} from './utils/storage';
import { sound } from './utils/sound';
import { calculateLevelFromExp, getMaxHpForLevel } from './data/titles';
import { CHAPTERS, STAGES_BY_CHAPTER } from './data/chapters';
import { getQuestionById } from './data/questionsBank';
import { getCharacterVariant, prepareOptionsForDisplay, generateDynamicQuestionVariant } from './utils/questionEngine';

// Components
import { WelcomeScreen } from './components/WelcomeScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { TopHUD } from './components/TopHUD';
import { MapTab } from './components/MapTab';
import { ShopTab } from './components/ShopTab';
import { CharacterTab } from './components/CharacterTab';
import { CardSelectModal } from './components/CardSelectModal';
import { QuestionModal } from './components/QuestionModal';
import { ResultModal, ResultType } from './components/ResultModal';
import { ParallelWorldModal } from './components/ParallelWorldModal';
import { StoryModal } from './components/StoryModal';
import { GameOverModal } from './components/GameOverModal';
import { LevelUpModal } from './components/LevelUpModal';
import { MusicGeneratorModal } from './components/MusicGeneratorModal';

export default function App() {
  const [saveData, setSaveData] = useState<GameSaveSchema>(() => loadGameData());
  const [currentScreen, setCurrentScreen] = useState<
    'WELCOME' | 'PROFILE' | 'HUB' | 'CARD_SELECT' | 'QUESTION' | 'RESULT' | 'PARALLEL' | 'STORY' | 'GAME_OVER'
  >('WELCOME');
  const [activeHubTab, setActiveHubTab] = useState<'map' | 'shop' | 'character'>('map');
  const [isMuted, setIsMuted] = useState<boolean>(sound.getIsMuted());
  const [volume, setVolume] = useState<number>(() => sound.getVolume());
  const [isMusicStudioOpen, setIsMusicStudioOpen] = useState<boolean>(false);

  const handleVolumeChange = (newVol: number) => {
    sound.setVolume(newVol);
    setVolume(newVol);
  };

  // Level Up Celebration state
  const [levelUpData, setLevelUpData] = useState<{
    level: number;
    title: string;
    currentHp: number;
    maxHp: number;
  } | null>(null);

  // Active question runtime state
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [activeCardType, setActiveCardType] = useState<'light' | 'dark'>('light');
  const [activeVariant, setActiveVariant] = useState<QuestionVariant | null>(null);
  const [activeOptions, setActiveOptions] = useState<QuestionOption[]>([]);
  const [activeCorrectOptionId, setActiveCorrectOptionId] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [isSecondChanceAttempt, setIsSecondChanceAttempt] = useState<boolean>(false);
  const [isParallelActive, setIsParallelActive] = useState<boolean>(false);
  const [currentFailedRecord, setCurrentFailedRecord] = useState<FailedQuestionRecord | null>(null);

  // Result state
  const [resultType, setResultType] = useState<ResultType>('correct');
  const [expGained, setExpGained] = useState<number>(0);
  const [goldGained, setGoldGained] = useState<number>(0);
  const [hpLost, setHpLost] = useState<number>(0);

  // Story Modal state
  const [storyContent, setStoryContent] = useState<{
    title: string;
    subtitle: string;
    paragraphs: string[];
    bgImage?: string;
  } | null>(null);

  // File input ref for importing JSON save file
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active character helper
  const activeChar: CharacterData | null =
    saveData.activeCharacterId && saveData.characters[saveData.activeCharacterId]
      ? saveData.characters[saveData.activeCharacterId]
      : null;

  // Persist save data on state changes
  useEffect(() => {
    saveGameData(saveData);
  }, [saveData]);

  // Handle ambient chapter music
  useEffect(() => {
    if (currentScreen === 'HUB') {
      sound.startChapterBGM(activeChapterId);
    } else if (currentScreen === 'WELCOME' || currentScreen === 'PROFILE' || currentScreen === 'GAME_OVER') {
      sound.stopBGM();
    }
  }, [currentScreen, activeChapterId]);

  // Toggle Mute
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Switch Character Profile
  const handleSelectCharacter = (charId: string) => {
    setSaveData((prev) => ({
      ...prev,
      activeCharacterId: charId,
    }));
    const char = saveData.characters[charId];
    if (char) {
      setActiveChapterId(char.journey.chapterId || 1);
    }
    setCurrentScreen('HUB');
  };

  // Create new character
  const handleCreateNewCharacter = (name: string, classGroup: string, heroClass: HeroClass) => {
    const newChar = createNewCharacter(name, classGroup, heroClass);
    setSaveData((prev) => ({
      ...prev,
      backupCharacter: activeChar ? { ...activeChar } : prev.backupCharacter,
      activeCharacterId: newChar.profile.characterId,
      characters: {
        ...prev.characters,
        [newChar.profile.characterId]: newChar,
      },
    }));
    setActiveChapterId(1);
    setCurrentScreen('HUB');
    // Open chapter 1 intro story
    const ch1 = CHAPTERS[0];
    setStoryContent({
      title: ch1.name,
      subtitle: 'Khởi đầu cuộc phiêu lưu',
      paragraphs: ch1.storyIntro,
      bgImage: ch1.bgImage,
    });
    setCurrentScreen('STORY');
  };

  // Restore backup character
  const handleRestoreBackup = () => {
    if (!saveData.backupCharacter) return;
    const backup = saveData.backupCharacter;
    setSaveData((prev) => ({
      ...prev,
      activeCharacterId: backup.profile.characterId,
      characters: {
        ...prev.characters,
        [backup.profile.characterId]: backup,
      },
    }));
    setActiveChapterId(backup.journey.chapterId || 1);
    setCurrentScreen('HUB');
  };

  // File Export
  const handleExportSave = () => {
    exportSaveToFile(saveData);
  };

  // File Import trigger
  const handleImportFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importSaveFromFile(file);
      setSaveData(imported);
      sound.playLevelUp();
      alert('Tải file tiến trình thành công!');
      if (imported.activeCharacterId && imported.characters[imported.activeCharacterId]) {
        setCurrentScreen('HUB');
      } else {
        setCurrentScreen('PROFILE');
      }
    } catch (err: unknown) {
      alert((err as Error).message || 'Lỗi khi nhập file');
    }
  };

  // Enter a Stage from Map
  const handleEnterStage = (chapterId: number, stageId: number) => {
    if (!activeChar) return;
    setActiveChapterId(chapterId);
    setActiveStageId(stageId);
    setIsParallelActive(false);
    setCurrentFailedRecord(null);
    setIsSecondChanceAttempt(false);
    setCurrentScreen('CARD_SELECT');
  };

  // Card confirmed -> start question
  const handleConfirmCardChoice = (cardType: 'light' | 'dark') => {
    if (!activeChar) return;
    setActiveCardType(cardType);

    const stages = STAGES_BY_CHAPTER[activeChapterId] || [];
    const stage = stages.find((s) => s.stageId === activeStageId) || stages[0];
    const qDef = getQuestionById(stage.questionId);

    if (!qDef) return;

    // Generate fresh dynamic variant using RandomInt(-50, 50) for diversity
    const dynamicVariant = generateDynamicQuestionVariant(qDef.questionId);
    const assignedVariantId = activeChar.questionVariantsAssigned[qDef.questionId];
    const variant = dynamicVariant || getCharacterVariant(qDef, assignedVariantId);
    const { options, correctId } = prepareOptionsForDisplay(variant, cardType);

    setActiveVariant(variant);
    setActiveOptions(options);
    setActiveCorrectOptionId(correctId);
    setCurrentScreen('QUESTION');
  };

  // Start question from Parallel World
  const handleSolveParallelQuestion = (rec: FailedQuestionRecord) => {
    if (!activeChar) return;
    const qDef = getQuestionById(rec.questionId);
    if (!qDef) return;

    const variant = getCharacterVariant(qDef, rec.variantId);
    // In parallel world, always standard 4 options for true redemption
    const { options, correctId } = prepareOptionsForDisplay(variant, 'dark');

    setActiveVariant(variant);
    setActiveOptions(options);
    setActiveCorrectOptionId(correctId);
    setIsParallelActive(true);
    setCurrentFailedRecord(rec);
    setIsSecondChanceAttempt(false);
    setCurrentScreen('QUESTION');
  };

  // Activate Item during question or card
  const handleUseItemDuringQuestion = (itemId: string) => {
    if (!activeChar) return;
    const currentCount = activeChar.inventory.activeItems[itemId] || 0;
    if (currentCount <= 0) return;

    setSaveData((prev) => {
      const char = prev.characters[prev.activeCharacterId!];
      return {
        ...prev,
        characters: {
          ...prev.characters,
          [char.profile.characterId]: {
            ...char,
            inventory: {
              ...char.inventory,
              activeItems: {
                ...char.inventory.activeItems,
                [itemId]: currentCount - 1,
              },
              activeEffects:
                itemId === 'heart_shield'
                  ? { ...char.inventory.activeEffects, heart_shield: true }
                  : char.inventory.activeEffects,
            },
          },
        },
      };
    });
  };

  // Use Fate Card in CardSelectModal
  const handleUseFateCard = () => {
    if (!activeChar) return;
    const currentCount = activeChar.inventory.activeItems['fate_card'] || 0;
    if (currentCount <= 0) return;

    setSaveData((prev) => {
      const char = prev.characters[prev.activeCharacterId!];
      return {
        ...prev,
        characters: {
          ...prev.characters,
          [char.profile.characterId]: {
            ...char,
            inventory: {
              ...char.inventory,
              activeItems: {
                ...char.inventory.activeItems,
                fate_card: currentCount - 1,
              },
            },
          },
        },
      };
    });
  };

  // Skip Question via Pass Token
  const handleSkipQuestion = () => {
    if (!activeChar) return;
    handleUseItemDuringQuestion('pass_token');

    // Skipping awards no exp/gold, loses no HP, adds no failed record
    const stageKey = `${activeChapterId}-${activeStageId}`;
    setSaveData((prev) => {
      const char = prev.characters[prev.activeCharacterId!];
      const completed = char.journey.completedStages.includes(stageKey)
        ? char.journey.completedStages
        : [...char.journey.completedStages, stageKey];
      return {
        ...prev,
        characters: {
          ...prev.characters,
          [char.profile.characterId]: {
            ...char,
            journey: {
              ...char.journey,
              completedStages: completed,
            },
          },
        },
      };
    });

    setResultType('skipped');
    setExpGained(0);
    setGoldGained(0);
    setHpLost(0);
    setCurrentScreen('RESULT');
  };

  // Process Quiz Answer
  const handleAnswerQuestion = (selectedOptionId: 'A' | 'B' | 'C' | 'D', isTimeout: boolean) => {
    if (!activeChar || !activeVariant) return;

    const isCorrect = !isTimeout && selectedOptionId === activeCorrectOptionId;
    const hasShield = Boolean(activeChar.inventory.activeEffects['heart_shield']);

    // Check second chance (Linh Vũ Hồi Đáp)
    const hasPhoenixFeather = (activeChar.inventory.activeItems['phoenix_feather'] || 0) > 0;
    const canUsePhoenix = !isCorrect && !isSecondChanceAttempt && hasPhoenixFeather && !isParallelActive;

    if (isParallelActive && currentFailedRecord) {
      // Parallel World Resolution
      if (isCorrect) {
        sound.playCorrect();
        // Remove from pending failed list
        setSaveData((prev) => {
          const char = prev.characters[prev.activeCharacterId!];
          const updatedFailed = char.journey.failedQuestions.filter(
            (q) => !(q.questionId === currentFailedRecord.questionId && q.variantId === currentFailedRecord.variantId)
          );
          return {
            ...prev,
            characters: {
              ...prev.characters,
              [char.profile.characterId]: {
                ...char,
                journey: {
                  ...char.journey,
                  failedQuestions: updatedFailed,
                },
              },
            },
          };
        });
        setResultType('parallel_correct');
        setExpGained(0);
        setGoldGained(0);
        setHpLost(0);
      } else {
        sound.playWrong();
        // Wrong in Parallel: lose 1 HP, keep record
        const newHp = Math.max(0, activeChar.stats.hp - 1);
        setSaveData((prev) => {
          const char = prev.characters[prev.activeCharacterId!];
          return {
            ...prev,
            characters: {
              ...prev.characters,
              [char.profile.characterId]: {
                ...char,
                stats: { ...char.stats, hp: newHp },
              },
            },
          };
        });
        setResultType('parallel_wrong');
        setExpGained(0);
        setGoldGained(0);
        setHpLost(1);
      }
      setCurrentScreen('RESULT');
      return;
    }

    // Main Journey Resolution
    if (isCorrect) {
      sound.playCorrect();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

      const stageKey = `${activeChapterId}-${activeStageId}`;
      const isReplay = activeChar.journey.completedStages.includes(stageKey);

      const hasAncientTome = Boolean(activeChar.inventory.passiveItems['ancient_tome']);
      const hasLuckyPouch = Boolean(activeChar.inventory.passiveItems['lucky_pouch']);

      // Requirement 6: Replaying an already cleared stage yields 0 EXP, 10 Gold (11 with Túi Vàng May Mắn)
      // First clear: 100 EXP (115 with Cổ Thư), 100 Gold (110 with Túi Vàng)
      const baseExp = isReplay ? 0 : (hasAncientTome ? 115 : 100);
      const baseGold = isReplay
        ? (hasLuckyPouch ? 11 : 10)
        : (hasLuckyPouch ? 110 : 100);

      const newExp = activeChar.stats.exp + baseExp;
      const newGold = activeChar.stats.gold + baseGold;
      const { level: newLevel, title: newTitle } = calculateLevelFromExp(newExp);
      const levelGained = newLevel > activeChar.stats.level;
      const levelsDiff = newLevel - activeChar.stats.level;

      // User requirement 4: HP +1 and Max HP +1 upon level up
      const newMaxHp = activeChar.stats.maxHp + (levelsDiff > 0 ? levelsDiff : 0);
      const newHp = Math.min(newMaxHp, activeChar.stats.hp + (levelsDiff > 0 ? levelsDiff : 0));

      if (levelGained) {
        setLevelUpData({
          level: newLevel,
          title: newTitle,
          currentHp: newHp,
          maxHp: newMaxHp,
        });
      }

      setSaveData((prev) => {
        const char = prev.characters[prev.activeCharacterId!];
        const completed = char.journey.completedStages.includes(stageKey)
          ? char.journey.completedStages
          : [...char.journey.completedStages, stageKey];

        return {
          ...prev,
          characters: {
            ...prev.characters,
            [char.profile.characterId]: {
              ...char,
              stats: {
                ...char.stats,
                exp: newExp,
                gold: newGold,
                level: newLevel,
                maxHp: newMaxHp,
                hp: newHp,
              },
              journey: {
                ...char.journey,
                completedStages: completed,
              },
              inventory: {
                ...char.inventory,
                activeEffects: {}, // Reset shield effect
              },
            },
          },
        };
      });

      setResultType('correct');
      setExpGained(baseExp);
      setGoldGained(baseGold);
      setHpLost(0);
    } else {
      // Wrong or timeout
      sound.playWrong();

      const stageKey = `${activeChapterId}-${activeStageId}`;

      if (hasShield) {
        // Shield protected! No HP lost, not added to Parallel World, still advances stage
        setSaveData((prev) => {
          const char = prev.characters[prev.activeCharacterId!];
          const completed = char.journey.completedStages.includes(stageKey)
            ? char.journey.completedStages
            : [...char.journey.completedStages, stageKey];

          return {
            ...prev,
            characters: {
              ...prev.characters,
              [char.profile.characterId]: {
                ...char,
                journey: {
                  ...char.journey,
                  completedStages: completed,
                },
                inventory: {
                  ...char.inventory,
                  activeEffects: {}, // Consumed shield
                },
              },
            },
          };
        });
        setResultType('shield_saved');
        setExpGained(0);
        setGoldGained(0);
        setHpLost(0);
      } else {
        // Normal penalty: -1 HP, added to Parallel World, player STILL advances to next stage
        const newHp = Math.max(0, activeChar.stats.hp - 1);
        const stages = STAGES_BY_CHAPTER[activeChapterId] || [];
        const currentStage = stages.find((s) => s.stageId === activeStageId) || stages[0];

        setSaveData((prev) => {
          const char = prev.characters[prev.activeCharacterId!];
          const completed = char.journey.completedStages.includes(stageKey)
            ? char.journey.completedStages
            : [...char.journey.completedStages, stageKey];

          const alreadyInFailed = char.journey.failedQuestions.some(
            (q) => q.questionId === currentStage.questionId && q.variantId === activeVariant.variantId && q.status === 'pending'
          );

          const updatedFailed: FailedQuestionRecord[] = alreadyInFailed
            ? char.journey.failedQuestions
            : [
                ...char.journey.failedQuestions,
                {
                  questionId: currentStage.questionId,
                  variantId: activeVariant.variantId,
                  sourceChapterId: activeChapterId,
                  sourceStageId: activeStageId,
                  status: 'pending',
                  firstFailedAt: Date.now(),
                },
              ];

          return {
            ...prev,
            characters: {
              ...prev.characters,
              [char.profile.characterId]: {
                ...char,
                stats: {
                  ...char.stats,
                  hp: newHp,
                },
                journey: {
                  ...char.journey,
                  completedStages: completed,
                  failedQuestions: updatedFailed,
                },
                inventory: {
                  ...char.inventory,
                  activeEffects: {},
                },
              },
            },
          };
        });

        setResultType(isTimeout ? 'timeout' : 'wrong');
        setExpGained(0);
        setGoldGained(0);
        setHpLost(1);
      }
    }

    setCurrentScreen('RESULT');
  };

  // Linh Vũ Hồi Đáp: Try question again
  const handleUseSecondChance = () => {
    if (!activeChar || !activeVariant) return;
    handleUseItemDuringQuestion('phoenix_feather');
    setIsSecondChanceAttempt(true);
    // Generate new options order
    const { options, correctId } = prepareOptionsForDisplay(activeVariant, activeCardType);
    setActiveOptions(options);
    setActiveCorrectOptionId(correctId);
    setCurrentScreen('QUESTION');
  };

  // Continue after result modal
  const handleContinueAfterResult = () => {
    if (!activeChar) return;

    // Check if dead
    if (activeChar.stats.hp <= 0) {
      sound.playGameOver();
      setCurrentScreen('GAME_OVER');
      return;
    }

    // Check if Boss of chapter was just defeated
    const stages = STAGES_BY_CHAPTER[activeChapterId] || [];
    const currentStage = stages.find((s) => s.stageId === activeStageId);

    if (currentStage?.isBoss && resultType === 'correct') {
      sound.playVictory();
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } });

      const currentCh = CHAPTERS.find((c) => c.chapterId === activeChapterId);
      const pendingFromCurrentCh = activeChar.journey.failedQuestions.filter(
        (q) => q.status === 'pending' && q.sourceChapterId === activeChapterId
      );

      if (pendingFromCurrentCh.length > 0) {
        // Must clear Parallel World first
        setStoryContent({
          title: `HẠ GỤC ${currentStage.bossName?.toUpperCase() || 'TRÙM'}!`,
          subtitle: 'Cổng tiếp theo bị phong ấn bởi những câu sai trong quá khứ!',
          paragraphs: [
            `Bạn đã dũng cảm đánh bại ${currentStage.bossName}!`,
            `Tuy nhiên, các tàn dư sai sót trong quá khứ đang cộng hưởng tạo thành kết giới ngăn lối đi.`,
            `Hãy tiến vào Thế Giới Song Song và giải phóng tất cả các câu sai để mở khóa vùng đất tiếp theo!`,
          ],
          bgImage: currentCh?.bgImage,
        });
        setCurrentScreen('STORY');
        return;
      } else {
        // No failed questions, celebrate and unlock next chapter!
        setStoryContent({
          title: `CHINH PHỤC TOÀN DIỆN ${currentCh?.name.toUpperCase()}!`,
          subtitle: 'Không một tàn dư sai sót nào cản bước bạn!',
          paragraphs: currentCh?.storyCompletion || [
            'Bạn đã hoàn thành xuất sắc toàn bộ thử thách của vùng đất này!',
          ],
          bgImage: currentCh?.bgImage,
        });
        setCurrentScreen('STORY');
        return;
      }
    }

    // If we were in Parallel World, return to Parallel World modal
    if (isParallelActive) {
      setCurrentScreen('PARALLEL');
      return;
    }

    // Return to Map
    setCurrentScreen('HUB');
  };

  // Buy Item in Shop
  const handleBuyItem = (item: ItemDefinition) => {
    if (!activeChar) return;

    setSaveData((prev) => {
      const char = prev.characters[prev.activeCharacterId!];
      const newGold = char.stats.gold - item.price;

      if (item.id === 'life_stone') {
        // Special life stone: Max HP +1 AND heal +1 HP
        const newMaxHp = char.stats.maxHp + 1;
        const newHp = Math.min(newMaxHp, char.stats.hp + 1);
        return {
          ...prev,
          characters: {
            ...prev.characters,
            [char.profile.characterId]: {
              ...char,
              stats: {
                ...char.stats,
                gold: newGold,
                maxHp: newMaxHp,
                hp: newHp,
              },
            },
          },
        };
      }

      if (item.category === 'passive') {
        return {
          ...prev,
          characters: {
            ...prev.characters,
            [char.profile.characterId]: {
              ...char,
              stats: { ...char.stats, gold: newGold },
              inventory: {
                ...char.inventory,
                passiveItems: {
                  ...char.inventory.passiveItems,
                  [item.id]: true,
                },
              },
            },
          },
        };
      } else {
        // Active item
        const prevCount = char.inventory.activeItems[item.id] || 0;
        return {
          ...prev,
          characters: {
            ...prev.characters,
            [char.profile.characterId]: {
              ...char,
              stats: { ...char.stats, gold: newGold },
              inventory: {
                ...char.inventory,
                activeItems: {
                  ...char.inventory.activeItems,
                  [item.id]: prevCount + 1,
                },
              },
            },
          },
        };
      }
    });
  };

  // Update Custom Title
  const handleUpdateCustomTitle = (newTitle: string) => {
    if (!activeChar) return;
    setSaveData((prev) => {
      const char = prev.characters[prev.activeCharacterId!];
      return {
        ...prev,
        characters: {
          ...prev.characters,
          [char.profile.characterId]: {
            ...char,
            titles: {
              ...char.titles,
              customTitle: newTitle || null,
            },
          },
        },
      };
    });
  };

  // Add new custom title (consumes 1 freedom_seal)
  const handleAddNewCustomTitle = (newTitle: string) => {
    if (!activeChar) return;
    const currentSeals = activeChar.inventory.activeItems['freedom_seal'] || 0;
    if (currentSeals <= 0) return;

    setSaveData((prev) => {
      const char = prev.characters[prev.activeCharacterId!];
      const existingList = char.titles.customTitlesList || (char.titles.customTitle ? [char.titles.customTitle] : []);
      const updatedList = existingList.includes(newTitle) ? existingList : [...existingList, newTitle];

      return {
        ...prev,
        characters: {
          ...prev.characters,
          [char.profile.characterId]: {
            ...char,
            inventory: {
              ...char.inventory,
              activeItems: {
                ...char.inventory.activeItems,
                freedom_seal: Math.max(0, currentSeals - 1),
              },
            },
            titles: {
              ...char.titles,
              customTitlesList: updatedList,
              customTitle: newTitle, // automatically equip the newly created title
            },
          },
        },
      };
    });
  };

  // Select / equip a custom title
  const handleSelectCustomTitle = (title: string) => {
    if (!activeChar) return;
    setSaveData((prev) => {
      const char = prev.characters[prev.activeCharacterId!];
      return {
        ...prev,
        characters: {
          ...prev.characters,
          [char.profile.characterId]: {
            ...char,
            titles: {
              ...char.titles,
              customTitle: char.titles.customTitle === title ? null : title,
            },
          },
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#101827] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Hidden file input for import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Screen 1: Welcome Screen */}
      {currentScreen === 'WELCOME' && (
        <WelcomeScreen
          onStart={() => {
            if (activeChar && activeChar.stats.hp > 0) {
              setCurrentScreen('HUB');
            } else {
              setCurrentScreen('PROFILE');
            }
          }}
          hasExistingSave={Boolean(activeChar && activeChar.stats.hp > 0)}
          onContinue={() => setCurrentScreen('HUB')}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onImportFile={handleImportFileClick}
        />
      )}

      {/* Screen 2: Profile Selection & Creation */}
      {currentScreen === 'PROFILE' && (
        <ProfileScreen
          activeCharacter={activeChar}
          backupCharacter={saveData.backupCharacter || null}
          onSelectContinue={() => setCurrentScreen('HUB')}
          onCreateNew={handleCreateNewCharacter}
          onRestoreBackup={handleRestoreBackup}
          onBackToTitle={() => setCurrentScreen('WELCOME')}
          onExportSave={handleExportSave}
          onImportFile={handleImportFileClick}
        />
      )}

      {/* Screen 3: Journey Hub with TopHUD and Tabs */}
      {currentScreen === 'HUB' && activeChar && (
        <div className="flex-1 flex flex-col">
          <TopHUD
            character={activeChar}
            activeTab={activeHubTab}
            onSelectTab={setActiveHubTab}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            onOpenMusicStudio={() => setIsMusicStudioOpen(true)}
            onExportSave={handleExportSave}
            onSwitchProfile={() => setCurrentScreen('PROFILE')}
          />

          <main className="flex-1">
            {activeHubTab === 'map' && (
              <MapTab
                character={activeChar}
                onEnterStage={handleEnterStage}
                onOpenStoryIntro={(chId) => {
                  const ch = CHAPTERS.find((c) => c.chapterId === chId) || CHAPTERS[0];
                  setStoryContent({
                    title: ch.name,
                    subtitle: ch.description,
                    paragraphs: ch.storyIntro,
                    bgImage: ch.bgImage,
                  });
                  setCurrentScreen('STORY');
                }}
                onOpenParallelWorld={() => setCurrentScreen('PARALLEL')}
              />
            )}

            {activeHubTab === 'shop' && (
              <ShopTab character={activeChar} onBuyItem={handleBuyItem} />
            )}

            {activeHubTab === 'character' && (
              <CharacterTab
                character={activeChar}
                onUpdateCustomTitle={handleUpdateCustomTitle}
                onAddNewCustomTitle={handleAddNewCustomTitle}
                onSelectCustomTitle={handleSelectCustomTitle}
              />
            )}
          </main>
        </div>
      )}

      {/* Modal: Card Selection */}
      {currentScreen === 'CARD_SELECT' && activeChar && (
        <CardSelectModal
          heroClass={activeChar.profile.heroClass}
          hasFateCard={(activeChar.inventory.activeItems['fate_card'] || 0) > 0}
          onUseFateCard={handleUseFateCard}
          onConfirmCardChoice={handleConfirmCardChoice}
          stageTitle={`Ải ${activeChapterId}-${activeStageId}`}
        />
      )}

      {/* Modal: Active Question */}
      {currentScreen === 'QUESTION' && activeChar && activeVariant && (
        <QuestionModal
          variant={activeVariant}
          options={activeOptions}
          correctOptionId={activeCorrectOptionId}
          cardType={activeCardType}
          stageTitle={`Ải ${activeChapterId}-${activeStageId}`}
          isBoss={activeStageId === 10}
          bossName={
            STAGES_BY_CHAPTER[activeChapterId]?.find((s) => s.stageId === activeStageId)?.bossName
          }
          character={activeChar}
          isParallelWorld={isParallelActive}
          onAnswer={handleAnswerQuestion}
          onUseItem={handleUseItemDuringQuestion}
          onSkipQuestion={handleSkipQuestion}
        />
      )}

      {/* Modal: Result Feedback */}
      {currentScreen === 'RESULT' && activeChar && (
        <ResultModal
          type={resultType}
          expGained={expGained}
          goldGained={goldGained}
          hpLost={hpLost}
          canUseSecondChance={
            !isSecondChanceAttempt &&
            (resultType === 'wrong' || resultType === 'timeout') &&
            (activeChar.inventory.activeItems['phoenix_feather'] || 0) > 0 &&
            !isParallelActive
          }
          onUseSecondChance={handleUseSecondChance}
          onContinue={handleContinueAfterResult}
          isGameOver={activeChar.stats.hp <= 0}
        />
      )}

      {/* Modal: Parallel World */}
      {currentScreen === 'PARALLEL' && activeChar && (
        <ParallelWorldModal
          character={activeChar}
          onSolveQuestion={handleSolveParallelQuestion}
          onClose={() => setCurrentScreen('HUB')}
        />
      )}

      {/* Modal: Atmospheric Story Frame */}
      {currentScreen === 'STORY' && storyContent && (
        <StoryModal
          title={storyContent.title}
          subtitle={storyContent.subtitle}
          paragraphs={storyContent.paragraphs}
          bgImage={storyContent.bgImage}
          onClose={() => {
            setStoryContent(null);
            setCurrentScreen('HUB');
          }}
        />
      )}

      {/* Modal: Game Over */}
      {currentScreen === 'GAME_OVER' && activeChar && (
        <GameOverModal
          character={activeChar}
          onGoToProfiles={() => setCurrentScreen('PROFILE')}
          onCreateNewHero={() => setCurrentScreen('PROFILE')}
        />
      )}

      {/* Modal: Level Up Celebration */}
      {levelUpData && (
        <LevelUpModal
          level={levelUpData.level}
          title={levelUpData.title}
          currentHp={levelUpData.currentHp}
          maxHp={levelUpData.maxHp}
          onClose={() => setLevelUpData(null)}
        />
      )}

      {/* Modal: AI Music Studio & Volume Master */}
      <MusicGeneratorModal
        isOpen={isMusicStudioOpen}
        onClose={() => setIsMusicStudioOpen(false)}
        currentVolume={volume}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
}
