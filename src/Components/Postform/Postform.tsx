import { Box, Button, TextField } from '@mui/material'
import React, { useRef } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { useAppDipatch, useAppSelector } from '@/Hooks/RootHooks';
import toast from 'react-hot-toast';
import { getPosts } from '@/Store/Features/Posts.Slice';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export default function Postform() {

const postContent = useRef<HTMLInputElement>(null);
const postImage = useRef<HTMLInputElement>(null);
const {token} =useAppSelector((state) => state.UserSliceRedux)
const dispatch = useAppDipatch()

async function CreateNewPost() {
   
let dataInfo =  postContent?.current?.value || ""
let dataImage =  postImage?.current?.files?.[0]


let values = new FormData()
values.append("body", dataInfo)
if (dataImage) {
    values.append("image", dataImage)
}

let {data} = await axios({
        url: "https://linked-posts.routemisr.com/posts",
        method: "POST",
        headers: {token},
        data: values,
    }
)

if(data?.message == "success"){
    toast.success("post has been created")
    dispatch(getPosts())
    if (postContent?.current) {
        postContent.current.value = "";
    }
    if (postImage?.current) {
        postImage.current.value = "";
    }
}

}

  return (
    <>
    <Box sx={{width:"80%",my:3,mx:"auto"}}>
    <TextField fullWidth inputRef={postContent} multiline minRows={4} id="outlined-basic" label="create Post" placeholder='create Post' variant="outlined" />
<Box sx={{display:"flex" , justifyContent:"space-between" ,my:2}}>
<Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
   
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
        multiple
        ref={postImage}
      />
    </Button>
    <Button onClick={CreateNewPost} variant="contained" endIcon={<SendIcon />}>
  Send
</Button>
</Box>
    </Box>
    </>    
  )
}
