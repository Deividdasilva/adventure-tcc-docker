import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MapPage from "../../pages/MapPage";

import firebase from '../../config/firebase';
import 'firebase/storage';
import 'firebase/firestore';

import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import Navbar from '../../components/navbar';

import { useNavigate } from "react-router-dom";



function CadastroEvento() {

  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [valor, setValor] = useState('');
  const [imagem, setImagem] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [imagemAtual, setImagemAtual] = useState('');
  const [imagemNova, setImagemNova] = useState('');
  const usuarioEmail = useSelector(state => state.usuarioEmail);

  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const [msgTipo, setMsgTipo] = useState('');
  const [carregando, setCarregando] = useState(false);

  const storage = firebase.storage();
  const db = firebase.firestore();

  let currentId = useParams();
  const { id } = currentId;

  useEffect(() => {
    if (id) {
      firebase.firestore().collection('eventos').doc(id).get().then(resultado => {
        setTitulo(resultado.data().titulo);
        setTipo(resultado.data().tipo);
        setDetalhes(resultado.data().detalhes);
        setData(resultado.data().data);
        setLongitude(resultado.data().longitude);
        setLatitude(resultado.data().latitude);
        setHora(resultado.data().hora);
        setValor(resultado.data().valor);
        setImagemAtual(resultado.data().imagem);
        localStorage.setItem('latitude',resultado.data().latitude);
        localStorage.setItem('longitude',resultado.data().longitude);
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
    let lat = Number(localStorage.getItem('latitude'));
    let lng  = Number(localStorage.getItem('longitude'));
    if (imagemNova)
    storage.ref(`imagens/${imagemNova.name}`).put(imagemNova);
  
      db.collection('eventos').doc(id).update({
        titulo: titulo,
        tipo: tipo,
        detalhes: detalhes,
        data: data,
        hora: hora,
        valor: valor,
        latitude: lat,
        longitude: lng,
        imagem: imagemNova ? imagemNova.name : imagemAtual
      }).then(() => {
        MySwal.fire({
          text: 'Evento atualizado com sucesso',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate('/');
        }, 3000);
        // navigate('/');
        setCarregando(false);
      }).catch(erro => {
        setMsgTipo('erro');
        // console.log(1)
        setCarregando(false);
      });
  }

  function cadastrar() {
    setMsgTipo(null);
    setCarregando(true);
    const latitude = Number(localStorage.getItem('latitude'));
    const longitude = Number(localStorage.getItem('longitude'));
    storage.ref(`imagens/${imagemNova.name}`).put(imagemNova).then(() => {
      db.collection('eventos').add({
        titulo: titulo,
        tipo: tipo,
        detalhes: detalhes,
        data: data,
        hora: hora,
        valor: valor,
        latitude: latitude,
        longitude: longitude,
        usuario: usuarioEmail,
        visualizacoes: 0,
        imagem: imagemNova.name,
        publico: 1,
        criacao: new Date()
      }).then(() => {
        setMsgTipo('sucesso');
        MySwal.fire({
          text: 'Evento cadastrado com sucesso',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate('/');
        }, 3000);
        // navigate("/");
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
      <div className="col-sm-6 mt-5 mx-auto text-left p-3">
        {/* <div className='col-12 mt-5 align-self-center'> */}
      <div className='row'>
        <h3 className='mx-auto text-center'>
          {id ? 'Atualizar Evento' : 'Novo Evento'}
        </h3>
      </div>

        <form>
          <div className='form-group mt-5'>
            <label>Titulo:</label>
            <input onChange={(e) => setTitulo(e.target.value)} type='text' className='form-control' value={titulo && titulo} />
          </div>

          <div className='form-group'>
            <label className='mt-2'>Tipo do Evento:</label>
            <select onChange={(e) => setTipo(e.target.value)} className='form-control' value={tipo && tipo}>
            <option disabled selected value placeholder='Selecione...'>Selecione...</option>
              <option>Trilha de Moto</option>
              <option>Pedal</option>
              <option>Trilha de carro</option>
              <option>Caminhada</option>
            </select>
          </div>

          <div className='form-group'>
            <label className='mt-2'>Descrição:</label>
            <textarea onChange={(e) => setDetalhes(e.target.value)} className='form-control' rows='3' value={detalhes && detalhes} />
          </div>

          <div className='form-group'>
            <div className='row'>
              <div className='col-4'>
                <label className='mt-2'>Data:</label>
                <input onChange={(e) => setData(e.target.value)} type='date' className='form-control' value={data && data}/>
              </div>

              <div className='col-4'>
                <label className='mt-2'>Hora:</label>
                <input onChange={(e) => setHora(e.target.value)} type='time' className='form-control' value={hora && hora}/>
              </div>

              <div className='col-4'>
                <label className='mt-2'>Valor R$:</label>
                <input onChange={(e) => setValor(e.target.value)} type='number' className='form-control' value={valor && valor}/>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label className='mt-2'>Imagem:</label>
            <input onChange={(e) => setImagemNova(e.target.files[0])} type='file' className='form-control'/>
            <MapPage />
          </div>
          <div className='row'>
            {
              carregando ?
              <button disabled onClick={id ? atualizar : cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">
                
              </button>  
              // <div class="spinner-border text-danger tex-center" role="status">
              //   <span class="visually-hidden">Loading...</span>
              // </div>
              :
              <button onClick={id ? atualizar : cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">
                {id ? 'Atualizar evento' : 'Cadastrar'}
              </button>
            }
          </div>
        </form>

        <div className="msg-login text-black col-6 text-center">
          {msgTipo === 'sucesso' &&  <span>Evento publicado com<strong> Sucesso</strong></span>}
          {msgTipo === 'erro' &&   <span>Não foi possivel publicar o evento</span>}
        </div>

        {/* </div> */}
        </div>
    </>
   
  );
}

export default CadastroEvento;