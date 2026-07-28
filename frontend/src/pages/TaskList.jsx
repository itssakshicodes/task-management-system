function TaskList() {
  const tasks = [
    {
      id: 1,
      title: "Learn Django",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      title: "Build React UI",
      priority: "Medium",
      status: "Completed",
    },
  ];

  return (
    <div className="container mt-5">
      <h2>My Tasks</h2>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2">
                  Edit
                </button>

                <button className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;