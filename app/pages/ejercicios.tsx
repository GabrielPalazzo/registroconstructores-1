import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { NavigationStep } from '../components/steps'
import { InputText } from '../components/input_text'
import InputTextModal from '../components/input_text_modal'
import { HeaderPrincipal } from '../components/header'
import Upload from '../components/upload'
import Switch from '../components/switch'
import { Button, Card, Steps, Modal, Select, Table, Tabs, Space, Alert,Empty,ConfigProvider } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import SelectModal from '../components/select_modal'
import { Collapse } from 'antd';
import LikeDislike from '../components/like_dislike'
import DatePickerModal from '../components/datePicker_Modal'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getEmptyTramiteAlta, getTramiteByCUIT, isPersonaFisica, isConstructora, isTramiteEditable, allowGuardar } from '../services/business';
import { saveTramite, setTramiteView } from '../redux/actions/main'
import { updateRevisionTramite } from '../redux/actions/revisionTramite';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/es_ES';

const { TabPane } = Tabs;
const { Step } = Steps;
const { Option } = Select;




export default () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [modalEjercicios, setModalEjercicios] = useState(false)
  const [scroll, setScroll] = useState(undefined)
  const [waitingType, setWaitingType] = useState('sync')
  const [isLoading, setIsLoading] = useState(false)

  const [tramite, setTramite] = useState<TramiteAlta>(useSelector(state => state.appStatus.tramiteAlta) || getEmptyTramiteAlta())
  const tipoAccion: string = useSelector(state => state.appStatus.tipoAccion) || 'SET_TRAMITE_NUEVO'
  const statusGeneralTramite = useSelector(state => state.appStatus.resultadoAnalisisTramiteGeneral)

  const [inicioEjercicio, setInicioEjercicio] = useState('')
  const [cierreEjercicio, setCierreEjercicio] = useState('')
  const [activoCorriente, setActivoCorriente] = useState(0)
  const [activoNoCorriente, setActivoNoCorriente] = useState(0)
  const [pasivoCorriente, setPasivoCorriente] = useState(0)
  const [pasivoNoCorriente, setPasivoNoCorriente] = useState(0)
  const [ventasDelEjercicio, setVentasDelEjercicio] = useState(0)
  const [capitalSuscripto, setCapitalSuscripto] = useState(0)
  const [archivos,setArchivos] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!tramite.cuit && tipoAccion !== 'SET_TRAMITE_NUEVO')
      router.push('/')
  }, [])


  const save = async () => {
    setWaitingType('sync')

    setIsLoading(true)
    if (tramite._id) {
      await dispatch(saveTramite(Object.assign({}, tramite)))
    } else {
      if (!(await getTramiteByCUIT(tramite.cuit)))
        await dispatch(saveTramite(Object.assign({}, tramite)))
    }
  }

  const updateObjTramite = () => {
    setTramite(Object.assign({}, tramite))
  }

  function callback(key) {
    console.log(key);
  }
  



  const renderModalEjercicios = () => {
    return (<div>
     
      {error ? <div className="mb-4">
        <Alert
          message='Error'
          description={error}
          type="error"
          showIcon
          closable
          afterClose={() => setError('')}
        /></div> : ''}
      <div className="grid grid-cols-2 gap-4 ">
        <div className="pb-6" >
          <DatePickerModal
            label="Inicio del ejercicio"
            labelRequired="*"
            placeholder="dd/mm/aaaa"
            value={inicioEjercicio}
            bindFunction={setInicioEjercicio}
            labelMessageError=""
          />

        </div>
        <div className="pb-6" >
          <DatePickerModal
            label="Cierre del ejercicio"
            labelRequired="*"
            placeholder="dd/mm/aaaa"
            value={cierreEjercicio}
            bindFunction={setCierreEjercicio}
            labelMessageError=""
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 ">

        <div className="pb-6" >
          <InputTextModal
            type="number" 
            label="Activo Corriente"
            labelRequired="*"
            min={0} step={0.01}
            placeholder="000000,000 "
            value={activoCorriente}
            bindFunction={(val) => setActivoCorriente(parseInt(val, 10.33))}
            labelMessageError=""
            required />

        </div>

        <div className="pb-6" >
          <InputTextModal
            label="Activo no Corriente"
            type="number" 
            labelRequired="*"
            placeholder="000000,000 "
            min={0.1}
            step="any"
            value={activoNoCorriente}
            bindFunction={(val) => setActivoNoCorriente(parseInt(val, 10))}
            labelMessageError=""
            required />

        </div>
        <div className="pb-6" >
          <InputTextModal
            type="number" step="any"
            label="Activo Total"
            placeholder="000000,000 "
            value={activoCorriente + activoNoCorriente}
            bindFunction={() => null}
            labelMessageError=""
            disabled={true} />

        </div>
        <div className="pb-6" >
          <InputTextModal
            label="Pasivo Corriente"
            type="number" step="any"
            labelRequired="*"
            min={0}
            placeholder="000000,000 "
            value={pasivoCorriente}
            bindFunction={(val) => setPasivoCorriente(parseInt(val, 10))}
            labelMessageError=""
            required />

        </div>

        <div className="pb-6" >
          <InputTextModal
            label="Pasivo no Corriente"
            type="number" step="any"
            labelRequired="*"
            placeholder="000000,000 "
            value={pasivoNoCorriente}
            min={0}
            bindFunction={(val) => setPasivoNoCorriente(parseInt(val, 10))}
            labelMessageError=""
            required />

        </div>
        <div className="pb-6" >
          <InputTextModal
            label="Pasivo Total"
            type="number" step="any"
            placeholder="000000,000 "
            bindFunction={() => null}
            value={pasivoNoCorriente + pasivoCorriente}
            labelMessageError=""
            disabled />

        </div>
        <div className="pb-6" >
          <InputTextModal
            label="Ventas del ejercicio"
            type="number" step="any"
            labelRequired="*"
            min={0}
            placeholder="000000,000 "
            value={ventasDelEjercicio}
            bindFunction={setVentasDelEjercicio}
            labelMessageError=""
            required />

        </div>

        <div className="pb-6" >
          <InputTextModal
            label={isPersonaFisica(tramite) ? 'Caja y Bancos' : 'Capital suscripto'}
            type="number" step="any"
            labelRequired="*"
            placeholder="000000,000 "
            min={0}
            value={capitalSuscripto}
            bindFunction={setCapitalSuscripto}
            labelMessageError=""
            required />

        </div>
        <div className="pb-6" >
          <InputTextModal
            label="Patrimonio Neto"
            placeholder="000000,000 "
            min={0}
            value={(activoNoCorriente + activoCorriente) - (pasivoCorriente + pasivoNoCorriente)}
            labelMessageError=""
            disabled />

        </div>
        <div className="pb-6" >
          <Upload
            label="Adjunte el balance contable  "
            labelRequired="*"
            labelMessageError=""
            defaultValue={archivos as any}
            onOnLoad={file => {
              archivos.push(file)
              setArchivos(Object.assign([],archivos))
            }}
            onRemove={fileToRemove => {
              setArchivos(Object.assign([],archivos.filter(f => f.cid!==fileToRemove.cid)))
            }}
          />
        </div>

      </div>
    </div> )
  }

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

  let columnsBalances = [
    {
      title: 'Eliminar',
      key: 'action',
      render: (text, record) => (tramite && tramite.status === 'BORRADOR' ? <div onClick={() => eliminarEjercicio(record)} className="cursor-pointer"><DeleteOutlined /></div> : <Space size="middle">

      </Space>),
    },
    {
      title: 'Inicio de ejercicio',
      dataIndex: 'fechaInicio',
      key: 'fechaInicio',
    },
    {
      title: 'Cierre de ejercicio',
      dataIndex: 'fechaCierre',
      key: 'fechaCierre',
    },
    {
      title: 'Activo Corriente',
      dataIndex: 'activoCorriente',
      key: 'activoCorriente',
    },
    {
      title: 'Activo no Corriente',
      dataIndex: 'activoNoCorriente',
      key: 'activoNoCorriente',
    },

    {
      title: 'Pasivo Corriente',
      dataIndex: 'pasivoCorriente',
      key: 'pasivoCorriente',
    },
    {
      title: 'Pasivo no  Corriente',
      dataIndex: 'pasivoNoCorriente',
      key: 'pasivoNoCorriente',
    },
    {
      title: 'Ventas del ejercicio',
      dataIndex: 'ventasEjercicio',
      key: 'ventasEjercicio',
    },
    {
      title: isPersonaFisica(tramite) ? 'Caja y Bancos' : 'Capital suscripto',
      dataIndex: 'capitalSuscripto',
      key: 'capitalSuscripto',
    }
  ]

  columnsBalances = isTramiteEditable(tramite)? columnsBalances : columnsBalances.slice(1,columnsBalances.length)





  const eliminarEjercicio = (r) => {
    tramite.ejercicios = tramite.ejercicios.filter(e => ((e.fechaInicio !== r.fechaInicio) && (r.fechaCierre !== e.fechaCierre)))
    setTramite(Object.assign({}, tramite))
    save()
  }

  const agregarEjercicio = async (e) => {
    if (!tramite.ejercicios)
      tramite.ejercicios = []



    const errores = []

    if (!inicioEjercicio) errores.push('Debe indicar la fecha de inicio de ejercicio')
    if (!cierreEjercicio) errores.push('Debe indicar la fecha de cierre de ejercicio')


    if (errores.length > 0) {
      setError(errores.map(e => e).join(', '))
      return
    }

    const fechaInicio = moment(inicioEjercicio, 'DD/MM/YYYY')
    const fechaCierre = moment(cierreEjercicio, 'DD/MM/YYYY')

    if (fechaCierre.diff(fechaInicio, 'M') > 12) {
      setError('El balance no puede tener más de un año calendario. Revise sus fechas de inicio y cierre')
      return
    }

    if (isPersonaFisica(tramite) && (cierreEjercicio.split('/')[0] !== '31' && cierreEjercicio.split('/')[1] !== '12')) {
      setError("La fecha de cierre para personas físicas debe ser 31/12/AAAA")
      return
    }

    if (capitalSuscripto === 0) {
      setError(isPersonaFisica(tramite) ? 'El rubro Caja/Bancos no puede ser 0' : 'El capital suscripto no puede ser 0')
      return
    }

    if ((activoCorriente + activoNoCorriente) === 0) {
      setError('El activo no puede ser 0')
      return
    }

    if ((pasivoCorriente + pasivoNoCorriente) === 0) {
      setError('El pasivo no puede ser 0')
      return
    }


    tramite.ejercicios.push({
      fechaCierre: cierreEjercicio,
      fechaInicio: inicioEjercicio,
      activoCorriente,
      activoNoCorriente,
      pasivoCorriente,
      pasivoNoCorriente,
      capitalSuscripto,
      ventasEjercicio: ventasDelEjercicio,
      archivos
    })
    setTramite(Object.assign({}, tramite))
    await save()
    setModalEjercicios(false)
  }


  return (<div>
    <HeaderPrincipal tramite={tramite} onExit={() => router.push('/')} onSave={() => {
      save()
      router.push('/')
    }} />
    <div className="border-gray-200 border-b-2 px-10">
      <NavigationStep generalStatus={statusGeneralTramite} completaBalanceYObras={!isPersonaFisica(tramite) || isConstructora(tramite)} current={2} />
    </div>
    <div className="px-20 mx-20 py-6 ">
      <div className="flex  content-center  ">
        <div className="text-2xl font-bold py-4 w-3/4">  Ejercicios</div>
        <div className=" w-1/4 text-right content-center mt-4 ">
          {isTramiteEditable(tramite) ?<Button type="primary" onClick={() => setModalEjercicios(true)} icon={<PlusOutlined />}> Agregar</Button> : '' }
        </div>
      </div>
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}  >
          <TabPane tab="Balances" key="1">
            <div className="overflow-x-auto" >
              {!tramite.ejercicios || tramite.ejercicios.length === 0 ? renderNoData() : <Table columns={columnsBalances}  locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span> No hay información cargada </span>}></Empty>,}}  dataSource={Object.assign([],tramite.ejercicios)} scroll={{ x: 1800 }}  />}
            </div>
          </TabPane>
          <TabPane tab="Historial" key="2">
            <Table columns={columnsBalances} scroll={{ x: 1800 }} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span> No hay información cargada </span>}></Empty>,}} />
          </TabPane>
        </Tabs>
      </div>

      <Modal
        title="Nuevo Ejercicio"
        visible={modalEjercicios}
        onOk={agregarEjercicio}
        okText="Guardar"
        onCancel={() => setModalEjercicios(false)}
        cancelText="Cancelar"
        width={1000}
      >
        {renderModalEjercicios()}
      </Modal>

      <div className="mt-6 pt-6 text-center">
        {allowGuardar(tramite) ? <Link href="/obras" >
          <Button type="primary" >Continuar</Button>
        </Link>: ''}
      </div>
    </div>
  </div>
  )
}




