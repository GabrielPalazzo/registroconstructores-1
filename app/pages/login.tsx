import { Button, Card } from 'antd'
import React from 'react'
import { useRouter } from 'next/router'

export default () => {

  const router = useRouter()

  return <div className="h-screen bg">
    <div className="m-auto mtop px-4  flex justify-center">
      <Card title="Ingresar como:" style={{ width: 400, background: '#fff !important' }}>
        <div className="pb-4 w-full text-center">
          <Button type="primary" onClick={() => {
            localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSZWdpc3RybyBkZSBDb25zdHJ1Y3RvcmVzIiwiaWF0IjoxNjA3ODY4NDE0LCJhdWQiOiJodHRwOi8vbG9jYWxob3N0Iiwic3ViIjoibGVvbmFyZG9sZWVuZW5AZ21haWwuY29tIiwiR2l2ZW5OYW1lIjoiTGVvbmFyZG8gIiwiU3VybmFtZSI6IkxlZW5lbiIsIkVtYWlsIjoibGVvbmFyZG9sZWVuZW5AZ21haWwuY29tIiwiUm9sZSI6WyJDT05TVFJVQ1RPUiJdfQ.WGJJtUWKOjCqi0Ip9uYpU2uySpnBEPg35iay0-iOWMI')
            router.push('/')
          }} block>Constructor</Button>
        </div>
        <div className="pb-4 text-center  w-full">
        <Button type="primary" onClick={() => {
            localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJSZWdpc3RybyBkZSBDb25zdHJ1Y3RvcmVzIiwiaWF0IjoyMjMzNDQ1NTY2NzcsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJzdWIiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJHaXZlbk5hbWUiOiJNYXJ0aW4gIiwiU3VybmFtZSI6IklnbGVzaWFzIiwiRW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJSb2xlIjpbIkNPTlRST0xBRE9SIl19.7uIIGKpwTvL2EnzLY1UWPmEgVwR3Xw-xW9BwtZHWCb0')
            router.push('/backoffice/bandeja')
          }} block>Revisor Back Office</Button>
        </div >
        <div className="pb-4  text-center w-full">
          <Button type="primary" block>Supervisor Back Office</Button>
        </div>
      </Card>
      <style>
        {` 
      .mtop{
        padding-top:20%;
      }
      .bg{background:#e5e5e5}
      `}
      </style>

    </div>
  </div>
}