import { throwError as observableThrowError, Subject, Observable } from "rxjs";

import { Injectable, Inject } from "@angular/core";

import { DatePipe } from "@angular/common";

import {
  User,
  UserRole,
  UserPermission,
  UserNavigation,
  UserProfessionalProfile,
  Module,
  UserOrganization,
  UserGroup,
} from "../../models/user.model";
import { UserMini } from "../../models/userMini.model";
import { Role } from "../../models/role.model";
import { Permission } from "../../models/permission.model";
import {
  Notification,
  NotificationData,
} from "../../models/notification.model";

import { Department, PurchaseDepartment } from "../../models/department.model";
import { Status } from "../../models/status.model";
import { Unit } from "../../models/unit.model";
import { Group } from "../../models/group.model";
import { Designation } from "../../models/designation.model";

import { NavigationItem } from "../../models/navigationItem.model";
import {
  AttachDocument,
  DocumentType,
} from "../../models/attachDocument.model";
import {
  AuditProceduresByStatus,
  CaseStatusWise,
  ControlAssessmentStatusWise,
  DepartmentRiskWise,
  DepartmentRiskWiseData,
  DeptEngagementQuarterWise,
  IncidentMonthWise,
  InherentRiskHeatMap,
  KriBreachYearMonthWise,
  KriBreachYearMonthWiseData,
  OpenObservationByRating,
  RCSAStatusWise,
  UserEngagementQuarterWise,
  UserEngagementYearWise,
} from "../../models/dashboard.model";
import {
  ConfigurationProfile,
  ConfigurationParameter,
} from "../../models/configuration.model";
import { SampleType } from "../../models/sampleType.model";
import { UserWithDepartment } from "../../models/userWithDepartment.model";
import {
  IncidentCause,
  IncidentFrequency,
  IncidentSeverity,
  InsuranceRecoveredThrough,
  RiskCategory,
} from "../../models/general.model";
import { UserModule } from "../../models/user-module.model";

import { Organization } from "../../models/organization.model";
import { UtilityService } from "../utility/utility.service";
import { LogService } from "../log/log.service";
import { ChevronSerial, DashboardSummary, PORequest } from "../../models/atk.model";
import { environment } from "src/environments/environment";

declare function unescape(s: string): string;
declare function escape(s: string): string;

@Injectable()
export class MappingService {
  deparment: Department = new Department();
  // rating: RiskRating = new RiskRating();

  constructor(
    private _utilityService: UtilityService,
    private datePipe: DatePipe,
    private _logService: LogService
  ) { }

  public mapUser(res: any): User {
    const userData = res ? res : null;
    const isUser = new User();
    if (userData) {
      isUser.id = userData.id || null;
      isUser.userId = userData.id || null;
      isUser.userName = userData.username || null;
      isUser.firstName = userData.firstName || null;
      isUser.lastName = userData.lastName || null;
      isUser.email = userData.email || null;
      isUser.code = userData.code || null;

      isUser.password = "" || null;
      isUser.bashPassword = userData.password || null;

      isUser.mobile = userData.mobile || null;
      // isUser.phoneNumber = userData.phoneNumber || null;
      // isUser.cnic = userData.cnic || null;

      isUser.organizationId = userData.organizationId || null;
      isUser.organization = userData.organization || null;

      isUser.grossCategory = userData.grossCategory || null

      // // isUser.organizationId = userData.organizationId || null;
      // isUser.organizationId = userData.organizationId || (userData.organization ? userData.organization.id : null) || null;
      // // isUser.organization = userData.organization || null;
      // isUser.organization = this.mapOrganization(userData.organization);

      // isUser.groupId = userData.groupId || null;
      isUser.groupId =
        userData.groupId || (userData.group ? userData.group.id : null) || null;
      // isUser.group = userData.group || null;
      isUser.group = this.mapGroup(userData.group);

      // isUser.departmentId = userData.departmentId || null;
      isUser.departmentId =
        userData.departmentId ||
        (userData.department ? userData.department.id : null) ||
        null;
      // isUser.department = userData.department || null;
      isUser.department = this.mapDepartment(userData.department);

      // isUser.unitId = userData.unitId || null;
      isUser.unitId =
        userData.unitId || (userData.unit ? userData.unit.id : null) || null;
      // isUser.unit = userData.unit || null;
      isUser.unit = this.mapUnit(userData.unit);

      // isUser.designationId = userData.designationId || null;
      // isUser.designation = userData.designation || null;

      // isUser.designationId = userData.designationId || null;
      isUser.designationId =
        userData.designationId ||
        (userData.designation ? userData.designation.id : null) ||
        null;
      // isUser.designation = userData.designation || null;
      isUser.designation = this.mapDesignation(userData.designation);

      isUser.notificationGroup = userData.notificationGroups || null;

      let array = isUser.notificationGroup
        ? isUser.notificationGroup.split(",")
        : [];

      if (array && array.length > 0) {
        array.forEach((element) => {
          isUser.notificationGroups.push(element);
        });
      }

      // User Roles mapping
      isUser.roleIds = [];
      isUser.roles = [];
      // isUser.userRoles = userData.userRoles || [];
      isUser.userRoles = [];
      if (userData.userRoles && userData.userRoles.length > 0) {
        userData.userRoles.forEach((element) => {
          // isUser.userRoles.push(this.mapUserRole(element));
          let userRole: UserRole = this.mapUserRole(element);
          isUser.userRoles.push(userRole);
          if (userRole.roleId) {
            isUser.roleIds.push(userRole.roleId);
            isUser.roles.push(userRole.role);
          }
        });
      }

      isUser.roleId = isUser.roleIds.length > 0 ? isUser.roleIds[0] : null;
      isUser.role = isUser.roles.length > 0 ? isUser.roles[0] : new Role();

      // User Organizations mapping
      isUser.organizationIds = [];
      isUser.organizations = [];
      isUser.userOrganizations = [];
      if (userData.userOrganizations && userData.userOrganizations.length > 0) {
        userData.userOrganizations.forEach((element) => {
          let userOrganization: UserOrganization = this.mapUserOrganization(element);
          isUser.userOrganizations.push(userOrganization);
          if (userOrganization.organizationId) {
            this._logService.logMessage("InsideMapper")
            isUser.organizationIds.push(userOrganization.organizationId);
            isUser.organizations.push(userOrganization.organization);
          }
        });
      }
      isUser.userOrganizations = userData.userOrganizations || [];

      // User Groups mapping
      isUser.groupIds = [];
      isUser.groups = [];
      isUser.userGroups = [];
      if (userData.userGroups && userData.userGroups.length > 0) {
        userData.userGroups.forEach((element) => {
          let userGroup: UserGroup = this.mapUserGroup(element);
          isUser.userGroups.push(userGroup);
          if (userGroup) {
            this._logService.logMessage("InsideMapper")
            isUser.groupIds.push(userGroup.groupId);
            isUser.groups.push(userGroup.group);
          }
        });
      }
      isUser.userGroups = userData.userGroups || [];

      // isUser.userPermissions = userData.userPermissions || [];
      isUser.userPermissions = [];
      if (userData.userPermissions && userData.userPermissions.length > 0) {
        userData.userPermissions.forEach((element) => {
          isUser.userPermissions.push(this.mapUserPermission(element));
        });
      }

      isUser.navigationItemIds = [];
      isUser.navigationItems = [];
      // isUser.userNavigations = userData.userNavigations || [];
      isUser.userNavigations = [];
      if (userData.userNavigations && userData.userNavigations.length > 0) {
        userData.userNavigations.forEach((element) => {
          // isUser.userNavigations.push(this.mapUserNavigation(element));
          let userNavigation: UserNavigation = this.mapUserNavigation(element);
          isUser.userNavigations.push(userNavigation);
          if (userNavigation.navigationItemId) {
            isUser.navigationItemIds.push(userNavigation.navigationItemId);
            isUser.navigationItems.push(userNavigation.navigationItem);
          }
        });
      }

      isUser.userNavigations = userData.userNavigations || [];

      // isUser.roleId = userData.roleId || null;
      // isUser.role = userData.role || null;

      isUser.userRoles = userData.userRoles || [];

      isUser.verified = userData.verified || false;
      isUser.locked = userData.locked || false;

      // isUser.profilePicture = userData.profilePicture || null;

      // isUser.profilePictureId = userData.profilePictureId || null;
      isUser.profilePictureId =
        userData.profilePictureId ||
        (userData.profilePicture ? userData.profilePicture.id : null) ||
        null;
      // isUser.profilePicture = userData.profilePicture || null;
      isUser.profilePicture = this.mapDocument(userData.profilePicture);

      if (isUser.profilePictureId && !isUser.profilePicture.id) {
        isUser.profilePicture.id = isUser.profilePictureId;
        // isUser.profilePicture.documentUrl = environment.apiBaseUrl + "document/download/" + isUser.profilePictureId;
        isUser.profilePicture.documentUrl =
          environment.apiBaseUrl +
          "document/download/" +
          isUser.profilePictureId;
      }

      // isUser.userProfessionalProfileId = userData.professionalProfileId || null;
      isUser.userProfessionalProfileId =
        userData.professionalProfileId ||
        (userData.professionalProfile
          ? userData.professionalProfile.id
          : null) ||
        null;
      // isUser.userProfessionalProfile = userData.professionalProfile || null;
      isUser.userProfessionalProfile = this.mapUserProfessionalProfile(
        userData.professionalProfile
      );

      // isUser.isActive = userData.isActive || false;
      isUser.isActive = userData.active || false;
      isUser.active = userData.active ? 1 : 0;

      // isUser.statusId = userData.statusId || null;
      // isUser.status = userData.status || null;
      // isUser.status = userData.status || false;
      isUser.status = userData.active || false;
      isUser.statusValue = isUser.status ? "Active" : "Inactive";

      isUser.userModuleIds = [];
      isUser.userModules = [];
      isUser.modules = [];
      if (userData.userModules && userData.userModules.length > 0) {
        userData.userModules.forEach((element) => {
          let module: Module = this.mapModule(element);
          isUser.modules.push(module);
          if (module.userModuleId) {
            isUser.userModuleIds.push(module.userModuleId);
            isUser.userModules.push(module.userModule);
          }
        });
      }
      isUser.nic = userData.nic || null;
      isUser.ntn = userData.ntn || null;


    }

    return isUser;
  }

