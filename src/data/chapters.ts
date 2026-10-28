/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChapterDefinition, StageDefinition } from '../types/game';

export const CHAPTERS: ChapterDefinition[] = [
  {
    chapterId: 1,
    name: 'Chương 1: Thung Lũng Số Thực',
    shortName: 'Số Thực',
    description: 'Vùng thung lũng huyền bí ẩn chứa các tinh thể phân số, lũy thừa và căn bậc hai cổ đại.',
    bgImage: '/src/assets/images/chapter_real_numbers_1793188992710.jpg',
    stagesCount: 10,
    storyIntro: [
      'Gió lạnh thổi qua hẻm núi Thung Lũng Số Thực, nơi những viên đá số hữu tỉ bay lơ lửng quanh thác nước pha lê.',
      'Để khai thông con đường phía trước, bạn phải dùng lý trí và ngọn đuốc tri thức để sắp xếp trật tự các con số và giải mã sức mạnh căn bậc hai.',
      'Người bảo hộ thung lũng đang chờ đợi bạn tại ải thứ 10. Hãy cẩn trọng trước mỗi bước chân!'
    ],
    storyCompletion: [
      'Tinh thể Số Thực bừng sáng! Cột ánh sáng năng lượng nối liền đất trời đã mở ra lối đi lên Đảo Góc trên tầng mây.',
      'Bạn đã chứng minh được sự vững vàng trong nền tảng Số Học. Những bước chân đầu tiên đã để lại dấu ấn của một nhà thám hiểm tài ba!'
    ]
  },
  {
    chapterId: 2,
    name: 'Chương 2: Đảo Góc Kỳ Bí',
    shortName: 'Đảo Góc',
    description: 'Hòn đảo lơ lửng giữa biển mây với các cung điện đá cẩm thạch xếp theo các góc đối đỉnh và đường thẳng song song.',
    bgImage: '/src/assets/images/chapter_angles_island_1793188993102.jpg',
    stagesCount: 10,
    storyIntro: [
      'Bước chân lên Đảo Góc, bạn thấy những đài thiên văn và cột đá cẩm thạch chiếu rọi những luồng tia sáng đan xen nhau.',
      'Mỗi ngã rẽ là một thử thách về góc đối đỉnh, góc kề bù, cặp góc so le trong và quy luật 180 độ thiêng liêng của tam giác.',
      'Chỉ người nắm giữ chìa khóa Hình Học mới có thể vượt qua kết giới gió lốc của Hộ Vệ Thần Góc!'
    ],
    storyCompletion: [
      'Kết giới hình học hoàn toàn khuất phục trước kiến thức hình học sắc bén của bạn!',
      'Cánh cổng dẫn xuống Đầm Lầy Tỉ Lệ bên dưới đã mở ra. Bí ẩn tiếp theo đang vẫy gọi.'
    ]
  },
  {
    chapterId: 3,
    name: 'Chương 3: Đầm Lầy Tỉ Lệ',
    shortName: 'Tỉ Lệ',
    description: 'Vùng đầm lầy huyền diệu nơi những chiếc cân công lý cổ đại cân đo sự cân bằng giữa các đại lượng thuận nghịch.',
    bgImage: '/src/assets/images/chapter_ratio_swamp_1793188993337.jpg',
    stagesCount: 10,
    storyIntro: [
      'Màn sương tím phủ mờ Đầm Lầy Tỉ Lệ. Nơi đây, mọi vạn vật đều chuyển động theo quy luật tỉ lệ thức và dãy tỉ số bằng nhau.',
      'Một sai lệch nhỏ trong phép nhân chéo hay hệ số tỉ lệ cũng có thể khiến chiếc cầu đá chìm sâu dưới làn nước tối.',
      'Hãy giữ cho tâm trí thăng bằng như chiếc cân tri thức để vượt qua bẫy đầm lầy!'
    ],
    storyCompletion: [
      'Sự cân bằng hoàn mỹ đã được tái lập trên Đầm Lầy Tỉ Lệ! Dòng nước phát quang mở ra đại lộ dẫn vào Thị Trấn Đa Thức.',
      'Bạn đã tiến rất gần đến đỉnh cao của hành trình tri thức Toán học!'
    ]
  },
  {
    chapterId: 4,
    name: 'Chương 4: Thị Trấn Đa Thức Một Biến',
    shortName: 'Đa Thức',
    description: 'Thánh địa văn minh kiến thức rực rỡ, nơi ngự trị của những bậc đại hiền triết và ẩn số x huyền thoại.',
    bgImage: '/src/assets/images/game_cover_knowledge_1793188991559.jpg',
    stagesCount: 10,
    storyIntro: [
      'Thị Trấn Đa Thức hiện ra tráng lệ với những thư viện vô tận lưu giữ phương trình của các bậc cổ nhân.',
      'Tại đây, bạn sẽ đối mặt với các phép toán thu gọn, cộng trừ nhân chia và tìm nghiệm đa thức ở mức độ tinh vi nhất.',
      'Tại trung tâm thị trấn là Đền Thờ Trí Tuệ Tối Cao, nơi Boss Tối Thượng đang đợi để thử thách bản lĩnh tột cùng của bạn!'
    ],
    storyCompletion: [
      'Đại Hiền Triết mỉm cười gật đầu trao cho bạn Vương Miện Trí Tuệ Vĩnh Hằng!',
      'Bạn đã xuất sắc vượt qua toàn bộ 40 thử thách Toán học, thắp sáng toàn bộ bản đồ thế giới tri thức!'
    ]
  }
];

