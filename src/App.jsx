import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import TaskPage from "./pages/TaskPage";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <TaskPage />
    </div>
  );
};

export default App;
