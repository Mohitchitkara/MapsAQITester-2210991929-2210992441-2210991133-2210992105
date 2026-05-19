import React from "react";
import { Map, MapArc, MapRef } from "@/components/ui/map";
import HomeScreenConstants from "../constant/HomeScreenConstants";
import { motion } from "framer-motion";
import Galaxy from "@/components/Galaxy";
import { useHomeScreenStore } from "@/app/store/HomeScreenStore";
import { HomeScreenSideBarState } from "@/app/store/interfaces/HomeScreenStoreInterface";

export default function HomeScreenBackgroundGlobeView(): React.JSX.Element {
    const { sideBarOpenState } = useHomeScreenStore();
    const [showGlobe, setShowGlobe] = React.useState<boolean>(false);
    const mapRef = React.useRef<MapRef>(null);

    React.useEffect(() => {
        (() => {
            setTimeout(() => setShowGlobe(true), 1500);
        })();
    }, []);

    React.useEffect(() => {
        let animationFrameId: number;
        let currentLng = HomeScreenConstants.current.HUB.lng - 50;

        const rotateGlobe = () => {
            if (mapRef.current) {
                currentLng -= 0.1; // Adjust this value to make it faster or slower
                if (currentLng < -180) currentLng += 360;

                mapRef.current.jumpTo({
                    center: [
                        currentLng,
                        HomeScreenConstants.current.HUB.lat - 10,
                    ],
                });
            }
            animationFrameId = requestAnimationFrame(rotateGlobe);
        };

        // Start rotation
        animationFrameId = requestAnimationFrame(rotateGlobe);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <React.Fragment>
            <div className="bg-[#0E0E0E] w-full h-full relative">
                {/* MARK: Background Shader Effect */}
                <div className="w-screen h-screen top-0 left-0">
                    <Galaxy
                        mouseRepulsion
                        mouseInteraction
                        density={1}
                        glowIntensity={0.3}
                        saturation={0}
                        hueShift={140}
                        twinkleIntensity={0.3}
                        rotationSpeed={0.1}
                        repulsionStrength={2}
                        autoCenterRepulsion={0}
                        starSpeed={0.5}
                        speed={1}
                    />
                </div>

                <motion.div
                    animate={{
                        opacity: showGlobe ? 1 : 0,
                        filter: showGlobe ? "blur(0px)" : "blur(10px)",
                    }}
                    className={`w-full h-full absolute top-0 left-0  z-[11] ${sideBarOpenState == HomeScreenSideBarState.OPEN ? `translate-x-[15%] ease-in-out duration-700` : `translate-x-0 delay-200 ease-in-out duration-700`} transition-all `}
                >
                    <Map
                        ref={mapRef}
                        center={[
                            HomeScreenConstants.current.HUB.lng - 50,
                            HomeScreenConstants.current.HUB.lat - 10,
                        ]}
                        zoom={3}
                        projection={{ type: "globe" }}
                    >
                        <MapArc
                            data={HomeScreenConstants.current.GLOBE_ARCS}
                            paint={{
                                "line-color": "#3b82f6",
                                "line-width": 2,
                            }}
                            interactive={false}
                        />
                    </Map>
                </motion.div>
            </div>
        </React.Fragment>
    );
}
