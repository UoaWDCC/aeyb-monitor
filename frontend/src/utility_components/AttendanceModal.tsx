import {
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
    Typography,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';

export default function AttendanceModal({ isOpen, setIsOpen, meeting }) {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        setAttendance(
            meeting.attendance.map((attendee) => {
                return { status: attendee.status, note: attendee.note ? attendee.note : '' };
            }),
        );
    }, []);

    const handleConfirm = () => {
        console.log(attendance);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleRadioChange = (index, value) => {
        attendance[index].status = value === 'present' ? true : false;
        setAttendance(attendance);
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper style={{ backgroundColor: 'white', padding: '16px', width: '80%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">{meeting.name}</Typography>
                    <IconButton color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Attendance</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {meeting.attendance.map((attendee, index) => (
                                <TableRow key={index}>
                                    <TableCell>{attendee.user.name}</TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            // value={attendance[index].status ? 'present' : 'absent' || ''}
                                            onChange={(e) => handleRadioChange(index, e.target.value)}
                                        >
                                            <FormControlLabel value="present" control={<Radio />} label="Present" />
                                            <FormControlLabel value="absent" control={<Radio />} label="Absent" />
                                        </RadioGroup>
                                    </TableCell>
                                    <TableCell>
                                        <TextField variant="outlined" size="small" fullWidth placeholder="Status" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                    <Button variant="outlined" color="primary" style={{ marginRight: '8px' }} onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Paper>
        </Modal>
    );
}
