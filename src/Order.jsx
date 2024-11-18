import { useContext, useState, useEffect } from 'react';
import { contextData } from './Context';

export default function Order() {
  const { isBasketOpen, basket, setBasket, saveOrderToLocalStorage, isOkey } =
    useContext(contextData);
  const [extraOpen, setExtraOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
  });

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

  function addBasket(product) {
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

  const decreaseBasket = (item) => {
    if (item.quantity > 1) {
      // Eğer miktar 1'den büyükse, miktarı azalt
      setBasket((prevBasket) =>
        prevBasket.map((basketItem) =>
          basketItem.id === item.id
            ? { ...basketItem, quantity: basketItem.quantity - 1 }
            : basketItem
        )
      );
    } else {
      // Miktar 0 olursa ürünü sepetten kaldır
      setBasket((prevBasket) =>
        prevBasket.filter((basketItem) => basketItem.id !== item.id)
      );
    }
  };

  function handleClickExtra(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function addExtra(e) {
    e.preventDefault();

    setBasket((prevBasket) => {
      return [...prevBasket, { ...formData }];
    });
  }

  return (
    <>
      {basket.length > 0 && (
        <div className='order'>
          <div>
            <h3 className='basket-header'>
              Sipariş Numarası - <p> {orderNumber && orderNumber}</p>
            </h3>
            <button onClick={() => setExtraOpen(true)} className='extraBtn'>
              Ekstra
            </button>
            {extraOpen ? (
              <div>
                <form action='' className='extra-side'>
                  <input
                    type='text'
                    placeholder='Ürün İsmi'
                    name='name'
                    onChange={handleClickExtra}
                  />
                  <input
                    type='text'
                    placeholder='Ürün Fiyatı'
                    name='price'
                    onChange={handleClickExtra}
                  />
                  <input
                    type='text'
                    placeholder='Ürün Adedi'
                    name='quantity'
                    onChange={handleClickExtra}
                  />
                  <button onClick={addExtra}>Ekle</button>
                  <button onClick={() => setExtraOpen(false)}>Geri Git</button>
                </form>
              </div>
            ) : (
              ''
            )}

            <div className='basket-items'>
              {basket.map((item) => (
                <div key={item.id} className='basket-item'>
                  <div className='basket-div'>
                    {/* <h3 className='basket-item-quantity'>{item.quantity}x</h3> */}
                    <h3 className='basket-item-name'>
                      {item.name} - {item.size && item.size}
                    </h3>
                  </div>
                  <div className='basket-divs gap'>
                    <div className='control-btns'>
                      <span
                        className='azalt'
                        onClick={() => decreaseBasket(item)}
                      >
                        -
                      </span>
                      <span className='number basket-item-quantity'>
                        {item.quantity}
                      </span>
                      <span className='arttir' onClick={() => addBasket(item)}>
                        +
                      </span>
                    </div>
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
