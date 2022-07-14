import React, { useState } from 'react';

import './recuperar-senha.css';

import Navbar from '../../components/navbar';

import firebase from '../../config/firebase';
import 'firebase/auth';

import { useNavigate } from "react-router-dom";

function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  function recuperarSenha() {
    firebase.auth().sendPasswordResetEmail(email).then(resultado => {
      setMsg('Enviamos um link no seu email para você redefinir sua senha');
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    }).catch(erro => {
      setMsg('Verifique se o email está correto');
    });
  }


  return (
    <>
      <Navbar />
      <div className="form-cadastro p-5">
      <form className='text-center form-login col-sm-4 mx-auto mt-5'>
        <h3 className='mb-3'>Recuperar Senha</h3>
        <input onChange={(e) => setEmail(e.target.value)}  type="email" className="form-control my-2" placeholder="Email" />

        <div className='msg my-4 text-center'>
          <span>{msg}</span>
        </div>

        <button onClick={recuperarSenha} type='button' className='w-100 btn btn-lg btn-block btn-enviar'>Recuperar Senha</button>
      </form>
      </div>

    </>
  );
}

export default RecuperarSenha;