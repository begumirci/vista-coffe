import React, { useContext, useEffect, useState } from 'react';
import { contextData } from './Context';

export default function CustomSide() {
  const { basket, products } = useContext(contextData);
  console.log(basket);
  console.log(products);

  const totalPrice = basket.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formattedTotalPrice = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(totalPrice);

  return (
    <div className='custom-side'>
      {basket.length > 0 && (
        <div>
          {basket.map((item) => (
            <div key={item.id} className='custom-item '>
              <div className='basket-div'>
                <h3 className='basket-item-quantity'>{item.quantity}x</h3>
                <h3 className='basket-item-name'>
                  {item.name} {item.size && item.size}
                </h3>
              </div>
              <div className='basket-div gap'>
                <h3 className='basket-item-price'>
                  ₺{item.price * item.quantity}
                </h3>
              </div>
            </div>
          ))}
          <div className='custom-footer'>
            <h3>
              <span>Toplam Fiyat:</span> {formattedTotalPrice}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
