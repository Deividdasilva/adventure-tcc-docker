import React, { useState } from "react";

import './cadastre-se.css';

import firebase from '../../config/firebase';
import 'firebase/auth';

import Navbar from "../../components/navbar";

function CadastrarUsuario() {
  const [email, setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [msgTipo, setMsgTipo] = useState('');
  const [msg, setMsg] = useState('');
  const [carregando, setCarregando] = useState(false);

  function cadastrar() {

    setCarregando(true);

    setMsgTipo(null);

    if(!email || !senha) {
      setCarregando(false);
      setMsgTipo('erro');
      setMsg('Informe o Email e Senha');
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => {
      setCarregando(false);
      setMsgTipo('sucesso')
    }).catch(erro => {
      setCarregando(false);
      setMsgTipo('erro');
      switch(erro.message) 
        {
        case 'Password should be at least 6 characters':
            setMsg('A senha deve ter pelo menos 6 caracteres!');  
            break;
        case 'The email address is already in use by another account.':
            setMsg('Este email já está sendo utilizado por outro usuário!'); 
            break; 
        case 'The email address is badly formatted.':
            setMsg('O formato do seu email é inválido!'); 
            break;
          default:
            setMsg('Não foi possível cadastrar. Tente novamente mais tarde!');
            break; 
        }
    });

  }

  return (
    <>

      <Navbar />

      <div className="form-cadastro">
        <form className="text-center form-login mx-auto mt-5">
          <h1 className="h3 mb-3 text-black font-weight-blod">Cadastro</h1>

          <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email" />
          <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" placeholder="Senha" />

          {
            carregando ? 
              <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            : 
            <button onClick={cadastrar} type="button" className="w-100 btn btn-lg btn-block mt-3 mb-5 btn-cadastro">
              Cadastrar
            </button>
          }
          
          <div className="msg-login text-black text-center my-5">
            {msgTipo === 'sucesso' &&  <span>Usuário cadastrado com sucesso!</span>}
            {msgTipo === 'erro' &&   <span>{msg}</span>}
          </div>

        </form>
      </div>
    </>
  );

}

export default CadastrarUsuario;