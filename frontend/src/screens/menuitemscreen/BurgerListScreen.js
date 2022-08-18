import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BurgerMenuList, createBurger } from '../../actions/menuItemsActions';
import MessageBox from '../../components/MessageBox';
import Preloader from '../../components/Preloader';
import '../../assets/css/base.css'
import { BURGER_CREATE_RESET } from '../../constants/menItemsConstant';

export default function BurgerListScreen() {
    const navigate = useNavigate()
    const burgerMenuList = useSelector((state) => state.burgerMenuList);
    var {loading, error, burgermenu} = burgerMenuList;

    const burgerCreate = useSelector((state) => state.burgerCreate);
    const {
        loading: loadingCreate, 
        success: successCreate, 
        error: errorCreate, 
        menuItem: createdMenuItem
    } = burgerCreate;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successCreate) {
            dispatch({type: BURGER_CREATE_RESET});
            navigate(`/burger/${createdMenuItem._id}/edit`);
        }
        dispatch(BurgerMenuList())
    }, [dispatch, successCreate, navigate, createdMenuItem])

    const deleteHandler = () => {

    }

    const createHandler = () => {
        dispatch(createBurger());
    }
return (
    <>
    <div className="container-fluid">
        <div className="d-flex align-items-center">
            <div className='fs-4 fw-semibold text-capitalized py-3 px-1 me-auto'>Burger Menu</div>
            <button type='button' className='btn btn-primary ms-auto text-capitalize' onClick={createHandler}>
                Create
            </button>
        </div>
        {loadingCreate && <Preloader class='menu-preloader'></Preloader>}
        {errorCreate && <MessageBox>{errorCreate}</MessageBox>}
        {loading 
        ? <Preloader class="menu-preloader"></Preloader>
        : error
        ? <MessageBox variant='danger'>{error}</MessageBox>
        : (
        <table className="table table-hover mt-3 table-bordered text-center">
            <thead className="bg-dark text-white">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">DISCRIPTION</th>
                    <th scope="col">ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {burgermenu.map((menuitem) =>
                    <tr key={menuitem._id}>
                        <th scope="row">{menuitem._id}</th>
                        <td>{menuitem.name}</td>
                        <td>{menuitem.price}</td>
                        <td className='menulist-table-text'>{menuitem.text}</td>
                        <td>
                            <button 
                                className='btn btn-warning mx-1' 
                                type='button'
                                onClick={() => {navigate(`/${menuitem.category}/${menuitem._id}/edit`)}}
                                title='edit'
                            >Edit
                            </button>
                            <button 
                                className='btn btn-danger mx-1' 
                                type='button' 
                                title='delete'
                                onClick={() => deleteHandler(menuitem)}
                            >Delete
                            </button>
                        </td>
                    </tr>
                        )}
                </tbody>
        </table>
        )}
    </div>
    </>
)
}
