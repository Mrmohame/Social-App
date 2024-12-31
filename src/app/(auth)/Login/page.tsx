
"use client"
import { useAppDipatch } from '@/Hooks/RootHooks'
import { LogIn } from '@/Store/Features/User.slice'
import { Login } from '@mui/icons-material'
import { Box, Button, Paper, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from "next/navigation"
import React from 'react'
import { useDispatch } from 'react-redux'

export default function page() {
  
 let router =  useRouter()
let dispatch = useAppDipatch()
let formik = useFormik({
    initialValues:{
        email:"",
        password:""
    },
    onSubmit: (values) => {
dispatch(LogIn(values)).then((res)=>{
if(res.payload.message == "success"){
  router.push("/")
}
}
).catch(error => error)

    }
})

  return (
    <>
    <Box sx={{width:"50%",mx:"auto",p:"13px"}}>
<Paper elevation={4} sx={{p:"10px",mt:"16px"}}> 
<form
onSubmit={formik.handleSubmit}
style={{display:"flex",flexDirection:"column",gap:"20px",padding:"10px"}}>
<TextField
onChange={formik.handleChange}
onBlur={formik.handleBlur}
name='email'
value={formik.values.email}
type='email' label="Email" variant="outlined" />
<TextField
onChange={formik.handleChange}
onBlur={formik.handleBlur}
name='password'
value={formik.values.password}
type='password' label="Password" variant="outlined" />
<Button type='submit' variant="contained">Contained</Button>
</form>
</Paper>
    </Box>
    </>
  )
}
