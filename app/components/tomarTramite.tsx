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
    setUsuarioLogueado(getUsuario())
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
      <Tag color="red" className="" >
        <div><LockFilled /> {usuarioLogueado.userData().iat === tramite.asignadoA.iat ? 'Liberar Tramite' : tramite.asignadoA.GivenName + ', ' + tramite.asignadoA.Surname} </div>
      </Tag>
    </div>
  }

  const UnLocked = () => {
    return <div onClick={async () => {
      if ((tramite.status==='PENDIENTE DE REVISION')||(tramite.status==='A SUPERVISAR')||(tramite.status==='SUBSANADO')) {
        tramite.asignadoA = user as Usuario
        await dispatch(InitRevisionTramite())
        await dispatch(lockTramite(Object.assign({},tramite)))
      }
      
        
    }}>
      <Tag color="green" className="" >
        <div><UnlockFilled /> Tomar Tramite </div>
      </Tag>
    </div>
  }

  if (!tramite)
    return <div></div>

  const showComponente = () => {
    /*
    if (tramite.status ==='PENDIENTE DE REVISION' && (usuarioLogueado.isControlador() || usuarioLogueado.isSupervisor()))
      return true

    if (tramite.status ==='A VERIFICAR' && usuarioLogueado.isSupervisor())
      return true*/

    if (tramite.status==='PENDIENTE DE REVISION' || (tramite.status==='A SUPERVISAR' && getUsuario().isSupervisor()) || (tramite.status=='SUBSANADO' && getUsuario().isBackOffice()))
      return true

    return false
  }

  const isLocked = () => {
    return tramite.asignadoA!==null
  }

  

  console.log(showComponente(),isLocked())
  return <div>
    {showComponente() ? !isLocked() ? <UnLocked />: <Locked />: ''}
  </div>
}