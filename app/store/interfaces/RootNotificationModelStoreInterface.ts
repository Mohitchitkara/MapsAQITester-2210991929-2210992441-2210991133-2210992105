import RootNotificationModelDataInterface from "@/app/models/interfaces/RootNotificationModelDataInterface";

export default interface RootNotificationModelStoreInterface {
    notifications: Array<RootNotificationModelDataInterface>;
    addNotification: (notification: RootNotificationModelDataInterface) => void;
    removeNotification: (id: string) => void;
    popNotification: () => void;
}
