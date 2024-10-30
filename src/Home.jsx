import Order from './Order';

import Products from './Products';
import Categories from './Categories';
import Header from './Header';

export default function Home() {
  return (
    <div className='home'>
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
