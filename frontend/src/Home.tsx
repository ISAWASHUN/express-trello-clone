import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

const Home: FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  return (
    <>
      {isAuthenticated ? (
        <h1>Welcome to the home page!</h1>
      ) : (
        <h1>ログインしてください</h1>
      )}
    </>
  );
};

export default Home;
