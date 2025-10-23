import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI, Type } from '@google/genai';

// Cấu trúc dữ liệu chi tiết cho chương trình Toán lớp 4 (ĐÃ CẬP NHẬT VỚI ĐỘ KHÓ)
const mathCurriculum = [
  // Chủ đề 1
  {
    id: 'c1',
    title: 'Chủ đề 1: Ôn tập và bổ sung',
    lessons: [
      {
        id: 'l1-1',
        title: 'Bài 1: Ôn tập các số đến 100 000',
        theory: 'Chào các em! Bài học này chúng ta sẽ cùng nhau ôn lại cách đọc, viết, so sánh các số trong phạm vi 100.000 và xác định giá trị của chữ số theo hàng của nó.',
        exercises: [
          { id: 'e1-1-1', type: 'mcq', question: 'Số "Bảy mươi lăm nghìn hai trăm linh một" được viết là:', options: ['75.210', '75.201', '7.521', '75.021'], answer: '75.201', difficulty: 'easy' },
          { id: 'e1-1-2', type: 'mcq', question: 'Trong số 98.456, chữ số 8 có giá trị là:', options: ['800', '80', '8.000', '8'], answer: '8.000', difficulty: 'easy' },
          { id: 'e1-1-3', type: 'mcq', question: 'Viết số lớn nhất có 5 chữ số khác nhau.', options: ['99.999', '98.765', '10.234'], answer: '98.765', difficulty: 'medium' },
          { id: 'e1-1-4', type: 'mcq', question: 'Số liền sau của số 99.999 là số nào?', options: ['99.998', '100.000', '100.001'], answer: '100.000', difficulty: 'medium' },
          { id: 'e1-1-5', type: 'mcq', question: 'Từ các chữ số 0, 1, 5, 8, 9, hãy viết số bé nhất có 5 chữ số khác nhau và chia hết cho 5.', options: ['10589', '10895', '10985'], answer: '10895', difficulty: 'hard' },
        ],
      },
      {
        id: 'l1-2',
        title: 'Bài 2: Ôn tập các phép tính trong phạm vi 100 000',
        theory: 'Chúng ta sẽ ôn lại cách đặt tính rồi tính các phép cộng, trừ, nhân, chia các số trong phạm vi 100.000. Hãy nhớ thực hiện phép tính cẩn thận nhé!',
        exercises: [
          { id: 'e1-2-1', type: 'mcq', question: 'Kết quả của phép tính 45.200 + 23.700 là:', options: ['68.900', '68.800', '67.900'], answer: '68.900', difficulty: 'easy' },
          { id: 'e1-2-2', type: 'mcq', question: 'Một cửa hàng có 20.000 quyển vở, đã bán đi 12.000 quyển. Hỏi cửa hàng còn lại bao nhiêu quyển vở?', options: ['8.000 quyển', '10.000 quyển', '32.000 quyển'], answer: '8.000 quyển', difficulty: 'medium' },
          { id: 'e1-2-3', type: 'mcq', question: 'Tìm x, biết: x * 3 = 90.000 - 60.000', options: ['10.000', '30.000', '90.000'], answer: '10.000', difficulty: 'hard' },
          { id: 'e1-2-4', type: 'mcq', question: 'Một xưởng may, tuần đầu may được 12.345 chiếc áo, tuần sau may được nhiều hơn tuần đầu 1.200 chiếc. Hỏi cả hai tuần xưởng đó may được bao nhiêu chiếc áo?', options: ['13.545', '25.890', '24.690'], answer: '25.890', difficulty: 'medium' },
        ],
      },
      {
        id: 'l1-3',
        title: 'Bài 3: Số chẵn, số lẻ',
        theory: 'Số chẵn là các số có chữ số tận cùng là 0, 2, 4, 6, 8. Số lẻ là các số có chữ số tận cùng là 1, 3, 5, 7, 9.',
        exercises: [
          { id: 'e1-3-1', type: 'mcq', question: 'Dãy số nào sau đây chỉ gồm các số chẵn?', options: ['1, 2, 3, 4', '10, 12, 15', '20, 22, 24'], answer: '20, 22, 24', difficulty: 'easy' },
          { id: 'e1-3-2', type: 'mcq', question: 'Số lẻ lớn nhất có hai chữ số là:', options: ['98', '99', '101'], answer: '99', difficulty: 'medium' },
          { id: 'e1-3-3', type: 'mcq', question: 'Trong các số sau, số nào là số lẻ: 124, 258, 567, 990?', options: ['124', '258', '567', '990'], answer: '567', difficulty: 'easy' },
          { id: 'e1-3-4', type: 'mcq', question: 'Tổng của số chẵn lớn nhất có 2 chữ số và số lẻ nhỏ nhất có 2 chữ số là bao nhiêu?', options: ['100', '109', '110'], answer: '109', difficulty: 'medium' },
          { id: 'e1-3-5', type: 'mcq', question: 'Biết trung bình cộng của hai số lẻ liên tiếp là 100. Tìm hai số đó.', options: ['98 và 102', '99 và 101', '100 và 101'], answer: '99 và 101', difficulty: 'hard' },
        ],
      },
      {
        id: 'l1-4',
        title: 'Bài 4: Biểu thức chứa chữ',
        theory: 'Biểu thức chứa chữ là biểu thức toán học có chứa các chữ cái. Để tính giá trị của biểu thức, ta thay chữ bằng số được cho rồi thực hiện phép tính.',
        exercises: [
          { id: 'e1-4-1', type: 'mcq', question: 'Nếu m = 5, giá trị của biểu thức 25 - m là:', options: ['20', '30', '15'], answer: '20', difficulty: 'easy' },
          { id: 'e1-4-2', type: 'mcq', question: 'Cho biểu thức a + b. Với a = 15 và b = 20, giá trị của biểu thức là:', options: ['25', '35', '45'], answer: '35', difficulty: 'easy' },
          { id: 'e1-4-3', type: 'mcq', question: 'Với c = 8, giá trị của biểu thức 100 - c * 5 là:', options: ['60', '95', '460'], answer: '60', difficulty: 'medium' },
          { id: 'e1-4-4', type: 'mcq', question: 'Một hình vuông có cạnh dài a. Chu vi hình vuông được tính bằng công thức P = a x 4. Nếu a = 15 cm, chu vi hình vuông là bao nhiêu?', options: ['60 cm', '30 cm', '20 cm'], answer: '60 cm', difficulty: 'hard' },
          { id: 'e1-4-5', type: 'mcq', question: 'Một hình chữ nhật có chiều dài là "a" và chiều rộng là "b". Nếu a = 20cm và b = 15cm, diện tích hình chữ nhật là bao nhiêu?', options: ['35 cm²', '70 cm²', '300 cm²'], answer: '300 cm²', difficulty: 'medium' },
        ],
      },
      {
        id: 'l1-5',
        title: 'Bài 5: Giải bài toán có ba bước tính',
        theory: 'Để giải một bài toán, chúng ta cần đọc kỹ đề, xác định yêu cầu, tóm tắt bài toán, tìm các bước giải và cuối cùng là trình bày bài giải một cách rõ ràng.',
        exercises: [
          { id: 'e1-5-1', type: 'mcq', question: 'An mua 3 quyển vở, mỗi quyển giá 5.000 đồng và 2 cái bút, mỗi cái giá 3.000 đồng. An đưa cô bán hàng 50.000 đồng. Hỏi cô bán hàng trả lại An bao nhiêu tiền?', options: ['29.000 đồng', '21.000 đồng', '39.000 đồng'], answer: '29.000 đồng', difficulty: 'hard' },
          { id: 'e1-5-2', type: 'mcq', question: 'Một đội xe có 5 xe tải, mỗi xe chở 1.500 kg gạo. Người ta đã dỡ xuống 3.500 kg gạo. Hỏi trên xe còn lại bao nhiêu ki-lô-gam gạo?', options: ['7.500 kg', '4.000 kg', '5.000 kg'], answer: '4.000 kg', difficulty: 'hard' },
          { id: 'e1-5-3', type: 'mcq', question: 'Một cửa hàng ngày đầu bán được 120m vải. Ngày thứ hai bán được bằng một nửa ngày đầu. Ngày thứ ba bán được gấp đôi ngày đầu. Hỏi cả ba ngày cửa hàng bán được bao nhiêu mét vải?', options: ['420 m', '360 m', '180 m'], answer: '420 m', difficulty: 'hard' },
          { id: 'e1-5-4', type: 'mcq', question: 'Thùng thứ nhất có 120 lít dầu, thùng thứ hai có nhiều hơn thùng thứ nhất 30 lít. Hỏi cả hai thùng có bao nhiêu lít dầu?', options: ['150 lít', '270 lít', '240 lít'], answer: '270 lít', difficulty: 'medium' },
        ],
      },
      {
        id: 'l1-6',
        title: 'Bài 6: Luyện tập chung',
        theory: 'Đây là bài ôn tập tổng hợp tất cả các kiến thức đã học trong Chủ đề 1. Cùng làm bài để củng cố kiến thức nhé!',
        exercises: [
          { id: 'e1-6-1', type: 'mcq', question: 'Số chẵn liền trước số 1000 là:', options: ['999', '998', '1002'], answer: '998', difficulty: 'medium' },
          { id: 'e1-6-2', type: 'mcq', question: 'Trong số 54.321, giá trị của chữ số 4 là:', options: ['400', '4.000', '40.000'], answer: '4.000', difficulty: 'easy' },
          { id: 'e1-6-3', type: 'mcq', question: 'Giá trị của biểu thức 500 + a x 5 với a = 50 là:', options: ['750', '2750', '555'], answer: '750', difficulty: 'medium' },
          { id: 'e1-6-4', type: 'mcq', question: 'Tìm một số biết rằng nếu lấy số đó nhân với 4 rồi trừ đi 5000 thì được kết quả là 15000.', options: ['2.500', '5.000', '10.000'], answer: '5.000', difficulty: 'hard' },
        ],
      },
    ],
  },
  // Chủ đề 2
  {
    id: 'c2',
    title: 'Chủ đề 2: Góc và đơn vị đo góc',
    lessons: [
       {
        id: 'l2-1',
        title: 'Bài 7: Đo góc, đơn vị đo góc',
        theory: 'Chúng ta dùng thước đo góc để đo độ lớn của góc. Đơn vị đo góc là độ, kí hiệu là °. Thước đo góc thường có hình nửa hình tròn và được chia thành 180 phần bằng nhau, mỗi phần ứng với 1 độ.',
        exercises: [
           { id: 'e2-1-1', type: 'mcq', question: 'Đơn vị dùng để đo góc là gì?', options: ['Mét (m)', 'Độ (°)', 'Ki-lô-gam (kg)'], answer: 'Độ (°)', difficulty: 'easy'},
           { id: 'e2-1-2', type: 'mcq', question: 'Dụng cụ dùng để đo góc tên là gì?', options: ['Thước kẻ', 'Com-pa', 'Thước đo góc'], answer: 'Thước đo góc', difficulty: 'easy'},
           { id: 'e2-1-3', type: 'mcq', question: 'Một nửa hình tròn trên thước đo góc được chia thành bao nhiêu độ?', options: ['90°', '180°', '360°'], answer: '180°', difficulty: 'easy'},
           { id: 'e2-1-4', type: 'mcq', question: 'Trên thước đo góc, một cạnh của góc trùng vạch 0. Cạnh còn lại đi qua vạch 135. Số đo của góc đó là bao nhiêu độ?', options: ['45°', '135°', '90°'], answer: '135°', difficulty: 'medium' },
        ],
      },
       {
        id: 'l2-2',
        title: 'Bài 8: Góc nhọn, góc tù, góc bẹt',
        theory: '- Góc vuông có số đo bằng 90°.\n- Góc có số đo nhỏ hơn 90° là góc nhọn.\n- Góc có số đo lớn hơn 90° và nhỏ hơn 180° là góc tù.\n- Góc có số đo bằng 180° là góc bẹt.',
        exercises: [
           { id: 'e2-2-1', type: 'mcq', question: 'Góc có số đo 45° là góc gì?', options: ['Góc nhọn', 'Góc tù', 'Góc vuông'], answer: 'Góc nhọn', difficulty: 'easy'},
           { id: 'e2-2-2', type: 'mcq', question: 'Góc tạo bởi hai kim đồng hồ lúc 6 giờ là góc gì?', options: ['Góc tù', 'Góc vuông', 'Góc bẹt'], answer: 'Góc bẹt', difficulty: 'medium'},
           { id: 'e2-2-3', type: 'mcq', question: 'Góc tù là góc...?', options: ['Nhỏ hơn góc vuông', 'Lớn hơn góc vuông', 'Bằng góc vuông'], answer: 'Lớn hơn góc vuông', difficulty: 'easy'},
           { id: 'e2-2-4', type: 'mcq', question: 'Góc tạo bởi hai kim đồng hồ lúc 3 giờ là góc gì?', options: ['Góc nhọn', 'Góc tù', 'Góc vuông'], answer: 'Góc vuông', difficulty: 'medium'},
           { id: 'e2-2-5', type: 'mcq', question: 'Tổng số đo của một góc vuông và một góc bẹt là bao nhiêu?', options: ['180°', '270°', '360°'], answer: '270°', difficulty: 'hard' },
        ],
      },
       {
        id: 'l2-3',
        title: 'Bài 9: Luyện tập chung',
        theory: 'Ôn tập về cách đo góc, các loại góc đã học như góc nhọn, góc tù, góc bẹt và góc vuông.',
        exercises: [
           { id: 'e2-3-1', type: 'mcq', question: 'Góc 120° lớn hơn góc nào sau đây?', options: ['Góc vuông', 'Góc bẹt', 'Góc 150°'], answer: 'Góc vuông', difficulty: 'medium'},
           { id: 'e2-3-2', type: 'mcq', question: 'Góc có số đo bằng 90° là góc gì?', options: ['Góc nhọn', 'Góc vuông', 'Góc tù'], answer: 'Góc vuông', difficulty: 'easy'},
           { id: 'e2-3-3', type: 'mcq', question: 'Góc nào sau đây là góc lớn nhất?', options: ['Góc bẹt', 'Góc tù', 'Góc vuông'], answer: 'Góc bẹt', difficulty: 'medium'},
           { id: 'e2-3-4', type: 'mcq', question: 'Gấp đôi một góc vuông ta được một góc...?', options: ['Góc tù', 'Góc nhọn', 'Góc bẹt'], answer: 'Góc bẹt', difficulty: 'hard' },
        ],
      },
    ]
  },
  // Chủ đề 3
  {
    id: 'c3',
    title: 'Chủ đề 3: Số có nhiều chữ số',
    lessons: [
       {
        id: 'l3-1',
        title: 'Bài 10: Số có sáu chữ số. Số 1 000 000',
        theory: 'Số có sáu chữ số gồm hàng trăm nghìn, chục nghìn, nghìn, trăm, chục, đơn vị. 10 trăm nghìn gọi là 1 triệu, viết là 1.000.000.',
        exercises: [
           { id: 'e3-1-1', type: 'mcq', question: 'Số "Một trăm hai mươi ba nghìn bốn trăm năm mươi sáu" viết là:', options: ['123.456', '12.3456', '123.546'], answer: '123.456', difficulty: 'easy'},
           { id: 'e3-1-2', type: 'mcq', question: 'Số 1.000.000 đọc là gì?', options: ['Một trăm nghìn', 'Một triệu', 'Mười triệu'], answer: 'Một triệu', difficulty: 'easy'},
           { id: 'e3-1-3', type: 'mcq', question: 'Số liền trước của số 1.000.000 là số nào?', options: ['999.999', '1.000.001', '999.990'], answer: '999.999', difficulty: 'medium'},
           { id: 'e3-1-4', type: 'mcq', question: 'Số gồm 5 trăm nghìn, 0 chục nghìn, 3 nghìn, 2 trăm, 1 chục và 9 đơn vị được viết là:', options: ['53.219', '503.219', '530.219'], answer: '503.219', difficulty: 'medium' },
           { id: 'e3-1-5', type: 'mcq', question: 'Giá trị của chữ số 7 trong số 876.543 lớn hơn giá trị của chữ số 6 trong số đó là bao nhiêu?', options: ['64.000', '1.000', '10.000'], answer: '64.000', difficulty: 'hard' },
        ],
      },
       {
        id: 'l3-2',
        title: 'Bài 11: Hàng và lớp',
        theory: 'Các chữ số của một số được chia thành các lớp, mỗi lớp có ba hàng.\n- Lớp đơn vị gồm: hàng đơn vị, hàng chục, hàng trăm.\n- Lớp nghìn gồm: hàng nghìn, hàng chục nghìn, hàng trăm nghìn.\n- Lớp triệu gồm: hàng triệu, hàng chục triệu, hàng trăm triệu.',
        exercises: [
           { id: 'e3-2-1', type: 'mcq', question: 'Trong số 5.432.100, chữ số 4 thuộc hàng nào, lớp nào?', options: ['Hàng trăm nghìn, lớp nghìn', 'Hàng triệu, lớp triệu', 'Hàng chục nghìn, lớp nghìn'], answer: 'Hàng trăm nghìn, lớp nghìn', difficulty: 'medium'},
           { id: 'e3-2-2', type: 'mcq', question: 'Lớp đơn vị gồm những hàng nào?', options: ['Nghìn, chục nghìn, trăm nghìn', 'Đơn vị, chục, trăm', 'Triệu, chục triệu, trăm triệu'], answer: 'Đơn vị, chục, trăm', difficulty: 'easy'},
           { id: 'e3-2-3', type: 'mcq', question: 'Trong số 345.678, chữ số 3 thuộc hàng nào?', options: ['Hàng chục nghìn', 'Hàng trăm nghìn', 'Hàng nghìn'], answer: 'Hàng trăm nghìn', difficulty: 'medium'},
           { id: 'e3-2-4', type: 'mcq', question: 'Số lớn nhất có sáu chữ số mà các chữ số ở lớp nghìn là 123 là số nào?', options: ['123.000', '999.123', '123.999'], answer: '123.999', difficulty: 'hard' },
        ],
      },
       {
        id: 'l3-3',
        title: 'Bài 12: Các số trong phạm vi lớp triệu',
        theory: 'Chúng ta học cách đọc, viết và xác định giá trị các số trong phạm vi lớp triệu (số có đến 9 chữ số).',
        exercises: [
           { id: 'e3-3-1', type: 'mcq', question: 'Số "Hai mươi lăm triệu" được viết là:', options: ['25.000', '25.000.000', '2.500.000'], answer: '25.000.000', difficulty: 'easy'},
           { id: 'e3-3-2', type: 'mcq', question: 'Số "Năm triệu không trăm linh năm" được viết là:', options: ['5.000.005', '5.005.000', '5.000.500'], answer: '5.000.005', difficulty: 'easy'},
           { id: 'e3-3-3', type: 'mcq', question: 'Đọc số 53.400.100', options: ['Năm ba triệu bốn trăm nghìn một trăm', 'Năm mươi ba triệu bốn trăm nghìn một trăm', 'Năm mươi ba triệu bốn nghìn một trăm'], answer: 'Năm mươi ba triệu bốn trăm nghìn một trăm', difficulty: 'medium'},
           { id: 'e3-3-4', type: 'mcq', question: 'Viết số: Mười hai triệu, ba trăm linh bốn nghìn, không trăm năm mươi.', options: ['12.340.500', '12.304.050', '1.234.050'], answer: '12.304.050', difficulty: 'medium' },
           { id: 'e3-3-5', type: 'mcq', question: 'Số 15.000.000 gấp số 15.000 bao nhiêu lần?', options: ['10 lần', '100 lần', '1.000 lần'], answer: '1.000 lần', difficulty: 'hard' },
        ],
      },
       {
        id: 'l3-4',
        title: 'Bài 13: Làm tròn số đến hàng trăm nghìn',
        theory: 'Để làm tròn một số đến hàng trăm nghìn, ta xét chữ số ở hàng chục nghìn. Nếu chữ số đó từ 5 trở lên, ta làm tròn lên. Nếu nhỏ hơn 5, ta làm tròn xuống.',
        exercises: [
           { id: 'e3-4-1', type: 'mcq', question: 'Làm tròn số 4.872.345 đến hàng trăm nghìn ta được:', options: ['4.800.000', '4.900.000', '5.000.000'], answer: '4.900.000', difficulty: 'medium' },
           { id: 'e3-4-2', type: 'mcq', question: 'Làm tròn số 628.123 đến hàng trăm nghìn ta được:', options: ['600.000', '700.000', '630.000'], answer: '600.000', difficulty: 'easy' },
           { id: 'e3-4-3', type: 'mcq', question: 'Số nào sau đây khi làm tròn đến hàng trăm nghìn thì được số 2.500.000?', options: ['2.449.999', '2.551.000', '2.487.654'], answer: '2.487.654', difficulty: 'hard' },
           { id: 'e3-4-4', type: 'mcq', question: 'Một thành phố có 782.450 người. Làm tròn số dân của thành phố đó đến hàng trăm nghìn.', options: ['700.000', '780.000', '800.000'], answer: '800.000', difficulty: 'medium' },
        ],
      },
       {
        id: 'l3-5',
        title: 'Bài 14: So sánh các số có nhiều chữ số',
        theory: 'Để so sánh hai số, ta so sánh số chữ số trước. Số nào có nhiều chữ số hơn thì lớn hơn. Nếu số chữ số bằng nhau, ta so sánh từng cặp chữ số ở cùng hàng từ trái sang phải.',
        exercises: [
           { id: 'e3-5-1', type: 'mcq', question: 'So sánh: 1.234.567 ... 987.654', options: ['>', '<', '='], answer: '>', difficulty: 'easy' },
           { id: 'e3-5-2', type: 'mcq', question: 'Tìm số lớn nhất: 5.892.100; 5.982.100; 5.829.100', options: ['5.892.100', '5.982.100', '5.829.100'], answer: '5.982.100', difficulty: 'medium' },
           { id: 'e3-5-3', type: 'mcq', question: 'Điền dấu thích hợp: 9.876.543 ... 9.876.534', options: ['>', '<', '='], answer: '>', difficulty: 'easy' },
           { id: 'e3-5-4', type: 'mcq', question: 'Tìm số bé nhất trong các số sau: 1.001.001; 1.010.001; 1.000.111', options: ['1.001.001', '1.010.001', '1.000.111'], answer: '1.000.111', difficulty: 'medium' },
           { id: 'e3-5-5', type: 'mcq', question: 'Tìm chữ số x, biết 87x.654 > 878.654', options: ['x = 7', 'x = 8', 'x = 9'], answer: 'x = 9', difficulty: 'hard' },
        ],
      },
       {
        id: 'l3-6',
        title: 'Bài 15: Làm quen với dãy số tự nhiên',
        theory: 'Dãy số tự nhiên là dãy các số 0, 1, 2, 3, 4, ... Dãy số tự nhiên có thể kéo dài vô tận. Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị.',
        exercises: [
           { id: 'e3-6-1', type: 'mcq', question: 'Số tự nhiên liền sau của số 2024 là:', options: ['2023', '2025', '2022'], answer: '2025', difficulty: 'easy' },
           { id: 'e3-6-2', type: 'mcq', question: 'Số tự nhiên nhỏ nhất là số nào?', options: ['1', '0', 'Không có'], answer: '0', difficulty: 'easy' },
           { id: 'e3-6-3', type: 'mcq', question: 'Số tự nhiên liền trước của số 100 là:', options: ['101', '99', '98'], answer: '99', difficulty: 'easy' },
           { id: 'e3-6-4', type: 'mcq', question: 'Giữa hai số 15 và 20 có bao nhiêu số tự nhiên?', options: ['4', '5', '6'], answer: '4', difficulty: 'medium' },
           { id: 'e3-6-5', type: 'mcq', question: 'Từ 1 đến 100 có bao nhiêu số chia hết cho 5?', options: ['10 số', '15 số', '20 số'], answer: '20 số', difficulty: 'hard' },
        ],
      },
      {
        id: 'l3-7',
        title: 'Bài 16: Luyện tập chung',
        theory: 'Ôn tập về đọc, viết, so sánh, làm tròn các số có nhiều chữ số và dãy số tự nhiên.',
        exercises: [
          { id: 'e3-7-1', type: 'mcq', question: 'Số bé nhất có 7 chữ số là:', options: ['9.999.999', '1.000.001', '1.000.000'], answer: '1.000.000', difficulty: 'medium' },
          { id: 'e3-7-2', type: 'mcq', question: 'Số lớn nhất có 6 chữ số khác nhau là:', options: ['999.999', '987.654', '123.456'], answer: '987.654', difficulty: 'medium' },
          { id: 'e3-7-3', type: 'mcq', question: 'Làm tròn số 9.987.654 đến hàng trăm nghìn ta được:', options: ['9.900.000', '9.990.000', '10.000.000'], answer: '10.000.000', difficulty: 'hard' },
          { id: 'e3-7-4', type: 'mcq', question: 'Dãy số nào sau đây được sắp xếp theo thứ tự từ bé đến lớn?', options: ['999.999; 1.000.100; 1.000.001', '999.999; 1.000.001; 1.000.100', '1.000.100; 1.000.001; 999.999'], answer: '999.999; 1.000.001; 1.000.100', difficulty: 'medium' },
        ],
      },
    ]
  },
  // Chủ đề 4
  {
    id: 'c4',
    title: 'Chủ đề 4: Một số đơn vị đo đại lượng',
    lessons: [
       {
        id: 'l4-1',
        title: 'Bài 17: Yến, tạ, tấn',
        theory: 'Đây là các đơn vị đo khối lượng lớn hơn ki-lô-gam.\n- 1 yến = 10 kg\n- 1 tạ = 10 yến = 100 kg\n- 1 tấn = 10 tạ = 1000 kg',
        exercises: [
           { id: 'e4-1-1', type: 'mcq', question: '3 tạ bằng bao nhiêu ki-lô-gam?', options: ['30 kg', '300 kg', '3000 kg'], answer: '300 kg', difficulty: 'easy'},
           { id: 'e4-1-2', type: 'mcq', question: '5 tấn bằng bao nhiêu ki-lô-gam?', options: ['50 kg', '500 kg', '5000 kg'], answer: '5000 kg', difficulty: 'easy'},
           { id: 'e4-1-3', type: 'mcq', question: '2 tạ 5 yến bằng bao nhiêu ki-lô-gam?', options: ['25 kg', '205 kg', '250 kg'], answer: '250 kg', difficulty: 'medium'},
           { id: 'e4-1-4', type: 'mcq', question: 'Đơn vị đo khối lượng nào lớn nhất?', options: ['Yến', 'Tạ', 'Tấn'], answer: 'Tấn', difficulty: 'easy'},
           { id: 'e4-1-5', type: 'mcq', question: 'Một con voi nặng 2 tấn, một con hà mã nặng 15 tạ. Con voi nặng hơn con hà mã bao nhiêu ki-lô-gam?', options: ['5 kg', '50 kg', '500 kg'], answer: '500 kg', difficulty: 'medium' },
           { id: 'e4-1-6', type: 'mcq', question: 'Một xe tải chở được 3 tấn hàng. Xe đã chở 5 chuyến. Hỏi xe đã chở được bao nhiêu tạ hàng?', options: ['15 tạ', '35 tạ', '150 tạ'], answer: '150 tạ', difficulty: 'hard' },
        ],
      },
       {
        id: 'l4-2',
        title: 'Bài 18: Đề-xi-mét vuông, mét vuông, mi-li-mét vuông',
        theory: 'Đây là các đơn vị đo diện tích.\n- 1 dm² = 100 cm²\n- 1 m² = 100 dm²\n- 1 cm² = 100 mm²',
        exercises: [
           { id: 'e4-2-1', type: 'mcq', question: '5 m² bằng bao nhiêu đề-xi-mét vuông?', options: ['50 dm²', '500 dm²', '5000 dm²'], answer: '500 dm²', difficulty: 'easy'},
           { id: 'e4-2-2', type: 'mcq', question: '1 m² bằng bao nhiêu xăng-ti-mét vuông?', options: ['100 cm²', '1.000 cm²', '10.000 cm²'], answer: '10.000 cm²', difficulty: 'medium'},
           { id: 'e4-2-3', type: 'mcq', question: 'Để đo diện tích một căn phòng, ta thường dùng đơn vị nào?', options: ['cm²', 'dm²', 'm²'], answer: 'm²', difficulty: 'easy'},
           { id: 'e4-2-4', type: 'mcq', question: '2 dm² 15 cm² = ... cm²?', options: ['215 cm²', '2150 cm²', '35 cm²'], answer: '215 cm²', difficulty: 'medium'},
           { id: 'e4-2-5', type: 'mcq', question: 'Một căn phòng hình chữ nhật có chiều dài 8m và chiều rộng 5m. Diện tích căn phòng là bao nhiêu đề-xi-mét vuông?', options: ['40 dm²', '400 dm²', '4.000 dm²'], answer: '4.000 dm²', difficulty: 'hard' },
        ],
      },
       {
        id: 'l4-3',
        title: 'Bài 19: Giây, thế kỉ',
        theory: 'Đây là các đơn vị đo thời gian.\n- 1 phút = 60 giây\n- 1 giờ = 60 phút\n- 1 thế kỉ = 100 năm',
        exercises: [
           { id: 'e4-3-1', type: 'mcq', question: 'Năm 2024 thuộc thế kỉ nào?', options: ['XX (20)', 'XXI (21)', 'XIX (19)'], answer: 'XXI (21)', difficulty: 'medium'},
           { id: 'e4-3-2', type: 'mcq', question: '3 phút bằng bao nhiêu giây?', options: ['120 giây', '180 giây', '240 giây'], answer: '180 giây', difficulty: 'easy'},
           { id: 'e4-3-3', type: 'mcq', question: 'Một thế kỉ bằng bao nhiêu năm?', options: ['10 năm', '100 năm', '1000 năm'], answer: '100 năm', difficulty: 'easy'},
           { id: 'e4-3-4', type: 'mcq', question: 'Bác Hồ sinh năm 1890. Bác sinh vào thế kỉ nào?', options: ['XVIII (18)', 'XIX (19)', 'XX (20)'], answer: 'XIX (19)', difficulty: 'medium'},
           { id: 'e4-3-5', type: 'mcq', question: 'Nhà Lý thành lập năm 1009. Năm đó thuộc thế kỉ nào?', options: ['X (10)', 'XI (11)', 'XII (12)'], answer: 'XI (11)', difficulty: 'hard' },
        ],
      },
       {
        id: 'l4-4',
        title: 'Bài 20: Thực hành và trải nghiệm sử dụng một số đơn vị đo đại lượng',
        theory: 'Vận dụng kiến thức về các đơn vị đo đã học vào thực tế, ví dụ như ước lượng cân nặng của đồ vật, đo diện tích phòng học, tính toán thời gian.',
        exercises: [
           { id: 'e4-4-1', type: 'mcq', question: 'Cân nặng của một bao gạo thường được tính bằng đơn vị nào?', options: ['Tấn', 'Yến', 'Gam'], answer: 'Yến', difficulty: 'easy'},
           { id: 'e4-4-2', type: 'mcq', question: 'Để đo chiều dài sân trường, em dùng đơn vị nào là hợp lý nhất?', options: ['Xăng-ti-mét (cm)', 'Mét (m)', 'Ki-lô-mét (km)'], answer: 'Mét (m)', difficulty: 'easy'},
           { id: 'e4-4-3', type: 'mcq', question: 'Một quả dưa hấu nặng khoảng 3... Đơn vị thích hợp điền vào chỗ trống là:', options: ['gam (g)', 'ki-lô-gam (kg)', 'tạ'], answer: 'ki-lô-gam (kg)', difficulty: 'easy'},
           { id: 'e4-4-4', type: 'mcq', question: 'Một trận bóng đá có 2 hiệp, mỗi hiệp 45 phút, nghỉ giữa hiệp 15 phút. Trận đấu bắt đầu lúc 19 giờ. Hỏi trận đấu kết thúc lúc mấy giờ?', options: ['20 giờ 30 phút', '20 giờ 45 phút', '21 giờ 00 phút'], answer: '20 giờ 45 phút', difficulty: 'medium' },
           { id: 'e4-4-5', type: 'mcq', question: 'Một tấm bìa hình vuông có cạnh 1dm. Diện tích tấm bìa đó là bao nhiêu xăng-ti-mét vuông?', options: ['10 cm²', '100 cm²', '1.000 cm²'], answer: '100 cm²', difficulty: 'medium' },
        ],
      },
      {
        id: 'l4-5',
        title: 'Bài 21: Luyện tập chung',
        theory: 'Ôn tập tổng hợp về các đơn vị đo khối lượng, diện tích và thời gian đã học.',
        exercises: [
          { id: 'e4-5-1', type: 'mcq', question: '2 tấn 50 kg = ... kg?', options: ['250 kg', '2050 kg', '2500 kg'], answer: '2050 kg', difficulty: 'medium'},
          { id: 'e4-5-2', type: 'mcq', question: '3 m² 3 cm² = ... cm²?', options: ['33 cm²', '303 cm²', '30003 cm²'], answer: '30003 cm²', difficulty: 'medium'},
          { id: 'e4-5-3', type: 'mcq', question: 'Thế kỉ XX bắt đầu từ năm nào và kết thúc vào năm nào?', options: ['1900-1999', '1901-2000', '1901-2001'], answer: '1901-2000', difficulty: 'hard'},
          { id: 'e4-5-4', type: 'mcq', question: 'Năm 1492, Colombo tìm ra châu Mỹ. Năm đó thuộc thế kỉ nào?', options: ['XIV (14)', 'XV (15)', 'XVI (16)'], answer: 'XV (15)', difficulty: 'medium' },
        ],
      },
    ]
  },
  // Chủ đề 5
  {
    id: 'c5',
    title: 'Chủ đề 5: Phép cộng và phép trừ',
    lessons: [
       {
        id: 'l5-1',
        title: 'Bài 22: Phép cộng các số có nhiều chữ số',
        theory: 'Để cộng các số có nhiều chữ số, ta đặt tính thẳng hàng (các chữ số cùng hàng thẳng cột với nhau) rồi cộng từ phải sang trái, có nhớ nếu cần.',
        exercises: [
           { id: 'e5-1-1', type: 'mcq', question: 'Tính: 125.600 + 342.300', options: ['467.900', '476.900', '467.800'], answer: '467.900', difficulty: 'easy'},
           { id: 'e5-1-2', type: 'mcq', question: 'Đặt tính rồi tính: 456.789 + 123.110', options: ['579.899', '578.899', '589.999'], answer: '579.899', difficulty: 'easy'},
           { id: 'e5-1-3', type: 'mcq', question: 'Một huyện trồng được 325.164 cây lấy gỗ và 60.830 cây ăn quả. Hỏi huyện đó trồng được tất cả bao nhiêu cây?', options: ['385.994 cây', '385.984 cây', '933.464 cây'], answer: '385.994 cây', difficulty: 'medium'},
           { id: 'e5-1-4', type: 'mcq', question: 'Một công ty, tháng đầu sản xuất được 120.500 sản phẩm, tháng sau sản xuất nhiều hơn tháng đầu 15.000 sản phẩm. Cả hai tháng công ty sản xuất được bao nhiêu sản phẩm?', options: ['135.500', '241.000', '256.000'], answer: '256.000', difficulty: 'medium' },
           { id: 'e5-1-5', type: 'mcq', question: 'Tìm tổng của số lớn nhất có 5 chữ số và số bé nhất có 6 chữ số khác nhau.', options: ['199.999', '202.344', '212.344'], answer: '202.344', difficulty: 'hard' },
        ],
      },
       {
        id: 'l5-2',
        title: 'Bài 23: Phép trừ các số có nhiều chữ số',
        theory: 'Để trừ các số có nhiều chữ số, ta đặt tính thẳng hàng rồi trừ từ phải sang trái, có nhớ nếu cần.',
        exercises: [
           { id: 'e5-2-1', type: 'mcq', question: 'Tính: 876.543 - 123.456', options: ['753.087', '753.097', '754.087'], answer: '753.087', difficulty: 'easy'},
           { id: 'e5-2-2', type: 'mcq', question: 'Đặt tính rồi tính: 987.654 - 543.210', options: ['444.444', '444.440', '444.404'], answer: '444.444', difficulty: 'easy'},
           { id: 'e5-2-3', type: 'mcq', question: 'Tìm x, biết x + 125.000 = 400.000', options: ['525.000', '275.000', '375.000'], answer: '275.000', difficulty: 'medium'},
           { id: 'e5-2-4', type: 'mcq', question: 'Một kho chứa 475.350 kg thóc. Người ta đã lấy ra 125.100 kg. Hỏi trong kho còn lại bao nhiêu ki-lô-gam thóc?', options: ['350.250 kg', '350.200 kg', '600.450 kg'], answer: '350.250 kg', difficulty: 'medium' },
           { id: 'e5-2-5', type: 'mcq', question: 'Hiệu của hai số là 567. Nếu ta giữ nguyên số bị trừ và tăng số trừ lên 100 đơn vị thì hiệu mới là bao nhiêu?', options: ['667', '467', '567'], answer: '467', difficulty: 'hard' },
        ],
      },
       {
        id: 'l5-3',
        title: 'Bài 24: Tính chất giao hoán và kết hợp của phép cộng',
        theory: '- Tính chất giao hoán: Khi đổi chỗ các số hạng trong một tổng thì tổng không thay đổi (a + b = b + a).\n- Tính chất kết hợp: Khi cộng một tổng hai số với số thứ ba, ta có thể cộng số thứ nhất với tổng của số thứ hai và số thứ ba ((a + b) + c = a + (b + c)).',
        exercises: [
           { id: 'e5-3-1', type: 'mcq', question: 'Biểu thức nào sau đây bằng với 45 + 55?', options: ['55 + 45', '55 - 45', '45 x 55'], answer: '55 + 45', difficulty: 'easy'},
           { id: 'e5-3-2', type: 'mcq', question: 'Tính nhanh: 98 + 3 + 2', options: ['103', '102', '104'], answer: '103', difficulty: 'medium' },
           { id: 'e5-3-3', type: 'mcq', question: 'Điền số thích hợp vào chỗ trống: a + b = b + ...', options: ['b', 'a', '0'], answer: 'a', difficulty: 'easy'},
           { id: 'e5-3-4', type: 'mcq', question: 'Tính bằng cách thuận tiện nhất: (456 + 44) + 100', options: ['500', '600', '556'], answer: '600', difficulty: 'medium' },
           { id: 'e5-3-5', type: 'mcq', question: 'Tính nhanh: 123 + 456 + 77 + 44', options: ['600', '700', '800'], answer: '700', difficulty: 'hard' },
        ],
      },
       {
        id: 'l5-4',
        title: 'Bài 25: Tìm hai số biết tổng và hiệu của hai số đó',
        theory: 'Công thức:\n- Số lớn = (Tổng + Hiệu) : 2\n- Số bé = (Tổng - Hiệu) : 2',
        exercises: [
           { id: 'e5-4-1', type: 'mcq', question: 'Tổng của hai số là 100, hiệu của hai số là 20. Tìm số lớn.', options: ['60', '40', '80'], answer: '60', difficulty: 'medium'},
           { id: 'e5-4-2', type: 'mcq', question: 'Hai lớp 4A và 4B trồng được 600 cây. Lớp 4A trồng được ít hơn lớp 4B là 50 cây. Hỏi lớp 4A trồng được bao nhiêu cây?', options: ['325 cây', '275 cây', '300 cây'], answer: '275 cây', difficulty: 'hard' },
           { id: 'e5-4-3', type: 'mcq', question: 'Tuổi của bố và con cộng lại là 50 tuổi. Bố hơn con 30 tuổi. Hỏi tuổi của con là bao nhiêu?', options: ['10 tuổi', '20 tuổi', '40 tuổi'], answer: '10 tuổi', difficulty: 'hard' },
           { id: 'e5-4-4', type: 'mcq', question: 'Tổng hai số là 80, hiệu hai số là 20. Tìm số bé.', options: ['30', '50', '60'], answer: '30', difficulty: 'medium' },
        ],
      },
      {
        id: 'l5-5',
        title: 'Bài 26: Luyện tập chung',
        theory: 'Ôn tập về phép cộng, phép trừ các số có nhiều chữ số, các tính chất của phép cộng và bài toán tìm hai số khi biết tổng và hiệu.',
        exercises: [
          { id: 'e5-5-1', type: 'mcq', question: 'Tổng của hai số là 50, hiệu là 10. Tìm số bé.', options: ['20', '30', '40'], answer: '20', difficulty: 'medium'},
          { id: 'e5-5-2', type: 'mcq', question: 'Tìm x, biết 8795 - x = 2050', options: ['10845', '6745', '6755'], answer: '6745', difficulty: 'medium'},
          { id: 'e5-5-3', type: 'mcq', question: 'Tổng của hai số là số lớn nhất có 4 chữ số, hiệu hai số là số nhỏ nhất có 4 chữ số. Tìm số lớn.', options: ['5499.5', '5500', '5499'], answer: '5499.5', difficulty: 'hard' },
          { id: 'e5-5-4', type: 'mcq', question: 'An và Bình có tổng cộng 50 viên bi. Nếu An cho Bình 5 viên bi thì số bi hai bạn bằng nhau. Hỏi lúc đầu An có bao nhiêu viên bi?', options: ['20 viên', '25 viên', '30 viên'], answer: '30 viên', difficulty: 'hard' },
        ],
      },
    ]
  },
  // Chủ đề 6
  {
    id: 'c6',
    title: 'Chủ đề 6: Đường thẳng vuông góc. Đường thẳng song song',
    lessons: [
       {
        id: 'l6-1',
        title: 'Bài 27: Hai đường thẳng vuông góc',
        theory: 'Hai đường thẳng vuông góc với nhau tạo thành bốn góc vuông có chung đỉnh. Ta thường dùng ê ke để kiểm tra hoặc vẽ hai đường thẳng vuông góc.',
        exercises: [
           { id: 'l6-1-1', type: 'mcq', question: 'Góc tạo bởi hai đường thẳng vuông góc có số đo là bao nhiêu?', options: ['45°', '90°', '180°'], answer: '90°', difficulty: 'easy'},
           { id: 'l6-1-2', type: 'mcq', question: 'Hai cạnh kề của một hình chữ nhật thì ... với nhau.', options: ['song song', 'vuông góc', 'cắt nhau'], answer: 'vuông góc', difficulty: 'easy'},
           { id: 'l6-1-3', type: 'mcq', question: 'Hai kim đồng hồ lúc 3 giờ tạo thành hai đường thẳng...?', options: ['vuông góc', 'song song', 'trùng nhau'], answer: 'vuông góc', difficulty: 'easy'},
           { id: 'l6-1-4', type: 'mcq', question: 'Trong hình chữ nhật MNPQ, góc tại đỉnh M là góc gì?', options: ['Góc nhọn', 'Góc vuông', 'Góc tù'], answer: 'Góc vuông', difficulty: 'medium' },
           { id: 'l6-1-5', type: 'mcq', question: 'Hai đường thẳng vuông góc cắt nhau tạo thành mấy góc vuông?', options: ['1', '2', '4'], answer: '4', difficulty: 'medium' },
        ],
      },
       {
        id: 'l6-2',
        title: 'Bài 28: Thực hành và trải nghiệm vẽ hai đường thẳng vuông góc',
        theory: 'Sử dụng ê ke để vẽ hai đường thẳng vuông góc. Có hai cách vẽ chính: vẽ đường thẳng đi qua một điểm cho trước và vuông góc với một đường thẳng cho trước.',
        exercises: [
           { id: 'l6-2-1', type: 'mcq', question: 'Dụng cụ nào thường được sử dụng để vẽ hai đường thẳng vuông góc?', options: ['Thước kẻ', 'Com-pa', 'Ê ke'], answer: 'Ê ke', difficulty: 'easy'},
           { id: 'l6-2-2', type: 'mcq', question: 'Để kiểm tra hai đường thẳng có vuông góc hay không, ta dùng...?', options: ['Thước đo góc', 'Ê ke', 'Com-pa'], answer: 'Ê ke', difficulty: 'easy'},
           { id: 'l6-2-3', type: 'mcq', question: 'Góc vuông của ê ke có số đo là bao nhiêu?', options: ['45°', '60°', '90°'], answer: '90°', difficulty: 'easy'},
           { id: 'l6-2-4', type: 'mcq', question: 'Cho một đường thẳng d và một điểm A không nằm trên d. Có thể vẽ được mấy đường thẳng đi qua A và vuông góc với d?', options: ['Chỉ một', 'Hai', 'Vô số'], answer: 'Chỉ một', difficulty: 'medium' },
           { id: 'l6-2-5', type: 'mcq', question: 'Để vẽ đường cao của một hình tam giác, em sẽ sử dụng dụng cụ chính là gì?', options: ['Com-pa', 'Thước kẻ', 'Ê ke'], answer: 'Ê ke', difficulty: 'medium' },
        ],
      },
       {
        id: 'l6-3',
        title: 'Bài 29: Hai đường thẳng song song',
        theory: 'Hai đường thẳng song song là hai đường thẳng không bao giờ cắt nhau dù kéo dài về hai phía. Khoảng cách giữa hai đường thẳng song song luôn không đổi.',
        exercises: [
           { id: 'l6-3-1', type: 'mcq', question: 'Hình ảnh nào sau đây gợi cho em về hai đường thẳng song song?', options: ['Hai cạnh đối của quyển sách', 'Hai kim đồng hồ lúc 3 giờ', 'Chữ cái V'], answer: 'Hai cạnh đối của quyển sách', difficulty: 'easy'},
           { id: 'l6-3-2', type: 'mcq', question: 'Hai đường thẳng song song thì...', options: ['luôn cắt nhau', 'không bao giờ cắt nhau', 'chỉ cắt nhau tại 1 điểm'], answer: 'không bao giờ cắt nhau', difficulty: 'easy'},
           { id: 'l6-3-3', type: 'mcq', question: 'Hai mép đối diện của một con đường thẳng là hình ảnh của hai đường thẳng...?', options: ['vuông góc', 'song song', 'cắt nhau'], answer: 'song song', difficulty: 'easy'},
           { id: 'l6-3-4', type: 'mcq', question: 'Trong hình bình hành ABCD, cạnh AB song song với cạnh nào?', options: ['Cạnh BC', 'Cạnh CD', 'Cạnh AD'], answer: 'Cạnh CD', difficulty: 'medium' },
           { id: 'l6-3-5', type: 'mcq', question: 'Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì chúng ... với nhau.', options: ['song song', 'vuông góc', 'cắt nhau'], answer: 'song song', difficulty: 'medium' },
        ],
      },
       {
        id: 'l6-4',
        title: 'Bài 30: Thực hành và trải nghiệm vẽ hai đường thẳng song song',
        theory: 'Sử dụng thước và ê ke để vẽ hai đường thẳng song song. Ta có thể vẽ hai đường thẳng cùng vuông góc với một đường thẳng thứ ba.',
        exercises: [
           { id: 'l6-4-1', type: 'mcq', question: 'Để vẽ hai đường thẳng song song, ta có thể vẽ chúng cùng vuông góc với đường thẳng thứ mấy?', options: ['Một', 'Hai', 'Ba'], answer: 'Ba', difficulty: 'medium'},
           { id: 'l6-4-2', type: 'mcq', question: 'Để vẽ hai đường thẳng song song, ta có thể dùng những dụng cụ nào?', options: ['Chỉ cần thước kẻ', 'Thước và ê ke', 'Chỉ cần com-pa'], answer: 'Thước và ê ke', difficulty: 'easy'},
           { id: 'l6-4-3', type: 'mcq', question: 'Hai đường thẳng cùng ... với một đường thẳng thứ ba thì chúng song song với nhau.', options: ['song song', 'vuông góc', 'cắt'], answer: 'vuông góc', difficulty: 'medium'},
           { id: 'l6-4-4', type: 'mcq', question: 'Cho đường thẳng a song song với đường thẳng b. Nếu đường thẳng c vuông góc với a thì c sẽ ... với b.', options: ['vuông góc', 'song song', 'trùng nhau'], answer: 'vuông góc', difficulty: 'medium' },
           { id: 'l6-4-5', type: 'mcq', question: 'Qua một điểm nằm ngoài một đường thẳng, ta vẽ được bao nhiêu đường thẳng song song với đường thẳng đó?', options: ['Không có', 'Chỉ một', 'Vô số'], answer: 'Chỉ một', difficulty: 'hard' },
        ],
      },
       {
        id: 'l6-5',
        title: 'Bài 31: Hình bình hành, hình thoi',
        theory: '- Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.\n- Hình thoi là trường hợp đặc biệt của hình bình hành, có bốn cạnh bằng nhau.',
        exercises: [
           { id: 'l6-5-1', type: 'mcq', question: 'Hình nào có hai cặp cạnh đối diện song song và bằng nhau?', options: ['Hình tam giác', 'Hình bình hành', 'Hình thang'], answer: 'Hình bình hành', difficulty: 'easy'},
           { id: 'l6-5-2', type: 'mcq', question: 'Hình thoi có mấy cạnh bằng nhau?', options: ['2', '3', '4'], answer: '4', difficulty: 'easy'},
           { id: 'l6-5-3', type: 'mcq', question: 'Đặc điểm nào sau đây KHÔNG phải của hình bình hành?', options: ['Hai cặp cạnh đối song song', 'Hai cặp cạnh đối bằng nhau', 'Bốn góc vuông'], answer: 'Bốn góc vuông', difficulty: 'medium'},
           { id: 'l6-5-4', type: 'mcq', question: 'Hình chữ nhật có phải là một hình bình hành không?', options: ['Có', 'Không', 'Chỉ đôi khi'], answer: 'Có', difficulty: 'medium' },
           { id: 'l6-5-5', type: 'mcq', question: 'Hai đường chéo của hình thoi có tính chất gì?', options: ['Bằng nhau', 'Song song với nhau', 'Vuông góc với nhau'], answer: 'Vuông góc với nhau', difficulty: 'hard' },
        ],
      },
      {
        id: 'l6-6',
        title: 'Bài 32: Luyện tập chung',
        theory: 'Ôn tập về các khái niệm đường thẳng vuông góc, song song, và các tính chất của hình bình hành, hình thoi.',
        exercises: [
          { id: 'l6-6-1', type: 'mcq', question: 'Hình thoi có đặc điểm gì đặc biệt so với hình bình hành?', options: ['Các góc bằng nhau', 'Bốn cạnh bằng nhau', 'Các đường chéo bằng nhau'], answer: 'Bốn cạnh bằng nhau', difficulty: 'medium'},
          { id: 'l6-6-2', type: 'mcq', question: 'Trong hình chữ nhật, có bao nhiêu cặp cạnh song song với nhau?', options: ['1', '2', '4'], answer: '2', difficulty: 'medium'},
          { id: 'l6-6-3', type: 'mcq', question: 'Hình vuông vừa là hình thoi, vừa là hình...?', options: ['chữ nhật', 'tam giác', 'bình hành'], answer: 'chữ nhật', difficulty: 'hard'},
          { id: 'l6-6-4', type: 'mcq', question: 'Chu vi của một hình thoi có cạnh dài 5cm là bao nhiêu?', options: ['10 cm', '15 cm', '20 cm'], answer: '20 cm', difficulty: 'hard' },
        ],
      },
    ]
  },
];


