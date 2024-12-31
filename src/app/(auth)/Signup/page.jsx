
"use client"
import { useAppDipatch } from '@/Hooks/RootHooks'
import { LogIn } from '@/Store/Features/User.slice'
import { LineAxisOutlined, Login } from '@mui/icons-material'
import { Box, Button, Paper, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function page() {
// /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/   ||//||password
   async function callApi(values) {
    let resp = await fetch("https://linked-posts.routemisr.com/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
   let data = await resp.json() 
   console.log(data);
   
    }

let formik = useFormik({
    initialValues:{
        name:"",
        email:"",
        password:"",
        rePassword:"",
        dateOfBirth:"",
        gender:""
    },
    onSubmit: callApi
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
name='name'
value={formik.values.name}
type='text' label="name" variant="outlined"
/>
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
<TextField
onChange={formik.handleChange}
onBlur={formik.handleBlur}
name='rePassword'
value={formik.values.rePassword}
type='password' label="rePassword" variant="outlined" />
<TextField
onChange={formik.handleChange}
onBlur={formik.handleBlur}
name='gender'
value={formik.values.gender}
type='text' label="gender" variant="outlined" />

<TextField
onChange={formik.handleChange}
onBlur={formik.handleBlur}
name='dateOfBirth'
value={formik.values.dateOfBirth}
type='date'  variant="outlined" />





<Button type='submit' variant="contained">Contained</Button>
</form>
</Paper>
    </Box>
    </>
  )
}
