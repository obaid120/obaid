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