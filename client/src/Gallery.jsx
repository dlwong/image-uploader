import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imageLoader from './images.jsx';

class Gallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: [],
      interval: null,
      number: 0,
      image: null
    }
    this.handleImages = this.handleImages.bind(this);
  }

  componentDidMount() {
    const interval = setInterval(this.handleImages, 3000);
    this.setState({interval});
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  handleImages() {
    let images = imageLoader(require.context('../../uploads', false, /\.(png|jpe?g|PNG|JPG)$/));
    this.setState({images})
    console.log(this.state.images.length)
    if (this.state.number === this.state.images.length-1){
      this.setState({number:0})
    }else {
      this.setState({number:this.state.number+1})
    }

  }
  
  render () {
    let imgNodes = this.state.images.map( image => {
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