  public mapUserMini(res: any): UserMini {
    const userData = res ? res : null;
    const isUser = new UserMini();
    if (userData) {
      isUser.id = userData.id || null;
      isUser.userId = userData.id || null;
      isUser.userName = userData.username || null;
      isUser.firstName = userData.firstName || null;
      isUser.lastName = userData.lastName || null;
      isUser.fullName = userData.firstName + " " + userData.lastName || null;

      isUser.groupName = userData.group || null;
      isUser.departmentName = userData.department || null;
      isUser.unitName = userData.unit || null;
      isUser.rolesName = userData.roles || null;

      // isUser.createdOn = userData.createdOn || null;
      isUser.createdOn = userData.createdOn
        ? this.datePipe.transform(userData.createdOn, "yyyy-MM-dd")
        : null;

      isUser.loginBlocked = userData.loginBlocked || false;
      // isUser.loginBlockedOn = userData.loginBlockedOn || null;
      isUser.loginBlockedOn = userData.loginBlockedOn
        ? this.datePipe.transform(userData.loginBlockedOn, "yyyy-MM-dd")
        : null;

      // isUser.lastActiveOn = userData.lastActiveOn || null;
      isUser.lastActiveOn = userData.lastActiveOn
        ? this.datePipe.transform(userData.lastActiveOn, "yyyy-MM-dd")
        : null;

      isUser.status = userData.active || false;
      isUser.statusValue = isUser.status ? "Active" : "Inactive";

      // isUser.rightsModificationDate = userData.rightsModificationDate || null;
      // isUser.rightsModificationDate = userData.rightsModificationDate ? this.datePipe.transform(userData.rightsModificationDate, 'yyyy-MM-dd') : null;
      isUser.rightsModificationDate =
        userData.rightsModificationDate &&
          userData.rightsModificationDate != "0001-01-01T00:00:00"
          ? this.datePipe.transform(
            userData.rightsModificationDate,
            "yyyy-MM-dd"
          )
          : null;

      isUser.email = userData.email || null;
      isUser.code = userData.code || null;
      isUser.verified = userData.verified || false;
    }

    return isUser;
  }

  public mapUserRole(res: any): UserRole {
    const userRoleData = res;
    const isUserRole = new UserRole();
    if (userRoleData) {
      isUserRole.id = userRoleData.id || null;
      isUserRole.userRoleId = userRoleData.userRoleId || null;
      isUserRole.roleId =
        userRoleData.roleId ||
        (userRoleData.role ? userRoleData.role.id : null) ||
        null;
      isUserRole.role = this.mapRole(userRoleData.role);
    }
    return isUserRole;
  }

