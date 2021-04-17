import { makeAutoObservable, runInAction } from "mobx";
import { ApiResponse } from "../../modals/ApiRequestResponse";
import { PersonalInfo } from "../../modals/personalinfo";
import ApiConnector from "../ApiConnector";


export class PersonalInfoStore{

    perInfo : PersonalInfo | undefined = undefined;
    saving = false
    loading = false
    constructor(){
        makeAutoObservable(this);
    }

    
    savePersonalInfo = async (personalInfo: PersonalInfo) =>{

        try{
            this.saving = true;
            personalInfo.dateOfBirth = new Date(personalInfo.dateOfBirth).toISOString();
            var resp : ApiResponse

            if(personalInfo.requestId) resp = await ApiConnector.PerInfo.update(personalInfo.requestId, personalInfo)
            else  resp = await ApiConnector.PerInfo.create(personalInfo);
            console.log("init resp", resp)
           
            runInAction(() => {
                this.saving = false;
            })
            if(resp.ErrorCode === "0"){
                console.log("saved and initiated")
                return resp.Result as string;
            }
        }catch(error){
            runInAction(()=>  this.saving = false);
            console.log(error)
        }

        return null;
    }

    getPersonalInfo = async (requestId:string) =>{
        this.loading = true;
        try {
            var resp = await ApiConnector.PerInfo.fetch(requestId);
            
            if(resp.ErrorCode !== "0"){
                return;
            }
            const pinfo = resp.Result[0] as PersonalInfo;
            runInAction(() => {
                this.loading = false
                this.perInfo = pinfo
            })
            return pinfo;
        } catch (error) {
           
            console.log(error)
        }
        runInAction(() => this.loading = false)
    }

    clearPersonalInfo = () =>{
        this.perInfo = undefined
    }
}