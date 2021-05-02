import { makeAutoObservable, runInAction } from "mobx";
import { PreferenceInfo } from "../../modals/preferenceInfo";

export class PreferencesStore{
    preferences : PreferenceInfo | null =  {
        tradingCountry:'UG',
        preferedBranch:'BR1',
        accountCategory: 'Saving',
        accountType: 'BS',
        eStatement: true,
        mobileBanking: true,
        smsNotification:false,
        requestId:''
    };

    constructor(){
        makeAutoObservable(this);
    }

    loadPreference = async (reqId:string) =>{
        return this.preferences;
    }

    savePreference = async (info: PreferenceInfo) =>{

        runInAction(() => {
            this.preferences = info;
        })

        return true;
    }

}