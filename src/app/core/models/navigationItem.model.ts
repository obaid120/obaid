export class NavigationItem {

    id: number;
    navigationItemId: number;

    parentId: number;
    // parentObject: NavigationItem = new NavigationItem();

    key: string;
    name: string;
    code: string;
    type: string;
    applicationType: string;
    tooltip: string;
    icon: string;
    description: string;
    pageUrl: string;
    sortOrder: number;

    navigationTypeId: number;
    navigationType: NavigationType = new NavigationType();

    // userRoleNavigationId: number;
    roleNavigationId: number;
    // userRoleNavigationItemId: number;
    roleNavigationItemId: number;

    value: string;
    root: boolean = false;
    isChecked: boolean = false;
    isDisabled: boolean = false;
    selected: boolean;

}


export class NavigationType {

    id: number;
    navigationTypeId: number;
    key: string;
    name: string;
    code: string;
    description: string;

}