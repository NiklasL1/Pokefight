import React from 'react';
import {Link} from "react-router-dom";
import "../Table.css";

function PokemonParty() {

const empty = [];

let current = localStorage.getItem('party');  
let party = current ? JSON.parse(current): null;           
           
const renderData = (party) => {   
    
  return (
    <div>
      <table id="table">
        <thead>
          <tr>
            <th id="number">Number</th>
            <th id="name">Name</th>
            <th id="stat">Picture</th>                         
            <th id="type">Type(s)</th>
            <th id="stat">Attack</th>
            <th id="stat">Defense</th>
            <th id="stat">HP</th>
            <th id="stat">Sp. Attack</th>
            <th id="stat">Sp. Defense</th>
            <th id="stat">Speed</th>
          </tr>                  
        </thead>
        <tbody>
        {party.map(item =>                        
          <tr id="row">                        
            <td id="number"><Link to={`/pokemon-${item.data.id}`}>{item.data.id}</Link></td>                        
            <td id="name">{item.data.name.english}</td>
            <td><img src={item.pic} /></td>
            <td id="type">{item.data.type.map(type => ` ${type}`)}</td>
            <td id="stat">{item.data.base.Attack}</td>
            <td id="stat">{item.data.base.Defense}</td>
            <td id="stat">{item.data.base.HP}</td>
            <td id="stat">{item.data.base["Sp. Attack"]}</td>
            <td id="stat">{item.data.base["Sp. Defense"]}</td>
            <td id="stat">{item.data.base.Speed}</td>
          </tr>                      
        )}
        </tbody>
      </table>        
    </div>    
  )
}

const randomPokemon = () => {
  return `/pokemon-${Math.floor(Math.random() * 809) + 1}`
}
    
// const consolet = () => {
//   console.log(party)
// }
// consolet();

const clearParty = () => {
  localStorage.setItem('party', empty);
  window.location.reload();
}

return (
<div>            
  {party ? renderData(party) : "Party is empty, add Pokemon to fight!"}  
  {party.length < 6 ? <Link to={randomPokemon}><button>Find random Pokemon!</button></Link> : null}
  {party ? <Link to="/fight"><button>Fight!</button></Link> : null}
  {party ? <button onClick={clearParty}>Clear party</button> : null}
</div>
)
}

export default PokemonParty
