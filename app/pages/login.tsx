import { Button } from 'antd'
import React from 'react'
import {useRouter} from 'next/router'

export default () => {

  const router = useRouter()

  return <div>
    <Button type="primary" onClick={() => {
      localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSZWdpc3RybyBkZSBDb25zdHJ1Y3RvcmVzIiwiaWF0IjoxNjA3ODY4NDE0LCJhdWQiOiJodHRwOi8vbG9jYWxob3N0Iiwic3ViIjoibGVvbmFyZG9sZWVuZW5AZ21haWwuY29tIiwiR2l2ZW5OYW1lIjoiTGVvbmFyZG8gIiwiU3VybmFtZSI6IkxlZW5lbiIsIkVtYWlsIjoibGVvbmFyZG9sZWVuZW5AZ21haWwuY29tIiwiUm9sZSI6WyJDT05TVFJVQ1RPUiJdfQ.WGJJtUWKOjCqi0Ip9uYpU2uySpnBEPg35iay0-iOWMI')
      router.push('/')
    }}>Ingresar como constructor</Button>
    <Button type="primary" >Ingresar como revisor backoffice</Button>
    <Button type="primary">Ingresar como Supervisor backoffice</Button>
  </div>
}