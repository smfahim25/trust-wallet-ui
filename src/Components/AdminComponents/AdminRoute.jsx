import { Navigate } from "react-router-dom";

function isAdminAuthenticated() {
  
  return true;
}

const AdminRoute = ({ children }) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

export default AdminRoute;
