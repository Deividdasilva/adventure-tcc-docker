import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar';
import './evento-detalhes.css';

import firebase from '../../config/firebase';


function EventoDetalhes() {
  const [evento, setEvento] = useState({});
  const [urlImg, setUrlImg] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [excluir, setExcluir] = useState(false);

  const usuarioLogado =  useSelector(state => state.usuarioEmail);

  // const { parametro } = useParams({ id });
  let currentId = useParams();
  const { id } = currentId;

  function remover() {
    firebase.firestore().collection('eventos').doc(id).delete().then(() => {
      setExcluir(true);
    })
  }

  useEffect(() => {

    if (carregando) {
      firebase.firestore().collection('eventos').doc(id).get().then(resultado => {
        setEvento(resultado.data());
        firebase.firestore().collection('eventos').doc(id).update('visualizacoes', resultado.data().visualizacoes + 1)
        firebase.storage().ref(`imagens/${resultado.data().imagem}`).getDownloadURL().then(url => {
          setUrlImg(url);
          setCarregando(false);
        });
        // firebase.storage().ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImagem(url));
      });
    } else {
      firebase.storage().ref(`imagens/${evento.imagem}`).getDownloadURL().then(url => setUrlImg(url));
    }

  }, []);

  return (
    <>
      <Navbar />

      {
        excluir ? <Navigate to='/' /> : null
      }

      <div className='container-fluid'>

        { carregando ? 
          <div className='row mt-5 text-center'>
            <div class="spinner-border text-danger mx-auto text-center" role="status">
              <span class="visually-hidden"></span>
            </div>
          </div>
        :
          <div>
            <div className='row'>
              <img src={urlImg} className='img-banner' alt='Banner' />

              <div className='col-12 text-center visualizacoes'>
                <i class="fa-solid fa-eye"></i> <span>{evento.visualizacoes + 1}</span>
              </div>

              <h2 className='text-center mt-5 titulo'><strong className='mx-auto'>{evento.titulo}</strong></h2>

            </div>

            <div className='row mt-5 d-flex justify-content-around'>

              <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                <i className='fas fa-ticket-alt fa-2x'></i>
                <h5><strong>Tipo</strong></h5>
                <span className='mt-3'>{evento.tipo}</span>
              </div>

              <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                <i className='fas fa-calendar-alt fa-2x'></i>
                <h5><strong>Data</strong></h5>
                <span className='mt-3'>{evento.data}</span>
              </div>

              <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                <i className='fas fa-clock fa-2x'></i>
                <h5><strong>Hora</strong></h5>
                <span className='mt-3'>{evento.hora}</span>
              </div>

            </div>

            <div className='row box-detalhes mt-5'>
              <div className='col-12 text-center'>
                <h5><strong>Detalhes do Evento</strong></h5>
              </div>
              <div className='col-12 text-center'>
                <p>
                  {evento.detalhes}
                </p>
              </div>
            
            </div>

            {
              usuarioLogado === evento.usuario ? 
                <Link to={`/editarevento/${id}`} className='btn-editar'><i className='fas fa-pen-square fa-3x'></i></Link>
              : ''
            }

            {
              usuarioLogado === evento.usuario ? 
              <button onClick={remover} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">
                Remover evento
              </button>
              : ''
            }

        

          </div>

      

        }
       
      </div>
    </>
  );
}

export default EventoDetalhes;