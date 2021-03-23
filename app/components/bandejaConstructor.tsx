import React, { useState } from 'react'
import { Button, Card, Divider, Drawer, Tag, Input, Collapse, Tabs, Modal, Progress, Table, Empty,Alert,message } from 'antd'
import { Space } from 'antd'
import { eliminarBorrador, getColorStatus, getObservacionesTecnicoRaw, getReviewAbierta, getStatusObsParsed } from '../services/business'
import { useDispatch } from 'react-redux'
import { setUpdateBorrador } from '../redux/actions/main'
import { useRouter } from 'next/router'
import { CloudDownloadOutlined, EyeOutlined, ArrowRightOutlined, DeleteTwoTone } from '@ant-design/icons';
import { cargarUltimaRevisionAbierta } from '../redux/actions/revisionTramite'
import moment from 'moment'

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
  refreshFunction=  () => null,
  masterLoadingFunction = () => null
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  const dispatch = useDispatch()
  const router = useRouter()
  const [showProfile, setShowProfile] = useState(false)
  const [activeProfile, setActiveProfile] = useState<TramiteAlta>(null)


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
        {props.tramite.status === 'BORRADOR' ? <div className="cursor-pointer" style={{  color: '#C62828', marginLeft:"20px",  border:"1px dashed #C62828", borderRadius:"24px",textAlign: "center",float: "right",width: "24px",height: "24px" }} ><DeleteTwoTone twoToneColor="#C62828"  /> </div> : ''}
      </div>
    </div>
  }
  return <div>
    <Modal title="Certificado"
      visible={showProfile}
      onOk={handleOk}
      footer={[
        <Button  type="primary" >Descargar Certificado</Button>,
        <Button onClick={handleCancel}>Cerrar</Button>
        

      ]}
      onCancel={() => setShowProfile(false)}
      width={1000}>
      <div className="text-3xl font-bold  text-black-700 pb-4 ">{activeProfile && activeProfile.razonSocial}</div>

      <div className="grid grid-cols-2 gap-4 mb-4 ">
        <div className="grid grid-cols-2 gap-4 border px-4 py-4" >
          <div>
            <div className="text-sm  text-muted-700 ">Tipo de entidad</div>
            <div className="text-2xl font-bold  text-black-700 ">{activeProfile && activeProfile.personeria}</div>
          </div>
          <div>
            <div className="text-sm  text-muted-700 ">CUIT</div>
            <div className="text-2xl font-bold  text-black-700 ">{activeProfile && activeProfile.cuit}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 border gap-4 px-4 py-4">
          <div>
            <div className="text-base font-semibold tracking-wider ">Registrado como {activeProfile && activeProfile.tipoEmpresa}</div>
            <div className="text-base font-semibold tracking-wider "> En estado {activeProfile && activeProfile.status}</div>
            <div className="mb-4 mt-2" >
      <Alert message="este certificado aun no fue otorgado" showIcon type="info" />
    </div>
          </div>

        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 ">
        <div className="grid grid-cols-2 gap-4 border px-4 py-4" >
          <div>
            <div className="text-sm  text-muted-700 ">Capacidad Económico Financiera de Contratación Referencial</div>
            <div className="text-2xl font-bold  text-black-700 ">{activeProfile && activeProfile.status === 'VERIFICADO' ? 1 : 0}</div>
          </div>
          <div>
            <div className="text-sm  text-muted-700 ">Capacidad Económico Financiera de Ejecución Referencial</div>
            <div className="text-2xl font-bold  text-black-700 ">{activeProfile && activeProfile.status === 'VERIFICADO' ? 1 : 0}</div>
          </div>
        </div>
        {/* 
        <div className="grid grid-cols-2 border gap-4 px-4 py-4 text-center">
          <div>
            <div className="text-base font-semibold tracking-wider "><Progress type="circle" width={80} percent={75} /></div>
            <div className="text-sm  text-muted-700 ">Obras de arquitectura</div>
          </div>
          <div>
            <div className="text-base font-semibold tracking-wider "><Progress type="circle" width={80} percent={75} /></div>
            <div className="text-sm  text-muted-700 ">Sanitaria</div>
          </div>

        </div>
        */}
      </div>
      <div className="text-xl font-bold mt-4 mb-4">Obras adjudicadas y/o en ejecución</div>
      <Table columns={columnsObras} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span> No hay información cargada </span>}></Empty>, }} />




      {/*
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
            {getObservacionesTecnicoRaw(getReviewAbierta(activeProfile)) ? `Trámite correspondiente a Inscripción ante el Registro Nacional de Constructores y Firmas Consultoras de Obras Públicas iniciado el ${moment(activeProfile.createdAt).format('LLL')}.` : ''}
            </div>
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
      </Collapse> */}

    </Modal>

    <div className="px-4 md:px-20 mx-20 ">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Todos" key="todos">
          <div className=" grid grid-cols-3  gap-4  ">
            {tramites.map((e: TramiteAlta) => (
              <div className="cursor-pointer    " >
                
                <Card className="rounded h-full " style={{ background: "#525252" }}
                  actions={[
                    <div className="text-left pl-4">
                      <Button type="link" style={{ textAlign: "left", padding: 0, color: '#0072bb' }}
                        onClick={() => {
                          showModal()
                          setActiveProfile(e)
                          setShowProfile(true)
                        }}> <EyeOutlined /> Ver Certificado</Button></div>,
                       
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
                              archivosContrato:[],
                              archivoModificacion:[],
                              archivoUltimaModificacion:[],
                              inscripcionConstitutiva:{
                                fecha:'',
                                datos:''
                              },
                              inscripcionSucursal:{
                                fecha: '',
                                datos: ''
                              },
                              modifcicacionObjeto: {
                                fecha:'',
                                datos:''
                              },
                              ultimaModificacionInscripcion: {
                                fecha:'',
                                datos: '' 
                              },
                              fechaVencimiento: {
                                fecha:''
                              }
                      
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
                      <div className="absolute inset-y-10 right-0 w-1 pr-6">
                      <EliminarBorrador tramite={e}  />
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
                      <Button type="link" style={{ textAlign: "left", padding: 0, color: '#0072bb' }}
                        onClick={() => {
                          showModal()
                          setActiveProfile(e)
                          setShowProfile(true)
                        }}> <EyeOutlined /> Ver Certificado</Button></div>,
                    <div className="text-right pr-4 text-primary-500">
                      <Button type="link" style={{ fontWeight: 'bold', textAlign: "right", color: '#0072bb' }}
                        onClick={() => {
                          //MONKEY PATCH = Se agrega valores por default a los campos que no los tienen
                          if (!e.datosSocietarios.sociedadAnonima.contrato)
                            e.datosSocietarios.sociedadAnonima.contrato = {
                              fecha: '',
                              archivos: []
                            }
                          dispatch(setUpdateBorrador(e)).then(r => {
                            dispatch(cargarUltimaRevisionAbierta(e))
                            router.push('/informacion_basica')
                          })
                        }}>Ingresar <ArrowRightOutlined /> </Button></div>,
                  ]}>
                  <div className="pb-2">
                    <div className="flex">
                      <Tag color={getColorStatus(e)}>{e.categoria}</Tag>
                      <Tag color="green">{e.status}</Tag>
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
                        onClick={() => {
                          //MONKEY PATCH = Se agrega valores por default a los campos que no los tienen
                          if (!e.datosSocietarios.sociedadAnonima.contrato)
                            e.datosSocietarios.sociedadAnonima.contrato = {
                              fecha: '',
                              archivos: []
                            }
                          dispatch(setUpdateBorrador(e)).then(r => {
                            dispatch(cargarUltimaRevisionAbierta(e))
                            router.push('/informacion_basica')
                          })
                        }}>Ingresar <ArrowRightOutlined /> </Button></div>,
                  ]}>
                  <div className="pb-2">
                    <div className="flex">
                      <Tag color={getColorStatus(e)}>{e.categoria}</Tag>
                      <Tag color="green">{e.status}</Tag>
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
                        }}> <EyeOutlined /> Previsualizar</Button></div>,
                    <div className="text-right pr-4 text-primary-500">
                      <Button type="link" style={{ fontWeight: 'bold', textAlign: "right", color: '#0072bb' }}
                        onClick={() => {
                          //MONKEY PATCH = Se agrega valores por default a los campos que no los tienen
                          if (!e.datosSocietarios.sociedadAnonima.contrato)
                            e.datosSocietarios.sociedadAnonima.contrato = {
                              fecha: '',
                              archivos: []
                            }
                          dispatch(setUpdateBorrador(e)).then(r => {
                            dispatch(cargarUltimaRevisionAbierta(e))
                            router.push('/informacion_basica')
                          })
                        }}>Ingresar <ArrowRightOutlined /> </Button></div>,
                  ]}>
                  <div className="pb-2">
                    <div className="flex">
                      <Tag color={getColorStatus(e)}>{e.categoria}</Tag>
                      <Tag color="green">{e.status}</Tag>
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
                      <Button type="link" style={{ textAlign: "left", padding: 0, color: '#0072bb' }}
                        onClick={() => {
                          showModal()
                          setActiveProfile(e)
                          setShowProfile(true)
                        }}> <EyeOutlined /> Previsualizar</Button></div>,
                    <div className="text-right pr-4 text-primary-500">
                      <Button type="link" style={{ fontWeight: 'bold', textAlign: "right", color: '#0072bb' }}
                        onClick={() => {
                          //MONKEY PATCH = Se agrega valores por default a los campos que no los tienen
                          if (!e.datosSocietarios.sociedadAnonima.contrato)
                            e.datosSocietarios.sociedadAnonima.contrato = {
                              fecha: '',
                              archivos: []
                            }
                          dispatch(setUpdateBorrador(e)).then(r => {
                            dispatch(cargarUltimaRevisionAbierta(e))
                            router.push('/informacion_basica')
                          })
                        }}>Ingresar <ArrowRightOutlined /> </Button></div>,
                  ]}>
                  <div className="pb-2">
                    <div className="flex">
                      <Tag color={getColorStatus(e)}>{e.categoria}</Tag>
                      <Tag color="green">{e.status}</Tag>
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