import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../config/firebase';

import './evento-card.css';

function EventoCard({ id, img, titulo, detalhes, visualizacoes}) {
  const [urlImagem, setUrlImagem] = useState();


  useEffect(() => {
    
    firebase.storage().ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImagem(url));
    
  }, [urlImagem]);
  // urlImagem
  // console.log(urlImagem);

  return (
    <div className='col-md-3 pt-5 col-sm-10'>
      <img src={urlImagem} className='card-img-top p-3 pt-3 img-cartao' alt='Imagem do Evento' />

      <div className='card-body'>
        <h5>{titulo}</h5>
        <p className='card-text text-justify'>
          {detalhes}
        </p>

        <div className='row rodape-card d-flex align-items-center'>

          <div className='col-6'>
            <Link to={'/eventodetalhes/' + id} className='btn btn-sm btn-detalhes'>Detalhes</Link>
          </div>
      
          <div className='col-6 text-center'>
            <i class="fa-solid fa-eye"></i> <span>{visualizacoes}</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default EventoCard;


