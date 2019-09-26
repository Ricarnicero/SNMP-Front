import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
//import Chart from "./Modules/Chart";
import "bootstrap/dist/css/bootstrap.min.css";
//import ServidorSNMP from "./SNMP/ServidorSNMP";
import ServerDetails from "./Pages/serverDetails";
import Servers from "./Pages/Servers";
import NewServer from "./Pages/NewServer";

const firebaseConfig = {
  apiKey: "AIzaSyApzaUbCad-8VciNeuH1UTSkCrAct8Tn2o",
  authDomain: "redes3snmp.firebaseapp.com",
  databaseURL: "https://redes3snmp.firebaseio.com",
  projectId: "redes3snmp",
  storageBucket: "",
  messagingSenderId: "155892603157",
  appId: "1:155892603157:web:eafc893180ac8936b9711c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor() {
    super();
    const urlParams = new window.URLSearchParams(window.location.search);
    this.serverid = urlParams.get("serverid");
  }

  render() {
    return this.serverid ? (
      <ServerDetails serverid={this.serverid} />
    ) : (
      <div>
        <NewServer />
        <Servers />
      </div>
    );
  }
}

export default App;
