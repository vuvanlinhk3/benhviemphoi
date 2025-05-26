// import { AnalysisResult } from '../contexts/AppContext';
// import { v4 as uuidv4 } from 'uuid';

// // This is a mock API service since we don't have a real backend yet
// // In a real application, this would be replaced with actual API calls

// export const analyzeImage = async (image: File): Promise<AnalysisResult> => {
//   // Simulate API call delay
//   await new Promise(resolve => setTimeout(resolve, 1500));
  
//   // Generate a random result for demonstration purposes
//   // In a real app, this would be a real API call to the DenseNet121 model
//   const isPneumonia = Math.random() > 0.5;
  
//   // Generate random probabilities that favor the predicted class
//   let pneumoniaProb = isPneumonia ? 0.7 + (Math.random() * 0.25) : 0.05 + (Math.random() * 0.25);
//   let normalProb = 1 - pneumoniaProb;
  
//   // Ensure probabilities sum to 1
//   const total = pneumoniaProb + normalProb;
//   pneumoniaProb = pneumoniaProb / total;
//   normalProb = normalProb / total;
  
//   return {
//     id: uuidv4(),
//     prediction: isPneumonia ? 'Pneumonia' : 'Normal',
//     probabilities: {
//       pneumonia: pneumoniaProb,
//       normal: normalProb,
//     },
//     timestamp: new Date().toISOString(),
//   };
// };

// export const getAnalysisHistory = async (): Promise<AnalysisResult[]> => {
//   // Simulate API call delay
//   await new Promise(resolve => setTimeout(resolve, 500));
  
//   // In a real application, this would fetch from a real API
//   return [];
// };

// ----------------------------------------
export const analyzeImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    // Validate response structure
    if (!data.result || typeof data.pneumonia_prob !== 'number') {
      throw new Error('Invalid API response structure');
    }

    return {
      result: data.result,
      pneumonia_prob: data.pneumonia_prob,
      normal_prob: data.normal_prob,
      analyzed_at: data.timestamp || new Date().toISOString()
    };

  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export const getAnalysisHistory = async () => {
  try {
    const response = await fetch('http://localhost:5000/history');
    
    if (!response.ok) throw new Error(`Lỗi HTTP! Status: ${response.status}`);

    const data = await response.json();
    console.log(data)
    return data.map((item: any) => ({
      id: item.id.toString(),
      prediction: item.result,
      probabilities: {
        pneumonia: item.pneumonia_prob,
        normal: item.normal_prob
      },
      timestamp: item.analyzed_at
    }));

  } catch (error) {
    console.error('Lỗi tải lịch sử:', error);
    throw error;
  }
};