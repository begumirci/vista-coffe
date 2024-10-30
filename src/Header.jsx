import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='header'>
      <div className='logo'>
        <img src='vista.jpg' alt='hahha' />
        <h1>COFFEE VISTA</h1>
      </div>

      <div className='links'>
        <Link to='record' target='_blank' className='go-record'>
          Günlük Satışları Gör
        </Link>
        <Link to='custom' target='_blank' className='go-record'>
          Müşteri Tarafı
        </Link>
      </div>
    </div>
  );
}
