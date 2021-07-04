let BASE_URL = 'https://lofty-heightz.herokuapp.com/api/v1'

if (process.env.REACT_APP_NODE_ENV === 'development'){
  BASE_URL = 'http://localhost:9000/api/v1'
}

export default BASE_URL
