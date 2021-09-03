import axios from 'axios'

class api{

     fetchAsteroid = async (id:any) => {

          return  await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=oR3D98xf8dQxEXNSqfKWvsb5YyQP8ykJ3fWSM8Rs`)

    }
    fetchRandomAll = async () => {

     return  await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=oR3D98xf8dQxEXNSqfKWvsb5YyQP8ykJ3fWSM8Rs`)

}

}

export default new api();
