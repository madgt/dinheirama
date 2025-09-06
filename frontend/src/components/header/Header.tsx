import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Chip from '@mui/material/Chip';
// import Tooltip from '@mui/material/Tooltip';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

export default function Header() {
  // const totalAmount = 1234.56;
  return (
    <header className="bg-neutral-200">
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold">
            <span> 💰 </span> Dinheirama
          </h1>
        </div>
        <div className='flex items-center gap-4 justify-between'>
          {/* <Tooltip title="Total amount">
            <Chip label={`R$ ${totalAmount}`} color="primary" />
          </Tooltip> */}
          <Button variant='outlined'><PlusCircleIcon className="size-6 text-blue-500"/> &nbsp;Transaction</Button>
          <Avatar alt="user profile pic" src="http://pipsum.com/200x200.jpg" />
        </div>
        
      </nav>
    </header>
  );
}
