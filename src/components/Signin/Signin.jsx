import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Signin() {

  let navigate = useNavigate()
  let [errMsg, setErrMsg] = useState('')

  function sendDataToApi(values) {
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(({ data }) => {
      console.log(data)
      if (data.message == 'success') {
        localStorage.setItem("token", data.token)
        // To Home Page
        navigate('/Home')
      }
    }).catch(err => {
      setErrMsg(err.response.data.message)
      console.log(err.response.data.message)
    })
  }

  function validationSchema() {
    let erros = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    return erros
  }

  let signin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema
    ,
    onSubmit: (values) => {
      console.log(values);
      // Convert to JSON then send to API
      sendDataToApi(values)
    }
  })

  return (
    <div>
      <div className="w-75 m-auto my-5">
        <h2>Login Now:</h2>
        <form onSubmit={signin.handleSubmit}>
      
          <label htmlFor='Email'>Email:</label>
          <input onBlur={signin.handleBlur} value={signin.values.email} onChange={signin.handleChange} type='email' name='email' id='Email' className='form-control mb-3' />
          {signin.errors.email && signin.touched.email ? <div className="alert alert-danger">{signin.errors.email}</div> : ''}

          <label htmlFor='Pass'>Password:</label>
          <input onBlur={signin.handleBlur} value={signin.values.password} onChange={signin.handleChange} type='password' name='password' id='Pass' className='form-control mb-3' />
          {signin.errors.password && signin.touched.password ? <div className="alert alert-danger">{signin.errors.password}</div> : ''}

          {errMsg ? <div className="alert alert-danger">
            {errMsg}
          </div> : ''}

          <button disabled={!(signin.isValid && signin.dirty)} type='submit' className='btn bg-main text-white'>signin</button>
        </form>
      </div>
    </div>
  )
}
