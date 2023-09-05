import UserDTO from './UserDTO';

export default interface AttendanceDTO {
    user: UserDTO;
    didAttend: boolean;
    notes?: string;
    feedbackRating?: 1 | 2 | 3 | 4 | 5;
    feedbackDescription?: string;
}
