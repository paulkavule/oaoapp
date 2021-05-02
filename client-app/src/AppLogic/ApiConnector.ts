import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../modals/ApiRequestResponse";
import { ContactInfo } from "../modals/contactInfo";
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

const _ContactInfo = {
    create:(contInfo:ContactInfo) => requests.Post<ApiResponse>('/continfo/execute',contInfo),
    update:(reqId:string,contInfo:ContactInfo) => requests.Put<ApiResponse>(`/continfo/execute/${reqId}`, contInfo),
    fetch:(reqId:string) => requests.Get<ApiResponse>(`/continfo/execute/${reqId}`)
}

const _DocUpload = {
    fetch:(reqId:string) => requests.Get<ApiResponse>(`/docs/execute/${reqId}`),
    uploadFile:(reqId:string,docCode:string,file:Blob) => {
        let formData = new FormData();
        formData.append('fl', file);
        return axios.post<ApiResponse>(`/docs/execute/${reqId}/${docCode}`, formData,{
            headers:{'content-type':'multipart/form-data'}
        })
    },
}
const _CommonInfo = {
    fetch:(resource:string,resourceId:string) => requests.Get<ApiResponse>(`/common/execute/${resource}/${resourceId}`)
}

const ApiConnector = {
    PerInfo,
    _IdInfo,
    _ContactInfo,
    _CommonInfo,
    _DocUpload
}

export default ApiConnector;