import React from 'react';
import Navbar from '../components/Navbar';
import Hero from "../assets/Heroimg.png";
import Analysis from "../assets/Analysis.png";
import Test from "../assets/Test.png";
import ResumeBuilder from "../assets/Resume Builder.png";
import CoverLetter from "../assets/CoverLetter.png";
import Recommendation from "../assets/Recommendation.png";


const home = () => {
    return (
        <div>
            <div className='flex flex-col justify-center '>
                <div>

                    <Navbar />
                </div>
                <div className='flex flex-col justify-center items-center '>
                    <div className=' w-2/3 mb-8  '>
                        <img
                            src={Hero}
                            alt=""
                            className='w-full h-full object-cover  '
                        />
                    </div>
                    <div className=' w-2/3   '>
                        <h2 className='font-bold text-2xl mb-4'>How Career Crafter Can Help You</h2>
                        <h4 className='font-small'>We're here to guide you through the process of choosing a career. Our tools and resources make it easier to explore your options and find a path that's a good fit for you.</h4>
                    </div>
                    <div className='w-2/3 grid grid-cols-5 gap-2'>

                        <div>
                            <img src={Analysis} alt="" />
                            <h2 className='font-semibold'>Career Analysis</h2>
                            <p className='text-[#4F7A94]'>Explore different career paths and find the one that's right for you.</p>
                        </div>

                        <div>
                            <img src={Test} alt="" />
                            <h2 className='font-semibold'>Aptitude Test</h2>
                            <p className='text-[#4F7A94]'>Discover your natural abilities and what you're best suited for.</p>
                        </div>

                        <div>
                            <img src={Recommendation} alt="" />
                            <h2 className='font-semibold'>Personalized Recommendations</h2>
                            <p className='text-[#4F7A94]'>Get job recommendations based on your interests and skills.</p>
                        </div>

                        <div>
                            <img src={ResumeBuilder} alt="" />
                            <h2 className='font-semibold'>Resume Builder</h2>
                            <p className='text-[#4F7A94]'>Create a professional resume in minutes with our easy-to-use tool.</p>
                        </div>

                        <div>
                            <img src={CoverLetter} alt="" />
                            <h2 className='font-semibold'>Cover Letter Example</h2>
                            <p className='text-[#4F7A94]'>Use our template to write a cover letter that stands out to employers.</p>
                        </div>

                    </div>
                    <div className='w-2/3 items-center mt-28 flex flex-col gap-4 justify-center'>
                        <h2 className='font-bold text-2xl text-center'>Ready to Take the  next step?</h2>
                        <p className='text-center'>Sign up for Career Compass today and start exploring your future</p>
                        <button className='bg-[#2B99E3] p-2 flex justify-center text-white rounded-lg'>Get started</button>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default home;
