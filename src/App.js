import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notifications from './components/UI/Notification';
import { fetcCartData, sendCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    if(!cart.changed){
      dispatch(fetcCartData());
    }
  }, [dispatch]);

  //For side-effect in action creator (Thunk)
  useEffect(() => {
    if(isInitial){
      isInitial = false;
      return;
    }

    if(cart.changed){
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch])

  // // For side-effect in component
  // useEffect(() => {
  //   const sendCartData = async() => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'pending',
  //         title: 'Sending...',
  //         message: 'Sending cart data...'
  //       })
  //     )

  //     const response = await fetch('https://react-http-redux-default-rtdb.firebaseio.com/cart.json',
  //     {
  //       method: 'PUT',
  //       body: JSON.stringify(cart)
  //     })
  
  //     if(!response.ok){
  //       throw new Error('Sending cart data failed.')
  //     }
  
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'success',
  //         title: 'Success',
  //         message: 'Cart sent successfully'
  //       })
  //     )
  //   }

  //   if(isInitial){
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch((error) => {
  //     console.log(error);
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'error',
  //         title: 'Error!',
  //         message: 'Sending cart data failed'
  //       })
  //     )
  //   })
  // }, [cart, dispatch])

  return (
    <Fragment>
      {notification && <Notifications 
        status={notification.status} 
        title={notification.title} 
        message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
