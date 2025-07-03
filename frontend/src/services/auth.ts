import api from './api'

export interface LoginPayload {
  username: string
  password: string
}

export interface RegisterPayload {
  username: string
  password: string
}

export async function login({ username, password }: LoginPayload) {
  const { data } = await api.post('/auth/login', { username, password })
  localStorage.setItem('token', data.token)
  localStorage.setItem('role', data.role)

  return data
}

export async function register({ username, password }: RegisterPayload) {
  const { data } = await api.post('/auth/register', { username, password })
  return data
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
}
