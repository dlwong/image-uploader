import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Upload from './Upload.jsx';
import Gallery from './Gallery.jsx';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Gallery} />
      <Route path="/upload" component={Upload} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))