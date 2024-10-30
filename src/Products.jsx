import { useContext, useState } from 'react';
import { contextData } from './Context';

export default function Products() {
  const { filterProducts, setBasket, setSearch, search, setIsBasketOpen } =
    useContext(contextData);

  console.log(search);
  function addBasket(product) {
    setIsBasketOpen(true);
    setBasket((prevBasket) => {
      // Sepetteki ürünü bul
      const existingProduct = prevBasket.find((item) => item.id === product.id);

      if (existingProduct) {
        // Ürün zaten sepette varsa miktarını artır
        return prevBasket.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Ürün sepette yoksa yeni ekle
        return [...prevBasket, { ...product, quantity: 1 }];
      }
    });

    setSearch('');
  }

  return (
    <div>
      <div className='products'>
        {filterProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => addBasket(product)}
            className='card'
          >
            <img className='card__img' src={product.image} alt='' />
            <div className='overlay'></div>
            <div className='card-int'>
              <p className='card-int__title'>{product.name}</p>
              <p className='excerpt'>{product.price}₺</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
