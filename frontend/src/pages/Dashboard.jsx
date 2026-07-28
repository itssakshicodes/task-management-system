import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await api.get("tasks/");

      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else if (Array.isArray(response.data.results)) {
        setTasks(response.data.results);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4">Task Dashboard</h2>

        {/* Statistics */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-white bg-primary shadow">
              <div className="card-body">
                <h5>Total Tasks</h5>
                <h2>{totalTasks}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-dark bg-warning shadow">
              <div className="card-body">
                <h5>Pending</h5>
                <h2>{pendingTasks}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-white bg-info shadow">
              <div className="card-body">
                <h5>In Progress</h5>
                <h2>{inProgressTasks}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-white bg-success shadow">
              <div className="card-body">
                <h5>Completed</h5>
                <h2>{completedTasks}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Task Form */}
        <TaskForm
          onTaskAdded={fetchTasks}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />

        <h3 className="mb-3">My Tasks</h3>

        {loading ? (
          <div className="text-center mt-5">
            <div
              className="spinner-border text-primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="alert alert-info">
            No tasks found.
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onTaskUpdated={fetchTasks}
              setEditingTask={setEditingTask}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Dashboard;