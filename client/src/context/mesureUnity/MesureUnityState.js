import React, { useReducer } from 'react';
import axios from 'axios';

import MesureUnityContext from '../../context/mesureUnity/mesureUnityContext';
import mesureUnityReducer from '../../context/mesureUnity/mesureUnityReducer';

import { GET_ALL_MESURE_UNITIES } from '../types';

const MesureUnityState = props => {
    const initialState = {
        mesureUnities: []
    }

    const [state, dispatch] = useReducer(mesureUnityReducer, initialState);

    // Get all Mesure Unities
    const getAllMesureUnities = async () => {
        try {
            const res = await axios.get('/api/mesureUnity');
            dispatch({
                type: GET_ALL_MESURE_UNITIES,
                payload: res.data
            })
        } catch(err) {

        }
    }

    return (
        <MesureUnityContext.Provider
            value={{
                mesureUnities: state.mesureUnities,
                getAllMesureUnities
            }}
        >
            {props.children}
        </MesureUnityContext.Provider>
    )
}

export default MesureUnityState;