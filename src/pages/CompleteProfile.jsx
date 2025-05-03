// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Logo from '../assets/Logo.png';

// const CompleteProfile = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     full_name: '',
//     email: '',
//     age: '',
//     grade_or_education: '',
//     career_aspiration: '',
//     strengths: '',
//     weaknesses: '',
//     hobbies_or_interests: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Clear error for this field when user types
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: null
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Validate each field
//     if (!formData.full_name.trim()) {
//       newErrors.full_name = 'Full name is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.age) {
//       newErrors.age = 'Age is required';
//     } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
//       newErrors.age = 'Age must be a positive number';
//     }

//     if (!formData.grade_or_education.trim()) {
//       newErrors.grade_or_education = 'Education is required';
//     }

//     if (!formData.career_aspiration.trim()) {
//       newErrors.career_aspiration = 'Career aspiration is required';
//     }

//     if (!formData.strengths.trim()) {
//       newErrors.strengths = 'Strengths are required';
//     }

//     if (!formData.weaknesses.trim()) {
//       newErrors.weaknesses = 'Weaknesses are required';
//     }

//     if (!formData.hobbies_or_interests.trim()) {
//       newErrors.hobbies_or_interests = 'Hobbies or interests are required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/profile/complete/', {
//         full_name: formData.full_name,
//         email: formData.email,
//         age: parseInt(formData.age),
//         grade_or_education: formData.grade_or_education,
//         career_aspiration: formData.career_aspiration,
//         strengths: formData.strengths,
//         weaknesses: formData.weaknesses,
//         hobbies_or_interests: formData.hobbies_or_interests
//       });

//       console.log('Profile completed successfully:', response.data);
//       alert('Profile completed successfully!');

//       // Navigate to dashboard after successful profile completion
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Profile completion failed:', error);

//       // Handle error responses
//       if (error.response && error.response.data && error.response.data.error) {
//         alert(`Error: ${error.response.data.error}`);
//       } else {
//         alert('Profile completion failed. Please try again.');
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className='w-full h-auto p-4 bg-white shadow-sm'>
//         <div className='flex flex-row justify-between mb-2'>
//           <div className='flex justify-center items-center'>
//             <img src={Logo} alt="Logo" width={200} height={200} />
//           </div>
//           <div className='text-black'>
//             <ul className='flex flex-row gap-6 justify-center items-center'>
//               <li className="cursor-pointer hover:text-blue-500">Home</li>
//               <li className="cursor-pointer hover:text-blue-500">Explore</li>
//               <li className="cursor-pointer hover:text-blue-500">Path</li>
//               <li className='border rounded-full bg-blue-400 p-1 text-white cursor-pointer'>
//                 <img src={Logo} alt="User" width={10} height={10} />
//               </li>
//             </ul>
//           </div>
//         </div>
//         <hr className='border-gray-200' />
//       </div>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto mt-10 mb-16 bg-white shadow-md rounded-lg p-8">
//         <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Complete Your Profile</h1>
//         <p className="text-gray-500 text-center mb-8">
//           Let us understand you better to provide personalized career recommendations
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Full Name */}
//             <div>
//               <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="full_name"
//                 name="full_name"
//                 value={formData.full_name}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.full_name ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your full name"
//               />
//               {errors.full_name && (
//                 <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.email ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your email"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             {/* Age */}
//             <div>
//               <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
//                 Age
//               </label>
//               <input
//                 type="number"
//                 id="age"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.age ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your age"
//               />
//               {errors.age && (
//                 <p className="mt-1 text-sm text-red-600">{errors.age}</p>
//               )}
//             </div>

//             {/* Education */}
//             <div>
//               <label htmlFor="grade_or_education" className="block text-sm font-medium text-gray-700 mb-1">
//                 Grade or Education
//               </label>
//               <input
//                 type="text"
//                 id="grade_or_education"
//                 name="grade_or_education"
//                 value={formData.grade_or_education}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.grade_or_education ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="E.g., BE in Computer Science"
//               />
//               {errors.grade_or_education && (
//                 <p className="mt-1 text-sm text-red-600">{errors.grade_or_education}</p>
//               )}
//             </div>
//           </div>

