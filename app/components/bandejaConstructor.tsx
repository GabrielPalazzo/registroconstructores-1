import React, { useState } from 'react'
import { Button, Card, Divider, Drawer, Tag, Input, Collapse } from 'antd'
import { Space } from 'antd'
import { getColorStatus, getStatusObsParsed } from '../services/business'
import { useDispatch } from 'react-redux'
import { setUpdateBorrador } from '../redux/actions/main'
import { useRouter } from 'next/router'
import { CloudDownloadOutlined, EyeOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { cargarUltimaRevisionAbierta } from '../redux/actions/revisionTramite'


const onSearch = value => console.log(value);
const { Search } = Input;
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

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
      <Collapse defaultActiveKey={['1']} onChange={callback}>
        <Panel header="Razón Social:" key="1">
          <div className="text-sm  text-black-700 ">{activeProfile && activeProfile.razonSocial}</div>
        </Panel>
        <Panel header="CUIT:" key="2">
          <div className="text-sm  text-black-700 ">{activeProfile && activeProfile.cuit}</div>
        </Panel>
        <Panel header="Estado de la empresa:" key="3">
          <div className="text-sm  text-black-700 "> <Tag color={getColorStatus(activeProfile)}>{activeProfile && activeProfile.status}</Tag></div>
        </Panel>
        <Panel header="Aclaraciones al estado:" key="4">
          <div className="text-sm  text-black-700 ">
            <ul>
              <li>{getStatusObsParsed(activeProfile)}</li>
            </ul></div>
        </Panel>
        <Panel header="Tipo de empresa:" key="5">
          <div className="text-sm  text-black-700 ">{activeProfile && activeProfile.tipoEmpresa}</div>
        </Panel>
        <Panel header="Capacidad de contratación y ejecución:" key="6">
          <div className="text-sm  text-black-700 ">{activeProfile && activeProfile.status === 'VERIFICADO' ? 1 : 0}</div>
        </Panel>
        <Panel header="Fecha del último cálculo de capacidad:" key="7">
          <div className="text-sm  text-black-700 ">{activeProfile && activeProfile.status === 'VERIFICADO' ? 1 : 0}</div>
        </Panel>
        <Panel header="Constancia de Inscripción" key="8">
          <div className="text-lg font-bold text-black-700  ">
            <Button style={{ color: "#0072bb", fontWeight: "bold", textAlign: "left", padding: 0, }} type="link">
              <CloudDownloadOutlined /> Descargar
              </Button>
          </div>
        </Panel>
      </Collapse>
    </Drawer>



    <div className="px-4 md:px-20 grid grid-cols-3  gap-4  ">
      {tramites.map((e: TramiteAlta) => (
        <div className="cursor-pointer  mr-4    " >
          <Card className="rounded h-full " style={{ background: "#525252" }}
            actions={[
              <Button type="link" style={{ textAlign: "left", padding: 0 }}
                onClick={() => {
                  setActiveProfile(e)
                  setShowProfile(true)
                }}> <EyeOutlined /> Previsualizar</Button>,
              <Button type="link" onClick={() => {
                dispatch(setUpdateBorrador(e)).then(r => {
                  dispatch(cargarUltimaRevisionAbierta(e))
                  router.push('/informacion_basica')
                })
              }}>Ingresar <ArrowRightOutlined /> </Button>,
            ]}>
            <div className="pb-2">
              <div className="flex">
              <Tag color={getColorStatus(e)}>{e.categoria}</Tag>
              {e.categoria ==='PRE INSCRIPTO' ? e.asignadoA ? <Tag color="green">En revision</Tag> :<Tag color="red">Pendiente de revisión</Tag> : ''}
              </div>
            </div>
            <div className="text-lg font-bold text-black-700  "> {e.razonSocial}</div>

          </Card>
        </div>
      ))}

    </div>
    <style>
      {` 
      .ant-card-actions{
        border-radius: 10px !important;
        background: #FAFAFA !important;
      }
      `}
    </style>

  </div>
}