import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../config/firebase';

import './evento-card-map.css';

function EventoCard({ id, img, titulo, detalhes, data, hora}) {
  const [urlImagem, setUrlImagem] = useState();
  const date = data;

  const [year, month, day] = date.split('-');

  const result = `${day}/${month}/${year}`;

  useEffect(() => {
    firebase.storage().ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImagem(url));
    
  }, [urlImagem]);

  return (
    <div className='col-md-8 col-sm-10'>
      <img src={urlImagem} className='card-img-top img-cartao' alt='Imagem do Evento' />

      <div className='card-body'>
        <h5>{titulo}</h5>
        <h6 className='card-text'>
          {detalhes}<br></br>
          {result} - {hora}
        </h6>
        <Link to={'/eventodetalhes/' + id} className='btn btn-sm btn-detalhes'>Detalhes</Link>
      </div>
    </div>
  );
}

export default EventoCard;


