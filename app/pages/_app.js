import '../public/style/main.css'
import 'antd/dist/antd.css'
import withReduxStore from '../redux/lib/with-redux-store'
import { Provider } from 'react-redux'


function MyApp({ Component, pageProps, reduxStore }) {
  return <div>
    <head>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
    </head>
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  </div>
}

export default withReduxStore(MyApp)
