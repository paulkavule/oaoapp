import { makeAutoObservable, runInAction } from "mobx";
import { EmploymentInfo } from "../../modals/employmentinfo";


export class EmploymentStore{

    empInfo : EmploymentInfo | null = {
        currentEmployer:'',
        employmentType:'',
        grossIncome:'',
        startDate:'',
        natureOfWork:''
    };

    constructor(){
        makeAutoObservable(this);
    }

    loadPreference = async (reqId:string) =>{
        return this.empInfo;
    }

    savePreference = async (empInfo: EmploymentInfo) =>{

        runInAction(() => {
            this.empInfo = empInfo;
        })

        return true;
    }

}