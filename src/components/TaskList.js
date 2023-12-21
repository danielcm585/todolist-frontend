import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function TaskList({ title, tasks, setTasks, showAllDefault }) {
  const [ showAll, setShowAll ] = useState(showAllDefault);

  const toggleShowAll = () => {
    setShowAll((showAll) => !showAll);
  }

  return (
    <div className="w-full mt-4">
      <div 
        onClick={toggleShowAll}
        className="flex justify-between w-full items-center" 
      >
        <div>
          <p className="text-lg font-semibold">
            {title}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            {tasks.length} Tasks
          </p>
        </div>
        <button>
          {
            showAll ? 
              <FaChevronUp /> :
              <FaChevronDown />
          }
        </button>
      </div>
      {
        showAll && tasks.map((task, index) => (
          <TaskCard key={index} task={task} setTasks={setTasks} />
        ))
      }
    </div>
  )
}
