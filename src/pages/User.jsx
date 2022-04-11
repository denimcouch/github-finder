import {useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'

function User({match}) {
  const {getUser, user} = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    getUser(params.login)
  }, [])

  return (
    <h2>{user.login}</h2>
  )
}

export default User