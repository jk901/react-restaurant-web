import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../actions/Cartaction';
import '../assets/css/base.css';
import '../assets/css/cart.css';
import Addtocartbtn from '../components/buttons/Addtocartbtn';
import MessageBox from '../components/MessageBox';


export default function Cartscreen(props) {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const {category: productCat, id: productId } = params;
    const { search } = useLocation();
    
    const cart = useSelector((state) => state.Cart);
    const { cartItems } = cart;
    
    const qtyInUrl = new URLSearchParams(search).get('qty');
    const qty = qtyInUrl ? Number(qtyInUrl) : 1;

    useEffect(() => {
    if(productId) {
        dispatch(addToCart(productCat, productId, qty))
    }
    }, [dispatch, productCat, productId, qty])

    const removeFromCartHandler = (id) => {
      //delte action
    };

    const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
    }
return (
    <>
    <main className="container-fluid mb-sm-0 mt-2 mb-3">
        <div className="cart-container">
            <div className="row">

            <div className="order-details col-sm-12 col-md-7 mb-2">

                <main className="cart-body">

                    <header className="cart-title p-3">
                        <div className="text-white">Your cart</div>
                    </header>
                    {cartItems.length === 0
                    ? <MessageBox>Looks like your cart is empty!<Link to='/menu'>Go Shopping<i class="fa-solid fa-angles-right"></i></Link></MessageBox>
                    :(
                    <main className="cartrow-container">
                    {cartItems.map((item) => (
                    <article key={item.product} className="cart-row d-flex align-items-center justify-content-around py-2">
                            <div className="cart-product-image overflow-hidden rounded-3">
                                <img src={item.image} alt={item.name} className="image-fluid rounded-3"/>
                            </div>
                            <div className="cart-product-details">
                            <Link to={`/productdetails/${productCat}/${item.product}`}>
                                <div className="cart-product-title">{item.name}</div>
                            </Link>
                                <div className="cart-product-price">{item.price}&#8377;</div>
                            </div>
                            <div className="cart-prosduct-quantity">
                                <input title="quantity" type="number" name="" id="" value={item.qty} className="cart-quantity-input text-center" readonly/>
                            </div>
                            <div className="cart-product-delete">
                                <i className="fa-solid fa-trash-can" title="remove" onClick={() => removeFromCartHandler(item.product)}></i>
                            </div>
                        </article>))}
                    </main>)}
                </main>

            </div>

                <footer className="col-sm-12 col-md-5 mt-2">

                    <div className="cart-bill container py-3">
                        <div className="shipping p-2 d-flex justify-content-between align-items-center">
                            <div className="shipping-title text-capitalize">shipping :</div>
                            <div className="shipping-price">50&#8377;</div>
                        </div>
                        <div className="total p-2 d-flex justify-content-between align-items-center">
                            <div className="total-title text-capitalize">total<span className='fs-6'>({cartItems.reduce((a,c) => a + c.qty, 0)} items)</span>:</div>
                            <div className="total-price"> {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}&#8377;</div>
                        </div>
                        <div className="checkout-btn d-flex align-items-center justify-content-center mt-2">
                            <Addtocartbtn content='proceed to checkout' onClick={checkoutHandler} disabled={cartItems.length === 0}/>
                        </div>
                    </div>
                    
                </footer>

            </div>

        </div>

    </main>
    </>
)
}
