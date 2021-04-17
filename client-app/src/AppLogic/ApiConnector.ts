import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../modals/ApiRequestResponse";
import { IdInfo } from "../modals/IdInfo";
import { PersonalInfo } from "../modals/personalinfo";

axios.defaults.baseURL = "http://localhost:8300"

const responseBody = <T>(response:AxiosResponse<T>) => response.data

const requests = {
    Post :<T>(url:string, body:{})=>axios.post<T>(url,body).then(responseBody),
    Get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    Put:<T>(url:string, body:{}) => axios.put<T>(url,body).then(responseBody)
}

const PerInfo = {
    create:(personalInfo: PersonalInfo) => requests.Post<ApiResponse>("/perinfo/execute",personalInfo),
    fetch:(id:string) => requests.Get<ApiResponse>(`/perinfo/execute/${id}`),
    update:(id:string, personalInfo: PersonalInfo) => requests.Put<ApiResponse>(`/perinfo/execute/${id}`,personalInfo)
}

const _IdInfo = {
    create:(info:IdInfo) => requests.Post<ApiResponse>('/idinfo/execute',info),
    update:(reqId:string,info:IdInfo) => requests.Put<ApiResponse>(`/idinfo/execute/${reqId}`, info),
    fetch:(reqId:string) => requests.Get<ApiResponse>(`/idinfo/execute/${reqId}`)
}

const ApiConnector = {
    PerInfo,
    _IdInfo
}

export default ApiConnector;