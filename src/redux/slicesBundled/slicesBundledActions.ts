import { pageSliceActions } from "../slices/pageSlice";
import { appSliceActions } from "../slices/appSlice";

export const slicesBundledActions = {
  ...pageSliceActions,
  ...appSliceActions,
};
