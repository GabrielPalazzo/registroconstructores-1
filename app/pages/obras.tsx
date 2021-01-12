import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { NavigationStep } from '../components/steps'
import { InputText } from '../components/input_text'
import InputTextModal from '../components/input_text_modal'
import { HeaderPrincipal } from '../components/header'
import Upload from '../components/upload'
import Switch from '../components/switch'
import { Button, Card, Steps, Modal, Select, Table, Tabs, Tag, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import SelectModal from '../components/select_modal'
import { Collapse } from 'antd';
import LikeDislike from '../components/like_dislike'
import DatePickerModal from '../components/datePicker_Modal'
import UploadLine from '../components/uploadLine'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { allowGuardar, getCodigoObra, getEmptyTramiteAlta, getTramiteByCUIT, isConstructora, isPersonaFisica, isTramiteEditable } from '../services/business';
import { saveTramite } from '../redux/actions/main'
import { ObrasDatosGenerales } from '../components/obraDatosGenerales'
import { ObrasRedeterminaciones } from '../components/obraRedeterminaciones';
import { ObrasCertificacionesCerradas } from '../components/obrasCertificacionesCerradas';
import { ObrasCertificaciones } from '../components/obrasCertificaciones';
import { ObrasAmpliaciones } from '../components/obrasAmpliaciones'
import { isError } from 'util';

const { TabPane } = Tabs;
const { Step } = Steps;
const { Option } = Select;




export default () => {

  const [modalObras, setModalObras] = useState(false)
  const [scroll, setScroll] = useState(undefined)

  const router = useRouter()
  const dispatch = useDispatch()
  const [waitingType, setWaitingType] = useState('sync')
  const [isLoading, setIsLoading] = useState(false)

  const [tramite, setTramite] = useState<TramiteAlta>(useSelector(state => state.appStatus.tramiteAlta) || getEmptyTramiteAlta())
  const statusGeneralTramite = useSelector(state => state.appStatus.resultadoAnalisisTramiteGeneral)
  const [ubicacionText, setUbicacionText] = useState('')
  const [obra, setObra] = useState<DDJJObra>({
    id: null,
    denominacion: '',
    ubicacion: [],
    datosObra: [],
    ampliaciones: [],
    ubicacionGeografica: [],
    razonSocialUTE: '',
    cuitUTE: '',
    participacionUTE: '',
    razonSocialComitente: '',
    cuitComitente: '',
    montoInicial: '',
    redeterminaciones: [],
    certificacionesVigentes: [],
    certificacionesEjercicioCerrado: [],
    plazoPorContrato: 0,
    prorroga: 0,
    transcurrido: 0,
    restante: 0,
    especialidades: '',
    subespecialidades: ''
  })


  useEffect(() => {
    if (!tramite.cuit)
      router.push('/')
  }, [])


  const save = async () => {
    setWaitingType('sync')

    setIsLoading(true)
    if (tramite._id) {
      await dispatch(saveTramite(tramite))
    } else {
      if (!(await getTramiteByCUIT(tramite.cuit)))
        await dispatch(saveTramite(tramite))
    }
  }

  const updateObjTramite = () => {
    setTramite(Object.assign({}, tramite))
  }

  function callback(key) {
    console.log(key);
  }
  function log(e) {
    console.log(e);
  }

  const agregarUbicacion = () => {
    obra.ubicacion.push(ubicacionText)
    setObra(Object.assign({}, obra))
  }

  const removerUbicacion = (ubicacion) => {
    obra.ubicacion = obra.ubicacion.filter(u => u !== ubicacion)
  }

  function preventDefault(e) {
    e.preventDefault();
    console.log('Clicked! But prevent default.');
  }

  const renderModalEjercicios = () => {
    return (<div>

      <Tabs defaultActiveKey="datosGenerales" onChange={callback}>
        <TabPane tab="General" key="datosGenerales">
          <ObrasDatosGenerales obra={obra} onChange={setObra} />
          <div className="rounded-lg px-4 py-2 pb-4 border mt-6">
            <div className="text-xl font-bold py-2 w-3/4">  Ubicación geográfica</div>
            <div className="grid grid-cols-2 gap-4 ">
              <div className="pb-6" >
                <InputTextModal
                  label="Ubicacion"
                  labelRequired="*"
                  value={ubicacionText}
                  bindFunction={setUbicacionText}
                  labelMessageError=""
                />
              </div>
              <div className="mt-8 ">
                <Button onClick={agregarUbicacion} type="primary" icon={<PlusOutlined />}> Agregar</Button>
              </div>
            </div>

            <div className="mt-4 ">
              {obra.ubicacion.map(u => <Tag closable onClose={() => removerUbicacion(u)} color="#50B7B2">{u}</Tag>)}
            </div>

          </div>
        </TabPane>
        <TabPane tab="Datos Iniciales" key="especialidades">
          <div className="mt-4 pt-2">
            <div className="grid grid-cols-2 gap-4 ">
              <div className="pb-6" >
                <InputTextModal
                  label="Especialidades"
                  labelRequired="*"
                  value={obra.especialidades}
                  bindFunction={e => {
                    obra.especialidades = e
                    setObra(Object.assign({}, obra))
                  }}
                  labelMessageError=""
                />
              </div>
              <div className="pb-6" >
                <InputTextModal
                  label="Subespecialidades"
                  labelRequired="*"
                  value={obra.subespecialidades}
                  bindFunction={e => {
                    obra.subespecialidades = e
                    setObra(Object.assign({}, obra))
                  }}
                  labelMessageError=""
                />
              </div>
              <div className="pb-6" >
                <InputTextModal
                  label="Razón Social de la UTE"
                  labelRequired=""
                  value={obra.razonSocialUTE}
                  bindFunction={e => {
                    obra.razonSocialUTE = e
                    setObra(Object.assign({}, obra))
                  }}
                  labelMessageError=""
                />
              </div>
              <div className="grid grid-cols-2 gap-4 ">
                <div className="pb-6" >
                  <InputTextModal
                    label="CUIT de la UTE"
                    labelRequired=""
                    value={obra.cuitUTE}
                    bindFunction={e => {
                      obra.cuitUTE = e
                      setObra(Object.assign({}, obra))
                    }}
                    labelMessageError=""
                  />
                </div>
                <div className="pb-6" >
                  <InputTextModal
                    label="% de participación"
                    labelRequired=""
                    value={obra.participacionUTE}
                    bindFunction={e => {
                      obra.participacionUTE = e
                      setObra(Object.assign({}, obra))
                    }}
                    labelMessageError=""
                  />
                </div>
              </div>
              <div className="pb-6" >
                <InputTextModal
                  label="Razón Social Comitente"
                  labelRequired="*"
                  value={obra.razonSocialComitente}
                  bindFunction={e => {
                    obra.razonSocialComitente = e
                    setObra(Object.assign({}, obra))
                  }}
                  labelMessageError=""
                />
              </div>
              <div className="grid grid-cols-2 gap-4 ">
                <div className="pb-6" >
                  <InputTextModal
                    label="CUIT comitente"
                    labelRequired="*"
                    value={obra.cuitComitente}
                    bindFunction={e => {
                      obra.cuitComitente = e
                      setObra(Object.assign({}, obra))
                    }}
                    labelMessageError=""
                  />
                </div>
                <div className="pb-6" >
                  <InputTextModal
                    type="number" step="any"
                    label="Monto inicial del contrato"
                    min={0}
                    labelRequired="*"
                    value={obra.montoInicial}
                    bindFunction={e => {
                      obra.montoInicial = e
                      setObra(Object.assign({}, obra))
                    }}
                    labelMessageError=""
                  />
                </div>
              </div>
            </div>
            <div className="pb-6" >
              <Upload
                label="Adjuntar Contrato Inicial / Orden de Compra "
                labelRequired="*"
                labelMessageError=""
              />
            </div>
          </div>

        </TabPane>
        < TabPane tab="Ampliaciones" key="ampliaciones">
          <ObrasAmpliaciones obra={obra} onChange={setObra} />
        </TabPane>
        <TabPane tab="Redeterminaciones" key="redeterminaciones">
          <ObrasRedeterminaciones obra={obra} onChange={setObra} />
        </TabPane>
        <TabPane tab="Certificaciones del Ejercicio Vigente" key="certificaciones">
          <ObrasCertificaciones obra={obra} onChange={setObra} />
        </TabPane>
        <TabPane tab="Certificaciones de Ejercicios Cerrados" key="certificacionesEjerciciosCerrados">
          <ObrasCertificacionesCerradas obra={obra} onChange={setObra} />
        </TabPane>
        <TabPane tab="Plazos" key="plazos">
          <div className="rounded-lg px-4 py-2  pb-4 border mt-6">
            <div className="text-xl font-bold py-2 w-3/4">  Plazos en meses</div>
            <div className="grid grid-cols-4 gap-4 ">

              <div className="pb-6" >
                <InputTextModal
                  label="Por contrato"
                  labelRequired="*"
                  type="number"
                  min={0}
                  value={obra.plazoPorContrato}
                  bindFunction={e => {
                    obra.plazoPorContrato = e
                    setObra(Object.assign({}, obra))
                  }}
                  labelMessageError=""
                />
              </div>
              <div className="pb-6" >
                <InputTextModal
                  label="Prórroga"
                  labelRequired="*"
                  type="number"

                  value={obra.prorroga}
                  bindFunction={e => {
                    obra.prorroga = e
                    setObra(Object.assign({}, obra))
                  }}
                  labelMessageError=""
                />
              </div>
              <div className="pb-6" >
                <InputTextModal
                  label="Transcurrido"
                  labelRequired="*"
                  type="number"
                  min={0}
                  value={obra.transcurrido}
                  bindFunction={e => {
                    obra.transcurrido =e
                    setObra(Object.assign({}, obra))
                  }}
                  labelMessageError=""
                />
              </div>
              <div className="pb-6" >
                <InputTextModal
                  label="Restante"
                  type="number"
                  disabled={true}
                  min={0}
                  labelRequired="*"
                  value={(obra.plazoPorContrato + obra.prorroga) -obra.transcurrido }
                  bindFunction={e => null}
                  labelMessageError=""
                />
              </div>
            </div>
            <div className="pb-6" >
              <Upload
                label="Adjuntar Acta"
                labelRequired="*"
                value=""
                labelMessageError=""
              />
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>)
  }

  const eliminarObra = (obra: DDJJObra) => {
    // tramite.ejercicios = tramite.ejercicios.filter(e => ((e.fechaInicio !== r.fechaInicio) && (r.fechaCierre !== e.fechaCierre)))
    tramite.ddjjObras = tramite.ddjjObras.filter((o: DDJJObra) => o.id !== obra.id)
    setTramite(Object.assign({}, tramite))
    save()
  }



  const editarObrar = (obra: DDJJObra) => {
    setObra(tramite.ddjjObras.filter((o: DDJJObra) => o.id === obra.id)[0])
    setModalObras(true)
  }

  let columns = [
    {
      title: 'Eliminar',
      key: 'action',
      render: (text, record) => (tramite && tramite.status === 'BORRADOR' ? <div onClick={() => eliminarObra(record)}><DeleteOutlined /></div> : <Space size="middle">
      </Space>),
    },
    {
      title: 'Editar',
      key: 'editar',
      render: (text, record) => (tramite && tramite.status === 'BORRADOR' ? <div onClick={() => editarObrar(record)}><EditOutlined /></div> : <Space size="middle">
      </Space>),
    },

    {
      title: 'codigo',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Denominación',
      dataIndex: 'denominacion',
      key: 'denominacion',
    }
  ]

  columns = isTramiteEditable(tramite) ? columns : columns.slice(2,columns.length)





  const renderNoData = () => {
    return (<div>
      <Card>
        <div className="mt-4">
          <div className="text-sm text-center">No hay Datos ingresados</div>
          <div className="text-primary-700 text-sm text-center mt-2 font-bold flex justify-center">Cargue uno presionando Agregar
        <svg width="70" height="31" viewBox="0 0 70 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="pl-2">
              <path d="M30.8624 25.6685L31.1624 26.6225L30.8624 25.6685ZM69.9995 2.03192C70.0171 1.47992 69.5839 1.01814 69.0319 1.00051L60.0365 0.713215C59.4845 0.695585 59.0227 1.12878 59.0051 1.68078C58.9875 2.23279 59.4207 2.69457 59.9727 2.7122L67.9686 2.96757L67.7132 10.9635C67.6956 11.5155 68.1288 11.9773 68.6808 11.9949C69.2328 12.0125 69.6946 11.5793 69.7122 11.0273L69.9995 2.03192ZM1 29.8452C0.886109 30.8387 0.886455 30.8388 0.886848 30.8388C0.88704 30.8388 0.887479 30.8389 0.887865 30.8389C0.888635 30.839 0.889592 30.8391 0.890733 30.8392C0.893015 30.8395 0.896038 30.8398 0.899799 30.8402C0.907319 30.8411 0.917788 30.8422 0.931181 30.8436C0.957967 30.8464 0.996449 30.8503 1.04643 30.855C1.14638 30.8645 1.29231 30.8773 1.48262 30.8914C1.86323 30.9197 2.42138 30.9531 3.14418 30.9753C4.58971 31.0198 6.69421 31.0195 9.35444 30.8432C14.6748 30.4906 22.2199 29.4339 31.1624 26.6225L30.5625 24.7146C21.7905 27.4724 14.4045 28.5041 9.22219 28.8476C6.63111 29.0193 4.59145 29.0189 3.20566 28.9763C2.51279 28.955 1.98348 28.9231 1.63055 28.8969C1.45408 28.8838 1.32173 28.8722 1.23508 28.864C1.19176 28.8599 1.15986 28.8566 1.1396 28.8545C1.12946 28.8534 1.12224 28.8526 1.11795 28.8522C1.1158 28.8519 1.11439 28.8518 1.11371 28.8517C1.11337 28.8517 1.11322 28.8517 1.11325 28.8517C1.11326 28.8517 1.11342 28.8517 1.11343 28.8517C1.11364 28.8517 1.11389 28.8517 1 29.8452ZM31.1624 26.6225C49.0798 20.9894 57.7588 13.9165 69.6842 2.72932L68.3158 1.27068C56.4952 12.3597 48.0739 19.2091 30.5625 24.7146L31.1624 26.6225Z" fill="#0072BB" />
            </svg></div>
        </div>
      </Card>

    </div>)
  }

  const saveObra = async () => {
    tramite.ddjjObras = tramite.ddjjObras.filter((o: DDJJObra) => o.id !== obra.id)
    tramite.ddjjObras.push(obra)
    await save()
    setModalObras(false)
  }

  return (<div>
    <HeaderPrincipal tramite={tramite} onExit={() => router.push('/')} onSave={() => {
      save()
      router.push('/')
    }} />
    <div className="border-gray-200 border-b-2 py-4 px-20">
      <NavigationStep generalStatus={statusGeneralTramite} current={3} completaBalanceYObras={!isPersonaFisica(tramite) || isConstructora(tramite)} />
    </div>
    <div className="px-20 mx-20 py-6 ">
      <div className="flex  content-center  ">
        <div className="text-2xl font-bold py-4 w-3/4">  Declaración jurada de Obras</div>
        <div className=" w-1/4 text-right content-center mt-4 ">
          {isTramiteEditable(tramite) ? <Button type="primary" onClick={() => {
            obra.id = getCodigoObra()
            setObra(Object.assign({}, obra))
            setModalObras(true)
          }} icon={<PlusOutlined />}> Agregar</Button>: ''}
        </div>
      </div>
      <div>
        <Tabs defaultActiveKey="1" onChange={callback} >
          <TabPane tab="Obras" key="1">
            <div className="overflow-x-auto" >
              {tramite.ddjjObras.length === 0 ? renderNoData() : <Table columns={columns} dataSource={tramite.ddjjObras} locale={{ emptyText: "No hay información cargada"}} />}
            </div>
          </TabPane>
          <TabPane tab="Historial" key="2">
          <Table columns={columns}  locale={{ emptyText: "No hay información cargada"}}></Table>
          </TabPane>
        </Tabs>
      </div>

      <Modal
        title={`Datos de la obra ${obra.id}`}
        visible={modalObras}
        onOk={saveObra}
        okText="Guardar"
        onCancel={() => setModalObras(false)}
        cancelText="Cancelar"
        width={1200}
      >
        {renderModalEjercicios()}
      </Modal>

      <div className="mt-6 pt-6 text-center">
       {allowGuardar(tramite) ?<Link href="/enviar_tramite" >
          <Button type="primary" > Continuar</Button>
        </Link>: '' }
        

      </div>
    </div>
  </div>
  )
}



