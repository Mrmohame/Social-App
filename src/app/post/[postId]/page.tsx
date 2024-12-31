"use client"
import Loading from '@/app/loading'
import PostCard from '@/Components/Postcard/Postcard'
import { useAppDipatch, useAppSelector } from '@/Hooks/RootHooks'
import { getPostsDetails } from '@/Store/Features/Posts.Slice'
import React, { use, useEffect } from 'react'

export default function page({params}:{params: Promise<{postId:string}>}){
  let {postId} = use(params)
 let dipatch = useAppDipatch()
 
 useEffect(()=>{
   dipatch(getPostsDetails(postId))
  },[])
  let {postDetails} = useAppSelector((state)=>state.PostsReduxSliceUser)
console.log(postDetails);

  return (
    <>
{postDetails ? 
 <PostCard postInfo={postDetails} checkTheValue={true}/>
:<Loading/>}
    </>
  
  )
}
