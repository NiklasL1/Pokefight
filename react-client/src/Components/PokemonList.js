import React, {useState, useEffect} from 'react'

function PokemonList() {
    
        const [data, setData] = useState();      

        
            fetch('http://localhost:3000/pokemon')
                .then(response => response.json())
                .then(response => {
                    console.log(response)                   
            })
            .catch(err => console.error(err));       

        useEffect(() => {        
        console.log(data);
        },[]);
         
        const renderData = (data) => {
            return (
                <table>
                    {data.map(item => item)}                    
                </table>
            )
        }     

    return (
        <div>
            list here
            {/* {useEffect(() => { renderData(data)},[data])} */}
        </div>
    )
}

export default PokemonList
