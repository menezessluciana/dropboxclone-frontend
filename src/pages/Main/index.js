import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';

export default class Main extends Component {
  state = {
    newBox: ''
  }

handleSubmit = async e => {
    //com preventDefault ele nao direciona para outra pagina
    e.preventDefault();
    
    const response = await api.post('boxes', {
      title: this.state.newBox,
    });

    //navega o usuario para outra tela
    this.props.history.push(`/box/${response.data._id}`);

  }

  //e = evento de troca de valor, target.value
  handleInputChange = (e) => {
    this.setState({newBox: e.target.value})
  }

  render() {
    return (
        <div id="main-container">
            <form onSubmit={this.handleSubmit}>
                <img src={logo} alt=""></img>
                <input
                    placeholder="Criar um box"
                    value={this.state.newBox}
                    onChange={this.handleInputChange}
                />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
  }
}