//           {/* Career Aspiration */}
//           <div>
//             <label htmlFor="career_aspiration" className="block text-sm font-medium text-gray-700 mb-1">
//               Career Aspiration
//             </label>
//             <input
//               type="text"
//               id="career_aspiration"
//               name="career_aspiration"
//               value={formData.career_aspiration}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.career_aspiration ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="E.g., Software Engineer, Data Scientist"
//             />
//             {errors.career_aspiration && (
//               <p className="mt-1 text-sm text-red-600">{errors.career_aspiration}</p>
//             )}
//           </div>

//           {/* Strengths */}
//           <div>
//             <label htmlFor="strengths" className="block text-sm font-medium text-gray-700 mb-1">
//               Strengths
//             </label>
//             <textarea
//               id="strengths"
//               name="strengths"
//               value={formData.strengths}
//               onChange={handleChange}
//               rows="3"
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.strengths ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="E.g., Analytical thinking, problem-solving, communication skills"
//             ></textarea>
//             {errors.strengths && (
//               <p className="mt-1 text-sm text-red-600">{errors.strengths}</p>
//             )}
//           </div>

//           {/* Weaknesses */}
//           <div>
//             <label htmlFor="weaknesses" className="block text-sm font-medium text-gray-700 mb-1">
//               Weaknesses
//             </label>
//             <textarea
//               id="weaknesses"
//               name="weaknesses"
//               value={formData.weaknesses}
//               onChange={handleChange}
//               rows="3"
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.weaknesses ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="E.g., Public speaking, time management"
//             ></textarea>
//             {errors.weaknesses && (
//               <p className="mt-1 text-sm text-red-600">{errors.weaknesses}</p>
//             )}
//           </div>

//           {/* Hobbies */}
//           <div>
//             <label htmlFor="hobbies_or_interests" className="block text-sm font-medium text-gray-700 mb-1">
//               Hobbies or Interests
//             </label>
//             <textarea
//               id="hobbies_or_interests"
//               name="hobbies_or_interests"
//               value={formData.hobbies_or_interests}
//               onChange={handleChange}
//               rows="3"
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.hobbies_or_interests ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="E.g., Web development, reading, automation"
//             ></textarea>
//             {errors.hobbies_or_interests && (
//               <p className="mt-1 text-sm text-red-600">{errors.hobbies_or_interests}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center mt-8">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${
//                 isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
//               }`}
//             >
//               {isSubmitting ? 'Submitting...' : 'Complete Profile'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CompleteProfile;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Logo from '../assets/Logo.png';
// import { useSelector } from 'react-redux'; // Import useSelector hook

// const CompleteProfile = () => {
//   const navigate = useNavigate();
//   // Get user ID from Redux store
//   const userId = useSelector(state => state.auth.userId); // Adjust the selector based on your Redux structure

//   const [formData, setFormData] = useState({
//     full_name: '',
//     email: '',
//     age: '',
//     grade_or_education: '',
//     career_aspiration: '',
//     strengths: '',
//     weaknesses: '',
//     hobbies_or_interests: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Clear error for this field when user types
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: null
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Validate each field
//     if (!formData.full_name.trim()) {
//       newErrors.full_name = 'Full name is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.age) {
//       newErrors.age = 'Age is required';
//     } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
//       newErrors.age = 'Age must be a positive number';
//     }

//     if (!formData.grade_or_education.trim()) {
//       newErrors.grade_or_education = 'Education is required';
//     }

//     if (!formData.career_aspiration.trim()) {
//       newErrors.career_aspiration = 'Career aspiration is required';
//     }

//     if (!formData.strengths.trim()) {
//       newErrors.strengths = 'Strengths are required';
//     }

//     if (!formData.weaknesses.trim()) {
//       newErrors.weaknesses = 'Weaknesses are required';
//     }

//     if (!formData.hobbies_or_interests.trim()) {
//       newErrors.hobbies_or_interests = 'Hobbies or interests are required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Configure request with headers containing user ID
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'user-id': userId // Send user ID in the header
//         }
//       };

