import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar';
import './noticia-detalhes.css';

import firebase from '../../config/firebase';

import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import { useNavigate } from "react-router-dom";

function NoticiaDetalhes() {
  const [noticia, setNoticia] = useState({});
  const [urlImg, setUrlImg] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [excluir, setExcluir] = useState(false);

  const usuarioLogado =  useSelector(state => state.usuarioEmail);

  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  // const { parametro } = useParams({ id });
  let currentId = useParams();
  const { id } = currentId;

  function remover() {
    firebase.firestore().collection('noticias').doc(id).delete().then(() => {
      setExcluir(true);
      MySwal.fire({
        text: 'Notícia removida com sucesso',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
      });
      setTimeout(() => {
        navigate('/noticias');
      }, 3000);

    })
  }

  useEffect(() => {

    if (carregando) {
      firebase.firestore().collection('noticias').doc(id).get().then(resultado => {
        setNoticia(resultado.data());
        firebase.firestore().collection('noticias').doc(id).update('visualizacoes', resultado.data().visualizacoes + 1)
        firebase.storage().ref(`imagens/${resultado.data().imagem}`).getDownloadURL().then(url => {
          setUrlImg(url);
          setCarregando(false);
        });
        // firebase.storage().ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImagem(url));
      });
    } else {
      firebase.storage().ref(`imagens/${noticia.imagem}`).getDownloadURL().then(url => setUrlImg(url));
    }

  }, []);

  return (
    <>
      <Navbar />

      {
        excluir ? <Navigate to='/' /> : null
      }

      <div className="col-sm-6 mt-5 mx-auto text-left p-3">

        { carregando ? 
          <div className='row mt-5 text-center'>
            <div class="spinner-border text-danger mx-auto text-center" role="status">
              <span class="visually-hidden"></span>
            </div>
          </div>
        :
          <div>
            <div className='form-group mt-5'>
            <h4 className='text-left mt-5 p-2 titulo'><strong className='mx-auto'>{noticia.titulo}</strong></h4>
            <img src={urlImg} className='img-banner' alt='Banner' />

              {/* <div className='col-12 text-center visualizacoes'>
                <i class="fa-solid fa-eye"></i> <span>{noticia.visualizacoes + 1}</span>
              </div> */}

            

            </div>

            {/* <div className='row mt-5 d-flex justify-content-around'>

              <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                <i className='fas fa-ticket-alt fa-2x'></i>
                <h5><strong>Tipo</strong></h5>
                <span className='mt-3'>{noticia.tipo}</span>
              </div>

              <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                <i className='fas fa-calendar-alt fa-2x'></i>
                <h5><strong>Data</strong></h5>
                <span className='mt-3'>{noticia.data}</span>
              </div>

              <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                <i className='fas fa-clock fa-2x'></i>
                <h5><strong>Hora</strong></h5>
                <span className='mt-3'>{noticia.hora}</span>
              </div>

            </div> */}

            <div className='row box-detalhes mt-5'>
              <div className='col-12 text-center'>
                <h4><strong>Detalhes da Notícia</strong></h4>
              </div>
              <div className='col-12 text-center'>
                <p>
                  {noticia.detalhes}
                </p>
              </div>
            
            </div>

            {
              usuarioLogado === noticia.usuario ? 
                <Link to={`/editarnoticia/${id}`} className='btn-editar'><i className='fas fa-pen-square fa-3x'></i></Link>
              : ''
            }

            {
              usuarioLogado === noticia.usuario ? 
              <button onClick={remover} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">
                Remover notícia
              </button>
              : ''
            }

          </div>

        }
       
      </div>
    </>
  );
}

export default NoticiaDetalhes;