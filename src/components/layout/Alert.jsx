import { useContext } from 'react'
import { FaExclamationCircle } from 'react-icons/fa'
import AlertContext from '../../context/alert/AlertContext'

function Alert() {
  const { alert } = useContext(AlertContext)

  return (
    alert && (
      <div className='alert alert-md alert-error shadow-md justify-start mb-4'>
        <FaExclamationCircle size={30} />
        <span>{alert.msg}</span>
      </div>
    )
  )
}

export default Alert
