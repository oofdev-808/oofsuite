import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  [key: string]: any;
}

const initialState: PageState = {
  // value: 0,
};

export const pageSlice = createSlice({
  name: "pageState",
  initialState,
  reducers: {
    // register to store slice
    registerPageState: (state, action) => action.payload,
    // {
    //   Object.keys(action.payload).map(key => state[key] = action.payload[key])
    // },

    resetPageState: () =>
      // reset to initial
      // Object.keys(state).map(key => state[key]={})
      initialState,

    setState: (state, action) => {
      // set state into slice
      state[action.payload.stateName] = action.payload.stateData;
      // state["pageState"]["0"]= action.payload.stateData
    },
  },
});

// Action creators are generated for each case reducer function
// export const { registerPageState, resetPageState,setState} = pageSlice.actions

//exporting all actions instead - which bundled in a single place
export const pageSliceActions = pageSlice.actions;

export default pageSlice.reducer;
