import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import "../Table.css";
import PokemonImage from './PokemonImage';

function PokemonList() {  
    
const [data, setData] = useState();        
const [loading, setLoading] = useState(true); 
// const [isHovered, setIsHovered] = useState(false);
// const [imageSource, setImageSource] =useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon")

let current = localStorage.getItem('party');
let party = current ? JSON.parse(current): null;             

const getPokemonList = async () => {
    const url = "https://sheltered-mountain-61518.herokuapp.com/pokemon";
    const response = await fetch(url);
    const data = await response.json();
    setData(data);                
    setLoading(false);                   
}          

useEffect(() => {        
    getPokemonList();                                 
},[]);  

const randomPokemon = () => {
  return `/pokemon-${Math.floor(Math.random() * 809) + 1}`
}  

// const rowHovered = () => {
//   setIsHovered(true);          
// }

// const rowUnhovered = () => {
//   setIsHovered(false);
// }

// const picSource = (e) =>
// {         
//   if (isHovered) {                  
//     if(e.target.picSRC === "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"){
//       return ("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back") 
//     }             
    // else if (e.target.picSRC === "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back") {
    //   return e.target.picSRC = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny"
    // }
    // else if (e.target.picSRC === "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny") {
    //   return e.target.picSRC = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny"
    // }
    // else if (e.target.picSRC === "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny") {
    //   return e.target.picSRC = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
    // }          
//   }            
// }

// const interval = (e) => {
//     setInterval(mouseover(e), 1000)
// }

const renderData = (data) => {        
  
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
      {data.map(item =>                    
        <tr id="row">
          <Link to={`/pokemon-${item.id}`}>
          <td id="number">{item.id}</td>
          </Link>                  
          <td id="name">{item.name.english}</td>
          <td id="stat"><PokemonImage picID={item.id} /></td>
          <td id="type">{item.type.map(type => ` ${type}`)}</td>
          <td id="stat">{item.base.Attack}</td>
          <td id="stat">{item.base.Defense}</td>
          <td id="stat">{item.base.HP}</td>
          <td id="stat">{item.base["Sp. Attack"]}</td>
          <td id="stat">{item.base["Sp. Defense"]}</td>
          <td id="stat">{item.base.Speed}</td>
        </tr>      
      )}
      </tbody>
    </table>        
    </div>    
  )
}     

return (
  <div>
    <span class="topButton"><Link to={randomPokemon}><button>Random Pokemon!</button></Link></span>
    <span class="topButton"><Link to={`/party`}><button>My Party</button></Link></span>
    <span class="topButton">{party.length}/6</span>               
    {loading ? "loading..." : data ? renderData(data) : "Something went wrong"}            
  </div>
)
}

export default PokemonList
