export class Permission {

    id: number;
    permissionId: number;
    key: string;
    name: string;
    code: string;
    type: string;
    description: string;
    accessUrl: string;

    // userRolePermissionId: number;
    rolePermissionId: number;

    value: string;
    isChecked: boolean = false;
    isDisabled: boolean = false;
    selected: boolean;

}
