import { toast } from "react-toastify";
import { api, setToken } from '../axios';

export default function TaskCard({ task, setTasks }) {
  const formatDate = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hour = date.getHours();
    const minute = date.getMinutes();
  
    const minuteFormatted = minute.toString().padStart(2, '0');
    const hourFormatted = hour.toString().padStart(2, '0');
  
    return `${day} ${month} ${year}, ${hourFormatted}:${minuteFormatted}`;
  }

  const postToggleRequest = async () => {
    const token = sessionStorage.getItem('token');
    setToken(token);
    api.post(`/task/toggle/${task.id}`, {})
    .then((resp) => resp.data)
    .then((resp) => {
        console.log('here')
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

  const toggleIsDone = () => {
    postToggleRequest();
    setTimeout(() => {
      if (task.isDone) {
        task.isDone = false;
        setTasks((tasks) => {
          const newTasks = {
            done: tasks.done.filter((i) => i.id != task.id),
            notDone: [ ...tasks.notDone, task ],
          };
          return newTasks;
        });
      }
      else {
        task.isDone = true;
        setTasks((tasks) => {
          const newTasks = {
            done: [ ...tasks.done, task ],
            notDone: tasks.notDone.filter((i) => i.id != task.id)
          };
          return newTasks;
        });
      }
    }, 200)
  }
  
  return (
    <div className="mb-2 w-full p-4 rounded-md shadow-md flex items-center">
      <input type="checkbox" value={task.isDone} defaultChecked={task.isDone} onChange={toggleIsDone} />
      <div className="ml-4">
        <p className="text-lg font-semibold text-ellipsis">
          {task.name}
        </p>
        <p className="text-xs text-gray-500">
          {formatDate(new Date(task.dueDate))}
        </p>
        <p className="text-sm mt-1">
          {task.description}
        </p>
      </div>
    </div>
  )
}
