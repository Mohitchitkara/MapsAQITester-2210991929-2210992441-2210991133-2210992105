import NetowrkHelper from "../helpers/NetworkHelper";

export default class NetworkConstants {
    public static current = new NetworkConstants();

    public AQI_API_LONGITUDE_DELIMETER: string = "<<longitude>>";
    public AQI_API_LATITUDE_DELIMETER: string = "<<latitude>>";
    public AQI_API_TOKEN_DELIMETER: string = "<<token>>";
    public LOCATION_API_DELIMETER: string = "<<location>>";
    public AQI_API_BASE_URL: string = `https://api.waqi.info/feed/geo:<<latitude>>;<<longitude>>/?token=<<token>>`;
    public AQI_API_TOKEN: string = "c330efbba0a9860c3496d085a72d22ab0c2507e9";

    public LOCATION_API_BASE_URL: string = `https://photon.komoot.io/api/?q=<<location>>`;
}

// https://api.waqi.info/feed/here/?token=c330efbba0a9860c3496d085a72d22ab0c2507e9
