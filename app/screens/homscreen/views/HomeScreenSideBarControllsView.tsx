import React from "react";
import SideBarControlsLocationListItem from "../fragments/SideBarControlsLocationListItem";
import ColorFactoryConstants from "@/app/constants/ColorFactoryConstants";
import SideBarControlsLocationList from "@/app/components/static/SideBarControlsLocationList";
import CurrentLocationConstants from "@/app/constants/CurrentLocationConstants";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { useHomeScreenStore } from "@/app/store/HomeScreenStore";
import {
    HomeScreenBackgroundMapState,
    HomeScreenSideBarState,
    HomeScreenViewState,
} from "@/app/store/interfaces/HomeScreenStoreInterface";
import HomeScreenFloatingActionButton from "@/app/components/static/HomeScreenFloatingActionButton";
import { MdKeyboardCommandKey, MdOutlineRefresh } from "react-icons/md";
import { FaLocationDot, FaMinus, FaPlus } from "react-icons/fa6";
import { ImCompass } from "react-icons/im";
import { useCurrentLocationStore } from "@/app/store/CurrentLocationStore";
import { IoChevronDown } from "react-icons/io5";
import { TbMapSearch } from "react-icons/tb";
import { IoMdGlobe } from "react-icons/io";
import SectionHeadingComponent from "@/app/components/shared/SectionHeadingComponent";
import HomeScreenConstants from "../constant/HomeScreenConstants";
import Counter from "@/components/Counter";
import useCurrentGeolocationAQIStore from "@/app/store/CurrentGeolocationAQIStore";
import TryCatchUtil from "@/app/utils/TryCatchUtil";
import NetworkService from "@/app/services/NetworkService";
import useGeolocationSearchStore from "@/app/store/GeolocationSearchStore";
import HomeScreenControllerService from "../service/HomeScreenControllerService";
import HomeScreenSideBarInputComponent from "@/app/components/static/homescreen/HomeScreenSideBarInputComponent";

export interface MapPlaceItem {
    name: string;
    latitude: number;
    longitude: number;
}

