import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import PokemonList from './Components/PokemonList';
import PokemonList2 from './Components/PokemonList2';
import PokemonId from './Components/PokemonId';
import PokemonInfo from './Components/PokemonInfo';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" children={<PokemonList2 />}></Route>
        <Route path="/pokemon-:id" children={<PokemonId />}></Route>
        <Route path="/pokemon-:id/:info" children={<PokemonInfo />}></Route>
      </Switch>
    </div>
  );
}

export default App;
