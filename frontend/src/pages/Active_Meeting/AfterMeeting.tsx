import React, { useState } from 'react'
import Rating from './components/RadioGroupRating'
import { useNavigate } from 'react-router-dom';

export default function AfterMeeting() {
    const [rating, setRating] = useState(3);
    const navigate = useNavigate();
    const navToHomePage = () => {
        navigate(".../homepage");
    };

    function handleSubmit() {
        console.log(`
        Rating: ${rating},
        Comments: ${(document.getElementById("comment") as HTMLInputElement).value}`)
    }

    return (
        <div className='h-screen overflow-scroll relative'>
            <div className='w-5/6 lg:w-1/3 h-screen mx-auto py-2 flex items-center flex-col justify-around'>
                <h1 className='text-4xl mt-2'>Meeting A - with Group B</h1>

                <div className='flex flex-col items-center w-full'>

                    <h2 className='text-2xl mb-5'>Participation Feedback:</h2>
                    <div className='w-full my-2 flex justify-center'>
                        <Rating setRating={setRating} />
                    </div>

                    <textarea id="comment" className=' my-5 w-full border-[#262b6c] border-2 p-2 resize-none' placeholder='Enter Comments' rows={10}></textarea>

                    <button className='bg-[#262b6c] text-white p-2 rounded-md' onClick={() => { handleSubmit(); navToHomePage(); }}>Submit</button>
                </div>
            </div>

        </div >
    )
}