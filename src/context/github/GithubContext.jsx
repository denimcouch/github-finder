import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })

    const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      Headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    const { items } = await res.json()

    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
    })
  }

  const getUser = async (login) => {
    setLoading()

    const res = await fetch(`${GITHUB_URL}/users/${login}`, {
      Headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if (res.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await res.json()
  
      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
