import axios from 'axios'

const login = async credentials => {
  const res = await axios.post('/api/login', credentials)
  return res.data
}

const exports = { login }
export default exports