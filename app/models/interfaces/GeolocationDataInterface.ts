export default interface GeolocationDataInterface {
    latitude: number;
    longitude: number;
    signal?: AbortSignal | null;
}
