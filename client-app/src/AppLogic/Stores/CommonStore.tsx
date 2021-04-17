import { makeAutoObservable, reaction } from "mobx"
import { history } from "../..";


export class CommonStore{
    requestId : string | null = window.localStorage.getItem('requestId');

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
}