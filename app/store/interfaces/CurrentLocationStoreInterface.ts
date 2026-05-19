import CurrentLocationDataInterface from "@/app/models/interfaces/CurrentLocationDataInterface";
export interface CurrentLocationInterface {
    longitude: number;
    latitude: number;
    setLocation: (longitude: number, latitude: number) => void;
    setPlaceId: (placeId: string) => void;
    setCurrentLocationData: (data: CurrentLocationDataInterface) => void;
    placeId: string;
}
