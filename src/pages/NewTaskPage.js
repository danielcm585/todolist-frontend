import { useState } from 'react'
import { toast } from "react-toastify";
import { api, setToken } from '../axios';

export default function NewTaskPage() {
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ dueDate, setDueDate ] = useState()

  const onLogin = async () => {
    const token = sessionStorage.getItem('token');
    setToken(token);
    api.post('/task/create', {
      name: name,
      description: description,
      dueDate: dueDate,
    })
      .then((resp) => resp.data)
      .then((resp) => {
        toast.success(resp.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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
        New Task
      </p>
      <p className="mt-6">
        Title
      </p>
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border-2 rounded-md p-2"
      />
      <p className="mt-2">
        Description
      </p>
      <textarea 
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border-2 rounded-md p-2"
      />
      <p className="mt-2">
        Due Date
      </p>
      <input 
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border-2 rounded-md p-2"
      />
      <button 
        onClick={onLogin}
        className="w-full p-2 bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-md mt-6"
      >
        Save
      </button>
    </div>
  )
}
