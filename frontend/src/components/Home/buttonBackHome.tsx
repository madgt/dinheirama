import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
export default function BackHome() {
  const navigate = useNavigate();
  return (
    <div className='mt-4 mb-4'>
      <Button variant='outlined' onClick={() => navigate('/')}><ArrowUturnLeftIcon className='size-3'/>&nbsp;to Home</Button>
    </div>
  );
}
