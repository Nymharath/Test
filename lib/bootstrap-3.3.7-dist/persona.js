    function persona(nome, cognome, dataNasc, luogoNasc, sesso) {
      this.nome = nome || "";
      this.cognome = cognome || "";
      this.dataNasc = dataNasc || "1900-01-01";
      this.dataNascIta = dataNasc.split("-").reverse().join("/");
      this.luogoNasc = luogoNasc || "";
      this.sesso = sesso || "";

      this.nomeCognome = function() {
        return this.nome + " " + this.cognome;
      }

      this.calcolaEta = function() {
         /*return new Date().getFullYear() - this.dataNasc.split("-")[0];*/        /*CONTRATTA*/     /*vedi sotto per forma estesa*/
        var oggi = new Date();
        var dd = this.dataNasc.split("-");
        
        var compleanno = new Date().setFullYear(
          new Date().getFullYear(),
          dd[1] -1,
          dd[2]
         );

        var annonasc = dd[0];
        var eta = oggi.getFullYear() - annonasc;

        if (oggi < compleanno) {
        eta = eta - 1;
        }
        return eta;

       
      };

      this.giornivissuti = function() {

        var dd = this.dataNasc.split("-");
        var nascita = new Date()
        nascita.setFullYear(
          dd[0],
          dd[1] -1,
          dd[2]
          );

        var oggi = new Date();
        oggi.setHours(0);
        oggi.setMinutes(0);

        var gv = (oggi.getTime() - nascita.getTime()) / (1000 * 60 * 60 * 24);
        return gv;
      }

    }
