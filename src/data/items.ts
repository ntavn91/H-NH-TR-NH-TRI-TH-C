/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ItemDefinition } from '../types/game';

export const ACTIVE_ITEMS: ItemDefinition[] = [
  {
    id: 'pass_token',
    name: 'Lệnh Bài Vượt Ải',
    category: 'active',
    price: 120,
    description: 'Bỏ qua câu hỏi hiện tại an toàn mà không mất HP hay nhận thưởng.',
    icon: 'Scroll',
    effectDescription: 'Bỏ qua ải hiện tại, không mất HP, không thêm câu vào Thế giới Song Song (không nhận EXP/vàng).'
  },
  {
    id: 'heart_shield',
    name: 'Hộ Tâm Phù',
    category: 'active',
    price: 180,
    description: 'Tạo lớp khiên bảo hộ tâm trí trước khi trả lời câu hỏi.',
    icon: 'Shield',
    effectDescription: 'Kích hoạt trước khi trả lời: Nếu sai hoặc hết giờ, không mất HP và không đưa vào Thế giới Song Song.'
  },
  {
    id: 'fate_card',
    name: 'Thẻ Định Mệnh',
    category: 'active',
    price: 100,
    description: 'Quyền năng nghịch chuyển số phận khi rút trúng thẻ nguy hiểm.',
    icon: 'Sparkles',
    effectDescription: 'Khi chọn phải Thẻ Bóng Tối, cho phép xáo trộn và rút lại một lần trước khi câu hỏi xuất hiện.'
  },
  {
    id: 'phoenix_feather',
    name: 'Linh Vũ Hồi Đáp',
    category: 'active',
    price: 250,
    description: 'Lông vũ thần kỳ ban cơ hội thứ hai khi tính toán nhầm lẫn.',
    icon: 'Feather',
    effectDescription: 'Nếu lần đầu trả lời sai, được làm lại thêm một lần duy nhất. Trả lời đúng lần hai vẫn nhận đủ 100% thưởng.'
  },
  {
    id: 'life_stone',
    name: 'Tâm Thạch Sinh Mệnh',
    category: 'active',
    price: 800,
    description: 'Viên ngọc tinh hoa của các bậc hiền giả giúp bồi bổ sinh lực.',
    icon: 'Heart',
    effectDescription: 'Tăng vĩnh viễn +1 HP Tối đa và lập tức hồi phục +1 HP hiện tại.'
  },
  {
    id: 'time_hourglass',
    name: 'Sa Lậu Ngưng Thời',
    category: 'active',
    price: 150,
    description: 'Chiếc đồng hồ cát ma thuật làm chậm dòng chảy thời gian.',
    icon: 'Hourglass',
    effectDescription: 'Cộng thêm ngay lập tức 10 giây cho câu hỏi hiện tại đang hoạt động.'
  }
];

export const PASSIVE_ITEMS: ItemDefinition[] = [
  {
    id: 'wisdom_watch',
    name: 'Đồng Hồ Minh Triết',
    category: 'passive',
    price: 1000,
    maxPurchases: 1,
    description: 'Dụng cụ đo đạc thời gian của các nhà thiên văn học cổ đại.',
    icon: 'Clock',
    effectDescription: 'Vĩnh viễn tăng thêm +2 giây thời gian cơ bản cho MỌI câu hỏi.'
  },
  {
    id: 'ancient_tome',
    name: 'Cổ Thư Tinh Thông',
    category: 'passive',
    price: 1500,
    maxPurchases: 1,
    description: 'Cuốn sách ghi chép các phương pháp giải toán kỳ diệu.',
    icon: 'BookOpen',
    effectDescription: 'Tăng 15% EXP nhận được'
  },
  {
    id: 'lucky_pouch',
    name: 'Túi Vàng May Mắn',
    category: 'passive',
    price: 1200,
    maxPurchases: 1,
    description: 'Túi gấm may mắn thu hút tài lộc tri thức.',
    icon: 'Coins',
    effectDescription: 'Tăng 10% Vàng nhận được'
  },
  {
    id: 'freedom_seal',
    name: 'Ấn Danh Tự Tại',
    category: 'active',
    price: 500,
    description: 'Con dấu hoàng gia cho phép tạo thêm một Danh hiệu Cá nhân độc lập.',
    icon: 'Award',
    effectDescription: 'Có thể mua nhiều lần: mỗi lần mua cho phép tạo và lưu thêm 1 danh hiệu độc lập theo ý muốn.'
  }
];

export const ALL_ITEMS = [...ACTIVE_ITEMS, ...PASSIVE_ITEMS];
