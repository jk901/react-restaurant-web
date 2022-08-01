import Axios from "axios"
import { CART_ADD_ITEM } from "../constants/Cartconstant";

export const addToCart = (productCat, productId, qty) => async (dispatch, getState) => {
    const {data} = await Axios.get(`/api/${productCat}/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product : data.id,
            name : data.name,
            image : data.image,
            price : data.price,
            text : data.text,
            qty,  
        },
    });
};