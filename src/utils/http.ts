import axios, {AxiosInstance} from 'axios'

function http(): AxiosInstance {
    return axios.create({
        baseURL: 'http://localhost:3024',
        headers: {
            authorization: 'Bearer 123'
        }
    });
}

export default http;
