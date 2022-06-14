import { User } from "./user.model";

export class Organization {
    id: number;
    name: string;
    key: string;
    description: string;
    active: boolean;
    createdBy: number;
    createdOn : string;
    isCreatedOn: boolean;
    updatedBy: number;
    updatedOn: string;
    isUpdatedOn: boolean;

    users: User[] = [];
}