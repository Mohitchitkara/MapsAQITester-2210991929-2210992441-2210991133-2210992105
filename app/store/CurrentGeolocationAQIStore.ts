import { create } from "zustand";
import CurrentGeolocationAQIInterface, {
    CurrentGeolocationData,
} from "./interfaces/CurrentGeolocationAQIStoreInterface";
import MapLocationUtil from "../utils/MapLocationUtil";
import CurrentLocationConstants from "../constants/CurrentLocationConstants";
import NetworkService from "../services/NetworkService";
import TryCatchUtil from "../utils/TryCatchUtil";

const useCurrentGeolocationAQIStore = create<CurrentGeolocationAQIInterface>(
    (set, get) => ({
        isLoading: false,
        setIsLoading: (loading: boolean) => set({ isLoading: loading }),
        currentGeolocationPlaceId: MapLocationUtil.current.calculatePlaceId({
            latitude: CurrentLocationConstants.current.DEFAULT_LATITUDE,
            longitude: CurrentLocationConstants.current.DEFAULT_LATITUDE,
            name: CurrentLocationConstants.current.DEFAULT_LOCATION_NAME,
        }),
        setCurrentGeolocationPlaceId: (placeId: string) =>
            set({ currentGeolocationPlaceId: placeId }),
        currentGeolocationData: null,
        setCurrentGeolocationData: (data: CurrentGeolocationData | null) =>
            set({ currentGeolocationData: data }),
        loadCurrentGeolocationData: async () => {
            if (get().isLoading) return;

            const { data, error } = await TryCatchUtil.current.tryCatch(
                NetworkService.current.getAQIForGeolocation({
                    latitude: CurrentLocationConstants.current.DEFAULT_LATITUDE,
                    longitude:
                        CurrentLocationConstants.current.DEFAULT_LONGITUDE,
                }),
            );

            if (error) {
                set({ currentGeolocationData: null, isLoading: false });
                return;
            }

            if (TryCatchUtil.current.isDataNull(data)) {
                set({ currentGeolocationData: null, isLoading: false });
                return;
            }

            set({ currentGeolocationData: data, isLoading: false });
        },
    }),
);

export default useCurrentGeolocationAQIStore;
