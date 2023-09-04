import { Modal } from '@mui/material';

export default function AttendanceModal({ isOpen, setIsOpen, meeting }) {
    return (
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="flex flex-col justify-center items-center">
                {meeting.id} {meeting.name}
            </div>
        </Modal>
    );
}
