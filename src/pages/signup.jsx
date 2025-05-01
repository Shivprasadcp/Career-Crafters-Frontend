// import React from 'react';
// import Logo from '../assets/Logo.png'

// const signup = () => {
//   return (
//     <div className=' w-full h-auto p-4 '>
//       <div className='flex flex-row justify-between mb-2'>
//         <div className=' flex justify-center items-center '>
//           <img src={Logo} alt="" width={200} height={200} />
//         </div>
//       </div>
//       <hr className='border-gray-200 ' />
//       <div className='flex flex-col justify-center items-center'>

//         <div className='w-3/4 flex flex-col justify-center '>
//           <div className='flex justify-center mt-10 '>
//             <h2 className='font-bold'>Get Started</h2>
//           </div>
//           <div className='flex flex-col gap-4 '>
//             <div>
//               <h2 className='font-medium'>Full name</h2>
//               <input type="text" className=' p-2 w-1/2 border text-[#4F7A94] border-gray-400 rounded-md focus:outline-none focus:ring-0 focus:border-b-green-400' />
//             </div>
//             <div>
//               <h2 className='font-medium'>Username</h2>
//               <input type="text" className=' p-2 w-1/2 border text-[#4F7A94] border-gray-400  rounded-md focus:outline-none focus:ring-0 focus:border-b-green-400' />
//             </div>
//             <div>
//               <h2 className='font-medium'>Password</h2>
//               <input type="text" className=' p-2 w-1/2 border text-[#4F7A94] border-gray-400  rounded-md focus:outline-none focus:ring-0 focus:border-b-green-400' />
//             </div>
//             <div>
//               <h2 className='font-medium'>Email</h2>
//               <input type="text" className='p-2 w-1/2  border text-[#4F7A94] border-gray-400  rounded-md focus:outline-none focus:ring-0 focus:border-b-green-400' />
//             </div>
//             <div>
//               <h2 className='font-medium'>Age</h2>
//               <input type="text" className=' p-2 w-1/2 border text-[#4F7A94] border-gray-400 rounded-md focus:outline-none focus:ring-0 focus:border-b-green-400' />
//             </div>
//           </div>

//           <div className='flex flex-col gap-2 mt-4'>
//             <label className="flex font-medium items-center space-x-2 p-2  border border-gray-400 rounded-md focus:outline-none">
//               <input type="radio" name="option" value="option1" className="accent-blue-700" />
//               <span>7th grade</span>
//             </label>
//             <label className="flex font-medium  items-center space-x-2 p-2  border border-gray-400 rounded-md focus:outline-none">
//               <input type="radio" name="option" value="option1" className="accent-blue-700" />
//               <span>8th grade</span>
//             </label>
//             <label className="flex font-medium  items-center space-x-2 p-2  border border-gray-400 rounded-md focus:outline-none">
//               <input type="radio" name="option" value="option1" className="accent-blue-700" />
//               <span>9th grade</span>
//             </label>
//             <label className="flex font-medium  items-center space-x-2 p-2  border border-gray-400 rounded-md focus:outline-none">
//               <input type="radio" name="option" value="option1" className="accent-blue-700" />
//               <span>10th grade</span>
//             </label>
//             <label className="flex font-medium  items-center space-x-2 p-2  border border-gray-400 rounded-md focus:outline-none">
//               <input type="radio" name="option" value="option1" className="accent-blue-700" />
//               <span>11th grade</span>
//             </label>
//             <label className="flex font-medium  items-center space-x-2 p-2  border border-gray-400 rounded-md focus:outline-none">
//               <input type="radio" name="option" value="option1" className="accent-blue-700 " />
//               <span>12th grade</span>
//             </label>

//           </div>

//           <div className='mt-8 mb-4'>
//             <button className='p-2 w-1/2 rounded-lg  bg-[#2B99E3] text-white'> Register</button>
//           </div>
//           <p className='text-center text-[#4F7A94]'>By clicking 'Register' you agree to our Terms and Privacy Policy</p>
//           <div className='mt-4'>
//             <h2 className='font-bold mb-2'>Already have an account?</h2>

//             <button className='p-2 w-1/2 rounded-lg  bg-[#2B99E3] text-white'> Log In</button>
//           </div>
//         </div>
//       </div>



//     </div>
//   );
// }

// export default signup;
import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/signup/', {
        username: formData.username,
        password: formData.password,
      });

      console.log('Signup successful:', response.data);
      alert('Signup successful!');
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" width={120} height={120} />
        </div>

        <h2 className="text-xl font-bold text-center mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          By registering, you agree to our Terms and Privacy Policy.
        </p>

        <div className="text-center mt-6">
          <h2 className="font-semibold mb-2">Already have an account?</h2>
          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
