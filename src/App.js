import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { store, persistor } from '../src/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Views
import Home from './view/home';
import Login from './view/login';
import Cadastro from './view/cadastre-se';
import RecuperarSenha from './view/recuperar-senha';
import CadastroEvento from './view/evento-cadastro';
import EventoDetalhes from './view/eventos-detalhes';
export const REACT_APP_GOOGLE_API_KEY = "AIzaSyDICZ0YXfOVy5q8zd3pY1r9ntqLnr2RiZ8";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/eventos/:parametro" element={<Home />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/recuperarsenha" element={<RecuperarSenha />} exact />
          <Route path="/cadastrousuario" element={<Cadastro />} exact />
          <Route path="/cadastroevento" element={<CadastroEvento />} exact />
          <Route path="/eventodetalhes/:id" element={<EventoDetalhes />} />
          <Route path="/editarevento/:id" element={<CadastroEvento />} />
        </Routes>
      </Router>
      </PersistGate>
    </Provider> 

  );
}

export default App;
