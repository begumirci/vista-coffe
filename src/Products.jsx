import { useContext, useState } from 'react';
import { contextData } from './Context';

export default function Products() {
  const {
    filterProducts,
    setBasket,
    setSearch,
    search,
    setIsBasketOpen,
    addBasket,
  } = useContext(contextData);

  console.log(search);

  return (
    <div>
      <div className='products'>
        {filterProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => addBasket(product)}
            className='card'
          >
            <div className='overlay'></div>
            <div className='card-int'>
              <p className='card-int__title'>{product.name}</p>
              <p
                className={`card-int__title ${product.size ? 'size' : ''} ${
                  product.size == 'M' && 'sizeM'
                }`}
                style={{ height: '39px' }}
              >
                {product.size ? product.size : ' '}
              </p>
              <p className='excerpt'>{product.price}₺</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
