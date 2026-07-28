import { useState, useEffect } from "react";
import api from "../api/axios";

function TaskForm({ onTaskAdded, editingTask, setEditingTask }) {
  const initialState = {
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    due_date: "",
  };

  const [formData, setFormData] = useState(initialState);

  // Fill form when editing a task
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        priority: editingTask.priority || "Medium",
        status: editingTask.status || "Pending",
        due_date: editingTask.due_date || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        // Update Task
        await api.put(`tasks/${editingTask.id}/`, formData);

        alert("Task updated successfully!");
      } else {
        // Create Task
        await api.post("tasks/", formData);

        alert("Task created successfully!");
      }

      setFormData(initialState);
      setEditingTask(null);
      onTaskAdded();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  const handleCancel = () => {
    setFormData(initialState);
    setEditingTask(null);
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h4 className="mb-3">
          {editingTask ? "Edit Task" : "Add New Task"}
        </h4>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            className="form-control mb-3"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            className="form-select mb-3"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            className="form-select mb-3"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <input
            type="date"
            className="form-control mb-3"
            name="due_date"
            value={formData.due_date || ""}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary me-2">
            {editingTask ? "Update Task" : "Add Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default TaskForm;