//       const response = await axios.post(
//         'http://127.0.0.1:8000/profile/complete/', 
//         {
//           full_name: formData.full_name,
//           email: formData.email,
//           age: parseInt(formData.age),
//           grade_or_education: formData.grade_or_education,
//           career_aspiration: formData.career_aspiration,
//           strengths: formData.strengths,
//           weaknesses: formData.weaknesses,
//           hobbies_or_interests: formData.hobbies_or_interests
//         },
//         config
//       );

//       console.log('Profile completed successfully:', response.data);
//       alert('Profile completed successfully!');

//       // Navigate to dashboard after successful profile completion
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Profile completion failed:', error);

//       // Handle error responses
//       if (error.response && error.response.data && error.response.data.error) {
//         alert(`Error: ${error.response.data.error}`);
//       } else {
//         alert('Profile completion failed. Please try again.');
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className='w-full h-auto p-4 bg-white shadow-sm'>
//         <div className='flex flex-row justify-between mb-2'>
//           <div className='flex justify-center items-center'>
//             <img src={Logo} alt="Logo" width={200} height={200} />
//           </div>
//           <div className='text-black'>
//             <ul className='flex flex-row gap-6 justify-center items-center'>
//               <li className="cursor-pointer hover:text-blue-500">Home</li>
//               <li className="cursor-pointer hover:text-blue-500">Explore</li>
//               <li className="cursor-pointer hover:text-blue-500">Path</li>
//               <li className='border rounded-full bg-blue-400 p-1 text-white cursor-pointer'>
//                 <img src={Logo} alt="User" width={10} height={10} />
//               </li>
//             </ul>
//           </div>
//         </div>
//         <hr className='border-gray-200' />
//       </div>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto mt-10 mb-16 bg-white shadow-md rounded-lg p-8">
//         <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Complete Your Profile</h1>
//         <p className="text-gray-500 text-center mb-8">
//           Let us understand you better to provide personalized career recommendations
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Full Name */}
//             <div>
//               <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="full_name"
//                 name="full_name"
//                 value={formData.full_name}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.full_name ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your full name"
//               />
//               {errors.full_name && (
//                 <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.email ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your email"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             {/* Age */}
//             <div>
//               <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
//                 Age
//               </label>
//               <input
//                 type="number"
//                 id="age"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.age ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your age"
//               />
//               {errors.age && (
//                 <p className="mt-1 text-sm text-red-600">{errors.age}</p>
//               )}
//             </div>

//             {/* Education */}
//             <div>
//               <label htmlFor="grade_or_education" className="block text-sm font-medium text-gray-700 mb-1">
//                 Grade or Education
//               </label>
//               <input
//                 type="text"
//                 id="grade_or_education"
//                 name="grade_or_education"
//                 value={formData.grade_or_education}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.grade_or_education ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="E.g., BE in Computer Science"
//               />
//               {errors.grade_or_education && (
//                 <p className="mt-1 text-sm text-red-600">{errors.grade_or_education}</p>
//               )}
//             </div>
//           </div>

//           {/* Career Aspiration */}
//           <div>
//             <label htmlFor="career_aspiration" className="block text-sm font-medium text-gray-700 mb-1">
//               Career Aspiration
//             </label>
//             <input
//               type="text"
//               id="career_aspiration"
//               name="career_aspiration"
//               value={formData.career_aspiration}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.career_aspiration ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="E.g., Software Engineer, Data Scientist"
//             />
//             {errors.career_aspiration && (
//               <p className="mt-1 text-sm text-red-600">{errors.career_aspiration}</p>
//             )}
//           </div>

//           {/* Strengths */}
//           <div>
//             <label htmlFor="strengths" className="block text-sm font-medium text-gray-700 mb-1">
//               Strengths
//             </label>
//             <textarea
//               id="strengths"
//               name="strengths"
//               value={formData.strengths}
//               onChange={handleChange}
//               rows="3"
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.strengths ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="E.g., Analytical thinking, problem-solving, communication skills"
//             ></textarea>
//             {errors.strengths && (
//               <p className="mt-1 text-sm text-red-600">{errors.strengths}</p>
//             )}
//           </div>

