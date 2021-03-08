import { Button, Empty, Modal, Progress, Table } from 'antd'
import React, { useState } from 'react'
import numeral from 'numeral'
import { getCodigoObra } from '../services/business'

interface CertificadoProps  {
  razonSocial: string
  personeria: string
  cuit: string
  tipoEmpresa: string,
  capacidadContratacion: number,
  capacidadEjecucion: number,
  obras: [],
  porcentajesEspecialidades: []
}

const columnsObras = [
  {
    title: 'Codigo',
    dataIndex: 'Codigo',
    key: 'codigo',
  },
  {
    title: 'Razon social Comitente',
    dataIndex: 'RazonSocialComitente',
    key: 'RazonSocialComitente',
  },
  {
    title: 'Denominación',
    dataIndex: 'Denominacion',
    key: 'Denominacion',
  },
  {
    title: 'Fecha de adjudicación',
    dataIndex: 'FechaAdjudicacion',
    key: 'FechaAdjudicacion',
  },
  {
    title: 'Monto vigente',

    render : (text,record) => <div>{numeral(record.MontoVigente).format('$0,0.00')}</div> ,
    key: 'MontoVigente',
  },
  {
    title: 'Saldo',
    render : (text,record) => <div>{numeral(record.Saldo).format('$0,0.00')}</div> ,
    key: 'Saldo',
  }
]


export default(props:CertificadoProps) => {

  const [showCertificado, setShowCertificado] = useState(false)

  return <div>
    <Modal title="Previsualizar"
      visible={showCertificado}
      onOk={() => setShowCertificado(false)}
      footer={[
        <Button onClick={() => setShowCertificado(false)}>Cerrar</Button>

      ]}
      onCancel={() => setShowCertificado(false)}
      width={1000}>
      <div className="text-3xl font-bold  text-black-700 pb-4 ">{props.razonSocial}</div>

      <div className="grid grid-cols-2 gap-4 mb-4 ">
        <div className="grid grid-cols-2 gap-4 border px-4 py-4" >
          <div>
            <div className="text-sm  text-muted-700 ">Tipo de entidad</div>
            <div className="text-2xl font-bold  text-black-700 ">{props.personeria}</div>
          </div>
          <div>
            <div className="text-sm  text-muted-700 ">CUIT</div>
            <div className="text-2xl font-bold  text-black-700 ">{props.cuit}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 border gap-4 px-4 py-4">
          <div>
            <div className="text-base font-semibold tracking-wider ">Registrado como {props.tipoEmpresa}</div>
          </div>

        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 ">
        <div className="grid grid-cols-2 gap-4 border px-4 py-4" >
          <div>
            <div className="text-sm  text-muted-700 ">Capacidad Económico Financiera de Contratación Referencial</div>
            <div className="text-xl font-bold  text-black-700 ">{ numeral(props.capacidadContratacion).format('$0,0.00')}</div>
          </div>
          <div>
            <div className="text-sm  text-muted-700 ">Capacidad Económico Financiera de Ejecución Referencial</div>
            <div className="text-xl font-bold  text-black-700 ">{ numeral(props.capacidadEjecucion).format('$0,0.00')}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 border gap-4 px-4 py-4 text-center">
          {props.porcentajesEspecialidades.map( (especialidad : any) => <div key={getCodigoObra()}>
            <div className="text-base font-semibold tracking-wider "><Progress type="circle" width={80} percent={especialidad.Porcentaje} /></div>
            <div className="text-sm  text-muted-700 ">{especialidad.DescripcionEspecialidad}</div>
          </div>) }
          

        </div>
      </div>
      <div className="text-xl font-bold mt-4 mb-4">Obras adjudicadas y/o en ejecución</div>
      <Table dataSource={props.obras} columns={columnsObras} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span> No hay información cargada </span>}></Empty>, }} />




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
    <Button onClick={() => setShowCertificado(true)} >Ver Certificado</Button>
  </div>
}