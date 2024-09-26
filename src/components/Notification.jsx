import { useContext } from 'react'
import CounterContext from '../CounterContext'

const Notification = () => {

  const [notification, dispatch] = useContext(CounterContext)
  console.log("notification",notification,"dispatch",dispatch)  

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification) return null

  return (
    <div style={style}>
      {notification}      
    </div>
  )
}

export default Notification
