import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'

function UserSearch() {
  const { users, searchUsers, clearUsers } = useContext(GithubContext)
  const [text, setText] = useState('')

  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text === '') {
      alert('Please enter something')
    } else {
      searchUsers(text)
      setText('')
    }
  }

  const handleClear = () => {
    // @todo - clear users
    clearUsers()
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8 items-center'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-md text-black focus:outline-2 focus:outline-blue-400'
                placeholder='Search'
                value={text}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none rounded-r-md w-36 btn btn-accent btn-md'
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className='btn btn-ghost btn-lg' onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
