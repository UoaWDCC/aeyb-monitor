import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { UserModel } from './UserModel';
import { InvitedModel } from './InvitedModel';

export interface AttendanceModel {
    _id: Schema.Types.ObjectId;
    attendedUsers: UserModel[];
    absentUsers: Map<string, string>;
    invited: InvitedModel;
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
    invited: {
        type: Schema.Types.ObjectId,
        ref: "Invited",
        required: [
            true,
            "You must specify who was invited",
        ]
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
