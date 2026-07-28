import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          Task Manager
        </Link>

        <div className="d-flex align-items-center">
          <span className="text-white me-3">👤 User</span>

          <button
            className="btn btn-light btn-sm"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;