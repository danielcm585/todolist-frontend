import { useState } from 'react'
import { toast } from "react-toastify";
import { api } from '../axios';

export default function LoginPage() {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const onLogin = async () => {
    api.post('/auth/login', {
      username: username,
      password: password
    })
      .then((resp) => resp.data)
      .then((resp) => {
        sessionStorage.setItem('token', resp.data.token);
        sessionStorage.setItem('refreshToken', resp.data.refreshToken);
        window.location.href = '/';
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });  
      })
  }

  return (
    <div className="w-full px-6">
      <p className="mt-6 text-4xl text-center font-bold">
        Login
      </p>
      <p className="mt-6">
        Username
      </p>
      <input 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border-2 rounded-md p-2"
      />
      <p className="mt-2">
        Password
      </p>
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border-2 rounded-md p-2"
      />
      <p className="mt-2">
        Don't have an account?{" "} 
        <a 
          href="/register"
          className="text-blue-500 hover:underline font-semibold"
        >
          Register
        </a>
      </p>
      <button 
        onClick={onLogin}
        className="w-full p-2 bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-md mt-6"
      >
        Login
      </button>
    </div>
  )
}
