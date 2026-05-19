export enum HomeScreenSideBarState {
    OPEN,
    CLOSED,
}

export enum HomeScreenBackgroundMapState {
    LOADED,
    LOADING,
}

export enum HomeScreenViewState {
    MAPS = "Maps View",
    AIRFLOW = "Airflow View",
}
export default interface HomeScreenStoreInterface {
    sideBarOpenState: HomeScreenSideBarState;
    setSideBarOpenState: (state: HomeScreenSideBarState) => void;
    backgroundMapState: HomeScreenBackgroundMapState;
    setBackgroundMapState: (state: HomeScreenBackgroundMapState) => void;
    showBackgroundMapControls: boolean;
    toggleBackgroundMapControls: () => void;
    viewState: HomeScreenViewState;
    setViewState: (state: HomeScreenViewState) => void;
}
