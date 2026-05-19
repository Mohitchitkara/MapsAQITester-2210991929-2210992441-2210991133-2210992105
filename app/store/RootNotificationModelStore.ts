import { create } from "zustand";
import RootNotificationModelStoreInterface from "./interfaces/RootNotificationModelStoreInterface";
import RootNotificationModelDataInterface from "../models/interfaces/RootNotificationModelDataInterface";

const useRootNotificationStore = create<RootNotificationModelStoreInterface>(
    (set) => ({
        notifications: [],
        addNotification: (notification: RootNotificationModelDataInterface) =>
            set((state) => ({
                notifications: [...state.notifications, notification],
            })),
        removeNotification: (id: string) =>
            set((state) => ({
                notifications: state.notifications.filter(
                    (notification) => notification.id !== id,
                ),
            })),
        popNotification: () => set((state) => ({

        })),
    }),
);
