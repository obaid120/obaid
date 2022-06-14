import { Department } from './department.model';

export class Unit {

    id: number;
    unitId: number;
    name: string;
    key: string;
    code: string;
    description: string;

    cityAuditSegment: string;
    categoryLocation: string;
    depositInMillions: number;
    noOfCustomers: number;
    volumeMateriality: number;
    operationalComplexity: number;
    fraudsComplaintsService: number;
    automatedManualControls: number;

    systemProcessChanges: number;

    atm: boolean;
    atmValue: string;

    onSite: boolean;
    onSiteValue: string;

    offSite: boolean;
    offSiteValue: string;

    leadershipStaffingTurnover: number;

    auditCycleInDays: string;

    auditCycleId: number;
    auditCycle: any;

    nextAuditFieldWorkDate: string;
    previousAuditFieldWorkEndDate: string;
    nextAuditFieldWorkDateNew: any;
    
    shariaRating: string;

    plannedRegularShariaAudit: boolean;
    plannedRegularShariaAuditValue: string;

    pabxNumber: number;
    atmID: string;
    atmInstallationDate: string;
    branchOpeningDate: string;

    active: boolean;

    value: string;
    selected: boolean = false;
    departmentId: any;
    department: Department = new Department();

}