  public mapUserOrganization(res: any): UserOrganization {
    const userOrganizationData = res;
    const isUserOrganization = new UserOrganization();
    if (userOrganizationData) {
      isUserOrganization.id = userOrganizationData.id || null;
      isUserOrganization.userOrganizationId = userOrganizationData.userOrganizationId || null;
      isUserOrganization.organizationId =
        userOrganizationData.organizationId ||
        (userOrganizationData.organization ? userOrganizationData.organization.id : null) ||
        null;
      isUserOrganization.organization = this.mapOrganization(userOrganizationData.organization);
    }
    return isUserOrganization;
  }

  public mapUserGroup(res: any): UserGroup {
    const userGroupData = res;
    const isUserGroup = new UserGroup();
    if (userGroupData) {
      isUserGroup.id = userGroupData.id || null;
      isUserGroup.userGroupId = userGroupData.userGroupId || null;
      isUserGroup.groupId =
        userGroupData.groupId ||
        (userGroupData.group ? userGroupData.group.id : null) ||
        null;
      isUserGroup.group = this.mapGroup(userGroupData.group);
    }
    return isUserGroup;
  }

  public mapUserPermission(res: any): UserPermission {
    const userPermissionData = res;
    const isUserPermission = new UserPermission();
    if (userPermissionData) {
      isUserPermission.id =
        userPermissionData.id || userPermissionData.userPermissionId || null;
      isUserPermission.userPermissionId =
        userPermissionData.id || userPermissionData.userPermissionId || null;
      isUserPermission.permissionId =
        userPermissionData.permissionId ||
        (userPermissionData.permission
          ? userPermissionData.permission.id
          : null) ||
        null;
      isUserPermission.permission = this.mapPermission(
        userPermissionData.permission
      );
    }

    return isUserPermission;
  }

  public mapUserNavigation(res: any): UserNavigation {
    const userNavigationData = res;
    const isUserNavigation = new UserNavigation();
    if (userNavigationData) {
      isUserNavigation.id =
        userNavigationData.id || userNavigationData.userNavigationId || null;
      isUserNavigation.userNavigationId =
        userNavigationData.id || userNavigationData.userNavigationId || null;
      isUserNavigation.operation = userNavigationData.operation || null;
      isUserNavigation.navigationItemId =
        userNavigationData.navigationItemId ||
        (userNavigationData.navigationItem
          ? userNavigationData.navigationItem.id
          : null) ||
        null;
      isUserNavigation.navigationItem = this.mapNavigationItem(
        userNavigationData.navigationItem
      );
    }

    return isUserNavigation;
  }

  public mapUserProfessionalProfile(res: any): UserProfessionalProfile {
    const resData = res ? res : null;
    const isMapData = new UserProfessionalProfile();
    if (resData) {
      isMapData.id = resData.id || null;
      isMapData.userProfessionalProfileId = resData.id || null;

      isMapData.experience = resData.experience || null;
      isMapData.expertise = resData.expertise || null;
      isMapData.qualification = resData.qualification || null;

      // isMapData.active = resData.active || false;

      isMapData.isActive = resData.active || false;

      // isMapData.createdBy = resData.createdBy || null;
      isMapData.createdBy =
        resData.createdBy ||
        (resData.createdByUser ? resData.createdByUser.id : null) ||
        null;
      // isMapData.createdByUser = resData.createdByUser || null;
      isMapData.createdByUser = this.mapUserMini(resData.createdByUser);

      // isMapData.createdOn = resData.createdOn || null;
      isMapData.createdOn = resData.createdOn
        ? this.datePipe.transform(resData.createdOn, "yyyy-MM-dd")
        : null;

      // isMapData.updatedBy = resData.updatedBy || null;
      isMapData.updatedBy =
        resData.updatedBy ||
        (resData.updatedByUser ? resData.updatedByUser.id : null) ||
        null;
      // isMapData.updatedByUser = resData.updatedByUser || null;
      isMapData.updatedByUser = this.mapUserMini(resData.updatedByUser);

      // isMapData.updatedOn = resData.updatedOn || null;
      isMapData.updatedOn = resData.updatedOn
        ? this.datePipe.transform(resData.updatedOn, "yyyy-MM-dd")
        : null;
    }

    return isMapData;
  }

  public mapRole(res: any): Role {
    const roleData = res;
    const isRole = new Role();
    if (roleData) {
      isRole.id = roleData.id || roleData.roleId || null;
      isRole.roleId = roleData.id || roleData.roleId || null;
      isRole.name = roleData.name || null;
      isRole.key = roleData.key || null;
      isRole.code = roleData.code || null;
      isRole.description = roleData.description || null;
      isRole.priority = roleData.priority || null;
      isRole.active = roleData.active || null;

      isRole.userRoleId = roleData.userRoleId || null;
      // isRole.departmentId = roleData.departmentId || null;

      isRole.permissions = [];
      if (roleData.permissions && roleData.permissions.length > 0) {
        roleData.permissions.forEach((element) => {
          isRole.permissions.push(this.mapPermission(element));
        });
      }
    }

    return isRole;
  }

  public mapPermission(res: any): Permission {
    const permissionData = res;
    const isPermission = new Permission();
    if (permissionData) {
      isPermission.id =
        permissionData.id || permissionData.permissionId || null;
      isPermission.permissionId =
        permissionData.id || permissionData.permissionId || null;
      isPermission.key = permissionData.key || null;
      isPermission.name = permissionData.name || null;
      isPermission.code = permissionData.code || null;
      isPermission.description = permissionData.description || null;
      isPermission.type = permissionData.type || null;
      isPermission.accessUrl = permissionData.accessUrl || null;

      // isPermission.userRolePermissionId = permissionData.userRolePermissionId || null;
      isPermission.rolePermissionId = permissionData.rolePermissionId || null;
    }

    return isPermission;
  }

  public mapNavigationItem(res: any): NavigationItem {
    const navigationItemData = res;
    const isNavigationItem = new NavigationItem();
    if (navigationItemData) {
      isNavigationItem.id =
        navigationItemData.id || navigationItemData.navigationItemId || null;
      isNavigationItem.navigationItemId =
        navigationItemData.id || navigationItemData.navigationItemId || null;
      isNavigationItem.key = navigationItemData.key || null;
      isNavigationItem.name = navigationItemData.name || null;
      isNavigationItem.code = navigationItemData.code || null;
      isNavigationItem.description = navigationItemData.description || null;
      isNavigationItem.type = navigationItemData.type || null;
      isNavigationItem.icon = navigationItemData.icon || null;
      isNavigationItem.parentId = navigationItemData.parentId || 0;
      isNavigationItem.applicationType =
        navigationItemData.applicationType || null;
      isNavigationItem.pageUrl = navigationItemData.pageUrl || null;
      isNavigationItem.sortOrder = navigationItemData.sortOrder || null;

      // isNavigationItem.userRoleNavigationId = navigationItemData.userRoleNavigationId || null;
      isNavigationItem.roleNavigationId =
        navigationItemData.roleNavigationId || null;
    }

    return isNavigationItem;
  }

