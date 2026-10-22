# Regole del catalogo

- I prodotti sono in content/products, una scheda per modello e IAN. Mantieni gli IAN come stringhe.
- Non indicare un produttore sulla base di somiglianze o della presenza in un catalogo ricambi. Il ruolo dichiarato nella fonte deve essere conservato.
- Non trasferire automaticamente prove e specifiche ad altri IAN.
- Usa fonti primarie e registra data, documento e limiti della verifica in evidence.
- Mantieni manufacturer e oem null finché non esiste una prova esplicita per il ruolo corrispondente.
- Non inserire token GitHub o altri segreti nel codice, nei contenuti, nella build o nei log.
- Il repository previsto è privato. Non cambiare visibilità o attivare un hosting pubblico senza indicazione dell'utente.
- Esegui npm test e npm run build dopo le modifiche ai contenuti o al generatore.
- Il sito è disponibile in italiano e inglese. Il README deve essere in inglese. Aggiungi le traduzioni dei nuovi testi in locales e conserva modello, IAN, azienda, fonti e valori tecnici tra le lingue.
- Usa Eleventy e i template Nunjucks in site; non reintrodurre un generatore o un parser Markdown fatti su misura.
- Mantieni la separazione tra dati tecnici, traduzioni, template e stili. Documenta il flusso per i contributori in CONTRIBUTING.md.
