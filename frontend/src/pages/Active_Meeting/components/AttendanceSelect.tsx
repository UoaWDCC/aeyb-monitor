import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function AttendanceSelect() {

    return (
        <FormControl fullWidth>
            <InputLabel id="attendance-select-label">Attendance</InputLabel>
            <Select
                labelId="attendance-select-label"
                id="attendance-select"
                label="Attendance"
            // onChange={handleChange}
            >
                <MenuItem value={1}>Attended</MenuItem>
                <MenuItem value={0}>Not Attended</MenuItem>
            </Select>
        </FormControl>
    )
}