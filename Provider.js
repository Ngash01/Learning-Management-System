"use client"
import { Provider } from "react-redux";
import { store } from "./redux/store";

export  const GlobalProvider = ({children})=>{
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}