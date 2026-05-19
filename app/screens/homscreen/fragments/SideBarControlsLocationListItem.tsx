import React from "react";
import { MapPlaceItem } from "../views/HomeScreenSideBarControllsView";
import { useCurrentLocationStore } from "@/app/store/CurrentLocationStore";
import MapLocationUtil from "@/app/utils/MapLocationUtil";
import useCurrentGeolocationAQIStore from "@/app/store/CurrentGeolocationAQIStore";
import TryCatchUtil from "@/app/utils/TryCatchUtil";
import NetworkService from "@/app/services/NetworkService";
import NetworkHelper from "@/app/helpers/NetworkHelper";

export default function SideBarControlsLocationListItem({
    place,
}: {
    place: MapPlaceItem;
}): React.JSX.Element {
    const { setCurrentLocationData } = useCurrentLocationStore();
    const {
        setIsLoading,
        setCurrentGeolocationData,
        setCurrentGeolocationPlaceId,
    } = useCurrentGeolocationAQIStore();

    async function handleClick(place: MapPlaceItem) {
        setCurrentLocationData({
            latitude: place.latitude,
            longitude: place.longitude,
            placeId: MapLocationUtil.current.calculatePlaceId({
                name: place.name,
                longitude: place.longitude,
                latitude: place.latitude,
            }),
        });

        setIsLoading(true);

        const { data, error } = await TryCatchUtil.current.tryCatch(
            NetworkService.current.getAQIForGeolocation({
                latitude: place.latitude,
                longitude: place.longitude,
            }),
        );

        if (error) {
            console.log("Error Occured Refetching AQI: ", error);
            setIsLoading(false);
            return;
        }

        if (TryCatchUtil.current.isDataNull(data)) {
            console.log("Null Response WHile Refetching");
            setIsLoading(false);
            return;
        }

        setCurrentGeolocationPlaceId(
            MapLocationUtil.current.calculatePlaceId({
                name: place.name,
                longitude: place.longitude,
                latitude: place.latitude,
            }),
        );
        setCurrentGeolocationData(data);
        setIsLoading(false);
    }
    return (
        <React.Fragment>
            <li key={place.name}>
                <button
                    onClick={() => handleClick(place)}
                    className="w-full text-white bg-white/5 hover:bg-white/10 rounded-[0.5rem] font-roboto px-[1.5rem] py-[1.25rem] transition-colors cursor-pointer relative"
                >
                    <div className="w-full flex justify-between items-center ">
                        <p className="font-semibold text-[1.25rem]">
                            {place.name}
                        </p>
                    </div>
                    <div className="h-[70%] w-2 bg-green-300 rounded-full absolute top-1/2 -translate-y-1/2 right-[1.25rem]" />

                    <div className="flex gap-2 font-bold text-white/50">
                        <p>{place.longitude}</p>-<p>{place.latitude}</p>
                    </div>
                </button>
            </li>
        </React.Fragment>
    );
}
