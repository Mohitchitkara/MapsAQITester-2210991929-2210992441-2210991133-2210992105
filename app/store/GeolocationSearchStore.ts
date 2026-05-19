import { create } from "zustand";
import GeolocationSearchStoreInterface from "./interfaces/GeolocationSearchStoreInterface";
import { LocationResponse } from "../schemas/LocationResponseSchema";

const useGeolocationSearchStore = create<GeolocationSearchStoreInterface>(
    (set) => ({
        isLoading: false,
        setIsLoading: (loading: boolean) => set({ isLoading: loading }),
        isOpen: false,
        setIsOpen: (open: boolean) => set({ isOpen: open }),
        result: null,
        setResult: (result: LocationResponse | null) => set({ result }),
    }),
);

export default useGeolocationSearchStore;
