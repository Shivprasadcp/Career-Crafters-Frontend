// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Logo from '../assets/Logo.png';

// const RecommendationPage = () => {
//   const navigate = useNavigate();
//   const recommendation = useSelector(state => state.recommendation.recommendation);
//   const loading = useSelector(state => state.recommendation.loading);
//   const error = useSelector(state => state.recommendation.error);
  
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl font-semibold">Loading career recommendations...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <div className="text-xl font-semibold text-red-500 mb-4">Error loading recommendations</div>
//         <div className="text-gray-600">{error}</div>
//         <button 
//           className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={() => navigate('/dashboard')}
//         >
//           Return to Dashboard
//         </button>
//       </div>
//     );
//   }

//   if (!recommendation) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <div className="text-xl font-semibold">No recommendations available</div>
//         <button 
//           className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={() => navigate('/dashboard')}
//         >
//           Return to Dashboard
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="w-full bg-white shadow-sm p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <img src={Logo} alt="Logo" className="h-12" />
//           <button 
//             className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
//             onClick={() => navigate('/dashboard')}
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto py-8 px-4">
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//             Your Career Recommendation
//           </h1>
          
//           {recommendation.mbti_type && (
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold mb-2">Your Personality Type</h2>
//               <div className="flex justify-center">
//                 <span className="bg-purple-100 text-purple-800 text-lg font-medium px-6 py-2 rounded-full">
//                   {recommendation.mbti_type}
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Recommended Careers */}
//           {recommendation.recommended_careers && recommendation.recommended_careers.length > 0 && (
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold mb-4">Recommended Careers</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {recommendation.recommended_careers.map((career, index) => (
//                   <div 
//                     key={index}
//                     className="bg-blue-50 border border-blue-100 rounded-lg p-4 hover:bg-blue-100 transition-colors"
//                   >
//                     <p className="text-center font-medium text-blue-800">{career}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* AI Recommendation */}
//           {recommendation.ai_recommendation && (
//             <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
//               <h2 className="text-xl font-semibold mb-4">Detailed Career Analysis</h2>
//               <div className="prose max-w-none">
//                 {/* Format the text with proper line breaks */}
//                 {recommendation.ai_recommendation.split('\n').map((line, index) => (
//                   <p key={index} className={line.trim().startsWith('#') ? 'font-bold mt-4' : 'mb-2'}>
//                     {line}
//                   </p>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecommendationPage;

import React from 'react';
 import { useSelector } from 'react-redux';
 import { useNavigate } from 'react-router-dom';
 import Logo from '../assets/Logo.png';
 
 const RecommendationPage = () => {
   const navigate = useNavigate();
   const recommendation = useSelector(state => state.recommendation.recommendation);
   const loading = useSelector(state => state.recommendation.loading);
   const error = useSelector(state => state.recommendation.error);
   
   if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center">
         <div className="text-xl font-semibold">Loading career recommendations...</div>
       </div>
     );
   }
 
   if (error) {
     return (
       <div className="min-h-screen flex flex-col items-center justify-center">
         <div className="text-xl font-semibold text-red-500 mb-4">Error loading recommendations</div>
         <div className="text-gray-600">{error}</div>
         <button 
           className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           onClick={() => navigate('/dashboard')}
         >
           Return to Dashboard
         </button>
       </div>
     );
   }
 
   if (!recommendation) {
     return (
       <div className="min-h-screen flex flex-col items-center justify-center">
         <div className="text-xl font-semibold">No recommendations available</div>
         <button 
           className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           onClick={() => navigate('/dashboard')}
         >
           Return to Dashboard
         </button>
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-gray-50">
       {/* Header */}
       <div className="w-full bg-white shadow-sm p-4">
         <div className="container mx-auto flex justify-between items-center">
           <img src={Logo} alt="Logo" className="h-12" />
           <button 
             className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
             onClick={() => navigate('/dashboard')}
           >
             Back to Dashboard
           </button>
         </div>
       </div>
 
       {/* Main Content */}
       <div className="container mx-auto py-8 px-4">
         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
           <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
             Your Career Recommendation
           </h1>
           
           {recommendation.mbti_type && (
             <div className="mb-6">
               <h2 className="text-xl font-semibold mb-2">Your Personality Type</h2>
               <div className="flex justify-center">
                 <span className="bg-purple-100 text-purple-800 text-lg font-medium px-6 py-2 rounded-full">
                   {recommendation.mbti_type}
                 </span>
               </div>
             </div>
           )}
 
           {/* Recommended Careers */}
           {recommendation.recommended_careers && recommendation.recommended_careers.length > 0 && (
             <div className="mb-8">
               <h2 className="text-xl font-semibold mb-4">Recommended Careers</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {recommendation.recommended_careers.map((career, index) => (
                   <div 
                     key={index}
                     className="bg-blue-50 border border-blue-100 rounded-lg p-4 hover:bg-blue-100 transition-colors"
                   >
                     <p className="text-center font-medium text-blue-800">{career}</p>
                   </div>
                 ))}
               </div>
             </div>
           )}
 
           {/* AI Recommendation */}
           {recommendation.ai_recommendation && (
             <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
               <h2 className="text-xl font-semibold mb-4">Detailed Career Analysis</h2>
               <div className="prose max-w-none">
                 {/* Format the text with proper line breaks */}
                 {recommendation.ai_recommendation.split('\n').map((line, index) => (
                   <p key={index} className={line.trim().startsWith('#') ? 'font-bold mt-4' : 'mb-2'}>
                     {line}
                   </p>
                 ))}
               </div>
             </div>
           )}
         </div>
       </div>
     </div>
   );
 };
 
 export default RecommendationPage;