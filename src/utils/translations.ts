export type Languages = 'en' | 'vi';

type TranslationKeys = {
  [key: string]: string;
};

type TranslationsType = {
  [key in Languages]: TranslationKeys;
};

export const translations: TranslationsType = {
  en: {
    // App
    appName: 'PneumoDetect',
    appTitle: 'Pneumonia Detection Tool',
    appDescription: 'Upload a chest X-ray image to detect pneumonia using our advanced AI model',
    howItWorks: 'How It Works',
    howItWorksDescription: 'Our application uses a DenseNet121 deep learning model trained on thousands of chest X-ray images to detect signs of pneumonia with high accuracy.',
    
    // Navigation
    home: 'Home',
    history: 'History',
    guide: 'Guide',
    
    // Image Upload
    dragAndDropImage: 'Drag and drop your chest X-ray image here',
    dropImageHere: 'Drop the image here',
    supportedFormats: 'Supported formats: JPEG, PNG (max 10MB)',
    browseFiles: 'Browse Files',
    analyzeImage: 'Analyze Image',
    analyzing: 'Analyzing...',
    fileTooLarge: 'File is too large. Maximum size is 10MB.',
    invalidFileType: 'Invalid file type. Please upload a JPEG or PNG image.',
    
    // Results
    analysisResults: 'Analysis Results',
    diagnosis: 'Diagnosis',
    pneumonia: 'Pneumonia',
    normal: 'Normal',
    pneumoniaDescription: 'The AI model has detected patterns consistent with pneumonia in this X-ray image.',
    normalDescription: 'The AI model has not detected patterns consistent with pneumonia in this X-ray image.',
    confidenceScore: 'Confidence Score',
    recommendation: 'Recommendation',
    pneumoniaRecommendation: 'Consult with a healthcare professional for further evaluation and treatment options.',
    normalRecommendation: 'No signs of pneumonia detected. Regular check-ups are still recommended for overall health.',
    analyzeAnother: 'Analyze Another Image',
    download: 'Download',
    share: 'Share',
    disclaimer: 'Disclaimer:',
    disclaimerText: 'This tool is for informational purposes only and should not replace professional medical advice, diagnosis, or treatment.',
    
    // History
    analysisHistory: 'Analysis History',
    searchPlaceholder: 'Search by ID',
    all: 'All',
    noHistory: 'No Analysis History',
    startAnalyzing: 'Start analyzing X-ray images to build your history.',
    noMatchingResults: 'No matching results found',
    tryDifferentSearch: 'Try a different search term or filter.',
    hideDetails: 'Hide Details',
    showDetails: 'Show Details',
    viewFullReport: 'View Full Report',
    
    // Confidence
    lowConfidence: 'Low Confidence',
    highConfidence: 'High Confidence',
    
    // Guide
    userGuide: 'User Guide',
    howToUse: 'How to Use',
    uploadXray: 'Upload X-ray',
    uploadXrayDescription: 'Drag and drop or click to upload a chest X-ray image in JPEG or PNG format.',
    analyzeImageDescription: 'Click the Analyze button and wait for our AI model to process the image.',
    reviewResults: 'Review Results',
    reviewResultsDescription: 'Examine the diagnosis, confidence scores, and recommendations provided by the AI.',
    understandingResults: 'Understanding Results',
    pneumoniaResultExplanation: 'Indicates the AI has detected patterns consistent with pneumonia. Look for cloudy or opaque areas in the lungs on the X-ray.',
    normalResultExplanation: 'Indicates the AI has not detected patterns consistent with pneumonia. Lung fields appear clear on the X-ray.',
    confidenceScoreExplanation: 'Shows how confident the AI is in its diagnosis. Higher percentages indicate greater confidence.',
    importantNotes: 'Important Notes',
    disclaimer: 'Disclaimer:',
    disclaimerDetail: 'This application is designed as a screening tool and not for definitive diagnosis. Always consult healthcare professionals.',
    medicalAdvice: 'Medical Advice:',
    medicalAdviceDetail: 'The results from this tool should not replace professional medical advice, diagnosis, or treatment.',
    dataPrivacy: 'Data Privacy:',
    dataPrivacyDetail: 'Your X-ray images and analysis results are stored securely and used only for the purpose of providing the service.',
    aboutModel: 'About the AI Model',
    modelDescription: 'This application uses a DenseNet121 deep learning model trained on thousands of labeled chest X-ray images to identify patterns associated with pneumonia.',
    modelPerformance: 'The model has been validated on independent test sets and achieves high accuracy, but like all AI systems, it is not perfect and can make errors.',
    modelLimitations: 'The model may not perform as well on images with poor quality, unusual positioning, or in cases of atypical presentation of pneumonia.',
    
    // Footer
    footerCopyright: 'PneumoDetect. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    sourceCode: 'Source Code',
    madeWith: 'Made with',
  },
  vi: {
    // App
    appName: 'PneumoDetect',
    appTitle: 'Công Cụ Phát Hiện Viêm Phổi',
    appDescription: 'Tải lên hình ảnh X-quang ngực để phát hiện viêm phổi bằng mô hình AI tiên tiến của chúng tôi',
    howItWorks: 'Cách Thức Hoạt Động',
    howItWorksDescription: 'Ứng dụng của chúng tôi sử dụng mô hình học sâu DenseNet121 được đào tạo trên hàng nghìn hình ảnh X-quang ngực để phát hiện dấu hiệu viêm phổi với độ chính xác cao.',
    
    // Navigation
    home: 'Trang Chủ',
    history: 'Lịch Sử',
    guide: 'Hướng Dẫn',
    
    // Image Upload
    dragAndDropImage: 'Kéo và thả ảnh X-quang ngực vào đây',
    dropImageHere: 'Thả ảnh vào đây',
    supportedFormats: 'Định dạng hỗ trợ: JPEG, PNG (tối đa 10MB)',
    browseFiles: 'Chọn Tệp',
    analyzeImage: 'Phân Tích Ảnh',
    analyzing: 'Đang phân tích...',
    fileTooLarge: 'Tệp quá lớn. Kích thước tối đa là 10MB.',
    invalidFileType: 'Định dạng tệp không hợp lệ. Vui lòng tải lên ảnh JPEG hoặc PNG.',
    
    // Results
    analysisResults: 'Kết Quả Phân Tích',
    diagnosis: 'Chẩn Đoán',
    pneumonia: 'Viêm Phổi',
    normal: 'Bình Thường',
    pneumoniaDescription: 'Mô hình AI đã phát hiện các mẫu phù hợp với viêm phổi trong ảnh X-quang này.',
    normalDescription: 'Mô hình AI không phát hiện các mẫu phù hợp với viêm phổi trong ảnh X-quang này.',
    confidenceScore: 'Điểm Tin Cậy',
    recommendation: 'Khuyến Nghị',
    pneumoniaRecommendation: 'Tham khảo ý kiến chuyên gia y tế để đánh giá và điều trị thêm.',
    normalRecommendation: 'Không phát hiện dấu hiệu viêm phổi. Vẫn nên kiểm tra sức khỏe định kỳ.',
    analyzeAnother: 'Phân Tích Ảnh Khác',
    download: 'Tải Xuống',
    share: 'Chia Sẻ',
    disclaimer: 'Lưu ý:',
    disclaimerText: 'Công cụ này chỉ mang tính chất thông tin và không thay thế cho lời khuyên, chẩn đoán hoặc điều trị y tế chuyên nghiệp.',
    
    // History
    analysisHistory: 'Lịch Sử Phân Tích',
    searchPlaceholder: 'Tìm kiếm theo ID',
    all: 'Tất Cả',
    noHistory: 'Không Có Lịch Sử Phân Tích',
    startAnalyzing: 'Bắt đầu phân tích ảnh X-quang để tạo lịch sử của bạn.',
    noMatchingResults: 'Không tìm thấy kết quả phù hợp',
    tryDifferentSearch: 'Thử từ khóa hoặc bộ lọc khác.',
    hideDetails: 'Ẩn Chi Tiết',
    showDetails: 'Hiển Thị Chi Tiết',
    viewFullReport: 'Xem Báo Cáo Đầy Đủ',
    
    // Confidence
    lowConfidence: 'Độ Tin Cậy Thấp',
    highConfidence: 'Độ Tin Cậy Cao',
    
    // Guide
    userGuide: 'Hướng Dẫn Sử Dụng',
    howToUse: 'Cách Sử Dụng',
    uploadXray: 'Tải Lên X-quang',
    uploadXrayDescription: 'Kéo và thả hoặc nhấp để tải lên ảnh X-quang ngực ở định dạng JPEG hoặc PNG.',
    analyzeImageDescription: 'Nhấp vào nút Phân tích và đợi mô hình AI của chúng tôi xử lý hình ảnh.',
    reviewResults: 'Xem Xét Kết Quả',
    reviewResultsDescription: 'Kiểm tra chẩn đoán, điểm tin cậy và khuyến nghị do AI cung cấp.',
    understandingResults: 'Hiểu Kết Quả',
    pneumoniaResultExplanation: 'Cho biết AI đã phát hiện các mẫu phù hợp với viêm phổi. Tìm các vùng mờ đục trong phổi trên X-quang.',
    normalResultExplanation: 'Cho biết AI không phát hiện các mẫu phù hợp với viêm phổi. Trường phổi trông rõ ràng trên X-quang.',
    confidenceScoreExplanation: 'Hiển thị mức độ tin cậy của AI trong chẩn đoán. Tỷ lệ phần trăm cao hơn cho thấy độ tin cậy cao hơn.',
    importantNotes: 'Lưu Ý Quan Trọng',
    disclaimer: 'Miễn Trừ Trách Nhiệm:',
    disclaimerDetail: 'Ứng dụng này được thiết kế như một công cụ sàng lọc và không dùng để chẩn đoán chính thức. Luôn tham khảo ý kiến chuyên gia y tế.',
    medicalAdvice: 'Lời Khuyên Y Tế:',
    medicalAdviceDetail: 'Kết quả từ công cụ này không nên thay thế cho lời khuyên, chẩn đoán hoặc điều trị y tế chuyên nghiệp.',
    dataPrivacy: 'Bảo Mật Dữ Liệu:',
    dataPrivacyDetail: 'Hình ảnh X-quang và kết quả phân tích của bạn được lưu trữ an toàn và chỉ được sử dụng để cung cấp dịch vụ.',
    aboutModel: 'Về Mô Hình AI',
    modelDescription: 'Ứng dụng này sử dụng mô hình học sâu DenseNet121 được đào tạo trên hàng nghìn hình ảnh X-quang ngực đã được gắn nhãn để xác định các mẫu liên quan đến viêm phổi.',
    modelPerformance: 'Mô hình đã được xác nhận trên các bộ kiểm tra độc lập và đạt độ chính xác cao, nhưng giống như tất cả các hệ thống AI, nó không hoàn hảo và có thể mắc lỗi.',
    modelLimitations: 'Mô hình có thể không hoạt động tốt trên hình ảnh chất lượng kém, vị trí bất thường, hoặc trong trường hợp biểu hiện không điển hình của viêm phổi.',
    
    // Footer
    footerCopyright: 'PneumoDetect. Đã đăng ký bản quyền.',
    privacyPolicy: 'Chính Sách Bảo Mật',
    termsOfService: 'Điều Khoản Dịch Vụ',
    sourceCode: 'Mã Nguồn',
    madeWith: 'Được tạo với',
  },
};