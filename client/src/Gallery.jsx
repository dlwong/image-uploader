import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imageLoader from './images.jsx';

class Gallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: []
    }
  }

  componentDidUpdate() {
    if (nextProps.location.pathname !== this.props.location.pathname){
      const images = imageLoader(require.context('../../uploads', false, /\.(png|jpe?g)$/));
      this.setState({images})
    }
  }
  
  render () {
    let imgNodes = this.state.images.map( image => {
      return <img src = {image} />
    })
    return ( 
      <div>
        <Link to="/upload">Upload</Link>
        <ul>{imgNodes}</ul>
      </div>
    )

  }
}

export default Gallery;