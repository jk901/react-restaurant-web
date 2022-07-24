import React from 'react';
import {Link} from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';


const Specialitems = (props) => {
return (
    <>
    <Zoom distance="60px" top timeout={1300} delay={2000}>
        <div className="col-md-4 col-sm-12 pt-2">
            <Link  to={props.link}>
                <div className="special-item-container mx-auto position-relative my-3">
                    <div className="special-item-circle position-absolute"></div>
                    <img className="special-item-img position-relative" src={props.src} alt={props.name} />
                    <h1 className="special-item-title text-capitalize">{props.name}</h1>
                    <div className="special-item-price"><span className="d-block text-center">{props.price}&#8377;</span></div>
                </div>
            </Link>
        </div>
    </Zoom>
    </>
)
}
export default Specialitems;