  // public mapCountry(res: any): Country {
  //     const countryData = res;
  //     const isCountry = new Country();
  //     if (countryData) {
  //         isCountry.id = countryData.id || null;
  //         isCountry.countryId = countryData.id || null;
  //         isCountry.countryName = countryData.countryName || null;
  //         isCountry.countryCode = countryData.countryCode || null;
  //     }

  //     return isCountry;
  // }

  // public mapState(res: any): State {
  //     const stateData = res;
  //     const isState = new State();
  //     if (stateData) {
  //         isState.id = stateData.id || null;
  //         isState.stateId = stateData.id || null;
  //         isState.stateName = stateData.stateName || null;
  //         isState.stateCode = stateData.stateCode || null;
  //         isState.countryId = stateData.countryId || null;
  //     }

  //     return isState;
  // }

  // public mapCity(res: any): City {
  //     const cityData = res;
  //     const isCity = new City();
  //     if (cityData) {
  //         isCity.id = cityData.cityId || null;
  //         isCity.cityId = cityData.cityId || null;
  //         isCity.cityName = cityData.cityName || null;
  //         isCity.cityCode = cityData.cityCode || null;
  //         isCity.stateId = cityData.stateId || null;
  //     }

  //     return isCity;
  // }

  public mapDesignation(res: any): Designation {
    const designationData = res;
    const isDesignation = new Designation();
    if (designationData) {
      isDesignation.id = designationData.id || designationData.roleId || null;
      isDesignation.designationId =
        designationData.id || designationData.roleId || null;
      isDesignation.name = designationData.name || null;
      isDesignation.key = designationData.key || null;
      isDesignation.code = designationData.code || null;
      isDesignation.description = designationData.description || null;
      isDesignation.active = designationData.active || null;
    }

    return isDesignation;
  }

  public mapDepartment(res: any): Department {
    const departmentData = res;
    const isDepartment = new Department();
    if (departmentData) {
      isDepartment.id = departmentData.id || departmentData.roleId || null;
      isDepartment.departmentId =
        departmentData.id || departmentData.roleId || null;
      isDepartment.name = departmentData.name || null;
      isDepartment.key = departmentData.key || null;
      isDepartment.code = departmentData.code || null;

      // isDepartment.groupId = departmentData.groupId || 0;
      isDepartment.groupId =
        departmentData.groupId ||
        (departmentData.group ? departmentData.group.id : null) ||
        null;
      isDepartment.group = this.mapGroup(departmentData.group);
      // isDepartment.groupName = departmentData.group ? departmentData.group.name : null;

      isDepartment.description = departmentData.description || null;
      isDepartment.active = departmentData.active || null;
      isDepartment.auditTypeIds = [];
      if (departmentData.auditTypes && departmentData.auditTypes.length > 0) {
        departmentData.auditTypes.forEach((element) => {
          // isUser.userRoles.push(this.mapUserRole(element));
          // let auditType: AuditType = this.mapAuditType(element);
          isDepartment.auditTypeIds.push(element.auditTypeId);
          isDepartment.auditTypes.push(element);
          // if (auditType.id) {
          //     isDepartment.auditTypeIds.push(auditType);
          // }
        });
      }
    }

    return isDepartment;
  }

  public mapPurchaseDepartment(res: any): PurchaseDepartment {
    const resData = res;
    const isMapData = new PurchaseDepartment();
    if (resData) {
      isMapData.id = resData.id || resData.purchaseDepartmentId || null;
      isMapData.purchaseDepartmentId =
        resData.id || resData.purchaseDepartmentId || null;
      isMapData.name = resData.name || null;
      isMapData.key = resData.key || null;
      isMapData.code = resData.code || null;
      isMapData.description = resData.description || null;
      isMapData.active = resData.active || null;
    }

    return isMapData;
  }

  public mapUnit(res: any): Unit {
    const unitData = res;
    const isUnit = new Unit();
    if (unitData) {
      isUnit.id = unitData.id || unitData.roleId || null;
      isUnit.unitId = unitData.id || unitData.roleId || null;
      isUnit.name = unitData.name || null;
      isUnit.key = unitData.key || null;
      isUnit.code = unitData.code || null;

      // isUnit.departmentId = unitData.departmentId || null;
      isUnit.departmentId =
        unitData.departmentId ||
        (unitData.department ? unitData.department.id : null) ||
        null;
      isUnit.department = this.mapDepartment(unitData.department) || null;
      // isUnit.department = this.mapDepartment(unitData.department);
      // isUnit.departmentName = isUnit.department.name || null;

      isUnit.description = unitData.description || null;

      isUnit.cityAuditSegment = unitData.cityAuditSegment || null;
      isUnit.categoryLocation = unitData.categoryLocation || null;
      isUnit.depositInMillions = unitData.depositInMillions || null;
      isUnit.noOfCustomers = unitData.noOfCustomers || null;
      isUnit.volumeMateriality = unitData.volumeMateriality || null;
      isUnit.operationalComplexity = unitData.operationalComplexity || null;
      isUnit.fraudsComplaintsService = unitData.fraudsComplaints || null;
      isUnit.automatedManualControls = unitData.automatedManualControls || null;
      isUnit.systemProcessChanges = unitData.systemProcessChange || null;

      isUnit.leadershipStaffingTurnover =
        unitData.leadershipStaffingTurnOver || null;
      isUnit.auditCycleInDays = unitData.auditCycleInDays || null;

      // isUnit.auditCycleId = unitData.auditCycleId || null;
      isUnit.auditCycleId =
        unitData.auditCycleId ||
        (unitData.auditCycle ? unitData.auditCycle.id : null) ||
        null;
      // isUnit.auditCycle = this.mapAuditCycle(unitData.auditCycle);
      // isUnit.auditCycleName = isUnit.auditCycle.name || null;

      // isUnit.nextAuditFieldWorkDate = unitData.nextAuditFieldWorkDate || null;
      isUnit.nextAuditFieldWorkDate = unitData.nextAuditFieldWorkDate
        ? this.datePipe.transform(unitData.nextAuditFieldWorkDate, "yyyy-MM-dd")
        : null;
      isUnit.nextAuditFieldWorkDateNew =
        unitData.nextAuditFieldWorkDate || null;

      // isUnit.previousAuditFieldWorkEndDate = unitData.previousAuditFieldWorkEndDate || null;
      isUnit.previousAuditFieldWorkEndDate =
        unitData.previousAuditFieldWorkEndDate
          ? this.datePipe.transform(
            unitData.previousAuditFieldWorkEndDate,
            "yyyy-MM-dd"
          )
          : null;

      isUnit.shariaRating = unitData.shariaRating || null;

      isUnit.plannedRegularShariaAudit = unitData.regularShariaAudit || false;
      isUnit.plannedRegularShariaAuditValue = unitData.regularShariaAudit
        ? "Yes"
        : "No";

      isUnit.pabxNumber = unitData.pabxNumber || null;

      isUnit.atm = unitData.atm || false;
      isUnit.atmValue = unitData.atm ? "Yes" : "No";

      isUnit.onSite = unitData.onSiteATM || false;
      isUnit.onSiteValue = unitData.onSiteATM ? "Yes" : "No";

      isUnit.offSite = unitData.offSiteATM || false;
      isUnit.offSiteValue = unitData.offSiteATM ? "Yes" : "No";

      isUnit.atmID = unitData.atmId || null;
      // isUnit.atmInstallationDate = unitData.atmInstallationDate || null;
      isUnit.atmInstallationDate = unitData.atmInstallationDate
        ? this.datePipe.transform(unitData.atmInstallationDate, "yyyy-MM-dd")
        : null;

      // isUnit.branchOpeningDate = unitData.branchOpeningDate || null;
      isUnit.branchOpeningDate = unitData.branchOpeningDate
        ? this.datePipe.transform(unitData.branchOpeningDate, "yyyy-MM-dd")
        : null;

      isUnit.active = unitData.active || null;
    }

    return isUnit;
  }

