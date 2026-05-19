"use client";

import React from "react";
import HomeScreenBackgroundMapsView from "./views/HomeScreenBackgroundMapsView";
import HomeScreenSideBarControlsView from "./views/HomeScreenSideBarControllsView";
import { useHomeScreenStore } from "@/app/store/HomeScreenStore";
import { HomeScreenViewState } from "@/app/store/interfaces/HomeScreenStoreInterface";
import HomeScreenBackgroundGlobeView from "./views/HomeScreenBackgroundGlobeView";
import { AnimatePresence, motion } from "framer-motion";

export default function HomeScreenControllerView(): React.JSX.Element {
    const { viewState } = useHomeScreenStore();
    return (
        <section className="w-full h-full relative">
            <AnimatePresence>
                {viewState == HomeScreenViewState.MAPS && (
                    <motion.span>
                        <HomeScreenBackgroundMapsView />
                    </motion.span>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {viewState == HomeScreenViewState.AIRFLOW && (
                    <motion.span>
                        <HomeScreenBackgroundGlobeView />
                    </motion.span>
                )}
            </AnimatePresence>
            <HomeScreenSideBarControlsView />
        </section>
    );
}
