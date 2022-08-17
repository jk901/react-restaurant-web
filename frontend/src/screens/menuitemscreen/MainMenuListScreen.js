import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MainMenuList } from '../../actions/menuItemsActions';
import MessageBox from '../../components/MessageBox';
import Preloader from '../../components/Preloader';
import '../../assets/css/base.css'

export default function MainMenuListScreen() {
    const navigate = useNavigate()
    const mainMenuList = useSelector((state) => state.mainMenuList);
    var {loading, error, mainmenu} = mainMenuList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(MainMenuList())
    }, [dispatch])

    const deleteHandler = () => {

    }
return (
    <>
    <div className="container-fluid">
        <div className='fs-4 fw-semibold text-capitalized py-3 px-1'>Main-Menu</div>
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
                                className='btn btn-warning mx-1' 
                                type='button'
                                onClick={() => {navigate(`/menu/${menuitem._id}/edit`)}}
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
