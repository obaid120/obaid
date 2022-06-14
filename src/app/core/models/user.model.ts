import { BaseModel } from './base.model';
import { Department } from './department.model';
import { Role } from './role.model';
import { Permission } from './permission.model';
import { NavigationItem } from './navigationItem.model';
import { Designation } from './designation.model';
import { AttachDocument } from './attachDocument.model';
import { Group } from './group.model';
import { Unit } from './unit.model';
import { UserModule } from './user-module.model';
import { Organization } from './organization.model';

export class User extends BaseModel {
    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
    code: string;
    email: string;
    mobile: string;
    password: string = "";
    confirmPassword: string = "";
    bashPassword: string = "";

    notificationGroup: string = "";
    notificationGroups: string[] = [];

    profilePictureId: number;
    // profilePicture: any;
    profilePicture: AttachDocument = new AttachDocument();

    userModuleIds: number[] = [];
    userModules: UserModule[] = [];
    modules: Module[] = [];

    profilePictureFile: any;

    organizationId: number;
    organization: Organization = new Organization();

    grossCategory: number;

    userProfessionalProfileId: number;
    userProfessionalProfile: UserProfessionalProfile = new UserProfessionalProfile();

    groupId: number;
    group: Group = new Group();

    departmentId: number;
    department: Department = new Department();

    unitId: number;
    unit: Unit = new Unit();

    designationId: number;
    designation: Designation;



    roleIds: number[] = [];
    // roles: any;
    roles: Role[] = [];

    roleId: number;
    role: Role = new Role();

    // userRoles: any;
    userRoles: UserRole[] = [];
    // userPermissions: any;
    userPermissions: UserPermission[] = [];
    // userNavigations: any;
    userNavigations: UserNavigation[] = [];

    navigationItemIds: number[] = [];
    navigationItems: NavigationItem[] = [];

    departmentName: string;
    rolesName: string;
    override createdOn: string;
    loginBlocked: boolean = false;
    loginBlockedOn: string;

    // status: boolean = false;
    statusId: number;
    status: any;
    statusValue: string;

    rightModificationDate: string;



    verified: boolean;
    verifiedValue: string;

    locked: boolean;
    active: number;
    nic: number;
    ntn: number;

    userOrganizations: UserOrganization[] = [];
    organizationIds: number[] = [];
    organizations: Organization[] = [];

    userGroups: UserGroup[] = [];
    groupIds: number[] = [];
    groups: Group[] = [];

}

export class UserRole extends BaseModel {
    override id: number;
    userRoleId: number;
    operation: string;
    roleId: number;
    role: Role = new Role();

}

export class Module extends BaseModel {
    override id: number;
    moduleId: number;
    userModuleId: number;
    userModule: UserModule = new UserModule();
}

export class UserPermission extends BaseModel {
    override id: number;
    userPermissionId: number;
    operation: string;
    permissionId: number;
    permission: Permission = new Permission();
}

export class UserNavigation extends BaseModel {
    override id: number;
    userNavigationId: number;
    operation: string;
    navigationItemId: number;
    navigationItem: NavigationItem = new NavigationItem();
    // subNavigationItems: NavigationItem[] = [];
    children: UserNavigation[] = [];
    root: boolean = false;
}

export class UserProfessionalProfile extends BaseModel {
    override id: number;
    userProfessionalProfileId: number;
    experience: string;
    expertise: string;
    qualification: string;

}

export class UserOrganization {
    id: number;
    userOrganizationId: number;
    operation: string;
    organizationId: number;
    organization: Organization = new Organization();
}

export class UserGroup extends BaseModel {
    override id: number;
    userGroupId: number;
    operation: string;
    groupId: number;
    group: Group = new Group();
}