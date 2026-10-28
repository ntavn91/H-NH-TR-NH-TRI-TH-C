/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SystemTitle, HeroClass } from '../types/game';

export const SYSTEM_TITLES: SystemTitle[] = [
  { level: 1, minExp: 0, title: 'Tân Binh Tri Thức' },
  { level: 2, minExp: 300, title: 'Học Đồ Khai Trí' },
  { level: 3, minExp: 700, title: 'Kẻ Tìm Đường' },
  { level: 4, minExp: 1200, title: 'Nhà Thám Hiểm' },
  { level: 5, minExp: 1800, title: 'Hành Giả Tinh Anh' },
  { level: 6, minExp: 2500, title: 'Trí Giả Toán Học' },
  { level: 7, minExp: 3300, title: 'Bậc Thầy Giải Đố' },
  { level: 8, minExp: 4200, title: 'Hiền Giả Tri Thức' },
  { level: 9, minExp: 5200, title: 'Đại Hiền Giả' },
  { level: 10, minExp: 6300, title: 'Huyền Thoại Tri Thức' },
  { level: 11, minExp: 7500, title: 'Chúa Tể Tri Thức' },
  { level: 12, minExp: 8800, title: 'Thần Trí Tuệ' },
];

export function calculateLevelFromExp(exp: number): { level: number; title: string; nextExp: number; currentLevelExp: number } {
  let currentLevel = 1;
  let currentTitle = SYSTEM_TITLES[0].title;
  let currentLevelExp = 0;
  let nextExp = SYSTEM_TITLES[1].minExp;

  for (let i = SYSTEM_TITLES.length - 1; i >= 0; i--) {
    if (exp >= SYSTEM_TITLES[i].minExp) {
      currentLevel = SYSTEM_TITLES[i].level;
      currentTitle = SYSTEM_TITLES[i].title;
      currentLevelExp = SYSTEM_TITLES[i].minExp;
      nextExp = i < SYSTEM_TITLES.length - 1 ? SYSTEM_TITLES[i + 1].minExp : SYSTEM_TITLES[i].minExp + 1500;
      break;
    }
  }

  return { level: currentLevel, title: currentTitle, nextExp, currentLevelExp };
}

export function getMaxHpForLevel(heroClass: HeroClass, level: number): number {
  const baseHp = 2;
  const levelGains = level - 1;
  if (heroClass === 'knight') {
    return baseHp + levelGains * 2;
  }
  // mage and light_monk get +1 max hp per level
  return baseHp + levelGains * 1;
}