export const STAGES_BY_CHAPTER: Record<number, StageDefinition[]> = {
  1: [
    {
      stageId: 1,
      chapterId: 1,
      title: 'Ải 1: Khe Nứt Hữu Tỉ',
      subtitle: 'Sắp xếp dãy số hữu tỉ',
      description: 'Tìm trật tự tăng dần của các mảnh tinh thể hữu tỉ để bắc cầu qua khe núi.',
      isBoss: false,
      questionId: 'W1-S01'
    },
    {
      stageId: 2,
      chapterId: 1,
      title: 'Ải 2: Thác Nước Phân Số',
      subtitle: 'Tổng & hiệu hai số hữu tỉ',
      description: 'Hòa quyện hai dòng chảy phân số thành một kết quả tối giản duy nhất.',
      isBoss: false,
      questionId: 'W1-S02'
    },
    {
      stageId: 3,
      chapterId: 1,
      title: 'Ải 3: Rừng Cây Thập Phân',
      subtitle: 'Hỗn hợp phân số và số thập phân',
      description: 'Quy đổi các dạng số để giải phóng lối đi bị rễ cây phong ấn.',
      isBoss: false,
      questionId: 'W1-S03'
    },
    {
      stageId: 4,
      chapterId: 1,
      title: 'Ải 4: Hang Động Lũy Thừa',
      subtitle: 'Phép nhân & chia cùng cơ số',
      description: 'Ghép nối các nguồn năng lượng lũy thừa cùng cơ số để thắp sáng hang tối.',
      isBoss: false,
      questionId: 'W1-S04'
    },
    {
      stageId: 5,
      chapterId: 1,
      title: 'Ải 5: Cột Mốc Tầng Lũy Thừa',
      subtitle: 'Lũy thừa của lũy thừa',
      description: 'Kích hoạt vòng tròn ma thuật nâng bậc lũy thừa theo cấp số nhân.',
      isBoss: false,
      questionId: 'W1-S05'
    },
    {
      stageId: 6,
      chapterId: 1,
      title: 'Ải 6: Tấm Gương Tuyệt Đối',
      subtitle: 'So sánh giá trị tuyệt đối',
      description: 'Nhìn thấu qua gương ma thuật để so sánh khoảng cách thực đến gốc tọa độ.',
      isBoss: false,
      questionId: 'W1-S06'
    },
    {
      stageId: 7,
      chapterId: 1,
      title: 'Ải 7: Tinh Thể Khai Căn',
      subtitle: 'Căn bậc hai số học',
      description: 'Tìm số dương căn bản tạo nên sức mạnh của khối đá lập phương.',
      isBoss: false,
      questionId: 'W1-S07'
    },
    {
      stageId: 8,
      chapterId: 1,
      title: 'Ải 8: Bàn Cân Vô Tỉ',
      subtitle: 'So sánh căn bậc hai và số tự nhiên',
      description: 'Đặt lên bàn cân giữa giá trị vô tỉ và số tự nhiên để chọn phương án chính xác.',
      isBoss: false,
      questionId: 'W1-S08'
    },
    {
      stageId: 9,
      chapterId: 1,
      title: 'Ải 9: Khóa Cửa Phương Trình Căn',
      subtitle: 'Tìm x trong biểu thức chứa căn',
      description: 'Giải mã ẩn số x đang giam giữ kho báu cổ dưới lòng thung lũng.',
      isBoss: false,
      questionId: 'W1-S09'
    },
    {
      stageId: 10,
      chapterId: 1,
      title: 'Ải 10: TRÙM THUNG LŨNG SỐ THỰC',
      subtitle: 'Chu vi & diện tích vùng đất thiêng',
      description: 'Đối đầu với Hộ Vệ Thần Thạch để tính chu vi lãnh địa hình vuông!',
      isBoss: true,
      bossName: 'Hộ Vệ Thần Thạch',
      bossTitle: 'Chúa Tể Căn Thức',
      questionId: 'W1-S10'
    }
  ],
  2: [
    {
      stageId: 1,
      chapterId: 2,
      title: 'Ải 1: Ngã Tư Đối Đỉnh',
      subtitle: 'Nhận biết góc đối đỉnh',
      description: 'Xác định số đo góc đối đỉnh tại giao lộ các tia sáng thần bí.',
      isBoss: false,
      questionId: 'W2-S01'
    },
    {
      stageId: 2,
      chapterId: 2,
      title: 'Ải 2: Cung Điện Kề Bù',
      subtitle: 'Tính chất hai góc kề bù',
      description: 'Tìm góc bù đắp để hoàn thành nửa vòng tròn 180 độ thẳng tắp.',
      isBoss: false,
      questionId: 'W2-S02'
    },
    {
      stageId: 3,
      chapterId: 2,
      title: 'Ải 3: Đường Ray Song Song I',
      subtitle: 'Cặp góc so le trong',
      description: 'So sánh hai góc so le tạo bởi đường thẳng cắt hai đường song song.',
      isBoss: false,
      questionId: 'W2-S03'
    },
    {
      stageId: 4,
      chapterId: 2,
      title: 'Ải 4: Đường Ray Song Song II',
      subtitle: 'Cặp góc đồng vị',
      description: 'Xác định cặp góc cùng vị trí để cân chỉnh hướng đi của thuyền mây.',
      isBoss: false,
      questionId: 'W2-S04'
    },
    {
      stageId: 5,
      chapterId: 2,
      title: 'Ải 5: Mũi Tên Phân Giác',
      subtitle: 'Tia phân giác chia đôi góc',
      description: 'Bắn tia sáng phân giác chia góc xuất phát thành hai nửa bằng nhau tuyệt đối.',
      isBoss: false,
      questionId: 'W2-S05'
    },
    {
      stageId: 6,
      chapterId: 2,
      title: 'Ải 6: Đỉnh Tháp Tam Giác',
      subtitle: 'Tổng ba góc trong tam giác',
      description: 'Tính góc thứ ba khi biết hai góc tại chân đài quan sát.',
      isBoss: false,
      questionId: 'W2-S06'
    },
    {
      stageId: 7,
      chapterId: 2,
      title: 'Ải 7: Thềm Đá Vuông Góc',
      subtitle: 'Góc nhọn trong tam giác vuông',
      description: 'Vận dụng tính chất hai góc nhọn phụ nhau 90 độ để mở chốt cửa.',
      isBoss: false,
      questionId: 'W2-S07'
    },
    {
      stageId: 8,
      chapterId: 2,
      title: 'Ải 8: Nhận Diện Trận Địa',
      subtitle: 'Phân loại nhọn, vuông, tù',
      description: 'Nhìn số đo góc để phán đoán hình thái tam giác phòng thủ.',
      isBoss: false,
      questionId: 'W2-S08'
    },
    {
      stageId: 9,
      chapterId: 2,
      title: 'Ải 9: Hào Quang Góc Ngoài',
      subtitle: 'Số đo góc ngoài tam giác',
      description: 'Tính góc ngoài bằng tổng hai góc trong không kề để phá phong ấn hào quang.',
      isBoss: false,
      questionId: 'W2-S09'
    },
    {
      stageId: 10,
      chapterId: 2,
      title: 'Ải 10: TRÙM ĐẢO GÓC',
      subtitle: 'Giải mã phương trình góc',
      description: 'Đối đầu Tướng Quân Lượng Giác để tìm giá trị biến x thỏa mãn tổng ba góc!',
      isBoss: true,
      bossName: 'Tướng Quân Lượng Giác',
      bossTitle: 'Hộ Thần Không Gian',
      questionId: 'W2-S10'
    }
  ],
  3: [
    {
      stageId: 1,
      chapterId: 3,
      title: 'Ải 1: Cổng Tỉ Lệ Thức',
      subtitle: 'Từ tích số suy ra tỉ lệ thức',
      description: 'Hoán đổi các vị trí ngoại tỉ và trung tỉ để mở khóa cổng cổ.',
      isBoss: false,
      questionId: 'W3-S01'
    },
    {
      stageId: 2,
      chapterId: 3,
      title: 'Ải 2: Ẩn Số Nhân Chéo',
      subtitle: 'Tìm x trong tỉ lệ thức',
      description: 'Dùng quy tắc tích chéo tìm ẩn số x giải thoát người lữ hành bị lạc.',
      isBoss: false,
      questionId: 'W3-S02'
    },
    {
      stageId: 3,
      chapterId: 3,
      title: 'Ải 3: Suối Cân Bằng Tổng Hiệu',
      subtitle: 'Dãy tỉ số và tổng/hiệu 2 số',
      description: 'Phân chia lưu lượng nước theo đúng tỉ số đã định.',
      isBoss: false,
      questionId: 'W3-S03'
    },
    {
      stageId: 4,
      chapterId: 3,
      title: 'Ải 4: Tam Trụ Đẳng Thức',
      subtitle: 'Dãy tỉ số bằng nhau 3 biến',
      description: 'Giải hệ ba đại lượng x, y, z tạo thành thế kiềng ba chân vững chắc.',
      isBoss: false,
      questionId: 'W3-S04'
    },
    {
      stageId: 5,
      chapterId: 3,
      title: 'Ải 5: Vườn Cây Tỉ Lệ Thuận',
      subtitle: 'Công thức y = kx',
      description: 'Xác định mối tương quan đồng biến giữa năng lượng ánh sáng và sự phát triển.',
      isBoss: false,
      questionId: 'W3-S05'
    },
    {
      stageId: 6,
      chapterId: 3,
      title: 'Ải 6: Đầm Sâu Tỉ Lệ Nghịch',
      subtitle: 'Công thức xy = a',
      description: 'Hiểu rõ quy luật nghịch biến: lực càng tăng thì thời gian càng giảm.',
      isBoss: false,
      questionId: 'W3-S06'
    },
    {
      stageId: 7,
      chapterId: 3,
      title: 'Ải 7: Máy Đo Đồng Dạng',
      subtitle: 'Tính giá trị theo hệ số thuận',
      description: 'Nhập giá trị đầu vào để máy tính suy ra đại lượng thuận tương ứng.',
      isBoss: false,
      questionId: 'W3-S07'
    },
    {
      stageId: 8,
      chapterId: 3,
      title: 'Ải 8: Bánh Răng Nghịch Chiều',
      subtitle: 'Tính giá trị theo hệ số nghịch',
      description: 'Điều chỉnh số vòng quay tương ứng với số răng của hai bánh khớp.',
      isBoss: false,
      questionId: 'W3-S08'
    },
    {
      stageId: 9,
      chapterId: 3,
      title: 'Ải 9: Vạch Trần Ngụy Biện',
      subtitle: 'Phân biệt tỉ lệ trong vật lý (s = v.t)',
      description: 'Tìm khẳng định sai lầm trong mối liên hệ giữa quãng đường, vận tốc và thời gian.',
      isBoss: false,
      questionId: 'W3-S09'
    },
    {
      stageId: 10,
      chapterId: 3,
      title: 'Ải 10: TRÙM ĐẦM LẦY TỈ LỆ',
      subtitle: 'Tỉ lệ bắc cầu hợp thành',
      description: 'Đối đầu Vua Đầm Lầy Bùn Lầy để xác định hệ số tỉ lệ bắc cầu giữa ba đại lượng!',
      isBoss: true,
      bossName: 'Vua Đầm Lầy Bùn Lầy',
      bossTitle: 'Bậc Thầy Cân Bằng',
      questionId: 'W3-S10'
    }
  ],
  4: [
    {
      stageId: 1,
      chapterId: 4,
      title: 'Ải 1: Cổng Vào Đơn Thức',
      subtitle: 'Hệ số và bậc của đơn thức',
      description: 'Thu gọn đơn thức và xác định chính xác bậc cao nhất của biến.',
      isBoss: false,
      questionId: 'W4-S01'
    },
    {
      stageId: 2,
      chapterId: 4,
      title: 'Ải 2: Bậc Của Đa Thức',
      subtitle: 'Xác định bậc đa thức thu gọn',
      description: 'Tìm số mũ lớn nhất của biến có hệ số khác 0 trong đa thức.',
      isBoss: false,
      questionId: 'W4-S02'
    },
    {
      stageId: 3,
      chapterId: 4,
      title: 'Ải 3: Hai Đầu Đa Thức',
      subtitle: 'Hệ số cao nhất & hệ số tự do',
      description: 'Chỉ ra vị thủ lĩnh dẫn đầu và phần tử tự do độc lập của đa thức.',
      isBoss: false,
      questionId: 'W4-S03'
    },
    {
      stageId: 4,
      chapterId: 4,
      title: 'Ải 4: Hòa Hợp & Tách Rời',
      subtitle: 'Cộng và trừ hai đa thức',
      description: 'Cộng trừ các hạng tử đồng dạng để tinh giản biểu thức ma thuật.',
      isBoss: false,
      questionId: 'W4-S04'
    },
    {
      stageId: 5,
      chapterId: 4,
      title: 'Ải 5: Tinh Thể Thế Trị',
      subtitle: 'Tính giá trị đa thức tại x = k',
      description: 'Thay ẩn số cụ thể vào biểu thức để đo đạc năng lượng tổng thể.',
      isBoss: false,
      questionId: 'W4-S05'
    },
    {
      stageId: 6,
      chapterId: 4,
      title: 'Ải 6: Phép Nhân Đơn - Đa',
      subtitle: 'Nhân đơn thức với đa thức',
      description: 'Phân phối luồng năng lượng đơn lẻ vào từng thành phần của đa thức.',
      isBoss: false,
      questionId: 'W4-S06'
    },
    {
      stageId: 7,
      chapterId: 4,
      title: 'Ải 7: Hợp Nhất Đa Thức',
      subtitle: 'Nhân đa thức với đa thức',
      description: 'Nhân từng hạng tử của đa thức này với từng hạng tử của đa thức kia.',
      isBoss: false,
      questionId: 'W4-S07'
    },
    {
      stageId: 8,
      chapterId: 4,
      title: 'Ải 8: Phân Giải Năng Lượng',
      subtitle: 'Chia đa thức cho đơn thức',
      description: 'Tách từng phần của đa thức chia đều cho đơn thức năng lượng.',
      isBoss: false,
      questionId: 'W4-S08'
    },
    {
      stageId: 9,
      chapterId: 4,
      title: 'Ải 9: Chìa Khóa Nghiệm Số',
      subtitle: 'Tìm nghiệm của đa thức bậc nhất',
      description: 'Tìm giá trị x làm cho giá trị của đa thức bằng 0 để triệt tiêu ma trận phòng thủ.',
      isBoss: false,
      questionId: 'W4-S09'
    },
    {
      stageId: 10,
      chapterId: 4,
      title: 'Ải 10: TRÙM ĐẠI THẾ GIỚI TRI THỨC',
      subtitle: 'Biến đổi thu gọn tối cao',
      description: 'Trận chiến cuối cùng: Xác định hệ số và bậc của biểu thức tích đa biến phức hợp!',
      isBoss: true,
      bossName: 'Đại Hiền Triết Tri Thức',
      bossTitle: 'Vị Thần Đại Số Học',
      questionId: 'W4-S10'
    }
  ]
};
