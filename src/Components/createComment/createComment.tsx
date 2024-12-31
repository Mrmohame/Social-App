import { useAppDipatch, useAppSelector } from '@/Hooks/RootHooks'
import { getPosts } from '@/Store/Features/Posts.Slice'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import SendIcon from '@mui/icons-material/Send';
export default function CreateComment({specificPost}:{specificPost:string}) {

    const {token} =useAppSelector((state) => state.UserSliceRedux)
    const dispatch = useAppDipatch()
    
 let commentContent = useRef<HTMLInputElement>(null)

    async function CreateNewPost() {
let commentContentSpecific=commentContent?.current?.value || ""
    let {data} = await axios({
            url: "https://linked-posts.routemisr.com/comments",
            method: "POST",
            headers: {token},
            data: {
              content:commentContentSpecific,
              post:specificPost
            },
        }
    )
//    console.log(data);
    
    if(data?.message == "success"){
        toast.success("comment has been added")
        dispatch(getPosts())
        if(commentContent?.current){
            commentContent.current.value="" 
        }
     
    
    }
    
    }


  return (
    <div>

        <TextField inputRef={commentContent} fullWidth multiline minRows={3} sx={{my:2}} id="outlined-basic" label="write comment" variant="outlined" placeholder='write comment'/>
    <Button onClick={CreateNewPost} variant="contained" endIcon={<SendIcon />}>
  Send
</Button>
    </div>
  )
}
