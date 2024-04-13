import React from 'react'
import { NavLink } from 'react-router-dom';

export const Header = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

                <NavLink className="navbar-brand" exact to='/'>SOFTDARK</NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                    <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact to='/'>peliculas y Series</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact to='/directores'>Directores</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact to='/generos'>Generos</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact to='/productoras'>Productoras</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='active' exact to='/tipos'>Tipos</NavLink>
                        </li>

                     

                    </ul>
                </div>

            </div>
        </nav>
    )
}