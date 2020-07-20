import React from "react";
import { withRouter } from "react-router";

class PokemonId extends React.Component {
  state = {
    loading: true,
    pokemon: null
  };
  
  async componentDidMount() {    
    const id = this.props.match.params.id
    const url = "http://localhost:3000/pokemon-:id";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ pokemon: data, loading: false });    
  }  
    
//   doStuff = () => {
//     const id = this.props.match.params.id
//     let item = this.state.pokemon.find(item => item.id == id)
//     return (
//         <table>
//         <tr><td>{item.id}</td><td>{item.name.english}</td>
//         <td>{item.type.map(type => ` ${type}`)}</td>
//         <td>{`Attack: ${item.base.Attack}`}</td>
//         <td>{`Defense: ${item.base.Defense}`}</td>
//         <td>{`HP: ${item.base.HP}`}</td>
//         <td>{`Sp. Attack: ${item.base["Sp. Attack"]}`}</td>
//         <td>{`Sp. Defense: ${item.base["Sp. Defense"]}`}</td>
//         <td>{`Speed: ${item.base.Speed}`}</td></tr>)</table> 
//         )
//   }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.pokemon) {
      return <div>didn't get a pokemon</div>;
    }

    return (
      <div>
         {/* {this.doStuff} */}
      </div>
    );
  }
}

export default withRouter(PokemonId);