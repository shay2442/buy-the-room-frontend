
import {useNavigate, Link} from 'react-router-dom'
import {useEffect} from 'react'
import styled from 'styled-components'
function Cart({cart, setCart, getCartTotal}){
    const navigate = useNavigate();

   


  const removeFromCart = (cartItem) => {
    const tempCart = cart.filter(item => item !== cartItem)
    setCart(tempCart)
  }

 
  
  return(  
    <div className="cart-container">
        {cart.map(item => <div><img height="200" width="200" src={item.image}/> $ {item.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        <button onClick={() => removeFromCart(item)}>Remove</button>
        </div>)}
        <h1>Total:${cart.reduce((previousValue, currentValue) =>{return parseInt(previousValue) + currentValue.price},0)}</h1>

        {/* <h1>Total: {getCartTotal} </h1> */}
        
        <button className="button" onClick={() => navigate('/signup')}>Purchase</button>
    
    </div>
  )
}

export default Cart

