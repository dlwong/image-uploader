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
      number: 0
    }
    this.handleImages = this.handleImages.bind(this);
    this.importAll = this.importAll.bind(this);
  }

  //setting the 5 second interval to run
  componentDidMount() {
    const interval = setInterval(this.handleImages, 5000);
    this.setState({interval});
  }
  //clear time interval to prevent memory leakage
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  //grab all images from server
  importAll() {
    const images = [];

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
    //cycle through images counter
    if (this.state.number < this.state.images.length-1){
      this.setState({number:this.state.number+1})
    }else {
      this.setState({number:0})
    }

  }
  
  render () {
    //create image tag
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