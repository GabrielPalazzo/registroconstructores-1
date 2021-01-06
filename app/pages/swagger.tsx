import React from 'react'
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"


export default () => {
  return <SwaggerUI url="/swagger.yaml" />
}