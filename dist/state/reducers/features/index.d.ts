declare const _default: import("redux").Reducer<import("redux").CombinedState<{
    location: {
        Outside: boolean;
        Room: boolean;
        Ship: boolean;
        World: boolean;
        Path: boolean;
    };
}>, import("redux").AnyAction>;
export default _default;
export declare const actions: {
    location: import("@reduxjs/toolkit").CaseReducerActions<{
        enableOutside(state: import("immer/dist/internal").WritableDraft<{
            Outside: boolean;
            Room: boolean;
            Ship: boolean;
            World: boolean;
            Path: boolean;
        }>): void;
        enableRoom(state: import("immer/dist/internal").WritableDraft<{
            Outside: boolean;
            Room: boolean;
            Ship: boolean;
            World: boolean;
            Path: boolean;
        }>): void;
        enableSpaceShip(state: import("immer/dist/internal").WritableDraft<{
            Outside: boolean;
            Room: boolean;
            Ship: boolean;
            World: boolean;
            Path: boolean;
        }>): void;
        enableWorld(state: import("immer/dist/internal").WritableDraft<{
            Outside: boolean;
            Room: boolean;
            Ship: boolean;
            World: boolean;
            Path: boolean;
        }>): void;
        enablePath(state: import("immer/dist/internal").WritableDraft<{
            Outside: boolean;
            Room: boolean;
            Ship: boolean;
            World: boolean;
            Path: boolean;
        }>): void;
    }>;
};
