# Officina Index

Catalogo indipendente degli utensili Parkside. Sito statico, senza database, server applicativo o dipendenze npm. Ogni scheda è un file Markdown leggibile e versionato. Il codice richiede Node.js 22 o successivo.

## Avvio

```sh
npm test
npm run build
npm run dev
```

Apri http://127.0.0.1:4173. La cartella `dist/` contiene il sito completo. Puoi anche aprire `dist/index.html` direttamente nel browser: i collegamenti includono il nome dei file e non richiedono un server. Si può pubblicare su qualunque hosting statico, anche sotto un percorso come `/parkside-catalog/`: tutti i link interni sono relativi.

## Organizzazione

```text
content/products/       Una scheda Markdown per modello + IAN
src/style.css           Stile e layout responsive
src/app.js              Ricerca, filtri e vista elenco, senza backend
scripts/build.mjs       Generazione HTML e indice JSON
scripts/serve.mjs       Anteprima locale
test/                   Controlli sui dati e sulla provenienza
config.json             Repository e branch di riferimento
.github/workflows/      Build e pubblicazione GitHub Pages
```

Il generatore usa un sottoinsieme esplicito di Markdown: paragrafi e titoli di secondo livello. Il frontmatter usa campi YAML semplici con valori JSON (validi anche in YAML). Le specifiche sono un oggetto JSON. Non sono necessarie installazioni di pacchetti: il primo avvio funziona senza `npm install`.

## Nuova scheda

Copia `templates/product.md` in `content/products/nome-modello-IAN.md`. Compila tutti i campi richiesti. Il codice IAN è una stringa: non rimuovere eventuali zeri. Il suffisso completo, se presente, si annota nelle prove. La build rifiuta campi mancanti, fonti non HTTPS e identità duplicate.

Un modello con tre IAN occupa tre schede. La pagina mostra automaticamente le altre varianti con lo stesso modello.

## Provenienza: regole editoriali

- `manufacturer`: ragione sociale del produttore **dichiarato** da un documento pertinente a quell'IAN. Lascia `null` se non verificato. Non equivale alla fabbrica fisica.
- `oem`: stabilimento o produttore fisico, solo con prova esplicita. Al momento non sono stati identificati stabilimenti OEM.
- `company`: azienda collegata dal documento o catalogo.
- `role`: ruolo dimostrato dalla fonte; per una semplice presenza in catalogo usare `Catalogo ricambi` o `Catalogo e ricambi`.
- `source`: fonte primaria della relazione con l'azienda.
- `technical_source`: fonte delle specifiche quando diversa.
- `evidence`: che cosa è stato verificato, pagina, IAN completo e limiti della prova.
- `checked`: data reale della consultazione, non la data di produzione.
- `specifications`: solo dati espliciti; non trasformare numeri nel modello in potenze o capacità.

Le prime schede provengono dai cataloghi ufficiali Grizzly Tools e Kompernaß. La presenza in questi cataloghi **non dimostra chi fabbrica materialmente l'utensile**. La maggior parte delle schede è volutamente parziale. Il PWDL 40 A1 dispone delle specifiche Lidl. I manuali verificati documentano Grizzly per PAMRC 250 A1 (IAN 507557) e PWD 25 C4 (IAN 458741), Scheppach per PKS 1500 C4 (IAN 465511), e C.M.C. come dichiarante e assistenza per PIFDS 120 B2 (IAN 472024).

Le categorie e le alimentazioni dei prodotti Kompernaß sono classificazioni editoriali ricavate dai titoli. Non vengono inventati dati dove i titoli non li esplicitano. I vecchi IAN Grizzly includono varianti extra-Italia: il mercato viene mantenuto se il catalogo lo indica.

## GitHub come archivio

Repository previsto: https://github.com/informagico/parkside-catalog (privato).

Modifica un file `content/products/*.md` attraverso GitHub o con un normale commit. Il workflow esegue i controlli e genera l'intero sito. La build produce anche `data/catalog.json` e copie scaricabili delle schede Markdown. Non c'è alcuna chiamata al repository privato dal browser e non servono token nel sito.

Per pubblicare su GitHub Pages, l'account deve supportare Pages da repository privati; configura `Settings > Pages > Source: GitHub Actions`, poi avvia manualmente il workflow con `publish_pages: true`. **La privacy della repo non garantisce che il sito Pages sia privato.** Il workflow non pubblica automaticamente: il push esegue solo controlli e build. Prima dell'attivazione della pubblicazione verificare audience e piano GitHub. Il pacchetto statico funziona anche su altri hosting.

La sincronizzazione con un'eventuale anteprima Sites è separata: aggiornare GitHub non aggiorna automaticamente Sites. Per avere GitHub come unica sorgente in produzione, collegare il repository al provider di hosting scelto o usare Pages dopo averne configurato accesso e disponibilità.

## Grafica e marchi

Identità originale verde/antracite, logo Officina Index e illustrazioni vettoriali originali di categoria. Nessun logo Parkside o Lidl riprodotto. I nomi dei marchi identificano i prodotti; il progetto dichiara di non essere affiliato. I font hanno fallback di sistema, quindi il sito rimane utilizzabile anche senza Google Fonts.
