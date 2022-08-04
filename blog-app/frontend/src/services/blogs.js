import axios from 'axios'
const baseUrl = '/api/blogs'

const authHeader = token => `bearer ${token}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog, token) => {
  const res = await axios.post(baseUrl, blog, { headers: { Authorization: authHeader(token) } })
  return res.data
}

// Rakensin apin jo osassa 4 niin ettei koko blogia tarvitse lähettää palvelimelle
const like = async blog => {
  const res = await axios.put(`${baseUrl}/${blog.id}`, { likes: blog.likes + 1 })
  return res.data
}

const remove = async (blogId, token) => {
  await axios.delete(`${baseUrl}/${blogId}`, { headers: { Authorization: authHeader(token) } })
}

const exports = { getAll, create, like, remove }
export default exports