import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import PokemonList from './Components/PokemonList';
import OtherList from './Components/OtherList';
import PokemonId from './Components/PokemonId';
import PokemonInfo from './Components/PokemonInfo';
import PokemonParty from './Components/PokemonParty';
import PokemonFight from './Components/PokemonFight';

function App() { 
  
  return (    
    <div className="App">
      <Switch>
        <Route path="/pokemon-:id/:info" children={<PokemonInfo />}></Route>
        <Route path="/pokemon-:id" children={<PokemonId />}></Route>
        <Route path="/party" children={<PokemonParty />}></Route>
        <Route path="/fight" children={<PokemonFight />}></Route>  
        <Route exact path="/" children={<PokemonList />}></Route>             
      </Switch>
    </div>    
  );
}

export default App;
