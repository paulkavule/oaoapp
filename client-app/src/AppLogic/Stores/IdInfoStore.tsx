import { makeAutoObservable, runInAction } from "mobx";
import { IdInfo } from "../../modals/IdInfo";
import ApiConnector from "../ApiConnector";


export default class IdInfoStore{
    idInfo : IdInfo | null = null
    saving = false;
    loading = false
    constructor(){
        makeAutoObservable(this);
    }

    saveIdInfo = async (obj: IdInfo) =>{
        this.saving = true;
        try {
            // const reqId = storeManager.commonStore.requestId;
            // obj.requestId = reqId!;
            const resp = await ApiConnector._IdInfo.create(obj);
            if(resp.ErrorCode === "0"){
                runInAction(() =>{
                    this.saving = false;
                    this.idInfo = obj
                });
                return true;
            }
        } catch (error) {
            console.log(error)
        }
        runInAction(()=>this.saving=false);
        return false;
    }
    getIdInfo = async (requestId:string) =>{
        this.loading = true;
        
        try {
            const resp = await ApiConnector._IdInfo.fetch(requestId);
            if(resp.ErrorCode !== "0"){
                return;
            }
            const info = resp.Result[0] as IdInfo;
            runInAction(()=>{
                this.idInfo = info;
                this.loading = false;
            })
            return info;
        } catch (error) {
            console.log(error)
        }   
        runInAction(()=>this.loading = false);
        return;
    }
} 