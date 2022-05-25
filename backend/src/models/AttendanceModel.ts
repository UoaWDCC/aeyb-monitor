import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export interface AttendanceModel {
    _id: Schema.Types.ObjectId;
    attendedUsers: [string];
    absentUsers: Map<string, string>;
}

const attendanceSchema = new mongoose.Schema<AttendanceModel>({
    _id: {
        type: Schema.Types.ObjectId,
        required: [true, "You must specify the attendance's id"],
    },
    attendedUsers: {
        type: [String],
        required: [
            true,
            "You must specify the users' ids of those who attended",
        ],
    },
    absentUsers: {
        type: Map,
        of: String,
    },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
