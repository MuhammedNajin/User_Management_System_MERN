import axios from 'axios'

export default function createAxios(baseurl, token) {
     return axios.create({
        baseURL: baseurl,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
        },
        withCredentials: true
    })
}
 