  public mapGroup(res: any): Group {
    const groupData = res;
    const isGroup = new Group();
    if (groupData) {
      isGroup.id = groupData.id || groupData.roleId || null;
      isGroup.groupId = groupData.id || groupData.roleId || null;
      isGroup.name = groupData.name || null;
      isGroup.key = groupData.key || null;
      isGroup.code = groupData.code || null;
      isGroup.description = groupData.description || null;
      isGroup.active = groupData.active || null;
    }

    return isGroup;
  }

  public mapStatus(res: any): Status {
    const statusData = res;
    const isStatus = new Status();
    if (statusData) {
      isStatus.id = statusData.id || statusData.roleId || null;
      isStatus.statusId = statusData.id || statusData.roleId || null;
      isStatus.name = statusData.name || null;
      isStatus.key = statusData.key || statusData.code || null;
      isStatus.code = statusData.code || statusData.key || null;
      isStatus.of = statusData.of || null;
      isStatus.description = statusData.description || null;
      isStatus.active = statusData.active || null;
    }

    return isStatus;
  }

  public mapDocument(res: any): AttachDocument {
    // const userData = res.json().genericResponse.genericBody.data.userData;
    // const userData = res.json().genericBody.data.userData;

    // const userData = res.json();
    // const caseData = res.json().length > 0 ? res.json()[0] : null;
    const documentData = res ? res : null;
    let isDocument = new AttachDocument();
    if (documentData) {
      isDocument.id = documentData.id || null;
      isDocument.annexureLinkDocumentId =
        documentData.annexureLinkDocumentId || null;
      isDocument.feedbackDocumentId = documentData.documentId || null;
      isDocument.actionPlanDocumentId = documentData.documentId || null;
      isDocument.documentId = documentData.id || null;
      isDocument.documentUploadId = documentData.id || null;
      isDocument.documentOriginalName = documentData.fileName || "";
      isDocument.documentName = documentData.fileName || "";
      isDocument.fileName = documentData.fileName || "";
      isDocument.name = documentData.name || "";
      isDocument.documentExtension = documentData.extension || "";
      // isDocument.documentUrl = documentData.documentUrl || "";
      // isDocument.documentUrl = documentData.id ? environment.apiBaseUrl + "document/download/" + documentData.id : null;
      isDocument.documentUrl = documentData.id
        ? environment.apiBaseUrl + "document/download/" + documentData.id
        : null;

      isDocument.path = documentData.path || null;
      isDocument.size = documentData.size || null;
      isDocument.source = documentData.source || null;
      isDocument.checksum = documentData.checksum || null;
      isDocument.comments = documentData.comments || null;

      // isDocument.documentType = documentData.observationBelongTo.belongTo || "";
      isDocument.documentType = documentData.documentType || "";
      isDocument.documentTypeId = documentData.documentTypeId || null;
      isDocument.longValue = documentData.htmlText || "";
      isDocument.htmlText =
        documentData && documentData.htmlText
          ? decodeURIComponent(escape(window.atob(documentData.htmlText)))
          : null;
      const dob = [];
      // if (documentData.caseDocumentObservation && documentData.caseDocumentObservation.length > 0) {
      //     documentData.caseDocumentObservation.forEach(element => {
      //         dob.push(this.mapObservation(element));
      //     });

      // }
      // isDocument.observations = dob;
    }

    return isDocument;
  }

  public mapConfigurationProfile(res: any): ConfigurationProfile {
    const resData = res ? res : null;
    const isMapData = new ConfigurationProfile();
    if (resData) {
      isMapData.id = resData.id || null;
      isMapData.configurationProfileId = resData.id || null;

      isMapData.name = resData.name || null;
      isMapData.key = resData.key || null;
      isMapData.code = resData.code || null;
      isMapData.description = resData.description || null;
      isMapData.valueType = resData.type || null;
      isMapData.value = resData.value || null;

      let params = [];
      if (resData.parameters && resData.parameters.length > 0) {
        resData.parameters.forEach((element) => {
          let a = this.mapConfigurationParameter(element);
          params.push(a);
        });
      }

      isMapData.configurationParameters = params || [];

      // isMapData.active = resData.active || false;

      isMapData.isActive = resData.active || false;

      // isMapData.createdBy = resData.createdBy || null;
      isMapData.createdBy =
        resData.createdBy ||
        (resData.createdByUser ? resData.createdByUser.id : null) ||
        null;
      // isMapData.createdByUser = resData.createdByUser || null;
      isMapData.createdByUser = this.mapUserMini(resData.createdByUser);

      // isMapData.createdOn = resData.createdOn || null;
      isMapData.createdOn = resData.createdOn
        ? this.datePipe.transform(resData.createdOn, "yyyy-MM-dd")
        : null;

      // isMapData.updatedBy = resData.updatedBy || null;
      isMapData.updatedBy =
        resData.updatedBy ||
        (resData.updatedByUser ? resData.updatedByUser.id : null) ||
        null;
      // isMapData.updatedByUser = resData.updatedByUser || null;
      isMapData.updatedByUser = this.mapUserMini(resData.updatedByUser);

      // isMapData.updatedOn = resData.updatedOn || null;
      isMapData.updatedOn = resData.updatedOn
        ? this.datePipe.transform(resData.updatedOn, "yyyy-MM-dd")
        : null;
    }

    return isMapData;
  }

