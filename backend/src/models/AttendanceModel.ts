import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { UserModel } from './UserModel';

export interface AttendanceModel {
    _id: Schema.Types.ObjectId;
    attendedUsers: UserModel[];
    absentUsers: Map<string, string>;
}

const attendanceSchema = new mongoose.Schema<AttendanceModel>({
    attendedUsers: {
        type: [{type: String, ref: 'User'}],
        required: [
            true,
            "You must specify the users' ids of those who attended",
        ],
    },
    absentUsers: {
        type: Map,
        of: String
    },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
