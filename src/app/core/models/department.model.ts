// import { AuditType } from './audit-type.model';
import { Group } from './group.model';

export class Department {

    id: number;
    departmentId: number;
    name: string;
    key: string;
    code: string;
    description: string;
    groupId: number;
    group: Group = new Group();
    auditTypeIds: number[] = [];
    auditTypes: any[] = [];
    active: boolean;

    value: string;
    selected: boolean = false;

}

export class PurchaseDepartment {

    id: number;
    purchaseDepartmentId: number;
    name: string;
    key: string;
    code: string;
    description: string;
    active: boolean;

    value: string;
    selected: boolean = false;

}