  public mapConfigurationParameter(res: any): ConfigurationParameter {
    const resData = res ? res : null;
    const isMapData = new ConfigurationParameter();
    if (resData) {
      isMapData.id = resData.id || null;
      isMapData.configurationParameterId = resData.id || null;

      isMapData.configurationProfileId = resData.profileId || null;

      isMapData.name = resData.name || null;
      isMapData.key = resData.key || null;
      isMapData.code = resData.code || null;
      isMapData.description = resData.description || null;
      isMapData.valueType = resData.type || null;
      isMapData.value = resData.value || null;

      // isMapData.active = resData.active || false;

      isMapData.isActive = resData.active || false;

      // isMapData.createdBy = resData.createdBy || null;
      isMapData.createdBy =
        resData.createdBy ||
        (resData.createdByUser ? resData.createdByUser.id : null) ||
        null;
      // isMapData.createdByUser = resData.createdByUser || null;
      isMapData.createdByUser = this.mapUserMini(resData.createdByUser);

      // isMapData.createdOn = resData.createdOn || null;
      isMapData.createdOn = resData.createdOn
        ? this.datePipe.transform(resData.createdOn, "yyyy-MM-dd")
        : null;

      // isMapData.updatedBy = resData.updatedBy || null;
      isMapData.updatedBy =
        resData.updatedBy ||
        (resData.updatedByUser ? resData.updatedByUser.id : null) ||
        null;
      // isMapData.updatedByUser = resData.updatedByUser || null;
      isMapData.updatedByUser = this.mapUserMini(resData.updatedByUser);

      // isMapData.updatedOn = resData.updatedOn || null;
      isMapData.updatedOn = resData.updatedOn
        ? this.datePipe.transform(resData.updatedOn, "yyyy-MM-dd")
        : null;
    }

    return isMapData;
  }

  public mapNotification(res: any): Notification {
    const resData = res ? res : null;
    const isMapData = new Notification();
    if (resData) {
      isMapData.id = resData.id || null;

      isMapData.for = resData.for || null;
      isMapData.text = resData.text || null;
      isMapData.generatedBy = resData.generatedBy || null;
      isMapData.data = resData.data || null;

      let obj = isMapData.data ? JSON.parse(isMapData.data) : null;

      isMapData.notificationData = [];
      if (obj && typeof obj === "object") {
        for (let x in obj) {
          let nd: NotificationData = new NotificationData();
          nd.key = x ? x.charAt(0).toUpperCase() + x.substr(1) : null;
          nd.value = obj[x] || null;

          isMapData.notificationData.push(nd);
        }
      }

      // isMapData.time = resData.time || null;
      isMapData.time = resData.time
        ? this.datePipe.transform(resData.time, "yyyy-MM-dd")
        : null;
      isMapData.createdDate = resData.createdOn
        ? this.datePipe.transform(resData.createdOn, "yyyy-MM-dd")
        : null;

      isMapData.seen = resData.seen || false;
    }

    return isMapData;
  }

  public mapUserWithDepartment(res: any): UserWithDepartment {
    const resData = res;
    const isMapData = new UserWithDepartment();
    if (resData) {
      isMapData.id = resData.id || null;
      isMapData.userId = resData.id || null;

      isMapData.name = resData.name || null;
      isMapData.roles = resData.roles || null;
      isMapData.department = resData.department || null;
      isMapData.loginToday = resData.loginToday || false;
      isMapData.loginTodayValue = isMapData.loginToday ? "Yes" : "No";
      isMapData.lastLogin = resData.lastLogin || null;

      // // isMapData.suggestedDate = resData.suggestedDate || null;
      // isMapData.suggestedDate = resData.suggestedDate ? this.datePipe.transform(resData.suggestedDate, 'yyyy-MM-dd') : null;
    }

    return isMapData;
  }

  public mapUserEngagementQuarterWise(res: any): UserEngagementQuarterWise {
    const resData = res || null;
    const isMapData = new UserEngagementQuarterWise();
    if (resData) {
      isMapData.user = resData.user || null;
      isMapData.count = resData.count || 0;

      isMapData.userEngagementYearWises = [];

      if (resData.yearwise && resData.yearwise.length > 0) {
        resData.yearwise.forEach((element) => {
          let a: UserEngagementYearWise =
            this.mapUserEngagementYearWise(element);
          isMapData.userEngagementYearWises.push(a);
        });
      }
    }

    return isMapData;
  }

  public mapDeptEngagementQuarterWise(res: any): DeptEngagementQuarterWise {
    const resData = res || null;
    const isMapData = new DeptEngagementQuarterWise();
    if (resData) {
      isMapData.department = resData.department || null;
      isMapData.count = resData.count || 0;

      isMapData.userEngagementYearWises = [];

      if (resData.yearwise && resData.yearwise.length > 0) {
        resData.yearwise.forEach((element) => {
          let a: UserEngagementYearWise =
            this.mapUserEngagementYearWise(element);
          isMapData.userEngagementYearWises.push(a);
        });
      }
    }

    return isMapData;
  }

  public mapUserEngagementYearWise(res: any): UserEngagementYearWise {
    const resData = res || null;
    const isMapData = new UserEngagementYearWise();
    if (resData) {
      isMapData.year = resData.year || null;
      isMapData.yearCount = resData.count || 0;

      if (resData.quaterWise && resData.quaterWise.length > 0) {
        resData.quaterWise.forEach((element) => {
          element && element.quarter == 1
            ? (isMapData.quarter1 = element.quarter || null)
            : null;
          element && element.quarter == 1
            ? (isMapData.quarter1Count = element.count || 0)
            : null;

          element && element.quarter == 2
            ? (isMapData.quarter2 = element.quarter || null)
            : null;
          element && element.quarter == 2
            ? (isMapData.quarter2Count = element.count || 0)
            : null;

          element && element.quarter == 3
            ? (isMapData.quarter3 = element.quarter || null)
            : null;
          element && element.quarter == 3
            ? (isMapData.quarter3Count = element.count || 0)
            : null;

          element && element.quarter == 4
            ? (isMapData.quarter4 = element.quarter || null)
            : null;
          element && element.quarter == 4
            ? (isMapData.quarter4Count = element.count || 0)
            : null;
        });
      }
    }

    return isMapData;
  }

