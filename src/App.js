import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import TaskPage from "./pages/TaskPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Navbar from "./components/Navbar"
import NewTaskPage from "./pages/NewTaskPage";

export default function App() {
  return (
    <div className="h-[100%] w-screen bg-gray-200 flex justify-center">
      <div className="min-h-screen w-[min(520px,100vw)] bg-white pb-28 relative">
        <Navbar />
        <Router> 
          <Routes>
            <Route exact path="/" element={<TaskPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/new-task" element={<NewTaskPage />} />
          </Routes>
        </Router>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}