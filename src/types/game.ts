/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type HeroClass = 'knight' | 'mage' | 'light_monk';

export type GameScreen = 
  | 'TITLE_MENU'
  | 'PROFILE_SELECT'
  | 'HUB_MAP'
  | 'HUB_SHOP'
  | 'HUB_CHARACTER'
  | 'CARD_SELECT'
  | 'QUESTION'
  | 'RESULT_FEEDBACK'
  | 'PARALLEL_WORLD'
  | 'CHAPTER_STORY'
  | 'BOSS_VICTORY'
  | 'GAME_OVER';

export interface CharacterProfile {
  characterId: string;
  name: string;
  classGroup: string; // e.g. "Lớp 7A1"
  heroClass: HeroClass;
  createdAt: number;
}

export interface CharacterStats {
  level: number;
  exp: number;
  gold: number;
  hp: number;
  maxHp: number;
}

export interface SystemTitle {
  level: number;
  minExp: number;
  title: string;
}

export interface ItemDefinition {
  id: string;
  name: string;
  category: 'active' | 'passive';
  price: number;
  description: string;
  icon: string;
  maxPurchases?: number; // 1 for passive items
  effectDescription: string;
}

export interface QuestionOption {
  optionId: 'A' | 'B' | 'C' | 'D';
  latex: string;
  text?: string;
}

export interface QuestionVariant {
  variantId: string;
  questionLatex: string;
  storyContext?: string; // Dẫn truyện ngữ cảnh cho câu hỏi
  options: QuestionOption[];
  correctOptionId: 'A' | 'B' | 'C' | 'D';
  explanationHint?: string; // Chỉ dùng cho ghi chú nội bộ hoặc gợi ý ôn tập
}

export interface QuestionDefinition {
  questionId: string;
  chapterId: number;
  stageId: number;
  topic: string;
  difficulty: 1 | 2 | 3;
  isBoss?: boolean;
  variants: QuestionVariant[];
}

export interface StageDefinition {
  stageId: number;
  chapterId: number;
  title: string;
  subtitle: string;
  description: string;
  isBoss: boolean;
  bossName?: string;
  bossTitle?: string;
  bossImage?: string;
  questionId: string;
}

export interface ChapterDefinition {
  chapterId: number;
  name: string;
  shortName: string;
  description: string;
  bgImage: string;
  stagesCount: number;
  storyIntro: string[];
  storyCompletion: string[];
}

export interface FailedQuestionRecord {
  questionId: string;
  variantId: string;
  sourceChapterId: number;
  sourceStageId: number;
  status: 'pending' | 'resolved';
  firstFailedAt: number;
}

export interface CharacterData {
  profile: CharacterProfile;
  stats: CharacterStats;
  titles: {
    systemTitleId: string;
    customTitle: string | null;
    customTitlesList?: string[];
  };
  inventory: {
    activeItems: Record<string, number>;
    passiveItems: Record<string, boolean>;
    activeEffects: Record<string, boolean>;
  };
  journey: {
    chapterId: number;
    stageId: number;
    completedStages: string[]; // Format: `${chapterId}-${stageId}`
    unlockedStages: string[];  // Format: `${chapterId}-${stageId}`
    failedQuestions: FailedQuestionRecord[];
  };
  questionVariantsAssigned: Record<string, string>; // questionId -> variantId
  questionVariantsCustom?: Record<string, QuestionVariant>; // Cached dynamic variants
  session: {
    currentChapterId: number;
    currentStageId: number;
    selectedCardType: 'light' | 'dark' | null;
    attemptId: string | null;
    deadlineTimestamp: number | null;
    isSecondChance: boolean;
    isShieldProtected: boolean;
    isParallelWorld: boolean;
    parallelIndex: number;
  };
}

export interface GameSaveSchema {
  schemaVersion: number;
  activeCharacterId: string | null;
  characters: Record<string, CharacterData>;
  backupCharacter?: CharacterData | null;
}
