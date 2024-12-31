import { UserPosts } from "@/Types/PostsState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState:UserPosts = {
    posts : null,
    postDetails:null
}
export let getPosts = createAsyncThunk("posts/posts",async(_,{getState})=>{
   let stateValues:any = getState()
   let token = stateValues.UserSliceRedux.token
  let options = {
        url: "https://linked-posts.routemisr.com/posts?limit=50&page=42",
method:"GET",
headers:{
    token
}
    }
   let {data} = await axios.request(options)
  return data.posts
   
})
export let getPostsDetails = createAsyncThunk("posts/Details",async(id:string,{getState})=>{
    let stateValues:any = getState()
    let token = stateValues.UserSliceRedux.token
   let options = {
         url: `https://linked-posts.routemisr.com/posts/${id}`,
 method:"GET",
 headers:{
     token
 }
     }
    let {data} = await axios.request(options)
   return data.post
    
 })

let postsSlice =  createSlice({
    name:"postsSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getPosts.fulfilled , (state , action)=>{
            state.posts = action.payload;
            // console.log(state.posts);
            
        })
        builder.addCase(getPosts.rejected , (state , action)=>{
            console.log(false,action);
            
        })
        builder.addCase(getPostsDetails.fulfilled , (state , action)=>{
            state.postDetails = action.payload;
        })
        builder.addCase(getPostsDetails.rejected , (state , action)=>{
            console.log(false,action);
            
        })

    },
    reducers:{}

})

export  let PostsReduxSliceUser = postsSlice.reducer 