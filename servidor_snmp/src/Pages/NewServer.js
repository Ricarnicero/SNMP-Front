import React, { Component } from "react";
import { firestore } from "firebase";
class NewServer extends Component {
  constructor(props) {
    super(props);
    this.db = firestore();
    this.state = { error: " ", alias: " ", ip: " ", comunidad: " " };
  }

  createServer(ip, comunidad, alias) {
    this.db
      .collection("Servidores")
      .add({
        ip: ip,
        comunidad: comunidad,
        alias: alias
      })
      .catch(error => {
        alert(`Hubo error en: ${error}`);
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.createServer(this.state.ip, this.state.comunidad, this.state.alias);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="my-3 mx-auto text-center">
          <h2>Monitorear nuevo servidor</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Servidor</span>
            </div>

            <input
              type="text"
              name="alias"
              className="form-control"
              placeholder="Alias"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="ip"
              className="form-control"
              placeholder="IP"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="comunidad"
              className="form-control"
              placeholder="Comunidad"
              onChange={this.handleChange}
            />
            <div className="input-group-append">
              <button className="btn btn-success" type="submit">
                Registrar
              </button>
            </div>
          </div>
        </form>
        <div className="text-center">{this.state.error}</div>
      </div>
    );
  }
}

export default NewServer;
