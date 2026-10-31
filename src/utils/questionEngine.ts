/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionDefinition, QuestionVariant, QuestionOption } from '../types/game';
import { QUESTIONS_BANK, getQuestionById } from '../data/questionsBank';

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomNonZero(min: number, max: number): number {
  let val = 0;
  while (val === 0) {
    val = randomInt(min, max);
  }
  return val;
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function simplifyFraction(num: number, den: number): { num: number; den: number } {
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const g = gcd(num, den);
  return { num: num / g, den: den / g };
}

export function formatFractionLatex(num: number, den: number): string {
  const { num: sNum, den: sDen } = simplifyFraction(num, den);
  if (sDen === 1) return `${sNum}`;
  if (sNum < 0) return `-\\dfrac{${Math.abs(sNum)}}{${sDen}}`;
  return `\\dfrac{${sNum}}{${sDen}}`;
}

/**
 * Generate a fresh mathematical variant using RandomInt(-50, 50) and verified math properties
 */
export function generateDynamicQuestionVariant(questionId: string): QuestionVariant | null {
  const qDef = getQuestionById(questionId);
  if (!qDef) return null;

  const variantId = `${questionId}-DYN-${Date.now()}-${randomInt(100, 999)}`;

  switch (questionId) {
    // 1-1: Sắp xếp số hữu tỉ
    case 'W1-S01': {
      let a = randomInt(-9, -2);
      const b = randomInt(2, 5);
      if (a / b === -1) a = -b - 1; // ensure distinct from -1
      const c = randomInt(1, 9);
      const d = randomInt(2, 5);

      const items = [
        { val: a / b, latex: formatFractionLatex(a, b) },
        { val: 0, latex: '0' },
        { val: c / d, latex: formatFractionLatex(c, d) },
        { val: -1, latex: '-1' },
      ];

      // Shuffle prompt presentation order
      const shuffledForPrompt = [...items].sort(() => Math.random() - 0.5);
      const promptLatex = shuffledForPrompt.map(it => it.latex).join(';\\; ');

      // Ascending sort
      const sorted = [...items].sort((x, y) => x.val - y.val);
      const correctLatex = sorted.map(it => it.latex).join(' < ');

      // Distractor 1: descending order
      const wrong1 = [...sorted].reverse().map(it => it.latex).join(' < ');
      // Distractor 2: swapped middle elements
      const wrong2 = [sorted[1], sorted[0], sorted[2], sorted[3]].map(it => it.latex).join(' < ');
      // Distractor 3: positive before negative
      const wrong3 = [sorted[0], sorted[2], sorted[1], sorted[3]].map(it => it.latex).join(' < ');

      return {
        variantId,
        questionLatex: `Hãy sắp xếp các số hữu tỉ sau theo thứ tự từ nhỏ đến lớn: $${promptLatex}$`,
        storyContext: 'Dòng năng lượng số học bị đảo lộn, hãy sắp xếp các giá trị theo thứ tự tăng dần.',
        options: [
          { optionId: 'A', latex: `$${correctLatex}$` },
          { optionId: 'B', latex: `$${wrong1}$` },
          { optionId: 'C', latex: `$${wrong2}$` },
          { optionId: 'D', latex: `$${wrong3}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 1-2: Cộng trừ hai số hữu tỉ với RandomInt(-50, 50)
    case 'W1-S02': {
      const a = randomNonZero(-25, 25);
      const b = randomInt(2, 12);
      const c = randomNonZero(-25, 25);
      const d = randomInt(2, 12);
      const isPlus = Math.random() > 0.5;

      const numRes = isPlus ? a * d + b * c : a * d - b * c;
      const denRes = b * d;
      const correctLatex = formatFractionLatex(numRes, denRes);
      const wrong1 = formatFractionLatex(-numRes, denRes);
      const wrong2 = formatFractionLatex(numRes + 1, denRes);
      const wrong3 = formatFractionLatex(numRes, denRes + 1);

      return {
        variantId,
        questionLatex: `Tính giá trị của phép tính: $A = ${formatFractionLatex(a, b)} ${isPlus ? '+' : '-'} \\left(${formatFractionLatex(c, d)}\\right)$`,
        storyContext: 'Hai luồng tinh thạch hữu tỉ giao thoa tạo nên năng lượng mới, hãy tính tổng giá trị của chúng.',
        options: [
          { optionId: 'A', latex: `$${correctLatex}$` },
          { optionId: 'B', latex: `$${wrong1}$` },
          { optionId: 'C', latex: `$${wrong2}$` },
          { optionId: 'D', latex: `$${wrong3}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 1-3: Số hữu tỉ và số thập phân
    case 'W1-S03': {
      const a = randomNonZero(-30, 30);
      const b = [2, 4, 5, 10, 20][randomInt(0, 4)];
      const m = [0.25, 0.5, 0.75, 1.25, 1.5, 2.5][randomInt(0, 5)];
      const mFrac = { num: Math.round(m * 100), den: 100 };
      const numRes = a * mFrac.den - b * mFrac.num;
      const denRes = b * mFrac.den;
      const correctLatex = formatFractionLatex(numRes, denRes);

      return {
        variantId,
        questionLatex: `Tính giá trị của biểu thức: $C = ${formatFractionLatex(a, b)} - ${m.toString().replace('.', ',')}$`,
        storyContext: 'Rễ cây cổ thụ hấp thụ số thập phân và phân số, hãy tìm giá trị rút gọn của biểu thức.',
        options: [
          { optionId: 'A', latex: `$${correctLatex}$` },
          { optionId: 'B', latex: `$${formatFractionLatex(-numRes, denRes)}$` },
          { optionId: 'C', latex: `$${formatFractionLatex(numRes + b, denRes)}$` },
          { optionId: 'D', latex: `$${formatFractionLatex(numRes, denRes * 2)}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 1-4: Nhân chia lũy thừa cùng cơ số
    case 'W1-S04': {
      const a = randomNonZero(-9, 9);
      const b = randomInt(2, 9);
      const m = randomInt(3, 7);
      const n = randomInt(2, m - 1);
      const isMul = Math.random() > 0.5;
      const pRes = isMul ? m + n : m - n;

      return {
        variantId,
        questionLatex: isMul
          ? `Viết kết quả sau dưới dạng một lũy thừa: $\\left(${formatFractionLatex(a, b)}\\right)^${m} \\cdot \\left(${formatFractionLatex(a, b)}\\right)^${n}$`
          : `Viết kết quả phép chia dưới dạng lũy thừa: $\\left(${formatFractionLatex(a, b)}\\right)^${m} : \\left(${formatFractionLatex(a, b)}\\right)^${n}$`,
        storyContext: 'Ghép nối các nguồn năng lượng lũy thừa cùng cơ số để thắp sáng hang tối.',
        options: [
          { optionId: 'A', latex: `$\\left(${formatFractionLatex(a, b)}\\right)^{${pRes}}$` },
          { optionId: 'B', latex: `$\\left(${formatFractionLatex(a, b)}\\right)^{${m * n}}$` },
          { optionId: 'C', latex: `$\\left(${formatFractionLatex(a, b)}\\right)^{${pRes + 2}}$` },
          { optionId: 'D', latex: `$\\left(${formatFractionLatex(a * 2, b)}\\right)^{${pRes}}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 1-5: Lũy thừa của lũy thừa
    case 'W1-S05': {
      const a = randomNonZero(-20, 20);
      const m = randomInt(2, 5);
      const n = randomInt(2, 5);
      const pRes = m * n;

      return {
        variantId,
        questionLatex: `Viết kết quả sau dưới dạng lũy thừa: $\\left(${a >= 0 ? a : `(${a})`}^${m}\\right)^${n}$`,
        storyContext: 'Kích hoạt vòng tròn ma thuật nâng bậc lũy thừa theo cấp số nhân.',
        options: [
          { optionId: 'A', latex: `$${a >= 0 ? a : `(${a})`}^{${pRes}}$` },
          { optionId: 'B', latex: `$${a >= 0 ? a : `(${a})`}^{${m + n}}$` },
          { optionId: 'C', latex: `$${a >= 0 ? a : `(${a})`}^{${Math.pow(m, n)}}$` },
          { optionId: 'D', latex: `$${a * 2}^{${pRes}}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 1-6: So sánh giá trị tuyệt đối
    case 'W1-S06': {
      const m = randomNonZero(-30, 30);
      const n = randomInt(2, 10);
      const p = randomNonZero(-30, 30);
      const q = randomInt(2, 10);
      const valA = Math.abs(m / n);
      const valB = Math.abs(p / q);

      const sign = valA > valB ? '>' : valA < valB ? '<' : '=';

      return {
        variantId,
        questionLatex: `Cho hai số $a = ${formatFractionLatex(m, n)}$ và $b = ${formatFractionLatex(p, q)}$. Hãy so sánh $|a|$ và $|b|$.`,
        storyContext: 'Nhìn thấu qua gương ma thuật để so sánh khoảng cách thực đến gốc tọa độ.',
        options: [
          { optionId: 'A', latex: `$|a| ${sign} |b|$` },
          { optionId: 'B', latex: `$|a| ${sign === '>' ? '<' : '>'} |b|$` },
          { optionId: 'C', latex: `$|a| = -|b|$` },
          { optionId: 'D', latex: `$\\text{Không thể so sánh được}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 1-7: Căn bậc hai số học
    case 'W1-S07': {
      const k = randomInt(11, 40);
      const m = k * k;

      return {
        variantId,
        questionLatex: `Tìm căn bậc hai số học của số $a = ${m}$ (tức $\\sqrt{${m}}$).`,
        storyContext: 'Tìm số dương căn bản tạo nên sức mạnh của khối đá lập phương.',
        options: [
          { optionId: 'A', latex: `$${k}$` },
          { optionId: 'B', latex: `$-${k}$` },
          { optionId: 'C', latex: `$\\pm ${k}$` },
          { optionId: 'D', latex: `$${k + 10}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 1-8: So sánh căn bậc hai và số tự nhiên
    case 'W1-S08': {
      const n = randomInt(6, 30);
      const diff = randomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
      const m = n * n + diff;
      const isGreater = m > n * n;

      return {
        variantId,
        questionLatex: `So sánh hai số $x = \\sqrt{${m}}$ và $y = ${n}$. Khẳng định nào sau đây là ĐÚNG?`,
        storyContext: 'Đặt lên bàn cân giữa giá trị vô tỉ và số tự nhiên.',
        options: [
          { optionId: 'A', latex: `$x ${isGreater ? '>' : '<'} y$` },
          { optionId: 'B', latex: `$x ${isGreater ? '<' : '>'} y$` },
          { optionId: 'C', latex: `$x = y$` },
          { optionId: 'D', latex: `$x \\ge y + 1$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 1-9: Tìm x trong đẳng thức chứa căn bậc hai với RandomInt(-50, 50)
    case 'W1-S09': {
      const k1 = randomInt(2, 10);
      const m = k1 * k1;
      const k2 = randomInt(2, 10);
      const n = k2 * k2;
      const a = randomNonZero(-5, 5);
      const b = randomInt(2, 6);
      const c = randomNonZero(-5, 5);
      const d = randomInt(2, 6);

      // (a/b)*x + k1 = (c/d)*k2 => (a/b)*x = (c*k2/d) - k1 => x = [c*k2/d - k1] * (b/a)
      const rightNum = c * k2 - k1 * d;
      const rightDen = d;
      const xNum = rightNum * b;
      const xDen = rightDen * a;
      const correctLatex = formatFractionLatex(xNum, xDen);

      return {
        variantId,
        questionLatex: `Tìm $x$ thỏa mãn đẳng thức: $${formatFractionLatex(a, b)} \\cdot x + \\sqrt{${m}} = ${formatFractionLatex(c, d)} \\cdot \\sqrt{${n}}$`,
        storyContext: 'Giải mã ẩn số x đang giam giữ kho báu cổ dưới lòng thung lũng.',
        options: [
          { optionId: 'A', latex: `$x = ${correctLatex}$` },
          { optionId: 'B', latex: `$x = ${formatFractionLatex(-xNum, xDen)}$` },
          { optionId: 'C', latex: `$x = ${formatFractionLatex(xNum + 2, xDen)}$` },
          { optionId: 'D', latex: `$x = ${formatFractionLatex(xNum, xDen + 1)}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 1-10: TRÙM: Chu vi hình vuông có diện tích S
    case 'W1-S10': {
      const k = randomInt(25, 80);
      const S = k * k;
      const P = 4 * k;

      return {
        variantId,
        questionLatex: `Hộ Vệ Thần Thạch bảo vệ vùng đất hình vuông có diện tích $S = ${S}\\text{ m}^2$. Chu vi $P$ của vùng đất này là bao nhiêu?`,
        storyContext: 'TRẬN ĐẤU TRÙM: Thần Thạch yêu cầu bạn tính chu vi để phá vỡ vòng bảo vệ!',
        options: [
          { optionId: 'A', latex: `$P = ${P}\\text{ m}$` },
          { optionId: 'B', latex: `$P = ${k * 2}\\text{ m}$` },
          { optionId: 'C', latex: `$P = ${P + 20}\\text{ m}$` },
          { optionId: 'D', latex: `$P = ${Math.round(S / 2)}\\text{ m}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 2-1: Góc đối đỉnh
    case 'W2-S01': {
      const alpha = randomInt(25, 155);
      return {
        variantId,
        questionLatex: `Cho hai góc $\\widehat{xAy}$ và $\\widehat{zAt}$ là hai góc đối đỉnh. Biết $\\widehat{xAy} = ${alpha}^\\circ$. Tính số đo của góc $\\widehat{zAt}$.`,
        storyContext: 'Xác định số đo góc đối đỉnh tại giao lộ các tia sáng thần bí.',
        options: [
          { optionId: 'A', latex: `$\\widehat{zAt} = ${alpha}^\\circ$` },
          { optionId: 'B', latex: `$\\widehat{zAt} = ${180 - alpha}^\\circ$` },
          { optionId: 'C', latex: `$\\widehat{zAt} = ${Math.abs(90 - alpha)}^\\circ$` },
          { optionId: 'D', latex: `$\\widehat{zAt} = 180^\\circ$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 2-2: Góc kề bù
    case 'W2-S02': {
      const alpha = randomInt(25, 155);
      const ans = 180 - alpha;
      return {
        variantId,
        questionLatex: `Cho $\\widehat{xAy}$ và $\\widehat{yAz}$ là hai góc kề bù. Biết $\\widehat{xAy} = ${alpha}^\\circ$. Tính số đo góc $\\widehat{yAz}$.`,
        storyContext: 'Tìm góc bù đắp để hoàn thành nửa vòng tròn 180 độ thẳng tắp.',
        options: [
          { optionId: 'A', latex: `$\\widehat{yAz} = ${ans}^\\circ$` },
          { optionId: 'B', latex: `$\\widehat{yAz} = ${alpha}^\\circ$` },
          { optionId: 'C', latex: `$\\widehat{yAz} = ${Math.abs(90 - alpha)}^\\circ$` },
          { optionId: 'D', latex: `$\\widehat{yAz} = 90^\\circ$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 2-4: Cặp góc đồng vị
    case 'W2-S04': {
      const alpha = randomInt(35, 145);
      return {
        variantId,
        questionLatex: `Cho hai đường thẳng song song $m \\parallel n$ bị cắt bởi một cát tuyến. Biết một góc đồng vị có số đo bằng $${alpha}^\\circ$. Góc đồng vị còn lại có số đo bằng bao nhiêu?`,
        storyContext: 'Xác định cặp góc cùng vị trí để cân chỉnh hướng đi của thuyền mây.',
        options: [
          { optionId: 'A', latex: `$${alpha}^\\circ$` },
          { optionId: 'B', latex: `$${180 - alpha}^\\circ$` },
          { optionId: 'C', latex: `$${Math.abs(90 - alpha)}^\\circ$` },
          { optionId: 'D', latex: `$${(alpha + 20) % 180}^\\circ$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 2-5: Tia phân giác
    case 'W2-S05': {
      const half = randomInt(18, 75);
      const total = half * 2;
      return {
        variantId,
        questionLatex: `Cho góc $\\widehat{xAy} = ${total}^\\circ$ và tia $At$ là tia phân giác của góc $\\widehat{xAy}$. Tính số đo của góc $\\widehat{xAt}$.`,
        storyContext: 'Bắn tia sáng phân giác chia góc xuất phát thành hai nửa bằng nhau tuyệt đối.',
        options: [
          { optionId: 'A', latex: `$\\widehat{xAt} = ${half}^\\circ$` },
          { optionId: 'B', latex: `$\\widehat{xAt} = ${total}^\\circ$` },
          { optionId: 'C', latex: `$\\widehat{xAt} = ${180 - total}^\\circ$` },
          { optionId: 'D', latex: `$\\widehat{xAt} = ${half - 5}^\\circ$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 2-6: Tổng ba góc tam giác
    case 'W2-S06': {
      const b = randomInt(25, 80);
      const c = randomInt(25, 140 - b);
      const a = 180 - b - c;
      return {
        variantId,
        questionLatex: `Cho tam giác $\\triangle ABC$. Biết $\\widehat{B} = ${b}^\\circ$ và $\\widehat{C} = ${c}^\\circ$. Tính số đo của góc $\\widehat{A}$.`,
        storyContext: 'Tính góc thứ ba khi biết hai góc tại chân đài quan sát.',
        options: [
          { optionId: 'A', latex: `$\\widehat{A} = ${a}^\\circ$` },
          { optionId: 'B', latex: `$\\widehat{A} = ${a + 10}^\\circ$` },
          { optionId: 'C', latex: `$\\widehat{A} = ${180 - a}^\\circ$` },
          { optionId: 'D', latex: `$\\widehat{A} = ${b + c}^\\circ$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 2-7: Góc nhọn trong tam giác vuông
    case 'W2-S07': {
      const b = randomInt(15, 75);
      const c = 90 - b;
      return {
        variantId,
        questionLatex: `Cho tam giác $\\triangle ABC$ vuông tại $A$. Biết góc $\\widehat{B} = ${b}^\\circ$. Tính số đo góc nhọn $\\widehat{C}$.`,
        storyContext: 'Vận dụng tính chất hai góc nhọn phụ nhau 90 độ để mở chốt cửa.',
        options: [
          { optionId: 'A', latex: `$\\widehat{C} = ${c}^\\circ$` },
          { optionId: 'B', latex: `$\\widehat{C} = ${180 - b}^\\circ$` },
          { optionId: 'C', latex: `$\\widehat{C} = ${b}^\\circ$` },
          { optionId: 'D', latex: `$\\widehat{C} = ${c + 15}^\\circ$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 2-10: TRÙM: Tìm biến x từ quan hệ góc tam giác
    case 'W2-S10': {
      const a = randomInt(5, 25);
      const b = randomInt(a + 5, 45);
      const x = Math.round((180 - a - b) / 3);
      const adjustedA = 180 - 3 * x - b;

      return {
        variantId,
        questionLatex: `Tướng Quân Lượng Giác giăng kết giới tam giác có $\\widehat{A} = x$, $\\widehat{B} = x + ${adjustedA}^\\circ$, $\\widehat{C} = x + ${b}^\\circ$. Hãy tìm giá trị của $x$.`,
        storyContext: 'TRẬN ĐẤU TRÙM: Giải phương trình tổng 3 góc bằng 180 độ để phá phong ấn!',
        options: [
          { optionId: 'A', latex: `$x = ${x}^\\circ$` },
          { optionId: 'B', latex: `$x = ${x + 10}^\\circ$` },
          { optionId: 'C', latex: `$x = ${x - 5}^\\circ$` },
          { optionId: 'D', latex: `$x = ${Math.round(x / 2)}^\\circ$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 3-2: Tìm x trong tỉ lệ thức với RandomInt(-50, 50)
    case 'W3-S02': {
      const b = randomInt(2, 10);
      const k = randomNonZero(-8, 8);
      const a = k * b;
      const c = randomNonZero(-25, 25);
      const x = (a * c) / b;

      return {
        variantId,
        questionLatex: `Tìm $x$ trong tỉ lệ thức: $\\dfrac{${a}}{${b}} = \\dfrac{x}{${c}}$`,
        storyContext: 'Dùng quy tắc tích chéo tìm ẩn số x giải thoát người lữ hành bị lạc.',
        options: [
          { optionId: 'A', latex: `$x = ${x}$` },
          { optionId: 'B', latex: `$x = ${-x}$` },
          { optionId: 'C', latex: `$x = ${x + 2}$` },
          { optionId: 'D', latex: `$x = ${Math.round(x / 2)}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 3-3: Tìm hai số biết tỉ số và tổng/hiệu
    case 'W3-S03': {
      const a = randomInt(2, 7);
      const b = randomInt(a + 1, 10);
      const m = randomInt(2, 6);
      const k = (a + b) * m;
      const x = a * m;
      const y = b * m;

      return {
        variantId,
        questionLatex: `Tìm hai số $x$ và $y$ biết $\\dfrac{x}{${a}} = \\dfrac{y}{${b}}$ và $x + y = ${k}$.`,
        storyContext: 'Phân chia lưu lượng nước theo đúng tỉ số đã định.',
        options: [
          { optionId: 'A', latex: `$x = ${x};\\; y = ${y}$` },
          { optionId: 'B', latex: `$x = ${y};\\; y = ${x}$` },
          { optionId: 'C', latex: `$x = ${x + 5};\\; y = ${y - 5}$` },
          { optionId: 'D', latex: `$x = ${a};\\; y = ${b}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 3-5: Định nghĩa tỉ lệ thuận y = kx (k \neq 0)
    case 'W3-S05': {
      const k = randomNonZero(-12, 12);
      const xVal = randomInt(-10, 10) || 3;
      const yVal = k * xVal;
      return {
        variantId,
        questionLatex: `Cho biết đại lượng $y$ tỉ lệ thuận với đại lượng $x$ theo công thức $y = kx$ (với $k \\neq 0$). Biết khi $x = ${xVal}$ thì $y = ${yVal}$. Hệ số tỉ lệ $k$ bằng:`,
        storyContext: 'Xác định hệ số tỉ lệ thuận giữa năng lượng ánh sáng và sự phát triển.',
        options: [
          { optionId: 'A', latex: `$k = ${k}$` },
          { optionId: 'B', latex: `$k = ${-k}$` },
          { optionId: 'C', latex: `$k = ${k + 2}$` },
          { optionId: 'D', latex: `$k = ${yVal}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 3-7: Tỉ lệ thuận
    case 'W3-S07': {
      const k = randomNonZero(-8, 8);
      const x1 = randomInt(2, 8);
      const y1 = k * x1;
      const x2 = randomNonZero(-20, 20);
      const y2 = k * x2;

      return {
        variantId,
        questionLatex: `Cho $y$ tỉ lệ thuận với $x$. Khi $x = ${x1}$ thì $y = ${y1}$. Hỏi khi $x = ${x2}$ thì $y$ bằng bao nhiêu?`,
        storyContext: 'Nhập giá trị đầu vào để máy tính suy ra đại lượng thuận tương ứng.',
        options: [
          { optionId: 'A', latex: `$y = ${y2}$` },
          { optionId: 'B', latex: `$y = ${-y2}$` },
          { optionId: 'C', latex: `$y = ${y2 + 2}$` },
          { optionId: 'D', latex: `$y = ${Math.round(y2 / 2)}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 4-5: Tính giá trị đa thức tại x = k với RandomInt(-50, 50)
    case 'W4-S05': {
      const a = randomNonZero(-5, 5);
      const b = randomNonZero(-10, 10);
      const c = randomInt(-30, 30);
      const k = randomInt(-3, 3);
      const res = a * k * k + b * k + c;

      return {
        variantId,
        questionLatex: `Tính giá trị của đa thức $P(x) = ${a}x^2 ${b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`} ${c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`}$ tại $x = ${k}$.`,
        storyContext: 'Thay ẩn số cụ thể vào biểu thức để đo đạc năng lượng tổng thể.',
        options: [
          { optionId: 'A', latex: `$P(${k}) = ${res}$` },
          { optionId: 'B', latex: `$P(${k}) = ${-res}$` },
          { optionId: 'C', latex: `$P(${k}) = ${res + 4}$` },
          { optionId: 'D', latex: `$P(${k}) = ${res - 5}$` },
        ],
        correctOptionId: 'A'
      };
    }

    // 4-9: Tìm nghiệm của đa thức bậc nhất ax + b = 0
    case 'W4-S09': {
      const a = randomNonZero(-15, 15);
      const b = randomNonZero(-40, 40);
      const ansLatex = formatFractionLatex(-b, a);

      return {
        variantId,
        questionLatex: `Tìm nghiệm của đa thức $P(x) = ${a}x ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}$.`,
        storyContext: 'Tìm giá trị x làm cho giá trị của đa thức bằng 0 để triệt tiêu chướng ngại vật.',
        options: [
          { optionId: 'A', latex: `$x = ${ansLatex}$` },
          { optionId: 'B', latex: `$x = ${formatFractionLatex(b, a)}$` },
          { optionId: 'C', latex: `$x = ${formatFractionLatex(-a, b)}$` },
          { optionId: 'D', latex: `$x = 0$` },
        ],
        correctOptionId: 'A'
      };
    }

    default:
      // Return predefined variant with formatted LaTeX
      return qDef.variants[randomInt(0, qDef.variants.length - 1)];
  }
}

export function assignQuestionVariantsForCharacter(characterId: string): Record<string, string> {
  const assignments: Record<string, string> = {};
  
  let hash = 0;
  for (let i = 0; i < characterId.length; i++) {
    hash = (hash << 5) - hash + characterId.charCodeAt(i);
    hash |= 0;
  }

  QUESTIONS_BANK.forEach((q, idx) => {
    const variantIndex = Math.abs(hash + idx) % q.variants.length;
    assignments[q.questionId] = q.variants[variantIndex].variantId;
  });

  return assignments;
}

export function getCharacterVariant(
  questionDef: QuestionDefinition,
  assignedVariantId?: string,
  cachedCustomVariants?: Record<string, QuestionVariant>
): QuestionVariant {
  // Check cached custom variant first
  if (cachedCustomVariants && cachedCustomVariants[questionDef.questionId]) {
    return cachedCustomVariants[questionDef.questionId];
  }

  if (assignedVariantId) {
    const found = questionDef.variants.find(v => v.variantId === assignedVariantId);
    if (found) return found;
  }

  // Generate dynamic verified variant
  const dyn = generateDynamicQuestionVariant(questionDef.questionId);
  if (dyn) return dyn;

  return questionDef.variants[0];
}

export function normalizeOptionLatex(latex: string): string {
  if (!latex) return '';
  if (latex.includes('$')) return latex;
  const hasMacro = /\\[a-zA-Z]+/.test(latex);
  const hasMathSymbols = /[\^_{}=<>+\-*/]|\d+/.test(latex);
  const hasVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(latex);
  
  if (latex.startsWith('\\text{') || hasMacro) {
    return `$${latex}$`;
  }
  if (!hasVietnamese && hasMathSymbols) {
    return `$${latex}$`;
  }
  return latex;
}

export function prepareOptionsForDisplay(
  variant: QuestionVariant,
  cardType: 'light' | 'dark'
): { options: QuestionOption[]; correctId: 'A' | 'B' | 'C' | 'D' } {
  const normalizedVariantOptions = variant.options.map(opt => ({
    ...opt,
    latex: normalizeOptionLatex(opt.latex)
  }));
  const correctOption = normalizedVariantOptions.find(o => o.optionId === variant.correctOptionId)!;
  const wrongOptions = normalizedVariantOptions.filter(o => o.optionId !== variant.correctOptionId);

  if (cardType === 'light') {
    // Pick 1 wrong option at random to make 2 options
    const pickedWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)] || normalizedVariantOptions[1];
    const twoOptions = [correctOption, pickedWrong];
    
    // Shuffle the 2 options
    if (Math.random() > 0.5) {
      twoOptions.reverse();
    }

    const remapped = twoOptions.map((opt, idx) => ({
      ...opt,
      optionId: (idx === 0 ? 'A' : 'B') as 'A' | 'B'
    }));

    const newCorrect = remapped.find(o => o.latex === correctOption.latex)!.optionId;
    return { options: remapped, correctId: newCorrect };
  } else {
    // Dark card: 4 options shuffled
    const shuffled = [...normalizedVariantOptions].sort(() => Math.random() - 0.5);
    const remapped = shuffled.map((opt, idx) => {
      const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
      return {
        ...opt,
        optionId: letters[idx]
      };
    });
    const newCorrect = remapped.find(o => o.latex === correctOption.latex)!.optionId;
    return { options: remapped, correctId: newCorrect };
  }
}
