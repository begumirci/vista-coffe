import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='header'>
      <div className='logo'>
        <img src='vista.jpg' alt='hahha' />
        <h1>COFFEE VISTA</h1>
      </div>

      <div className='links'>
        <Link to='/record' className='go-record'>
          Günlük Satışları Gör
        </Link>
        <a
          href='/custom'
          target='_blank'
          rel='noopener noreferrer'
          className='go-record'
        >
          Müşteri Tarafı
        </a>
      </div>
    </div>
  );
}
