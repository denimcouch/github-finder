import { CircularProgress } from '@mui/material'
import { useEffect, useContext } from 'react'
import UserItem from './UserItem'
import GithubContext from '../../context/github/GithubContext'

function UserList() {
  const {fetchUsers, users, loading} = useContext(GithubContext)

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <CircularProgress color='primary' size={80} />
        <h3>Loading...</h3>
      </div>
    )
  } else {
    return (
      <section className='userList grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user, index) => (
          <UserItem key={`${user.id}-${index}`} user={user} />
        ))}
      </section>
    )
  }
}

export default UserList
