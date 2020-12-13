import React, { useState } from 'react'
import { Button, Card, Divider, Drawer, Tag, Statistic, Row, Col, } from 'antd'
import { Space } from 'antd'
import { getColorStatus, getStatusObsParsed } from '../services/business'
import {useDispatch} from 'react-redux'
import { setUpdateBorrador } from '../redux/actions/main'
import {useRouter} from 'next/router'

export interface BandejaConstructorProps {
  tramites: Array<TramiteAlta>
}

export const BandejaConstructor: React.FC<BandejaConstructorProps> = ({
  tramites = []
}) => {

  const dispatch = useDispatch()
  const router = useRouter()
  const [showProfile, setShowProfile] = useState(false)
  const [activeProfile, setActiveProfile] = useState<TramiteAlta>(null)


  return <div>
    <Drawer
      title='Información Resumida'
      placement="right"
      width={640}
      closable={false}
      onClose={() => setShowProfile(false)}
      visible={showProfile}
    >
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="text-xs  text-mutted-700 pb-1 ">Razón Social:</div>
          <div className="text-lg font-bold text-black-700 pb-2 ">{activeProfile && activeProfile.razonSocial}</div>
        </Card>

        <Card>
          <div className="text-xs  text-mutted-700 pb-1 ">CUIT:</div>
          <div className="text-lg font-bold text-black-700 pb-2 ">{activeProfile && activeProfile.cuit}</div>
        </Card>
        <Card>
          <div className="text-xs  text-mutted-700 pb-1 ">Estado de la empresa:</div>
          <div className="text-lg font-bold text-black-700 pb-2 ">{activeProfile && activeProfile.status}</div>
        </Card>
        <Card>
          <div className="text-xs  text-mutted-700 pb-1 ">Aclaraciones al estado:</div>
          <div className="text-lg font-bold text-black-700 pb-2 "> {getStatusObsParsed(activeProfile)}</div>
        </Card>
        <Card>
          <div className="text-xs  text-mutted-700 pb-1 ">Tipo de empresa:</div>
          <div className="text-lg font-bold text-black-700 pb-2 ">{activeProfile && activeProfile.tipoEmpresa}</div>
        </Card>
        <Card>
          <div className="text-xs  text-mutted-700 pb-1 ">Capacidad de contratación y ejecución:</div>
          <div className="text-lg font-bold text-black-700 pb-2 "> --</div>
        </Card>
        <Card>
          <div className="text-xs  text-mutted-700 pb-1 ">Fecha del último cálculo de capacidad:</div>
          <div className="text-lg font-bold text-black-700 pb-2 "> --</div>
        </Card>
        <Card>
          <div className="text-xs  text-mutted-700 pb-1 ">Constancia de Inscripción</div>
          <div className="text-lg font-bold text-primary-700 pb-2 "> 
          <Button style={{ marginTop: 16 , color:"#0072bb" }} type="text">
            Descargar
      </Button>
        </div>
        </Card>
      </div>
     

    </Drawer>


    <div className="px-4 grid grid-cols-3 mr-4  ">
      {tramites.map((e: TramiteAlta) => (
        <div className="cursor-pointer  mr-4    " >
          <Card className="rounded h-full   ">
            <div className="pb-2">
              <Tag color={getColorStatus(e)}>{e.status}</Tag>
            </div>
            <div className="text-lg font-bold text-black-700 pb-2 "> {e.razonSocial}</div>
            <div className="flex  items-end">
              <Space>
                <Button type="text" onClick={() => {
                  setActiveProfile(e)
                  setShowProfile(true)
                }}>Previsualizar</Button>
                <Button type="primary" onClick={() => {
                  dispatch(setUpdateBorrador(e)).then( r =>{
                    router.push('/informacion_basica')
                  })
                }}>Ingresar</Button>
              </Space>
            </div>
          </Card>
        </div>
      ))}

    </div>

  </div>
}