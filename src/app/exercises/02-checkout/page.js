'use client';
import React from 'react';

import DATA from './data';
import reducer from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(
    reducer,
    null
  );

  React.useEffect(() => {
    const checkout = localStorage.getItem('checkout');
    const jsonCheckout = JSON.parse(checkout);

    const arrayCheckout = jsonCheckout.map((item) => {
      const dataItem = DATA.find(({id}) => {
        return item.id === id;
      });
      dataItem.quantity = item.quantity;
      return dataItem;
    })

    const items = arrayCheckout === null ? [] : arrayCheckout;
    dispatch({type: 'load-item', items});
  }, []);

  React.useEffect(() => {
    if(items !== null) {
      const jsonItems = JSON.stringify(items.map(item => {
        return {id: item.id, quantity: item.quantity}
      }));
      window.localStorage.setItem('checkout', jsonItems);
    }
  }, [items]);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: 'add-item',
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) =>
            dispatch({
              type: 'delete-item',
              item,
            })
          }
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
