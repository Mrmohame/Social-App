"use client"
import { store } from "@/Store/Store";
import { ReactNode } from "react";
import { Provider } from "react-redux";


export default function UserRedux({children}:{children : ReactNode}) {
  return (
   <>
<Provider store={store}>
    {children}
</Provider>
   </>
  )
}