// Component gợi ý
const GeminiSuggestions = ({ topicTitle }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!topicTitle) return;

    const fetchSuggestions = async () => {
      setIsLoading(true);
      setError('');
      setSuggestions([]);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Với một học sinh lớp 4 ở Việt Nam đang học chủ đề Toán: "${topicTitle}", hãy gợi ý 3 chủ đề hoặc dạng bài tập liên quan mà em ấy nên ôn tập để củng cố kiến thức. Chỉ trả về danh sách gồm 3 gạch đầu dòng, không cần giải thích gì thêm.`;
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        const text = response.text;
        const suggestionItems = text.split('\n').map(item => item.replace(/^-|^\*|^\d+\.\s*/, '').trim()).filter(item => item.length > 0);
        setSuggestions(suggestionItems);
      } catch (err) {
        console.error("Lỗi khi gọi Gemini API:", err);
        setError('Rất tiếc, đã có lỗi xảy ra khi tìm gợi ý.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSuggestions();
  }, [topicTitle]);

  return (
    <div className="suggestions-container">
      <h3>Gợi ý ôn tập</h3>
      {isLoading && <div className="loading">Đang tìm gợi ý hay cho em... ⏳</div>}
      {error && <div className="error">{error}</div>}
      {!isLoading && !error && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => <li key={index}>{suggestion}</li>)}
        </ul>
      )}
    </div>
  );
};

// Component làm bài tập
const Practice = ({ exercises, onComplete }) => {
  const [difficulty, setDifficulty] = useState(null);
  const [activeExercises, setActiveExercises] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [questionAnimation, setQuestionAnimation] = useState('fade-in');


  useEffect(() => {
      // Reset state when exercises prop changes (user selects a new lesson)
      setCurrentQ(0);
      setSelectedAns(null);
      setIsChecked(false);
      setScore(0);
      setShowResult(false);
      setExplanation('');
      setIsGeneratingExplanation(false);
      setShowExplanationModal(false);
      setDifficulty(null); // Reset difficulty
      setActiveExercises([]); // Reset active exercises
  }, [exercises]);

  const handleSelectDifficulty = (level) => {
    const filtered = exercises.filter(ex => ex.difficulty === level);
    setActiveExercises(filtered);
    setDifficulty(level);
  };

  const exercise = activeExercises[currentQ];
  const isCorrect = selectedAns === exercise?.answer;

  const handleCheck = () => {
    setIsChecked(true);
    if (isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
     setQuestionAnimation('fade-out');
     setTimeout(() => {
        if (currentQ < activeExercises.length - 1) {
          setCurrentQ(q => q + 1);
          setSelectedAns(null);
          setIsChecked(false);
          setExplanation('');
          setShowExplanationModal(false);
        } else {
          setShowResult(true);
          if(onComplete) onComplete();
        }
        setQuestionAnimation('fade-in');
     }, 300); // Duration matches CSS transition
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedAns(null);
    setIsChecked(false);
    setScore(0);
    setShowResult(false);
    setExplanation('');
    setShowExplanationModal(false);
    setDifficulty(null); // Also reset difficulty
    setActiveExercises([]);
  };
  
  const handleRedoSameDifficulty = () => {
    setCurrentQ(0);
    setSelectedAns(null);
    setIsChecked(false);
    setScore(0);
    setShowResult(false);
    setExplanation('');
    setShowExplanationModal(false);
    // Giữ nguyên difficulty và activeExercises
  };

  const handleExplainAnswer = async () => {
    if (!exercise || !selectedAns) return;
    setIsGeneratingExplanation(true);
    setExplanation('');
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Là một gia sư Toán lớp 4, hãy giải thích thật ngắn gọn và đi thẳng vào vấn đề cho học sinh. Dùng ngôn ngữ đơn giản, rõ ràng như đang nói chuyện trực tiếp.
- **Câu hỏi:** "${exercise.question}"
- **Em đã chọn:** "${selectedAns}"
- **Đáp án đúng:** "${exercise.answer}"

**Yêu cầu:**
1.  Không cần câu chào hỏi hay động viên dài dòng.
2.  **Điểm cần nhớ:** Chỉ ra ngay lỗi sai hoặc kiến thức em bị hổng. (Ví dụ: "**Điểm cần nhớ:** Số liền sau của một số thì lớn hơn số đó 1 đơn vị.")
3.  **Cách làm đúng:** Trình bày các bước giải siêu ngắn gọn. (Ví dụ: "**Cách làm đúng:** Bước 1: Lấy 99.999 cộng 1. Bước 2: 99.999 + 1 = 100.000.")
4.  **Kết luận:** Một câu ngắn gọn để chốt lại. (Ví dụ: "**Kết luận:** Vậy đáp án đúng là 100.000.")

Giữ cho các phần thật súc tích.`;

        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        setExplanation(response.text);
        setShowExplanationModal(true);
    } catch (err) {
        console.error("Lỗi khi tạo giải thích:", err);
        setExplanation('Rất tiếc, đã có lỗi xảy ra khi tạo giải thích. Em hãy thử lại nhé.');
        setShowExplanationModal(true);
    } finally {
        setIsGeneratingExplanation(false);
    }
  };

  if (exercises.length === 0) {
      return (
          <div className="quiz-result">
            <h3>Thông báo</h3>
            <p>Chưa có bài tập cho phần này. Vui lòng quay lại sau nhé!</p>
          </div>
      );
  }

  if (!difficulty) {
    return (
      <div className="difficulty-selection">
        <h3>Em muốn thử sức với độ khó nào?</h3>
        <div className="difficulty-buttons">
          <button className="btn btn-difficulty btn-easy" onClick={() => handleSelectDifficulty('easy')}>Dễ</button>
          <button className="btn btn-difficulty btn-medium" onClick={() => handleSelectDifficulty('medium')}>Trung bình</button>
          <button className="btn btn-difficulty btn-hard" onClick={() => handleSelectDifficulty('hard')}>Khó</button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
        <div className="quiz-result">
            <h3>Hoàn thành!</h3>
            <p>Em đã trả lời đúng {score} / {activeExercises.length} câu hỏi.</p>
            <div className="result-controls">
                <button className="btn btn-primary" onClick={handleRedoSameDifficulty}>Làm lại bài này</button>
                <button className="btn btn-secondary" onClick={handleRestart}>Chọn độ khó khác</button>
            </div>
        </div>
    );
  }
  
  if (activeExercises.length === 0) {
      return (
          <div className="quiz-result">
            <h3>Thông báo</h3>
            <p>Rất tiếc, chưa có bài tập nào ở độ khó này. Em hãy chọn độ khó khác nhé!</p>
            <button className="btn btn-secondary" onClick={handleRestart}>Chọn lại</button>
          </div>
      );
  }

  return (
    <div className="exercise-container">
      <div className={`question-wrapper ${questionAnimation}`}>
        <p>Câu hỏi {currentQ + 1}/{activeExercises.length}</p>
        <p className="exercise-question">{exercise.question}</p>
        <ul className="options-list">
          {exercise.options.map(option => (
            <li
              key={option}
              className={`option ${selectedAns === option ? 'selected' : ''} ${isChecked && option === exercise.answer ? 'correct' : ''} ${isChecked && selectedAns === option && !isCorrect ? 'incorrect' : ''}`}
              onClick={() => !isChecked && setSelectedAns(option)}
              role="button" tabIndex={0} aria-pressed={selectedAns === option}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      {isChecked && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Chính xác! 🎉' : `Tiếc quá, đáp án đúng là: ${exercise.answer}`}
        </div>
      )}
      <div className="quiz-controls">
        {!isChecked ? (
          <button className="btn btn-primary" onClick={handleCheck} disabled={!selectedAns}>Kiểm tra</button>
        ) : (
          <button className="btn btn-secondary" onClick={handleNext}>Tiếp theo</button>
        )}
        {isChecked && !isCorrect && (
           <button className="btn btn-explain" onClick={handleExplainAnswer} disabled={isGeneratingExplanation}>
                {isGeneratingExplanation ? 'Đang tải...' : '✨ Giải thích đáp án'}
            </button>
        )}
      </div>
      
      {showExplanationModal && (
        <div className="modal-overlay">
            <div className="modal-content explanation-modal">
                <h3>Giải thích chi tiết</h3>
                <p>{explanation}</p>
                <button className="btn btn-primary" onClick={() => setShowExplanationModal(false)}>Đã hiểu</button>
            </div>
        </div>
      )}
    </div>
  );
};

const TeacherSetup = ({ onSetupComplete }) => {
    const [teacherEmail, setTeacherEmail] = useState('');
    const [className, setClassName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (teacherEmail && className) {
            const teacherInfo = { email: teacherEmail, className: className };
            try {
                localStorage.setItem('mathAppTeacherInfo', JSON.stringify(teacherInfo));
                onSetupComplete(teacherInfo);
            } catch (err) {
                 alert("Đã có lỗi xảy ra khi lưu thông tin. Vui lòng thử lại.");
                 console.error("Lỗi lưu localStorage:", err);
            }
        } else {
            alert("Vui lòng điền đầy đủ thông tin.");
        }
    };

    return (
        <div className="setup-screen">
            <form className="setup-form" onSubmit={handleSubmit}>
                <h2>Chào mừng Thầy/Cô!</h2>
                <p>Vui lòng thiết lập thông tin lớp học để bắt đầu.</p>
                <div className="form-group">
                    <label htmlFor="teacherEmail">Email của Thầy/Cô (Để nhận báo cáo)</label>
                    <input id="teacherEmail" type="email" value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="className">Tên lớp học</label>
                    <input id="className" type="text" value={className} onChange={(e) => setClassName(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Lưu và Bắt đầu</button>
            </form>
        </div>
    );
};


const LoginScreen = ({ onLogin, teacherInfo }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && teacherInfo.className) {
            onLogin({ name, className: teacherInfo.className });
        } else {
            alert("Vui lòng điền họ và tên của em nhé!");
        }
    };

    return (
        <div className="login-screen">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Chào mừng em đến với lớp {teacherInfo.className}!</h2>
                <p>Hãy nhập tên để bắt đầu học nào.</p>
                <div className="form-group">
                    <label htmlFor="name">Họ và tên</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                 <div className="form-group">
                    <label htmlFor="className">Tên lớp</label>
                    <input id="className" type="text" value={teacherInfo.className} disabled />
                </div>
                <button type="submit" className="btn btn-primary">Vào học</button>
            </form>
        </div>
    );
};

const ChapterCompletionModal = ({ chapterTitle, teacherEmail, studentName, className, onClose }) => {
    const handleSendEmail = () => {
        const subject = `Báo cáo học tập môn Toán - Em ${studentName} - Lớp ${className}`;
        const body = `Kính gửi Thầy/Cô,

Em ${studentName}, học sinh lớp ${className}, đã hoàn thành xuất sắc **${chapterTitle}** trên ứng dụng AI Math Explorer.

Đây là một cột mốc đáng khen ngợi.
Trân trọng.`;
        
        const mailtoLink = `mailto:${teacherEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>🎉 Chúc mừng, {studentName}! 🎉</h3>
                <p>Em đã hoàn thành xuất sắc <strong>{chapterTitle}</strong>.</p>
                <p>Hãy gửi kết quả này về cho giáo viên để thầy/cô cùng vui nhé!</p>
                <button className="btn btn-primary" onClick={handleSendEmail}>Gửi kết quả cho giáo viên</button>
                <button className="btn btn-secondary" style={{marginTop: '1rem'}} onClick={onClose}>Để sau</button>
            </div>
        </div>
    );
};


const Leaderboard = ({ currentUser, teacherInfo }) => {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        if (!teacherInfo) return;
        try {
            const data = localStorage.getItem(`mathAppLeaderboard_${teacherInfo.className}`);
            if (data) {
                const parsedData = JSON.parse(data);
                parsedData.sort((a, b) => b.score - a.score);
                setLeaderboardData(parsedData);
            }
        } catch (e) {
            console.error("Không thể tải bảng xếp hạng:", e);
        }
    }, [teacherInfo]);
    
    const getRankClass = (index) => {
        if (index === 0) return 'rank-1';
        if (index === 1) return 'rank-2';
        if (index === 2) return 'rank-3';
        return '';
    };

    return (
        <div className="leaderboard-container">
            <h2>🏆 Bảng xếp hạng thi đua - Lớp {teacherInfo.className} 🏆</h2>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Hạng</th>
                        <th>Họ và tên</th>
                        <th>Bài đã hoàn thành</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((user, index) => (
                        <tr key={user.name} className={user.name === currentUser.name ? 'current-user-row' : ''}>
                            <td><span className={getRankClass(index)}>{index + 1}</span></td>
                            <td>{user.name}</td>
                            <td>{user.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Component tạo bài học bằng AI
const AILessonGenerator = ({ onLessonGenerated }) => {
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!topic) return;

        setIsGenerating(true);
        setError('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const schema = {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    theory: { type: Type.STRING },
                    exercises: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING },
                                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                                answer: { type: Type.STRING },
                                difficulty: { type: Type.STRING, enum: ['easy', 'medium', 'hard'] }
                            },
                             required: ['question', 'options', 'answer', 'difficulty']
                        }
                    }
                },
                required: ['title', 'theory', 'exercises']
            };

            const prompt = `Hãy tạo một bài học toán lớp 4 tại Việt Nam về chủ đề: "${topic}".
Bài học cần bao gồm:
1.  **title**: Tiêu đề bài học thật ngắn gọn và hấp dẫn.
2.  **theory**: Phần lý thuyết giải thích khái niệm một cách đơn giản, kèm theo 1-2 ví dụ minh họa rõ ràng, dễ hiểu cho học sinh lớp 4.
3.  **exercises**: 5 câu hỏi trắc nghiệm để luyện tập. Mỗi câu hỏi phải có 3-4 lựa chọn (options), một đáp án đúng (answer) và một mức độ khó (difficulty: 'easy', 'medium', hoặc 'hard'). Đáp án đúng phải là một trong các lựa chọn.

Hãy trả về kết quả dưới dạng một đối tượng JSON duy nhất tuân thủ theo cấu trúc đã định. Không thêm bất kỳ ký tự markdown nào.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: schema,
                }
            });

            let jsonStr = response.text.trim();
            const lessonData = JSON.parse(jsonStr);
            
            const processedLesson = {
                ...lessonData,
                id: `ai-${Date.now()}`,
                exercises: lessonData.exercises.map((ex, index) => ({
                    ...ex,
                    id: `ai-ex-${Date.now()}-${index}`,
                    type: 'mcq'
                }))
            };
            
            onLessonGenerated(processedLesson);

        } catch (err) {
            console.error("Lỗi khi tạo bài học bằng AI:", err);
            setError('Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setIsGenerating(false);
        }
    };
    
    return (
        <div className="ai-generator-container">
             {isGenerating && (
                <div className="generating-overlay">
                    <div className="spinner"></div>
                    <div className="loading-text">Thầy/cô AI đang soạn bài, em chờ chút nhé...</div>
                </div>
            )}
            <h2>✨ Trợ lý học tập AI</h2>
            <p>Em muốn học về chủ đề gì nào? Hãy nhập chủ đề bên dưới (ví dụ: "Diện tích hình thoi", "Tìm hai số khi biết tổng và hiệu"), trợ lý AI sẽ tạo ngay một bài học cho em!</p>
            <form className="ai-generator-form" onSubmit={handleGenerate}>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Nhập chủ đề bài học..."
                    disabled={isGenerating}
                    aria-label="Chủ đề bài học"
                />
                <button type="submit" className="btn btn-accent" disabled={isGenerating || !topic}>Tạo bài học</button>
            </form>
            {error && <div className="error" style={{marginTop: '1rem'}}>{error}</div>}
        </div>
    );
};

