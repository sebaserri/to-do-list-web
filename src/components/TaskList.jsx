import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteTask,
  fetchSortedTasks,
  fetchTasksSummary,
  markTaskAsCompleted,
} from "../features/tasks/tasksAction";
import { selectTasks } from "../features/tasks/tasksSlice";

const TaskList = () => {
  const { tasks, loading, successDeleteTask, errorDeleteTask, error } =
    useSelector(selectTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorDeleteTask) {
      toast.error(errorDeleteTask);
    }
    if (successDeleteTask) {
      toast.success("Task deleted successfully");
    }
  }, [error, errorDeleteTask, successDeleteTask]);

  const markAsCompletedTask = (taskId) => {
    dispatch(markTaskAsCompleted(taskId)).then(() => {
      dispatch(fetchTasksSummary());
    });
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId)).then(() => {
      dispatch(fetchTasksSummary());
    });
  };

  const handleSortAscending = () => {
    dispatch(fetchSortedTasks({ order: "ASC", page: 1, limit: 20 }));
  };

  const handleSortDescending = () => {
    dispatch(fetchSortedTasks({ order: "DESC", page: 1, limit: 20 }));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusStyle = (status) => {
    if (status === "COMPLETED") {
      return "text-success font-weight-bold";
    } else {
      return "text-warning font-weight-bold";
    }
  };

  return (
    <>
      {loading && (
        <div className="text-center">
          <p>Loading tasks...</p>
        </div>
      )}
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-outline-secondary me-2"
          onClick={handleSortAscending}
        >
          Ascendente
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={handleSortDescending}
        >
          Descendente
        </button>
      </div>

      <ul className="list-group">
        {tasks?.map((task) => (
          <li key={task.id} className="list-group-item task-card">
            <div className="d-flex justify-content-between">
              <div>
                <h5
                  style={{
                    textDecoration:
                      task.status === "COMPLETED" ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </h5>
                <p>{task.description}</p>
                <small>
                  <strong>Deadline:</strong> {formatDate(task.deadline)}
                </small>
                <br />
                <small>
                  <strong>Created At:</strong> {formatDate(task.createdAt)}
                </small>
                <br />
                <small>
                  <span className={getStatusStyle(task.status)}>
                    {task.status}
                  </span>
                </small>
              </div>
              <div className="align-self-center d-flex">
                <button
                  className="btn btn-outline-success me-2"
                  onClick={() => markAsCompletedTask(task.id)}
                  disabled={task.status === "COMPLETED"}
                >
                  Complete
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
