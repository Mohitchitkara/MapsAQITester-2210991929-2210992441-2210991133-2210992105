enum NotificationType {
    ERROR,
    WARNING,
    NOTIFICATION,
    PROCESSING,
}

export default interface RootNotificationModelDataInterface {
    id: string;
    type: NotificationType;
    message: string;
    isProcessing: boolean;
    action?: () => void;
}
