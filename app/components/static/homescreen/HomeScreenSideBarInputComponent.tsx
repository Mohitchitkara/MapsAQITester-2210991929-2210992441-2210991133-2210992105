import React from "react";
import { motion } from "framer-motion";
import useGeolocationSearchStore from "@/app/store/GeolocationSearchStore";
import HomeScreenControllerService from "@/app/screens/homscreen/service/HomeScreenControllerService";
import TryCatchUtil from "@/app/utils/TryCatchUtil";
import NetworkService from "@/app/services/NetworkService";
import useCurrentGeolocationAQIStore from "@/app/store/CurrentGeolocationAQIStore";
import CurrentLocationDataInterface from "@/app/models/interfaces/CurrentLocationDataInterface";
import { useCurrentLocationStore } from "@/app/store/CurrentLocationStore";
import MapLocationUtil from "@/app/utils/MapLocationUtil";

export default function HomeScreenSideBarInputComponent(): React.JSX.Element {
    const {
        result: geolocationSearchResult,
        setResult: setLocationSearchResults,
        setIsLoading: setIsLocationSearchLoading,
    } = useGeolocationSearchStore();
    const { setCurrentLocationData } = useCurrentLocationStore();
    const {
        setCurrentGeolocationData,
        setCurrentGeolocationPlaceId,
        setIsLoading,
    } = useCurrentGeolocationAQIStore();
    const [locationInputQuery, setLocationInputQuery] =
        React.useState<string>("");

    // Holds the AbortController for the in-flight AQI fetch so we can cancel
    // it if the user picks a different location before it completes.
    const aqiFetchControllerRef = React.useRef<AbortController | null>(null);

    React.useEffect(() => {
        if (locationInputQuery.length < 2) {
            setLocationSearchResults(null);
            return;
        }

        console.log("Search API Run");

        const controller = new AbortController();

        const timeout = setTimeout(async () => {
            setIsLocationSearchLoading(true);
            const { data, error } = await TryCatchUtil.current.tryCatch(
                NetworkService.current.getSearchBoxLocationSuggestion({
                    query: locationInputQuery,
                    signal: controller.signal,
                }),
            );

            if (error) {
                if (error.name !== "AbortError") {
                    console.log("Error Occured Location Search: ", error);
                }
                return;
            }

            setLocationSearchResults(data);
            setIsLocationSearchLoading(false);
        }, 300);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [locationInputQuery]);

    async function handleSetGeolocation({
        latitude,
        longitude,
        placeId,
    }: CurrentLocationDataInterface) {
        // Cancel any in-flight AQI fetch from a previous location selection
        aqiFetchControllerRef.current?.abort();
        const controller = new AbortController();
        aqiFetchControllerRef.current = controller;

        setCurrentLocationData({ latitude, longitude, placeId });
        setIsLoading(true);

        const { data, error } = await TryCatchUtil.current.tryCatch(
            NetworkService.current.getAQIForGeolocation({
                latitude,
                longitude,
                signal: controller.signal,
            }),
        );

        // If this request was aborted, a newer one is already in flight — bail out
        if (controller.signal.aborted) return;

        if (error) {
            console.log("Error Occured Refetching AQI: ", error);
            setIsLoading(false);
            return;
        }

        if (TryCatchUtil.current.isDataNull(data)) {
            console.log("Null Response While Refetching");
            setIsLoading(false);
            return;
        }

        setCurrentGeolocationPlaceId(placeId);
        setCurrentGeolocationData(data);
        setIsLoading(false);
    }

    return (
        <React.Fragment>
            <motion.div
                layout
                style={{
                    borderRadius:
                        geolocationSearchResult == null ? "100rem" : "1rem",
                }}
                className="w-full bg-white/10 border border-white/15 text-white text-[1.25rem] py-3 px-6"
            >
                <motion.input
                    layout
                    onChange={(e) => setLocationInputQuery(e.target.value)}
                    placeholder="Enter Location."
                    className="w-full outline-none  placeholder:text-white/80 font-roboto"
                />
                <div
                    style={{
                        marginBottom: geolocationSearchResult == null ? 0 : 16,
                    }}
                >
                    <div
                        style={{
                            marginBlock:
                                geolocationSearchResult == null ? 0 : 16,
                            opacity: geolocationSearchResult == null ? 0 : 1,
                        }}
                        className="w-full bg-white/15 rounded-full h-[0.5px]"
                    />
                    {geolocationSearchResult?.features.map((item, index) => {
                        return (
                            <div
                                onClick={() =>
                                    handleSetGeolocation({
                                        latitude: item.geometry.coordinates[1],
                                        longitude: item.geometry.coordinates[0],
                                        placeId:
                                            MapLocationUtil.current.calculatePlaceId(
                                                {
                                                    latitude:
                                                        item.geometry
                                                            .coordinates[1],
                                                    longitude:
                                                        item.geometry
                                                            .coordinates[0],
                                                    name: item.properties.name!,
                                                },
                                            ),
                                    })
                                }
                                key={`${item.properties.name}-${item.properties.country}-${index}`}
                                style={{
                                    padding: "0.75rem",
                                    marginTop: index !== 0 ? 8 : 0,
                                }}
                                className={`text-white font-roboto font-medium text-[1.25rem] ${index % 2 == 0 ? `bg-white/5` : ``} rounded-xl hover:bg-white/15 cursor-pointer`}
                            >
                                <span className="flex gap-[1rem] items-center">
                                    <div className="bg-white/15 rounded-full p-2 flex justify-center items-center aspect-square w-[3.5rem] h-[3rem]">
                                        {HomeScreenControllerService.current.getEmojieFromCountryCode(
                                            item.properties.countrycode!,
                                        )}
                                    </div>
                                    <span className="leading-[1.14rem]">
                                        {item.properties.name},
                                        {item.properties.state}, <br />
                                        <span className="font-bold text-white/50 text-[1rem] leading-0">
                                            {item.properties.country}
                                        </span>
                                    </span>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </React.Fragment>
    );
}
