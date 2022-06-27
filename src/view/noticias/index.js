import React, { useState, useEffect } from 'react';
import './noticia.css';
import { Link, useParams } from 'react-router-dom';
import firebase from '../../config/firebase';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../../components/navbar';
import EventoCard from '../../components/evento-card';
import NoticiaCard from '../../components/noticia-card';

function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  const usuarioEmail = useSelector(state => state.usuarioEmail);

  let listaeventos = [];

  let currentId = useParams();
  const { id } = currentId;

  // const fetchBlogs = async() => {
  //   const response = firebase.collection('eventos');
  //   const data = await response.get();
  //   data.docs.forEach(item=>{
  //    setEventos([...eventos,item.data()])
  //   })

  //   console.log(response);
  // }

  // useEffect(() => {
  //   fetchBlogs();
  // }, [fetchBlogs])

  // useEffect(() => {
  
  //       firebase.firestore().collection('eventos').get().then(async (resultado) => {
  //       await resultado.docs.forEach(doc => {
  //           listaeventos.push({
  //             id: doc.id,
  //             ...doc.data()
  //           })
         
  //       })
        
  //       setEventos(listaeventos);
  //       console.log('listaeventos', listaeventos);
  //       console.log('eventos', eventos);
  //     })
  // }, []);

  useEffect(() => {

    if (id) {
      firebase.firestore().collection('noticias').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
        const listanoticias = [];
        await resultado.docs.forEach(doc => {
          if (doc.data().titulo.indexOf(pesquisa) >= 0 ) {
            listanoticias.push({
              id: doc.id,
              ...doc.data()
            })
          }
         
        })
        
        setNoticias(listanoticias);
        console.log(noticias);
      })
    } else {
      firebase.firestore().collection('noticias').get().then(async (resultado) => {
        const listanoticias = [];
        await resultado.docs.forEach(doc => {
          if (doc.data().titulo.indexOf(pesquisa) >= 0 ) {
            listanoticias.push({
              id: doc.id,
              ...doc.data()
            })
          }
        })
        setNoticias(listanoticias);
        console.log(listanoticias);
      })
    }
  }, [id, pesquisa, usuarioEmail]);

  // const getList = async () => {
  //   firebase.firestore().collection("eventos").onSnapshot((querySnapshot) => {
  //     const docs = [];
  //     querySnapshot.forEach((doc) => {
  //         docs.push({...doc.data(), id:doc.id});
  //   });

  //   setEventos(docs);

  //   });
  // };

  // useEffect(() => {
  //   getList();    
  // }, []);


  return (
    <>
     <Navbar />

     <div className='row mx-auto col-5 p-3'>
      <h3 className='p-5 text-center'>Noticias Publicadas</h3> 
      <input onChange={(e) => setPesquisa(e.target.value)} type='text' className='form-control text-center' placeholder='Buscar...' />
     </div>

     <div className='row p-5 home'>
       {noticias.map((item, index) => <NoticiaCard key={item.id} id={item.id} img={item.imagem} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} />)}
     </div>
    
    </>
   
  );
}

export default Noticias;