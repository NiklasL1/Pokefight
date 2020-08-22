import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import "../Table.css";

function PokemonInfo() {
  let {id, info} = useParams();  

        const [data, setData] = useState();
        const [loading, setLoading] = useState(true);   

            const getPokemonList = async () => {
                const url = `https://sheltered-mountain-61518.herokuapp.com/pokemon/${id}/${info}`;
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
                setLoading(false);                    
            }                

        useEffect(() => {        
            getPokemonList();            
        },[]);      
                 
        const renderData = (item) => {

          if (info === "name"){
            return (
                <div>
                <table id="table">
                <td>English: {item.english}</td>
                <td>French: {item.french}</td>
                <td>Japanese: {item.japanese}</td>
                <td>Chinese: {item.chinese}</td>
                </table>        
              </div> 
              ) 

          }  else if (info === "type") {
            return (
                <div>
                <table>                
                <td>{item.map(type => ` ${type}`)}</td>
                </table>        
              </div> 
              ) 

          } else if (info === "base") {
            return (
                <div>
                  <table>
                    <tbody> 
                        <tr>           
                            <td>{`Attack: ${item.Attack}`}</td>
                            <td>{`Defense: ${item.Defense}`}</td>
                            <td>{`HP: ${item.HP}`}</td>
                            <td>{`Sp. Attack: ${item["Sp. Attack"]}`}</td>
                            <td>{`Sp. Defense: ${item["Sp. Defense"]}`}</td>
                            <td>{`Speed: ${item.Speed}`}</td>
                        </tr>   
                    </tbody> 
                </table>        
              </div> 
              ) 
          } else {
              return (
                  <h1>Please select name, type or base!</h1>
              )
          }              
        }     
        
    return (
        <div>            
            {loading ? "loading..." : data ? renderData(data) : "Something went wrong"}
        </div>
    )
}

export default PokemonInfo
