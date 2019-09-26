import React, { Component } from "react";
import { firestore } from "firebase";
import Chart from "../Modules/Chart";

class ServerDetails extends Component {
  constructor() {
    super();
    this.db = firestore();
    this.state = { data: [], oids: [], serverid: " "};
  }

  getAllData = () =>{
    this.db
    .collection("Servidores")
    .doc(this.state.serverid)
    .get()
    .then(doc => {
      this.setState({
        data: doc.data(),
        serverid: doc.id
      });
    });
  this.db.collection("OIDS").where("once","==",false).get().then(querySnapshot => {
    var data = [];
    querySnapshot.forEach(oid => {
      data.push(oid.data().nombre);
    });
    this.setState({
      oids: data
    });});
  }
  componentDidMount() {
    this.setState(
      (state, props) => ({
        serverid: props.serverid
      }),
      () => {
        this.getAllData();
        setInterval(()  => {
        this.getAllData();
        },60000);
      }
    );
  }

  render() {
    return (
      <div className="container text-center">
        <h1>{this.state.data.alias}</h1>
        <div className="row my-1">
        <b>ubicacion:</b> {this.state.data.ubicacion}

        </div>
        <div className="row my-1">
        <b>Tiempo corriendo el sistema:</b> {this.state.data.tiempo_sistema_encendido}

        </div>
        <div className="row my-1">
        <b>Contaco:</b> {this.state.data.contacto}

        </div>
        <div className="row my-1">
        <b>Sistema Opertivo y hora:</b> {this.state.data.sistema_operativo}

        </div>

        <div className="row my-1">
          {this.state.oids.map(oid => {
            return (
              <Chart
                key={oid}
                name={oid}
                oid={oid}
                serverid={this.state.serverid}
              ></Chart>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ServerDetails;
