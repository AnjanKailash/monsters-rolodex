import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { runInThisContext } from 'vm';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component.jsx';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    }

  }

  handleChange = (e) => {
    this.setState({searchField: e.target.value});
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>response.json())
    .then(users=>this.setState({monsters: users}));
  }

  render() {

    const { monsters, searchField } = this.state;
    // console.log(`monsters: ${monsters}`);

    const filteredMonsters = monsters.filter(monster=> 
      monster.username.toLowerCase().includes(searchField.toLowerCase())
    );

    // console.log(`filtered monsters: ${filteredMonsters}`);

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder='search monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App;