export default function HomeScreenSideBarControlsView(): React.JSX.Element {
    const {
        setSideBarOpenState,
        sideBarOpenState,
        setBackgroundMapState,
        toggleBackgroundMapControls,
        showBackgroundMapControls,
        viewState,
        setViewState,
    } = useHomeScreenStore();

    const { placeId } = useCurrentLocationStore();
    const {
        setIsLoading: setIsLocationSearchLoading,
        setIsOpen,
        isOpen,
        isLoading,
        setResult: setLocationSearchResults,
        result: geolocationSearchResult,
    } = useGeolocationSearchStore();
    const { currentGeolocationData } = useCurrentGeolocationAQIStore();
    const aqiCounterRef = React.useRef<HTMLDivElement | null>(null);

    const [isViewStateDropdownExpanded, setIsViewStateDropdownExpanded] =
        React.useState<boolean>(false);

    function handleSidebarStateButton() {
        if (sideBarOpenState == HomeScreenSideBarState.OPEN)
            setSideBarOpenState(HomeScreenSideBarState.CLOSED);
        else setSideBarOpenState(HomeScreenSideBarState.OPEN);
    }

    function handleRefreshButton() {
        setBackgroundMapState(HomeScreenBackgroundMapState.LOADING);
        setTimeout(() => {
            setBackgroundMapState(HomeScreenBackgroundMapState.LOADED);
        }, 4000);
    }

    function handleToggleMapControls() {
        toggleBackgroundMapControls();
    }

    function handleViewStateChange(viewState_t: HomeScreenViewState) {
        setViewState(viewState_t);
        setIsViewStateDropdownExpanded(false);
    }

    return (
        <React.Fragment>
            <div className="w-full h-full absolute top-0 left-0 flex p-6 z-20 pointer-events-none">
                <section className={`h-full flex-1 relative`}>
                    {/* MARK: Show Sidebar Button */}
                    <AnimatePresence mode="wait">
                        {sideBarOpenState == HomeScreenSideBarState.CLOSED && (
                            <motion.div
                                initial={{
                                    scale: 0,
                                    filter: "blur(10px)",
                                }}
                                animate={{
                                    scale: 1,
                                    filter: "blur(0px)",
                                }}
                                exit={{
                                    scale: 0,
                                    filter: "blur(10px)",
                                }}
                                onClick={handleSidebarStateButton}
                                style={{ backdropFilter: "blur(10px) " }}
                                className="hover:bg-white/10 h-20 w-20 flex justify-between items-center rounded-full border border-white/20 bg-[#1A1A1A] cursor-pointer pointer-events-auto absolute top-[0.75rem] left-[0.5rem]"
                            >
                                <BsReverseLayoutSidebarInsetReverse
                                    color="white"
                                    size={30}
                                    className="mx-auto"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        animate={{
                            x:
                                sideBarOpenState == HomeScreenSideBarState.OPEN
                                    ? 0
                                    : -window.innerWidth / 2,
                        }}
                        transition={{
                            duration: 0.7,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                        style={{
                            backgroundColor:
                                ColorFactoryConstants.current.PRIMARY_DARK,
                        }}
                        className={
                            "h-full w-[30vw] rounded-[3rem] py-6 px-8  pointer-events-auto overflow-y-auto border-[0.5px] border-white/20 homescreen-sidebar-shadow "
                        }
                    >
                        <div className="w-full flex justify-between items-center">
                            <h2 className="text-white font-semibold mt-3 mb-2 text-[2rem] font-roboto">
                                Places
                            </h2>
                            <button
                                onClick={handleSidebarStateButton}
                                className="hover:bg-white/15 bg-white/10 p-3 rounded-xl cursor-pointer transition-colors"
                            >
                                <BsReverseLayoutSidebarInsetReverse
                                    color="white"
                                    size={23}
                                />
                            </button>
                        </div>
                        <div className="w-full h-1 bg-white/10 mb-6" />

                        {/* MARK: Input Box */}
                        <HomeScreenSideBarInputComponent />

                        <SectionHeadingComponent text="Preset Locations" />
                        <SideBarControlsLocationList>
                            {CurrentLocationConstants.current.PLACES.map(
                                (place) => (
                                    <SideBarControlsLocationListItem
                                        key={`${place.name}-${place.longitude}-${place.latitude}`}
                                        place={place}
                                    />
                                ),
                            )}
                        </SideBarControlsLocationList>

                        <SectionHeadingComponent text="AQI Response Sources" />
                        {currentGeolocationData?.data.attributions.map(
                            (attribution, index) => {
                                return (
                                    <div
                                        key={`${attribution.url}-${index}`}
                                        style={{
                                            marginTop: index != 0 ? 8 : 0,
                                        }}
                                        className="w-full hover:bg-white/10 cursor-pointer bg-white/5 rounded-[0.5rem] px-[1.5rem] py-[1.25rem] font-roboto text-white"
                                    >
                                        <p className="font-semibold text-[1.25rem]">
                                            {attribution.name}
                                        </p>

                                        <div className="w-full flex justify-between items-center text-white/50">
                                            <p className="font-semibold">
                                                {attribution.url}
                                            </p>
                                        </div>
                                    </div>
                                );
                            },
                        )}

                        <SectionHeadingComponent text="Geolocation Data" />
                    </motion.div>
                </section>

                <section className={`h-full flex-1 relative`}>
                    <HomeScreenFloatingActionButton
                        onClick={handleRefreshButton}
                        className="top-3 right-2"
                    >
                        <MdOutlineRefresh size={30} color="white" />
                    </HomeScreenFloatingActionButton>
                    <div className="absolute right-26 top-3 bg-[#1a1a1a] rounded-full border border-white/20 h-[5rem] w-[21rem] p-1.5 pointer-events-auto flex items-center gap-4 font-bold font-roboto text-white text-[1.35rem] overflow-hidden">
                        <div className="h-full aspect-square bg-white/10 rounded-full flex justify-center items-center">
                            <FaLocationDot />
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.span
                                animate={{ y: 0, opacity: 1 }}
                                initial={{ y: 150, opacity: 0 }}
                                exit={{ y: -150, opacity: 0 }}
                                transition={{
                                    duration: 0.7,
                                    ease: [0.76, 0, 0.24, 1],
                                }}
                                className="inline-block text-[1.25rem]"
                                key={placeId}
                            >
                                {placeId.split("-")[0]}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* MARK: View State Dropdown */}
                    <motion.div
                        animate={{
                            height: isViewStateDropdownExpanded ? 250 : 80,
                            borderRadius: isViewStateDropdownExpanded
                                ? 32
                                : 200,
                            paddingInline: isViewStateDropdownExpanded ? 14 : 4,
                            scale: isViewStateDropdownExpanded ? 1.1 : 1,
                            top: isViewStateDropdownExpanded ? 20 : 16,
                            right: isViewStateDropdownExpanded ? 470 : 452,
                            paddingBlock: isViewStateDropdownExpanded ? 14 : 0,
                            paddingBottom: isViewStateDropdownExpanded ? 16 : 0,
                        }}
                        transition={{}}
                        whileTap={
                            !isViewStateDropdownExpanded ? { scale: 0.95 } : {}
                        }
                        className="absolute  bg-[#1a1a1a] cursor-pointer border border-white/20 w-[21rem] pointer-events-auto font-semibold font-roboto text-white text-[1.25rem] overflow-hidden"
                    >
                        <motion.div
                            onClick={() =>
                                setIsViewStateDropdownExpanded(
                                    !isViewStateDropdownExpanded,
                                )
                            }
                            animate={{
                                backgroundColor: isViewStateDropdownExpanded
                                    ? "#ffffff10"
                                    : "#1a1a1a",
                                paddingInline: isViewStateDropdownExpanded
                                    ? 8
                                    : 0,
                            }}
                            className="w-full h-[5rem] flex items-center py-1.5 gap-4 rounded-full"
                        >
                            <div className="h-full aspect-square bg-white/10 rounded-full flex justify-center items-center">
                                {viewState == HomeScreenViewState.MAPS && (
                                    <TbMapSearch size={25} />
                                )}
                                {viewState == HomeScreenViewState.AIRFLOW && (
                                    <IoMdGlobe size={25} />
                                )}
                            </div>

                            <span className="w-full">
                                {viewState.toLocaleString()}
                            </span>
                            <div className="h-full aspect-square rounded-full flex justify-center items-center pointer-events-auto">
                                <IoChevronDown />
                            </div>
                        </motion.div>

                        {isViewStateDropdownExpanded && (
                            <React.Fragment>
                                <SectionHeadingComponent text="Application View States" />
                                {HomeScreenConstants.current.VIEW_STATE_LIST.map(
                                    (item, index) => {
                                        if (item.viewState == viewState) return;
                                        return (
                                            <div
                                                key={`${item.name}-${item.viewState.toString()}-${index}`}
                                                style={{
                                                    marginTop:
                                                        index != 0 ? 8 : 0,
                                                }}
                                                onClick={() =>
                                                    handleViewStateChange(
                                                        item.viewState,
                                                    )
                                                }
                                                className="w-full h-[5rem] flex items-center py-1.5 gap-4 hover:bg-white/10 bg-white/5 rounded-full p-1.5"
                                            >
                                                <div className="h-full aspect-square bg-white/10 rounded-full flex justify-center items-center">
                                                    {item.icon}
                                                </div>

                                                <span className="w-full text-[1.25rem]">
                                                    {item.name}
                                                </span>
                                            </div>
                                        );
                                    },
                                )}
                            </React.Fragment>
                        )}
                    </motion.div>
                    {/* MARK: View State Dropdown End */}

                    {/* MARK: Map Controlls Button */}
                    <HomeScreenFloatingActionButton
                        onClick={handleToggleMapControls}
                        className={`top-[6.5rem] right-[0.5rem] ${showBackgroundMapControls ? `bg-white text-black` : `text-white`}`}
                    >
                        <MdKeyboardCommandKey size={26} />
                    </HomeScreenFloatingActionButton>

                    <motion.div
                        ref={aqiCounterRef}
                        initial={false}
                        animate={{
                            right:
                                viewState === HomeScreenViewState.MAPS
                                    ? 104
                                    : 0,
                            y:
                                viewState === HomeScreenViewState.MAPS
                                    ? -window.innerHeight + 19.5 * 16
                                    : 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            delay:
                                viewState == HomeScreenViewState.MAPS
                                    ? 0.25
                                    : 0.75,
                        }}
                        style={{
                            backgroundColor: "#1a1a1a",
                        }}
                        className="absolute bottom-0 p-[1rem] rounded-[5rem] cursor-pointer border border-white/20 pointer-events-auto font-semibold font-roboto text-white text-[1.25rem] overflow-hidden flex justify-center items-center w-[21rem] flex-col"
                    >
                        {currentGeolocationData !== null && (
                            <Counter
                                value={currentGeolocationData!.data.aqi}
                                fontSize={80}
                                padding={5}
                                gap={10}
                                textColor="white"
                                fontWeight={900}
                            />
                        )}

                        <div className="w-[70%] rounded-full py-1 bg-green-300/20 hover:bg-green-300/50 flex justify-center items-center mt-1">
                            <span className="text-green-300 font-bold font-roboto">
                                AQI
                            </span>
                        </div>
                    </motion.div>
                    <AnimatePresence>
                        {showBackgroundMapControls && (
                            <motion.div
                                animate={{
                                    x: 0,
                                }}
                                exit={{
                                    x: 400,
                                }}
                                initial={{ x: 400 }}
                                transition={{
                                    duration: 0.7,
                                    ease: [0.76, 0, 0.24, 1],
                                }}
                                className="absolute right-[0.5rem] bottom-[0.75rem] bg-[#1a1a1a] rounded-full border border-white/20 w-[5rem] flex flex-col gap-1 p-1.5 pointer-events-auto"
                            >
                                <button className="w-full aspect-square bg-white/10 hover:bg-white/20 rounded-t-full cursor-pointer flex justify-center items-center text-white">
                                    <FaPlus size={25} />
                                </button>
                                <button className="w-full aspect-square bg-white/10 hover:bg-white/20 cursor-pointer flex justify-center items-center text-white">
                                    <ImCompass size={23} />
                                </button>
                                <button className="w-full aspect-square bg-white/10 hover:bg-white/20 rounded-b-full cursor-pointer flex justify-center items-center text-white">
                                    <FaMinus size={25} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </React.Fragment>
    );
}
