import React, { useState, useEffect } from 'react';
import { data } from '../api';

const Home = () => {
  const [list, setList] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(data);
      const info = await response.json();
      setList(info);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [Item, setItem] = useState(null);
  const handleMore = (id) => {
    setItem(id);
  };

  const handleLess = () => {
    setItem(null);
  };
  const handleClear = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <>
      <h1 className='h1'>Our Tours</h1>
      <div className='content'>
        {list.map(({ id, image, price, name, info }) => (
          <div className='parent' key={id}>
            <div className='child'>
            <img className='image' src={image} alt='nkar' />
            <span>${price}</span>
            <h2 className='h2'>{name}</h2>
            <p className='text'>
               {Item && Item.id === id ? info : `${info.substring(0, 100)}...`}
              {info.length > 100 && (
                <span>
                  {Item && Item.id === id ? (
                    <span className='less' onClick={handleLess}>Show Less</span>
                  ) : (
                    <span className='less' onClick={() => handleMore({id})}>Read More</span>
                  )}
                </span>
              )}
            </p>
            <button onClick={() => handleClear(id)}>Not Interested</button>
          </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;