export enum UserStatus {
    // the color of their status div
    Available = 'green',
    Idle = 'yellow',
    Busy = 'red',
}

// created roles will be appended here
export enum Roles {
    TeamLeader,
    Member,
    BoardLeader,
}

export interface Profile {
    // assuming that a url is required to fetch google account info
    profilePictureUrl: string;
    name: string;

    status: UserStatus;
    roles: Array<Roles>;
}
