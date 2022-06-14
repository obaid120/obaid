import { BaseModel } from './base.model';

export class AttachDocument extends BaseModel {

    override id: number;
    documentId: number;
    annexureLinkDocumentId: number;
    feedbackDocumentId: number;
    actionPlanDocumentId: number;
    documentUploadId: string;
    documentOriginalName: string;
    documentName: string;
    fileName: string;
    name: string;
    path: string;
    size: string;
    source: string;
    documentExtension: string;
    documentUrl: string;
    // documentType: CaseDocumentType = new CaseDocumentType();
    documentType: string;
    documentTypeId: number;
    selected: boolean;
    documentCode: string;
    documentDescription: string;
    documentTooltip: string;

    checksum: string;
    comments: string;

    longValue: string;
    htmlText: string;

    value: string;

}

export class CaseDocument {

    id: number;
    annexureLinkDocumentId: number;
}

export class DocumentType {

    id: number;
    name: string;
    code: string;
    required: boolean = false;
    isFilled: boolean = false;
}