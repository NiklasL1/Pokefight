import React from "react";

export default class PokemonList extends React.Component {
  state = {
    loading: true,
    pokemon: null
  };

  async componentDidMount() {
    const url = "http://localhost:3000/pokemon";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ pokemon: data, loading: false });    
  }  
  

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.pokemon) {
      return <div>didn't get a pokemon</div>;
    }

    return (
      <div>
        <table>{this.state.pokemon.map(item => 
        <tr><td>{item.id}</td><td>{item.name.english}</td>
        <td>{item.type.map(type => ` ${type}`)}</td>
        <td>{`Attack: ${item.base.Attack}`}</td>
        <td>{`Defense: ${item.base.Defense}`}</td>
        <td>{`HP: ${item.base.HP}`}</td>
        <td>{`Sp. Attack: ${item.base["Sp. Attack"]}`}</td>
        <td>{`Sp. Defense: ${item.base["Sp. Defense"]}`}</td>
        <td>{`Speed: ${item.base.Speed}`}</td></tr>)}</table>        
      </div>
    );
  }
}