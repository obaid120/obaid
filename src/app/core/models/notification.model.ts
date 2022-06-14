export class Notification {
    id: number;
    for: string;
    text: string;
    generatedBy: string;
    data: string;
    notificationData: NotificationData[] = [];

    // time: Date;
    time: string;
    createdDate: string;

    seen: boolean = false;
}

export class NotificationData {
    key: string;
    value: string;
}