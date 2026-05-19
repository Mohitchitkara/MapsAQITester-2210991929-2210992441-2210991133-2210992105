import { create } from "zustand";
import { CurrentLocationInterface } from "./interfaces/CurrentLocationStoreInterface";
import CurrentLocationConstants from "../constants/CurrentLocationConstants";
import CurrentLocationDataInterface from "../models/interfaces/CurrentLocationDataInterface";

export const useCurrentLocationStore = create<CurrentLocationInterface>(() => ({
    latitude: CurrentLocationConstants.current.DEFAULT_LATITUDE,
    longitude: CurrentLocationConstants.current.DEFAULT_LONGITUDE,
    placeId: CurrentLocationConstants.current.DEFAULT_PLACE_ID,
    setLocation: (latitude: number, longitude: number) => {
        useCurrentLocationStore.setState({ latitude, longitude });
    },
    setPlaceId: (placeId: string) => {
        useCurrentLocationStore.setState({ placeId });
    },
    setCurrentLocationData: (data: CurrentLocationDataInterface) => {
        useCurrentLocationStore.setState({ ...data });
    },
}));
