import React from 'react';
import CampaignForm from './components/CampaignForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CollapsibleNavbar from "./components/CollapsibleNavbar";
import AdSetForm from "./components/AdSetForm";
import AdCreativeForm from "./components/AdCreativeForm";
import HomePage from "./components/pages/HomePage";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  render() {
    return (
        <Router>
          <CollapsibleNavbar />
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route exact path="/campaigns" element={<CampaignForm/>}/>
                <Route exact path="/adsets" element={<AdSetForm/>}/>
                <Route exact path="/adcreatives" element={<AdCreativeForm/>}/>
                {/*<Route exact path="/recovery-password" element={<RecoveryPassword/>}/>*/}
                {/*<Route path="*" element={<NotFound/>}/>*/}
            </Routes>
        </Router>
    )
  }

}

export default App;