import NetworkConstants from "../constants/NetworkConstants";
import GeolocationDataInterface from "../models/interfaces/GeolocationDataInterface";

export default class NetworkHelper {
    public static current = new NetworkHelper();

    public generateEndpointURLForGeolocation({
        latitude,
        longitude,
    }: GeolocationDataInterface): string {
        let baseURL: string = NetworkConstants.current.AQI_API_BASE_URL;
        baseURL = baseURL.replace(
            NetworkConstants.current.AQI_API_LATITUDE_DELIMETER,
            latitude.toString(),
        );
        baseURL = baseURL.replace(
            NetworkConstants.current.AQI_API_LONGITUDE_DELIMETER,
            longitude.toString(),
        );
        baseURL = baseURL.replace(
            NetworkConstants.current.AQI_API_TOKEN_DELIMETER,
            NetworkConstants.current.AQI_API_TOKEN,
        );

        console.log("Generated URL: ", baseURL);
        return baseURL;
    }

    public generateLocationEndpointURLForGeolocation(query: string): string {
        let baseURL: string = NetworkConstants.current.LOCATION_API_BASE_URL;
        baseURL = baseURL.replace(
            NetworkConstants.current.LOCATION_API_DELIMETER,
            query,
        );
        return baseURL;
    }
}

//  https://api.waqi.info/feed/here/?token=c330efbba0a9860c3496d085a72d22ab0c2507e9
