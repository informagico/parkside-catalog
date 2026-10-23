# Find missing manuals

The maintainer can search the official [Parkside manual page](https://parkside-diy.com/it/assistenza/manuals) by catalog IAN without filling the form repeatedly. This is a local research command; it is not part of the website build or deployment.

```sh
npm run manuals -- --plan
npm run manuals -- --limit 25 --download
```

On Windows PowerShell, use `npm.cmd` if `npm` does not forward options after `--`.

By default, the queue includes products missing a manual, manufacturer or model, or having an empty specifications object. This is a discovery queue, not a judgment that every populated record is complete. IANs remain strings, including five-digit IANs and leading zeroes. The highest numeric IANs are searched first; the default batch contains at most 25 records.

```sh
# Select one or more existing catalog records, including records with a manual.
npm run manuals -- --ian 544754,506431 --download

# Restrict the queue to missing manual links.
npm run manuals -- --missing manual --limit 50

# Process the entire queue; results are saved after each IAN.
npm run manuals -- --all --download

# Repeat a search instead of reusing recent results.
npm run manuals -- --ian 544754 --refresh
```

The command makes sequential requests, with a one-second delay between requests. `--delay-ms` can increase this delay (minimum 500 ms). Transient network errors, HTTP 408/429 and server errors are retried twice with backoff. A long server-requested wait stops that IAN with a retry-later error. HTTP and parsing failures are recorded as errors, never as evidence that no manual exists.

## Local results

Everything is written under the ignored `.cache/manual-search/` directory:

- `report.md` and `report.json`: the latest batch, catalog gaps, official search links, candidate PDFs and errors.
- `results/IAN.json`: individual searches, so interrupted work can resume. Successful searches, including empty results, are reused for seven days. Errors and ambiguous responses are searched again.
- `pdfs/IAN/`: candidate PDFs downloaded with `--download`, with content hashes in the result records. Only official `media.sit-connect.com/public/articlemanual/` PDF URLs are downloaded. Unexpected hosts or mismatched IANs require review.

Rerun the same command after an interruption to reuse saved results; `Ctrl+C` stops after the current IAN. The batch report covers that invocation, while individual results from earlier batches remain in `results/`. Downloads are size-limited and must start with a PDF signature. They are research files and are not bundled into the website.

The client reads the current search configuration from the public page and keeps its temporary authorization value in memory. It does not save page HTML, authorization headers, cookies or raw service responses. A changed endpoint or response schema produces an error for investigation. The service is a website implementation detail, not a guaranteed public API.

`found` means candidate PDFs were returned, not that their contents have been reviewed. `not-found` means this Italian search returned no exact IAN match or no documents; manuals may still exist elsewhere. `needs-review` flags mismatched IANs or unsupported PDF URLs in the service response. `error` means the lookup or download failed and should be retried.

## Review before contributing

A result means the official search returned candidate documents for the exact IAN. It does not establish that every document is an operating manual or that its title is the catalog's model code. Product names returned by the service are shown for research only. The command never edits canonical products or translations.

1. Read the PDF cover and relevant technical pages. Check the exact IAN, full IAN suffix and model; distinguish the complete product from a supplied charger, accessory or warranty document.
2. Add a verified operating manual to `manual`. Transcribe supported specifications and keep tightening and breakaway torque separate. Never copy facts across IANs.
3. Attribute a manufacturer only when a primary document explicitly identifies it. A service address or search result alone is insufficient. Keep unsupported manufacturer and OEM values null.
4. Keep page references in optional `source`, `evidence`, `technical_source` and `technical_evidence` metadata. Product prose should describe the tool concisely; research notes are not rendered.
5. Review corresponding translations after changing English prose. Leave unreviewed translations stale; only a human-reviewed translation may receive a new fingerprint via `npm run translation -- IAN it --reviewed`.
6. Run `npm run build`, `npm test` and `npm run audit`, then open a pull request using the normal checklist. Search caches and downloaded research PDFs must remain uncommitted.
