import React, { Component } from 'react';
import api from '../../services/api';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

import "./styles.css";
import logo from '../../assets/logo.svg';
import { MdInsertDriveFile } from 'react-icons/md';


export default class Box extends Component {

    state = { box: { } }

    async componentDidMount() {
    this.subscribeToNewFiles();

      //match params = pega o parametro que define na url da rota
      const box = this.props.match.params.id;
      const response = await api.get(`boxes/${box}`);

      this.setState({box: response.data});
    }

    subscribeToNewFiles = () => {
        const box = this.props.match.params.id;
        const io = socket('https://dropboxclone-backend.herokuapp.com/');
        //joga o usuario dentro de uma sala com o id do box
        io.emit('connectRoom', box);
        
        io.on('file', data=> {
            this.setState({ box: {...this.state.box,files: [data, ...this.state.box.files, ]}})
            console.log(data)
        })
    }

    handleUpload = (files) => {
        files.forEach(file=>{
            const data = new FormData();
            const box = this.props.match.params.id;
            data.append('file', file);

            api.post(`boxes/${box}/files`, data);
        })
    }
    render() {
        return (
        <div id="box-container">
            <header>
            <img src={logo} alt=""/>
            <h1>{this.state.box.title}</h1>
            </header>

            <Dropzone onDropAccepted={this.handleUpload}>
                {({getRootProps, getInputProps}) => (
                    <div className="upload" {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <p>Arraste arquivos ou clique aqui </p>
                    </div>
                )}
            </Dropzone>

            <ul>
                {this.state.box.files && this.state.box.files.map(file => (
                    //key = obrigatorio no map
                <li key={file._id}>
                    <a href={file.url} className="fileInfo" target="blank">
                        <MdInsertDriveFile size={24} color="#A5Cfff"></MdInsertDriveFile>
                        <strong>{file.title}</strong>

                    </a>

                    <span>Há {distanceInWords(file.createdAt, new Date(),{
                        locale: pt
                    })}</span>
                </li>
                ))}
            </ul>
        </div> 
        );
    }
    }
