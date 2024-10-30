import { useContext, useEffect } from 'react';
import { contextData } from './Context';

export default function Records() {
  const { dailySales, setDailySales } = useContext(contextData);
  useEffect(() => {
    const salesData = JSON.parse(localStorage.getItem('dailySales')) || {};
    setDailySales(salesData);
  }, []);

  function clearDailySales() {
    localStorage.removeItem('dailySales'); // Sadece günlük satışları temizler
    setDailySales(null); // Arayüzü güncellemek için dailySales'i boşaltır
  }
  function calculateDailyTotal(sales) {
    return sales.reduce((total, sale) => total + sale.price, 0);
  }
  return (
    <div>
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

      <button onClick={clearDailySales} className='clear-sales'>
        Verileri Sil
      </button>
      <button className='clear-sales'>
        <a href='/'>Geri Dön</a>
      </button>
    </div>
  );
}
