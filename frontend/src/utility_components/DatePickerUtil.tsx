import React from 'react'
import DatePicker from "react-datepicker";


export default function DatePickerUtil({ value, handleChange }) {
    return (
        <div className='my-2 w-fit px-2'>
            <DatePicker
                className='border-[#7d6ca3] border-2 rounded-md px-5 min-w-[260px]'
                selected={value}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="time"
                dateFormat="d MMMM, yyyy h:mm aa"
                minDate={new Date()}
                onChange={handleChange}
            />
        </div>
    )
}
