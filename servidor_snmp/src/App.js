import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import Chart from "./Modules/Chart";
import "bootstrap/dist/css/bootstrap.min.css";
import ServidorSNMP from "./SNMP/ServidorSNMP";

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

const data = [
  {
    hora: "11:15",
    valor: 4000
  },
  {
    hora: "11:16",
    valor: 2516
  },
  {
    hora: "11:17",
    valor: 3545
  },
  {
    hora: "11:18",
    valor: 1555
  }
];

class App extends Component {
  constructor() {
    super();
    this.state = { name: "Pepe", dataOIDS: [] };
    this.db = firebase.firestore();
  }

  componentDidMount() {
    const server = new ServidorSNMP();
    server.Monitorear(
      "192.168.0.29",
      "public",
      ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.6.0"],
      "29RPTqKDQoAfo4j3beCf"
    );
    /*this.db.collection("Servidores").onSnapshot(querySnapshot => {
      querySnapshot.forEach(servidor => {
        server.Monitorear(
          servidor.data().ip,
          servidor.data().comunidad,
          servidor.data().OIDS,
          servidor.id
        );
      });
    });*/
  }

  render() {
    return (
      <div className="row">
        <Chart name="Chart1" data={data} />
        <Chart name="Chart2" data={data} />
        <Chart name="Chart3" data={data} />
      </div>
    );
  }
}

export default App;
