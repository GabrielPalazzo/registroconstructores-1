import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { NavigationStep } from '../components/steps'
import { InputText } from '../components/input_text'
import InputTextModal from '../components/input_text_modal'
import { HeaderPrincipal } from '../components/header'
import Upload from '../components/upload'
import Switch from '../components/switch'
import { Button, Card, Steps, Modal, Select, Table, Tabs, Tag, Space, Empty, Popconfirm, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import SelectModal from '../components/select_modal'
import { Collapse } from 'antd';
import LikeDislike from '../components/like_dislike'
import DatePickerModal from '../components/datePicker_Modal'
import UploadLine from '../components/uploadLine'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { allowGuardar, getCodigoObra,getEmptyObras, getEmptyTramiteAlta, getTramiteByCUIT, isConstructora, isPersonaFisica, isTramiteEditable } from '../services/business';
import { saveTramite } from '../redux/actions/main'
import { ObrasDatosGenerales } from '../components/obraDatosGenerales'
import { ObrasRedeterminaciones } from '../components/obraRedeterminaciones';
import { ObrasAmpliaciones } from '../components/obrasAmpliaciones'
import { isError } from 'util';
import { CertificacionesPrecargadas } from '../components/obraCertificacionesPrecargadas';
import SelectMultiple from '../components/select_multiple'
import SelectSimple from '../components/select'
import InputNumberModal from '../components/input_number'

const { TabPane } = Tabs;
const { Step } = Steps;
const { Option } = Select;

function confirm(e) {
  console.log(e);
  message.success('Se elimino correctamente');
}

function cancel(e) {
  console.log(e);
  message.error('Ha cancelado la operacion');
}




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
  const [prorrogaFecha, setProrrogaFecha] = useState('')
  const [prorrogaMeses, setProrrogaMeses] = useState(0)
  const [dataSource, setDataSource] = useState('')
  const [archivosPlazos, setArchivosPlazos] = useState<Array<Archivo>>([])

  const [obra, setObra] = useState<DDJJObra>(getEmptyObras())



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
    save()
    setIsLoading(false)
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


  const add = async () => {
    if (!obra.prorrogaNueva)
      obra.prorrogaNueva = []

    obra.prorrogaNueva.push({
      prorrogaFecha,
      prorrogaMeses,
      archivosPlazos
    })
    setArchivosPlazos([])
    setProrrogaMeses(0)
    setProrrogaFecha('')
    updateObjTramite()
    await save()
    setIsLoading(false)

  }

  const renderModalObra = () => {
    return (<div>
      <div className="text-right">
        <Tag>Monto Vigente</Tag> <Tag color="green" className="mr-2">{obra.montoInicial + (obra.redeterminaciones.length !== 0 ? obra.redeterminaciones.map(r => r.monto).reduce((val, acc) => acc = val + acc) : 0) + (obra.ampliaciones.length !== 0 ? obra.ampliaciones.map(r => r.monto).reduce((val, acc) => acc = val + acc) : 0)}</Tag>
        <Tag>Certificado Total </Tag> <Tag color="magenta" className="mr-2">{(obra.certificaciones.length !== 0 ? obra.certificaciones.map(r => r.monto).reduce((val, acc) => acc = val + acc) : 0)}</Tag>
        <Tag>Saldo </Tag> <Tag color="blue" className="mr-2">{(obra.montoInicial) + (obra.redeterminaciones.length !== 0 ? obra.redeterminaciones.map(r => r.monto).reduce((val, acc) => acc = val + acc) : 0) + (obra.ampliaciones.length !== 0 ? obra.ampliaciones.map(r => r.monto).reduce((val, acc) => acc = val + acc) : 0) - (obra.certificaciones.length !== 0 ? obra.certificaciones.map(r => r.monto).reduce((val, acc) => acc = val + acc) : 0)}</Tag>

      </div>
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

            <div className="grid grid-cols-3 gap-4 ">
              <div className="rounded-lg px-4 py-2 mb-4  pb-4 border">
                <div >
                  <SelectSimple
                    value={obra.especialidad1}
                    bindFunction={e => {
                      obra.especialidad1 = e
                      updateObjTramite()
                    }}
                    title="Especialidad"
                    defaultOption="Seleccione una especialidad"
                    labelRequired="*"
                    labelMessageError=""
                    required
                    option={tipoEspecialidad.map(u => (
                      <Option value={u.value}>{u.label}</Option>
                    ))} />

                </div>
                <div >
                  <SelectMultiple
                    labelRequired="*"
                    value={obra.subEspecialidad1}
                    bindFunction={e => {
                      obra.subEspecialidad1 = e
                      setObra(Object.assign({}, obra))
                    }}
                    title="Seleccione la SubEspecialidad"
                    labelObservation=""
                    labeltooltip=""
                    labelMessageError=""
                    placeholder="Tipo de suebEspecialidad"
                    required
                    options={tipoSubespecialidadIA.filter(se => se.parent === obra.especialidad1).map(u => (
                      <Option value={u.value} label={u.label}>
                        {u.label}
                      </Option>
                    ))

                    } />

                </div>
                <div className="pb-6" >
                  <InputTextModal
                    label="Otros"
                    labelRequired=""
                    value={obra.subEspecialidades1Otros}
                    bindFunction={e => {
                      obra.subEspecialidades1Otros = e
                      setObra(Object.assign({}, obra))
                    }}
                    labelMessageError=""
                    
                  />
                </div>

              </div>
              <div className="rounded-lg px-4 py-2 mb-4  pb-4 border">
                <div >
                  <SelectSimple
                    value={obra.especialidad2}
                    bindFunction={e => {
                      obra.especialidad2 = e
                      updateObjTramite()
                    }}
                    title="Especialidad"
                    defaultOption="Seleccione una especialidad"
                    labelRequired=""
                    labelMessageError=""
                    required
                    option={tipoEspecialidad.map(u => (
                      <Option value={u.value}>{u.label}</Option>
                    ))} />

                </div>
                <div >
                  <SelectMultiple
                    labelRequired=""
                    value={obra.subEspecialidad2}
                    bindFunction={e => {
                      obra.subEspecialidad2 = e
                      setObra(Object.assign({}, obra))
                    }}
                    title="Seleccione la SubEspecialidad"
                    labelObservation=""
                    labeltooltip=""
                    labelMessageError=""
                    placeholder="Tipo de suebEspecialidad"
                    required
                    options={tipoSubespecialidadIA.filter(se => se.parent === obra.especialidad2).map(u => (
                      <Option value={u.value} label={u.label}>
                        {u.label}
                      </Option>
                    ))

                    } />

                </div>
                <div className="pb-6" >
                  <InputTextModal
                    label="Otros"
                    labelRequired=""
                    value={obra.subEspecialidades2Otros}
                    bindFunction={e => {
                      obra.subEspecialidades2Otros = e
                      setObra(Object.assign({}, obra))
                    }}
                    labelMessageError=""
                    
                  />
                </div>

              </div>
              <div className="rounded-lg px-4 py-2 mb-4  pb-4 border">
                <div >
                  <SelectSimple
                    value={obra.especialidad3}
                    bindFunction={e => {
                      obra.especialidad3 = e
                      updateObjTramite()
                    }}
                    title="Especialidad"
                    defaultOption="Seleccione una especialidad"
                    labelRequired=""
                    labelMessageError=""
                    required
                    option={tipoEspecialidad.map(u => (
                      <Option value={u.value}>{u.label}</Option>
                    ))} />

                </div>
                <div >
                  <SelectMultiple
                    labelRequired=""
                    value={obra.subEspecialidad3}
                    bindFunction={e => {
                      obra.subEspecialidad3 = e
                      setObra(Object.assign({}, obra))
                    }}
                    title="Seleccione la SubEspecialidad"
                    labelObservation=""
                    labeltooltip=""
                    labelMessageError=""
                    placeholder="Tipo de suebEspecialidad"
                    required
                    options={tipoSubespecialidadIA.filter(se => se.parent === obra.especialidad3).map(u => (
                      <Option value={u.value} label={u.label}>
                        {u.label}
                      </Option>
                    ))

                    } />

                </div>
                <div className="pb-6" >
                  <InputTextModal
                    label="Otros"
                    labelRequired=""
                    value={obra.subEspecialidades3Otros}
                    bindFunction={e => {
                      obra.subEspecialidades3Otros = e
                      setObra(Object.assign({}, obra))
                    }}
                    labelMessageError=""
                    
                  />
                </div>

              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 ">

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

                  <InputNumberModal
                    type="number"
                    label="Monto inicial del contrato"
                    labelRequired="*"
                    min={0} step="any"
                    placeholder="000000,000 "
                    value={obra.montoInicial}
                    bindFunction={e => {
                      obra.montoInicial = e
                      setObra(Object.assign({}, obra))
                    }}
                    labelMessageError=""
                    required />

                </div>
              </div>
            </div>
            <div className="pb-6" >
              <Upload
                label="Adjuntar Contrato Inicial / Orden de Compra "
                labelRequired="*"
                labelMessageError=""
                defaultValue={obra.archivosOrdenDeCompra as any}
                onOnLoad={file => {
                  if (!obra.archivosOrdenDeCompra)
                    obra.archivosOrdenDeCompra = []
                  obra.archivosOrdenDeCompra.push(file)
                  setObra(Object.assign({}, obra))
                }}
                onRemove={fileToRemove => {
                  obra.archivosOrdenDeCompra = obra.archivosOrdenDeCompra.filter(f => f.cid !== fileToRemove.cid)
                  setObra(Object.assign({}, obra))
                }}

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

        <TabPane tab="Certificaciones" key="certificaciones">
          <CertificacionesPrecargadas obra={obra} onChange={setObra} />
        </TabPane>

        <TabPane tab="Plazos" key="plazos">
          <div className="rounded-lg px-4 py-2  pb-4 border mt-6">
            <div className="text-xl font-bold py-2 w-3/4">  Plazos en meses</div>
            <div className="grid grid-cols-4 gap-4 ">

              <div className="pb-6" >
                <InputNumberModal
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
              <div className="pb-6 hidden" >
                <InputNumberModal
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
                <InputNumberModal
                  label="Prórroga"
                  labelRequired="*"
                  type="number"

                  value={obra.prorrogaNueva && obra.prorrogaNueva.length !== 0 ? obra.prorrogaNueva.map(d => d.prorrogaMeses).reduce((val, acc) => acc = val + acc) : 0}
                  bindFunction={e => {
                    null
                  }}
                  labelMessageError=""
                />
              </div>
              <div className="pb-6" >
                <InputNumberModal
                  label="Transcurrido"
                  labelRequired="*"
                  type="number"
                  min={0}
                  step=".01"
                  value={obra.transcurrido}
                  bindFunction={e => {
                    obra.transcurrido = e
                    setObra(Object.assign({}, obra))
                  }}
                  labelMessageError=""
                />
              </div>
              <div className="pb-6" >
                <InputNumberModal
                  label="Restante"
                  type="number"
                  disabled={true}
                  min={0}
                  step=".01"
                  labelRequired="*"
                  value={(obra.plazoPorContrato + (obra.prorrogaNueva && obra.prorrogaNueva.length !== 0 ? obra.prorrogaNueva.map(d => d.prorrogaMeses).reduce((val, acc) => acc = val + acc) : 0)) - obra.transcurrido}
                  bindFunction={e => null}
                  labelMessageError=""
                />
              </div>
            </div>

            <div className="text-xl font-bold py-2 w-3/4"> Agregar nueva Prórroga</div>
            <div className="grid grid-cols-4 gap-4 ">
              <div className="pb-6" >
                <DatePickerModal
                  placeholder="Fecha  (dd/mm/yyyy)"
                  label="Fecha "
                  labelRequired="*"
                  labelObservation=""
                  labeltooltip=""
                  labelMessageError=""
                  value={prorrogaFecha}

                  bindFunction={(value) => { setProrrogaFecha(value) }}
                />
              </div>
              <div className="pb-6" >
                <InputNumberModal
                  label="Meses"
                  type="number" step="any"
                  labelRequired="*"

                  placeholder="000000,000 "
                  value={prorrogaMeses}
                  bindFunction={(value) => { setProrrogaMeses(value) }}
                  labelMessageError=""
                  required />

              </div>
              <div className="pb-6" >
                <Upload
                  label="Adjuntar Acta"
                  labelRequired="*"
                  defaultValue={archivosPlazos as any}
                  onOnLoad={file => {
                    if (!archivosPlazos)
                      archivosPlazos.push(file)
                    setObra(Object.assign({}, obra))
                  }}
                  onRemove={fileToRemove => {
                    setArchivosPlazos(Object.assign([], archivosPlazos.filter(f => f.cid !== fileToRemove.cid)))
                  }}
                />
              </div>
              <div className="mt-8 ">
                <Button type="primary" onClick={add} icon={<PlusOutlined />}> Agregar</Button>
              </div>

            </div>
            <Table
              columns={columnsPlazos}
              dataSource={Object.assign([], obra.prorrogaNueva)}
              locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span> No hay información cargada </span>}></Empty>, }}
              summary={pageData => {
                return <div>
                  {pageData.length > 0 ? <div className="ml-4 font-semibold">
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <div >{pageData.map(d => d.prorrogaMeses).reduce((val, acc) => acc = val + acc)}</div>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </div> : ''}
                </div>
              }} />

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

    setObra(Object.assign({}, tramite.ddjjObras.filter((o: DDJJObra) => o.id === obra.id)[0]))
    setModalObras(true)
  }


  const removePlazos = (record) => {
    obra.prorrogaNueva = obra.prorrogaNueva.filter(s => s.prorrogaFecha !== record.prorrogaFecha)
    save()
  }




  let columnsPlazos = [

    {
      title: 'Eliminar',
      key: 'action',
      render: (text, record) => (tramite.status === 'BORRADOR' ? <Popconfirm
        title="Esta seguro que lo  deseas Eliminar  La Obra"
        onConfirm={() => removePlazos(record)}
        onCancel={cancel}
        okText="Si, Eliminar"
        cancelText="Cancelar"
      > <div className="cursor-pointer" ><DeleteOutlined /></div></Popconfirm> : <Space size="middle">
          <LikeDislike />
        </Space>),
    },


    {
      title: 'Fecha',
      dataIndex: 'prorrogaFecha',
      key: 'prorrogaFecha',
    },
    {
      title: 'Meses',
      dataIndex: 'prorrogaMeses',
      key: 'prorrogaMeses',
    },
    {
      title: 'Adjunto',
      dataIndex: 'archivosPlazos',
      key: 'archivosPlazos',
    }
  ]

  let columns = [
    {
      title: 'Eliminar',
      key: 'action',
      render: (text, record) => (tramite && tramite.status === 'BORRADOR' ? <Popconfirm
        title="Esta seguro que lo  deseas Eliminar  La Obra"
        onConfirm={() => eliminarObra(record)}
        onCancel={cancel}
        okText="Si, Eliminar"
        cancelText="Cancelar"
      > <div className="cursor-pointer" ><DeleteOutlined /></div></Popconfirm> : <Space size="middle">
          <LikeDislike />
        </Space>),
    },
    {
      title: 'Editar',
      key: 'editar',
      render: (text, record) => (tramite && tramite.status === 'BORRADOR' ? <div onClick={() => editarObrar(record)} className="cursor-pointer"><EditOutlined /></div> : <Space size="middle">
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

  columns = isTramiteEditable(tramite) ? columns : columns.slice(2, columns.length)





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
    <div className="border-gray-200 border-b-2  px-10">
      <NavigationStep generalStatus={statusGeneralTramite} current={3} completaBalanceYObras={!isPersonaFisica(tramite) || isConstructora(tramite)} />
    </div>
    <div className="px-20 mx-20 py-6 ">
      <div className="flex  content-center  ">
        <div className="text-2xl font-bold py-4 w-3/4">  Declaración jurada de Obras</div>
        <div className=" w-1/4 text-right content-center mt-4 ">
          {isTramiteEditable(tramite) ? <Button type="primary" onClick={() => {
            const obraEmpty = getEmptyObras()
            obraEmpty.id = getCodigoObra()
            // obra.id = getCodigoObra()
            setObra(Object.assign({}, obraEmpty))
            setModalObras(true)
          }} icon={<PlusOutlined />}> Agregar</Button> : ''}
        </div>
      </div>
      <div>
        <Tabs defaultActiveKey="1" onChange={callback} >
          <TabPane tab="Obras" key="1">
            <div className="overflow-x-auto" >
              {tramite.ddjjObras.length === 0 ? renderNoData() : <Table columns={columns} dataSource={tramite.ddjjObras} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span> No hay información cargada </span>}></Empty> }} />}
            </div>
          </TabPane>
          <TabPane tab="Historial" key="2">
            <Table columns={columns} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span> No hay información cargada </span>}></Empty>, }}></Table>
          </TabPane>
        </Tabs>
      </div>

      <Modal
        title={`Datos de la obra ${obra.id} `}
        visible={modalObras}
        onOk={saveObra}
        okText="Guardar"
        onCancel={() => setModalObras(false)}
        cancelText="Cancelar"
        width={1200}
      >
        {renderModalObra()}
      </Modal>

      <div className="mt-6 pt-6 text-center">
        {allowGuardar(tramite) ? <Link href="/enviar_tramite" >
          <Button type="primary" > Continuar</Button>
        </Link> : ''}


      </div>
    </div>
  </div>
  )
}
const tipoEspecialidad = [
  {
    label: 'INGENIERIA VIAL',
    value: 'IV',
  },
  {
    label: 'INGENIERÍA HIDRÁULICA',
    value: 'IH',
  },
  {
    label: 'SANITARIA',
    value: 'SANITARIA',
  },
  {
    label: 'INGENIERÍA FERROVIARIA',
    value: 'IF',
  },
  {
    label: 'INGENIERÍA ELECTROMECANICA',
    value: 'IE',
  },
  {
    label: 'INGENIERÍA  MECÁNICA',
    value: 'IM',
  },
  {
    label: 'INGENIERÍA AMBIENTAL',
    value: 'IA',
  },
  {
    label: 'ENERGIA',
    value: 'ENERGIA',
  },
  {
    label: 'INGENIERÍA NAVAL',
    value: 'IN',
  },
  {
    label: 'TELECOMUNICACIONES',
    value: 'TELECOMUNICACIONES',
  },
  {
    label: 'ELECTRÓNICA',
    value: 'ELECTRONICA',
  },
  {
    label: 'OBRAS MENORES EN LA VIA PÚBLICA',
    value: 'OMVP',
  },
  {
    label: 'INFORMÁTICA',
    value: 'INFORMATICA',
  },
  {
    label: 'INGENIERÍA AERONÁUTICA Y ESPACIAL',
    value: 'IAE',
  },
  {
    label: 'OBRAS DE ARQUITECTURA',
    value: 'OA',
  },


]

