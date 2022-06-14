import { UserMini } from './userMini.model';

export class BaseModel {
    id: number;
    createdBy: number;
    createdByUser: UserMini = new UserMini();
    // createdOn: Date;
    createdOn: string;
    updatedBy: number;
    updatedByUser: UserMini = new UserMini();
    // updatedOn: Date;
    updatedOn: string;
    isActive: boolean;
}
