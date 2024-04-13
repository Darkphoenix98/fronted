import React from 'react';
import  {Header} from './components/ui/Header';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { MediaView } from './components/media/MediaView';
import { DirectorView } from './components/directores/DirectorView';
import { GeneroView } from './components/generos/GeneroView';
import { ProductoraView } from './components/productoras/ProductoraView';
import { TipoView } from './components/tipos/TipoView';
import { MediaUpdate } from './components/media/MediaUpdate';

const App = () => {
    return <Router forceRefresh>
          <Header />
          <Switch>
              <Route exact path='/' component={ MediaView } />
              <Route exact path='/directores' component={ DirectorView }/>
              <Route exact path='/generos' component={ GeneroView } />
              <Route exact path='/productoras' component={ ProductoraView }/>
              <Route exact path='/tipos' component={ TipoView } />
              <Route exact path='/media/edit/:mediaId' component={ MediaUpdate } />
              <Redirect to='/' />
          </Switch>
    </Router>
    
  }

export  {
    App
}
