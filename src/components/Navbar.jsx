import React from 'react';
import Logo from '../assets/Logo.png'

const Navbar = () => {
    return (
        <div className=' w-full h-auto p-4 '>
            <div className='flex flex-row justify-between mb-2'>
                <div className=' flex justify-center items-center '>
                    <img src={Logo} alt="" width={200} height={200} />
                </div>
                <div className='text-black  '>
                    <ul className='flex flex-row gap-6 justify-center items-center'>
                        <li>Home</li>
                        <li>Dashboard</li>
                        <li>Services</li>
                        <li>Resources</li>
                        <li>About</li>
                        <li className='border  rounded-lg bg-blue-400 p-1 text-white'>Sign Up</li>
                        <li className='border border-none  rounded-lg bg-gray-400 p-1'>Log In</li>
                    </ul>
                    
                </div>

            </div>
            <hr className='border-gray-200'/>
        </div>
    );
}

export default Navbar;
