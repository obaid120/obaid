import { Permission } from './permission.model';

export class Role {

    id: number;
    roleId: number;
    name: string;
    key: string;
    code: string;
    description: string;
    priority: number;
    active: number;

    userRoleId: number;
    permissions: Permission[] = [];
    value: string;
    selected: boolean = false;

}
