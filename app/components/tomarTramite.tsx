import React from 'react'
import { Tag } from 'antd'
import { UnlockFilled, LockFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { lockTramite, unLockTramite } from '../redux/actions/main'

export interface TomarTramiteProps {
  user: Usuario
}

export const TomarTramite: React.FC<TomarTramiteProps> = ({
  user = null
}) => {

  const dispatch = useDispatch()
  const tramite: TramiteAlta = useSelector(state => state.appStatus.tramiteAlta || {})

  const Locked = () => {
    tramite.asignadoA = null

    return <div onClick={() => dispatch(unLockTramite(Object.assign({},tramite)))}>
      <Tag color="red" className="bg-red-500 mb-2 pb-4 " >
        <div><LockFilled /> Liberar Tramite </div>
      </Tag>
    </div>
  }

  const UnLocked = () => {

    tramite.asignadoA = user as Usuario

    return <div onClick={async () => {
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