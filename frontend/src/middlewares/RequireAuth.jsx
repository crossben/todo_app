import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('tokens');
  if (!token) {
    useNavigate('/login');
  }
  return children;
};

export default RequireAuth;