import Order from './Order';

import Products from './Products';
import Categories from './Categories';
import Header from './Header';
import { useContext } from 'react';
import { contextData } from './Context';
import Okey from './Okey';

export default function Home() {
  const { isOkey } = useContext(contextData);
  return (
    <div className='home'>
      {isOkey ? <Okey /> : ''}
      <Header />
      <div className='main-side'>
        <Order />
        <div className='right-side'>
          <Categories />
          <Products />
        </div>
      </div>
    </div>
  );
}
