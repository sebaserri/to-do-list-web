import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTask, fetchTasksSummary } from "../features/tasks/tasksAction";
import { selectTasks } from "../features/tasks/tasksSlice";
import { toast } from "react-toastify";

const AddTask = () => {
  const dispatch = useDispatch();
  const { loading, successAddTask, errorAddTask } = useSelector(selectTasks);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errorAddTask) {
      toast.error(errorAddTask);
    }
    if (successAddTask) {
      toast.success("Task created successfully");
      reset();
    }
  }, [errorAddTask, successAddTask, reset]);

  const onSubmit = (data) => {
    dispatch(
      addTask({
        ...data,
        deadline: new Date(data.deadline).toISOString(),
        status: "PENDING",
      })
    ).then(() => {
      dispatch(fetchTasksSummary());
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <div className="input-group mb-3">
        <input
          type="text"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
          placeholder="Add a title"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <div className="invalid-feedback">Title is required</div>
        )}
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          placeholder="Add a description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <div className="invalid-feedback">Description is required</div>
        )}
      </div>
      <div className="input-group mb-3">
        <input
          type="date"
          className={`form-control ${errors.deadline ? "is-invalid" : ""}`}
          {...register("deadline", { required: true })}
        />
        {errors.deadline && (
          <div className="invalid-feedback">Deadline is required</div>
        )}
      </div>
      <div className="input-group-append d-flex justify-content-center">
        <button type="submit" className="btn btn-outline-primary" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
};

export default AddTask;
