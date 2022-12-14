export const getJwtToken = (state) => state.user.jwtToken;
export const isLoggedIn = (state) => state.user.loggedIn;
export const getUsername = (state) => { return state.user.profile ? state.user.profile.username : null };
export const getProfileInfo = (state) => (state.user) ? state.user.profile : null;