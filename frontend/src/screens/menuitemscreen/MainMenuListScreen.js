import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createMainMenu, MainMenuList } from '../../actions/menuItemsActions';
import MessageBox from '../../components/MessageBox';
import Preloader from '../../components/Preloader';
import '../../assets/css/base.css'
import { MAINMENU_CREATE_RESET } from '../../constants/menItemsConstant';

export default function MainMenuListScreen() {
    const navigate = useNavigate()
    const mainMenuList = useSelector((state) => state.mainMenuList);
    var {loading, error, mainmenu} = mainMenuList;

    const mainMenuCreate = useSelector((state) => state.mainMenuCreate);
    const {
        loading: loadingCreate, 
        success: successCreate, 
        error: errorCreate, 
        menuItem: createdMenuItem,
    } = mainMenuCreate;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successCreate) {
            dispatch({type: MAINMENU_CREATE_RESET});
            navigate(`/mainmenu/${createdMenuItem._id}/edit`);
        }
        dispatch(MainMenuList())
    }, [dispatch, successCreate, navigate, createdMenuItem])

    const deleteHandler = () => {

    }

    const createHandler = () => {
        dispatch(createMainMenu());
    }
return (
    <>
    <div className="container-fluid">
        <div className="d-flex align-items-center">
            <div className='fs-4 fw-semibold text-capitalized py-3 px-1 me-auto'>Main-Menu</div>
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
                {mainmenu.map((menuitem) =>
                    <tr key={menuitem._id}>
                        <th scope="row">{menuitem._id}</th>
                        <td>{menuitem.name}</td>
                        <td>{menuitem.price}</td>
                        <td className='menulist-table-text'>{menuitem.text}</td>
                        <td>
                            <button 
                                className='btn btn-warning mx-1 text-white fw-semibold edit-btn' 
                                type='button'
                                onClick={() => {navigate(`/${menuitem.category}/${menuitem._id}/edit`)}}
                                title='edit'
                            ><i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button 
                                className='btn btn-danger mx-1 delete-btn' 
                                type='button' 
                                title='delete'
                                onClick={() => deleteHandler(menuitem)}
                            ><i class="fa-solid fa-trash-can"></i>
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
