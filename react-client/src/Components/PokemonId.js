import React, {useState, useEffect, useRef} from 'react';
import {useParams, Link} from "react-router-dom";
import "../Table.css";

function PokemonId() {
  let {id} = useParams();
  const empty = [];   
  const [party, setParty] = useState(localStorage.getItem('party') ? JSON.parse(localStorage.getItem('party')) : []);  

  const [data, setData] = useState();
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(true);    

      const getPokemonList = async () => {
          const url = `https://sheltered-mountain-61518.herokuapp.com/pokemon/${id}`;
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
          if(getPokemonPicture) {setLoading(false)};                    
      }            
  
      const getPokemonPicture = async () => {
          const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
          const response = await fetch(url);
          const picture = await response.json();
          setPicture(picture);
          if(getPokemonList) {setLoading(false)};                                    
      }    

  useEffect(() => {        
      getPokemonList();
      getPokemonPicture();
      addToParty();                                                    
  },[]);        
  
  const addToParty = () => {
    // if(party.length < 7 && !picture){
    //   let current = [...party];
    //   // current.push({data, pic: picture.sprites.front_default});
    //   setParty(current);
    //   const json = JSON.stringify(party);
    //   localStorage.setItem('party', json)            
    // } else {
    if (picture){
      if(party.length < 7){
        let current = [...party];
        current.push({data, pic: picture.sprites.front_default});
        setParty(current);
        const json = JSON.stringify(party);
        localStorage.setItem('party', json)              
      }  
      else {
        alert("You can only have up to six Pokemon in your party!")
      } 
    }                 
  }

  const logIt = () => {
    console.log(party);
    console.log(party.length);
    console.log(localStorage.getItem('party'))
  }

  const clearParty = () => {
      localStorage.setItem('party', empty);
  }

  // const removeFromParty = () => {
  //   let current = setParty([...party]).filter(
  //     (note, index) => index !== indexToDelete
  //   );

  // }
  
            
  const renderData = (item, picture) => {       
    return (
      <div>
      <table id="table">
      <tbody>
      <tr>
      <td>{item.id}</td>
      <td>{item.name.english}</td>
      <td><img src={picture.sprites.front_default} alt={item.name.english} /></td>
      <td>{`Type(s): ${item.type.map(type => ` ${type}`)}`}</td>
      <td>{`Attack: ${item.base.Attack}`}</td>
      <td>{`Defense: ${item.base.Defense}`}</td>
      <td>{`HP: ${item.base.HP}`}</td>
      <td>{`Sp. Attack: ${item.base["Sp. Attack"]}`}</td>
      <td>{`Sp. Defense: ${item.base["Sp. Defense"]}`}</td>
      <td>{`Speed: ${item.base.Speed}`}</td>            
      </tr>
      </tbody>
      </table>            
    </div> 
    )      
  }     
  
return (
  <div>            
      {loading ? "loading..." : data && picture ? renderData(data, picture) : "loading..."}
      <button onClick={addToParty}>Add to party!</button>
      <button onClick={logIt}>Log</button>  
      <button onClick={clearParty}>Clear party</button>  
      {/* <button onClick={removeFromParty}>Remove from party!</button> */}
      <br />            
      <h2><Link to="/party">Party</Link></h2>             
  </div>
)
}

export default PokemonId