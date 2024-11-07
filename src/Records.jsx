import { useContext, useEffect, useState } from 'react';
import { contextData } from './Context';
import DeleteAll from './DeleteAll';
import { Link } from 'react-router-dom';

export default function Records() {
  const {
    dailySales,
    setDailySales,
    isDelete,
    setIsDelete,
    open,
    setOpen,
    password,
  } = useContext(contextData);
  const [inputValue, setInputValue] = useState('');
  const [succesful, setSuccesful] = useState(false);

  useEffect(() => {
    const salesData = JSON.parse(localStorage.getItem('dailySales')) || {};
    setDailySales(salesData);
  }, []);

  function calculateDailyTotal(sales) {
    return sales.reduce((total, sale) => total + sale.price, 0);
  }

  function handleClickPassword(e) {
    e.preventDefault();
    console.log(inputValue);
    if (inputValue == password) {
      setSuccesful(true);
    } else {
      alert('Şifre Yanlış');
      setSuccesful(false);
    }
  }
  return (
    <div>
      {succesful ? (
        <>
          {open ? <DeleteAll /> : ''}
          {dailySales && (
            <div className='daily-sales'>
              {Object.entries(dailySales).map(([date, sales]) => (
                <div key={date} className='sales'>
                  <h4>{date}</h4>
                  {sales.map((sale, index) => (
                    <div key={index} className='sales-item'>
                      <p>{sale.quantity}x</p>
                      <p>{sale.name}</p>
                      <p>
                        {new Intl.NumberFormat('tr-TR', {
                          style: 'currency',
                          currency: 'TRY',
                        }).format(sale.price)}
                      </p>
                    </div>
                  ))}
                  <h5 className='total-win'>
                    Günlük Toplam:{' '}
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                    }).format(calculateDailyTotal(sales))}
                  </h5>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setOpen(true)} className='clear-sales'>
            Verileri Sil
          </button>
          <button className='clear-sales'>
            <a href='/'>Geri Dön</a>
          </button>
        </>
      ) : (
        <div className='form-container'>
          <form className='form'>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Enter your password'
                required=''
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <button
              className='form-submit-btn'
              type='submit'
              onClick={(e) => handleClickPassword(e)}
            >
              Giriş Yap
            </button>

            <Link to='/' className='back'>
              Geri Git
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}
