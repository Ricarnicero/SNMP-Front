import React, { Component } from "react";
import { firestore } from "firebase";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
class Chart extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/xqjtetw0/";
  constructor(props) {
    super(props);
    this.db = firestore();
    this.state = {
      data: [{}],
      serverid: " ",
      oid: " ",
      count: 25,
      ref: "",
      alert: ""
    };
  }

  componentDidMount() {
    this.setState(
      (state, props) => ({
        serverid: props.serverid,
        oid: props.oid
      }),
      () => {
        this.getActivity(this.state.serverid, this.state.oid, this.state.count);
      }
    );
  }

  setDataState(data, ref, alrt) {
    this.setState({ data: data, ref: ref, alert: alrt });
  }

  getActivity(serverid, oid, count) {
    var data = [];
    var ref;
    try {
      this.db
        .collection("Servidores")
        .doc(serverid)
        .collection("Registros")
        .where("oidName", "==", oid)
        .orderBy("date", "desc")
        .limit(count)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(function(doc) {
            var myDate = doc.data().date.toDate();

            data.push({
              value: doc.data().value,
              date:
                myDate.getHours() +
                ":" +
                myDate.getMinutes() +
                ":" +
                myDate.getSeconds(),
              alert: doc.data().alert
            });
            ref = doc.data().refvalue;
          });
          var alrt;
          if (data.length > 0) alrt = data[0].alert;
          else alrt = false;
          this.setDataState(data.reverse(), ref, alrt);
        });
    } catch (ex) {
      console.error(ex);
    }
  }

  onClickZoomIn = e => {
    var count = this.state.count;
    if (count > 5)
      this.setState(
        (prevState, props) => ({ count: prevState.count - 1 }),
        () => {
          this.getActivity(
            this.state.serverid,
            this.state.oid,
            this.state.count
          );
        }
      );
  };

  onClickZoomOut = e => {
    var count = this.state.count;
    if (count < 25)
      this.setState(
        (prevState, props) => ({ count: prevState.count + 1 }),
        () => {
          this.getActivity(
            this.state.serverid,
            this.state.oid,
            this.state.count
          );
        }
      );
  };

  getZoomPerc = () => {
    var num = 500 / this.state.count;
    return Math.ceil(num) + "%";
  };

  render() {
    var style;
    if (this.state.alert) {
      style = { color: "red" };
      alert(
        `Cuidado con el elemento ${this.props.name}. Ha alcanzado un estado no deseado`
      );
    }

    return (
      <div className="col-12 col-md-6 my-3" style={style}>
        <div className="card mx">
          <h3 className="text-center">{this.props.name}</h3>
          <div className="row">
            <div className="col">
              <button onClick={this.onClickZoomOut}>
                <span>&#10134;</span>
              </button>
            </div>
            <div className="col">Zoom: {this.getZoomPerc()}</div>
            <div className="col">
              <button onClick={this.onClickZoomIn}>
                <span>&#10133;</span>
              </button>
            </div>
          </div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart height={250} data={this.state.data}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis
                  type="number"
                  domain={[
                    0,
                    dataMax => (this.state.ref ? this.state.ref : dataMax * 2)
                  ]}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default Chart;
