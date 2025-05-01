// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';
// import api from '../api/index.js';
// import Logo from '../assets/Logo.png'

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/login/', { username, password });
//       console.log('Login successful:', response.data);
//       navigate('/dashboard');
//       dispatch(setUserData(response.data));
//       // Handle successful login (e.g., save token, redirect)
//     } catch (error) {
//       console.error('Login failed:', error.response.data);
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className=' w-full h-auto p-4 '>
//           <div className='flex flex-row justify-between mb-2'>
//             <div className=' flex justify-center items-center '>
//               <img src={Logo} alt="" width={200} height={200} />
//             </div>
//           </div>
//           <hr className='border-gray-200 ' />
//           <div className='flex flex-col justify-center items-center'>

//             <div className='w-3/4 flex flex-col justify-center '>
//               <div className='flex justify-center mt-10 '>
//                 <h2 className='font-bold'>Get Started</h2>
//               </div>
//               <div className='flex flex-col gap-4 '>

//                 <div>
//                   <h2 className='font-medium'>Username</h2>
//                   <input type="text" value={username}
//                     placeholder="Username"
//                     onChange={(e) => setUsername(e.target.value)} className=' p-2 w-1/2 border text-[#4F7A94] border-gray-400  rounded-md focus:outline-none focus:ring-0 focus:border-b-green-400' />
//                 </div>
//                 <div>
//                   <h2 className='font-medium'>Password</h2>
//                   <input type="text" placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)} className=' p-2 w-1/2 border text-[#4F7A94] border-gray-400  rounded-md focus:outline-none focus:ring-0 focus:border-b-green-400' />
//                 </div>

//               </div>




//               <div className='w-auto flex justify-center itmes-center'>

//                 <button className='border border-gray-600 w-auto mt-8 px-4 py-2 rounded-md' type="submit">Login</button>
//               </div>

//             </div>
//           </div>



//         </div>
//       </form>
//     </div>




//   );
// }

// export default Login;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import Logo from '../assets/Logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // ✅ Allows cookies to be sent
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      dispatch(setUserData(data));  // ✅ Store user data in Redux
      navigate('/dashboard');       // ✅ Redirect on success

    } catch (error) {
      console.error('Login failed:', error.message);
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='w-full h-auto p-4'>
          <div className='flex flex-row justify-between mb-2'>
            <div className='flex justify-center items-center'>
              <img src={Logo} alt="Logo" width={200} height={200} />
            </div>
          </div>
          <hr className='border-gray-200' />
          <div className='flex flex-col justify-center items-center'>

            <div className='w-3/4 flex flex-col justify-center'>
              <div className='flex justify-center mt-10'>
                <h2 className='font-bold'>Get Started</h2>
              </div>
              <div className='flex flex-col gap-4'>

                <div>
                  <h2 className='font-medium'>Username</h2>
                  <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    className='p-2 w-1/2 border text-[#4F7A94] border-gray-400 rounded-md focus:outline-none focus:ring-0 focus:border-b-green-400'
                  />
                </div>
                <div>
                  <h2 className='font-medium'>Password</h2>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='p-2 w-1/2 border text-[#4F7A94] border-gray-400 rounded-md focus:outline-none focus:ring-0 focus:border-b-green-400'
                  />
                </div>

              </div>

              <div className='w-auto flex justify-center items-center'>
                <button className='border border-gray-600 w-auto mt-8 px-4 py-2 rounded-md' type="submit">
                  Login
                </button>
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;



// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setUserData } from '../redux/userSlice';
// import api from '../api';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/login/', { username, password });
//       console.log('Login successful:', response.data);

//       // Dispatch login data to Redux store
//       dispatch(setUserData(response.data));

//       // Redirect to the dashboard
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login failed:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
