import { configureStore } from "@reduxjs/toolkit";
import { RegisterReducer } from "./features/Register/registerSlice";
import { LoginReducer } from "./features/Login/LoginSlice";
import { Subscription_PackageSliceReducer } from "./features/Subscription_Package/subscriptionPackageSlice";
import { getSubscriptionPackageSliceReducer } from "./features/Subscription_Package/getSubscriptionPackageSlice";
import { SelectedPackageReducer } from "./features/Selected_Package/selectedPackageSlice";
import { FolderReducer } from "./features/Folders/folderSlice";
import { FileReducer } from "./features/Files/fileSlice";



export const store = configureStore(({
    reducer : {
         register: RegisterReducer,
         login: LoginReducer,
         subscriptionPackage: Subscription_PackageSliceReducer,
         getsubscriptionPackage: getSubscriptionPackageSliceReducer,
         selectedPackage: SelectedPackageReducer,
         folder : FolderReducer,
         file : FileReducer,
    }
}))


export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
