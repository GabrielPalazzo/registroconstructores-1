
import {SAVE_TRAMITE, SET_TRAMITE_NUEVO, SET_UPDATE_BORRADOR,SET_STATUS_GENERAL_TRAMITE} from '../reducers/main'
import {saveTramiteService} from '../../services/business'

export const setActionType = (tipoAccion: string) => async (dispatch,getState) => {    
    return dispatch({
      type: tipoAccion,
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

export const setStatusGeneralTramite = (status: Array<string>) => async (dispatch,getState) => {  
  return dispatch({
    type: SET_STATUS_GENERAL_TRAMITE,
    status
  })
}

export const setUpdateBorrador = (tramite: TramiteAlta) => async (dispatch,getState) => {  
  const t = await saveTramiteService(tramite)
  return dispatch({
    type: SET_UPDATE_BORRADOR,
    tipoAccion: 'UPDATE_BORRADOR',
    tramite: t
  })
}
