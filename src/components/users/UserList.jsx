import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import UserItem from './UserItem'

function UserList() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_GITHUB_URL}/users`, {
      Headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
      },
    })
    const data = await res.json()
    setUsers(data)
    setLoading(false)
  }

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
