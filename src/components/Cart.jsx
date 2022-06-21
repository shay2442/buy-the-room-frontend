
import {useNavigate, Link} from 'react-router-dom'
import {useEffect} from 'react'
import styled from 'styled-components'
function Cart({cart, setCart, getCartTotal}){
    const navigate = useNavigate();
    const routeChange = () =>{ 
      let path = `/checkout`; 
      navigate(path);
        localStorage.getItem("jwt")? navigate("/checkout") : navigate("/signup")
    }

    // localStorage.getItem("jwt")? navigate("/checkout") : navigate("/signup")


  const removeFromCart = (cartItem) => {
    const tempCart = cart.filter(item => item !== cartItem)
    setCart(tempCart)
  }

  function handlePurchase() {
      navigate(-1)
  }

 
  
  return(  
    <div className="cart-container">
        <div className="cart-price">{cart.map(item => <div><img height="200" width="200" src={item.image}/>

         $ {item.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
         <br/>
        
        <button className="remove-button" onClick={() => removeFromCart(item)}>Remove</button>
        </div>)}
        <h1 className="cart-total">Total:${cart.reduce((previousValue, currentValue) =>{return parseInt(previousValue) + currentValue.price},0)}</h1>
        </div>

        {/* <h1>Total: {getCartTotal} </h1> */}
        
        <button className="button" onClick={routeChange}>Purchase</button>
        
    </div>

  )
}

export default Cart

