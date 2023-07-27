import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { URL } from '../App.js'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, username, course, track) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${URL}/api/user/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password, username, course, track })
    })
    const json = await response.json()

    const response1 = await fetch(`${URL}/api/user/signupsched`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, course, track })
    })
    //const json1 = await response1.json()

    if (!response.ok || !response1.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok && response1.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }


  return { signup, isLoading, error }
}