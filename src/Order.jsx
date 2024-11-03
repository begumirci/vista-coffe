import { useContext, useState, useEffect } from 'react';
import { contextData } from './Context';

export default function Order() {
  const { isBasketOpen, basket, setBasket, saveOrderToLocalStorage } =
    useContext(contextData);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (!orderNumber) {
      setOrderNumber(generateOrderNumber());
    }
  }, [orderNumber]);

  function delBasketItem(product) {
    console.log(product);
    const newBasket = basket.filter((x) => x.id !== product.id);
    setBasket(newBasket);
  }

  function generateOrderNumber() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 1000).toString();
    return `ORD-${timestamp}-${randomNum}`;
  }

  const totalPrice = basket.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formattedTotalPrice = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(totalPrice);
  console.log(basket);
  return (
    <>
      {basket.length > 0 && (
        <div className='order'>
          <div>
            <h3 className='basket-header'>
              Sipariş Numarası - <p> {orderNumber && orderNumber}</p>
            </h3>

            <div className='basket-items'>
              {basket.map((item) => (
                <div key={item.id} className='basket-item'>
                  <div className='basket-div'>
                    <h3 className='basket-item-quantity'>{item.quantity}x</h3>
                    <h3 className='basket-item-name'>
                      {item.name} - {item.size && item.size}
                    </h3>
                  </div>
                  <div className='basket-div gap'>
                    <h3 className='basket-item-price'>
                      ₺{item.price * item.quantity}
                    </h3>
                    <h3
                      className='del'
                      onClick={() => {
                        delBasketItem(item);
                      }}
                    >
                      x
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='basket-footer'>
            <h3>{formattedTotalPrice}</h3>
            <button onClick={saveOrderToLocalStorage}>Sipariş Oluştur</button>
          </div>
        </div>
      )}
    </>
  );
}
