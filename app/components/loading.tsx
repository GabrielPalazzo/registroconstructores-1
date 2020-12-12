import useSelection from 'antd/lib/table/hooks/useSelection';
import React,{useState} from 'react'
import Lottie from 'react-lottie';

export interface LoadingProps {
  message: string
}

export const Loading: React.FC<LoadingProps> = ({
  message = ''
}) => {

  const [isStopped, setIsStopped] = useState(false)
  const [isPaused,setIsPaused ] = useState(false)

  const animationData = require('../public/lotties/sync.json')

  const buttonStyle = {
    display: 'block',
    margin: '10px auto'
  }

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return <div className="h-screen"><Lottie options={defaultOptions}
              height={400}
              width={400}
              isStopped={isStopped}
              isPaused={isPaused}/></div>
}