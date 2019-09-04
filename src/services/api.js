import axios from 'axios'

const api = axios.create({
  baseURL: "https://sonews-api.herokuapp.com"
})


export default api
