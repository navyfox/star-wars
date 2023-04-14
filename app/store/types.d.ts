declare type AppStore = ReturnType<typeof import('./index').makeStore>;
declare type AppState = ReturnType<AppStore['getState']>;
declare type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
