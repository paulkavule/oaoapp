import { makeAutoObservable, runInAction } from "mobx";
import { Document } from "../../modals/document";
import ApiConnector from "../ApiConnector";

export class DocumentStore{
    uploading = false;
    loading = false;
    selectedDoc = '';
    document : Document|null = null;
    docList : Document [] | null = null;
    constructor(){
        makeAutoObservable(this);
    }


    setSelectedDoc = (docCode:string) =>{
        runInAction(()=>{this.selectedDoc = docCode});
    }
   
    uploadFile = async (doc:Document, file:Blob) =>{
        this.uploading = true;
        try {
            console.log("doc object",this.selectedDoc);
           var result = await ApiConnector._DocUpload.uploadFile(doc.requestId,this.selectedDoc, file);
           if(result.data.ErrorCode === "0"){
               var dok = result.data.Result as Document
               runInAction(()=>{
                //    this.uploading = false;
                   this.docList?.push(dok)
               })
           }
           if(result.data.ErrorCode === "0") return true;

        } catch (error) {
            console.log("error |", error)   
        }
        runInAction(()=>{this.uploading = false;});
        return false;
    }

    getDocuments = async (reqId:string) =>{
        this.loading = true;
        try {
            var resp = await ApiConnector._DocUpload.fetch(reqId);
           
            var list = resp.ErrorCode === "0" ?  resp.Result as (Document []): null;
            runInAction(()=>{
               this.loading = false;
               if(resp.ErrorCode === "0"){
                    this.docList = list
                }
            })
            return list;
        } catch (error) {
            runInAction(()=>{ this.loading = false});
        }
    }
}