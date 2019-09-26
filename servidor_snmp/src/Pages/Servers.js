import React, { Component } from "react";
import { firestore } from "firebase";
import ServerBadge from "../Modules/ServerBadge";
class Servers extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.db = firestore();
  }

  componentDidMount() {
    this.db.collection("Servidores").onSnapshot(querySnapshot => {
      var data = [];
      querySnapshot.forEach(server => {
        data.push({
          alias: server.data().alias,
          serverid: server.id,
          ip: server.data().ip
        });
      });
      this.setState({
        data: data
      });
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="my-3 mx-auto text-center">
          <h2>Servidores monitoreados</h2>
        </div>
        <div className="row">
          {this.state.data.map(server => {
            return (
              <ServerBadge
                key={server.serverid}
                serverid={server.serverid}
                alias={server.alias}
                ip={server.ip}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Servers;
