import React from "react";
import LiquidChrome from "@/components/LiquidChrome";
import { IOSLoader } from "@/app/components/shared/IOSLoader";
import { useHomeScreenStore } from "@/app/store/HomeScreenStore";
import { HomeScreenBackgroundMapState } from "@/app/store/interfaces/HomeScreenStoreInterface";
import { AnimatePresence, motion } from "framer-motion";
import useCurrentGeolocationAQIStore from "@/app/store/CurrentGeolocationAQIStore";
import TryCatchUtil from "@/app/utils/TryCatchUtil";

export default function LoaderScreenControllerView(): React.JSX.Element {
    const { loadCurrentGeolocationData, currentGeolocationData } =
        useCurrentGeolocationAQIStore();
    const { backgroundMapState } = useHomeScreenStore();

    React.useEffect(() => {
        const init = async () => {
            requestAnimationFrame(async () => {
                const { error } = await TryCatchUtil.current.tryCatch(
                    loadCurrentGeolocationData(),
                );

                if (error) {
                    console.log("Some Error Occured: ", error);
                    return;
                }

                console.log("Actual Data After Load: ", useCurrentGeolocationAQIStore.getState().currentGeolocationData);
            });
        };

        init();
    }, []);
    return (
        <div className="w-full h-full flex justify-center items-center">
            <LiquidChrome
                baseColor={[
                    0.058823529411764705, 0.058823529411764705,
                    0.058823529411764705,
                ]}
                speed={0.42}
                amplitude={0.37}
                interactive={false}
            />

            <AnimatePresence>
                {backgroundMapState == HomeScreenBackgroundMapState.LOADING && (
                    <motion.h1
                        initial={{
                            filter: "blur(0px)",
                            opacity: 1,
                        }}
                        exit={{
                            filter: "blur(10px)",
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        className="text-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-bold m-[1rem] loadingscreen-text-shadow absolute z-[11] bg-blur px-[2rem] py-[1rem] rounded-xl border border-white/20 text-[1.25rem] font-roboto flex flex-col items-center bg-black/20"
                    >
                        <IOSLoader size="lg" className="" />
                        <span>Loading</span>
                    </motion.h1>
                )}
            </AnimatePresence>
        </div>
    );
}
