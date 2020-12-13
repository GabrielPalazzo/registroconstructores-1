import React, { useState } from 'react'
import { Button, Card, Divider, Drawer, Tag } from 'antd'
import { Space } from 'antd'
import {getColorStatus, getStatusObsParsed} from '../services/business'

export interface BandejaConstructorProps {
  tramites: Array<TramiteAlta>
}

export const BandejaConstructor: React.FC<BandejaConstructorProps> = ({
  tramites = []
}) => {

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
      <div className="flex justify-between text-sm">
        <div className="flex ">
          <div className="font-semibold">Razón Social: </div>
          <div className="ml-2">{activeProfile && activeProfile.razonSocial}</div>
        </div>
        <div><Tag color={getColorStatus(activeProfile)}>{activeProfile && activeProfile.status}</Tag></div>
      </div>
      <Divider />
      <div>
      <div className="flex ">
          <div className="font-semibold">Observaciones: </div>
          <div className="ml-2">{getStatusObsParsed(activeProfile)}</div>
        </div>
      </div>
    </Drawer>


    <div className="px-4 md:px-20  gap-y-4 grid md:grid-cols-4 gap-2  ">
      {tramites.map((e: TramiteAlta) => (
        <div className="cursor-pointer" >
          <Card className="rounded mr-2">
            <div>
              <Tag color={getColorStatus(e)}>{e.status}</Tag>
            </div>
            <div className="text-lg font-bold text-black-700 pb-2 "> {e.razonSocial}</div>
            <div className="flex">
              <Space>
                <Button type="text" onClick={() => {
                  setActiveProfile(e)
                  setShowProfile(true)
                }}>Previsualizar</Button>
                <Button type="primary">Ingresar</Button>
              </Space>
            </div>
          </Card>
        </div>
      ))}

    </div>

  </div>
}