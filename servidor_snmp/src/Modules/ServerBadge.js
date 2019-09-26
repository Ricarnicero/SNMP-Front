import React, { Component } from "react";
class ServerBadge extends Component {
  constructor(props) {
    super(props);
    this.state = { serverid: " ", alias: " ", ip: " " };
  }

  componentDidMount() {
    this.setState((state, props) => ({
      serverid: props.serverid,
      alias: props.alias,
      ip: props.ip
    }));
  }

  render() {
    return (
      <div className="col-12 col-md-6 border rounded-lg">
        <div className="text-center">
          <h3>{this.state.alias}</h3>
          <p>{this.state.ip}</p>
        </div>
        <div className="text-right">
          <a
            href={
              window.location.href.toString().replace("?", "") +
              `?serverid=${this.state.serverid}`
            }
          >
            Ir &#128073;
          </a>
        </div>
      </div>
    );
  }
}

export default ServerBadge;
