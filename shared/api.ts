import { AttendanceIdParam, LocationIdParam, MeetingIdParam, RoleIdParam, UserIdParam } from './params';
import { GetAllMeetingsQuery } from './queries/MeetingQueries';
import { AddMeetingRequest, UpdateAttendanceRequest, UpdateMeetingRequest, EndMeetingRequest } from './requests/MeetingRequests';
import { AddRoleRequest, UpdateRoleRequest } from './requests/RoleRequests';
import { AddLocationRequest } from './requests/LocationRequests';
import { GiveRolesRequest, LoginRequest, RemoveRolesRequest, UpdateUserRequest } from './requests/UserRequests';
import { AddMeetingData, GetAllMeetingsData, GetMeetingData, UpdateMeetingData } from './responses/MeetingResponses';
import { GetAllPermissionsData } from './responses/PermissionResponsesData';
import { AddRoleData, DeleteRoleData, GetAllRolesData, GetRoleData, UpdateRoleData } from './responses/RoleResponsesData';
import {
    LoginData,
    GetSelfData,
    GetAllUsersData,
    GetUserData,
    UpdateUserData,
    GiveRolesData,
    RemoveRolesData,
} from './responses/UserResponsesData';
import {
    GetAllLocationData,
    GetLocationData,
    AddLocationData,
    UpdateLocationData,
    DeleteLocationData,
} from './responses/LocationResponses';

export interface Endpoint<Req, Res, Params = undefined, Query = undefined> {
    req: Req;
    res: Res;
    params: Params;
    query: Query;
}

export default interface API {
    // User endpoints
    'GET /api/users/@me': Endpoint<undefined, GetSelfData>;
    'GET /api/users': Endpoint<undefined, GetAllUsersData>;
    'GET /api/users/:userId': Endpoint<undefined, GetUserData, UserIdParam>;
    'POST /api/users/login': Endpoint<LoginRequest, LoginData>;
    'POST /api/users/:userId/roles': Endpoint<GiveRolesRequest, GiveRolesData, UserIdParam>;
    'PATCH /api/users/:userId': Endpoint<UpdateUserRequest, UpdateUserData, UserIdParam>;
    'DELETE /api/users/:userId/roles': Endpoint<RemoveRolesRequest, RemoveRolesData, UserIdParam>;

    // Role endpoints
    'GET /api/roles': Endpoint<undefined, GetAllRolesData>;
    'GET /api/roles/:roleId': Endpoint<undefined, GetRoleData, RoleIdParam>;
    'POST /api/roles': Endpoint<AddRoleRequest, AddRoleData>;
    'PATCH /api/roles/:roleId': Endpoint<UpdateRoleRequest, UpdateRoleData, RoleIdParam>;
    'DELETE /api/roles/:roleId': Endpoint<undefined, DeleteRoleData, RoleIdParam>;

    // Permission endpoints
    'GET /api/permissions': Endpoint<undefined, GetAllPermissionsData>;

    // Meeting endpoints
    'GET /api/meetings': Endpoint<undefined, GetAllMeetingsData, undefined, GetAllMeetingsQuery>;
    'GET /api/meetings/:meetingId': Endpoint<undefined, GetMeetingData, MeetingIdParam>;
    'POST /api/meetings': Endpoint<AddMeetingRequest, AddMeetingData>;
    'PATCH /api/meetings/:meetingId': Endpoint<UpdateMeetingRequest, UpdateMeetingData, MeetingIdParam>;
    'PATCH /api/meetings/:meetingId/end': Endpoint<EndMeetingRequest, undefined, MeetingIdParam>;
    'DELETE /api/meetings/:meetingId': Endpoint<undefined, undefined, MeetingIdParam>;

    // Attendance endpoints
    'GET /api/meetings/:meetingId/attendances': Endpoint<undefined, GetAllMeetingsData, MeetingIdParam>;
    'GET /api/meetings/:meetingId/attendances/:userId': Endpoint<undefined, GetAllMeetingsData, AttendanceIdParam>;
    'PATCH /api/meetings/:meetingId/attendances/users/:userId': Endpoint<
        UpdateAttendanceRequest,
        UpdateMeetingData,
        AttendanceIdParam
    >;

    // Feedback endpoints
    'GET /api/meetings/:meetingId/feedback': Endpoint<undefined, GetAllMeetingsData, AttendanceIdParam>;
    'POST /api/meetings/:meetingId/feedback/users/:userId': Endpoint<undefined, GetAllMeetingsData, AttendanceIdParam>;
    'PATCH /api/meetings/:meetingId/feedback': Endpoint<undefined, GetAllMeetingsData, AttendanceIdParam>;
    'GET /api/meetings/:meetingId/feedback/users/:userId': Endpoint<undefined, GetAllMeetingsData, MeetingIdParam>;

    // Location endpoints
    'GET /api/locations': Endpoint<undefined, GetAllLocationData>;
    'GET /api/roles/:locationId': Endpoint<undefined, GetLocationData, LocationIdParam>;
    'POST /api/location': Endpoint<AddLocationRequest, AddLocationData>;
    //'PATCH /api/locations/:locationId': Endpoint<UpdateLocationRequest, UpdateUserData, RoleIdParam>;
    'DELETE /api/roles/:locationId': Endpoint<undefined, DeleteLocationData, LocationIdParam>;
}
