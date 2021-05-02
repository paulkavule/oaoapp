import { createContext, useContext } from "react";
import { CommonStore } from "./Stores/CommonStore";
import { ContactStore } from "./Stores/ContactStore";
import { DocumentStore } from "./Stores/DocumentStore";
import { EmploymentStore } from "./Stores/EmploymentStore";
import IdInfoStore from "./Stores/IdInfoStore";
import { PersonalInfoStore } from "./Stores/PersonalInfoStore";
import { PreferencesStore } from "./Stores/PreferencesStore";

interface Store{
    personalInfoStore: PersonalInfoStore,
    commonStore: CommonStore,
    idInfoStore: IdInfoStore,
    contactStore: ContactStore,
    preferenceStore: PreferencesStore,
    employeStroe:EmploymentStore,
    documentStore: DocumentStore,
}

// for store access
export const storeManager : Store = {
    personalInfoStore : new PersonalInfoStore(),
    commonStore : new CommonStore(),
    idInfoStore: new IdInfoStore(),
    contactStore: new ContactStore(),
    preferenceStore: new PreferencesStore(),
    employeStroe: new EmploymentStore(),
    documentStore: new DocumentStore(),
}

// For empowering the app to observe the store
export const StoreContext = createContext(storeManager);

// expose the store for app access in pages

export function useStore(){
    return useContext(StoreContext)
}