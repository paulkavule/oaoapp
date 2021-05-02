import { makeAutoObservable, reaction, runInAction } from "mobx"
import { Country } from "../../modals/dtos/country";
import ApiConnector from "../ApiConnector";


export class CommonStore{
    requestId : string | null = window.localStorage.getItem('requestId');
    result: any | null = []
    constructor(){
        makeAutoObservable(this)

        reaction(
            () => this.requestId,
            requestId => {
                if(requestId){
                    window.localStorage.setItem("requestId", requestId)
                }
                else{
                    window.localStorage.removeItem("requestId")
                }
            }
        )

    }

    setRequestId =(requestId : string) =>{
        if(requestId){
            this.requestId = requestId
        }
    }

    logout = () => {
        this.requestId = "";
        window.localStorage.removeItem("requestId")
    }

    getPairedItems = async (resource:string, resourceId:string) => {
        try {
           const resp = await ApiConnector._CommonInfo.fetch(resource, resourceId );
           if(resp.ErrorCode === "0"){
                runInAction(() => {
                    this.result = resp.Result
                })
           }
        } catch (error) {
            console.log(error)
        }
    }
}