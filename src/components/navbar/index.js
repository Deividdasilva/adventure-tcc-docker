import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

function Navbar() {

  const dispatch = useDispatch();
  
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
          <a className="navbar-brand text-white font-weight-bold text-left" href='/'>Adventure</a>
          {/* <i class="fa-solid fa-motorcycle text-white fa-2x"></i> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa-solid fa-bars text-white"></i>
          </button>
          <div class="collapse navbar-collapse text-right" id="navbarNav">
            <div class="navbar-nav">
              {/* <Link className="nav-link" aria-current="page" to="/">Home</Link> */}
              <Link className="nav-link" to="/eventos/mapa">Eventos Mapa</Link>
              <Link className="nav-link" to="/noticias">Noticias</Link>

              {
                useSelector(state => state.usuarioLogado) > 0 ?
                <>
                  <Link className="nav-link" to="/cadastroevento">Publicar Evento</Link>

                  {/* <Link className="nav-link" to="/eventos/meus">Meus Eventos</Link> */}
                  {/* <Link className="nav-link" to="/noticias">Noticias</Link> */}
                  <Link className="nav-link" to="/cadastronoticia">Publicar Noticia</Link>

                  {/* <Link className="nav-link" to="/eventos/meus">Meus Eventos</Link> */}

                  <Link className="nav-link" to="/" onClick={() => dispatch({type: 'LOG_OUT'}) }>Sair</Link>
                </>
                :
                <>
                  <Link className="nav-link" to="/cadastrousuario">Cadastrar</Link>
                  <Link className="nav-link" to='/login'>Entrar</Link>
                </>
              }

            </div>
          </div>
          {/* <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                <Link className="nav-link" to="cadastrousuario">Cadastrar</Link>
                <Link className="nav-link" to='login'>Login</Link>
              </li>
            </ul>
          </div> */}
      </div>
    </nav>
  );
}

export default Navbar;

