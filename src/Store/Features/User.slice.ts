import { UserState } from "@/Types/UserState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "inspector";
import toast from "react-hot-toast";

let initialState:UserState={
    token:localStorage.getItem("token"),
}


export let LogIn =  createAsyncThunk("posts/user",async(Values:{email:string,password:string})=>{
    const option={
        url:"https://linked-posts.routemisr.com/users/signin",
        method:"post",
        data:Values
    }
  let {data} = await  axios.request(option)
  console.log(data);
  
  return data
})

let userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(LogIn.fulfilled,(state,action)=>{console.log("yes");       
            state.token = action.payload.token;
           localStorage.setItem("token",action.payload.token);
            toast.success("Welcome Back");
        })
        builder.addCase(LogIn.rejected,(state,action)=>{console.log("no");
            toast.error("there is an error");
        })
    }
})

export let UserSliceRedux=userSlice.reducer