"use client";
import React from "react";
import HomeScreenControllerView from "./screens/homscreen/HomeScreenControllerView";
import LoaderScreenControllerView from "./screens/loader/LoaderScreenControllerView";
import { useHomeScreenStore } from "./store/HomeScreenStore";
import { HomeScreenBackgroundMapState } from "./store/interfaces/HomeScreenStoreInterface";
import { AnimatePresence, motion } from "framer-motion";

export default function Home(): React.JSX.Element {
    const { backgroundMapState } = useHomeScreenStore();
    return (
        <main className="w-full h-full">
            <AnimatePresence mode="wait">
                {backgroundMapState == HomeScreenBackgroundMapState.LOADING && (
                    <motion.div
                        exit={{
                            y: "-110vh",
                        }}
                        animate={{
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                        className="w-screen h-screen absolute z-[200] flex justify-between items-center"
                    >
                        <LoaderScreenControllerView />
                    </motion.div>
                )}
            </AnimatePresence>
            {/* <LoaderScreenControllerView /> */}

            <HomeScreenControllerView />
        </main>
    );
}
