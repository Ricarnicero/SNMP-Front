import * as firebase from "firebase";
import * as snmp from "net-snmp";

class ServidorSNMP {
  constructor() {
    this.db = firebase.firestore();
  }

  createServer(ip, comunidad, oids) {
    return this.db
      .collection("Servidores")
      .add({
        ip: ip,
        comunidad: comunidad,
        OIDS: oids
      })
      .then(refdoc => {
        console.log(`ID del post insertado: ${refdoc.id}`);
      })
      .catch(error => {
        console.log(`Hubo error en: ${error}`);
      });
  }

  Monitorear(ip, comunidad, oids, documentid) {
    var session = snmp.createSession(ip, comunidad);

    session.get(oids, function(error, varbinds) {
      if (error) {
        console.error(error);
      } else {
        for (var i = 0; i < varbinds.length; i++)
          if (snmp.isVarbindError(varbinds[i]))
            console.error(snmp.varbindError(varbinds[i]));
          else {
            this.db
              .collection("Servidores")
              .doc(documentid)
              .collection("Registros")
              .doc(varbinds[i].oid)
              .add({
                value: varbinds[i].value,
                date: new Date().toISOString().substring(0, 10)
              })
              .catch(error => {
                console.log("gg");
              });
            console.log(varbinds[i].oid + " = " + varbinds[i].value);
          }
      }

      // If done, close the session
      session.close();
    });

    session.trap(snmp.TrapType.LinkDown, function(error) {
      if (error) console.error(error);
    });
  }
}

export default ServidorSNMP;
