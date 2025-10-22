import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI, Type } from '@google/genai';

// Cấu trúc dữ liệu chi tiết cho chương trình Toán lớp 4
const mathCurriculum = [
  {
    id: 'c1',
    title: 'Chương 1: Ôn tập và bổ sung về số tự nhiên',
    lessons: [
      {
        id: 'l1-1',
        title: 'Ôn tập các số đến 100.000',
        theory: `Chào các em! Bài học hôm nay chúng ta sẽ cùng nhau ôn lại cách đọc, viết và so sánh các số trong phạm vi 100.000 nhé.
        - Số 10.000 đọc là "mười nghìn" (hoặc một vạn).
        - Số 100.000 đọc là "một trăm nghìn".
        - Khi so sánh hai số, ta so sánh từng cặp chữ số ở cùng một hàng, kể từ trái sang phải.`,
        exercises: [
          { id: 'e1-1-1', type: 'mcq', question: 'Số "Bốn mươi nghìn không trăm linh năm" được viết là:', options: ['40.050', '40.005', '4.005', '40.500'], answer: '40.005' },
          { id: 'e1-1-2', type: 'mcq', question: 'Số 80.125 đọc là:', options: ['Tám mươi nghìn một trăm hai lăm', 'Tám nghìn một trăm hai lăm', 'Tám mươi một nghìn hai trăm năm', 'Tám mươi nghìn một trăm hai năm'], answer: 'Tám mươi nghìn một trăm hai lăm' },
          { id: 'e1-1-3', type: 'mcq', question: 'Trong số 83.291, chữ số 3 có giá trị là:', options: ['300', '30', '3.000', '3'], answer: '3.000' },
          { id: 'e1-1-4', type: 'mcq', question: 'Số gồm 5 chục nghìn, 2 nghìn, 6 trăm, 3 chục và 4 đơn vị là:', options: ['52.634', '5.2634', '52.364', '50.264'], answer: '52.634' },
          { id: 'e1-1-5', type: 'mcq', question: 'Số liền sau của số 99.999 là:', options: ['99.998', '100.000', '99.900', '10.000'], answer: '100.000' },
        ],
      },
      {
        id: 'l1-2',
        title: 'So sánh các số có nhiều chữ số',
        theory: `Để so sánh hai số tự nhiên:
        1. Số nào có nhiều chữ số hơn thì lớn hơn. Ví dụ: 100.000 > 99.999.
        2. Nếu hai số có cùng số chữ số, ta so sánh từng cặp chữ số ở cùng một hàng từ trái sang phải.
        Ví dụ: So sánh 58.921 và 58.899. Ta thấy hàng nghìn và hàng chục nghìn giống nhau. Ở hàng trăm, 9 > 8 nên 58.921 > 58.899.`,
        exercises: [
          { id: 'e1-2-1', type: 'mcq', question: 'Điền dấu thích hợp vào chỗ chấm: 99.578 ... 100.000', options: ['>', '<', '='], answer: '<' },
          { id: 'e1-2-2', type: 'mcq', question: 'Điền dấu thích hợp vào chỗ chấm: 85.345 ... 85.354', options: ['>', '<', '='], answer: '<' },
          { id: 'e1-2-3', type: 'mcq', question: 'Tìm số lớn nhất trong các số sau: 45.987, 45.897, 54.789, 54.798', options: ['45.987', '45.897', '54.789', '54.798'], answer: '54.798' },
          { id: 'e1-2-4', type: 'mcq', question: 'Tìm số bé nhất trong các số sau: 72.569, 72.659, 72.596, 72.695', options: ['72.569', '72.659', '72.596', '72.695'], answer: '72.569' },
          { id: 'e1-2-5', type: 'mcq', question: 'Sắp xếp các số sau theo thứ tự từ lớn đến bé: 28.475, 28.745, 28.574, 27.854', options: ['28.745, 28.574, 28.475, 27.854', '27.854, 28.475, 28.574, 28.745', '28.745, 28.475, 28.574, 27.854'], answer: '28.745, 28.574, 28.475, 27.854' },
          { id: 'e1-2-6', type: 'mcq', question: 'Tìm số tròn trăm x biết: 45.800 < x < 46.100', options: ['45.000', '45.900', '46.200', '46.000'], answer: '45.900' },
        ],
      },
       {
        id: 'l1-3',
        title: 'Triệu và lớp triệu',
        theory: `Các số lớn hơn 100.000 là các số có 6, 7, 8, 9... chữ số.
        - 10 trăm nghìn là 1 triệu, viết là 1.000.000.
        - 10 triệu là 1 chục triệu. 10 chục triệu là 1 trăm triệu.
        - Lớp triệu gồm các hàng: hàng triệu, hàng chục triệu, hàng trăm triệu.
        - Lớp nghìn gồm các hàng: hàng nghìn, hàng chục nghìn, hàng trăm nghìn.
        - Lớp đơn vị gồm các hàng: hàng đơn vị, hàng chục, hàng trăm.`,
        exercises: [
          { id: 'e1-3-1', type: 'mcq', question: 'Số "Năm triệu không trăm linh hai nghìn bốn trăm" được viết là:', options: ['5.002.400', '5.240.000', '5.024.000', '5.000.240'], answer: '5.002.400' },
          { id: 'e1-3-2', type: 'mcq', question: 'Trong số 34.567.890, chữ số 5 thuộc hàng nào, lớp nào?', options: ['Hàng trăm nghìn, lớp nghìn', 'Hàng triệu, lớp triệu', 'Hàng trăm, lớp đơn vị', 'Hàng chục nghìn, lớp nghìn'], answer: 'Hàng trăm nghìn, lớp nghìn' },
          { id: 'e1-3-3', type: 'mcq', question: 'Giá trị của chữ số 8 trong số 18.234.567 là:', options: ['80.000', '800.000', '8.000.000', '8'], answer: '8.000.000' },
          { id: 'e1-3-4', type: 'mcq', question: 'Số lớn nhất có 7 chữ số là:', options: ['1.000.000', '9.999.999', '9.876.543', '10.000.000'], answer: '9.999.999' },
          { id: 'e1-3-5', type: 'mcq', question: 'Làm tròn số 4.872.345 đến hàng trăm nghìn ta được:', options: ['4.800.000', '4.900.000', '5.000.000', '4.870.000'], answer: '4.900.000' },
        ],
      },
    ],
  },
  {
    id: 'c2',
    title: 'Chương 2: Phép cộng, phép trừ',
    lessons: [
       {
        id: 'l2-1',
        title: 'Cộng, trừ các số có nhiều chữ số',
        theory: 'Khi cộng hoặc trừ các số có nhiều chữ số, ta đặt tính thẳng hàng (các chữ số cùng hàng thẳng cột với nhau) rồi tính từ phải sang trái.',
        exercises: [
           { id: 'e2-1-1', type: 'mcq', question: 'Đặt tính rồi tính: 35.246 + 42.152', options: ['77.398', '77.388', '77.498'], answer: '77.398'},
           { id: 'e2-1-2', type: 'mcq', question: 'Đặt tính rồi tính: 95.768 - 52.345', options: ['42.423', '43.423', '43.323'], answer: '43.423'},
           { id: 'e2-1-3', type: 'mcq', question: 'Kết quả của phép tính 48.352 + 25.347 là:', options: ['73.699', '73.599', '63.699'], answer: '73.699'},
           { id: 'e2-1-4', type: 'mcq', question: 'Tìm x, biết: x - 15.200 = 34.500', options: ['49.700', '19.300', '49.800'], answer: '49.700'},
           { id: 'e2-1-5', type: 'mcq', question: 'Một cửa hàng có 50.000 kg xi măng. Buổi sáng bán được 18.000 kg, buổi chiều bán được 25.000 kg. Hỏi cửa hàng còn lại bao nhiêu kg xi măng?', options: ['7.000 kg', '17.000 kg', '43.000 kg'], answer: '7.000 kg'},
           { id: 'e2-1-6', type: 'mcq', question: 'Tổng của số lớn nhất có 5 chữ số và số bé nhất có 5 chữ số là:', options: ['109.999', '110.000', '99.999', '109.998'], answer: '109.999'},
           { id: 'e2-1-7', type: 'mcq', question: 'Kết quả của phép tính 80.000 - 35.678 là:', options: ['44.322', '54.322', '45.432', '44.422'], answer: '44.322'},
        ],
      },
    ]
  },
  {
    id: 'c3',
    title: 'Chương 3: Phép nhân, phép chia',
    lessons: [
       {
        id: 'l3-1',
        title: 'Nhân với số có hai, ba chữ số',
        theory: 'Khi nhân với số có hai chữ số, ta lần lượt nhân thừa số thứ nhất với từng chữ số của thừa số thứ hai (theo thứ tự từ phải sang trái), sau đó cộng các kết quả lại. Tích riêng thứ hai được viết lùi sang trái một cột so với tích riêng thứ nhất.',
        exercises: [
           { id: 'e3-1-1', type: 'mcq', question: 'Kết quả của phép tính 25 x 11 là:', options: ['275', '255', '265', '285'], answer: '275'},
           { id: 'e3-1-2', type: 'mcq', question: 'Kết quả của phép tính 134 x 25 là:', options: ['3.250', '3.350', '3.450', '3.150'], answer: '3.350'},
           { id: 'e3-1-3', type: 'mcq', question: 'Một trường học có 15 lớp, mỗi lớp có 32 học sinh. Hỏi trường đó có tất cả bao nhiêu học sinh?', options: ['450', '460', '480', '500'], answer: '480'},
           { id: 'e3-1-4', type: 'mcq', question: 'Tính: 123 x 101', options: ['12423', '12323', '13523', '12123'], answer: '12423'},
           { id: 'e3-1-5', type: 'mcq', question: 'Tìm x biết: x : 15 = 24', options: ['300', '320', '340', '360'], answer: '360'},
        ],
      },
       {
        id: 'l3-2',
        title: 'Chia cho số có hai, ba chữ số',
        theory: 'Để chia cho số có hai chữ số, ta thực hiện chia theo thứ tự từ trái sang phải. Mỗi lượt chia, ta ước lượng thương, sau đó nhân ngược lại và trừ để tìm số dư.',
        exercises: [
           { id: 'e3-2-1', type: 'mcq', question: 'Kết quả của phép tính 84 : 21 là:', options: ['3', '4', '5', '6'], answer: '4'},
           { id: 'e3-2-2', type: 'mcq', question: 'Kết quả của phép tính 255 : 51 là:', options: ['4', '5', '6', '7'], answer: '5'},
           { id: 'e3-2-3', type: 'mcq', question: 'Tìm số dư của phép chia 469 cho 35', options: ['12', '13', '14', '15'], answer: '14'},
           { id: 'e3-2-4', type: 'mcq', question: 'Cần có ít nhất bao nhiêu xe ô tô 45 chỗ để chở hết 380 hành khách?', options: ['8 xe', '9 xe', '10 xe', '11 xe'], answer: '9 xe'},
           { id: 'e3-2-5', type: 'mcq', question: 'Tìm x biết: 23 × x = 529', options: ['21', '22', '23', '24'], answer: '23'},
        ],
      },
    ]
  },
  {
    id: 'c4',
    title: 'Chương 4: Dấu hiệu chia hết, phân số',
    lessons: [
       {
        id: 'l4-1',
        title: 'Dấu hiệu chia hết cho 2, 5',
        theory: `- Các số có chữ số tận cùng là 0, 2, 4, 6, 8 thì chia hết cho 2 (đó là các số chẵn).
- Các số có chữ số tận cùng là 0 hoặc 5 thì chia hết cho 5.`,
        exercises: [
           { id: 'e4-1-1', type: 'mcq', question: 'Số nào sau đây chia hết cho 2?', options: ['123', '234', '345', '451'], answer: '234'},
           { id: 'e4-1-2', type: 'mcq', question: 'Số nào sau đây chia hết cho 5?', options: ['554', '555', '556', '557'], answer: '555'},
           { id: 'e4-1-3', type: 'mcq', question: 'Số nào sau đây vừa chia hết cho 2, vừa chia hết cho 5?', options: ['125', '250', '502', '521'], answer: '250'},
           { id: 'e4-1-4', type: 'mcq', question: 'Thay * bằng chữ số nào để số 1*2 chia hết cho 2?', options: ['1', '3', '5', 'Bất kỳ chữ số nào'], answer: 'Bất kỳ chữ số nào'},
           { id: 'e4-1-5', type: 'mcq', question: 'Trong các số từ 1 đến 20, có bao nhiêu số chia hết cho 5?', options: ['3', '4', '5', '6'], answer: '4'},
        ],
      },
       {
        id: 'l4-2',
        title: 'Giới thiệu về phân số',
        theory: `Phân số dùng để ghi kết quả của phép chia một số tự nhiên cho một số tự nhiên khác 0.
- Phân số có tử số và mẫu số. Tử số là số tự nhiên viết trên gạch ngang. Mẫu số là số tự nhiên khác 0 viết dưới gạch ngang.
- Ví dụ: 3/4 đọc là "ba phần tư".`,
        exercises: [
           { id: 'e4-2-1', type: 'mcq', question: 'Trong phân số 5/8, số 5 được gọi là gì?', options: ['Mẫu số', 'Tử số', 'Thừa số', 'Số hạng'], answer: 'Tử số'},
           { id: 'e4-2-2', type: 'mcq', question: 'Phân số "bảy phần mười hai" được viết là:', options: ['7/10', '12/7', '7/12', '10/7'], answer: '7/12'},
           { id: 'e4-2-3', type: 'mcq', question: 'Phân số nào chỉ phần đã tô màu trong hình (hình tròn chia 4 phần, tô 1 phần)?', options: ['1/3', '1/4', '3/4', '4/1'], answer: '1/4'},
           { id: 'e4-2-4', type: 'mcq', question: 'Mẫu số của phân số 9/15 là:', options: ['9', '15', '6', '24'], answer: '15'},
           { id: 'e4-2-5', type: 'mcq', question: 'Phép chia 5 : 8 được viết dưới dạng phân số là:', options: ['8/5', '5/8', '3/8', '5/3'], answer: '5/8'},
        ],
      },
    ]
  },
   {
    id: 'c5',
    title: 'Chương 5: Hình học và đo lường',
    lessons: [
       {
        id: 'l5-1',
        title: 'Góc nhọn, góc tù, góc bẹt',
        theory: `- Góc có số đo nhỏ hơn 90 độ là góc nhọn.
- Góc có số đo lớn hơn 90 độ và nhỏ hơn 180 độ là góc tù.
- Góc có số đo bằng 180 độ là góc bẹt.
- Góc có số đo bằng 90 độ là góc vuông.`,
        exercises: [
           { id: 'e5-1-1', type: 'mcq', question: 'Góc tạo bởi hai kim đồng hồ lúc 3 giờ là góc gì?', options: ['Góc nhọn', 'Góc tù', 'Góc vuông', 'Góc bẹt'], answer: 'Góc vuông'},
           { id: 'e5-1-2', type: 'mcq', question: 'Góc tạo bởi hai kim đồng hồ lúc 1 giờ là góc gì?', options: ['Góc nhọn', 'Góc tù', 'Góc vuông', 'Góc bẹt'], answer: 'Góc nhọn'},
           { id: 'e5-1-3', type: 'mcq', question: 'Góc tạo bởi hai kim đồng hồ lúc 6 giờ là góc gì?', options: ['Góc nhọn', 'Góc tù', 'Góc vuông', 'Góc bẹt'], answer: 'Góc bẹt'},
           { id: 'e5-1-4', type: 'mcq', question: 'Góc nào lớn nhất?', options: ['Góc nhọn', 'Góc tù', 'Góc vuông', 'Góc bẹt'], answer: 'Góc bẹt'},
           { id: 'e5-1-5', type: 'mcq', question: 'Một tam giác có 3 góc nhọn. Đó là tam giác gì?', options: ['Tam giác vuông', 'Tam giác tù', 'Tam giác nhọn', 'Không xác định'], answer: 'Tam giác nhọn'},
        ],
      },
       {
        id: 'l5-2',
        title: 'Yến, tạ, tấn. Giây, thế kỷ',
        theory: `Bảng đơn vị đo khối lượng:
- 1 tấn = 10 tạ
- 1 tạ = 10 yến
- 1 yến = 10 kg
- 1 tấn = 1000 kg

Bảng đơn vị đo thời gian:
- 1 phút = 60 giây
- 1 thế kỷ = 100 năm`,
        exercises: [
           { id: 'e5-2-1', type: 'mcq', question: '5 yến = ... kg?', options: ['5', '50', '500', '5000'], answer: '50'},
           { id: 'e5-2-2', type: 'mcq', question: '3 tạ 5 kg = ... kg?', options: ['35', '305', '350', '80'], answer: '305'},
           { id: 'e5-2-3', type: 'mcq', question: '2 tấn 40 kg = ... kg?', options: ['240', '2040', '2400', '600'], answer: '2040'},
           { id: 'e5-2-4', type: 'mcq', question: 'Năm 2000 thuộc thế kỷ nào?', options: ['XIX (19)', 'XX (20)', 'XXI (21)', 'XVIII (18)'], answer: 'XX (20)'},
           { id: 'e5-2-5', type: 'mcq', question: '1/4 thế kỷ có bao nhiêu năm?', options: ['20 năm', '25 năm', '40 năm', '50 năm'], answer: '25 năm'},
           { id: 'e5-2-6', type: 'mcq', question: 'Một con voi nặng 2 tấn. Một con hà mã nặng 15 tạ. Con voi nặng hơn con hà mã bao nhiêu kg?', options: ['50 kg', '500 kg', '1000 kg', '5 kg'], answer: '500 kg'},
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
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);


  useEffect(() => {
      // Reset state when exercises change
      setCurrentQ(0);
      setSelectedAns(null);
      setIsChecked(false);
      setScore(0);
      setShowResult(false);
      setExplanation('');
      setIsGeneratingExplanation(false);
      setShowExplanationModal(false);
  }, [exercises]);

  const exercise = exercises[currentQ];
  const isCorrect = selectedAns === exercise.answer;

  const handleCheck = () => {
    setIsChecked(true);
    if (isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < exercises.length - 1) {
      setCurrentQ(q => q + 1);
      setSelectedAns(null);
      setIsChecked(false);
      setExplanation('');
      setShowExplanationModal(false);
    } else {
      setShowResult(true);
      if(onComplete) onComplete();
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedAns(null);
    setIsChecked(false);
    setScore(0);
    setShowResult(false);
    setExplanation('');
    setShowExplanationModal(false);
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

  if (showResult) {
    return (
        <div className="quiz-result">
            <h3>Hoàn thành!</h3>
            <p>Em đã trả lời đúng {score} / {exercises.length} câu hỏi.</p>
            <button className="btn btn-primary" onClick={handleRestart}>Làm lại</button>
        </div>
    );
  }
  
  if (!exercise) {
      return (
          <div className="quiz-result">
            <h3>Thông báo</h3>
            <p>Chưa có bài tập cho phần này.</p>
          </div>
      );
  }

  return (
    <div className="exercise-container">
      <p>Câu hỏi {currentQ + 1}/{exercises.length}</p>
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
                                answer: { type: Type.STRING }
                            },
                             required: ['question', 'options', 'answer']
                        }
                    }
                },
                required: ['title', 'theory', 'exercises']
            };

            const prompt = `Hãy tạo một bài học toán lớp 4 tại Việt Nam về chủ đề: "${topic}".
Bài học cần bao gồm:
1.  **title**: Tiêu đề bài học thật ngắn gọn và hấp dẫn.
2.  **theory**: Phần lý thuyết giải thích khái niệm một cách đơn giản, kèm theo 1-2 ví dụ minh họa rõ ràng, dễ hiểu cho học sinh lớp 4.
3.  **exercises**: 5 câu hỏi trắc nghiệm để luyện tập. Mỗi câu hỏi phải có 3-4 lựa chọn (options) và một đáp án đúng (answer). Đáp án đúng phải là một trong các lựa chọn.

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
const SmartPractice = ({ curriculum }) => {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [history, setHistory] = useState([]);
    
    const [selectedAns, setSelectedAns] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);

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
    
    const handleSelectTopic = useCallback((lesson) => {
        setSelectedTopic(lesson);
        setHistory([]);
        fetchNextQuestion(lesson.title);
    }, [fetchNextQuestion]);
    
    const handleCheck = () => {
        setIsChecked(true);
        setHistory(prev => [...prev, {
            question: currentQuestion,
            selectedAns: selectedAns,
            isCorrect: isCorrect
        }]);
    };
    
    const handleNext = () => {
        const lastQuestion = {
            question: currentQuestion,
            selectedAns: selectedAns,
            isCorrect: isCorrect
        };
        fetchNextQuestion(selectedTopic.title, lastQuestion);
        setSelectedAns(null);
        setIsChecked(false);
        setExplanation('');
    };
    
    const handleEndSession = () => {
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
                 <div className="session-progress">
                    <span>Điểm: {score}/{history.length}</span>
                </div>
            </div>

            {error && <div className="error">{error}</div>}
            
            {currentQuestion && (
                 <div className="exercise-container">
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
      const shuffled = [...allExercises].sort(() => 0.5 - Math.random());
      const testExercises = shuffled.slice(0, Math.min(allExercises.length, 7)); 

      if (testExercises.length === 0) {
        return chapter;
      }

      const testLesson = {
        id: `${chapter.id}-test`,
        title: `📝 Kiểm tra tổng hợp`,
        theory: `Đây là bài kiểm tra tổng hợp kiến thức cho toàn bộ "${chapter.title}". Em hãy vận dụng những gì đã học để hoàn thành tốt nhé!`,
        exercises: testExercises,
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
                <SmartPractice curriculum={processedCurriculum} />
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
