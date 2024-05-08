import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface appState {

  [key: string]: any
}

const initialState: appState = {
  // value: 0,
}

export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {

    registerAppState: (state, action) => action.payload,
    // {
    //   // state["appState"]= {...[action.payload]}
    //   // state["appState"]= [action.payload]
    //   Object.keys(action.payload).map(key => state[key] = action.payload[key])

    // },
    
    resetAppState: () =>
      // Object.keys(state).map(key => state[key]={})
      initialState,
    setAppState: (state, action) => {


      state[action.payload.stateName] = action.payload.stateData
      // state["appState"]["0"]= action.payload.stateData
    },

  },
})

// Action creators are generated for each case reducer function
// export const { registerappState, resetappState,setState} = appSlice.actions

export const appSliceActions = appSlice.actions

export default appSlice.reducer