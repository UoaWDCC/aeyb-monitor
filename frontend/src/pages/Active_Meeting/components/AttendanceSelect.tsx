import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function AttendanceSelect(props) {

    const { setAttendance } = props;

    function handleChange(event: SelectChangeEvent) {
        setAttendance(event.target.value);
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="attendance-select-label">Attendance</InputLabel>
            <Select
                labelId="attendance-select-label"
                id="attendance-select"
                label="Attendance"
                onChange={handleChange}
                defaultValue=''
            >
                <MenuItem value={1}>Attended</MenuItem>
                <MenuItem value={0}>Not Attended</MenuItem>
            </Select>
        </FormControl>
    )
}