  public mapRCSAStatusWise(res: any): RCSAStatusWise {
    const resData = res || null;
    const isMapData = new RCSAStatusWise();
    if (resData) {
      isMapData.statusId =
        resData.statusId || (resData.status ? resData.status.id : null) || null;
      isMapData.status = this.mapStatus(resData.status);
      isMapData.statusName =
        isMapData.status.name || resData.statusName || null;
      isMapData.statusKey =
        isMapData.status.key || resData.statusKey || resData.key || null;

      isMapData.count = resData.count || 0;
    }

    return isMapData;
  }

  public mapKriBreachYearMonthWise(res: any): KriBreachYearMonthWise {
    const resData = res || null;
    const isMapData = new KriBreachYearMonthWise();
    if (resData) {
      isMapData.departmentId =
        resData.departmentId ||
        (resData.department ? resData.department.id : null) ||
        null;
      isMapData.department = this.mapDepartment(resData.department);
      isMapData.departmentName = isMapData.department.name || null;

      isMapData.count = resData.count || 0;

      isMapData.kris = [];

      if (resData.krIs && resData.krIs.length > 0) {
        resData.krIs.forEach((element) => {
          let a: KriBreachYearMonthWiseData =
            this.mapKriBreachYearMonthWiseData(element);
          isMapData.kris.push(a);
        });
      }
    }

    return isMapData;
  }

  public mapKriBreachYearMonthWiseData(res: any): KriBreachYearMonthWiseData {
    const resData = res || null;
    const isMapData = new KriBreachYearMonthWiseData();
    if (resData) {
      // isMapData.date = resData.breachCount || 0;
      isMapData.dateYear =
        resData.date && resData.date.year ? resData.date.year : null;
      isMapData.dateMonth =
        resData.date && resData.date.month ? resData.date.month : null;
      // isMapData.dateMonthName = resData.date && resData.date.month && (resData.date.month > 0 && resData.date.month < 13) ? Config.monthNames[resData.date.month - 1] : null;

      isMapData.breachCount = resData.breachCount || 0;
      isMapData.kriCount = resData.kriCount || 0;
    }

    return isMapData;
  }

  public mapIncidentMonthWise(res: any): IncidentMonthWise {
    const resData = res || null;
    const isMapData = new IncidentMonthWise();
    if (resData) {
      // isMapData.date = resData.breachCount || 0;
      isMapData.dateYear =
        resData.date && resData.date.year ? resData.date.year : null;
      isMapData.dateMonth =
        resData.date && resData.date.month ? resData.date.month : null;

      var FirstDay =
        isMapData.dateYear && isMapData.dateMonth
          ? new Date(+isMapData.dateYear, isMapData.dateMonth - 1, 1)
          : null;

      isMapData.dateYearMonth = FirstDay
        ? this.datePipe.transform(FirstDay, "yyyy-MMM")
        : null;

      // isMapData.dateMonthName = resData.date && resData.date.month && (resData.date.month > 0 && resData.date.month < 13) ? Config.monthNames[resData.date.month - 1] : null;

      isMapData.count = resData.count || resData.incidentCount || 0;
      isMapData.incidentCount = resData.count || resData.incidentCount || 0;
    }

    return isMapData;
  }

  public mapDepartmentRiskWise(res: any): DepartmentRiskWise {
    const resData = res || null;
    const isMapData = new DepartmentRiskWise();
    if (resData) {
      isMapData.departmentId =
        resData.departmentId ||
        (resData.department ? resData.department.id : null) ||
        null;
      isMapData.department = this.mapDepartment(resData.department);
      isMapData.departmentName = isMapData.department.name || null;

      isMapData.count = resData.count || 0;

      isMapData.risks = [];

      if (resData.risks && resData.risks.length > 0) {
        resData.risks.forEach((element) => {
          let a: DepartmentRiskWiseData =
            this.mapDepartmentRiskWiseData(element);
          isMapData.risks.push(a);
        });
      }
    }

    return isMapData;
  }

  public mapDepartmentRiskWiseData(res: any): DepartmentRiskWiseData {
    const resData = res || null;
    const isMapData = new DepartmentRiskWiseData();
    if (resData) {
      isMapData.inherentLikelihood = resData.inherentLikelihood || 0;
      isMapData.departmentRiskWiseDataCount = resData.count || 0;
    }

    return isMapData;
  }

  public mapCaseStatusWise(res: any): CaseStatusWise {
    const resData = res || null;
    const isMapData = new CaseStatusWise();
    if (resData) {
      isMapData.statusId =
        resData.statusId || (resData.status ? resData.status.id : null) || null;
      isMapData.status = this.mapStatus(resData.status);
      isMapData.statusName =
        isMapData.status.name || resData.statusName || null;
      isMapData.statusKey =
        isMapData.status.key || resData.statusKey || resData.key || null;

      isMapData.count = resData.count || resData.caseCount || 0;
    }

    return isMapData;
  }

  public mapModule(res: any): Module {
    const userRoleData = res;
    const isUserRole = new Module();
    if (userRoleData) {
      isUserRole.id = userRoleData.id || userRoleData.userModuleId || null;
      isUserRole.moduleId =
        userRoleData.id || userRoleData.userModuleId || null;
      isUserRole.userModuleId =
        userRoleData.moduleId ||
        (userRoleData.module ? userRoleData.module.id : null) ||
        null;
      isUserRole.userModule = this.mapUserModule(userRoleData.module);
    }

    return isUserRole;
  }

  public mapUserModule(res: any): UserModule {
    const resData = res;
    const isMapData = new UserModule();
    if (resData) {
      isMapData.id = resData.id || null;
      isMapData.name = resData.name || null;
      isMapData.key = resData.key || null;
      isMapData.code = resData.code || null;
      isMapData.description = resData.description || null;
      isMapData.active = resData.active || null;
    }

    return isMapData;
  }

