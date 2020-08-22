import React, {useState} from 'react';

function PokemonImage({picID}) {

    const [picState, setPicState] = useState(1)
    
    // const mouseover = (e) =>
    // {
    //     if(e.target.src === `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picID}.png`){
    //         e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${picID}.png`
    //     } 
        
    //     else if (e.target.src === `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${picID}.png`) {
    //         e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${picID}.png`
    //     }

    //     else if (e.target.src === `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${picID}.png`) {
    //         e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${picID}.png`
    //     }

    //     else if (e.target.src === `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${picID}.png`) {
    //         e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picID}.png`
    //     }
    // }

    const mouseover = (event) =>
    {
        if(picState == 1){
            event.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${picID}.png`
            setPicState(2)
            // setTimeout(mouseover(event), 2000)
        } 
        
        else if (picState == 2) {
            event.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${picID}.png`
            setPicState(3)
            // setTimeout(mouseover(event), 2000)
        }

        else if (picState == 3) {
            event.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${picID}.png`
            setPicState(4)
            // setTimeout(mouseover(event), 2000)
        }

        else if (picState == 4) {
            event.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picID}.png`
            setPicState(1)
            // setTimeout(mouseover(event), 2000)
        }
    }

    const interval = (e) => {
        setInterval(mouseover(e), 2000)
    }

    const mouseaway = (event) =>
    {
        event.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picID}.png`;
        setPicState(1)
    }

    return (
        <div>            
            <img onMouseOver={interval} onMouseOut={mouseaway} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picID}.png`} />
        </div>
    )
}

export default PokemonImage
