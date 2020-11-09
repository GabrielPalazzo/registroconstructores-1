import React from 'react';
import Header from '../components/header'
import NavigationStep from '../components/steps'
import { Input, Table, Space, Steps, Select,  Modal } from 'antd';


const { Option } = Select;





class ModalComponent extends React.Component {
 
  
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSave = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  render() {
   

    return (<div className="">
     

        
          
          <Modal
          title="Datos de la Persona Física"
          visible={this.state.visible}
          onOk={this.handleSave}
          okText="Guardar"
          onCancel={this.handleCancel}
          cancelText="Cancelar"
          width={1000}
        >
          <div className="grid grid-cols-2 gap-4 ">

            <div >
              <InputText
                label="Nombre"
                labelRequired="*"
                placeholder="Ingrese su nombre de Pila"
                value=""
                labelObservation=""
                labeltooltip=""
                labelMessageError=""
                required />

            </div>
            <div >
              <InputText
                label="Apellido"
                labelRequired="*"
                value=""
                labelObservation=""
                labeltooltip=""
                labelMessageError=""
                required />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 ">

            <div >
              <InputText
                label="Tipo de Doc"
                labelRequired="*"
                placeholder="Ingrese su numero de documento sin deja espacios"
                value=""
                labelObservation=""
                labeltooltip=""
                labelMessageError=""
                required />

            </div>
            <div >
              <InputText
                label="Nº de Documento"
                labelRequired="*"
                placeholder="Ingrese su numero de documento sin deja espacios"
                value=""
                labelObservation=""
                labeltooltip=""
                labelMessageError=""
                required />

            </div>
            <div >
              <InputText
                label="CUIT / CUIL"
                labelRequired="*"
                placeholder="Ingrese el numero de cuit/cuil sin guiones ni espacio"
                value=""
                labelObservation=""
                labeltooltip=""
                labelMessageError=""
                required />

            </div>
            <div >
              <InputText
                label="Usuario"
                labelRequired="*"
                placeholder="Ingrese el numero de cuit/cuil sin guiones ni espacio"
                value=""
                labelObservation=""
                labeltooltip=""
                labelMessageError=""
                required />

            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div >
              <InputText
                label="Email"
                labelRequired="*"
                placeholder="Ingrese su email personal"
                value=""
                labelObservation=""
                labeltooltip=""
                labelMessageError=""
                required />

            </div>
            <div >
              <InputText
                label="Propuesta Electronica"
                labelRequired="*"
                value=""
                labelObservation=""
                labeltooltip=""
                labelMessageError=""
                required />
            </div>
            <div>
              <RadioGroup
                label="¿Qué tipo de persona desea dar de alta? "
                labelRequired="*"
                value=""
                labelObservation=""
                labeltooltip=""
                labelMessageError=""
                radioOptions={tipoPersona.map(u => (
                  <Radio value={u.value} >
                    {u.label}
                  </Radio>
                ))

                }

              />
            </div>
            <div>
              <Switch
                label="Administrador Legitimado"
                labelRequired="*"
                SwitchLabel1="Si"
                SwitchLabel2="No"
                labelObservation=""
                labeltooltip=""
                labelMessageError=""
              />
            </div>

          </div>
          <div className="grid grid-cols-3 gap-4 ">
            <div><Upload
              label="Adjunte fotos de frente y dorso del DNI"
              labelRequired="*"
              labelMessageError=""

            /></div>


            <div >
              <Upload
                label="Adjunte el poder"
                labelRequired="*"
                labelMessageError=""
              />
            </div>
            <div >
              <Upload
                label="Adjunte Acta "
                labelRequired="*"
                labelMessageError=""
              />
            </div>
          </div>

        </Modal>
       


      </div>


    )
  }
}

export default ModalComponent;





