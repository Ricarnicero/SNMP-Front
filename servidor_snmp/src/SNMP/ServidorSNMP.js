import * as firebase from "firebase";

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
}

export default ServidorSNMP;
