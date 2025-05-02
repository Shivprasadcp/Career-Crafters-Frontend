import React from 'react';

const MBTIResultCard = ({ mbtiResults }) => {
  // Check if there are no results
  if (!mbtiResults) {
    return (
      <div className="border-2 rounded-lg border-[#E0E0E0] p-4 shadow-sm bg-white h-full">
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">MBTI Personality Type</h2>
        <p className="text-center text-gray-500 py-12">Complete the MBTI test to see your personality type.</p>
      </div>
    );
  }

  // Extract data from the MBTI results structure based on the console output format
  const mbtiType = mbtiResults.mbti_type;
  const suggestedCareers = mbtiResults.suggested_careers || [];

  return (
    <div className="border-2 rounded-lg border-[#E0E0E0] p-6 shadow-sm bg-white h-full">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">MBTI Personality Type</h2>
      
      <div className="flex flex-col items-center mb-6">
        <div className="text-3xl font-bold text-blue-600 mb-2">{mbtiType}</div>
        <p className="text-sm text-gray-600 italic max-w-md text-center">
          {getMBTIDescription(mbtiType)}
        </p>
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Suggested Careers</h3>
        <div className="grid grid-cols-2 gap-2">
          {suggestedCareers.map((career, index) => (
            <div 
              key={index}
              className="bg-blue-50 px-3 py-2 rounded-md text-blue-700 text-sm hover:bg-blue-100 transition-colors"
            >
              {career}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to provide descriptions based on MBTI type
const getMBTIDescription = (type) => {
  const descriptions = {
    'ESTP': 'Energetic, action-oriented, and pragmatic. ESTPs are adaptable problem-solvers who thrive in dynamic environments.',
    'ESTJ': 'Organized, practical, and task-oriented. ESTJs excel at implementing structured processes and maintaining order.',
    'ESFP': 'Spontaneous, enthusiastic, and people-oriented. ESFPs bring energy and fun to social situations.',
    'ESFJ': 'Caring, social, and organized. ESFJs are dependable team players who value harmony and service to others.',
    'ENTP': 'Innovative, strategic, and intellectually curious. ENTPs are creative problem-solvers who enjoy theoretical challenges.',
    'ENTJ': 'Strategic, decisive, and ambitious. ENTJs are natural leaders who drive efficiency and achievement.',
    'ENFP': 'Imaginative, enthusiastic, and people-focused. ENFPs inspire others with their creativity and passion.',
    'ENFJ': 'Empathetic, charismatic, and dedicated. ENFJs excel at motivating others toward collective goals.',
    'ISTP': 'Analytical, practical, and independent. ISTPs are skilled troubleshooters who excel in technical fields.',
    'ISTJ': 'Reliable, detail-oriented, and systematic. ISTJs are dedicated to creating and maintaining order.',
    'ISFP': 'Artistic, sensitive, and practical. ISFPs express themselves through actions rather than words.',
    'ISFJ': 'Considerate, loyal, and traditional. ISFJs work diligently to meet the needs of others.',
    'INTP': 'Logical, innovative, and analytical. INTPs enjoy developing comprehensive theories and models.',
    'INTJ': 'Strategic, independent, and insightful. INTJs excel at developing systems and long-term plans.',
    'INFP': 'Idealistic, empathetic, and authentic. INFPs are driven by their core values and desire to help others.',
    'INFJ': 'Insightful, principled, and purposeful. INFJs are guided by their vision for humanity.'
  };
  
  return descriptions[type] || 'A unique personality type with specific strengths and preferences.';
};

export default MBTIResultCard;