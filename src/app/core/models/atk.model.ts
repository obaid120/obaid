import { BaseModel } from "./base.model";

export class ChevronSerial extends BaseModel{
    serialNo: string;
    smsCode: string;
    qrCode: string;
    isPrinted: boolean;
    printDate: string;
    isDelivered: boolean;
    deliverDate: string;
    isApplied: boolean;
    applyDate: string;
    isScanned: boolean;
    scanDate: string;
    isDestroyed: boolean;
    destoryDate: string;

    isCreatedOn: boolean;
    isUpdatedOn: boolean;

    poRequestId: number;
    poRequest: PORequest = new PORequest();
}

export class PORequest extends BaseModel {
    status: string;
    chevronPONo: string;
    quantity: string;
    priceOfLabel: string;
    notes: string;
    deliveryDate: string;
    dateAdded: string;
    deliveredOn: string;
    cancelDate: string;
    codesFile: string;
    printedCodesFile: string;

    isCreatedOn: boolean;
    isUpdatedOn: boolean;
}

export class CodeType {
    id: number;
    value: string;
}

export class DashboardSummary {
    id: number;
    scannedOn: string;
    scanMethod: string;
    scanData: string;
    scanResult: string;
    mobileNo: string;
    addInfo: string;
    serialNo: string;
    smsCode: string;
    qrCode: string;
    printDate: string;
    deliverDate: string;
    applyDate: string;
    scanDate: string;
    productId: number;
    batchId: string;
    lineId: string;
    productName: string;

    scanLocation: string;
    scanLoc: string;

    innerData: DashboardListInnerItems;
}

export class SummaryParams {
    scanResult: string;
    startDate: string;
    endDate: string;
    batchId: string;
    recordNo: string;
}

export class ScanData {
    goodScans: number;
    badScans: number;
    alreadyScanned: number;
    totalScans: number;
    goodSMS: number;
    badSMS: number;
    alreadyVerified: number;
    totalVerified: number;
}

export class DashboardListInnerItems {
    isPrinted: boolean;
    printDate: string;
    isDelivered: boolean;
    deliverDate: string;
    isApplied: boolean;
    applyDate: string;
    isDestroyed: boolean;
    destoryDate: string;


    // PO Request
    status: string;
    chevronPONo: string;
    quantity: string;
    priceOfLabel: string;
}

export class Status {
    code: string;
    name: string;
}