
import {useNavigate, Link} from 'react-router-dom'
import {useEffect} from 'react'
function Cart({cart, setCart}){
    const navigate = useNavigate()

   


  const removeFromCart = (cartItem) => {
    const tempCart = cart.filter(item => item !== cartItem)
    setCart(tempCart)
  }

 
  
  return(  
    <>
        {cart.map(item => <div><img height="200" width="200" src={item.image}/> : {item.price}
        <button onClick={() => removeFromCart(item)}>Remove</button>
        </div>)}
        {/* <h1>Total:${cart.reduce((previousValue, currentValue) =>{return parseInt(previousValue) + currentValue.price},0)}</h1> */}
        
        <button onClick={() => navigate('/signup')}>Purchase</button>
    
    </>
  )
}

export default Cart