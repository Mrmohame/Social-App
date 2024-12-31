import { Box, Button, CardHeader, Typography} from '@mui/material'
import Image from 'next/image'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/icons-material/MoreVert';
import { Comment } from '@/Types/PostsState';
import userImage from "../../../Assets/imgs/user.png"
import axios from 'axios';
import toast from 'react-hot-toast';
import { getPosts } from '@/Store/Features/Posts.Slice';

import { useAppDipatch, useAppSelector } from '@/Hooks/RootHooks';

export default function Postcomment({commentInfo}:{commentInfo:Comment}) {

function handleImage(image:string) {
    if(image?.includes("undefined")){
return userImage
    }else{
        return image
    }
}




  return (
   <>
<Box sx={{bgcolor:"#f1f1f1",p:2 , my:2}}>
<CardHeader 
        avatar={
     <Image width={50} 
     height={50} 
     src={handleImage(commentInfo?.commentCreator?.photo)} 
     alt={`${commentInfo?.commentCreator?.name}`}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={commentInfo?.commentCreator?.name}
        subheader={new Date(commentInfo?.createdAt).toLocaleString()}
        ></CardHeader>
    <Typography sx={{ml:3}}>
        {commentInfo?.content}
    </Typography>

</Box>
      
   </>
  )
}
