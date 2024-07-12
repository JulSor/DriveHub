import React from "react";
import { Link } from 'react-router-dom';
import './KaikkiAjot/KaikkiAjot.css';
import '../App.css';


const PageButtons = () => {
    return (
    <>
    <div className="pageButtonContainer">
    <div className="button-grid">
        <Link to="/" className="pageButton">Kaikki ajot</Link>
        <Link to="/ei-aloitetut" className="pageButton">Ei aloitetut</Link>
        <Link to="/aloitetut" className="pageButton">Aloitetut</Link>
        <Link to="/suoritetut" className="pageButton">Suoritetut</Link>
    </div>
    <div className="add-button">
        <Link to="/lisaa-ajo" className="addButton">Lisää ajo</Link>
    </div>
    </div>
    </>
    )
}

export default PageButtons;