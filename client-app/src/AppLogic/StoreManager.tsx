import { createContext, useContext } from "react";
import { CommonStore } from "./Stores/CommonStore";
import IdInfoStore from "./Stores/IdInfoStore";
import { PersonalInfoStore } from "./Stores/PersonalInfoStore";

interface Store{
    personalInfoStore: PersonalInfoStore,
    commonStore: CommonStore,
    idInfoStore: IdInfoStore
}

// for store access
export const storeManager : Store = {
    personalInfoStore : new PersonalInfoStore(),
    commonStore : new CommonStore(),
    idInfoStore: new IdInfoStore(),
}

// For empowering the app to observe the store
export const StoreContext = createContext(storeManager);

// expose the store for app access in pages

export function useStore(){
    return useContext(StoreContext)
}