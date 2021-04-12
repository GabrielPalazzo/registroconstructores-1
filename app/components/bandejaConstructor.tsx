import React, { useState } from 'react'
import { Button, Card, Divider, Drawer, Tag, Input, Collapse, Tabs, Modal, Progress, Table, Empty, Alert, message, Timeline } from 'antd'
import { Space } from 'antd'
import { eliminarBorrador, getColorStatus, rechazarTramite, getObservacionesTecnicoRaw, getReviewAbierta, getStatusObsParsed } from '../services/business'
import { useDispatch } from 'react-redux'
import { setUpdateBorrador } from '../redux/actions/main'
import { useRouter } from 'next/router'
import { CloudDownloadOutlined, EyeOutlined, ArrowRightOutlined, DeleteTwoTone } from '@ant-design/icons';
import { cargarUltimaRevisionAbierta } from '../redux/actions/revisionTramite'
import Certificado from './certificado'

const onSearch = value => console.log(value);
const { Search } = Input;
const { Panel } = Collapse;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export interface BandejaConstructorProps {
  tramites: Array<TramiteAlta>
  refreshFunction: Function,
  masterLoadingFunction: Function
}


export const BandejaConstructor: React.FC<BandejaConstructorProps> = ({
  tramites = [],
  refreshFunction = () => null,
  masterLoadingFunction = () => null
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleObservaciones, setIsModalVisibleObservaciones] = useState(false);
  const [loading, setLoading] = useState(false)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModalObservaciones = () => {
    setIsModalVisibleObservaciones(true);
  };

  const handleOkObservaciones = () => {
    setIsModalVisibleObservaciones(false);
  };

  const handleCancelObservaciones = () => {
    setIsModalVisibleObservaciones(false);
  };



  const dispatch = useDispatch()
  const router = useRouter()
  const [showProfile, setShowProfile] = useState(false)
  const [activeProfile, setActiveProfile] = useState<TramiteAlta>(null)
  const [modalObservaciones, setModalObservaciones] = useState(false)

  const [activeProfile2, setActiveProfile2] = useState<TramiteAlta>(null)
  const [showProfile2, setShowProfile2] = useState(false)


  const EliminarBorrador = (props) => {
    const [showEliminar, setShowEliminar] = useState(false)
    return <div>

      <Modal
        title="Eliminar Borrardor"
        visible={showEliminar}
        onCancel={() => setShowEliminar(false)}
        footer={[
          <Button key="back" onClick={() => setShowEliminar(false)}>
            Cancelar
          </Button>,
          <Button type="primary" loading={loading} onClick={async () => {
            setLoading(true)
            masterLoadingFunction(true)
            await eliminarBorrador(props.tramite)
            await refreshFunction()
            setShowEliminar(false)
            masterLoadingFunction(false)
          }}>
            Eliminar
          </Button>,
        ]}
      >
        <p> Esta seguro que desea eliminar el borrador? </p>
      </Modal>

      <div onClick={() => setShowEliminar(true)}>
        {props.tramite.status === 'BORRADOR' ? <div className="cursor-pointer" style={{ color: '#C62828', marginLeft: "20px", border: "1px dashed #C62828", borderRadius: "24px", textAlign: "center", float: "right", width: "24px", height: "24px" }} ><DeleteTwoTone twoToneColor="#C62828" /> </div> : ''}
      </div>
    </div>
  }


  return <div>
    <Modal title="Certificado"
      visible={showProfile}
      onOk={handleOk}
      footer={[
        <Button type="primary" >Descargar Certificado</Button>,
        <Button onClick={handleCancel}>Cerrar</Button>


      ]}
      onCancel={() => setShowProfile(false)}
      width={1000}>
      <div><Certificado
        razonSocial={activeProfile2 && activeProfile2.razonSocial}
        capacidadContratacion={0}
        capacidadEjecucion={0}
        obras={[]}
        porcentajesEspecialidades={[]}
        tipoEmpresa={'Cns'}
        personeria={'sdf'}
        cuit={'232323'}
      /></div>


    </Modal>


    <Modal title="Ver observaciones"
      visible={isModalVisibleObservaciones} onOk={handleOkObservaciones} onCancel={handleCancelObservaciones}

      width={1000}>

      <div className="text-3xl font-bold  text-black-700 pb-4 ">{activeProfile2 && activeProfile2.razonSocial}</div>


      <div className="text-base  text-black-700 pb-4 ">
      <Timeline>
        {activeProfile2 && activeProfile2.rechazos.map(e => <div>
         
            <Timeline.Item>{e.motivo}</Timeline.Item>
        

        </div>)}
        </Timeline>
        </div>






    </Modal>

    <div className="px-4 md:px-8 mx-8 ">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Todos" key="todos">
          <div className=" grid grid-cols-3  gap-4  ">
            {tramites.map((e: TramiteAlta) => (
              <div className="cursor-pointer    " >

                <Card className="rounded h-full " style={{ background: "#525252" }}
                  actions={[

                    <div className="text-left pl-4">
                      {e.categoria === 'INSCRIPTO'  ? <Certificado
                        cuit={e.cuit}
                      /> : <div className="text-left ">
                      <Button type="link" style={{ textAlign: "left", padding: 0, color: '#0072bb' }}
                        onClick={() => {
                          showModalObservaciones()
                          setActiveProfile2(e)
                          setShowProfile2(true)
                        }}> <EyeOutlined /> Ver Observaciones</Button>
                    </div>}</div>,

                    <div className="text-right pr-4 text-primary-500">
                      <Button type="link" style={{ fontWeight: 'bold', textAlign: "right", color: '#0072bb' }}
                        onClick={async () => {
                          //MONKEY PATCH = Se agrega valores por default a los campos que no los tienen. En futuras versiones sacar este afuera y dejarlo como un "Clean default."
                          if (!e.datosSocietarios.sociedadAnonima.contrato)
                            e.datosSocietarios.sociedadAnonima.contrato = {
                              fecha: '',
                              archivos: []
                            }

                          if (!e)
                            e.datosSocietarios['PJESP'] = {
                              archivosContrato: [],
                              archivoModificacion: [],
                              archivoUltimaModificacion: [],
                              inscripcionConstitutiva: {
                                fecha: '',
                                datos: ''
                              },
                              inscripcionSucursal: {
                                fecha: '',
                                datos: ''
                              },
                              modifcicacionObjeto: {
                                fecha: '',
                                datos: ''
                              },
                              ultimaModificacionInscripcion: {
                                fecha: '',
                                datos: ''
                              },
                              fechaVencimiento: {
                                fecha: ''
                              }

                            }
                          await dispatch(setUpdateBorrador(e))
                          await dispatch(cargarUltimaRevisionAbierta(e))
                          router.push('/informacion_basica')

                        }}>{e.status === 'BORRADOR' ? 'Continuar' : 'Ingresar'}  <ArrowRightOutlined /> </Button></div>,
                  ]}>
                  <div className="pb-2">
                    <div className="flex">

                      <Tag >{e.categoria}</Tag>
                      <Tag color={getColorStatus(e)}>{e.status}</Tag>
                      <div className="absolute inset-y-10 right-0 w-1 pr-6">
                        <EliminarBorrador tramite={e} />
                      </div>



                    </div>
                  </div>
                  <div className="text-lg font-bold text-black-700  "> {e.razonSocial}</div>

                </Card>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="Borradores" key="borradores">
          <div className=" grid grid-cols-3  gap-4  ">
            {tramites.filter(t => t.status === 'BORRADOR').map((e: TramiteAlta) => (
              <div className="cursor-pointer    " >
                <Card className="rounded h-full " style={{ background: "#525252" }}

                  actions={[
                    <div className="text-left pl-4">
                      {e.categoria === 'INSCRIPTO'  ? <Certificado
                        cuit={e.cuit}
                      /> : <div className="text-left ">
                      <Button type="link" style={{ textAlign: "left", padding: 0, color: '#0072bb' }}
                        onClick={() => {
                          showModalObservaciones()
                          setActiveProfile2(e)
                          setShowProfile2(true)
                        }}> <EyeOutlined /> Ver Observaciones</Button>
                    </div>}</div>,

                    <div className="text-right pr-4 text-primary-500">
                      <Button type="link" style={{ fontWeight: 'bold', textAlign: "right", color: '#0072bb' }}
                        onClick={async () => {
                          //MONKEY PATCH = Se agrega valores por default a los campos que no los tienen
                          if (!e.datosSocietarios.sociedadAnonima.contrato)
                            e.datosSocietarios.sociedadAnonima.contrato = {
                              fecha: '',
                              archivos: []
                            }
                          await dispatch(setUpdateBorrador(e))
                          await dispatch(cargarUltimaRevisionAbierta(e))
                          router.push('/informacion_basica')
                        }}>{status === 'BORRADOR' ? 'INGRESAR' : ' Continuar'} <ArrowRightOutlined /> </Button></div>,
                  ]}>
                  <div className="pb-2">
                    <div className="flex">
                      <Tag >{e.categoria}</Tag>
                      <Tag color={getColorStatus(e)}>{e.status}</Tag>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-black-700  "> {e.razonSocial}</div>

                </Card>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="A Verificar" key="aVerificar">
          <div className=" grid grid-cols-3  gap-4  ">
            {tramites.filter(t => t.status === 'VERIFICADO').map((e: TramiteAlta) => (
              <div className="cursor-pointer    " >
                <Card className="rounded h-full " style={{ background: "#525252" }}
                  actions={[
                    <div className="text-left pl-4">
                      <Button type="link" style={{ textAlign: "left", padding: 0, color: '#0072bb' }}
                        onClick={() => {
                          showModal()
                          setActiveProfile(e)
                          setShowProfile(true)
                        }}> <EyeOutlined /> Previsualizar</Button></div>,
                    <div className="text-right pr-4 text-primary-500">
                      <Button type="link" style={{ fontWeight: 'bold', textAlign: "right", color: '#0072bb' }}
                        onClick={async () => {
                          //MONKEY PATCH = Se agrega valores por default a los campos que no los tienen
                          if (!e.datosSocietarios.sociedadAnonima.contrato)
                            e.datosSocietarios.sociedadAnonima.contrato = {
                              fecha: '',
                              archivos: []
                            }
                          await dispatch(setUpdateBorrador(e))
                          await dispatch(cargarUltimaRevisionAbierta(e))
                          router.push('/informacion_basica')
                        }}>Ingresar <ArrowRightOutlined /> </Button></div>,
                  ]}>
                  <div className="pb-2">
                    <div className="flex">
                      <Tag >{e.categoria}</Tag>
                      <Tag color={getColorStatus(e)}>{e.status}</Tag>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-black-700  "> {e.razonSocial}</div>

                </Card>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="Observados" key="Observados">
          <div className=" grid grid-cols-3  gap-4  ">
            {tramites.filter(t => t.status === 'OBSERVADO').map((e: TramiteAlta) => (
              <div className="cursor-pointer    " >
                <Card className="rounded h-full " style={{ background: "#525252" }}
                  actions={[
                    <div className="text-left pl-4">
                      <Button type="link" style={{ textAlign: "left", padding: 0, color: '#0072bb' }}
                        onClick={() => {
                          showModal()
                          setActiveProfile(e)
                          setShowProfile(true)
                        }}> <EyeOutlined /> Previsualizar</Button>
                    </div>,
                    <div className="text-right pr-4 text-primary-500">
                      <Button type="link" style={{ fontWeight: 'bold', textAlign: "right", color: '#0072bb' }}
                        onClick={async () => {
                          //MONKEY PATCH = Se agrega valores por default a los campos que no los tienen
                          if (!e.datosSocietarios.sociedadAnonima.contrato)
                            e.datosSocietarios.sociedadAnonima.contrato = {
                              fecha: '',
                              archivos: []
                            }
                          await dispatch(setUpdateBorrador(e))
                          await dispatch(cargarUltimaRevisionAbierta(e))
                          router.push('/informacion_basica')

                        }}>Ingresar <ArrowRightOutlined /> </Button></div>,
                  ]}>
                  <div className="pb-2">
                    <div className="flex">
                      <Tag >{e.categoria}</Tag>
                      <Tag color={getColorStatus(e)}>{e.status}</Tag>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-black-700  "> {e.razonSocial}</div>

                </Card>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="Pendientes de Revision" key="Pendientes">
          <div className=" grid grid-cols-3  gap-4  ">
            {tramites.filter(t => t.status === 'PENDIENTE DE REVISION').map((e: TramiteAlta) => (
              <div className="cursor-pointer    " >
                <Card className="rounded h-full " style={{ background: "#525252" }}
                  actions={[
                    <div className="text-left pl-4">
                    {e.categoria === 'INSCRIPTO'  ? <Certificado
                      cuit={e.cuit}
                    /> : <div className="text-left ">
                    <Button type="link" style={{ textAlign: "left", padding: 0, color: '#0072bb' }}
                      onClick={() => {
                        showModalObservaciones()
                        setActiveProfile2(e)
                        setShowProfile2(true)
                      }}> <EyeOutlined /> Ver Observaciones</Button>
                  </div>}</div>,
                    <div className="text-right pr-4 text-primary-500">
                      <Button type="link" style={{ fontWeight: 'bold', textAlign: "right", color: '#0072bb' }}
                        onClick={async () => {
                          //MONKEY PATCH = Se agrega valores por default a los campos que no los tienen
                          if (!e.datosSocietarios.sociedadAnonima.contrato)
                            e.datosSocietarios.sociedadAnonima.contrato = {
                              fecha: '',
                              archivos: []
                            }
                          await dispatch(setUpdateBorrador(e))
                          await dispatch(cargarUltimaRevisionAbierta(e))
                          router.push('/informacion_basica')
                        }}>Ingresar <ArrowRightOutlined /> </Button></div>,
                  ]}>
                  <div className="pb-2">
                    <div className="flex">
                      <Tag >{e.categoria}</Tag>
                      <Tag color={getColorStatus(e)}>{e.status}</Tag>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-black-700  "> {e.razonSocial}</div>

                </Card>
              </div>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>

    <style>
      {` 
      .ant-card-actions{
        border-radius: 10px !important;
        background: #FAFAFA !important;
      }
      .ant-card-actions > li:not(:last-child){
        border-right: 0px solid #f0f0f0;
      }
      
      
      `}
    </style>

  </div>
}

const columnsObras = [
  {
    title: 'Codigo',
    dataIndex: 'codigo',
    key: 'codigo',
  },
  {
    title: 'Razon social Comitente',
    dataIndex: 'razonsocialcomitente',
    key: 'razonsocialcomitente',
  },
  {
    title: 'Denominación',
    dataIndex: 'denominacion',
    key: 'denominacion',
  },
  {
    title: 'Fecha de adjudicación',
    dataIndex: 'fechaAdjudicacion',
    key: 'fechaAdjudicacion',
  },
  {
    title: 'Monto vigente',
    dataIndex: 'montovigente',
    key: 'montovigente',
  },
  {
    title: 'Saldo',
    dataIndex: 'saldo',
    key: 'saldo',
  }
]