//           {/* Weaknesses */}
//           <div>
//             <label htmlFor="weaknesses" className="block text-sm font-medium text-gray-700 mb-1">
//               Weaknesses
//             </label>
//             <textarea
//               id="weaknesses"
//               name="weaknesses"
//               value={formData.weaknesses}
//               onChange={handleChange}
//               rows="3"
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.weaknesses ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="E.g., Public speaking, time management"
//             ></textarea>
//             {errors.weaknesses && (
//               <p className="mt-1 text-sm text-red-600">{errors.weaknesses}</p>
//             )}
//           </div>

//           {/* Hobbies */}
//           <div>
//             <label htmlFor="hobbies_or_interests" className="block text-sm font-medium text-gray-700 mb-1">
//               Hobbies or Interests
//             </label>
//             <textarea
//               id="hobbies_or_interests"
//               name="hobbies_or_interests"
//               value={formData.hobbies_or_interests}
//               onChange={handleChange}
//               rows="3"
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.hobbies_or_interests ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="E.g., Web development, reading, automation"
//             ></textarea>
//             {errors.hobbies_or_interests && (
//               <p className="mt-1 text-sm text-red-600">{errors.hobbies_or_interests}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center mt-8">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${
//                 isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
//               }`}
//             >
//               {isSubmitting ? 'Submitting...' : 'Complete Profile'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CompleteProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../assets/Logo.png';

