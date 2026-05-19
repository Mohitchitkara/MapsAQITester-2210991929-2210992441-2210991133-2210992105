import { AQIResponse } from "@/app/schemas/AQIResponseSchema";

export type CurrentGeolocationData = AQIResponse;

export default interface CurrentGeolocationAQIInterface {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    currentGeolocationPlaceId: string;
    setCurrentGeolocationPlaceId: (placeId: string) => void;
    currentGeolocationData: CurrentGeolocationData | null;
    setCurrentGeolocationData: (data: CurrentGeolocationData | null) => void;
    loadCurrentGeolocationData: () => Promise<void>;
}
