import React, { Component } from "react";
import { firestore } from "firebase";
import Chart from "../Modules/Chart";

class ServerDetails extends Component {
  constructor() {
    super();
    this.db = firestore();
    this.state = { data: [], oids: [], serverid: " " };
  }

  componentDidMount() {
    this.setState(
      (state, props) => ({
        serverid: props.serverid
      }),
      () => {
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
        this.db.collection("OIDS").onSnapshot(querySnapshot => {
          var data = [];
          querySnapshot.forEach(oid => {
            data.push(oid.data().nombre);
          });
          this.setState({
            oids: data
          });
        });
      }
    );
  }

  render() {
    return (
      <div className="container text-center">
        <h1>{this.state.data.alias}</h1>
        <div className="row">
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
