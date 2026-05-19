import NetworkConstants from "../constants/NetworkConstants";
import NetworkHelper from "../helpers/NetworkHelper";
import GeolocationDataInterface from "../models/interfaces/GeolocationDataInterface";
import {
    AQIResponseSchema,
    type AQIResponse,
} from "../schemas/AQIResponseSchema";
import {
    LocationResponse,
    LocationResponseSchema,
} from "../schemas/LocationResponseSchema";

export default class NetworkService {
    public static current = new NetworkService();

    public async getAQIForGeolocation({
        latitude,
        longitude,
        signal,
    }: GeolocationDataInterface): Promise<AQIResponse | null> {
        const generatedURL =
            NetworkHelper.current.generateEndpointURLForGeolocation({
                latitude,
                longitude,
            });

        const response = await fetch(generatedURL, { signal: signal ?? undefined });

        if (!response.ok) {
            console.log(`Error Requesting For URL: ${generatedURL}`);
            return null;
        }

        const responseData = await response.json();

        const parsedResponse = AQIResponseSchema.safeParse(responseData);

        if (!parsedResponse.success) {
            console.log(
                `Error Parsing Response: `,
                "Response Data: ",
                responseData,
                "Parsed Response Data: ",
                parsedResponse,
            );
            return null;
        }
        return parsedResponse.data;
    }

    public async getSearchBoxLocationSuggestion({
        query,
        signal,
    }: {
        query: string;
        signal: AbortSignal | null;
    }): Promise<LocationResponse | null> {
        const generatedURL =
            NetworkHelper.current.generateLocationEndpointURLForGeolocation(
                query,
            );
        const response = await fetch(generatedURL, {
            signal,
        });

        if (!response.ok) {
            console.log(`Error Requesting For URL: ${generatedURL}`);
            return null;
        }

        const responseData = await response.json();

        const parsedResponse = LocationResponseSchema.safeParse(responseData);

        if (!parsedResponse.success) {
            console.log(
                `Error Parsing Location Response: `,
                "Issues: ",
                parsedResponse.error.issues,
            );
            return null;
        }

        console.log(parsedResponse);
        return parsedResponse.data;
    }
}
