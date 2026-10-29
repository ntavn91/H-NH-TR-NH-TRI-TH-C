/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionDefinition } from '../types/game';

export const QUESTIONS_BANK: QuestionDefinition[] = [
  // ================= CHƯƠNG 1: THUNG LŨNG SỐ THỰC =================
  {
    questionId: 'W1-S01',
    chapterId: 1,
    stageId: 1,
    topic: 'Sắp xếp số hữu tỉ',
    difficulty: 1,
    variants: [
      {
        variantId: 'W1-S01-V1',
        questionLatex: 'Hãy sắp xếp các số hữu tỉ sau theo thứ tự từ nhỏ đến lớn: $-\\dfrac{3}{4};\\; 0;\\; \\dfrac{1}{2};\\; -1$',
        storyContext: 'Dòng năng lượng số học bị đảo lộn, hãy sắp xếp các giá trị theo thứ tự tăng dần để mở đường qua khe núi.',
        options: [
          { optionId: 'A', latex: '-1 < -\\dfrac{3}{4} < 0 < \\dfrac{1}{2}' },
          { optionId: 'B', latex: '-\\dfrac{3}{4} < -1 < 0 < \\dfrac{1}{2}' },
          { optionId: 'C', latex: '0 < -\\dfrac{3}{4} < -1 < \\dfrac{1}{2}' },
          { optionId: 'D', latex: '-1 < 0 < -\\dfrac{3}{4} < \\dfrac{1}{2}' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W1-S01-V2',
        questionLatex: 'Hãy sắp xếp các số sau theo thứ tự từ nhỏ đến lớn: $-\\dfrac{2}{5};\\; \\dfrac{3}{10};\\; -0{,}8;\\; 0$',
        storyContext: 'Các viên đá số học trôi dạt trên dòng suối băng, hãy xếp chúng theo thứ tự từ bé đến lớn.',
        options: [
          { optionId: 'A', latex: '-0{,}8 < -\\dfrac{2}{5} < 0 < \\dfrac{3}{10}' },
          { optionId: 'B', latex: '-\\dfrac{2}{5} < -0{,}8 < 0 < \\dfrac{3}{10}' },
          { optionId: 'C', latex: '-0{,}8 < 0 < -\\dfrac{2}{5} < \\dfrac{3}{10}' },
          { optionId: 'D', latex: '0 < -0{,}8 < -\\dfrac{2}{5} < \\dfrac{3}{10}' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W1-S02',
    chapterId: 1,
    stageId: 2,
    topic: 'Cộng trừ số hữu tỉ',
    difficulty: 1,
    variants: [
      {
        variantId: 'W1-S02-V1',
        questionLatex: 'Tính giá trị của phép tính: $A = \\dfrac{3}{7} + \\left(-\\dfrac{5}{14}\\right)$',
        storyContext: 'Hai luồng tinh thạch hữu tỉ giao thoa tạo nên năng lượng mới, hãy tính tổng giá trị của chúng.',
        options: [
          { optionId: 'A', latex: '\\dfrac{1}{14}' },
          { optionId: 'B', latex: '-\\dfrac{1}{14}' },
          { optionId: 'C', latex: '\\dfrac{11}{14}' },
          { optionId: 'D', latex: '\\dfrac{1}{7}' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W1-S02-V2',
        questionLatex: 'Tính giá trị của phép tính: $B = -\\dfrac{2}{3} - \\dfrac{1}{6}$',
        storyContext: 'Một vết nứt số học rút cạn năng lượng, hãy tính kết quả phép trừ phân số sau.',
        options: [
          { optionId: 'A', latex: '-\\dfrac{5}{6}' },
          { optionId: 'B', latex: '-\\dfrac{1}{2}' },
          { optionId: 'C', latex: '-\\dfrac{3}{6}' },
          { optionId: 'D', latex: '\\dfrac{5}{6}' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W1-S03',
    chapterId: 1,
    stageId: 3,
    topic: 'Số hữu tỉ và số thập phân',
    difficulty: 1,
    variants: [
      {
        variantId: 'W1-S03-V1',
        questionLatex: 'Tính giá trị của biểu thức: $C = \\dfrac{4}{5} - 1{,}25$',
        storyContext: 'Rễ cây cổ thụ hấp thụ số thập phân và phân số, hãy tìm giá trị rút gọn của biểu thức.',
        options: [
          { optionId: 'A', latex: '-\\dfrac{9}{20}' },
          { optionId: 'B', latex: '\\dfrac{9}{20}' },
          { optionId: 'C', latex: '-0{,}35' },
          { optionId: 'D', latex: '-\\dfrac{1}{5}' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W1-S03-V2',
        questionLatex: 'Tính giá trị của biểu thức: $D = -0{,}75 + \\dfrac{5}{4}$',
        storyContext: 'Sự hòa quyện giữa số âm thập phân và phân số dương mở lối qua tán cây ma thuật.',
        options: [
          { optionId: 'A', latex: '\\dfrac{1}{2}' },
          { optionId: 'B', latex: '-\\dfrac{1}{2}' },
          { optionId: 'C', latex: '2' },
          { optionId: 'D', latex: '\\dfrac{1}{4}' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W1-S04',
    chapterId: 1,
    stageId: 4,
    topic: 'Nhân chia lũy thừa cùng cơ số',
    difficulty: 1,
    variants: [
      {
        variantId: 'W1-S04-V1',
        questionLatex: 'Viết kết quả sau dưới dạng một lũy thừa: $\\left(-\\dfrac{2}{3}\\right)^3 \\cdot \\left(-\\dfrac{2}{3}\\right)^4$',
        storyContext: 'Hai nguồn sáng lũy thừa đồng dạng hợp nhất tại đền thờ.',
        options: [
          { optionId: 'A', latex: '\\left(-\\dfrac{2}{3}\\right)^7' },
          { optionId: 'B', latex: '\\left(-\\dfrac{2}{3}\\right)^{12}' },
          { optionId: 'C', latex: '\\left(\\dfrac{2}{3}\\right)^7' },
          { optionId: 'D', latex: '\\left(-\\dfrac{4}{9}\\right)^7' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W1-S04-V2',
        questionLatex: 'Viết kết quả phép chia dưới dạng lũy thừa: $\\left(\\dfrac{3}{5}\\right)^8 : \\left(\\dfrac{3}{5}\\right)^3$',
        storyContext: 'Dòng năng lượng phân nhánh qua hang tối, hãy rút gọn phép chia lũy thừa.',
        options: [
          { optionId: 'A', latex: '\\left(\\dfrac{3}{5}\\right)^5' },
          { optionId: 'B', latex: '\\left(\\dfrac{3}{5}\\right)^{11}' },
          { optionId: 'C', latex: '\\left(\\dfrac{3}{5}\\right)^{24}' },
          { optionId: 'D', latex: '1' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W1-S05',
    chapterId: 1,
    stageId: 5,
    topic: 'Lũy thừa của lũy thừa',
    difficulty: 1,
    variants: [
      {
        variantId: 'W1-S05-V1',
        questionLatex: 'Viết kết quả sau dưới dạng lũy thừa: $\\left[\\left(-\\dfrac{1}{2}\\right)^3\\right]^4$',
        storyContext: 'Cột mốc ma thuật nâng cấp bậc năng lượng theo phép nhân số mũ.',
        options: [
          { optionId: 'A', latex: '\\left(-\\dfrac{1}{2}\\right)^{12}' },
          { optionId: 'B', latex: '\\left(-\\dfrac{1}{2}\\right)^7' },
          { optionId: 'C', latex: '\\left(-\\dfrac{1}{2}\\right)^{81}' },
          { optionId: 'D', latex: '\\left(\\dfrac{1}{2}\\right)^{12}' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W1-S05-V2',
        questionLatex: 'Viết kết quả sau dưới dạng lũy thừa của $2$: $\\left(2^3\\right)^5$',
        storyContext: 'Khối năng lượng cơ số 2 được nén lại hai lần liên tiếp.',
        options: [
          { optionId: 'A', latex: '2^{15}' },
          { optionId: 'B', latex: '2^8' },
          { optionId: 'C', latex: '2^{125}' },
          { optionId: 'D', latex: '6^5' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W1-S06',
    chapterId: 1,
    stageId: 6,
    topic: 'So sánh giá trị tuyệt đối',
    difficulty: 2,
    variants: [
      {
        variantId: 'W1-S06-V1',
        questionLatex: 'Cho $a = -\\dfrac{5}{7}$ và $b = \\dfrac{3}{5}$. Hãy so sánh $|a|$ và $|b|$.',
        storyContext: 'Tấm gương phản chiếu khoảng cách từ tâm ma thuật đến các điểm số.',
        options: [
          { optionId: 'A', latex: '|a| > |b|' },
          { optionId: 'B', latex: '|a| < |b|' },
          { optionId: 'C', latex: '|a| = |b|' },
          { optionId: 'D', latex: 'Không so sánh được' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W1-S06-V2',
        questionLatex: 'Cho $u = -1{,}5$ và $v = -\\dfrac{9}{5}$. So sánh $|u|$ và $|v|$.',
        storyContext: 'Hãy quan sát khoảng cách của hai số đối đến mốc số 0.',
        options: [
          { optionId: 'A', latex: '|u| < |v|' },
          { optionId: 'B', latex: '|u| > |v|' },
          { optionId: 'C', latex: '|u| = |v|' },
          { optionId: 'D', latex: '|u| = -|v|' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W1-S07',
    chapterId: 1,
    stageId: 7,
    topic: 'Căn bậc hai số học',
    difficulty: 2,
    variants: [
      {
        variantId: 'W1-S07-V1',
        questionLatex: 'Tìm căn bậc hai số học của $m = 625$ (tức $\\sqrt{625}$).',
        storyContext: 'Khối thạch anh phát sáng ở tần số 625, hãy tìm số cơ sở không âm của nó.',
        options: [
          { optionId: 'A', latex: '25' },
          { optionId: 'B', latex: '-25' },
          { optionId: 'C', latex: '\\pm 25' },
          { optionId: 'D', latex: '35' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W1-S07-V2',
        questionLatex: 'Tính giá trị căn bậc hai số học: $\\sqrt{\\dfrac{144}{49}}$',
        storyContext: 'Mảnh vỡ tinh thể phân số chứa đựng bí mật của hai số chính phương.',
        options: [
          { optionId: 'A', latex: '\\dfrac{12}{7}' },
          { optionId: 'B', latex: '-\\dfrac{12}{7}' },
          { optionId: 'C', latex: '\\dfrac{14}{7}' },
          { optionId: 'D', latex: '\\dfrac{72}{49}' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W1-S08',
    chapterId: 1,
    stageId: 8,
    topic: 'So sánh căn bậc hai và số tự nhiên',
    difficulty: 2,
    variants: [
      {
        variantId: 'W1-S08-V1',
        questionLatex: 'So sánh hai số $x = \\sqrt{50}$ và $y = 7$. Khẳng định nào đúng?',
        storyContext: 'Đặt hai khối đá lên bàn cân năng lượng, hãy so sánh bình phương của chúng.',
        options: [
          { optionId: 'A', latex: 'x > y' },
          { optionId: 'B', latex: 'x < y' },
          { optionId: 'C', latex: 'x = y' },
          { optionId: 'D', latex: 'x = y - 1' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W1-S08-V2',
        questionLatex: 'So sánh $a = \\sqrt{79}$ và $b = 9$. Khẳng định nào đúng?',
        storyContext: 'Cân đo sự chênh lệch giữa số nguyên và căn bậc hai vô tỉ.',
        options: [
          { optionId: 'A', latex: 'a < b' },
          { optionId: 'B', latex: 'a > b' },
          { optionId: 'C', latex: 'a = b' },
          { optionId: 'D', latex: 'a \\ge b' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W1-S09',
    chapterId: 1,
    stageId: 9,
    topic: 'Tìm x trong đẳng thức chứa căn',
    difficulty: 2,
    variants: [
      {
        variantId: 'W1-S09-V1',
        questionLatex: 'Tìm $x$ biết: $\\dfrac{1}{2} x + \\sqrt{36} = \\dfrac{3}{4} \\cdot \\sqrt{64}$',
        storyContext: 'Cánh cửa ngầm bị khóa chặt bởi đẳng thức căn số học, hãy giải mã x.',
        options: [
          { optionId: 'A', latex: 'x = 0' },
          { optionId: 'B', latex: 'x = 2' },
          { optionId: 'C', latex: 'x = -2' },
          { optionId: 'D', latex: 'x = 6' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W1-S09-V2',
        questionLatex: 'Tìm $x$ biết: $\\dfrac{2}{3} x - \\sqrt{81} = -5$',
        storyContext: 'Khóa áp suất phương trình cần giá trị chính xác của ẩn x để cân bằng.',
        options: [
          { optionId: 'A', latex: 'x = 6' },
          { optionId: 'B', latex: 'x = 4' },
          { optionId: 'C', latex: 'x = -6' },
          { optionId: 'D', latex: 'x = 9' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W1-S10',
    chapterId: 1,
    stageId: 10,
    topic: 'TRÙM: Chu vi hình vuông diện tích S',
    difficulty: 3,
    isBoss: true,
    variants: [
      {
        variantId: 'W1-S10-V1',
        questionLatex: 'Hộ Vệ Thần Thạch bảo vệ vùng đất hình vuông có diện tích $S = 2500\\text{ m}^2$. Chu vi $P$ của vùng đất này là bao nhiêu?',
        storyContext: 'TRẬN ĐẤU TRÙM: Thần Thạch gầm lên rung chuyển thung lũng, yêu cầu bạn tính chu vi để phá vỡ vòng bảo vệ!',
        options: [
          { optionId: 'A', latex: 'P = 200\\text{ m}' },
          { optionId: 'B', latex: 'P = 100\\text{ m}' },
          { optionId: 'C', latex: 'P = 250\\text{ m}' },
          { optionId: 'D', latex: 'P = 400\\text{ m}' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W1-S10-V2',
        questionLatex: 'Lãnh địa hình vuông của Hộ Vệ Thần Thạch có diện tích $S = 1600\\text{ m}^2$. Tính chu vi $P$ của lãnh địa.',
        storyContext: 'TRẬN ĐẤU TRÙM: Khối đá hộ vệ kích hoạt trường bảo vệ diện tích 1600m2, hãy giải mã chu vi của nó!',
        options: [
          { optionId: 'A', latex: 'P = 160\\text{ m}' },
          { optionId: 'B', latex: 'P = 80\\text{ m}' },
          { optionId: 'C', latex: 'P = 200\\text{ m}' },
          { optionId: 'D', latex: 'P = 120\\text{ m}' },
        ],
        correctOptionId: 'A'
      }
    ]
  },

  // ================= CHƯƠNG 2: ĐẢO GÓC KỲ BÍ =================
  {
    questionId: 'W2-S01',
    chapterId: 2,
    stageId: 1,
    topic: 'Góc đối đỉnh',
    difficulty: 1,
    variants: [
      {
        variantId: 'W2-S01-V1',
        questionLatex: 'Cho hai góc $\\widehat{xAy}$ và $\\widehat{zAt}$ là hai góc đối đỉnh. Biết $\\widehat{xAy} = 65^\\circ$. Tính số đo $\\widehat{zAt}$.',
        storyContext: 'Hai luồng sáng giao nhau tại điểm A của ngã tư đối đỉnh.',
        options: [
          { optionId: 'A', latex: '$\\widehat{zAt} = 65^\\circ$' },
          { optionId: 'B', latex: '$\\widehat{zAt} = 115^\\circ$' },
          { optionId: 'C', latex: '$\\widehat{zAt} = 25^\\circ$' },
          { optionId: 'D', latex: '$\\widehat{zAt} = 180^\\circ$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W2-S01-V2',
        questionLatex: 'Hai góc $\\widehat{mOn}$ và $\\widehat{pOk}$ đối đỉnh với nhau. Nếu $\\widehat{mOn} = 110^\\circ$ thì số đo $\\widehat{pOk}$ là:',
        storyContext: 'Tia sáng định hướng ngã tư đối xứng mở lối đi tiếp theo.',
        options: [
          { optionId: 'A', latex: '$\\widehat{pOk} = 110^\\circ$' },
          { optionId: 'B', latex: '$\\widehat{pOk} = 70^\\circ$' },
          { optionId: 'C', latex: '$\\widehat{pOk} = 90^\\circ$' },
          { optionId: 'D', latex: '$\\widehat{pOk} = 55^\\circ$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W2-S02',
    chapterId: 2,
    stageId: 2,
    topic: 'Góc kề bù',
    difficulty: 1,
    variants: [
      {
        variantId: 'W2-S02-V1',
        questionLatex: 'Cho $\\widehat{xAy}$ và $\\widehat{yAz}$ là hai góc kề bù. Biết $\\widehat{xAy} = 72^\\circ$. Tính số đo góc $\\widehat{yAz}$.',
        storyContext: 'Cung điện cẩm thạch dựng trên một đường thẳng thẳng tắp tạo bởi hai góc bù nhau.',
        options: [
          { optionId: 'A', latex: '$\\widehat{yAz} = 108^\\circ$' },
          { optionId: 'B', latex: '$\\widehat{yAz} = 18^\\circ$' },
          { optionId: 'C', latex: '$\\widehat{yAz} = 72^\\circ$' },
          { optionId: 'D', latex: '$\\widehat{yAz} = 90^\\circ$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W2-S02-V2',
        questionLatex: 'Biết hai góc $\\widehat{AOB}$ và $\\widehat{BOC}$ kề bù và $\\widehat{AOB} = 135^\\circ$. Số đo góc $\\widehat{BOC}$ là:',
        storyContext: 'Chiếc gương bán nguyệt yêu cầu góc còn lại để ghép thành 180 độ.',
        options: [
          { optionId: 'A', latex: '$\\widehat{BOC} = 45^\\circ$' },
          { optionId: 'B', latex: '$\\widehat{BOC} = 55^\\circ$' },
          { optionId: 'C', latex: '$\\widehat{BOC} = 135^\\circ$' },
          { optionId: 'D', latex: '$\\widehat{BOC} = 90^\\circ$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W2-S03',
    chapterId: 2,
    stageId: 3,
    topic: 'Góc so le trong',
    difficulty: 1,
    variants: [
      {
        variantId: 'W2-S03-V1',
        questionLatex: 'Cho hai đường thẳng song song $a \\parallel b$. Đường thẳng $c$ cắt $a$ và $b$ tạo thành cặp góc so le trong $\\widehat{A_1}$ và $\\widehat{B_1}$. Biết $\\widehat{A_1} = 50^\\circ$, tính $\\widehat{B_1}$.',
        storyContext: 'Đường ray song song dẫn thuyền mây cần hai góc so le chuẩn xác.',
        options: [
          { optionId: 'A', latex: '$\\widehat{B_1} = 50^\\circ$' },
          { optionId: 'B', latex: '$\\widehat{B_1} = 130^\\circ$' },
          { optionId: 'C', latex: '$\\widehat{B_1} = 40^\\circ$' },
          { optionId: 'D', latex: '$\\widehat{B_1} = 90^\\circ$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W2-S03-V2',
        questionLatex: 'Nếu $x \\parallel y$ và một đường thẳng thứ ba cắt cả hai đường, thì hai góc so le trong có mối quan hệ gì?',
        storyContext: 'Định lý song song cổ đại được khắc trên phiến đá chắn đường.',
        options: [
          { optionId: 'A', latex: 'Bằng nhau' },
          { optionId: 'B', latex: 'Có tổng bằng $180^\\circ$' },
          { optionId: 'C', latex: 'Phụ nhau' },
          { optionId: 'D', latex: 'Góc này gấp đôi góc kia' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W2-S04',
    chapterId: 2,
    stageId: 4,
    topic: 'Góc đồng vị',
    difficulty: 1,
    variants: [
      {
        variantId: 'W2-S04-V1',
        questionLatex: 'Cho $m \\parallel n$. Hai góc đồng vị $\\widehat{M_2}$ và $\\widehat{N_2}$ có quan hệ như thế nào và nếu $\\widehat{M_2} = 125^\\circ$ thì $\\widehat{N_2}$ bằng bao nhiêu?',
        storyContext: 'Hai ngọn hải đăng mây hướng về cùng một vị trí đồng vị.',
        options: [
          { optionId: 'A', latex: '$\\widehat{N_2} = 125^\\circ$' },
          { optionId: 'B', latex: '$\\widehat{N_2} = 55^\\circ$' },
          { optionId: 'C', latex: '$\\widehat{N_2} = 65^\\circ$' },
          { optionId: 'D', latex: '$\\widehat{N_2} = 180^\\circ$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W2-S04-V2',
        questionLatex: 'Cho hai đường thẳng song song bị cắt bởi một cát tuyến. Khẳng định nào sau đây là ĐÚNG?',
        storyContext: 'Lời sấm truyền về hình học phẳng mở ra cánh cổng mây.',
        options: [
          { optionId: 'A', latex: 'Hai góc đồng vị thì bằng nhau' },
          { optionId: 'B', latex: 'Hai góc trong cùng phía bằng nhau' },
          { optionId: 'C', latex: 'Hai góc so le trong có tổng bằng $180^\\circ$' },
          { optionId: 'D', latex: 'Hai góc đồng vị có tổng bằng $90^\\circ$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W2-S05',
    chapterId: 2,
    stageId: 5,
    topic: 'Tia phân giác của góc',
    difficulty: 2,
    variants: [
      {
        variantId: 'W2-S05-V1',
        questionLatex: 'Cho góc $\\widehat{xAy} = 84^\\circ$ và tia $At$ là tia phân giác của góc $\\widehat{xAy}$. Tính số đo của góc $\\widehat{xAt}$.',
        storyContext: 'Mũi tên phân giác thần kỳ chia đôi góc ánh sáng.',
        options: [
          { optionId: 'A', latex: '$\\widehat{xAt} = 42^\\circ$' },
          { optionId: 'B', latex: '$\\widehat{xAt} = 84^\\circ$' },
          { optionId: 'C', latex: '$\\widehat{xAt} = 96^\\circ$' },
          { optionId: 'D', latex: '$\\widehat{xAt} = 21^\\circ$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W2-S05-V2',
        questionLatex: 'Biết $Oz$ là tia phân giác của $\\widehat{xOy}$ và $\\widehat{xOz} = 35^\\circ$. Tính số đo toàn bộ góc $\\widehat{xOy}$.',
        storyContext: 'Khôi phục độ mở hoàn chỉnh của chiếc cổng vòm hình quạt.',
        options: [
          { optionId: 'A', latex: '$\\widehat{xOy} = 70^\\circ$' },
          { optionId: 'B', latex: '$\\widehat{xOy} = 35^\\circ$' },
          { optionId: 'C', latex: '$\\widehat{xOy} = 55^\\circ$' },
          { optionId: 'D', latex: '$\\widehat{xOy} = 145^\\circ$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W2-S06',
    chapterId: 2,
    stageId: 6,
    topic: 'Tổng ba góc trong tam giác',
    difficulty: 2,
    variants: [
      {
        variantId: 'W2-S06-V1',
        questionLatex: 'Cho $\\triangle ABC$ có $\\widehat{B} = 45^\\circ$ và $\\widehat{C} = 65^\\circ$. Tính số đo của góc $\\widehat{A}$.',
        storyContext: 'Đỉnh tháp tam giác cần đo góc chóp để hạ thang dây an toàn.',
        options: [
          { optionId: 'A', latex: '$\\widehat{A} = 70^\\circ$' },
          { optionId: 'B', latex: '$\\widehat{A} = 80^\\circ$' },
          { optionId: 'C', latex: '$\\widehat{A} = 110^\\circ$' },
          { optionId: 'D', latex: '$\\widehat{A} = 60^\\circ$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W2-S06-V2',
        questionLatex: 'Trong tam giác $MNP$, biết $\\widehat{M} = 55^\\circ$ và $\\widehat{N} = 75^\\circ$. Số đo góc $\\widehat{P}$ là:',
        storyContext: 'Cân bằng ba đỉnh năng lượng của kim tự tháp đá.',
        options: [
          { optionId: 'A', latex: '$\\widehat{P} = 50^\\circ$' },
          { optionId: 'B', latex: '$\\widehat{P} = 60^\\circ$' },
          { optionId: 'C', latex: '$\\widehat{P} = 40^\\circ$' },
          { optionId: 'D', latex: '$\\widehat{P} = 70^\\circ$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W2-S07',
    chapterId: 2,
    stageId: 7,
    topic: 'Góc nhọn tam giác vuông',
    difficulty: 2,
    variants: [
      {
        variantId: 'W2-S07-V1',
        questionLatex: 'Cho $\\triangle ABC$ vuông tại $A$. Biết góc $\\widehat{B} = 38^\\circ$. Tính số đo góc nhọn $\\widehat{C}$.',
        storyContext: 'Thềm đá vuông góc tạo thành góc 90 độ tại đỉnh A, hãy tính góc nhọn còn lại.',
        options: [
          { optionId: 'A', latex: '$\\widehat{C} = 52^\\circ$' },
          { optionId: 'B', latex: '$\\widehat{C} = 142^\\circ$' },
          { optionId: 'C', latex: '$\\widehat{C} = 62^\\circ$' },
          { optionId: 'D', latex: '$\\widehat{C} = 42^\\circ$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W2-S07-V2',
        questionLatex: 'Cho tam giác $DEF$ vuông tại $D$. Nếu $\\widehat{E} = 64^\\circ$, thì số đo của góc $\\widehat{F}$ là:',
        storyContext: 'Hai góc nhọn của tam giác vuông luôn phụ nhau.',
        options: [
          { optionId: 'A', latex: '$\\widehat{F} = 26^\\circ$' },
          { optionId: 'B', latex: '$\\widehat{F} = 36^\\circ$' },
          { optionId: 'C', latex: '$\\widehat{F} = 116^\\circ$' },
          { optionId: 'D', latex: '$\\widehat{F} = 46^\\circ$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W2-S08',
    chapterId: 2,
    stageId: 8,
    topic: 'Nhận dạng hình dạng tam giác',
    difficulty: 2,
    variants: [
      {
        variantId: 'W2-S08-V1',
        questionLatex: 'Cho $\\triangle ABC$ có $\\widehat{B} = 30^\\circ$ và $\\widehat{C} = 40^\\circ$. Hỏi $\\triangle ABC$ là tam giác gì?',
        storyContext: 'Phán đoán thế trận phòng ngự của trận địa tam giác cổ.',
        options: [
          { optionId: 'A', latex: 'Tam giác tù (vì $\\widehat{A} = 110^\\circ > 90^\\circ$)' },
          { optionId: 'B', latex: 'Tam giác nhọn' },
          { optionId: 'C', latex: 'Tam giác vuông' },
          { optionId: 'D', latex: 'Tam giác đều' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W2-S08-V2',
        questionLatex: 'Tam giác $XYZ$ có $\\widehat{Y} = 40^\\circ$ và $\\widehat{Z} = 50^\\circ$. Đây là tam giác gì?',
        storyContext: 'Xác định loại tam giác để gắn đúng khiên chiến binh.',
        options: [
          { optionId: 'A', latex: 'Tam giác vuông tại $X$' },
          { optionId: 'B', latex: 'Tam giác nhọn' },
          { optionId: 'C', latex: 'Tam giác tù' },
          { optionId: 'D', latex: 'Tam giác cân tại $X$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W2-S09',
    chapterId: 2,
    stageId: 9,
    topic: 'Góc ngoài của tam giác',
    difficulty: 2,
    variants: [
      {
        variantId: 'W2-S09-V1',
        questionLatex: 'Cho $\\triangle ABC$. Biết $\\widehat{B} = 45^\\circ$ và $\\widehat{C} = 75^\\circ$. Tính số đo góc ngoài tại đỉnh $A$.',
        storyContext: 'Hào quang bảo vệ phát xạ góc ngoài đỉnh A bằng tổng hai góc trong không kề.',
        options: [
          { optionId: 'A', latex: '$\\widehat{A}_{\\text{ngoài}} = 120^\\circ$' },
          { optionId: 'B', latex: '$\\widehat{A}_{\\text{ngoài}} = 60^\\circ$' },
          { optionId: 'C', latex: '$\\widehat{A}_{\\text{ngoài}} = 135^\\circ$' },
          { optionId: 'D', latex: '$\\widehat{A}_{\\text{ngoài}} = 105^\\circ$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W2-S09-V2',
        questionLatex: 'Một góc ngoài tại một đỉnh của tam giác có tính chất nào sau đây?',
        storyContext: 'Bản khắc bí truyền định nghĩa góc ngoài tam giác.',
        options: [
          { optionId: 'A', latex: 'Bằng tổng hai góc trong không kề với nó' },
          { optionId: 'B', latex: 'Bằng góc kề với nó' },
          { optionId: 'C', latex: 'Luôn bằng $90^\\circ$' },
          { optionId: 'D', latex: 'Bằng hiệu hai góc trong' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W2-S10',
    chapterId: 2,
    stageId: 10,
    topic: 'TRÙM: Tìm biến x từ quan hệ góc tam giác',
    difficulty: 3,
    isBoss: true,
    variants: [
      {
        variantId: 'W2-S10-V1',
        questionLatex: 'Tướng Quân Lượng Giác giăng kết giới tam giác có $\\widehat{A} = x$, $\\widehat{B} = x + 20^\\circ$, $\\widehat{C} = x + 40^\\circ$. Hãy tìm giá trị của $x$ để phá tan kết giới!',
        storyContext: 'TRẬN ĐẤU TRÙM: Tướng Quân Lượng Giác vung kiếm tạo ra ma trận góc tam giác tổng 180 độ, hãy giải tìm ẩn số x!',
        options: [
          { optionId: 'A', latex: '$x = 40^\\circ$' },
          { optionId: 'B', latex: '$x = 30^\\circ$' },
          { optionId: 'C', latex: '$x = 50^\\circ$' },
          { optionId: 'D', latex: '$x = 60^\\circ$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W2-S10-V2',
        questionLatex: 'Tam giác ma pháp của Tướng Quân có $\\widehat{A} = 2x$, $\\widehat{B} = 3x$, $\\widehat{C} = 4x$. Hãy tìm giá trị của $x$.',
        storyContext: 'TRẬN ĐẤU TRÙM: Ba luồng tia năng lượng tỉ lệ 2x : 3x : 4x hợp thành tam giác, hãy tìm góc cơ sở x!',
        options: [
          { optionId: 'A', latex: '$x = 20^\\circ$' },
          { optionId: 'B', latex: '$x = 18^\\circ$' },
          { optionId: 'C', latex: '$x = 25^\\circ$' },
          { optionId: 'D', latex: '$x = 15^\\circ$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },

  // ================= CHƯƠNG 3: ĐẦM LẦY TỈ LỆ =================
  {
    questionId: 'W3-S01',
    chapterId: 3,
    stageId: 1,
    topic: 'Tính chất tỉ lệ thức',
    difficulty: 1,
    variants: [
      {
        variantId: 'W3-S01-V1',
        questionLatex: 'Từ đẳng thức $3 \\cdot 12 = 4 \\cdot 9$, ta có thể lập được tỉ lệ thức nào sau đây?',
        storyContext: 'Cổng đá tỉ lệ thức chuyển đổi giữa tích hai đường chéo.',
        options: [
          { optionId: 'A', latex: '$\\dfrac{3}{4} = \\dfrac{9}{12}$' },
          { optionId: 'B', latex: '$\\dfrac{3}{12} = \\dfrac{4}{9}$' },
          { optionId: 'C', latex: '$\\dfrac{3}{9} = \\dfrac{12}{4}$' },
          { optionId: 'D', latex: '$\\dfrac{4}{3} = \\dfrac{9}{12}$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W3-S01-V2',
        questionLatex: 'Cho tỉ lệ thức $\\dfrac{a}{b} = \\dfrac{c}{d}$ (với $b,d \\neq 0$). Đẳng thức tích nào sau đây luôn ĐÚNG?',
        storyContext: 'Nguyên lý tích chéo cân bằng của đầm lầy.',
        options: [
          { optionId: 'A', latex: '$a \\cdot d = b \\cdot c$' },
          { optionId: 'B', latex: '$a \\cdot c = b \\cdot d$' },
          { optionId: 'C', latex: '$a \\cdot b = c \\cdot d$' },
          { optionId: 'D', latex: '$a + d = b + c$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W3-S02',
    chapterId: 3,
    stageId: 2,
    topic: 'Tìm x trong tỉ lệ thức',
    difficulty: 1,
    variants: [
      {
        variantId: 'W3-S02-V1',
        questionLatex: 'Tìm $x$ biết tỉ lệ thức: $\\dfrac{x}{15} = \\dfrac{-4}{5}$',
        storyContext: 'Nhân chéo chia thẳng để giải cứu ẩn số x đang chìm dần trong đầm.',
        options: [
          { optionId: 'A', latex: 'x = -12' },
          { optionId: 'B', latex: 'x = 12' },
          { optionId: 'C', latex: 'x = -3' },
          { optionId: 'D', latex: 'x = -20' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W3-S02-V2',
        questionLatex: 'Tìm $x$ trong tỉ lệ thức: $\\dfrac{2{,}5}{x} = \\dfrac{5}{8}$',
        storyContext: 'Cân bằng đòn bẩy bằng quy tắc nhân chéo.',
        options: [
          { optionId: 'A', latex: 'x = 4' },
          { optionId: 'B', latex: 'x = 16' },
          { optionId: 'C', latex: 'x = 2' },
          { optionId: 'D', latex: 'x = 0{,}4' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W3-S03',
    chapterId: 3,
    stageId: 3,
    topic: 'Tìm hai số biết tỉ số và tổng/hiệu',
    difficulty: 2,
    variants: [
      {
        variantId: 'W3-S03-V1',
        questionLatex: 'Tìm hai số $x$ và $y$ biết $\\dfrac{x}{3} = \\dfrac{y}{5}$ và $x + y = 32$.',
        storyContext: 'Phân chia dòng nước suối theo tỉ lệ 3 phần và 5 phần có tổng 32 lít.',
        options: [
          { optionId: 'A', latex: 'x = 12;\\; y = 20' },
          { optionId: 'B', latex: 'x = 10;\\; y = 22' },
          { optionId: 'C', latex: 'x = 15;\\; y = 17' },
          { optionId: 'D', latex: 'x = 8;\\; y = 24' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W3-S03-V2',
        questionLatex: 'Cho $\\dfrac{x}{7} = \\dfrac{y}{2}$ và $x - y = 25$. Tìm giá trị của $x$ và $y$.',
        storyContext: 'Độ chênh lệch giữa hai cọc tiêu đầm lầy là 25 đơn vị.',
        options: [
          { optionId: 'A', latex: 'x = 35;\\; y = 10' },
          { optionId: 'B', latex: 'x = 28;\\; y = 3' },
          { optionId: 'C', latex: 'x = 30;\\; y = 5' },
          { optionId: 'D', latex: 'x = 42;\\; y = 17' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W3-S04',
    chapterId: 3,
    stageId: 4,
    topic: 'Dãy tỉ số bằng nhau 3 biến',
    difficulty: 2,
    variants: [
      {
        variantId: 'W3-S04-V1',
        questionLatex: 'Cho dãy tỉ số bằng nhau: $\\dfrac{x}{2} = \\dfrac{y}{3} = \\dfrac{z}{4}$ và $x + y + z = 45$. Tìm $x, y, z$.',
        storyContext: 'Tam trụ đá khổng lồ giữ đầm lầy không bị lún sụt.',
        options: [
          { optionId: 'A', latex: 'x = 10;\\; y = 15;\\; z = 20' },
          { optionId: 'B', latex: 'x = 8;\\; y = 12;\\; z = 25' },
          { optionId: 'C', latex: 'x = 12;\\; y = 15;\\; z = 18' },
          { optionId: 'D', latex: 'x = 5;\\; y = 15;\\; z = 25' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W3-S04-V2',
        questionLatex: 'Cho $\\dfrac{a}{3} = \\dfrac{b}{5} = \\dfrac{c}{7}$ và $2a + b = 33$. Giá trị của $a, b, c$ là:',
        storyContext: 'Điều chỉnh ba trục đòn bẩy theo hệ số kết hợp.',
        options: [
          { optionId: 'A', latex: 'a = 9;\\; b = 15;\\; c = 21' },
          { optionId: 'B', latex: 'a = 6;\\; b = 10;\\; c = 14' },
          { optionId: 'C', latex: 'a = 12;\\; b = 20;\\; c = 28' },
          { optionId: 'D', latex: 'a = 3;\\; b = 5;\\; c = 7' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W3-S05',
    chapterId: 3,
    stageId: 5,
    topic: 'Định nghĩa tỉ lệ thuận',
    difficulty: 1,
    variants: [
      {
        variantId: 'W3-S05-V1',
        questionLatex: 'Nếu đại lượng $y$ liên hệ với đại lượng $x$ theo tỉ lệ thức $\\dfrac{a}{b} = \\dfrac{c}{d}$ (với $b,d \\neq 0$) hay công thức $y = kx$ ($k \\neq 0$) thì ta nói:',
        storyContext: 'Quy luật sinh trưởng cây cỏ đầm lầy tỉ lệ thuận với ánh sáng.',
        options: [
          { optionId: 'A', latex: '$y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k$' },
          { optionId: 'B', latex: '$y$ tỉ lệ nghịch với $x$ theo hệ số tỉ lệ $k$' },
          { optionId: 'C', latex: '$x$ tỉ lệ thuận với $y$ theo hệ số tỉ lệ $k$' },
          { optionId: 'D', latex: '$x$ và $y$ là hai đại lượng không phụ thuộc' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W3-S05-V2',
        questionLatex: 'Cho biết $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k = -3$. Khi $x = 4$ thì $y$ bằng:',
        storyContext: 'Nhân hệ số tỉ lệ thuận để tìm kết quả biến đổi y.',
        options: [
          { optionId: 'A', latex: '$y = -12$' },
          { optionId: 'B', latex: '$y = 12$' },
          { optionId: 'C', latex: '$y = -\\dfrac{4}{3}$' },
          { optionId: 'D', latex: '$y = -\\dfrac{3}{4}$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W3-S06',
    chapterId: 3,
    stageId: 6,
    topic: 'Định nghĩa tỉ lệ nghịch',
    difficulty: 1,
    variants: [
      {
        variantId: 'W3-S06-V1',
        questionLatex: 'Nếu đại lượng $y$ liên hệ với đại lượng $x$ theo công thức $y = \\dfrac{a}{x}$ ($a \\neq 0$) thì ta nói:',
        storyContext: 'Vực sâu nghịch đảo: một bên tăng thì bên kia giảm.',
        options: [
          { optionId: 'A', latex: '$y$ tỉ lệ nghịch với $x$ theo hệ số tỉ lệ $a$' },
          { optionId: 'B', latex: '$y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $a$' },
          { optionId: 'C', latex: '$y$ tỉ lệ nghịch với $x$ theo hệ số tỉ lệ $\\dfrac{1}{a}$' },
          { optionId: 'D', latex: '$x$ và $y$ có tổng không đổi' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W3-S06-V2',
        questionLatex: 'Cho biết $x$ và $y$ là hai đại lượng tỉ lệ nghịch và khi $x = 6$ thì $y = 5$. Hệ số tỉ lệ $a$ bằng:',
        storyContext: 'Tìm hằng số tích số của hai đại lượng tỉ lệ nghịch.',
        options: [
          { optionId: 'A', latex: 'a = 30' },
          { optionId: 'B', latex: 'a = \\dfrac{6}{5}' },
          { optionId: 'C', latex: 'a = \\dfrac{5}{6}' },
          { optionId: 'D', latex: 'a = 11' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W3-S07',
    chapterId: 3,
    stageId: 7,
    topic: 'Tính giá trị theo hệ số tỉ lệ thuận',
    difficulty: 2,
    variants: [
      {
        variantId: 'W3-S07-V1',
        questionLatex: 'Cho $y$ tỉ lệ thuận với $x$. Khi $x = 5$ thì $y = 15$. Hỏi khi $x = -4$ thì $y$ bằng bao nhiêu?',
        storyContext: 'Máy đo đồng dạng cần tính giá trị đầu ra cho năng lượng âm.',
        options: [
          { optionId: 'A', latex: 'y = -12' },
          { optionId: 'B', latex: 'y = 12' },
          { optionId: 'C', latex: 'y = -20' },
          { optionId: 'D', latex: 'y = -\\dfrac{4}{3}' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W3-S07-V2',
        questionLatex: 'Cho $x$ và $y$ tỉ lệ thuận, biết rằng khi $x = 2$ thì $y = 8$. Giá trị của $x$ khi $y = 20$ là:',
        storyContext: 'Tìm ngược lại giá trị gốc từ kết quả đo được.',
        options: [
          { optionId: 'A', latex: 'x = 5' },
          { optionId: 'B', latex: 'x = 4' },
          { optionId: 'C', latex: 'x = 80' },
          { optionId: 'D', latex: 'x = 10' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W3-S08',
    chapterId: 3,
    stageId: 8,
    topic: 'Tính giá trị theo hệ số tỉ lệ nghịch',
    difficulty: 2,
    variants: [
      {
        variantId: 'W3-S08-V1',
        questionLatex: 'Cho $x$ và $y$ là hai đại lượng tỉ lệ nghịch với hệ số tỉ lệ $a = 36$. Khi $x = -9$ thì giá trị của $y$ là:',
        storyContext: 'Bánh răng nghịch chiều điều chỉnh số răng và số vòng quay.',
        options: [
          { optionId: 'A', latex: 'y = -4' },
          { optionId: 'B', latex: 'y = 4' },
          { optionId: 'C', latex: 'y = -324' },
          { optionId: 'D', latex: 'y = -27' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W3-S08-V2',
        questionLatex: 'Một chiếc xe chạy hết quãng đường $S$ với vận tốc $v = 40\\text{ km/h}$ trong $3\\text{ giờ}$. Nếu xe chạy với vận tốc $60\\text{ km/h}$ thì mất bao nhiêu giờ?',
        storyContext: 'Thời gian và vận tốc tỉ lệ nghịch trên cùng một quãng đường cố định.',
        options: [
          { optionId: 'A', latex: 't = 2\\text{ giờ}' },
          { optionId: 'B', latex: 't = 4{,}5\\text{ giờ}' },
          { optionId: 'C', latex: 't = 2{,}5\\text{ giờ}' },
          { optionId: 'D', latex: 't = 1{,}5\\text{ giờ}' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W3-S09',
    chapterId: 3,
    stageId: 9,
    topic: 'Phân biệt các đại lượng vật lý',
    difficulty: 2,
    variants: [
      {
        variantId: 'W3-S09-V1',
        questionLatex: 'Cho chuyển động đều với công thức $s = v \\cdot t$. Chọn khẳng định **SAI** trong các câu sau:',
        storyContext: 'Vạch trần cạm bẫy ngụy biện của đầm lầy về mối liên hệ vận tốc, thời gian và quãng đường.',
        options: [
          { optionId: 'A', latex: '$s$ và $t$ là hai đại lượng tỉ lệ nghịch (khi $v$ không đổi)' },
          { optionId: 'B', latex: '$s$ và $t$ là hai đại lượng tỉ lệ thuận (khi $v$ không đổi)' },
          { optionId: 'C', latex: '$v$ và $t$ là hai đại lượng tỉ lệ nghịch (khi $s$ không đổi)' },
          { optionId: 'D', latex: '$s$ và $v$ là hai đại lượng tỉ lệ thuận (khi $t$ không đổi)' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W3-S09-V2',
        questionLatex: 'Trong công thức tính khối lượng $m = D \\cdot V$ (với khối lượng riêng $D$ không đổi), mối quan hệ giữa $m$ và $V$ là:',
        storyContext: 'Xác định sự phụ thuộc giữa khối lượng và thể tích vật thể đá.',
        options: [
          { optionId: 'A', latex: '$m$ tỉ lệ thuận với $V$' },
          { optionId: 'B', latex: '$m$ tỉ lệ nghịch với $V$' },
          { optionId: 'C', latex: '$m$ không phụ thuộc vào $V$' },
          { optionId: 'D', latex: '$m$ và $V$ có tích không đổi' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W3-S10',
    chapterId: 3,
    stageId: 10,
    topic: 'TRÙM: Tỉ lệ bắc cầu hợp thành',
    difficulty: 3,
    isBoss: true,
    variants: [
      {
        variantId: 'W3-S10-V1',
        questionLatex: 'Vua Đầm Lầy thử thách: Biết $x$ tỉ lệ thuận với $y$ theo hệ số $k = 3$, và $y$ tỉ lệ nghịch với $z$ theo hệ số $a = 8$. Hỏi $x$ tỉ lệ thuận hay nghịch với $z$, và hệ số tỉ lệ là bao nhiêu?',
        storyContext: 'TRẬN ĐẤU TRÙM: Vua Đầm Lầy Bùn Lầy giơ chiếc cân bắc cầu ma quái, hãy tìm mối quan hệ giữa x và z!',
        options: [
          { optionId: 'A', latex: '$x$ tỉ lệ nghịch với $z$ theo hệ số $24$' },
          { optionId: 'B', latex: '$x$ tỉ lệ thuận với $z$ theo hệ số $24$' },
          { optionId: 'C', latex: '$x$ tỉ lệ nghịch với $z$ theo hệ số $\\dfrac{8}{3}$' },
          { optionId: 'D', latex: '$x$ tỉ lệ thuận với $z$ theo hệ số $\\dfrac{3}{8}$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W3-S10-V2',
        questionLatex: 'Nếu $x$ tỉ lệ thuận với $y$ theo hệ số $k = 2$, và $y$ tỉ lệ thuận với $z$ theo hệ số $m = 5$, thì $x$ tỉ lệ thuận với $z$ theo hệ số:',
        storyContext: 'TRẬN ĐẤU TRÙM: Mối liên kết bắc cầu thuận - thuận của vua đầm lầy.',
        options: [
          { optionId: 'A', latex: '$10$' },
          { optionId: 'B', latex: '$7$' },
          { optionId: 'C', latex: '$\\dfrac{2}{5}$' },
          { optionId: 'D', latex: '$2{,}5$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },

  // ================= CHƯƠNG 4: THỊ TRẤN ĐA THỨC MỘT BIẾN =================
  {
    questionId: 'W4-S01',
    chapterId: 4,
    stageId: 1,
    topic: 'Đơn thức một biến',
    difficulty: 1,
    variants: [
      {
        variantId: 'W4-S01-V1',
        questionLatex: 'Thu gọn đơn thức $A(x) = \\dfrac{2}{3} \\cdot 6 \\cdot x^2 \\cdot x^3$ và xác định hệ số cùng bậc của nó.',
        storyContext: 'Cổng vào Thị Trấn Đa Thức yêu cầu nhận dạng đơn thức đã thu gọn.',
        options: [
          { optionId: 'A', latex: 'Hệ số $4$, bậc $5$' },
          { optionId: 'B', latex: 'Hệ số $4$, bậc $6$' },
          { optionId: 'C', latex: 'Hệ số $12$, bậc $5$' },
          { optionId: 'D', latex: 'Hệ số $2$, bậc $5$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W4-S01-V2',
        questionLatex: 'Cho đơn thức $B(x) = -3x^4 \\cdot 2x$. Hệ số và bậc của $B(x)$ lần lượt là:',
        storyContext: 'Nhân các hệ số số học và cộng các số mũ của biến x.',
        options: [
          { optionId: 'A', latex: 'Hệ số $-6$, bậc $5$' },
          { optionId: 'B', latex: 'Hệ số $6$, bậc $5$' },
          { optionId: 'C', latex: 'Hệ số $-6$, bậc $4$' },
          { optionId: 'D', latex: 'Hệ số $-5$, bậc $4$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W4-S02',
    chapterId: 4,
    stageId: 2,
    topic: 'Bậc của đa thức',
    difficulty: 1,
    variants: [
      {
        variantId: 'W4-S02-V1',
        questionLatex: 'Xác định bậc của đa thức: $P(x) = 5x^4 - 2x^6 + 7x^2 - 9$',
        storyContext: 'Tìm số mũ cao nhất của biến có hệ số khác 0 để đo sức mạnh đa thức.',
        options: [
          { optionId: 'A', latex: 'Bậc $6$' },
          { optionId: 'B', latex: 'Bậc $4$' },
          { optionId: 'C', latex: 'Bậc $2$' },
          { optionId: 'D', latex: 'Bậc $12$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W4-S02-V2',
        questionLatex: 'Cho đa thức $Q(x) = 3x^3 - x^5 + 4x^5 + 2$. Bậc của đa thức $Q(x)$ sau khi thu gọn là:',
        storyContext: 'Cần thu gọn các hạng tử đồng dạng trước khi đọc bậc.',
        options: [
          { optionId: 'A', latex: 'Bậc $5$' },
          { optionId: 'B', latex: 'Bậc $3$' },
          { optionId: 'C', latex: 'Bậc $8$' },
          { optionId: 'D', latex: 'Bậc $0$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W4-S03',
    chapterId: 4,
    stageId: 3,
    topic: 'Hệ số cao nhất và hệ số tự do',
    difficulty: 1,
    variants: [
      {
        variantId: 'W4-S03-V1',
        questionLatex: 'Cho $P(x) = -7x^5 + 3x^3 - 4x + 12$. Hệ số cao nhất và hệ số tự do của $P(x)$ lần lượt là:',
        storyContext: 'Xác định thủ lĩnh dẫn đầu và thành phần tự do của đa thức.',
        options: [
          { optionId: 'A', latex: 'Hệ số cao nhất: $-7$, hệ số tự do: $12$' },
          { optionId: 'B', latex: 'Hệ số cao nhất: $12$, hệ số tự do: $-7$' },
          { optionId: 'C', latex: 'Hệ số cao nhất: $5$, hệ số tự do: $12$' },
          { optionId: 'D', latex: 'Hệ số cao nhất: $7$, hệ số tự do: $-4$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W4-S03-V2',
        questionLatex: 'Đa thức $R(x) = 8 - 4x^2 + 5x^4$. Hệ số cao nhất của $R(x)$ là:',
        storyContext: 'Chú ý trật tự các hạng tử chưa được sắp xếp giảm dần.',
        options: [
          { optionId: 'A', latex: '$5$' },
          { optionId: 'B', latex: '$8$' },
          { optionId: 'C', latex: '$-4$' },
          { optionId: 'D', latex: '$4$' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W4-S04',
    chapterId: 4,
    stageId: 4,
    topic: 'Phép cộng trừ đa thức',
    difficulty: 2,
    variants: [
      {
        variantId: 'W4-S04-V1',
        questionLatex: 'Cho $P(x) = 3x^2 - 4x + 5$ và $Q(x) = x^2 + 2x - 3$. Tính $P(x) + Q(x)$.',
        storyContext: 'Kết hợp hai dòng năng lượng đa thức bằng cách cộng các hạng tử cùng bậc.',
        options: [
          { optionId: 'A', latex: '4x^2 - 2x + 2' },
          { optionId: 'B', latex: '4x^2 - 6x + 8' },
          { optionId: 'C', latex: '2x^2 - 6x + 8' },
          { optionId: 'D', latex: '3x^2 - 2x + 2' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W4-S04-V2',
        questionLatex: 'Cho $A(x) = 5x^2 - 3x + 1$ và $B(x) = 2x^2 - 3x - 4$. Tính hiệu $A(x) - B(x)$.',
        storyContext: 'Trừ từng hạng tử tương ứng, cẩn thận dấu ngoặc đổi dấu.',
        options: [
          { optionId: 'A', latex: '3x^2 + 5' },
          { optionId: 'B', latex: '3x^2 - 6x - 3' },
          { optionId: 'C', latex: '3x^2 - 3' },
          { optionId: 'D', latex: '7x^2 - 6x - 3' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W4-S05',
    chapterId: 4,
    stageId: 5,
    topic: 'Tính giá trị đa thức',
    difficulty: 2,
    variants: [
      {
        variantId: 'W4-S05-V1',
        questionLatex: 'Tính giá trị của đa thức $P(x) = 2x^3 - 3x^2 + 5x - 4$ tại $x = 2$.',
        storyContext: 'Truyền năng lượng ẩn số x = 2 vào lõi tinh thể đa thức.',
        options: [
          { optionId: 'A', latex: 'P(2) = 10' },
          { optionId: 'B', latex: 'P(2) = 6' },
          { optionId: 'C', latex: 'P(2) = 14' },
          { optionId: 'D', latex: 'P(2) = 8' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W4-S05-V2',
        questionLatex: 'Cho $Q(x) = x^4 - 2x^2 + 3$. Tính $Q(-1)$.',
        storyContext: 'Cẩn thận với lũy thừa chẵn của số âm.',
        options: [
          { optionId: 'A', latex: 'Q(-1) = 2' },
          { optionId: 'B', latex: 'Q(-1) = 0' },
          { optionId: 'C', latex: 'Q(-1) = 6' },
          { optionId: 'D', latex: 'Q(-1) = -2' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W4-S06',
    chapterId: 4,
    stageId: 6,
    topic: 'Nhân đơn thức với đa thức',
    difficulty: 2,
    variants: [
      {
        variantId: 'W4-S06-V1',
        questionLatex: 'Thực hiện phép tính: $M(x) = 2x^2 \\cdot (3x^3 - 5x + 4)$',
        storyContext: 'Phân phối luồng năng lượng đơn thức 2x^2 vào từng hạng tử trong ngoặc.',
        options: [
          { optionId: 'A', latex: '6x^5 - 10x^3 + 8x^2' },
          { optionId: 'B', latex: '6x^6 - 10x^2 + 8' },
          { optionId: 'C', latex: '5x^5 - 7x^3 + 6x^2' },
          { optionId: 'D', latex: '6x^5 - 5x^3 + 8x^2' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W4-S06-V2',
        questionLatex: 'Nhân đơn thức với đa thức: $-3x \\cdot (x^2 - 4x + 1)$',
        storyContext: 'Đổi dấu cẩn thận khi nhân hệ số âm.',
        options: [
          { optionId: 'A', latex: '-3x^3 + 12x^2 - 3x' },
          { optionId: 'B', latex: '-3x^3 - 12x^2 - 3x' },
          { optionId: 'C', latex: '3x^3 + 12x^2 - 3x' },
          { optionId: 'D', latex: '-3x^3 + 12x^2 + 3' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W4-S07',
    chapterId: 4,
    stageId: 7,
    topic: 'Nhân đa thức với đa thức',
    difficulty: 2,
    variants: [
      {
        variantId: 'W4-S07-V1',
        questionLatex: 'Thực hiện phép nhân và thu gọn: $(2x - 3) \\cdot (x + 4)$',
        storyContext: 'Hợp nhất hai đa thức nhị thức bằng quy tắc nhân phân phối toàn phần.',
        options: [
          { optionId: 'A', latex: '2x^2 + 5x - 12' },
          { optionId: 'B', latex: '2x^2 - 5x - 12' },
          { optionId: 'C', latex: '2x^2 + 8x - 12' },
          { optionId: 'D', latex: '2x^2 - 12' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W4-S07-V2',
        questionLatex: 'Khai triển và thu gọn biểu thức: $(x - 5) \\cdot (x + 5)$',
        storyContext: 'Một dạng hằng đẳng thức thu gọn các hạng tử đối xứng.',
        options: [
          { optionId: 'A', latex: 'x^2 - 25' },
          { optionId: 'B', latex: 'x^2 - 10x - 25' },
          { optionId: 'C', latex: 'x^2 + 25' },
          { optionId: 'D', latex: '2x - 25' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W4-S08',
    chapterId: 4,
    stageId: 8,
    topic: 'Chia đa thức cho đơn thức',
    difficulty: 2,
    variants: [
      {
        variantId: 'W4-S08-V1',
        questionLatex: 'Thực hiện phép chia: $(12x^4 - 8x^3 + 4x^2) : (4x^2)$',
        storyContext: 'Chia đều năng lượng từng phần cho đơn thức nguồn 4x^2.',
        options: [
          { optionId: 'A', latex: '3x^2 - 2x + 1' },
          { optionId: 'B', latex: '3x^2 - 2x' },
          { optionId: 'C', latex: '3x^2 - 2x + 4' },
          { optionId: 'D', latex: '8x^2 - 4x + 1' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W4-S08-V2',
        questionLatex: 'Kết quả của phép chia $(15x^5 - 20x^3) : (5x^3)$ là:',
        storyContext: 'Rút gọn lũy thừa biến theo công thức x^m : x^n = x^(m-n).',
        options: [
          { optionId: 'A', latex: '3x^2 - 4' },
          { optionId: 'B', latex: '3x^2 - 4x' },
          { optionId: 'C', latex: '10x^2 - 15' },
          { optionId: 'D', latex: '3x^2 + 4' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W4-S09',
    chapterId: 4,
    stageId: 9,
    topic: 'Nghiệm của đa thức bậc nhất',
    difficulty: 2,
    variants: [
      {
        variantId: 'W4-S09-V1',
        questionLatex: 'Tìm nghiệm của đa thức $P(x) = 3x - 15$.',
        storyContext: 'Tìm giá trị x làm cho giá trị đa thức bằng 0 để triệt tiêu chướng ngại vật.',
        options: [
          { optionId: 'A', latex: 'x = 5' },
          { optionId: 'B', latex: 'x = -5' },
          { optionId: 'C', latex: 'x = \\dfrac{1}{5}' },
          { optionId: 'D', latex: 'x = 0' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W4-S09-V2',
        questionLatex: 'Nghiệm của đa thức $Q(x) = 2x + 7$ là:',
        storyContext: 'Chuyển vế đổi dấu và chia cho hệ số của x.',
        options: [
          { optionId: 'A', latex: 'x = -\\dfrac{7}{2}' },
          { optionId: 'B', latex: 'x = \\dfrac{7}{2}' },
          { optionId: 'C', latex: 'x = -\\dfrac{2}{7}' },
          { optionId: 'D', latex: 'x = -5' },
        ],
        correctOptionId: 'A'
      }
    ]
  },
  {
    questionId: 'W4-S10',
    chapterId: 4,
    stageId: 10,
    topic: 'TRÙM ĐẠI THẾ GIỚI: Biến đổi thu gọn tối cao',
    difficulty: 3,
    isBoss: true,
    variants: [
      {
        variantId: 'W4-S10-V1',
        questionLatex: 'Đại Hiền Triết Tri Thức phóng ra biểu thức tối hậu: $Q(x) = (3x^2 \\cdot x^3) \\cdot (-4x^4 \\cdot x)$. Xác định hệ số và bậc của $Q(x)$ sau khi thu gọn hoàn toàn!',
        storyContext: 'TRẬN ĐẤU CUỐI CÙNG: Boss Tối Thượng đứng trước cổng Đền Thờ Trí Tuệ, hãy giải mã hệ số và bậc tối cao!',
        options: [
          { optionId: 'A', latex: 'Hệ số $-12$, bậc $10$' },
          { optionId: 'B', latex: 'Hệ số $12$, bậc $10$' },
          { optionId: 'C', latex: 'Hệ số $-12$, bậc $9$' },
          { optionId: 'D', latex: 'Hệ số $-7$, bậc $10$' },
        ],
        correctOptionId: 'A'
      },
      {
        variantId: 'W4-S10-V2',
        questionLatex: 'Biểu thức tối thượng: $K(x) = (-2x^3 \\cdot 5x^2) \\cdot (x^4 \\cdot 3x^2)$. Tìm hệ số và bậc của $K(x)$.',
        storyContext: 'TRẬN ĐẤU CUỐI CÙNG: Thu gọn nhân tất cả hệ số và cộng dồn toàn bộ số mũ bậc lũy thừa của x!',
        options: [
          { optionId: 'A', latex: 'Hệ số $-30$, bậc $11$' },
          { optionId: 'B', latex: 'Hệ số $30$, bậc $11$' },
          { optionId: 'C', latex: 'Hệ số $-30$, bậc $12$' },
          { optionId: 'D', latex: 'Hệ số $-10$, bậc $11$' },
        ],
        correctOptionId: 'A'
      }
    ]
  }
];

export function getQuestionById(questionId: string): QuestionDefinition | undefined {
  return QUESTIONS_BANK.find(q => q.questionId === questionId);
}
