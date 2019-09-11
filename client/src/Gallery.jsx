import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Upload from './Upload.jsx';
import axios from 'axios';

class Gallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: [],
      interval: null,
      number: 0,
      image: null, 
      bool: false
    }
    this.handleImages = this.handleImages.bind(this);
    this.importAll = this.importAll.bind(this);
  }

  componentDidMount() {
    const interval = setInterval(this.handleImages, 5000);
    this.setState({interval});
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  importAll() {
    const images = [];

    //requires all the images from the uploads directory
    // let context = require.context('../../uploads', false, /\.(png|jpe?g|PNG|JPE?G)$/);

    // context.keys().forEach(item => { 
    //                     images.push(context(item)); 
    //                 });

    axios.get('/update')
    .then (res => {
      this.setState({images:res.data});
      })
    .catch((error) => {
      console.log(error);
    });
                    

  }

  handleImages() {
    this.importAll();

    if (this.state.number < this.state.images.length-1){
      this.setState({number:this.state.number+1})
    }else {
      this.setState({number:0})
    }

  }
  
  render () {
    let imgNodes = this.state.images.map(image => {
      return <img src = {image} />
    })
    return ( 
      <div>
        <Link to="/upload">Upload</Link>
        <ul>{imgNodes[this.state.number]}</ul>
      </div>
    )

  }
}

export default Gallery;