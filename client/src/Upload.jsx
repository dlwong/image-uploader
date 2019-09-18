import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";

class Upload extends Component {
  constructor(props){
    super(props);
    this.state = {
      file: null,
      imagePreview: '',
      error: ''
    }
    this.fileUpload = this.fileUpload.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }

  fileUpload(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    const fileTypes = ['jpg', 'jpeg', 'png'];
    
    if (fileTypes.includes(e.target.files[0].name.split('.').pop().toLowerCase())){
        //when reading is done processing then set image state
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreview: reader.result
          });
        }
      reader.readAsDataURL(file)
    }
    
  }

  uploadHandler(e) {
    e.preventDefault;
    //send image to server
    if (this.state.file){
      const data = new FormData();
      data.append('file', this.state.file)
      
      axios.post('/upload', data)
            .then (res => {
               console.log(res);
               //redirect back to homepage
               this.props.history.push("/"); 
              })
            .catch((error) => {
              this.setState({error: 'File Too Large'});
            });
    }else {
      this.setState({error: 'Not an Image'});
    }
  }

  render () {
    return ( 
      <Fragment>
        <p>{
          this.state.error 
        }</p>
        <input type='file' onChange = {e => this.fileUpload(e)}/>
        <button type="button" onClick={e => this.uploadHandler(e)}>Upload</button> 
        <div className="imgPreview">
          { this.state.file &&
            <img src={this.state.imagePreview} />
          }
        </div>
      </Fragment>
    )
  }
}

export default Upload;