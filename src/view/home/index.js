import React, { useState, useEffect } from 'react';
import './home.css';
import { Link, useParams } from 'react-router-dom';
import firebase from '../../config/firebase';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../../components/navbar';
import EventoCard from '../../components/evento-card';

function Home() {
  const [eventos, setEventos] = useState([]);
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
      firebase.firestore().collection('eventos').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
        const listaeventos = [];
        await resultado.docs.forEach(doc => {
          let titulo = doc.data().titulo.toUpperCase(doc.data().titulo)
          // let tipo = doc.data().tipo.toUpperCase(doc.data().tipo)
          // if (tipo.indexOf(pesquisa) >= 0 ) {
          //   listaeventos.push({
          //     id: doc.id,
          //     ...doc.data()
          //   })
          // }
          console.log(titulo)
          console.log(pesquisa.toUpperCase(pesquisa))
          if (titulo.indexOf(pesquisa) >= 0 ) {
            listaeventos.push({
              id: doc.id,
              ...doc.data()
            })
          }
         
        })
        
        setEventos(listaeventos);
      })
    } else {
      firebase.firestore().collection('eventos').get().then(async (resultado) => {
        const listaeventos = [];
        await resultado.docs.forEach(doc => {
          let titulo = doc.data().titulo.toUpperCase(doc.data().titulo)
          let tipo = doc.data().tipo.toUpperCase(doc.data().tipo)
          let pesq = pesquisa.toUpperCase(pesquisa)
          // let tipo = doc.data().tipo.toUpperCase(doc.data().tipo)
          if (titulo.indexOf(pesq) >= 0 || tipo.indexOf(pesq) >= 0 ) {
            listaeventos.push({
              id: doc.id,
              ...doc.data()
            })
          }

          // if (tipo.indexOf(pesq) >= 0 ) {
          //   listaeventos.push({
          //     id: doc.id,
          //     ...doc.data()
          //   })
          // }
        })
        setEventos(listaeventos);
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

     <div className='row mx-auto p-3 home '>
      <h4 className='p-5 text-center'>Os melhores eventos perto de você...</h4>
     </div> 

     <div className='input-group mx-auto p-2 barra-pesuisa'>
      <input 
        onChange={(e) => setPesquisa(e.target.value)} 
        type='text' 
        className='form-control' 
        placeholder='Pesquisar por evento...' 
        style={{ 
          padding: '10px',
          // paddingLeft: '15px',
          // paddingTop: '10px',
          flex: '1',
          border: 'none',
          outline: 'none',
          fontSize: '18px'
        }}>
      </input>
      <i 
        class="fa fa-search" aria-hidden="true" 
        style={{ 
          padding: '15px',
          // paddingLeft: '15px',
          // paddingTop: '15px',
          // paddingRight: '15px',
          borderRadius: '5px',
          // flex: '1',
          // border: 'none',
          // outline: 'none',
          fontSize: '18px',
          backgroundColor: '#614ea6'
        }}>
  
      </i>
      {/* <span class="glyphicon glyphicon-search"></span> */}
   
     </div>

     <div className='input-group mx-auto p-2 barra-pesuisa'>
      <input 
        onChange={(e) => setPesquisa(e.target.value)} 
        type='text' 
        className='form-control' 
        placeholder='Pesquisar por tipo de evento...' 
        style={{ 
          padding: '10px',
          // paddingLeft: '15px',
          // paddingTop: '10px',
          flex: '1',
          border: 'none',
          outline: 'none',
          fontSize: '18px'
        }}>
      </input>
      <i 
        class="fa fa-search" aria-hidden="true" 
        style={{ 
          padding: '15px',
          // paddingLeft: '15px',
          // paddingTop: '15px',
          // paddingRight: '15px',
          borderRadius: '5px',
          // flex: '1',
          // border: 'none',
          // outline: 'none',
          fontSize: '18px',
          backgroundColor: '#614ea6'
        }}>
  
      </i>
      {/* <span class="glyphicon glyphicon-search"></span> */}
   
     </div>

{/* <div class="input-group">
  <span class="input-group-addon">
  <i class="fas fa-search"></i>
  </span>
  <input type="text" class="form-control" placeholder="Username" />
</div> */}
     
    

     <div className='row mx-auto col-10 p-3 home'>
       {eventos.map((item, index) => <EventoCard key={item.id} id={item.id} img={item.imagem} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} />)}
     </div>
    
    </>
   
  );
}

export default Home;