import { FC, useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
    isMenuOpen: boolean;
    children?: React.ReactNode | undefined
}


const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
}


export const UiProvider:FC<UiState> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer , UI_INITIAL_STATE );

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToogleMenu'})
    }

    return (
        <UiContext.Provider value={{
            ...state,
            toggleSideMenu
        }}>
            { children }
        </UiContext.Provider>
    )
};