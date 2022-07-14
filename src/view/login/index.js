import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import './login.css';

import firebase from '../../config/firebase';
import 'firebase/auth';

import { useSelector, useDispatch } from 'react-redux';

function Login() {
  const [email, setEmail] = useState('');
  const [senha,setSenha] = useState('');

  const [msgTipo, setMsgTipo] = useState('');

  const dispatch = useDispatch();
  

  function logar() {
    
   firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(resultado => {
      setMsgTipo('sucesso');
      setTimeout(()=> {
        dispatch({type: 'LOG_IN', usuarioEmail: email});
      }, 2000);
   })
   .catch(erro => {
      setMsgTipo('erro');
   });

  }

  // alert(useSelector(state => state.usuarioEmail));

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <a className="navbar-brand text-white text-center" href='/'>Adventure</a>
        </div>
      </nav>
      <div className="login-content d-flex align-items-center">

        {
          useSelector(state => state.usuarioLogado) === 1 ? <Navigate to='/' /> : null
        }

        <main className="form-signin mx-auto col-sm-3">
          <form>
            <div className="text-center mb-2">
              {/* <i class="fa-solid fa-motorcycle text-white fa-5x"></i> */}
              <h1 className="h2 mb-3 fw-normal text-white font-weight-bold">Entrar</h1>
            </div>

            <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control my-2" id="floatingInput" placeholder="Email" />

            <input onChange={(e) => setSenha(e.target.value)} type="password" class="form-control my-2" id="floatingPassword" placeholder="Senha" />

            <button onClick={logar} class="w-100 btn btn-lg btn-login" type="button">Entrar</button>

            <div className="msg-login text-white text-center my-5">
              {msgTipo === 'sucesso' &&  <span>Login realizado com<strong> Sucesso</strong></span>}
              {msgTipo === 'erro' &&   <span>Verifique se a senha ou usuário estão corretos<strong></strong></span>}
            </div>

            <div className="opcoes-login mt-5 text-center">
              <Link to="/recuperarsenha" className="mx-2">Recuperar Senha</Link>
              <span className="text-white">|</span>
              <Link to='/cadastrousuario' className="mx-2">Cadastre-se</Link>
            </div>

          </form>
        </main>
      </div>
    </>
  
    
  );
}

export default Login;