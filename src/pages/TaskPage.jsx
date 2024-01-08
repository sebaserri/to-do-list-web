import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import "../components/style.css";
import { fetchTasks, fetchTasksSummary } from "../features/tasks/tasksAction";
import { selectTasks } from "../features/tasks/tasksSlice";

const TaskPage = () => {
  const dispatch = useDispatch();
  const { summary } = useSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchTasksSummary());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4" style={{ color: "#0056b3" }}>
        TODO LIST
      </h1>
      <div className="d-flex justify-content-center gap-2">
        <p className="text-warning">
          <strong>
            Pending:
            {summary.notCompleted}{" "}
          </strong>
        </p> -
        <p className="text-success">
          <strong>Completed: {summary.completed} </strong>
        </p>
      </div>
      <AddTask />
      <TaskList />
    </div>
  );
};

export default TaskPage;
