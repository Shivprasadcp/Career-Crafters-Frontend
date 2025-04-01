// import React from 'react';
// import Logo from '../assets/Logo.png'
// import Help from '../assets/Help.png'
// import Feedback from '../assets/Feedback.png'


// // const dashboard = () => {
// //   return (
// //     <div>
// //       dashbaord
// //     </div>
// //   );
// // }

// // export default dashboard;

// // import React from 'react';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

// const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },

// ];

// const getPath = (x, y, width, height) => {
//   return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
//   ${x + width / 2}, ${y}
//   C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
//   Z`;
// };

// const TriangleBar = (props) => {
//   const { fill, x, y, width, height } = props;

//   return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
// };
// // import React from 'react';

// const dashboard = () => {
//   return (
//     <div>
//       <div>

//         <div className=' w-full h-auto p-4 '>
//           <div className='flex flex-row justify-between mb-2'>
//             <div className=' flex justify-center items-center '>
//               <img src={Logo} alt="" width={200} height={200} />
//             </div>
//             <div className='text-black  '>
//               <ul className='flex flex-row gap-6 justify-center items-center'>
//                 <li>Home</li>
//                 <li>Explore</li>
//                 <li>Path</li>
//                 <li className='border  rounded-full bg-blue-400 p-1 text-white'>hiss</li>
//               </ul>

//             </div>

//           </div>
//           <hr className='border-gray-200' />
//         </div>
//       </div>

//       <div className='w-full flex flex-row'>


//         {/* left */}
//         <div className='w-1/5 p-4 h-screen'>
//           {/* <div className='flex flex-col '> */}
//           <div className='h-3/4'>
//             <div className=' flex flex-col justify-evenly gap-4'>
//               <div className='bg-[#F0F2F3] p-2 rounded-lg'>Dashboard</div>
//               <div className='bg-[#F0F2F3] p-2 rounded-lg'>Assessments</div>
//               <div className='bg-[#F0F2F3] p-2 rounded-lg'>Explore</div>
//               <div className='bg-[#F0F2F3] p-2 rounded-lg'>Connect AI Counselor</div>
//             </div>
//           </div>
//           <div className='h-1/4'>
//             <div className='bg-[#1A80E6] p-2 rounded-lg text-center text-white'>New assessment</div>

//             <div className='flex flex-row  gap-4 mt-8'>
//               <div>
//                 <img src={Help} alt="" width={20} height={20} />
//               </div>
//               <div>Help</div>

//             </div>
//             <div className='flex flex-row  gap-4 mt-8'> 
//               <div>
//                 <img src={Feedback} alt="" width={20} height={20} />
//               </div>
//               <div>Feedback</div>

//             </div>


//           </div>
//           {/* </div> */}



//         </div>

//         {/* right */}
//         <div className='w-4/5 mb-4'>
//           <h2 className='text-[#373839] text-[26px] font-semibold mb-8'>
//             Welcome back, Alice
//           </h2>

//           <div className='flex flex-row gap-8'>
//             <div className='w-1/2 border-2 rounded-lg  border-[#E0E0E0] '>
//               <div className='flex'>

//                 <BarChart
//                   width={500}
//                   height={300}
//                   data={data}
//                   margin={{
//                     top: 20,
//                     right: 30,
//                     left: 20,
//                     bottom: 5,
//                   }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
//                     {data.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={colors[index % 20]} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </div>

//             </div>

//             <div className='w-1/2 border-2 rounded-lg p-8 border-[#E0E0E0] '>
//               <h2>Top 3 career clusters</h2>

//               <u>
//                 <li>Health science</li>
//                 <li>Human services</li>
//                 <li>Information technology</li>
//               </u>
//             </div>

//           </div>

//           <div className='flex flex-col mt-32 justify-center items-center gap-6'>
//             <div className='w-1/2  justify-center items-center bg-[#1A80E6] p-2 rounded-lg text-center text-white'>New assessment</div>
//             <div className='w-1/2  justify-center items-center bg-[#F0F3F3] p-2 rounded-lg text-center text-black'>Get started with Al career counsellor</div>
//           </div>

//         </div>
//       </div>



//     </div>
//   );
// }

// export default dashboard;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUserData());
    navigate('/login');
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, User ID: {userData.user_id} - {userData.success}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
