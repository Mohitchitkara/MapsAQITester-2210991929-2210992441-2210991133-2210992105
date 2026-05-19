import React, { useRef, useEffect, useCallback } from "react";
import {
    Map,
    MapControls,
    MapMarker,
    MarkerContent,
    useMap,
    type MapRef,
} from "@/components/ui/map";
import { useCurrentLocationStore } from "@/app/store/CurrentLocationStore";
import { useHomeScreenStore } from "@/app/store/HomeScreenStore";
import {
    HomeScreenBackgroundMapState,
    HomeScreenSideBarState,
} from "@/app/store/interfaces/HomeScreenStoreInterface";
import CurrentLocationConstants from "@/app/constants/CurrentLocationConstants";

function MapLoadHandler({ onMapLoad }: { onMapLoad: () => void }) {
    const { isLoaded } = useMap();

    useEffect(() => {
        if (isLoaded) {
            onMapLoad();
        }
    }, [isLoaded, onMapLoad]);

    return null;
}

export default function HomeScreenBackgroundMapsView(): React.JSX.Element {
    const { latitude, longitude } = useCurrentLocationStore();
    const { setBackgroundMapState } = useHomeScreenStore();
    const mapRef = useRef<MapRef>(null);

    const handleMapLoaded = useCallback(() => {
        setTimeout(() => {
            setBackgroundMapState(HomeScreenBackgroundMapState.LOADED);
        }, 2000);
    }, [setBackgroundMapState]);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [longitude, latitude],
                zoom: 15,
                duration: 2000,
                essential: true,
            });
        }
    }, [latitude, longitude]);

    return (
        <React.Fragment>
            <div className="w-full h-full absolute top-0 left-0">
                <Map
                    ref={mapRef}
                    center={[
                        CurrentLocationConstants.current.DEFAULT_LONGITUDE -
                            6.5,
                        CurrentLocationConstants.current.DEFAULT_LATITUDE,
                    ]}
                    zoom={6}
                >
                    <MapLoadHandler onMapLoad={handleMapLoaded} />
                    <MapMarker longitude={longitude} latitude={latitude}>
                        <MarkerContent />
                    </MapMarker>
                </Map>
            </div>
        </React.Fragment>
    );
}
