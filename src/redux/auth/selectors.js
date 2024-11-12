export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectAuthUser = state => state.auth.user;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectIsLoading = state => state.auth.isLoading;
export const selectAuthError = state => state.auth.authError;
