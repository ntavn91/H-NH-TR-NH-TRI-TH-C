/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HeroClass } from '../types/game';

export interface HeroPortraitMeta {
  image: string;
  classNameVi: string;
  auraColor: string;
  glowColor: string;
  accentBorder: string;
  description: string;
}

export const HERO_PORTRAITS: Record<HeroClass, HeroPortraitMeta> = {
  knight: {
    image: '/src/assets/images/portrait_knight_1793446357710.jpg',
    classNameVi: 'Hiệp sĩ Thép Lam',
    auraColor: 'from-blue-600/30 to-cyan-400/20',
    glowColor: 'shadow-cyan-500/40',
    accentBorder: 'border-cyan-400',
    description: 'Giáp thép xanh bạc, khiên và kiếm kiên định với ánh sáng bảo vệ màu lam.',
  },
  mage: {
    image: '/src/assets/images/portrait_mage_1793446369321.jpg',
    classNameVi: 'Pháp sư Ma Trận',
    auraColor: 'from-purple-600/30 to-fuchsia-400/20',
    glowColor: 'shadow-purple-500/40',
    accentBorder: 'border-purple-400',
    description: 'Trang phục tím thần bí, trượng phép xoay quanh những ký hiệu toán học lơ lửng.',
  },
  light_monk: {
    image: '/src/assets/images/portrait_monk_1793446381448.jpg',
    classNameVi: 'Tu sĩ Ánh Sáng',
    auraColor: 'from-amber-600/30 to-yellow-400/20',
    glowColor: 'shadow-amber-500/40',
    accentBorder: 'border-amber-400',
    description: 'Trang phục trắng vàng, vầng hào quang thái dương chữa lành và hồi phục sinh lực.',
  },
};
