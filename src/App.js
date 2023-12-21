import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";

export default function App() {
  const [ tasks, setTasks ] = useState({
    done: [],
    notDone: [{
      id: 1,
      title: "Judul",
      description: "Deskripsi",
      dueDate: new Date().setHours(new Date().getHours() + 3),
      isDone: false,
    }],
  });

  const getTaskData = async () => {
    // TODO: Get data
  }

  useEffect(() => {
    getTaskData();
  }, [])

  return (
    <div className="h-[100%] w-screen bg-gray-200 flex justify-center">
      <div className="min-h-screen w-[min(520px,100vw)] bg-white pb-28">
        <div className="px-6 py-4 flex items-center justify-between shadow-lg">
          <p className="inline font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
            Todolist
          </p>
        </div>
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
        </div>
      </div>
    </div>
  );
};
