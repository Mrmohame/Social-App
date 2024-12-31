"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import PostCard from "@/Components/Postcard/Postcard";
import { Grid2 } from "@mui/material";
import { useAppDipatch, useAppSelector } from "@/Hooks/RootHooks";
import { useEffect } from "react";
import { getPosts } from "@/Store/Features/Posts.Slice";
import Loading from "./loading";
import Postform from "@/Components/Postform/Postform";
export default function Home() {

  const dispatch = useAppDipatch()
  let {posts} = useAppSelector((state) => state.PostsReduxSliceUser)
  //  console.log(posts);
  useEffect(() => {
    dispatch(getPosts())
  }, [])
 

  return (
<>
<Grid2 container>
  <Grid2 size={3}></Grid2>
<Grid2 size={6} sx={{p:3}}>
  <Postform/>
  {posts ? posts?.map((post) => <PostCard checkTheValue={false} postInfo={post} key={post._id}/>) : <Loading/>}
</Grid2>
<Grid2 size={3}></Grid2>

</Grid2>

</>
  )
}
