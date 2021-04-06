import { Button, Empty, Modal, Progress, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import numeral from 'numeral'
import { getCertificados, getCodigoObra } from '../services/business'
import { Loading } from './loading'
import _ from 'lodash' 

interface CertificadoProps  {
  razonSocial?: string
  personeria?: string
  cuit: string
  tipoEmpresa?: string,
  capacidadContratacion?: number,
  capacidadEjecucion?: number,
  obras?: [],
  porcentajesEspecialidades?: []
}

let columns = [
  {
    title: 'codigo',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Denominación',
    dataIndex: 'denominacion',
    key: 'denominacion',
  },
  {
    title: 'Comitente',
    dataIndex: 'comitente',
    render: (text, record : DDJJObra) => <div>{record.razonSocialComitente}</div>,
  },
  {
    title: 'Monto Vigente',
    dataIndex: 'Monto Vigente',
    render: (text, record : DDJJObra) => <div>{numeral(record.montoInicial + (record.redeterminaciones.length !== 0 ? record.redeterminaciones.map(r => r.monto).reduce((val, acc) => acc = val + acc) : 0) + (record.ampliaciones.length !== 0 ? record.ampliaciones.map(r => r.monto).reduce((val, acc) => acc = val + acc) : 0)).format('$0,0.00')}</div>,
    
  },
  {
    title: 'Certificado a la fecha',
    dataIndex: 'certificado',
    render: (text, record : DDJJObra) => <div>{numeral(record.certificaciones.length !== 0 ? record.certificaciones.map(r => r.monto).reduce((val, acc) => acc = val + acc) : 0).format('$0,0.00')}</div>,
  },{

    title: 'Saldo',
    dataIndex: 'saldo',
    render: (text, record: DDJJObra) => <div>{numeral((record.montoInicial) + (record.redeterminaciones.length !== 0 ? record.redeterminaciones.map(r => r.monto).reduce((val, acc) => acc = val + acc) : 0) + (record.ampliaciones.length !== 0 ? record.ampliaciones.map(r => r.monto).reduce((val, acc) => acc = val + acc) : 0) - (record.certificaciones.length !== 0 ? record.certificaciones.map(r => r.monto).reduce((val, acc) => acc = val + acc) : 0)).format('$0,0.00')}</div>
  }
]


export default(props:CertificadoProps) => {

  const [certificado, setCertificado] = useState<CertificadoCapacidad>(null)
  const [showCertificado, setShowCertificado] = useState(false)

  useEffect(() => {
    (async () => {
      if (!certificado){
        const certificados: Array<CertificadoCapacidad> = await getCertificados(props.cuit)
        setCertificado(_.last(certificados))
      }
    })()
  },[])


  return <div>
    {certificado && <Modal title="Previsualizar"
      visible={showCertificado}
      onOk={() => setShowCertificado(false)}
      footer={[
        <Button onClick={() => setShowCertificado(false)}>Cerrar</Button>

      ]}
      onCancel={() => setShowCertificado(false)}
      width={1000}>
      <div className="text-3xl font-bold  text-black-700 pb-4 ">{certificado.tramite.razonSocial}</div>

      <div className="grid grid-cols-2 gap-4 mb-4 ">
        <div className="grid grid-cols-2 gap-4 border px-4 py-4" >
          <div>
            <div className="text-sm  text-muted-700 ">Tipo de entidad</div>
            <div className="text-2xl font-bold  text-black-700 ">{certificado.tramite.personeria}</div>
          </div>
          <div>
            <div className="text-sm  text-muted-700 ">CUIT</div>
            <div className="text-2xl font-bold  text-black-700 ">{props.cuit}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 border gap-4 px-4 py-4">
          <div>
            <div className="text-base font-semibold tracking-wider ">Registrado como {certificado.tramite.tipoEmpresa}</div>
          </div>

        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 ">
        <div className="grid grid-cols-2 gap-4 border px-4 py-4" >
          <div>
            <div className="text-sm  text-muted-700 ">Capacidad Económico Financiera de Contratación Referencial</div>
            <div className="text-xl font-bold  text-black-700 ">{ numeral(certificado.capacidadFinanciera).format('$0,0.00')}</div>
          </div>
          <div>
            <div className="text-sm  text-muted-700 ">Capacidad Económico Financiera de Ejecución Referencial</div>
            <div className="text-xl font-bold  text-black-700 ">{ numeral(certificado.capacidadEjecucion).format('$0,0.00')}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 border gap-4 px-4 py-4 text-center">
          {[].map( (especialidad : any) => <div key={getCodigoObra()}>
            <div className="text-base font-semibold tracking-wider "><Progress type="circle" width={80} percent={especialidad.Porcentaje} /></div>
            <div className="text-sm  text-muted-700 ">{especialidad.DescripcionEspecialidad}</div>
          </div>) }
          

        </div>
      </div>
      <div className="text-xl font-bold mt-4 mb-4">Obras Consideradas en el cálculo de capacidad</div>
      <Table dataSource={certificado.tramite.ddjjObras.filter(o => o.status && o.status==='APROBADA')} columns={columns} locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span> No hay información cargada </span>}></Empty>, }} />





    </Modal>}
    <Button loading={!certificado} onClick={() => setShowCertificado(true)} >Ver Certificado</Button>
  </div>
}