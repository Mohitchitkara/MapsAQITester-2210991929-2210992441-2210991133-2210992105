import CurrentLocationDataInterface from "../models/interfaces/CurrentLocationDataInterface";
import { MapPlaceItem } from "../screens/homscreen/views/HomeScreenSideBarControllsView";

export default class MapLocationUtil {
    public static current = new MapLocationUtil();

    public calculatePlaceId(place: MapPlaceItem) {
        return `${place.name}-${place.latitude}-${place.longitude}`;
    }
}
