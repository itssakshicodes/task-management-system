import api from "../api/axios";

function TaskCard({ task, onTaskUpdated, setEditingTask }) {
  const deleteTask = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`tasks/${task.id}/`);
      alert("Task deleted successfully!");
      onTaskUpdated();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task.");
    }
  };

  const handleEdit = () => {
    setEditingTask(task);
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "bg-danger";
      case "Medium":
        return "bg-warning text-dark";
      case "Low":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-success";
      case "Pending":
        return "bg-warning text-dark";
      case "In Progress":
        return "bg-info";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5>{task.title}</h5>

          <div>
            <span className={`badge ${getPriorityBadge(task.priority)} me-2`}>
              {task.priority}
            </span>

            <span className={`badge ${getStatusBadge(task.status)}`}>
              {task.status}
            </span>
          </div>
        </div>

        <p className="mt-3">{task.description}</p>

        <p className="text-muted">
          <strong>Due:</strong> {task.due_date || "No due date"}
        </p>

        <div className="mt-3">
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={handleEdit}
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={deleteTask}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;