const tipoSubespecialidadIA = [
  {
    label: 'Pavimentos Rígidos',
    value: 'PR',
    parent: 'IV',
  },
  {
    label: 'Pavimentos Flexibles',
    value: 'PF',
    parent: 'IV',
  },
  {
    label: 'Puentes (Obras de arte mayor)',
    value: 'Puentes',
    parent: 'IV',
  },
  {
    label: 'Aeródromos (Pistas)',
    value: 'AERODROMO',
    parent: 'IV',
  },
  {
    label: 'Túneles',
    value: 'Tuneles',
    parent: 'IV',
  },
  {
    label: 'Movimiento de Suelos',
    value: 'MS',
    parent: 'IV',
  },
  {
    label: 'Estabilización de Terrenos, Autopistas',
    value: 'EA',
    parent: 'IV',
  },
  {
    label: 'Gaviones',
    value: 'Gaviones',
    parent: 'IV',
  },
  {
    label: 'Conservación de Caminos',
    value: 'CC',
    parent: 'IV',
  },
  {
    label: 'Pavimentos Urbanos y articulados',
    value: 'PUA',
    parent: 'IV',
  },
  {
    label: 'Voladuras',
    value: 'Voladuras',
    parent: 'IV',
  },
  {
    label: 'Limpieza de Terrenos, Desbosques',
    value: 'LTD',
    parent: 'IV',
  },
  {
    label: 'Destronque',
    value: 'Destronque',
    parent: 'IV',
  },
  {
    label: 'Relevamiento Topográfico,(Apertura de Trazas)',
    value: 'RT',
    parent: 'IV',
  },
  {
    label: 'Señalización Horizontal y Vertical',
    value: 'SHV',
    parent: 'IV',
  },
  {
    label: 'Obras de Arte Menor',
    value: 'OAM',
    parent: 'IV',
  },
  {
    label: 'Presas,Diques,Escolleras',
    value: 'PDE',
    parent: 'IH',
  }, {
    label: 'Obras de Arte Menor',
    value: 'OAM',
    parent: 'IH',
  }, {
    label: 'Canales Navegables',
    value: 'Canales Navegables',
    parent: 'IH',
  }, {
    label: 'Portuarias',
    value: 'Portuarias',
    parent: 'IH',
  }, {
    label: 'Acueductos',
    value: 'Acueductos',
    parent: 'IH',
  }, {
    label: 'Hidromecánicas',
    value: 'Hidromecánicas',
    parent: 'IH',
  }, {
    label: 'Acondicionamiento Hidráulico,',
    value: 'Acondicionamiento_Hidráulico,',
    parent: 'IH',
  }, {
    label: '(Sistematización de ríos y lagos)',
    value: 'SRL',
    parent: 'IH',
  }, {
    label: 'Canales de riego, Esclusas',
    value: 'CRE',
    parent: 'IH',
  }, {
    label: 'Dragados',
    value: 'Dragados',
    parent: 'IH',
  }, {
    label: 'Perforaciones',
    value: 'Perforaciones',
    parent: 'IH',
  }, {
    label: 'Tablestacados',
    value: 'Tablestacados',
    parent: 'IH',
  }, {
    label: 'Defensa aluvionales',
    value: 'Defensa_aluvionales',
    parent: 'IH',
  }, {
    label: 'Planta de Potabilización Pozos',
    value: 'PPB',
    parent: 'SANITARIA',
  }, {
    label: 'Plantas de Depuración',
    value: 'PD',
    parent: 'SANITARIA',
  }, {
    label: 'Impulsión y Bombeo',
    value: 'Impulsión_Bombeo',
    parent: 'SANITARIA',
  }, {
    label: 'Redes Principales de Desagüe',
    value: 'RPDD',
    parent: 'SANITARIA',
  }, {
    label: 'Redes Principales de Provisión de Agua',
    value: 'RPPA',
    parent: 'SANITARIA',
  }, {
    label: 'Pozos-Perforaciones-Drenaje',
    value: 'Pozos-Perforaciones-Drenaje',
    parent: 'SANITARIA',
  }, {
    label: 'Redes Secundarias de Desagüe',
    value: 'RSD',
    parent: 'SANITARIA',
  }, {
    label: 'Redes Secundarias de Provisión de Agua',
    value: 'RSPA',
    parent: 'SANITARIA',
  }, {
    label: 'Impermeabilización',
    value: 'Impermeabilización',
    parent: 'SANITARIA',
  }
  , {
    label: 'Mantenimiento en General',
    value: 'MG',
    parent: 'SANITARIA',
  }, {
    label: 'Electrificación',
    value: 'Electrificación',
    parent: 'IF',
  }, {
    label: 'Subterráneos',
    value: 'Subterráneos',
    parent: 'IF',
  }, {
    label: 'Material Rodante',
    value: 'Material Rodante',
    parent: 'IF',
  }, {
    label: 'Señalización y Enclavamiento',
    value: 'Señalización_Enclavamiento',
    parent: 'IF',
  }, {
    label: 'Instalación para Seguridad',
    value: 'Instalación_para_Seguridad',
    parent: 'IF',
  }, {
    label: 'Mantenimiento ferroviario',
    value: 'Mantenimiento_ferroviario',
    parent: 'IF',
  }, {
    label: 'Vía y Obra',
    value: 'VO',
    parent: 'IF',
  }, {
    label: 'Centrales Hidroeléctricas',
    value: 'Centrales_Hidroeléctricas',
    parent: 'IE',
  }, {
    label: 'Línea de Alta Tensión',
    value: 'LAT',
    parent: 'IE',
  }, {
    label: 'Subusinas',
    value: 'Subusinas',
    parent: 'IE',
  }, {
    label: 'Centrales Térmicas',
    value: 'Centrales_Térmicas',
    parent: 'IE',
  }, {
    label: 'Centrales Nucleares',
    value: 'Centrales_Nucleares',
    parent: 'IE',
  }, {
    label: 'Gasoductos',
    value: 'Gasoductos',
    parent: 'IE',
  }, {
    label: 'Planta de Impulsión y Almacenamiento',
    value: 'Planta_de _mpulsión_Almacenamiento',
    parent: 'IE',
  }, {
    label: 'Instalaciones eléctricas',
    value: 'Instalaciones_eléctricas',
    parent: 'IE',
  }, {
    label: 'Instalaciones Electromecánicas',
    value: 'Instalaciones_Electromecánicas',
    parent: 'IE',
  }, {
    label: 'Instalaciones Electrotérmicas',
    value: 'InstalacionesElectrotérmicas',
    parent: 'IE',
  }, {
    label: 'Instalaciones Acústicas',
    value: 'InstalacionesAcústicas',
    parent: 'IE',
  }, {
    label: 'Línea de Media y Baja Tensión',
    value: 'LíneaMediaBajaTensións',
    parent: 'IE',
  }, {
    label: 'Electrificación Rural',
    value: 'ElectrificaciónRural',
    parent: 'IE',
  }, {
    label: 'Red de alumbrado público',
    value: 'Redalumbradopúblico',
    parent: 'IE',
  }, {
    label: 'Semaforización',
    value: 'Semaforización',
    parent: 'IE',
  }, {
    label: 'Señalamiento y Balizamiento',
    value: 'SeñalamientoBalizamiento',
    parent: 'IE',
  }, {
    label: 'Radioeléctrico',
    value: 'Radioeléctrico',
    parent: 'IE',
  }, {
    label: 'Mantenimiento eléctrico',
    value: 'Mantenimientoeléctrico',
    parent: 'IE',
  }, {
    label: 'Instalaciones Termomecánicas',
    value: 'InstalacionesTermomecánicas',
    parent: 'IE',
  }, {
    label: 'Instalaciones Térmicas, Refrigeración',
    value: 'InstalacionesTérmicasRefrigeración',
    parent: 'IE',
  }, {
    label: 'Aire Acondicionado',
    value: 'AireAcondicionado',
    parent: 'IE',
  }, {
    label: 'Energía Solar',
    value: 'EnergíaSolar',
    parent: 'IE',
  }
  , {
    label: 'Horno de Ventilación',
    value: 'HornoVentilación',
    parent: 'IE',
  }
  , {
    label: 'Soldaduras',
    value: 'Soldaduras',
    parent: 'IE',
  }
  , {
    label: 'Mantenimiento Térmico',
    value: 'MantenimientoTérmico',
    parent: 'IE',
  }
  , {
    label: 'Redes de Distribución de Gas',
    value: 'RedesDistribuciónGas',
    parent: 'IE',
  }
  , {
    label: 'Provisión de Gas Natural',
    value: 'ProvisiónGasNatural',
    parent: 'IE',
  }, {
    label: 'Elevadores de Granos',
    value: 'ElevadoresGranos',
    parent: 'IM',
  }, {
    label: 'Translación Vertical Ascensores',
    value: 'TranslaciónVerticalAscensores',
    parent: 'IM',
  }, {
    label: 'Montacargas',
    value: 'Montacargas',
    parent: 'IM',
  }, {
    label: 'Cintas Transportadoras',
    value: 'CintasTransportadoras',
    parent: 'IM',
  }, {
    label: 'Silos y Norias',
    value: 'SilosNorias',
    parent: 'IM',
  }, {
    label: 'Fábrica de Motores',
    value: 'FábricaMotores',
    parent: 'IM',
  }, {
    label: 'Equipos Rodantes',
    value: 'EquiposRodantes',
    parent: 'IM',
  }, {
    label: 'Mantenimiento Mecánico',
    value: 'MantenimientoMecánico',
    parent: 'IM',
  }, {
    label: 'Instalaciones Industriales',
    value: 'InstalacionesIndustriales',
    parent: 'IM',
  }, {
    label: 'Instalaciones Metalúrgicas',
    value: 'InstalacionesMetalúrgicas',
    parent: 'IM',
  }, {
    label: 'Servicios de mantenimiento y limpieza',
    value: 'ServiciosmantenimientoLimpieza',
    parent: 'IA',
  }, {
    label: 'Recolección de residuos Peligrosos',
    value: 'RecolecciónresiduosP',
    parent: 'IA',
  }, {
    label: 'Recolección de residuos Domesticos',
    value: 'RecolecciónresiduosD',
    parent: 'IA',
  }, {
    label: 'Oleoducto, Poliductos',
    value: 'OleoductoPoliductos',
    parent: 'ENERGIA',
  }, {
    label: 'Plantas de Impulsión y Almacenamiento',
    value: 'PlantasAlmacenamiento',
    parent: 'ENERGIA',
  }, {
    label: 'Perforaciones y Pozos',
    value: 'PerforacionesPozos',
    parent: 'ENERGIA',
  }, {
    label: 'Instalación y Mantenimiento de Surtidores de Combustible',
    value: 'InstalaciónCombustible',
    parent: 'ENERGIA',
  }, {
    label: 'Servicios para la Industria del Petróleo',
    value: 'ServiciosPetróleo',
    parent: 'ENERGIA',
  }, {
    label: 'Servicios para la Industria de Mantenimiento',
    value: 'ServiciosIndustriaMantenimiento',
    parent: 'ENERGIA',
  }, {
    label: 'Astilleros (Construcción de Buques)',
    value: 'AstillerosConstrucciónBuques',
    parent: 'IN',
  }, {
    label: 'Talleres Navales',
    value: 'TalleresNavales',
    parent: 'IN',
  }, {
    label: 'Reparaciones Navales',
    value: 'ReparacionesNavales',
    parent: 'IN',
  }, {
    label: 'Reflotamientos',
    value: 'Reflotamientos',
    parent: 'IN',
  }, {
    label: 'Salvamentos Marítimos y Fluviales',
    value: 'SalvamentosMarítimosFluviales',
    parent: 'IN',
  }, {
    label: 'Telegrafía y Telefonía',
    value: 'TelegrafíaTelefonía',
    parent: 'TELECOMUNICACIONES',
  }, {
    label: 'Telecomunicaciones',
    value: 'Telecomunicaciones',
    parent: 'TELECOMUNICACIONES',
  }, {
    label: 'Radioenlace',
    value: 'Radioenlace',
    parent: 'TELECOMUNICACIONES',
  }, {
    label: 'Radar',
    value: 'Radar',
    parent: 'TELECOMUNICACIONES',
  }, {
    label: 'Sistema de Señalización',
    value: 'SistemaSeñalización',
    parent: 'ELECTRONICA',
  }, {
    label: 'Letreros Electrónicos',
    value: 'LetrerosElectrónicos',
    parent: 'ELECTRONICA',
  }, {
    label: 'Reparación de veredas y/o calzadas',
    value: 'ReparaciónVeredas',
    parent: 'OMVP',
  }, {
    label: 'Bacheos en calles de hormigón y/o asfalto',
    value: 'Bacheoscalles',
    parent: 'OMVP',
  }, {
    label: 'Construcción de rampas para discapacitados',
    value: 'Construcciónrampasdiscapacitados',
    parent: 'OMVP',
  }, {
    label: 'Construcción de bicisendas',
    value: 'Construcciónbicisendas',
    parent: 'OMVP',
  }, {
    label: 'Construcción de cercos en terrenos baldíos',
    value: 'ConstrucciónCercosTerrenosBaldíos',
    parent: 'OMVP',
  }, {
    label: 'Colocación de señales urbanas',
    value: 'ColocaciónSeñalesUrbanas',
    parent: 'OMVP',
  }, {
    label: 'Colocación de refugios para colectivos y/o taxis',
    value: 'ColocaciónRefugio',
    parent: 'OMVP',
  }, {
    label: 'Podas de árboles',
    value: 'Podasárboles',
    parent: 'OMVP',
  }, {
    label: 'Informática',
    value: 'Informática',
    parent: 'INFORMATICA',
  }, {
    label: 'Ingeniería Aeronáutica y Espacial',
    value: 'IngenieríaAeronáuticaEspacial',
    parent: 'IAE',
  }, {
    label: 'Construcciones Civiles en General',
    value: 'ConstruccionesCivilesGeneral',
    parent: 'OA',
  }, {
    label: 'Construcciones Industriales',
    value: 'ConstruccionesIndustriales',
    parent: 'OA',
  }, {
    label: 'Estructuras de Hormigón Armado',
    value: 'EstructurasHormigónArmado',
    parent: 'OA',
  }, {
    label: 'Urbanismo',
    value: 'Urbanismo',
    parent: 'OA',
  }, {
    label: 'Construcciones Prefabricadas',
    value: 'ConstruccionesPrefabricadas',
    parent: 'OA',
  }, {
    label: 'Construcciones Metálicas',
    value: 'ConstruccionesMetálicas',
    parent: 'OA',
  }, {
    label: 'Estructuras Metálicas (galpones, etc.)',
    value: 'Estructuras_Metálicas',
    parent: 'OA',
  }, {
    label: 'Restauración y Refacción de Edificios',
    value: 'RestauraciónEdificios',
    parent: 'OA',
  }, {
    label: 'Restauración de Sitios, Monumentos y Lugares Históricos.',
    value: 'RestauraciónMonumentos ',
    parent: 'OA',
  }, {
    label: 'Instalaciones contra incendio',
    value: 'Instalacionesincendio',
    parent: 'OA',
  }, {
    label: 'Instalaciones de Seguridad',
    value: 'InstalacionesSeguridad',
    parent: 'OA',
  }, {
    label: 'Instalaciones Complementarias',
    value: 'InstalacionesComplementarias',
    parent: 'OA',
  }, {
    label: 'Demoliciones y Excavaciones',
    value: 'DemolicionesExcavaciones',
    parent: 'OA',
  }, {
    label: 'Aislaciones Acústicas',
    value: 'AislacionesAcusticas',
    parent: 'OA',
  }, {
    label: 'Aislaciones Termicas',
    value: 'AislacionesTermicas',
    parent: 'OA',
  }, {
    label: 'Aislaciones Hidrófugas',
    value: 'AislacionesHidrófugas',
    parent: 'OA',
  }, {
    label: 'Impermeabilizaciones',
    value: 'Impermeabilizaciones',
    parent: 'OA',
  }
  , {
    label: 'Albañilería',
    value: 'Albañilería',
    parent: 'OA',
  }
  , {
    label: 'Limpieza de Frentes',
    value: 'LimpiezaFrentes',
    parent: 'OA',
  }
  , {
    label: 'Pinturas y Afines',
    value: 'PinturasAfines',
    parent: 'OA',
  }
  , {
    label: 'Marmolería',
    value: 'Marmolería',
    parent: 'OA',
  }
  , {
    label: 'Carpintería',
    value: 'Carpintería',
    parent: 'OA',
  }
  , {
    label: 'Herrería',
    value: 'Herrería',
    parent: 'OA',
  }, {
    label: 'Yesería',
    value: 'Yesería',
    parent: 'OA',
  }, {
    label: 'Vidriería',
    value: 'Vidriería',
    parent: 'OA',
  }, {
    label: 'Decoración Integral (provisión y colocación)',
    value: 'DecoraciónIntegral',
    parent: 'OA',
  }, {
    label: 'Limpieza de Edificios',
    value: 'LimpiezadeEdificios',
    parent: 'OA',
  }, {
    label: 'Parquización y Forestación',
    value: 'ParquizaciónyForestación',
    parent: 'OA',
  }, {
    label: 'Equipamiento Urbano',
    value: 'EquipamientoUrbano',
    parent: 'OA',
  }, {
    label: 'Amoblamientos',
    value: 'Amoblamientos',
    parent: 'OA',
  }



]