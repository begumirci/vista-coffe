import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='header'>
      <div className='logo'>
        <img src='vista.jpg' alt='hahha' />
        <div>
          <h1>COFFEE VISTA</h1>
          <h2 className='italik'>Hayırlı İşler, Bugün Çok Güzel Bir Gün</h2>
        </div>
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
