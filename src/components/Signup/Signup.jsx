import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Signup() {

  let navigate = useNavigate()
  let [errMsg, setErrMsg] = useState('')

  function sendDataToApi(values) {
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then(({ data }) => {
      console.log(data)
      if (data.message == 'success') {
        // To Login Page
        navigate('/signin')
      }
    }).catch(err => {
      setErrMsg(err.response.data.message)
      console.log(err.response.data.message)
    })
  }

  function validationSchema() {
    let erros = Yup.object({
      name: Yup.string().min(2).max(20).required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      rePassword: Yup.string().oneOf([Yup.ref('password')]),
      phone: Yup.string().required()
    })

    return erros
  }

  let signup = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
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
        <h2>Register Now:</h2>
        <form onSubmit={signup.handleSubmit}>
          <label htmlFor='Name'>Name:</label>
          <input onBlur={signup.handleBlur} value={signup.values.name} onChange={signup.handleChange} type='text' name='name' id='Name' className='form-control mb-3' />

          {signup.errors.name && signup.touched.name ? <div className="alert alert-danger">{signup.errors.name}</div> : ''}

          <label htmlFor='Email'>Email:</label>
          <input onBlur={signup.handleBlur} value={signup.values.email} onChange={signup.handleChange} type='email' name='email' id='Email' className='form-control mb-3' />

          {signup.errors.email && signup.touched.email ? <div className="alert alert-danger">{signup.errors.email}</div> : ''}

          <label htmlFor='Pass'>Password:</label>
          <input onBlur={signup.handleBlur} value={signup.values.password} onChange={signup.handleChange} type='password' name='password' id='Pass' className='form-control mb-3' />

          {signup.errors.password && signup.touched.password ? <div className="alert alert-danger">{signup.errors.password}</div> : ''}

          <label htmlFor='rePass'>rePassword:</label>
          <input onBlur={signup.handleBlur} value={signup.values.rePassword} onChange={signup.handleChange} type='password' name='rePassword' id='rePass' className='form-control mb-3' />

          {signup.errors.rePassword && signup.touched.rePassword ? <div className="alert alert-danger">{signup.errors.rePassword}</div> : ''}

          <label htmlFor='Phone'>Phone:</label>
          <input onBlur={signup.handleBlur} value={signup.values.phone} onChange={signup.handleChange} type='tel' name='phone' id='Phone' className='form-control mb-3' />

          {signup.errors.phone && signup.touched.phone ? <div className="alert alert-danger">{signup.errors.phone}</div> : ''}

          {errMsg ? <div className="alert alert-danger">
            {errMsg}
          </div> : ''}

          <button disabled={!(signup.isValid && signup.dirty)} type='submit' className='btn bg-main text-white'>Register</button>
        </form>
      </div>
    </div>
  )
}
