export class UserMini {
    id: number;
    userId: number;
    userName: string;

    firstName: string;
    lastName: string;
    fullName: string;

    groupName: any;
    departmentName: any;
    unitName: any;
    rolesName: string;
    createdOn: string;
    loginBlocked: boolean = false;
    loginBlockedOn: string;
    lastActiveOn: string;
    status: boolean = false;
    statusValue: string;
    rightsModificationDate: string;

    code: string;
    email: string;
    verified: boolean = false;
}
