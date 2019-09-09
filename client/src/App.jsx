import React, {Component} from 'react';

class App extends Component {
  constructor(props){
    super(props);

    this.fileUpload = this.fileUpload.bind(this);
  }

  fileUpload(e) {
    console.log(e.target.files[0])
  }


  render () {
    return ( 
      <div>
        <input type='file' onChange = {this.fileUpload}/>
      </div>
    )

  }
}

export default App;