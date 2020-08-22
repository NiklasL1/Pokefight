import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import PokemonImage from './PokemonImage';

export default function PokemonFight() {

const [data, setData] = useState();
const [loading, setLoading] = useState(true);
const [opponent, setOpponent] = useState();
const [showVersus, setShowVersus] = useState(true);
const [combatant, setCombatant] = useState(0);
const [enemyCombatant, setEnemyCombatant] = useState(0);
const [combatantHP, setCombatantHP] = useState();
const [enemyCombatantHP, setEnemyCombatantHP] = useState();
const [playerTurn, setPlayerTurn] = useState (true);           

const getPokemonList = async () => {
  const url = "https://sheltered-mountain-61518.herokuapp.com/pokemon";
  const response = await fetch(url);
  const data = await response.json();
  setData(data);
  setLoading(false);
  const enemyParty = []
  for(let i=0; i < 6; i++) {
  const randomChoice = await data[~~(Math.random() * data.length)]
  enemyParty.push(randomChoice);            
  }
  setOpponent(enemyParty);                    
}

useEffect(() => {        
    getPokemonList();                                
},[]);   

let current = localStorage.getItem('party');  
let party = current ? JSON.parse(current): null;           
        
  
const renderParty = (party) => {   
    
  return (
    <span>
      <table id="table">
        <thead>
          <tr>
            <th id="number">Number</th>
            <th id="name">Name</th>
            <th id="stat">Picture</th>                                 
          </tr>                  
        </thead>
        <tbody>
          {party.map(item =>                        
            <tr id="row">                        
              <td id="number"><Link to={`/pokemon-${item.data.id}`}>{item.data.id}</Link></td>                        
              <td id="name">{item.data.name.english}</td>
              <td><img src={item.pic} /></td>
            </tr>                      
          )}
        </tbody>
      </table>        
    </span>    
  )
}

const renderData = (data) => {   

  return (
    <span>
      <table id="table">
        <thead>
          <tr>
            <th id="number">Number</th>
            <th id="name">Name</th>
            <th id="stat">Picture</th>
          </tr>                  
        </thead>
        <tbody>
        {data.map(item =>                        
          <tr id="row">                        
            <td id="number"><Link to={`/pokemon-${item.id}`}>{item.id}</Link></td>                        
            <td id="name">{item.name.english}</td>
            <td id="stat"><PokemonImage picID={item.id}/></td>   
          </tr>                      
        )}
        </tbody>
      </table>        
    </span>    
  )
}

const renderCombatant = (item) => {
  return (
    <span>
      <table id="table">
        <thead>
          <tr>
            <th id="number">HP</th>
            <th id="name">Name</th>
            <th id="stat">Picture</th>                
          </tr>                  
        </thead>
        <tbody>                                        
          <tr id="row">                        
            <td id="number">{Math.round(combatantHP)}/{party[item].data.base.HP}</td>                      
            <td id="name">{party[item].data.name.english}</td>
            <td><img src={party[item].pic} /></td>                              
          </tr>                    
        </tbody>
      </table>        
    </span>    
)
}        

const renderEnemyCombatant = (item) => {
  return (
    <span>
      <table id="table">
        <thead>
          <tr>
            <th id="number">HP</th>
            <th id="name">Name</th>
            <th id="stat">Picture</th>
          </tr>                  
        </thead>
        <tbody>                                        
          <tr id="row">                        
            <td id="number">{Math.round(enemyCombatantHP)}/{opponent[item].base.HP}</td>                        
            <td id="name">{opponent[item].name.english}</td>
            <td id="stat"><PokemonImage picID={opponent[item].id}/></td>                
          </tr>                    
        </tbody>
      </table>        
    </span>    
)
}       

const speedCheck = () => {                 
  if(party[combatant].data.base.Speed <= opponent[enemyCombatant].base.Speed){
    setPlayerTurn(false);             
  } else {
    setPlayerTurn(true);
  }                   
}

const showCombatants = () => {
  setShowVersus(!showVersus)
  speedCheck();
  setCombatantHP(party[combatant].data.base.HP);
  setEnemyCombatantHP(opponent[enemyCombatant].base.HP);          
}  

const checkCombatantFainted = () => {
  if (combatantHP <= 0){
    alert(party[combatant].data.name.english + " fainted!");
    setCombatant(prevState => prevState +1);
    speedCheck();
  }
}

const checkEnemyCombatantFainted = () => {
  if (enemyCombatantHP <= 0){
    alert(opponent[enemyCombatant].name.english + " fainted!");
    setEnemyCombatant(prevState => prevState +1);    
    speedCheck();
  }
}

useEffect(() => {        
  checkEnemyCombatantFainted()
},[enemyCombatantHP]);

useEffect(() => {        
  checkCombatantFainted()
},[combatantHP]);

useEffect(() => {        
  if(party) setCombatantHP(party[combatant].data.base.HP);
  if(combatant > 5) alert('All of your Pokemon fainted, you lose!')
},[combatant]);

useEffect(() => {
  if(enemyCombatant > 5) alert('The opponent has no more Pokemon to fight with, you win!')        
  if(opponent && enemyCombatant <= 5) setEnemyCombatantHP(opponent[enemyCombatant].base.HP)  
},[enemyCombatant]);

const checkTypes = () => {

}

const takeTurn = () => {
  if((party[combatant].data.base.Attack - opponent[enemyCombatant].base.Defense) >= (party[combatant].data.base["Sp. Attack"] - opponent[enemyCombatant].base["Sp. Defense"])) {
    setEnemyCombatantHP(prevState => prevState - (1+((party[combatant].data.base.Attack - opponent[enemyCombatant].base.Defense)/100))*10);      
    setPlayerTurn(!playerTurn);            
  } else if ((party[combatant].data.base.Attack - opponent[enemyCombatant].base.Defense) < (party[combatant].data.base["Sp. Attack"] - opponent[enemyCombatant].base["Sp. Defense"])) {
    setEnemyCombatantHP(prevState => prevState -(1+((party[combatant].data.base["Sp. Attack"] - opponent[enemyCombatant].base["Sp. Defense"])/100))*10);        
    setPlayerTurn(!playerTurn);            
  }
}

const enemyTurn = () => {
  if((opponent[enemyCombatant].base.Attack - party[combatant].data.base.Defense) >= (opponent[enemyCombatant].base["Sp. Attack"] - party[combatant].data.base["Sp. Defense"])) {
    setCombatantHP(prevState => prevState - (1+((opponent[enemyCombatant].base.Attack - party[combatant].data.base.Defense)/100))*10)
    setPlayerTurn(!playerTurn);              
  } else if ((opponent[enemyCombatant].base.Attack - party[combatant].data.base.Defense) < (opponent[enemyCombatant].base["Sp. Attack"] - party[combatant].data.base["Sp. Defense"])) {
    setCombatantHP(prevState => prevState -(1+((opponent[enemyCombatant].base["Sp. Attack"] - party[combatant].data.base["Sp. Defense"])/100))*10)  
    setPlayerTurn(!playerTurn);              
  }
}

return (
  <div>
    {showVersus ? party ? combatant < 6 ? renderParty(party) : "Party is empty" : null : null}
    {!showVersus ? combatant < 6 ? renderCombatant(combatant): null : null}
    {showVersus ? <h2 onClick={showCombatants}>Versus</h2> : null}
    {!showVersus ? <h2>Fight</h2> : null}
    {!showVersus ? speedCheck : null}
    {!showVersus ? playerTurn ? <button onClick={takeTurn}>Attack!</button> : <button onClick={enemyTurn}>Enemy turn!</button> : null}              
    {showVersus ? loading ? "loading..." : opponent ? enemyCombatant < 6 ? renderData(opponent) : "Could not load opponent's party" : null : null}
    {!showVersus ? enemyCombatant < 6 ? renderEnemyCombatant(enemyCombatant): null : null}            
  </div>
)      
}