// Component luyện tập thông minh
const SmartPractice = ({ curriculum, currentUser, teacherInfo }) => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [history, setHistory] = useState([]);
    const [notification, setNotification] = useState('');
    
    const [selectedAns, setSelectedAns] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [questionAnimation, setQuestionAnimation] = useState('fade-in');
    const [scoreAnimation, setScoreAnimation] = useState('');


    const score = useMemo(() => history.filter(h => h.isCorrect).length, [history]);
    const isCorrect = currentQuestion && selectedAns === currentQuestion.answer;
    
    const fetchNextQuestion = useCallback(async (topicTitle, lastQuestion = null) => {
        setIsLoading(true);
        setError('');
        setCurrentQuestion(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const schema = {
                type: Type.OBJECT, properties: {
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    answer: { type: Type.STRING }
                }, required: ['question', 'options', 'answer']
            };
            
            let prompt = `Với vai trò là một gia sư Toán lớp 4 ở Việt Nam, hãy tạo một câu hỏi trắc nghiệm về chủ đề: "${topicTitle}". Câu hỏi nên ở mức độ trung bình.`;
            
            if (lastQuestion) {
                 prompt = `Với vai trò là một gia sư Toán lớp 4 ở Việt Nam, hãy tạo câu hỏi trắc nghiệm **tiếp theo** trong một buổi luyện tập về chủ đề: "${topicTitle}".
Thông tin về câu hỏi trước:
- Câu hỏi: "${lastQuestion.question.question}"
- Học sinh đã trả lời: "${lastQuestion.selectedAns}"
- Đáp án đúng: "${lastQuestion.question.answer}"
- Kết quả: ${lastQuestion.isCorrect ? "Đúng" : "Sai"}

Dựa vào đó:
- Nếu học sinh trả lời **đúng**, hãy tạo một câu hỏi **khó hơn một chút**.
- Nếu học sinh trả lời **sai**, hãy tạo một câu hỏi **dễ hơn một chút** để củng cố kiến thức.

Lưu ý: Đáp án đúng (answer) phải là một trong các lựa chọn (options).`
            }

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { responseMimeType: 'application/json', responseSchema: schema }
            });

            const questionData = JSON.parse(response.text.trim());
            setCurrentQuestion(questionData);

        } catch (err) {
            console.error("Lỗi khi tạo câu hỏi thông minh:", err);
            setError('Rất tiếc, đã có lỗi khi tạo câu hỏi. Em hãy thử lại hoặc chọn chủ đề khác nhé.');
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        if (currentQuestion && !isLoading) {
            setQuestionAnimation('fade-in');
        }
    }, [currentQuestion, isLoading]);

    const handleSelectTopic = useCallback((lesson) => {
        setNotification('');
        setSelectedTopic(lesson);
        setHistory([]);
        fetchNextQuestion(lesson.title);
    }, [fetchNextQuestion]);
    
    const handleCheck = () => {
        setIsChecked(true);
        const correct = selectedAns === currentQuestion.answer;
         if (correct) {
            setScoreAnimation('score-pop-animation');
            setTimeout(() => setScoreAnimation(''), 500); // Animation duration
        }
        setHistory(prev => [...prev, {
            question: currentQuestion,
            selectedAns: selectedAns,
            isCorrect: correct
        }]);
    };
    
    const handleNext = () => {
        setQuestionAnimation('fade-out');
        setTimeout(() => {
            const lastQuestion = {
                question: currentQuestion,
                selectedAns: selectedAns,
                isCorrect: isCorrect
            };
            fetchNextQuestion(selectedTopic.title, lastQuestion);
            setSelectedAns(null);
            setIsChecked(false);
            setExplanation('');
        }, 300);
    };
    
    const handleEndSession = () => {
        if (currentUser && teacherInfo && history.length > 0) {
            try {
                const key = `smartPracticeHistory_${teacherInfo.className}_${currentUser.name}`;
                const savedHistory = JSON.parse(localStorage.getItem(key) || '[]' );
                const newEntry = {
                    topic: selectedTopic.title,
                    score: score,
                    total: history.length,
                    date: new Date().toISOString(),
                };
                savedHistory.push(newEntry);
                localStorage.setItem(key, JSON.stringify(savedHistory));
                setNotification(`Đã lưu kết quả: ${score}/${history.length} câu đúng cho chủ đề "${selectedTopic.title}".`);
            } catch (e) {
                console.error("Không thể lưu lịch sử luyện tập thông minh:", e);
                setNotification('Có lỗi xảy ra khi lưu kết quả.');
            }
        }
        setSelectedTopic(null);
        setCurrentQuestion(null);
        setHistory([]);
    };
    
    const handleExplainAnswer = async () => {
        if (!currentQuestion || !selectedAns) return;
        setIsGeneratingExplanation(true);
        setExplanation('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
             const prompt = `Là một gia sư Toán lớp 4, hãy giải thích thật ngắn gọn và đi thẳng vào vấn đề cho học sinh. Dùng ngôn ngữ đơn giản, rõ ràng như đang nói chuyện trực tiếp.
- **Câu hỏi:** "${currentQuestion.question}"
- **Em đã chọn:** "${selectedAns}"
- **Đáp án đúng:** "${currentQuestion.answer}"

**Yêu cầu:**
1.  Không cần câu chào hỏi hay động viên dài dòng.
2.  **Điểm cần nhớ:** Chỉ ra ngay lỗi sai hoặc kiến thức em bị hổng. (Ví dụ: "**Điểm cần nhớ:** Số liền sau của một số thì lớn hơn số đó 1 đơn vị.")
3.  **Cách làm đúng:** Trình bày các bước giải siêu ngắn gọn. (Ví dụ: "**Cách làm đúng:** Bước 1: Lấy 99.999 cộng 1. Bước 2: 99.999 + 1 = 100.000.")
4.  **Kết luận:** Một câu ngắn gọn để chốt lại. (Ví dụ: "**Kết luận:** Vậy đáp án đúng là 100.000.")

Giữ cho các phần thật súc tích.`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setExplanation(response.text);
            setShowExplanationModal(true);
        } catch (err) {
            console.error("Lỗi khi tạo giải thích:", err);
            setExplanation('Rất tiếc, đã có lỗi khi tạo giải thích.');
            setShowExplanationModal(true);
        } finally {
            setIsGeneratingExplanation(false);
        }
    };
    
    if (!selectedTopic) {
        return (
            <div className="smart-practice-container">
                <h2>🧠 Luyện tập thông minh</h2>
                {notification && <div className="notification-banner">{notification}</div>}
                <p>Chọn một chủ đề bên dưới. Trợ lý AI sẽ tạo ra các câu hỏi với độ khó thay đổi dựa trên câu trả lời của em để giúp em tiến bộ nhanh nhất!</p>
                <div className="topic-selection-grid">
                    {curriculum.map(chapter => (
                        <div key={chapter.id} className="topic-card">
                            <div className="chapter-title">{chapter.title}</div>
                            <ul>
                                {chapter.lessons.filter(l => !l.isTest).map(lesson => (
                                    <li key={lesson.id} onClick={() => handleSelectTopic(lesson)}>{lesson.title}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    return (
        <div className="smart-practice-container" style={{textAlign: 'left'}}>
            {isLoading && (
                 <div className="generating-overlay">
                    <div className="spinner"></div>
                    <div className="loading-text">Gia sư AI đang suy nghĩ câu hỏi tiếp theo...</div>
                </div>
            )}
            <div className="session-header">
                 <h2 style={{color: 'var(--smart-practice-color)'}}>{selectedTopic.title}</h2>
                 <div className={`session-progress ${scoreAnimation}`}>
                    <span>Điểm: {score}/{history.length}</span>
                </div>
            </div>

            {error && <div className="error">{error}</div>}
            
            {currentQuestion && (
                 <div className={`question-wrapper ${questionAnimation}`}>
                  <p className="exercise-question">{currentQuestion.question}</p>
                  <ul className="options-list">
                    {currentQuestion.options.map(option => (
                      <li key={option}
                        className={`option ${selectedAns === option ? 'selected' : ''} ${isChecked && option === currentQuestion.answer ? 'correct' : ''} ${isChecked && selectedAns === option && !isCorrect ? 'incorrect' : ''}`}
                        onClick={() => !isChecked && setSelectedAns(option)}>
                        {option}
                      </li>
                    ))}
                  </ul>
                  {isChecked && (
                    <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                      {isCorrect ? 'Chính xác! 🎉' : `Tiếc quá, đáp án đúng là: ${currentQuestion.answer}`}
                    </div>
                  )}
                  <div className="quiz-controls">
                    {!isChecked ? (
                      <button className="btn btn-primary" onClick={handleCheck} disabled={!selectedAns}>Kiểm tra</button>
                    ) : (
                      <button className="btn btn-smart-practice" onClick={handleNext}>Câu tiếp theo</button>
                    )}
                    {isChecked && !isCorrect && (
                       <button className="btn btn-explain" onClick={handleExplainAnswer} disabled={isGeneratingExplanation}>
                            {isGeneratingExplanation ? 'Đang tải...' : '✨ Giải thích đáp án'}
                        </button>
                    )}
                     <button className="btn btn-secondary" onClick={handleEndSession} style={{marginLeft: 'auto'}}>Kết thúc</button>
                  </div>
                </div>
            )}
            
            {showExplanationModal && (
                <div className="modal-overlay">
                    <div className="modal-content explanation-modal">
                        <h3>Giải thích chi tiết</h3>
                        <p>{explanation}</p>
                        <button className="btn btn-primary" onClick={() => setShowExplanationModal(false)}>Đã hiểu</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProgressChart = ({ teacherInfo }) => {
    // This component displays static data as requested.
    // In a real application, this data would come from a backend.
    return (
        <div className="progress-container">
            <h2>📊 Báo cáo tiến độ học tập - Lớp {teacherInfo.className}</h2>
            <p className="report-subtitle">Dữ liệu được tổng hợp và phân tích tự động bởi AI Math Explorer.</p>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📈</div>
                    <div className="stat-value">6.4 ➔ 8.2</div>
                    <div className="stat-label">Điểm luyện tập trung bình</div>
                    <div className="stat-description">Tăng đáng kể sau 8 tuần, cho thấy hiệu quả học tập rõ rệt.</div>
                </div>
                 <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-value">94%</div>
                    <div className="stat-label">Tỷ lệ hoàn thành nhiệm vụ</div>
                    <div className="stat-description">Học sinh có ý thức tự giác cao trong việc hoàn thành các bài học được giao.</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">❤️</div>
                    <div className="stat-value">89%</div>
                    <div className="stat-label">Phản hồi tích cực</div>
                    <div className="stat-description">Học sinh đánh giá ứng dụng “thân thiện, dễ hiểu, giống như đang chơi mà học”.</div>
                </div>
                 <div className="stat-card">
                    <div className="stat-icon">⏰</div>
                    <div className="stat-value">3.2 buổi/tuần</div>
                    <div className="stat-label">Tần suất sử dụng</div>
                    <div className="stat-description">Mỗi học sinh sử dụng ứng dụng thường xuyên, hình thành thói quen học tập tốt.</div>
                </div>
                 <div className="stat-card">
                    <div className="stat-icon">🌱</div>
                    <div className="stat-value">Cải thiện nhanh</div>
                    <div className="stat-label">Nhóm học sinh yếu</div>
                    <div className="stat-description">Cải thiện nhanh nhất trong 4 tuần đầu nhờ AI tự giảm độ khó và tăng hỗ trợ.</div>
                </div>
                 <div className="stat-card">
                    <div className="stat-icon">💡</div>
                    <div className="stat-value">Tư duy logic</div>
                    <div className="stat-label">Phát triển năng lực</div>
                    <div className="stat-description">Hệ thống giúp các em phát triển năng lực tư duy toán học và tự học hiệu quả.</div>
                </div>
            </div>
        </div>
    );
};


// Component chính
const App = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('theory');
  const [progress, setProgress] = useState({});
  const [view, setView] = useState('learning'); // 'learning', 'leaderboard', 'aiGenerator', 'smartPractice', 'progress'
  const [showChapterCompletionModal, setShowChapterCompletionModal] = useState(false);
  const [completedChapterInfo, setCompletedChapterInfo] = useState(null);
  const [aiGeneratedLesson, setAiGeneratedLesson] = useState(null);

  const processedCurriculum = useMemo(() => {
    return mathCurriculum.map(chapter => {
      const allExercises = chapter.lessons.flatMap(l => l.exercises);
      if (allExercises.length === 0) {
        return chapter;
      }
      
      const shuffled = [...allExercises].sort(() => 0.5 - Math.random());
      const testExercises = shuffled.slice(0, Math.min(allExercises.length, 10)); 

      if (testExercises.length < 3) { // Chỉ tạo bài kiểm tra nếu có đủ câu hỏi
        return chapter;
      }

      const testLesson = {
        id: `${chapter.id}-test`,
        title: `📝 Kiểm tra tổng hợp`,
        theory: `Đây là bài kiểm tra tổng hợp kiến thức cho toàn bộ "${chapter.title}". Em hãy vận dụng những gì đã học để hoàn thành tốt nhé!`,
        exercises: testExercises, // Now contains exercises with difficulty
        isTest: true,
      };

      return {
        ...chapter,
        lessons: [...chapter.lessons, testLesson],
      };
    });
  }, []);

  useEffect(() => {
    try {
        const savedTeacherInfo = localStorage.getItem('mathAppTeacherInfo');
        if (savedTeacherInfo) {
            const teacher = JSON.parse(savedTeacherInfo);
            setTeacherInfo(teacher);

            const savedUser = localStorage.getItem(`mathAppCurrentUser_${teacher.className}`);
            if (savedUser) {
                const user = JSON.parse(savedUser);
                setCurrentUser(user);
                
                const savedProgress = localStorage.getItem(`mathAppProgress_${teacher.className}_${user.name}`);
                if (savedProgress) {
                    setProgress(JSON.parse(savedProgress));
                }
            }
        }
    } catch (e) {
        console.error("Không thể tải dữ liệu người dùng:", e);
    }
  }, []);

  const handleTeacherSetup = (info) => {
    setTeacherInfo(info);
    // Teacher is set, now app will re-render and show student login
  };

  const handleLogin = (userInfo) => {
    setCurrentUser(userInfo);
    try {
        localStorage.setItem(`mathAppCurrentUser_${teacherInfo.className}`, JSON.stringify(userInfo));
    } catch (e) {
        console.error("Không thể lưu thông tin người dùng:", e);
    }
  };

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setAiGeneratedLesson(null); // Xóa bài học AI khi chọn bài mới
    setActiveTab('theory');
  };
  
  const checkAndHandleChapterCompletion = (lessonId, newProgress) => {
      const chapter = processedCurriculum.find(c => c.lessons.some(l => l.id === lessonId));
      if (!chapter) return;
      
      const regularLessonsInChapter = chapter.lessons.filter(l => !l.isTest).map(l => l.id);
      const allCompleted = regularLessonsInChapter.every(id => newProgress[id] === 'completed');

      if (allCompleted) {
          setCompletedChapterInfo(chapter);
          setShowChapterCompletionModal(true);
      }
  };

  const handleCompleteLesson = useCallback((lessonId) => {
    if (!currentUser || !teacherInfo) return;
    if (progress[lessonId] === 'completed') return;

    const newProgress = { ...progress, [lessonId]: 'completed' };
    setProgress(newProgress);
    
    try {
      localStorage.setItem(`mathAppProgress_${teacherInfo.className}_${currentUser.name}`, JSON.stringify(newProgress));
      
      const leaderboardKey = `mathAppLeaderboard_${teacherInfo.className}`;
      const leaderboardStr = localStorage.getItem(leaderboardKey) || '[]';
      let leaderboard = JSON.parse(leaderboardStr);
      let userInLeaderboard = leaderboard.find(u => u.name === currentUser.name);
      
      if (userInLeaderboard) {
          userInLeaderboard.score = Object.keys(newProgress).length;
      } else {
          leaderboard.push({ ...currentUser, score: 1 });
      }
      localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));
      
    } catch (e) {
      console.error("Không thể lưu tiến độ:", e);
    }
    
    checkAndHandleChapterCompletion(lessonId, newProgress);
  }, [progress, currentUser, teacherInfo, processedCurriculum]);
  
  const handleAiLessonGenerated = (lesson) => {
    setAiGeneratedLesson(lesson);
    setSelectedLesson(null); // Bỏ chọn bài học trong chương trình
    setView('aiGenerator'); // Chuyển sang view AI
    setActiveTab('theory');
  }

  if (!teacherInfo) {
      return <TeacherSetup onSetupComplete={handleTeacherSetup} />;
  }

  if (!currentUser) {
      return <LoginScreen onLogin={handleLogin} teacherInfo={teacherInfo} />;
  }
  
  const currentLesson = aiGeneratedLesson || selectedLesson;

  return (
    <>
      <header className="app-header">
        <h1>AI Math Explorer</h1>
      </header>
       <nav className="main-view-tabs">
            <button className={`btn ${view === 'learning' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('learning')}>📚 Học theo chương trình</button>
            <button className={`btn ${view === 'aiGenerator' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('aiGenerator')}>✨ Trợ lý AI</button>
            <button className={`btn ${view === 'smartPractice' ? 'btn-smart-practice' : 'btn-secondary'}`} onClick={() => setView('smartPractice')}>🧠 Luyện tập thông minh</button>
            <button className={`btn ${view === 'leaderboard' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('leaderboard')}>🏆 Thi đua</button>
            <button className={`btn ${view === 'progress' ? 'btn-accent' : 'btn-secondary'}`} onClick={() => setView('progress')}>📊 Tiến độ học tập</button>
        </nav>
      
      {view === 'learning' && (
          <main className="app-container app-container-learning">
            <aside className="sidebar">
              <h2>Chương trình học</h2>
              <ul className="curriculum-list">
                {processedCurriculum.map(chapter => (
                  <li key={chapter.id} className="chapter-item">
                    <div className="chapter-title">{chapter.title}</div>
                    <ul className="lessons-list">
                      {chapter.lessons.map(lesson => (
                        <li
                          key={lesson.id}
                          className={`lesson-item ${selectedLesson?.id === lesson.id ? 'selected' : ''} ${lesson.isTest ? 'test-item' : ''}`}
                          onClick={() => handleSelectLesson(lesson)}
                          role="button" tabIndex={0}
                        >
                          <span>{lesson.title}</span>
                          {progress[lesson.id] === 'completed' && <span className="completed-icon">✅</span>}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </aside>
            <section className="content-area" aria-live="polite">
              {!currentLesson ? (
                <div className="placeholder">
                  <div className="placeholder-icon">👋</div>
                  <p>Chào {currentUser.name}! <br/> Hãy chọn một bài học bên trái để bắt đầu nhé.</p>
                </div>
              ) : (
                <div>
                  <h2>{currentLesson.title}</h2>
                  <div className="tabs">
                    <button className={`tab-button ${activeTab === 'theory' ? 'active' : ''}`} onClick={() => setActiveTab('theory')}>Lý thuyết</button>
                    <button className={`tab-button ${activeTab === 'practice' ? 'active' : ''}`} onClick={() => setActiveTab('practice')}>Luyện tập</button>
                  </div>
                  <div className="tab-content">
                    {activeTab === 'theory' && (
                      <div className="theory-content">
                        <p>{currentLesson.theory}</p>
                        <GeminiSuggestions topicTitle={currentLesson.title} />
                      </div>
                    )}
                    {activeTab === 'practice' && (
                       <Practice exercises={currentLesson.exercises} onComplete={() => handleCompleteLesson(currentLesson.id)} />
                    )}
                  </div>
                </div>
              )}
            </section>
          </main>
        )}
        
        {view === 'aiGenerator' && (
            <main>
                {!aiGeneratedLesson ? (
                     <AILessonGenerator onLessonGenerated={handleAiLessonGenerated} />
                ) : (
                     <div className="content-area">
                        <button className="btn btn-secondary" onClick={() => setAiGeneratedLesson(null)} style={{marginBottom: '1rem'}}>+ Tạo bài học khác</button>
                        <h2>{aiGeneratedLesson.title}</h2>
                        <div className="tabs">
                            <button className={`tab-button ${activeTab === 'theory' ? 'active' : ''}`} onClick={() => setActiveTab('theory')}>Lý thuyết</button>
                            <button className={`tab-button ${activeTab === 'practice' ? 'active' : ''}`} onClick={() => setActiveTab('practice')}>Luyện tập</button>
                        </div>
                        <div className="tab-content">
                            {activeTab === 'theory' && (
                            <div className="theory-content">
                                <p>{aiGeneratedLesson.theory}</p>
                            </div>
                            )}
                            {activeTab === 'practice' && (
                            <Practice exercises={aiGeneratedLesson.exercises} onComplete={() => {}} />
                            )}
                        </div>
                     </div>
                )}
            </main>
        )}
        
        {view === 'smartPractice' && (
            <main>
                <SmartPractice curriculum={processedCurriculum} currentUser={currentUser} teacherInfo={teacherInfo} />
            </main>
        )}

        {view === 'leaderboard' && (
            <Leaderboard currentUser={currentUser} teacherInfo={teacherInfo} />
        )}

        {view === 'progress' && (
            <ProgressChart teacherInfo={teacherInfo} />
        )}
        
        {showChapterCompletionModal && (
            <ChapterCompletionModal 
                chapterTitle={completedChapterInfo.title}
                teacherEmail={teacherInfo.email}
                studentName={currentUser.name}
                className={teacherInfo.className}
                onClose={() => setShowChapterCompletionModal(false)}
            />
        )}
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);