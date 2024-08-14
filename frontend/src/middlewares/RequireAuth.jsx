import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('tokens');

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    return () => {};
  }, [navigate, token]);

  return children;
};

export default RequireAuth;
