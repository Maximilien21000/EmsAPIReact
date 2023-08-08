import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



import useAuth from '../hooks/UseAuth'


const Login = () => {
  const [apiError, setApiError] = useState('');
  const { setAuth } = useAuth();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 

  const getUserData = async (token) => {
    const response = await fetch("http://193.166.139.12:8000/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let userData = await response.json();
      console.log(userData);
      userData["token"] = token;
      setAuth(userData);
      setApiError(null);
      navigate("/devices", { replace: true });
    }
  };
  
  const onFormSubmit = async (newData) => {
  let url = 'http://193.166.139.12:8000/users/token'
  const params = new URLSearchParams(newData);

  //const options = { method: 'POST', headers: {'content-type':'application/x-www-form-urlencoded'}, data: qs.stringify(newData),url,};
  
  axios.post(url, params).then(response => {
    getUserData(response.data['access_token']);
    setApiError('Logging In')
  })
  .catch(error => {
    setApiError(error);
  })

    
  }; 
  
  const onErrors = (errors) => console.error(errors);

  return (
    <div className="mx-auto p-10 rounded-lg shadow-2xl">
      <h2 className="text-xl text-primary text-center font-bold my-2">
        Login page
      </h2>

      <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="username"
            className="input input-bordered input-accent w-full max-w-xs m-3"
            name="username"
            autoComplete="off"
            {...register("username", { required: "The username is required" })}
          />
          {errors?.username && errors.username.message}

          <input
            type="password"
            placeholder="your password"
            className="input input-bordered input-accent w-full max-w-xs m-3"
            name="password"
            {...register("password", { required: "The password is required" })}
          />
          {errors?.password && errors.password.message}

          <button className="btn btn-outline btn-accent m-3 btn-block">
            Login
          </button>
        </div>
      </form>

      {apiError && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              {apiError['message']}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login