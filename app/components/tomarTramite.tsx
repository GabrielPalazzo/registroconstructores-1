import React, { useEffect, useState } from 'react'
import { Tag } from 'antd'
import { UnlockFilled, LockFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { lockTramite, unLockTramite } from '../redux/actions/main'
import { getUsuario } from '../services/business'
import { InitRevisionTramite } from '../redux/actions/revisionTramite'

export interface TomarTramiteProps {
  user: Usuario
}

export const TomarTramite: React.FC<TomarTramiteProps> = ({
  user = null
}) => {

  const dispatch = useDispatch()
  const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta || {})
  const revisionTramite: RevisionTramite = useSelector(state => state.revisionTramites.revision)

  const [usuarioLogueado, setUsuarioLogueado] = useState(null)

  useEffect(() => {
    setUsuarioLogueado(getUsuario().userData())
  },[])

  if ((!usuarioLogueado) || (!tramite))
    return <div></div>

  const Locked = () => {
    return <div onClick={() => {
      
      if (tramite.asignadoA.iat === user.iat){
        tramite.asignadoA = null
        dispatch(unLockTramite(Object.assign({},tramite)))
      }
        
    }}>
      <Tag color="red" className="bg-red-500 mb-2 pb-4 " >
        <div><LockFilled /> {usuarioLogueado.iat === tramite.asignadoA.iat ? 'Liberar Tramite' : tramite.asignadoA.GivenName + ', ' + tramite.asignadoA.Surname} </div>
      </Tag>
    </div>
  }

  const UnLocked = () => {
    return <div onClick={async () => {
      tramite.asignadoA = user as Usuario
      await dispatch(InitRevisionTramite())
      console.log(revisionTramite)
      await dispatch(lockTramite(Object.assign({},tramite)))
        
    }}>
      <Tag color="green" className="bg-green-500 mb-2 pb-4 " >
        <div><UnlockFilled /> Tomar Tramite </div>
      </Tag>
    </div>
  }

  if (!tramite)
    return <div></div>

  return <div>
    {!tramite.asignadoA ? <UnLocked ></UnLocked> : <Locked />}
  </div>
}