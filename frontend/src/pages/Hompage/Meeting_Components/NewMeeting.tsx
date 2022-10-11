import React from 'react'

export default function NewMeeting(props) {
    const { isNewMeetingOpen, setIsNewMeetingOpen } = props
    return (
        <>
            {
                isNewMeetingOpen ?
                    <div className='flex items-center justify-center absolute h-screen w-full top-0 left-0 '>
                        < div className='opacity-50 bg-gray-600 w-full h-full absolute top-0 left-0 z-20' ></div >
                        <div className='text-5xl bg-white p-10 opacity-100 z-30 rounded-lg'>
                            Create new meeting
                            <div className='flex justify-around p-5 mt-20'>
                                <button className='bg-gray-400 p-2 rounded-md text-3xl  px-5' onClick={() => setIsNewMeetingOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </div >
                    : <div></div>
            }
        </>
    )

}