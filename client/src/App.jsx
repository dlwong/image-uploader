import React, {Component} from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      file: '',
      imagePreview:''
    }
    this.fileUpload = this.fileUpload.bind(this);
  }

  fileUpload(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreview: reader.result
      });
    }

    reader.readAsDataURL(file)
  }


  render () {
    return ( 
      <div>
        <input type='file' onChange = {(e) => this.fileUpload(e)}/>
        <img src={this.state.imagePreview} />
      </div>
    )

  }
}

export default App;