import React, { useState } from 'react'
import Rating from './components/RadioGroupRating'
import { useNavigate } from 'react-router-dom';

export default function AfterMeeting() {
    const [rating, setRating] = useState(3);
    const navigate = useNavigate();
    const navToHomePage = () => {
        navigate("../homepage");
    };

    function handleSubmit() {
        console.log(`
        Rating: ${rating},
        Comments: ${(document.getElementById("comment") as HTMLInputElement).value}`)
    }

    return (
        <div className='h-screen overflow-scroll relative'>
            <div className='h-screen mx-auto py-2 flex items-center flex-col text-[#262B6C]'>
                <h1 className='text-4xl mt-4 mb-10 font-bold'>Meeting A - with Group B</h1>
                <div className='flex flex-col items-center w-5/6 lg:w-1/3 text-center'>

                    <h2 className='text-3xl'>How are you feeling today?</h2>
                    <div className='w-full mt-3 mb-16 flex justify-center'>
                        <Rating setRating={setRating} />
                    </div>
                    <h2 className='text-3xl'>How did you find the meeting?</h2>
                    <textarea id="comment" className=' mt-4 mb-10 w-full border-[#262b6c] border-2 p-2 resize-none' placeholder='Enter Comments' rows={10}></textarea>

                    <button className='text-red-600 border-red-600 border-2 p-1 rounded-md w-1/3 text-2xl' onClick={() => { handleSubmit(); navToHomePage(); }}>Submit</button>
                </div>
            </div>

        </div >
    )
}