  public mapDocumentType(res: any): DocumentType {
    const resData = res ? res : null;
    let isMapData = new DocumentType();
    if (resData) {
      isMapData.id = resData.id || null;
      isMapData.name = resData.name || null;
      isMapData.code = resData.code || null;
      isMapData.required = resData.required || false;
    }

    return isMapData;
  }

  public mapOrganization(res: any): Organization {
    const resData = res ? res : null;
    let isMapData = new Organization();
    if (resData) {
      isMapData.id = resData.id;
      isMapData.name = resData.name || null;
      isMapData.key = resData.key || null;
      isMapData.description = resData.description || null;
      isMapData.active = resData.active || null;
      isMapData.createdBy = resData.createdBy || null;
      isMapData.createdOn =
        Date.parse(resData.createdOn).toString() != "NaN"
          ? this.datePipe.transform(resData.createdOn, "yyyy-MM-dd")
          : resData.createdOn || null;
      isMapData.isCreatedOn =
        Date.parse(resData.createdOn).toString() != "NaN" ? true : false;
      isMapData.updatedBy = resData.updatedBy || null;
      isMapData.updatedOn =
        Date.parse(resData.updatedOn).toString() != "NaN"
          ? this.datePipe.transform(resData.updatedOn, "yyyy-MM-dd")
          : resData.updatedOn || null;
      isMapData.isUpdatedOn =
        Date.parse(resData.isUpdatedOn).toString() != "NaN" ? true : false;

      // resData.users.forEach((element : any) => {
      //   isMapData.users.push(this.mapUser(element));
      // });
    }
    return isMapData;
  }

  public mapChevronSerial(res: any): ChevronSerial {
    const resData = res ? res : null;
    let isMapData = new ChevronSerial();
    if(resData) {
      isMapData.id = resData.id;
      isMapData.isActive = resData.isActive || null;
      isMapData.createdBy = resData.createdBy || null;
      isMapData.createdOn =
        Date.parse(resData.createdOn).toString() != "NaN"
          ? this.datePipe.transform(resData.createdOn, "yyyy-MM-dd")
          : resData.createdOn || null;
      isMapData.isCreatedOn =
        Date.parse(resData.createdOn).toString() != "NaN" ? true : false;
      isMapData.updatedBy = resData.updatedBy || null;
      isMapData.updatedOn =
        Date.parse(resData.updatedOn).toString() != "NaN"
          ? this.datePipe.transform(resData.updatedOn, "yyyy-MM-dd")
          : resData.updatedOn || null;
      isMapData.isUpdatedOn =
        Date.parse(resData.isUpdatedOn).toString() != "NaN" ? true : false;

      isMapData.serialNo = resData.serialNo || null;
      isMapData.smsCode = resData.smsCode || null;
      isMapData.qrCode = resData.qrCode || null;
      isMapData.isPrinted = resData.isPrinted || null;
      isMapData.printDate = resData.printDate || null;
      isMapData.isDelivered = resData.isDelivered || null;
      isMapData.deliverDate = resData.deliverDate || null;
      isMapData.isApplied = resData.isApplied || null;
      isMapData.applyDate = resData.applyDate || null;
      isMapData.isScanned = resData.isScanned || null;
      isMapData.scanDate = resData.scanDate || null;
      isMapData.isDestroyed = resData.isDestroyed || null;
      isMapData.destoryDate = resData.destoryDate || null;
    }
    return isMapData;
  }

  public mapPORequest(res: any): PORequest {
    const resData = res ? res : null;
    let isMapData = new PORequest();
    if(resData) {
      isMapData.id = resData.id;
      isMapData.isActive = resData.isActive || null;
      isMapData.createdBy = resData.createdBy || null;
      isMapData.createdOn =
        Date.parse(resData.createdOn).toString() != "NaN"
          ? this.datePipe.transform(resData.createdOn, "yyyy-MM-dd")
          : resData.createdOn || null;
      isMapData.isCreatedOn =
        Date.parse(resData.createdOn).toString() != "NaN" ? true : false;
      isMapData.updatedBy = resData.updatedBy || null;
      isMapData.updatedOn =
        Date.parse(resData.updatedOn).toString() != "NaN"
          ? this.datePipe.transform(resData.updatedOn, "yyyy-MM-dd")
          : resData.updatedOn || null;
      isMapData.isUpdatedOn =
        Date.parse(resData.isUpdatedOn).toString() != "NaN" ? true : false;

      isMapData.status = resData.status || null;
      isMapData.chevronPONo = resData.chevronPONo || null;
      isMapData.quantity = resData.quantity || null;
      isMapData.priceOfLabel = resData.priceOfLabel || null;
      isMapData.notes = resData.notes || null;
      isMapData.deliveryDate = resData.deliveryDate || null;
      isMapData.dateAdded = resData.dateAdded || null;
      isMapData.deliveredOn = resData.deliveredOn || null;
      isMapData.cancelDate = resData.cancelDate || null;
      isMapData.codesFile = resData.codesFile || null;
      isMapData.printedCodesFile = resData.printedCodesFile || null;
    } 
    return isMapData;
  }

  public mapDashboardSummary(res: any) : DashboardSummary {
    const resData = res ? res : null;
    let isMapData = new DashboardSummary
    if(resData) {
      isMapData.id = resData.id
      isMapData.scannedOn = resData.scannedOn || null;
      isMapData.scanMethod = resData.scanMethod || null;
      isMapData.scanData = resData.scanData || null;
      isMapData.scanResult = resData.scanResult || null;
      isMapData.mobileNo = resData.mobileNo || null;
      isMapData.addInfo = resData.addInfo || null;
      isMapData.serialNo = resData.serialNo || null;
      isMapData.smsCode = resData.smsCode || null;
      isMapData.qrCode = resData.qrCode || null;
      isMapData.printDate = resData.printDate || null;
      isMapData.deliverDate = resData.deliverDate || null;
      isMapData.applyDate = resData.applyDate || null;
      isMapData.scanDate = resData.scanDate || null;
      isMapData.productId = resData.productId || null;
      isMapData.batchId = resData.batchId || null;
      isMapData.lineId = resData.lineId || null;
      isMapData.productName = resData.productName || null;
      isMapData.scanLoc = resData.latitude != null && resData.longitude != null ? 
      `${ resData.latitude.toFixed(2) }, ${ resData.longitude.toFixed(2) }` : null;
      isMapData.scanLocation = resData.latitude != null && resData.longitude != null ? 
      `https://maps.google.com/?q=${ resData.latitude },${ resData.longitude }` : null;
    }
    return isMapData;
  }
}
