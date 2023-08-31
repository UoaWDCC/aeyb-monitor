import { Autocomplete, Box, Button, Modal, SxProps, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LocationDTO from '@shared/dtos/LocationDTO';
import MeetingDTO, { MeetingType } from '@shared/dtos/MeetingDTO';
import { useEffect, useState } from 'react';
import UserDTO from '../../../../shared/dtos/UserDTO';
import { useUserContext } from '../../contexts/UserContext';
import { durationToNumber, numberToDuration } from '../../utils/durationUtil';
import { roundToHour } from '../../utils/timeUtil';
import AutocompleteInput from './components/AutocompleteRoleInput';
import dayjs from 'dayjs';

export type TFormValues = {
    type: MeetingType;
    name: string;
    startDate: Date;
    startTime: Date;
    duration: number;
    location: Omit<LocationDTO, 'id'>;
    users: UserDTO[];
    description?: string;
};

type TMeetingModalProps = {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    users: UserDTO[];
    onSubmit: (e: TFormValues) => void;
    meeting?: MeetingDTO;
    isCreate?: boolean;
};

const style: SxProps = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    borderRadius: '0.5rem',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    maxHeight: '95vh',
    overflow: 'scroll',
};

export function MeetingModal({ isOpen, setIsOpen, users, onSubmit, meeting, isCreate }: TMeetingModalProps) {
    const userContext = useUserContext();
    const [formValues, setFormValues] = useState<TFormValues>({
        name: meeting ? meeting.name : '',
        type: 'meeting',
        location: meeting ? meeting.location : { location: '', type: 'inPerson' },
        description: meeting ? meeting.description : '',
        startDate: meeting ? new Date(meeting.startTime) : roundToHour(new Date()),
        startTime: meeting ? new Date(meeting.startTime) : roundToHour(new Date()),
        duration: meeting
            ? ~~((new Date(meeting.finishTime).getTime() - new Date(meeting.startTime).getTime()) / 1000 / 60)
            : 60, // default 1-hour duration
        users: meeting ? meeting.attendance.map((a) => a.user) : [],
    });

    const selectableUsers = users.filter(
        (u) => formValues.users.find((u2) => u2.id == u.id) || u.id != userContext.user.id,
    );

    useEffect(() => {
        setFormValues({
            name: meeting ? meeting.name : '',
            type: 'meeting',
            location: meeting ? meeting.location : { location: '', type: 'inPerson' },
            description: meeting ? meeting.description : '',
            startDate: meeting ? new Date(meeting.startTime) : roundToHour(new Date()),
            startTime: meeting ? new Date(meeting.startTime) : roundToHour(new Date()),
            duration: meeting
                ? ~~((new Date(meeting.finishTime).getTime() - new Date(meeting.startTime).getTime()) / 1000 / 60)
                : 60, // default 1-hour duration
            users: meeting ? meeting.attendance.map((a) => a.user) : [],
        });
    }, [meeting, isOpen]);

    const addUserToMeeting = (users: UserDTO[]) => {
        setFormValues({
            ...formValues,
            users,
        });
    };

    const modifyFormValues = <T extends keyof TFormValues>(key: T, newValue: TFormValues[T]) => {
        setFormValues({
            ...formValues,
            [key]: newValue,
        });
    };

    return (
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <form
                onSubmit={(e) => {
                    onSubmit(formValues);
                    e.preventDefault();
                    (e.target as HTMLFormElement).reset();
                }}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        {isCreate ? 'Create new meeting' : 'Edit meeting detail'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', mt: '1rem' }}>
                        <TextField
                            label="Meeting name"
                            variant="outlined"
                            placeholder="Enter meeting name"
                            defaultValue={formValues.name}
                            onChange={(e) => modifyFormValues('name', e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Location"
                            variant="outlined"
                            placeholder="Enter location"
                            defaultValue={formValues.location.location}
                            onChange={(e) =>
                                modifyFormValues('location', { location: e.target.value, type: 'inPerson' })
                            }
                            fullWidth
                            required
                        />
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TextField
                                    label="Start date"
                                    type="date"
                                    defaultValue={(() => {
                                        const sd = formValues.startTime;
                                        return dayjs(formValues.startDate).format('YYYY-MM-DD');
                                    })()}
                                    onChange={(v) => modifyFormValues('startDate', new Date(v.target.value))}
                                    required
                                    sx={{ flexGrow: 1 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="Start time"
                                    type="time"
                                    defaultValue={(() => {
                                        return dayjs(formValues.startTime).format('hh:mm');
                                    })()}
                                    onChange={(v) => {
                                        const time = v.target.value.split(':');
                                        const date = new Date();
                                        date.setHours(+time[0]);
                                        date.setMinutes(+time[1]);
                                        modifyFormValues('startTime', date);
                                    }}
                                    required
                                    sx={{ flexGrow: 1 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                                <Autocomplete
                                    sx={{ flexGrow: 1 }}
                                    value={(() => ({
                                        value: numberToDuration(formValues.duration),
                                        labelText: (() => {
                                            const tmp = numberToDuration(formValues.duration).split(':');
                                            return `${tmp[0]}h ${tmp[1]}m`;
                                        })(),
                                    }))()}
                                    onChange={(_, { value }) => {
                                        if (value) {
                                            modifyFormValues('duration', durationToNumber(value));
                                        }
                                    }}
                                    options={[...Array(5).keys()]
                                        .map((hour) =>
                                            [0, 15, 30, 45].map((minute) => ({
                                                labelText: `${(hour / 100).toFixed(2).slice(-2)}h ${(minute / 100)
                                                    .toFixed(2)
                                                    .slice(-2)}m`,
                                                value: `${(hour / 100).toFixed(2).slice(-2)}:${(minute / 100)
                                                    .toFixed(2)
                                                    .slice(-2)}`,
                                            })),
                                        )
                                        .flat()}
                                    getOptionLabel={(option) => option.labelText}
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required={!!formValues.duration}
                                            label={'Duration'}
                                            placeholder={'Duration'}
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <AutocompleteInput
                            options={selectableUsers}
                            label="Which group of people are you inviting?"
                            value={formValues.users}
                            onChange={addUserToMeeting}
                        />
                        <TextField
                            label="Description"
                            sx={{ zIndex: 0 }}
                            defaultValue={formValues.description}
                            variant="outlined"
                            placeholder="Enter description"
                            onChange={(e) => modifyFormValues('description', e.target.value)}
                            multiline
                            rows={6}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            sx={{ background: '#7d6ca3', '&:hover': { background: '#7d6ca3 !important' } }}
                            type="submit"
                        >
                            {isCreate ? 'Create new meeting' : 'Modify meeting'}
                        </Button>
                    </Box>
                </Box>
            </form>
        </Modal>
    );
}
