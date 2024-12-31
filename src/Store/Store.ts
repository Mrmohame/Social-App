import { configureStore } from "@reduxjs/toolkit";
import { UserSliceRedux } from "./Features/User.slice";
import { PostsReduxSliceUser } from "./Features/Posts.Slice";

export let store = configureStore({
    reducer:{
        UserSliceRedux,
        PostsReduxSliceUser
    }
})

type storeApp = typeof store
export type Rootstore = ReturnType<storeApp["getState"]>
export type RootDispatch = storeApp["dispatch"]