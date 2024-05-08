import appReducer from "../slices/appSlice";

import pageReducer from "../slices/pageSlice";

export const slicesBundledReducers = {
  appState: appReducer,
  pageUseState: pageReducer,
};
