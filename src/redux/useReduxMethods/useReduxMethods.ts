
import { useSelector, useDispatch } from 'react-redux'

import { slicesBundledActions } from '../slicesBundled/slicesBundledActions';


/**
 * 
 * @returns reduxMethods
 * 
 * access all redux methods using useReduxMethods|
 *| wrapped with dispatch already
 * |with immer immutability
 */
export const useReduxMethods = () => {

    const dispatch = useDispatch()

    const { registerPageState, resetPageState, setState, registerAppState, resetAppState, setAppState } = slicesBundledActions

    const reduxMethods = {

        // pageUseState methods
        registerPageState: (prop: any) => dispatch(registerPageState(prop)),
        resetPageState: () => dispatch(resetPageState()),
        setState: (prop: any) => dispatch(setState(prop)),


        //appState methods
        registerAppState: (prop: any) => dispatch(registerAppState(prop)),
        resetAppState: () => dispatch(resetAppState()),
        setAppState: (prop: any) => dispatch(setAppState(prop)),

        stateFormattor: (stateName: string, stateData: any) => ({ stateName, stateData })

    }

    return reduxMethods;
};
