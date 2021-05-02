import { makeAutoObservable, runInAction } from "mobx";
import { ContactInfo } from "../../modals/contactInfo";
import ApiConnector from "../ApiConnector";

export class ContactStore{
    contactInfo : ContactInfo | null = null
    saving = false;
    loading = false;
    constructor(){
        makeAutoObservable(this)
    }

    saveContactInfo = async (cntInfo : ContactInfo) => {
        this.saving  = false;
        try {
            
            const resp = await ApiConnector._ContactInfo.create(cntInfo)
            
            runInAction(()=>{ 
                this.saving=false;
                if(resp.ErrorCode === "0") this.contactInfo = cntInfo
             })

            if(resp.ErrorCode === "0") return true;

        } catch (error) {
            console.log(error)
        }
        runInAction(()=>this.saving=false)
        return false;
    }

    getContactInfo = async (reqId:string) =>{
        this.loading = false;
        try {
            const resp = await ApiConnector._ContactInfo.fetch(reqId)
            if(resp.ErrorCode !== "0"){
                runInAction(() => this.loading = false)
                return;
            }

            var cntInfo = resp.Result[0] as ContactInfo;
            runInAction(()=>{
                this.loading = false;
                this.contactInfo = cntInfo
            })
            return cntInfo;
        } catch (error) {
            console.log(error)
        }
        runInAction(()=>this.saving=false)
        return;
    }
}