
import {SAVE_TRAMITE, SET_TRAMITE_NUEVO} from '../reducers/main'
import {saveTramiteService} from '../../services/business'

export const setActionType = (tipoAccion: string) => async (dispatch,getState) => {    
    return dispatch({
      type: SET_TRAMITE_NUEVO,
      tipoAccion
    })
  }

export const setPaso = (paso: string) => async (dispatch,getState) => {    
  return dispatch({
    type: paso,
    paso
  })
}

export const saveTramite = (tramite: TramiteAlta) => async (dispatch,getState) => {  
  const t = await saveTramiteService(tramite)
  return dispatch({
    type: SAVE_TRAMITE,
    tramite: t
  })
}