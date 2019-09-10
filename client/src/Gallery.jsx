import React, { Component } from 'react';
import imageLoader from './images.jsx';

class Gallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    const images = imageLoader(require.context('../../uploads', false, /\.(png|jpe?g)$/));
    this.setState({images})
  }
  
  render () {
    let imgNodes = this.state.images.map( image => {
      return <img src = {image} />
    })
    return ( 
      <div>
        <ul>{imgNodes}</ul>
      </div>
    )

  }
}

export default Gallery;