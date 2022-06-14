import { Department } from './department.model';
import { Status } from './status.model';

export class OpenObservationByRating {
    count: number;
    // riskRating: RiskRating = new RiskRating();
    percentage: string;
}

export class AuditProceduresByStatus {

    index: number;
    auditId: number;
    auditName: string;
    count: number;
    status: string;
    clientStatuses: ClientStatus[] = [];
    clientStatus: ClientStatus = new ClientStatus();
    testingStatus: string;
    clientCount: number

}

export class ClientStatus{
    testingStatus: string;
    count: number;
}


export class UserEngagementQuarterWise {

    index: number;
    userId: number;
    user: string;
    count: number;

    userEngagementYearWises: UserEngagementYearWise[] = [];
    // userEngagementYearWisesMTDS?: UserEngagementYearWise[] | MatTableDataSource<UserEngagementYearWise>;

    year: number;
    yearCount: number;
    quarter1: number;
    quarter1Count: number;
    quarter2: number;
    quarter2Count: number;
    quarter3: number;
    quarter3Count: number;
    quarter4: number;
    quarter4Count: number;

}

export class DeptEngagementQuarterWise {

    index: number;
    deptId: number;
    department: string;
    count: number;

    userEngagementYearWises: UserEngagementYearWise[] = [];
    // userEngagementYearWisesMTDS?: UserEngagementYearWise[] | MatTableDataSource<UserEngagementYearWise>;

    year: number;
    yearCount: number;
    quarter1: number;
    quarter1Count: number;
    quarter2: number;
    quarter2Count: number;
    quarter3: number;
    quarter3Count: number;
    quarter4: number;
    quarter4Count: number;

}

export class UserEngagementYearWise {

    year: number;
    yearCount: number;
    quarter1: number;
    quarter1Count: number;
    quarter2: number;
    quarter2Count: number;
    quarter3: number;
    quarter3Count: number;
    quarter4: number;
    quarter4Count: number;

}

export class RCSAStatusWise {

    index: number;
    count: number;

    statusId: number;
    status: Status = new Status();
    statusName: string;
    statusKey: string;

}

export class KriBreachYearMonthWise {

    index: number;
    departmentId: number;
    department: Department = new Department();
    departmentName: string;
    count: number;

    kris: KriBreachYearMonthWiseData[] = [];
    // krisMTDS?: KriBreachYearMonthWiseData[] | MatTableDataSource<KriBreachYearMonthWiseData>;

    date: number;
    dateYear: string;
    dateMonth: number;
    dateMonthName: string;

    kriCount: number;
    breachCount: number;

}

export class KriBreachYearMonthWiseData {

    index: number;
    date: number;
    dateYear: string;
    dateMonth: number;
    dateMonthName: string;

    kriCount: number;
    breachCount: number;

}

export class IncidentMonthWise {

    index: number;
    count: number;
    incidentCount: number;

    date: string;
    dateYear: string;
    dateMonth: number;
    dateMonthName: string;
    dateYearMonth: string;

}

export class DepartmentRiskWise {

    index: number;
    departmentId: number;
    department: Department = new Department();
    departmentName: string;
    count: number;

    risks: DepartmentRiskWiseData[] = [];
    // risksMTDS?: DepartmentRiskWiseData[] | MatTableDataSource<DepartmentRiskWiseData>;

    inherentLikelihood: string;
    departmentRiskWiseDataCount: number;

}

export class DepartmentRiskWiseData {

    index: number;
    inherentLikelihood: string;
    departmentRiskWiseDataCount: number;

}

export class ControlAssessmentStatusWise {

    index: number;
    count: number;

    statusId: number;
    status: Status = new Status();
    statusName: string;
    statusKey: string;

}

export class InherentRiskHeatMap {

    index: number;
    residualRisk: number;
    riskCount: number;

    inherentLikelihood: any;
    // inherentLikelihood: any;
    inherentLikelihoodId: number;
    inherentLikelihoodName: string;

    inherentImpact: any;
    // inherentImpact: any;
    inherentImpactId: number;
    inherentImpactName: string;
    color: string;

}

export class CaseStatusWise {

    index: number;
    count: number;

    statusId: number;
    status: Status = new Status();
    statusName: string;
    statusKey: string;

}