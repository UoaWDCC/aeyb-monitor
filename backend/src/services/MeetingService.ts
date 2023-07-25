import Meeting from '../models/MeetingModel';
import User from '../models/UserModel';
import { TypedResponse } from '../types/UtilTypes';

export async function findMeeting(meetingId: string, res: TypedResponse<any>) {
    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
        res.notFound(`There is no meeting with the id ${meetingId}`);
    }

    return meeting;
}

export async function findUser(userId: string, res: TypedResponse<any>) {
    const user = await User.findById({ _id: userId });

    if (!user) {
        res.notFound(`There is no user with the id ${userId}`);
    }

    return user;
}

export async function updateUserAttendanceForMeeting(meetingId: string, userId: string, updateQuery: any) {
    return await Meeting.findOneAndUpdate(
        { _id: meetingId, 'attendance.user': userId },
        { $set: updateQuery },
        { new: true, returnOriginal: false },
    );
}

export async function updateMeetingWithNewUser(meetingId: string, attendanceData: any) {
    return await Meeting.findByIdAndUpdate(meetingId, { $push: { attendance: attendanceData } }, { new: true });
}
