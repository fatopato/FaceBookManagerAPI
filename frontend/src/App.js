import React from 'react';
import CampaignForm from './components/CampaignForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CollapsibleNavbar from "./components/CollapsibleNavbar";
import AdSetForm from "./components/AdSetForm";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/home')
        .then(response => response.json())
        .then(response => this.setState({'message': response.message}))
  }

  render() {
    return (
        <Router>
          <CollapsibleNavbar />
            <Routes>
                {/*<Route exact path="/" element={<Home/>}/>*/}
                <Route exact path="/campaigns" element={<CampaignForm/>}/>
                <Route exact path="/adsets" element={<AdSetForm/>}/>
                {/*<Route exact path="/recovery-password" element={<RecoveryPassword/>}/>*/}
                {/*<Route path="*" element={<NotFound/>}/>*/}
            </Routes>
        </Router>
    )
  }

}

export default App;