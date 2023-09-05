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
import { useState } from 'react';
import MeetingDTO from '../../../shared/dtos/MeetingDTO';
import { useUserContext } from '../contexts/UserContext';
import { UpdateAttendancesRequest } from '../../../shared/requests/MeetingRequests';
import AttendanceDTO from '../../../shared/dtos/AttendanceDTO';

type AttendanceModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    meeting: MeetingDTO;
};
export default function AttendanceModal({ isOpen, setIsOpen, meeting }: AttendanceModalProps) {
    const userContext = useUserContext();
    const [attendance, setAttendance] = useState<AttendanceDTO[]>(meeting.attendance);

    const handleConfirm = async () => {
        const attendanceReqPayload: UpdateAttendancesRequest = attendance;
        const data = await userContext.fetcher('PATCH /api/meetings/:meetingId/attendances', attendanceReqPayload, {
            meetingId: meeting.id,
        });
        if (data) {
            console.log('data', data);
            handleClose();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleRadioChange = (index: number, value: string) => {
        attendance[index].didAttend = value === 'present' ? true : false;
        setAttendance([...attendance]);
    };

    const handleNoteChange = (index: number, value: string) => {
        attendance[index].notes = value;
        setAttendance([...attendance]);
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper style={{ backgroundColor: 'white', padding: '16px', width: '70%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Attendance for: {meeting.name}</Typography>
                    <IconButton color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Attendance</TableCell>
                                    <TableCell>Notes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {meeting.attendance.map((attendee, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{attendee.user.name}</TableCell>
                                        <TableCell>
                                            <RadioGroup
                                                row
                                                value={attendance[index]?.didAttend === true ? 'present' : 'absent'}
                                                onChange={(e) => handleRadioChange(index, e.target.value)}
                                            >
                                                <FormControlLabel value="present" control={<Radio />} label="Present" />
                                                <FormControlLabel value="absent" control={<Radio />} label="Absent" />
                                            </RadioGroup>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                placeholder="Notes"
                                                value={attendance[index]?.notes}
                                                onChange={(e) => handleNoteChange(index, e.target.value)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                    <Button variant="outlined" color="primary" style={{ marginLeft: '8px' }} onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Paper>
        </Modal>
    );
}
