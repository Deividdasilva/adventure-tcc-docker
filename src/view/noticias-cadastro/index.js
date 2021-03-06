import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './noticia.css';

import firebase from '../../config/firebase';
import 'firebase/storage';
import 'firebase/firestore';

import Navbar from '../../components/navbar';

import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';


function CadastroNoticia() {

  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [imagem, setImagem] = useState('');
  const [imagemAtual, setImagemAtual] = useState('');
  const [imagemNova, setImagemNova] = useState('');
  const usuarioEmail = useSelector(state => state.usuarioEmail);
  const navigate = useNavigate();
  const [msgTipo, setMsgTipo] = useState('');
  const [carregando, setCarregando] = useState(false);

  const MySwal = withReactContent(Swal);

  const storage = firebase.storage();
  const db = firebase.firestore();

  let currentId = useParams();
  const { id } = currentId;

  useEffect(() => {

    if (id) {
      firebase.firestore().collection('noticias').doc(id).get().then(resultado => {
        setTitulo(resultado.data().titulo);
        // setTipo(resultado.data().tipo);
        setDetalhes(resultado.data().detalhes);
        // setData(resultado.data().data);
        // setHora(resultado.data().hora);
        setImagemAtual(resultado.data().imagem);

        // firebase.storage().ref(`imagens/${resultado.data().imagem}`).getDownloadURL().then(url => {
        //   setUrlImg(url);
        //   setCarregando(false);
        // });
        // firebase.storage().ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImagem(url));
      });
    }


  }, [carregando]);

  function atualizar() {
    setMsgTipo(null);
    setCarregando(true);

    if (imagemNova)
    storage.ref(`imagens/${imagemNova.name}`).put(imagemNova);
  
      db.collection('noticias').doc(id).update({
        titulo: titulo,
        // tipo: tipo,
        detalhes: detalhes,
        // data: data,
        // hora: hora,
        imagem: imagemNova ? imagemNova.name : imagemAtual
      }).then(() => {
        setMsgTipo('sucesso');
        MySwal.fire({
          text: 'Noticia atualizada com sucesso',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate('/noticias');
        }, 3000);
      }).catch(erro => {
        setMsgTipo('erro');
        setCarregando(false);
      });
  }

  function cadastrar() {
    setMsgTipo(null);
    setCarregando(true);
    storage.ref(`imagens/${imagemNova.name}`).put(imagemNova).then(() => {
      db.collection('noticias').add({
        titulo: titulo,
        // tipo: tipo,
        detalhes: detalhes,
        // data: data,
        // hora: hora,
        usuario: usuarioEmail,
        visualizacoes: 0,
        imagem: imagemNova.name,
        publico: 1,
        criacao: new Date()
      }).then(() => {
        setMsgTipo('sucesso');
        MySwal.fire({
          text: 'Noticia cadastrada com sucesso',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate('/noticias');
        }, 3000);
        setCarregando(false);
      }).catch(erro => {
        setMsgTipo('erro');
        setCarregando(false);
      });
    });
  }

  // function resetForm() {
  //   setTitulo('');
  //   setTipo('');
  //   setDetalhes('');
  //   setData('');
  //   setHora('');
  //   setImagem('');
  // }

  return (
    <>
      <Navbar />
      {/* <center> */}
        <div className="col-sm-6 mt-5 mx-auto text-left p-3">
    
      <div className='row'>
        <h3 className='mx-auto text-center'>
          {id ? 'Atualizar Noticia' : 'Nova Noticia'}
        </h3>
      </div>

        <form>
          <div className='form-group mt-5'>
            <label>Titulo:</label>
            <input onChange={(e) => setTitulo(e.target.value)} type='text' className='form-control' value={titulo && titulo} />
          </div>

          {/* <div className='form-group col-6'>
            <label className='mt-2'>Tipo do Evento:</label>
            <select onChange={(e) => setTipo(e.target.value)} className='form-control' value={tipo && tipo}>
            <option disabled selected value>Selecione...</option>
              <option>Trilha Moto</option>
              <option>Trilha Bike</option>
              <option>Trilha carro</option>
            </select>
          </div> */}

          <div className='form-group'>
            <label className='mt-2'>Descri????o:</label>
            <textarea onChange={(e) => setDetalhes(e.target.value)} className='form-control' rows='3' value={detalhes && detalhes} />
          </div>

          {/* <div className='col-6'>
            <div className='row'>
            <div className='col-6'>
              <label className='mt-2'>Data:</label>
              <input onChange={(e) => setData(e.target.value)} type='date' className='form-control' value={data && data}/>
            </div>

            <div className='col-6'>
              <label className='mt-2'>Hora:</label>
              <input onChange={(e) => setHora(e.target.value)} type='time' className='form-control' value={hora && hora}/>
            </div>
            </div>
          </div> */}

          <div className='form-group'>
            <label className='mt-2'>Imagem:</label>
            <input onChange={(e) => setImagemNova(e.target.files[0])} type='file' className='form-control'/>
          </div>
          <div className='row'>
            {
              carregando ?
              <button disabled onClick={id ? atualizar : cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">
                Publicar Noticia
              </button>  
              // <div class="spinner-border text-danger tex-center" role="status">
              //   <span class="visually-hidden">Loading...</span>
              // </div>
              :
              <button onClick={id ? atualizar : cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">
                {id ? 'Atualizar noticia' : 'Publicar noticia'}
              </button>
            }
          </div>
        </form>

        <div className="msg-login text-black col-6 text-center">
          {msgTipo === 'sucesso' &&  <span><strong></strong></span>}
          {msgTipo === 'erro' &&   <span>N??o foi possivel publicar a noticia</span>}
        </div>

        </div>
      {/* </center> */}
    </>
   
  );
}

export default CadastroNoticia;