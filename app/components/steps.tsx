import React, { useState } from 'react';
import { Steps } from 'antd';

const { Step } = Steps;


class NavigationStep extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    };

  }

  state = {
    current: 0,
  };

  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };
  render() {
    const { current } = this.state;
    return (
     <div className="px-20 py-4">
          <Steps
            type="navigation"
            size="small"
            current={current}
            onChange={this.onChange}
            className="site-navigation-steps"
          >
            <Step
              title="Inscripción"
            />
            <Step
              title="Información"
            />
            <Step
              title="DDJ de balances"
            />
            <Step
              title="DDJ de obras"
            />
            <Step
              title="Enviar trámite"
            />
          </Steps>

        

        <style>
          {`
          .steps-item.ant-steps-item-active::before {
          margin-bottom: -18px;
          background-color: #0072bb;
        }
        .ant-steps-navigation .ant-steps-item::before {
            margin-bottom: -18px;
            background-color: #0072bb;
        }
      .ant-steps-item-process .ant-steps-item-icon{
        background-color: #0072bb;
      }
      .ant-steps-item-finish .ant-steps-item-icon{
        border-color:#0072bb;
      }
      .ant-btn
        `}
        </style>

      </div>
    )
  }
}

export default NavigationStep;
