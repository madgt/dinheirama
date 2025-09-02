import { useNavigate } from 'react-router-dom';
export default function BackHome() {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/')}>Go to Home</button>;
}
