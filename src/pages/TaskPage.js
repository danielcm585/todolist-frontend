import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TaskList from "../components/TaskList";
import { api, setToken } from "../axios";

export default function TaskPage() {
  const [ tasks, setTasks ] = useState({
    done: [],
    notDone: [],
  });

  const getTaskData = async () => {
    const token = sessionStorage.getItem('token');
    setToken(token);
    api.get('/task/all')
      .then((resp) => resp.data)
      .then((resp) => {
        setTasks({
          done: resp.data.filter((task) => task.isDone),
          notDone: resp.data.filter((task) => !task.isDone)
        });
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

  useEffect(() => {
    getTaskData();
  }, [])

  return (
    <div className="w-full px-6">
      <TaskList 
        title="Not Done" 
        tasks={tasks.notDone} 
        setTasks={setTasks} 
        showAllDefault={true}
      />
      <TaskList 
        title="Done" 
        tasks={tasks.done} 
        setTasks={setTasks} 
        showAllDefault={false} 
      />
      <button 
        onClick={() => window.location.href='/new-task'}
        className="absolute bottom-6 right-6 rounded-full bg-gradient-to-r from-blue-600 to-red-600 text-white h-[70px] w-[70px] text-5xl pb-1.5"
      >
        +
      </button>
    </div>
  );
};
