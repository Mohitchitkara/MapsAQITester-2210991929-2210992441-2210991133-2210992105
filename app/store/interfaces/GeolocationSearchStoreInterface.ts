import { LocationResponse } from "@/app/schemas/LocationResponseSchema";

export default interface GeolocationSearchStoreInterface {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    isOpen: boolean;
    setIsOpen: (opacity: boolean) => void;
    result: LocationResponse | null;
    setResult: (result: LocationResponse | null) => void;
}
