import { MapPlaceItem } from "../screens/homscreen/views/HomeScreenSideBarControllsView";

export default class CurrentLocationConstants {
    public static current = new CurrentLocationConstants();

    public readonly DEFAULT_LOCATION_NAME: string = "Mohali";
    public readonly DEFAULT_LATITUDE: number = 30.7046;
    public readonly DEFAULT_LONGITUDE: number = 76.7179;
    public readonly DEFAULT_PLACE_ID: string = `${this.DEFAULT_LOCATION_NAME}-${this.DEFAULT_LATITUDE}-${this.DEFAULT_LONGITUDE}`;

    public readonly PLACES: Array<MapPlaceItem> = [
        {
            name: "Chitkara University",
            latitude: 30.516271329486433,
            longitude: 76.65973488064857,
        },
        { name: "Rajpura", latitude: 30.485, longitude: 76.598 },
        { name: "Chandigarh", latitude: 30.7333, longitude: 76.7794 },
        { name: "Mohali", latitude: 30.7046, longitude: 76.7179 },
    ];
}