const CompleteProfile = () => {
    const navigate = useNavigate();

    // Get user data from Redux store - using the same pattern as LikertTest
    const userData = useSelector((state) => state.user.userData);

    // Add effect for auth check - similar to LikertTest
    useEffect(() => {
        if (!userData || !userData.user_id) {
            navigate('/complete-profile');
        }
    }, [userData, navigate]);

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        age: '',
        grade_or_education: '',
        career_aspiration: '',
        strengths: '',
        weaknesses: '',
        hobbies_or_interests: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate each field
        if (!formData.full_name.trim()) {
            newErrors.full_name = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.age) {
            newErrors.age = 'Age is required';
        } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
            newErrors.age = 'Age must be a positive number';
        }

        if (!formData.grade_or_education.trim()) {
            newErrors.grade_or_education = 'Education is required';
        }

        if (!formData.career_aspiration.trim()) {
            newErrors.career_aspiration = 'Career aspiration is required';
        }

        if (!formData.strengths.trim()) {
            newErrors.strengths = 'Strengths are required';
        }

        if (!formData.weaknesses.trim()) {
            newErrors.weaknesses = 'Weaknesses are required';
        }

        if (!formData.hobbies_or_interests.trim()) {
            newErrors.hobbies_or_interests = 'Hobbies or interests are required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // CSRF token function - like in LikertTest
    const getCSRFToken = () => {
        return document.cookie
            .split('; ')
            .find((row) => row.startsWith('csrftoken='))
            ?.split('=')[1];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Use the same header approach as LikertTest
            const response = await fetch('http://127.0.0.1:8000/profile/complete/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken(),
                    'user-id': userData.user_id,
                },
                credentials: 'include',
                body: JSON.stringify({
                    full_name: formData.full_name,
                    email: formData.email,
                    age: parseInt(formData.age),
                    grade_or_education: formData.grade_or_education,
                    career_aspiration: formData.career_aspiration,
                    strengths: formData.strengths,
                    weaknesses: formData.weaknesses,
                    hobbies_or_interests: formData.hobbies_or_interests
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error: ${errorText}`);
            }

            const result = await response.json();
            console.log('Profile completed successfully:', result);
            alert('Profile completed successfully!');

            // Navigate to dashboard after successful profile completion
            navigate('/dashboard');
        } catch (error) {
            console.error('Profile completion failed:', error);

            // Handle error responses
            alert('Profile completion failed: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className='w-full h-auto p-4 bg-white shadow-sm'>
                <div className='flex flex-row justify-between mb-2'>
                    <div className='flex justify-center items-center'>
                        <img src={Logo} alt="Logo" width={200} height={200} />
                    </div>
                    <div className='text-black'>
                        <ul className='flex flex-row gap-6 justify-center items-center'>
                            <li className="cursor-pointer hover:text-blue-500">Home</li>
                            <li className="cursor-pointer hover:text-blue-500">Explore</li>
                            <li className="cursor-pointer hover:text-blue-500">Path</li>
                            <li className='border rounded-full bg-blue-400 p-1 text-white cursor-pointer'>
                                <img src={Logo} alt="User" width={10} height={10} />
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className='border-gray-200' />
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto mt-10 mb-16 bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Complete Your Profile</h1>
                <p className="text-gray-500 text-center mb-8">
                    Let us understand you better to provide personalized career recommendations
                </p>

                {userData && userData.user_id ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="full_name"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.full_name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your full name"
                                />
                                {errors.full_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Age */}
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.age ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your age"
                                />
                                {errors.age && (
                                    <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                                )}
                            </div>

                            {/* Education */}
                            <div>
                                <label htmlFor="grade_or_education" className="block text-sm font-medium text-gray-700 mb-1">
                                    Grade or Education
                                </label>
                                <input
                                    type="text"
                                    id="grade_or_education"
                                    name="grade_or_education"
                                    value={formData.grade_or_education}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.grade_or_education ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="E.g., BE in Computer Science"
                                />
                                {errors.grade_or_education && (
                                    <p className="mt-1 text-sm text-red-600">{errors.grade_or_education}</p>
                                )}
                            </div>
                        </div>

                        {/* Career Aspiration */}
                        <div>
                            <label htmlFor="career_aspiration" className="block text-sm font-medium text-gray-700 mb-1">
                                Career Aspiration
                            </label>
                            <input
                                type="text"
                                id="career_aspiration"
                                name="career_aspiration"
                                value={formData.career_aspiration}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.career_aspiration ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="E.g., Software Engineer, Data Scientist"
                            />
                            {errors.career_aspiration && (
                                <p className="mt-1 text-sm text-red-600">{errors.career_aspiration}</p>
                            )}
                        </div>

                        {/* Strengths */}
                        <div>
                            <label htmlFor="strengths" className="block text-sm font-medium text-gray-700 mb-1">
                                Strengths
                            </label>
                            <textarea
                                id="strengths"
                                name="strengths"
                                value={formData.strengths}
                                onChange={handleChange}
                                rows="3"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.strengths ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="E.g., Analytical thinking, problem-solving, communication skills"
                            ></textarea>
                            {errors.strengths && (
                                <p className="mt-1 text-sm text-red-600">{errors.strengths}</p>
                            )}
                        </div>

                        {/* Weaknesses */}
                        <div>
                            <label htmlFor="weaknesses" className="block text-sm font-medium text-gray-700 mb-1">
                                Weaknesses
                            </label>
                            <textarea
                                id="weaknesses"
                                name="weaknesses"
                                value={formData.weaknesses}
                                onChange={handleChange}
                                rows="3"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.weaknesses ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="E.g., Public speaking, time management"
                            ></textarea>
                            {errors.weaknesses && (
                                <p className="mt-1 text-sm text-red-600">{errors.weaknesses}</p>
                            )}
                        </div>

                        {/* Hobbies */}
                        <div>
                            <label htmlFor="hobbies_or_interests" className="block text-sm font-medium text-gray-700 mb-1">
                                Hobbies or Interests
                            </label>
                            <textarea
                                id="hobbies_or_interests"
                                name="hobbies_or_interests"
                                value={formData.hobbies_or_interests}
                                onChange={handleChange}
                                rows="3"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.hobbies_or_interests ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="E.g., Web development, reading, automation"
                            ></textarea>
                            {errors.hobbies_or_interests && (
                                <p className="mt-1 text-sm text-red-600">{errors.hobbies_or_interests}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Complete Profile'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-lg text-red-500">Please log in to complete your profile</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg"
                        >
                            Go to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompleteProfile; 