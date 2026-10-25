# Kompernass catalog import — 25 October 2026

The catalog now contains **3,146 products**: 480 added IAN records and 103 updated records. The import adds or corrects 2,973 specification fields.

## Scope and sources

- Inspected all 39 pages and 922 linked entries in the official Italian Parkside listing, plus the English alternate pages for all 586 numeric IANs.
- Reviewed 634 linked documents, including the four official PDFs supplied for IANs 321524, 346205, 351124 and 419956 and the catalog’s existing official manuals for 496197 and 550424.
- Added one English Markdown record per new IAN, initial Italian translations and the public Kompernass gallery images. Original image bytes remain unchanged; their public source is recorded in each image block. The BMP photo for 298810 retains its public HTTPS source and uses the existing image-cache workflow.
- Preserved every existing manufacturer attribution and its provenance. New records keep manufacturer and OEM null; shop presence is not manufacturer evidence.
- Kept the ten approved categories. Standalone chargers and adapters use Accessories; batteries and battery/charger kits use Batteries with explicit Ah capacity and a documented platform.
- Kept variant-specific values scoped to their documented model. The three sander variants under 480685 have separate power and speed values. Its previous PMS 220 A1 URL redirects to the expanded record.
- Confirmed that PBSAE 12 A1 IANs 450674, 496197 and 550424 have integrated batteries using their own manuals. The 0–700 rpm rating for 450674 remains distinct from the 35–700 rpm ratings for the other two IANs.
- Initially excluded toy power-tool IAN 428083 pending the maintainer's category decision; see the approved follow-up below. The 336 slash-suffixed shop spare/accessory SKUs are not imported as standalone numeric IANs or substituted for their parent products.

## Approved follow-up: toy IAN 428083

The maintainer subsequently approved adding IAN 428083 under Accessories, explicitly identified as a toy. The additional English record and Italian translation cover PP 18 B1, PP 125 B1 and PP 1500 B1. Each variant's own manual confirms its battery supply: three AA cells for PP 18 B1 and PP 125 B1, two for PP 1500 B1. The record includes the official public product photo and keeps unknown manufacturer and OEM values null.

This follow-up brings the catalog to **3,147 products**, with **481 additions** and 103 updated records across the import and follow-up. [View IAN 428083](https://informagico.github.io/parkside-catalog/en/products/pp-18-b1-pp-125-b1-pp-1500-b1-428083/).

## Translation handling

All 480 new records have current Italian title, body and evidence translations. Shared specification and power labels are translated centrally. Existing translation fingerprints are preserved; 102 affected existing translations are held back by the English fallback notice until human review. Updated prose has corresponding Italian draft changes where applicable.

## Manuals not located

The official service and the additional Parkside manual search returned no exact-IAN PDF for the following eight records. Their valid identity and photo contributions remain available; undocumented technical fields are left unknown. No specifications or manufacturer evidence were copied from other IANs.

- 336363: PABH 20-Li B2.
- 418477: PRS2 A1 / PWS 2 A1.
- 421617: PSBM 750 B3.
- 422547: PAP 2 A1.
- 427552: PUTK 50 B1.
- 458763: PBSP 3 A1.
- 458937: PELS 3 B1 / PLL 2 A1.
- 463217: PSRB 31 A1.

## Validation

- Product validation, filename alignment and legacy-URL retention.
- Production build and the full test suite in both languages.
- Catalog consistency and classification audit.
- Browser checks for the four supplied manuals, public photos, representative new and updated pages, responsive layout and the automatic same-model comparison tables.

## Added IANs

| IAN | Model | Category |
| --- | --- | --- |
| [100054](https://informagico.github.io/parkside-catalog/en/products/pstd-800-a1-100054/) | PSTD 800 A1 | Sawing & Cutting |
| [100129](https://informagico.github.io/parkside-catalog/en/products/pof-1200-a1-100129/) | POF 1200 A1 | Sawing & Cutting |
| [102653](https://informagico.github.io/parkside-catalog/en/products/pabs-10-8-c2-102653/) | PABS 10.8 C2 | Drilling & Fastening |
| [102784](https://informagico.github.io/parkside-catalog/en/products/pmfw-310-a1-102784/) | PMFW 310 A1 | Sawing & Cutting |
| [102814](https://informagico.github.io/parkside-catalog/en/products/pabs-14-4-a1-102814/) | PABS 14.4 A1 | Drilling & Fastening |
| [102866](https://informagico.github.io/parkside-catalog/en/products/pstda-18-li-a1-102866/) | PSTDA 18-Li A1 | Sawing & Cutting |
| [103318](https://informagico.github.io/parkside-catalog/en/products/pse-2800-a1-103318/) | PSE 2800 A1 | Workshop Equipment |
| [104027](https://informagico.github.io/parkside-catalog/en/products/pamfw-10-8-a1-104027/) | PAMFW 10.8 A1 | Sawing & Cutting |
| [113366](https://informagico.github.io/parkside-catalog/en/products/php-500-c2-113366/) | PHP 500 C2 | Workshop Equipment |
| [113378](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-a1-113378/) | PABS 20-Li A1 | Drilling & Fastening |
| [114249](https://informagico.github.io/parkside-catalog/en/products/pstd-800-a1-114249/) | PSTD 800 A1 | Sawing & Cutting |
| [115767](https://informagico.github.io/parkside-catalog/en/products/pmfs-200-a1-115767/) | PMFS 200 A1 | Sanding & Grinding |
| [270217](https://informagico.github.io/parkside-catalog/en/products/pabs-12-b2-270217/) | PABS 12 B2 | Drilling & Fastening |
| [270411](https://informagico.github.io/parkside-catalog/en/products/pmfw-310-b1-270411/) | PMFW 310 B1 | Sawing & Cutting |
| [270420](https://informagico.github.io/parkside-catalog/en/products/phksa-18-li-b2-270420/) | PHKSA 18-Li B2 | Sawing & Cutting |
| [270421](https://informagico.github.io/parkside-catalog/en/products/psbsa-18-li-b2-270421/) | PSBSA 18-Li B2 | Drilling & Fastening |
| [270701](https://informagico.github.io/parkside-catalog/en/products/pabs-16-a1-270701/) | PABS 16 A1 | Drilling & Fastening |
| [270762](https://informagico.github.io/parkside-catalog/en/products/pstk-800-a1-270762/) | PSTK 800 A1 | Sawing & Cutting |
| [270827](https://informagico.github.io/parkside-catalog/en/products/pstd-800-b1-270827/) | PSTD 800 B1 | Sawing & Cutting |
| [272950](https://informagico.github.io/parkside-catalog/en/products/pfs-710-c2-272950/) | PFS 710 C2 | Sawing & Cutting |
| [273278](https://informagico.github.io/parkside-catalog/en/products/pts-500-a1-273278/) | PTS 500 A1 | Sawing & Cutting |
| [273474](https://informagico.github.io/parkside-catalog/en/products/pet-25-b1-273474/) | PET 25 B1 | Drilling & Fastening |
| [273476](https://informagico.github.io/parkside-catalog/en/products/pamfw-12-a1-273476/) | PAMFW 12 A1 | Sawing & Cutting |
| [274702](https://informagico.github.io/parkside-catalog/en/products/php-500-d2-274702/) | PHP 500 D2 | Workshop Equipment |
| [274864](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-b2-274864/) | PABS 20-LI B2 | Drilling & Fastening |
| [276381](https://informagico.github.io/parkside-catalog/en/products/pmfw-310-c2-276381/) | PMFW 310 C2 | Sawing & Cutting |
| [277022](https://informagico.github.io/parkside-catalog/en/products/pabh-20-li-a1-277022/) | PABH 20-Li A1 | Drilling & Fastening |
| [277290](https://informagico.github.io/parkside-catalog/en/products/phksa-18-li-b2-277290/) | PHKSA 18-Li B2 | Sawing & Cutting |
| [277291](https://informagico.github.io/parkside-catalog/en/products/psbsa-18-li-b2-277291/) | PSBSA 18-Li B2 | Drilling & Fastening |
| [279503](https://informagico.github.io/parkside-catalog/en/products/phksa-20-li-a1-279503/) | PHKSA 20-LI A1 | Sawing & Cutting |
| [280213](https://informagico.github.io/parkside-catalog/en/products/pabs-16-a2-280213/) | PABS 16 A2 | Drilling & Fastening |
| [281598](https://informagico.github.io/parkside-catalog/en/products/pgi-1200-b2-281598/) | PGI 1200 B2 | Workshop Equipment |
| [281993](https://informagico.github.io/parkside-catalog/en/products/phksa-20-li-a1-281993/) | PHKSA 20-Li A1 | Sawing & Cutting |
| [282403](https://informagico.github.io/parkside-catalog/en/products/pstk-800-b2-282403/) | PSTK 800 B2 | Sawing & Cutting |
| [282487](https://informagico.github.io/parkside-catalog/en/products/pet-25-c2-282487/) | PET 25 C2 | Drilling & Fastening |
| [282489](https://informagico.github.io/parkside-catalog/en/products/pamfw-12-b1-282489/) | PAMFW 12 B1 | Sawing & Cutting |
| [282492](https://informagico.github.io/parkside-catalog/en/products/pssa-20-li-a1-282492/) | PSSA 20-Li A1 | Sawing & Cutting |
| [282493](https://informagico.github.io/parkside-catalog/en/products/pdssa-20-li-a1-282493/) | PDSSA 20-Li A1 | Drilling & Fastening |
| [282494](https://informagico.github.io/parkside-catalog/en/products/pwsa-20-li-a1-282494/) | PWSA 20-Li A1 | Sanding & Grinding |
| [282495](https://informagico.github.io/parkside-catalog/en/products/ptss-1200-b1-282495/) | PTSS 1200 B1 | Sawing & Cutting |
| [283022](https://informagico.github.io/parkside-catalog/en/products/pstd-800-b2-283022/) | PSTD 800 B2 | Sawing & Cutting |
| [284659](https://informagico.github.io/parkside-catalog/en/products/pssa-20-li-a1-284659/) | PSSA 20-Li A1 | Sawing & Cutting |
| [284660](https://informagico.github.io/parkside-catalog/en/products/pdssa-20-li-a1-284660/) | PDSSA 20-Li A1 | Drilling & Fastening |
| [284661](https://informagico.github.io/parkside-catalog/en/products/pwsa-20-li-a1-284661/) | PWSA 20-Li A1 | Sanding & Grinding |
| [284793](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-c3-284793/) | PABS 20-Li C3 | Drilling & Fastening |
| [284962](https://informagico.github.io/parkside-catalog/en/products/pabh-20-li-b2-284962/) | PABH 20-Li B2 | Drilling & Fastening |
| [285801](https://informagico.github.io/parkside-catalog/en/products/pamfw-20-li-a1-285801/) | PAMFW 20-Li A1 | Sawing & Cutting |
| [286851](https://informagico.github.io/parkside-catalog/en/products/pfbs-160-b2-286851/) | PFBS 160 B2 | Sanding & Grinding |
| [288023](https://informagico.github.io/parkside-catalog/en/products/pabs-12-b3-288023/) | PABS 12 B3 | Drilling & Fastening |
| [288077](https://informagico.github.io/parkside-catalog/en/products/pbs-900-c3-288077/) | PBS 900 C3 | Sanding & Grinding |
| [289281](https://informagico.github.io/parkside-catalog/en/products/pstk-800-b2-289281/) | PSTK 800 B2 | Sawing & Cutting |
| [289715](https://informagico.github.io/parkside-catalog/en/products/pgs-500-a1-289715/) | PGS 500 A1 | Sanding & Grinding |
| [290733](https://informagico.github.io/parkside-catalog/en/products/pamfw-12-b2-290733/) | PAMFW 12 B2 | Sawing & Cutting |
| [290742](https://informagico.github.io/parkside-catalog/en/products/pssa-20-li-a1-290742/) | PSSA 20-Li A1 | Sawing & Cutting |
| [290752](https://informagico.github.io/parkside-catalog/en/products/pmfw-310-d2-290752/) | PMFW 310 D2 | Sawing & Cutting |
| [290754](https://informagico.github.io/parkside-catalog/en/products/pdssa-20-li-a1-290754/) | PDSSA 20-Li A1 | Drilling & Fastening |
| [290756](https://informagico.github.io/parkside-catalog/en/products/pwsa-20-li-b2-290756/) | PWSA 20-Li B2 | Sanding & Grinding |
| [290825](https://informagico.github.io/parkside-catalog/en/products/pssa-20-li-a1-290825/) | PSSA 20-Li A1 | Sawing & Cutting |
| [290841](https://informagico.github.io/parkside-catalog/en/products/pdssa-20-li-a1-290841/) | PDSSA 20-Li A1 | Drilling & Fastening |
| [290849](https://informagico.github.io/parkside-catalog/en/products/pwsa-20-li-b2-290849/) | PWSA 20-Li B2 | Sanding & Grinding |
| [291870](https://informagico.github.io/parkside-catalog/en/products/phksa-20-li-a2-291870/) | PHKSA 20-Li A2 | Sawing & Cutting |
| [291874](https://informagico.github.io/parkside-catalog/en/products/phksa-20-li-a2-291874/) | PHKSA 20-Li A2 | Sawing & Cutting |
| [292020](https://informagico.github.io/parkside-catalog/en/products/passk-20-li-a1-292020/) | PASSK 20-Li A1 | Drilling & Fastening |
| [292298](https://informagico.github.io/parkside-catalog/en/products/pat-20-li-a1-292298/) | PAT 20-LI A1 | Drilling & Fastening |
| [295715](https://informagico.github.io/parkside-catalog/en/products/pfs-710-d3-295715/) | PFS 710 D3 | Sawing & Cutting |
| [297286](https://informagico.github.io/parkside-catalog/en/products/php-500-d2-297286/) | PHP 500 D2 | Workshop Equipment |
| [297715](https://informagico.github.io/parkside-catalog/en/products/psbm-1100-a1-297715/) | PSBM 1100 A1 | Drilling & Fastening |
| [298637](https://informagico.github.io/parkside-catalog/en/products/pdbnp-14-a1-298637/) | PDBNP 14 A1 | Drilling & Fastening |
| [298641](https://informagico.github.io/parkside-catalog/en/products/pah-1700-a1-298641/) | PAH 1700 A1 | Drilling & Fastening |
| [298810](https://informagico.github.io/parkside-catalog/en/products/pbsd-600-a1-298810/) | PBSD 600 A1 | Sanding & Grinding |
| [298871](https://informagico.github.io/parkside-catalog/en/products/pbh-1500-e5-298871/) | PBH 1500 E5 | Drilling & Fastening |
| [298894](https://informagico.github.io/parkside-catalog/en/products/pamfw-20-li-a1-298894/) | PAMFW 20-Li A1 | Sawing & Cutting |
| [300031](https://informagico.github.io/parkside-catalog/en/products/pabh-20-li-b2-300031/) | PABH 20-Li B2 | Drilling & Fastening |
| [300101](https://informagico.github.io/parkside-catalog/en/products/pdap-75-a1-300101/) | PDAP 75 A1 | Sanding & Grinding |
| [300499](https://informagico.github.io/parkside-catalog/en/products/pgg-15-e4-300499/) | PGG 15 E4 | Sanding & Grinding |
| [300553](https://informagico.github.io/parkside-catalog/en/products/pah-1300-b2-300553/) | PAH 1300 B2 | Drilling & Fastening |
| [301593](https://informagico.github.io/parkside-catalog/en/products/pdla-6-3-a1-301593/) | PDLA 6.3 A1 | Workshop Equipment |
| [301845](https://informagico.github.io/parkside-catalog/en/products/pstda-20-li-a2-301845/) | PSTDA 20-Li A2 | Sawing & Cutting |
| [302114](https://informagico.github.io/parkside-catalog/en/products/phksa-20-li-a2-302114/) | PHKSA 20-Li A2 | Sawing & Cutting |
| [302329](https://informagico.github.io/parkside-catalog/en/products/phksa-12-a1-302329/) | PHKSA 12 A1 | Sawing & Cutting |
| [302394](https://informagico.github.io/parkside-catalog/en/products/pns-300-a1-302394/) | PNS 300 A1 | Drilling & Fastening |
| [302616](https://informagico.github.io/parkside-catalog/en/products/pstda-20-li-a2-302616/) | PSTDA 20-Li A2 | Sawing & Cutting |
| [302780](https://informagico.github.io/parkside-catalog/en/products/pabh-20-li-b2-302780/) | PABH 20-Li B2 | Drilling & Fastening |
| [302784](https://informagico.github.io/parkside-catalog/en/products/pamfw-20-li-a1-302784/) | PAMFW 20-LI A1 | Sawing & Cutting |
| [303000](https://informagico.github.io/parkside-catalog/en/products/pfsa-20-li-a1-303000/) | PFSA 20-Li A1 | Workshop Equipment |
| [303118](https://informagico.github.io/parkside-catalog/en/products/pfsa-20-li-a1-303118/) | PFSA 20-Li A1 | Workshop Equipment |
| [303129](https://informagico.github.io/parkside-catalog/en/products/pgs-500-a1-303129/) | PGS 500 A1 | Sanding & Grinding |
| [303398](https://informagico.github.io/parkside-catalog/en/products/pbh-800-a1-303398/) | PBH 800 A1 | Drilling & Fastening |
| [303564](https://informagico.github.io/parkside-catalog/en/products/peh-30-c3-303564/) | PEH 30 C3 | Sawing & Cutting |
| [303832](https://informagico.github.io/parkside-catalog/en/products/pas-4-b3-303832/) | PAS 4 B3 | Drilling & Fastening |
| [304686](https://informagico.github.io/parkside-catalog/en/products/pmfw-310-d2-304686/) | PMFW 310 D2 | Sawing & Cutting |
| [304706](https://informagico.github.io/parkside-catalog/en/products/php-500-d2-304706/) | PHP 500 D2 | Workshop Equipment |
| [304996](https://informagico.github.io/parkside-catalog/en/products/psbm-750-b2-304996/) | PSBM 750 B2 | Drilling & Fastening |
| [305077](https://informagico.github.io/parkside-catalog/en/products/passk-20-li-a1-305077/) | PASSK 20-Li A1 | Drilling & Fastening |
| [305078](https://informagico.github.io/parkside-catalog/en/products/pat-20-li-a1-305078/) | PAT 20-Li A1 | Drilling & Fastening |
| [305279](https://informagico.github.io/parkside-catalog/en/products/pfbs-12-b2-305279/) | PFBS 12 B2 | Sanding & Grinding |
| [306436](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-d4-306436/) | PABS 20-Li D4 | Drilling & Fastening |
| [306654](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-d4-306654/) | PABS 20-Li D4 | Drilling & Fastening |
| [306664](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-d4-306664/) | PABS 20-Li D4 | Drilling & Fastening |
| [306938](https://informagico.github.io/parkside-catalog/en/products/pbs-900-c3-306938/) | PBS 900 C3 | Sanding & Grinding |
| [306942](https://informagico.github.io/parkside-catalog/en/products/pbsa-12-c2-306942/) | PBSA 12 C2 | Drilling & Fastening |
| [306948](https://informagico.github.io/parkside-catalog/en/products/pfbs-12-b2-306948/) | PFBS 12 B2 | Sanding & Grinding |
| [307142](https://informagico.github.io/parkside-catalog/en/products/phet-15-b1-307142/) | PHET 15 B1 | Drilling & Fastening |
| [307590](https://informagico.github.io/parkside-catalog/en/products/passk-20-li-a1-307590/) | PASSK 20-Li A1 | Drilling & Fastening |
| [308540](https://informagico.github.io/parkside-catalog/en/products/paksp-20-li-a1-308540/) | PAKSP 20-Li A1 | Sawing & Cutting |
| [308541](https://informagico.github.io/parkside-catalog/en/products/paexs-20-li-a1-308541/) | PAEXS 20-Li A1 | Sanding & Grinding |
| [308551](https://informagico.github.io/parkside-catalog/en/products/paexs-20-li-a1-308551/) | PAEXS 20-Li A1 | Sanding & Grinding |
| [308610](https://informagico.github.io/parkside-catalog/en/products/pts-20-li-a1-308610/) | PTS 20-Li A1 | Sawing & Cutting |
| [308629](https://informagico.github.io/parkside-catalog/en/products/pts-20-li-a1-308629/) | PTS 20-Li A1 | Sawing & Cutting |
| [309611](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-d4-309611/) | PABS 20-Li D4 | Drilling & Fastening |
| [309644](https://informagico.github.io/parkside-catalog/en/products/passk-20-li-a1-309644/) | PASSK 20-Li A1 | Drilling & Fastening |
| [309870](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-d4-309870/) | PABS 20-Li D4 | Drilling & Fastening |
| [310452](https://informagico.github.io/parkside-catalog/en/products/passk-20-li-a1-310452/) | PASSK 20-Li A1 | Drilling & Fastening |
| [310827](https://informagico.github.io/parkside-catalog/en/products/passk-20-li-a1-310827/) | PASSK 20-Li A1 | Drilling & Fastening |
| [310843](https://informagico.github.io/parkside-catalog/en/products/pts-710-a1-310843/) | PTS 710 A1 | Sawing & Cutting |
| [310860](https://informagico.github.io/parkside-catalog/en/products/pfbs-160-b2-310860/) | PFBS 160 B2 | Sanding & Grinding |
| [310918](https://informagico.github.io/parkside-catalog/en/products/php-500-e3-310918/) | PHP 500 E3 | Workshop Equipment |
| [310922](https://informagico.github.io/parkside-catalog/en/products/pfs-710-d3-310922/) | PFS 710 D3 | Sawing & Cutting |
| [310935](https://informagico.github.io/parkside-catalog/en/products/pwsa-20-li-b3-310935/) | PWSA 20-Li B3 | Sanding & Grinding |
| [310948](https://informagico.github.io/parkside-catalog/en/products/pssa-20-li-a1-310948/) | PSSA 20-Li A1 | Sawing & Cutting |
| [310951](https://informagico.github.io/parkside-catalog/en/products/pamfw-12-c3-310951/) | PAMFW 12 C3 | Sawing & Cutting |
| [310954](https://informagico.github.io/parkside-catalog/en/products/pssa-20-li-a1-310954/) | PSSA 20-Li A1 | Sawing & Cutting |
| [310956](https://informagico.github.io/parkside-catalog/en/products/pet-25-c2-310956/) | PET 25 C2 | Drilling & Fastening |
| [311369](https://informagico.github.io/parkside-catalog/en/products/pdmh-4500-b5-311369/) | PDMH 4500 B5 | Drilling & Fastening |
| [311700](https://informagico.github.io/parkside-catalog/en/products/pbk-4-a1-311700/) | PBK 4 A1 | Gardening |
| [311839](https://informagico.github.io/parkside-catalog/en/products/pkz-180-c4-311839/) | PKZ 180 C4 | Workshop Equipment |
| [311903](https://informagico.github.io/parkside-catalog/en/products/pws-230-c3-311903/) | PWS 230 C3 | Sanding & Grinding |
| [311912](https://informagico.github.io/parkside-catalog/en/products/pbh-1050-b2-311912/) | PBH 1050 B2 | Drilling & Fastening |
| [312018](https://informagico.github.io/parkside-catalog/en/products/pstk-800-b2-312018/) | PSTK 800 B2 | Sawing & Cutting |
| [312187](https://informagico.github.io/parkside-catalog/en/products/pds-290-c3-312187/) | PDS 290 C3 | Sanding & Grinding |
| [312517](https://informagico.github.io/parkside-catalog/en/products/pdfs-1300-a1-312517/) | PDFS 1300 A1 | Sawing & Cutting |
| [313103](https://informagico.github.io/parkside-catalog/en/products/plhlg-2000-a1-313103/) | PLHLG 2000 A1 | Workshop Equipment |
| [313241](https://informagico.github.io/parkside-catalog/en/products/pfsh-3-a2-313241/) | PFSH 3 A2 | Gardening |
| [313266](https://informagico.github.io/parkside-catalog/en/products/phshe-900-b2-313266/) | PHSHE 900 B2 | Gardening |
| [314091](https://informagico.github.io/parkside-catalog/en/products/pdrw-1800-a1-314091/) | PDRW 1800 A1 | Workshop Equipment |
| [314188](https://informagico.github.io/parkside-catalog/en/products/pws-125-f5-314188/) | PWS 125 F5 | Sanding & Grinding |
| [314798](https://informagico.github.io/parkside-catalog/en/products/puv-2000-a1-314798/) | PUV 2000 A1 | Gardening |
| [315014](https://informagico.github.io/parkside-catalog/en/products/phks-1350-c2-315014/) | PHKS 1350 C2 | Sawing & Cutting |
| [315261](https://informagico.github.io/parkside-catalog/en/products/pahe-20-li-a1-315261/) | PAHE 20-Li A1 | Gardening |
| [315337](https://informagico.github.io/parkside-catalog/en/products/pah-1300-b2-315337/) | PAH 1300 B2 | Drilling & Fastening |
| [315463](https://informagico.github.io/parkside-catalog/en/products/pdfp-500-c3-315463/) | PDFP 500 C3 | Workshop Equipment |
| [315471](https://informagico.github.io/parkside-catalog/en/products/pdbnp-14-b1-315471/) | PDBNP 14 B1 | Drilling & Fastening |
| [315475](https://informagico.github.io/parkside-catalog/en/products/pdrs-6-3-b2-315475/) | PDRS 6.3 B2 | Drilling & Fastening |
| [315476](https://informagico.github.io/parkside-catalog/en/products/pdsb-10-a1-315476/) | PDSB 10 A1 | Cleaning & Extraction |
| [315561](https://informagico.github.io/parkside-catalog/en/products/pbsd-600-a1-315561/) | PBSD 600 A1 | Sanding & Grinding |
| [315566](https://informagico.github.io/parkside-catalog/en/products/pns-300-a1-315566/) | PNS 300 A1 | Drilling & Fastening |
| [315570](https://informagico.github.io/parkside-catalog/en/products/pamfw-20-li-a1-315570/) | PAMFW 20-Li A1 | Sawing & Cutting |
| [315572](https://informagico.github.io/parkside-catalog/en/products/pamfw-20-li-a1-315572/) | PAMFW 20-Li A1 | Sawing & Cutting |
| [315585](https://informagico.github.io/parkside-catalog/en/products/pabh-20-li-b2-315585/) | PABH 20-Li B2 | Drilling & Fastening |
| [315590](https://informagico.github.io/parkside-catalog/en/products/pdfw-120-a1-315590/) | PDFW 120 A1 | Sanding & Grinding |
| [315593](https://informagico.github.io/parkside-catalog/en/products/pdssa-20-li-a1-315593/) | PDSSA 20-Li A1 | Drilling & Fastening |
| [315627](https://informagico.github.io/parkside-catalog/en/products/pabh-20-li-b2-315627/) | PABH 20-Li B2 | Drilling & Fastening |
| [315642](https://informagico.github.io/parkside-catalog/en/products/pala-20-li-a1-315642/) | PALA 20-Li A1 | Gardening |
| [316601](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-d5-316601/) | PABS 20-Li D5 | Drilling & Fastening |
| [317132](https://informagico.github.io/parkside-catalog/en/products/pws-125-f5-317132/) | PWS 125 F5 | Sanding & Grinding |
| [317136](https://informagico.github.io/parkside-catalog/en/products/pas-4-c4-317136/) | PAS 4 C4 | Drilling & Fastening |
| [317249](https://informagico.github.io/parkside-catalog/en/products/peh-30-c3-317249/) | PEH 30 C3 | Sawing & Cutting |
| [317536](https://informagico.github.io/parkside-catalog/en/products/pdb-6-a1-317536/) | PDB 6 A1 | Drilling & Fastening |
| [317777](https://informagico.github.io/parkside-catalog/en/products/psbm-750-b3-317777/) | PSBM 750 B3 | Drilling & Fastening |
| [318953](https://informagico.github.io/parkside-catalog/en/products/pala-20-li-a1-318953/) | PALA 20-Li A1 | Gardening |
| [320149](https://informagico.github.io/parkside-catalog/en/products/papk-12-a2-320149/) | PAPK 12 A2 | Batteries |
| [320204](https://informagico.github.io/parkside-catalog/en/products/pahe-20-li-a1-320204/) | PAHE 20-Li A1 | Gardening |
| [320332](https://informagico.github.io/parkside-catalog/en/products/passk-20-li-a1-320332/) | PASSK 20-Li A1 | Drilling & Fastening |
| [320723](https://informagico.github.io/parkside-catalog/en/products/pasd-4-a1-320723/) | PASD 4 A1 | Drilling & Fastening |
| [321225](https://informagico.github.io/parkside-catalog/en/products/pstd-800-b2-321225/) | PSTD 800 B2 | Sawing & Cutting |
| [321477](https://informagico.github.io/parkside-catalog/en/products/pbh-800-a1-321477/) | PBH 800 A1 | Drilling & Fastening |
| [321524](https://informagico.github.io/parkside-catalog/en/products/php-500-e3-321524/) | PHP 500 E3 | Workshop Equipment |
| [322155](https://informagico.github.io/parkside-catalog/en/products/phpa-4-b3-322155/) | PHPA 4 B3 | Workshop Equipment |
| [322437](https://informagico.github.io/parkside-catalog/en/products/pmsa-12-b2-322437/) | PMSA 12 B2 | Sawing & Cutting |
| [322636](https://informagico.github.io/parkside-catalog/en/products/paap-12-a1-322636/) | PAAP 12 A1 | Sanding & Grinding |
| [322702](https://informagico.github.io/parkside-catalog/en/products/pbsa-12-d3-322702/) | PBSA 12 D3 | Drilling & Fastening |
| [322704](https://informagico.github.io/parkside-catalog/en/products/phksa-12-a2-322704/) | PHKSA 12 A2 | Sawing & Cutting |
| [322705](https://informagico.github.io/parkside-catalog/en/products/pap-20-a1-322705/) | PAP 20 A1 | Batteries |
| [322765](https://informagico.github.io/parkside-catalog/en/products/pat-20-li-a1-322765/) | PAT 20-Li A1 | Drilling & Fastening |
| [322848](https://informagico.github.io/parkside-catalog/en/products/pmb-1100-a1-322848/) | PMB 1100 A1 | Sawing & Cutting |
| [323150](https://informagico.github.io/parkside-catalog/en/products/plla-12-b2-323150/) | PLLA 12 B2 | Workshop Equipment |
| [323395](https://informagico.github.io/parkside-catalog/en/products/pdss-310-b5-323395/) | PDSS 310 B5 | Drilling & Fastening |
| [324133](https://informagico.github.io/parkside-catalog/en/products/pfs-400-a1-324133/) | PFS 400 A1 | Workshop Equipment |
| [326368](https://informagico.github.io/parkside-catalog/en/products/pap-20-a1-plg-20-a1-326368/) | PAP 20 A1 / PLG 20 A1 | Batteries |
| [326369](https://informagico.github.io/parkside-catalog/en/products/paa-20-li-b2-326369/) | PAA 20-Li B2 | Accessories |
| [326374](https://informagico.github.io/parkside-catalog/en/products/psbsa-20-li-b2-326374/) | PSBSA 20-Li B2 | Drilling & Fastening |
| [326381](https://informagico.github.io/parkside-catalog/en/products/pat-20-li-a1-326381/) | PAT 20-Li A1 | Drilling & Fastening |
| [326393](https://informagico.github.io/parkside-catalog/en/products/phksa-20-li-a2-326393/) | PHKSA 20-Li A2 | Sawing & Cutting |
| [326400](https://informagico.github.io/parkside-catalog/en/products/phksa-20-li-a2-326400/) | PHKSA 20-Li A2 | Sawing & Cutting |
| [326566](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-d4-326566/) | PABS 20-Li D4 | Drilling & Fastening |
| [326890](https://informagico.github.io/parkside-catalog/en/products/pfrs-1-5-b3-326890/) | PFRS 1.5 B3 | Workshop Equipment |
| [327047](https://informagico.github.io/parkside-catalog/en/products/pstf-20-a1-327047/) | PSTF 20 A1 | Gardening |
| [327104](https://informagico.github.io/parkside-catalog/en/products/pnkp-105-b1-327104/) | PNKP 105 B1 | Workshop Equipment |
| [327106](https://informagico.github.io/parkside-catalog/en/products/phet-15-b1-327106/) | PHET 15 B1 | Drilling & Fastening |
| [327281](https://informagico.github.io/parkside-catalog/en/products/pmfw-310-d2-327281/) | PMFW 310 D2 | Sawing & Cutting |
| [327364](https://informagico.github.io/parkside-catalog/en/products/pdts-6-3-b3-327364/) | PDTS 6.3 B3 | Sawing & Cutting |
| [327368](https://informagico.github.io/parkside-catalog/en/products/pmts-180-a1-327368/) | PMTS 180 A1 | Sawing & Cutting |
| [327520](https://informagico.github.io/parkside-catalog/en/products/pksa-20-li-a1-327520/) | PKSA 20-Li A1 | Gardening |
| [327523](https://informagico.github.io/parkside-catalog/en/products/pksa-20-li-a1-327523/) | PKSA 20-Li A1 | Gardening |
| [331116](https://informagico.github.io/parkside-catalog/en/products/pet-25-c3-331116/) | PET 25 C3 | Drilling & Fastening |
| [331129](https://informagico.github.io/parkside-catalog/en/products/ptss-1200-c2-331129/) | PTSS 1200 C2 | Sawing & Cutting |
| [331167](https://informagico.github.io/parkside-catalog/en/products/pkz-180-c5-331167/) | PKZ 180 C5 | Workshop Equipment |
| [331365](https://informagico.github.io/parkside-catalog/en/products/pbk-4-a1-331365/) | PBK 4 A1 | Gardening |
| [331417](https://informagico.github.io/parkside-catalog/en/products/papk-12-b1-331417/) | PAPK 12 B1 | Batteries |
| [331573](https://informagico.github.io/parkside-catalog/en/products/pfs-710-d3-331573/) | PFS 710 D3 | Sawing & Cutting |
| [331789](https://informagico.github.io/parkside-catalog/en/products/pwsa-20-li-b3-331789/) | PWSA 20-Li B3 | Sanding & Grinding |
| [331791](https://informagico.github.io/parkside-catalog/en/products/pssa-20-li-a1-331791/) | PSSA 20-Li A1 | Sawing & Cutting |
| [331795](https://informagico.github.io/parkside-catalog/en/products/pap-20-a1-331795/) | PAP 20 A1 | Batteries |
| [331803](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-d5-331803/) | PABS 20-Li D5 | Drilling & Fastening |
| [332000](https://informagico.github.io/parkside-catalog/en/products/pts-710-a2-332000/) | PTS 710 A2 | Sawing & Cutting |
| [332006](https://informagico.github.io/parkside-catalog/en/products/pfbs-160-b2-332006/) | PFBS 160 B2 | Sanding & Grinding |
| [332669](https://informagico.github.io/parkside-catalog/en/products/pwm-4-a1-332669/) | PWM 4 A1 | Measuring & Detection |
| [332947](https://informagico.github.io/parkside-catalog/en/products/pmk-550-a1-332947/) | PMK 550 A1 | Sawing & Cutting |
| [332948](https://informagico.github.io/parkside-catalog/en/products/pas-4-c4-332948/) | PAS 4 C4 | Drilling & Fastening |
| [334005](https://informagico.github.io/parkside-catalog/en/products/pamfw-12-c3-334005/) | PAMFW 12 C3 | Sawing & Cutting |
| [336363](https://informagico.github.io/parkside-catalog/en/products/pabh-20-li-b2-336363/) | PABH 20-Li B2 | Drilling & Fastening |
| [336759](https://informagico.github.io/parkside-catalog/en/products/pps-200-c2-336759/) | PPS 200 C2 | Sanding & Grinding |
| [337008](https://informagico.github.io/parkside-catalog/en/products/pgs-500-a1-337008/) | PGS 500 A1 | Sanding & Grinding |
| [337117](https://informagico.github.io/parkside-catalog/en/products/pbh-800-a1-337117/) | PBH 800 A1 | Drilling & Fastening |
| [337406](https://informagico.github.io/parkside-catalog/en/products/pkhap-20-li-a1-337406/) | PKHAP 20-Li A1 | Drilling & Fastening |
| [338353](https://informagico.github.io/parkside-catalog/en/products/phpa-4-b3-338353/) | PHPA 4 B3 | Workshop Equipment |
| [338633](https://informagico.github.io/parkside-catalog/en/products/pwsa-20-li-b3-338633/) | PWSA 20-Li B3 | Sanding & Grinding |
| [338733](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-d5-338733/) | PABS 20-Li D5 | Drilling & Fastening |
| [339107](https://informagico.github.io/parkside-catalog/en/products/pdslg-20-a1-339107/) | PDSLG 20 A1 | Accessories |
| [339108](https://informagico.github.io/parkside-catalog/en/products/pamfw-20-li-a1-339108/) | PAMFW 20-LI A1 | Sawing & Cutting |
| [339124](https://informagico.github.io/parkside-catalog/en/products/pabh-20-li-b2-339124/) | PABH 20-Li B2 | Drilling & Fastening |
| [339133](https://informagico.github.io/parkside-catalog/en/products/pdnb-6-3-b2-339133/) | PDNB 6.3 B2 | Sawing & Cutting |
| [339135](https://informagico.github.io/parkside-catalog/en/products/pdfp-500-c3-339135/) | PDFP 500 C3 | Workshop Equipment |
| [339145](https://informagico.github.io/parkside-catalog/en/products/pdbnp-14-b1-339145/) | PDBNP 14 B1 | Drilling & Fastening |
| [339152](https://informagico.github.io/parkside-catalog/en/products/pdap-75-a1-339152/) | PDAP 75 A1 | Sanding & Grinding |
| [339398](https://informagico.github.io/parkside-catalog/en/products/pah-1300-b2-339398/) | PAH 1300 B2 | Drilling & Fastening |
| [339516](https://informagico.github.io/parkside-catalog/en/products/pgg-15-e4-339516/) | PGG 15 E4 | Sanding & Grinding |
| [339645](https://informagico.github.io/parkside-catalog/en/products/pss-270-c3-pexs-270-c3-339645/) | PSS 270 C3 / PEXS 270 C3 | Sanding & Grinding |
| [339737](https://informagico.github.io/parkside-catalog/en/products/phs-600-b2-339737/) | PHS 600 B2 | Gardening |
| [339845](https://informagico.github.io/parkside-catalog/en/products/pdsse-550-a1-339845/) | PDSSE 550 A1 | Drilling & Fastening |
| [339963](https://informagico.github.io/parkside-catalog/en/products/phks-1350-c2-339963/) | PHKS 1350 C2 | Sawing & Cutting |
| [339966](https://informagico.github.io/parkside-catalog/en/products/pdfw-120-a2-339966/) | PDFW 120 A2 | Sanding & Grinding |
| [340502](https://informagico.github.io/parkside-catalog/en/products/paas-12-a2-340502/) | PAAS 12 A2 | Gardening |
| [340686](https://informagico.github.io/parkside-catalog/en/products/puv-2000-b1-340686/) | PUV 2000 B1 | Gardening |
| [341848](https://informagico.github.io/parkside-catalog/en/products/pls-145-a1-341848/) | PLS 145 A1 | Drilling & Fastening |
| [343406](https://informagico.github.io/parkside-catalog/en/products/passk-20-li-a1-343406/) | PASSK 20-Li A1 | Drilling & Fastening |
| [344905](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-d5-344905/) | PABS 20-Li D5 | Drilling & Fastening |
| [345014](https://informagico.github.io/parkside-catalog/en/products/pmfw-310-d2-345014/) | PMFW 310 D2 | Sawing & Cutting |
| [345153](https://informagico.github.io/parkside-catalog/en/products/pfbs-12-b3-345153/) | PFBS 12 B3 | Sanding & Grinding |
| [345154](https://informagico.github.io/parkside-catalog/en/products/pbsd-900-a1-345154/) | PBSD 900 A1 | Sanding & Grinding |
| [345318](https://informagico.github.io/parkside-catalog/en/products/pfsh-3-a2-345318/) | PFSH 3 A2 | Gardening |
| [345819](https://informagico.github.io/parkside-catalog/en/products/pof-1200-d3-345819/) | POF 1200 D3 | Sawing & Cutting |
| [345867](https://informagico.github.io/parkside-catalog/en/products/345867/) | Not identified | Workshop Equipment |
| [345881](https://informagico.github.io/parkside-catalog/en/products/pdst-10-b3-pdwe-8-b2-345881/) | PDST 10 B3 / PDWE 8 B2 | Workshop Equipment |
| [346064](https://informagico.github.io/parkside-catalog/en/products/pnkp-105-b1-346064/) | PNKP 105 B1 | Workshop Equipment |
| [346159](https://informagico.github.io/parkside-catalog/en/products/pap-20-a3-346159/) | PAP 20 A3 | Batteries |
| [346199](https://informagico.github.io/parkside-catalog/en/products/passk-20-li-a1-346199/) | PASSK 20-Li A1 | Drilling & Fastening |
| [346205](https://informagico.github.io/parkside-catalog/en/products/peh-30-c3-346205/) | PEH 30 C3 | Sawing & Cutting |
| [347905](https://informagico.github.io/parkside-catalog/en/products/pus-4-a1-347905/) | PUS 4 A1 | Sawing & Cutting |
| [351124](https://informagico.github.io/parkside-catalog/en/products/pws-230-d4-351124/) | PWS 230 D4 | Sanding & Grinding |
| [351750](https://informagico.github.io/parkside-catalog/en/products/pssa-20-li-a1-351750/) | PSSA 20-Li A1 | Sawing & Cutting |
| [351834](https://informagico.github.io/parkside-catalog/en/products/pas-4-c4-351834/) | PAS 4 C4 | Drilling & Fastening |
| [351899](https://informagico.github.io/parkside-catalog/en/products/papk-12-a3-351899/) | PAPK 12 A3 | Batteries |
| [351902](https://informagico.github.io/parkside-catalog/en/products/pdslg-12-a1-351902/) | PDSLG 12 A1 | Accessories |
| [352048](https://informagico.github.io/parkside-catalog/en/products/pfs-710-d3-352048/) | PFS 710 D3 | Sawing & Cutting |
| [352083](https://informagico.github.io/parkside-catalog/en/products/pbk-4-a2-352083/) | PBK 4 A2 | Gardening |
| [354654](https://informagico.github.io/parkside-catalog/en/products/pdslg-20-a1-354654/) | PDSLG 20 A1 | Accessories |
| [354733](https://informagico.github.io/parkside-catalog/en/products/pblg-52-a1-354733/) | PBLG 52 A1 | Gardening |
| [356005](https://informagico.github.io/parkside-catalog/en/products/pdrp-6-2-b2-356005/) | PDRP 6.2 B2 | Cleaning & Extraction |
| [356007](https://informagico.github.io/parkside-catalog/en/products/pdss-16-a1-pdts-6-3-b3-356007/) | PDSS 16 A1 / PDTS 6.3 B3 | Sanding & Grinding |
| [356035](https://informagico.github.io/parkside-catalog/en/products/pdslg-20-a1-356035/) | PDSLG 20 A1 | Accessories |
| [359201](https://informagico.github.io/parkside-catalog/en/products/pmka-20-li-a1-359201/) | PMKA 20-Li A1 | Sawing & Cutting |
| [359506](https://informagico.github.io/parkside-catalog/en/products/pagg-4-a1-359506/) | PAGG 4 A1 | Sanding & Grinding |
| [359697](https://informagico.github.io/parkside-catalog/en/products/plgk-12-a2-papk-12-a3-359697/) | PLGK 12 A2 / PAPK 12 A3 | Batteries |
| [359706](https://informagico.github.io/parkside-catalog/en/products/papk-12-a3-359706/) | PAPK 12 A3 | Batteries |
| [359772](https://informagico.github.io/parkside-catalog/en/products/pof-1200-d3-359772/) | POF 1200 D3 | Sawing & Cutting |
| [360098](https://informagico.github.io/parkside-catalog/en/products/pafs-550-a1-360098/) | PAFS 550 A1 | Workshop Equipment |
| [360169](https://informagico.github.io/parkside-catalog/en/products/pgd-1-a1-360169/) | PGD 1 A1 | Gardening |
| [360872](https://informagico.github.io/parkside-catalog/en/products/pwt-11-a1-360872/) | PWT 11 A1 | Gardening |
| [363935](https://informagico.github.io/parkside-catalog/en/products/pka-20-li-a1-363935/) | PKA 20-Li A1 | Workshop Equipment |
| [364106](https://informagico.github.io/parkside-catalog/en/products/paas-12-a2-364106/) | PAAS 12 A2 | Gardening |
| [364230](https://informagico.github.io/parkside-catalog/en/products/phz-3-a1-pss-2-a1-364230/) | PHZ 3 A1 / PSS 2 A1 | Workshop Equipment |
| [364419](https://informagico.github.io/parkside-catalog/en/products/pbsd-600-a1-364419/) | PBSD 600 A1 | Sanding & Grinding |
| [364686](https://informagico.github.io/parkside-catalog/en/products/passk-20-li-a1-364686/) | PASSK 20-Li A1 | Drilling & Fastening |
| [364705](https://informagico.github.io/parkside-catalog/en/products/pmb-1100-b2-364705/) | PMB 1100 B2 | Sawing & Cutting |
| [364873](https://informagico.github.io/parkside-catalog/en/products/pws-125-f6-364873/) | PWS 125 F6 | Sanding & Grinding |
| [364881](https://informagico.github.io/parkside-catalog/en/products/pgs-500-a1-364881/) | PGS 500 A1 | Sanding & Grinding |
| [364892](https://informagico.github.io/parkside-catalog/en/products/passp-20-li-a2-364892/) | PASSP 20-Li A2 | Drilling & Fastening |
| [364893](https://informagico.github.io/parkside-catalog/en/products/psbsap-20-li-b2-364893/) | PSBSAP 20-Li B2 | Drilling & Fastening |
| [364996](https://informagico.github.io/parkside-catalog/en/products/ptm-2-a1-pnm-2-a1-364996/) | PTM 2 A1 / PNM 2 A1 | Measuring & Detection |
| [365023](https://informagico.github.io/parkside-catalog/en/products/pdst-10-b3-pdwe-8-b2-365023/) | PDST 10 B3 / PDWE 8 B2 | Workshop Equipment |
| [365028](https://informagico.github.io/parkside-catalog/en/products/pdsp-1000-e6-365028/) | PDSP 1000 E6 | Workshop Equipment |
| [367231](https://informagico.github.io/parkside-catalog/en/products/psbsap-20-li-b2-367231/) | PSBSAP 20-Li B2 | Drilling & Fastening |
| [367467](https://informagico.github.io/parkside-catalog/en/products/pmfs-200-c3-367467/) | PMFS 200 C3 | Sanding & Grinding |
| [367471](https://informagico.github.io/parkside-catalog/en/products/pbh-800-a1-367471/) | PBH 800 A1 | Drilling & Fastening |
| [373087](https://informagico.github.io/parkside-catalog/en/products/pwbs-180-b3-373087/) | PWBS 180 B3 | Sanding & Grinding |
| [373104](https://informagico.github.io/parkside-catalog/en/products/pbsd-900-a1-373104/) | PBSD 900 A1 | Sanding & Grinding |
| [373118](https://informagico.github.io/parkside-catalog/en/products/pmfw-310-d2-pmfw-310-e3-373118/) | PMFW 310 D2 / PMFW 310 E3 | Sawing & Cutting |
| [373198](https://informagico.github.io/parkside-catalog/en/products/373198/) | Not identified | Drilling & Fastening |
| [373204](https://informagico.github.io/parkside-catalog/en/products/pdst-10-b3-pdwe-8-b2-373204/) | PDST 10 B3 / PDWE 8 B2 | Workshop Equipment |
| [373207](https://informagico.github.io/parkside-catalog/en/products/pdss-310-b5-373207/) | PDSS 310 B5 | Drilling & Fastening |
| [373216](https://informagico.github.io/parkside-catalog/en/products/pdrp-6-2-b2-373216/) | PDRP 6.2 B2 | Cleaning & Extraction |
| [373422](https://informagico.github.io/parkside-catalog/en/products/pthsa-20-li-b3-373422/) | PTHSA 20-Li B3 | Gardening |
| [373428](https://informagico.github.io/parkside-catalog/en/products/pap-20-b1-plg-20-c1-373428/) | PAP 20 B1 / PLG 20 C1 | Batteries |
| [373429](https://informagico.github.io/parkside-catalog/en/products/pahe-20-li-c3-373429/) | PAHE 20-Li C3 | Gardening |
| [373432](https://informagico.github.io/parkside-catalog/en/products/pat-20-li-a1-373432/) | PAT 20-Li A1 | Drilling & Fastening |
| [373436](https://informagico.github.io/parkside-catalog/en/products/phksa-20-li-a2-373436/) | PHKSA 20-Li A2 | Sawing & Cutting |
| [373493](https://informagico.github.io/parkside-catalog/en/products/pnkp-105-b1-373493/) | PNKP 105 B1 | Workshop Equipment |
| [373544](https://informagico.github.io/parkside-catalog/en/products/pms-160-b2-373544/) | PMS 160 B2 | Sanding & Grinding |
| [373563](https://informagico.github.io/parkside-catalog/en/products/pws-125-f6-373563/) | PWS 125 F6 | Sanding & Grinding |
| [373772](https://informagico.github.io/parkside-catalog/en/products/phsl-900-b4-373772/) | PHSL 900 B4 | Gardening |
| [373883](https://informagico.github.io/parkside-catalog/en/products/pfrs-1-5-b3-plprs-1-5-b3-373883/) | PFRS 1,5 B3 / PLPRS 1,5 B3 | Workshop Equipment |
| [374072](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-f7-374072/) | PABS 20-Li F7 | Drilling & Fastening |
| [374124](https://informagico.github.io/parkside-catalog/en/products/phsl-900-b4-374124/) | PHSL 900 B4 | Gardening |
| [376360](https://informagico.github.io/parkside-catalog/en/products/ptbs-30-a1-376360/) | PTBS 30 A1 | Gardening |
| [377764](https://informagico.github.io/parkside-catalog/en/products/pap-20-b1-plg-20-c1-377764/) | PAP 20 B1 / PLG 20 C1 | Batteries |
| [378347](https://informagico.github.io/parkside-catalog/en/products/paas-12-a2-378347/) | PAAS 12 A2 | Gardening |
| [378378](https://informagico.github.io/parkside-catalog/en/products/pblg-52-a1-378378/) | PBLG 52 A1 | Gardening |
| [378390](https://informagico.github.io/parkside-catalog/en/products/paas-12-a2-378390/) | PAAS 12 A2 | Gardening |
| [380532](https://informagico.github.io/parkside-catalog/en/products/pah-1300-b2-380532/) | PAH 1300 B2 | Drilling & Fastening |
| [380558](https://informagico.github.io/parkside-catalog/en/products/phz-3-a1-pss-2-b2-380558/) | PHZ 3 A1 / PSS 2 B2 | Workshop Equipment |
| [380691](https://informagico.github.io/parkside-catalog/en/products/pdfw-120-a2-380691/) | PDFW 120 A2 | Sanding & Grinding |
| [380744](https://informagico.github.io/parkside-catalog/en/products/pabh-20-li-c3-380744/) | PABH 20-Li C3 | Drilling & Fastening |
| [380745](https://informagico.github.io/parkside-catalog/en/products/pdssa-20-li-a1-380745/) | PDSSA 20-Li A1 | Drilling & Fastening |
| [380759](https://informagico.github.io/parkside-catalog/en/products/pka-20-li-b2-380759/) | PKA 20-Li B2 | Workshop Equipment |
| [380775](https://informagico.github.io/parkside-catalog/en/products/plg-20-c1-380775/) | PLG 20 C1 | Accessories |
| [380861](https://informagico.github.io/parkside-catalog/en/products/pdrw-1800-b1-380861/) | PDRW 1800 B1 | Workshop Equipment |
| [380862](https://informagico.github.io/parkside-catalog/en/products/pafs-550-a1-380862/) | PAFS 550 A1 | Workshop Equipment |
| [380865](https://informagico.github.io/parkside-catalog/en/products/pds-30-a1-380865/) | PDS 30 A1 | Workshop Equipment |
| [382536](https://informagico.github.io/parkside-catalog/en/products/pss-270-c3-pexs-270-c3-382536/) | PSS 270 C3 / PEXS 270 C3 | Sanding & Grinding |
| [382538](https://informagico.github.io/parkside-catalog/en/products/pns-300-b3-382538/) | PNS 300 B3 | Drilling & Fastening |
| [383460](https://informagico.github.io/parkside-catalog/en/products/pfs-710-d3-383460/) | PFS 710 D3 | Sawing & Cutting |
| [383689](https://informagico.github.io/parkside-catalog/en/products/pdsse-550-a1-383689/) | PDSSE 550 A1 | Drilling & Fastening |
| [384213](https://informagico.github.io/parkside-catalog/en/products/pkz-180-c5-384213/) | PKZ 180 C5 | Workshop Equipment |
| [384483](https://informagico.github.io/parkside-catalog/en/products/psbm-1100-b1-384483/) | PSBM 1100 B1 | Drilling & Fastening |
| [384506](https://informagico.github.io/parkside-catalog/en/products/pws-230-d4-384506/) | PWS 230 D4 | Sanding & Grinding |
| [384512](https://informagico.github.io/parkside-catalog/en/products/pbh-1050-c3-384512/) | PBH 1050 C3 | Drilling & Fastening |
| [385113](https://informagico.github.io/parkside-catalog/en/products/pfbs-160-b2-385113/) | PFBS 160 B2 | Sanding & Grinding |
| [385147](https://informagico.github.io/parkside-catalog/en/products/pet-25-c3-385147/) | PET 25 C3 | Drilling & Fastening |
| [385580](https://informagico.github.io/parkside-catalog/en/products/pwsa-20-li-c3-385580/) | PWSA 20-Li C3 | Sanding & Grinding |
| [385679](https://informagico.github.io/parkside-catalog/en/products/php-500-e3-385679/) | PHP 500 E3 | Workshop Equipment |
| [388272](https://informagico.github.io/parkside-catalog/en/products/par-12-a1-388272/) | PAR 12 A1 | Drilling & Fastening |
| [389431](https://informagico.github.io/parkside-catalog/en/products/pbmk-30-b2-389431/) | PBMK 30 B2 | Welding & Soldering |
| [390384](https://informagico.github.io/parkside-catalog/en/products/pps-200-c2-390384/) | PPS 200 C2 | Sanding & Grinding |
| [390411](https://informagico.github.io/parkside-catalog/en/products/pfbs-12-b6-390411/) | PFBS 12 B6 | Sanding & Grinding |
| [390483](https://informagico.github.io/parkside-catalog/en/products/pmb-1100-b2-390483/) | PMB 1100 B2 | Sawing & Cutting |
| [390989](https://informagico.github.io/parkside-catalog/en/products/plg-20-c3-390989/) | PLG 20 C3 | Accessories |
| [390993](https://informagico.github.io/parkside-catalog/en/products/pap-20-b1-plg-20-c1-390993/) | PAP 20 B1 / PLG 20 C1 | Batteries |
| [391004](https://informagico.github.io/parkside-catalog/en/products/pdssap-20-li-b3-391004/) | PDSSAP 20-Li B3 | Drilling & Fastening |
| [391006](https://informagico.github.io/parkside-catalog/en/products/pwsap-20-li-d4-391006/) | PWSAP 20-Li D4 | Sanding & Grinding |
| [391008](https://informagico.github.io/parkside-catalog/en/products/psbsap-20-li-b3-391008/) | PSBSAP 20-Li B3 | Drilling & Fastening |
| [391276](https://informagico.github.io/parkside-catalog/en/products/papk-12-c1-391276/) | PAPK 12 C1 | Batteries |
| [391280](https://informagico.github.io/parkside-catalog/en/products/plgk-12-a3-391280/) | PLGK 12 A3 | Accessories |
| [391282](https://informagico.github.io/parkside-catalog/en/products/papk-12-a3-391282/) | PAPK 12 A3 | Batteries |
| [391284](https://informagico.github.io/parkside-catalog/en/products/paap-12-c3-391284/) | PAAP 12 C3 | Sanding & Grinding |
| [391286](https://informagico.github.io/parkside-catalog/en/products/plla-12-b2-391286/) | PLLA 12 B2 | Workshop Equipment |
| [391290](https://informagico.github.io/parkside-catalog/en/products/plgk-12-a3-papk-12-a3-391290/) | PLGK 12 A3 / PAPK 12 A3 | Batteries |
| [391297](https://informagico.github.io/parkside-catalog/en/products/pwbsa-12-a1-391297/) | PWBSA 12 A1 | Drilling & Fastening |
| [391300](https://informagico.github.io/parkside-catalog/en/products/papk-12-b3-391300/) | PAPK 12 B3 | Batteries |
| [391510](https://informagico.github.io/parkside-catalog/en/products/pmfs-200-c3-391510/) | PMFS 200 C3 | Sanding & Grinding |
| [391511](https://informagico.github.io/parkside-catalog/en/products/pof-1200-d3-391511/) | POF 1200 D3 | Sawing & Cutting |
| [391623](https://informagico.github.io/parkside-catalog/en/products/putk-50-b1-391623/) | PUTK 50 B1 | Workshop Equipment |
| [392682](https://informagico.github.io/parkside-catalog/en/products/pws-125-f6-392682/) | PWS 125 F6 | Sanding & Grinding |
| [393480](https://informagico.github.io/parkside-catalog/en/products/pfmra-20-li-a1-393480/) | PFMRA 20-Li A1 | Workshop Equipment |
| [397421](https://informagico.github.io/parkside-catalog/en/products/pnkp-105-b1-397421/) | PNKP 105 B1 | Workshop Equipment |
| [398461](https://informagico.github.io/parkside-catalog/en/products/pwsa-20-li-c3-398461/) | PWSA 20-Li C3 | Sanding & Grinding |
| [399278](https://informagico.github.io/parkside-catalog/en/products/pwbs-180-b3-399278/) | PWBS 180 B3 | Sanding & Grinding |
| [402247](https://informagico.github.io/parkside-catalog/en/products/ppha-20-li-b2-402247/) | PPHA 20-Li B2 | Sawing & Cutting |
| [405768](https://informagico.github.io/parkside-catalog/en/products/pthsa-20-li-b3-405768/) | PTHSA 20-Li B3 | Gardening |
| [405829](https://informagico.github.io/parkside-catalog/en/products/ptsa-12-a1-405829/) | PTSA 12 A1 | Workshop Equipment |
| [406953](https://informagico.github.io/parkside-catalog/en/products/pfbs-160-c3-406953/) | PFBS 160 C3 | Sanding & Grinding |
| [408292](https://informagico.github.io/parkside-catalog/en/products/pbsa-12-f5-408292/) | PBSA 12 F5 | Drilling & Fastening |
| [413095](https://informagico.github.io/parkside-catalog/en/products/pwca-20-li-a1-413095/) | PWCA 20-Li A1 | Accessories |
| [413752](https://informagico.github.io/parkside-catalog/en/products/pssap-2028-a1-413752/) | PSSAP 2028 A1 | Sawing & Cutting |
| [414121](https://informagico.github.io/parkside-catalog/en/products/paas-12-a2-414121/) | PAAS 12 A2 | Gardening |
| [418086](https://informagico.github.io/parkside-catalog/en/products/pfsa-20-li-c3-418086/) | PFSA 20-Li C3 | Workshop Equipment |
| [418088](https://informagico.github.io/parkside-catalog/en/products/pdssa-20-li-b2-418088/) | PDSSA 20-Li B2 | Drilling & Fastening |
| [418477](https://informagico.github.io/parkside-catalog/en/products/prs2-a1-pws-2-a1-418477/) | PRS2 A1 / PWS 2 A1 | Workshop Equipment |
| [419956](https://informagico.github.io/parkside-catalog/en/products/pltw-3-a1-pkss-3-a1-pamw-3-a1-419956/) | PLTW 3 A1 / PKSS 3 A1 / PAMW 3 A1 | Workshop Equipment |
| [420425](https://informagico.github.io/parkside-catalog/en/products/pbh-1050-c3-420425/) | PBH 1050 C3 | Drilling & Fastening |
| [421297](https://informagico.github.io/parkside-catalog/en/products/pmfap-20-li-a1-421297/) | PMFAP 20-Li A1 | Sawing & Cutting |
| [421617](https://informagico.github.io/parkside-catalog/en/products/psbm-750-b3-421617/) | PSBM 750 B3 | Drilling & Fastening |
| [421948](https://informagico.github.io/parkside-catalog/en/products/pss-270-c3-pexs-270-c3-421948/) | PSS 270 C3 / PEXS 270 C3 | Sanding & Grinding |
| [422405](https://informagico.github.io/parkside-catalog/en/products/pkxa-2-a1-pkaz-2-a1-422405/) | PKXA 2 A1 / PKAZ 2 A1 | Workshop Equipment |
| [422547](https://informagico.github.io/parkside-catalog/en/products/pap-2-a1-422547/) | PAP 2 A1 | Workshop Equipment |
| [423076](https://informagico.github.io/parkside-catalog/en/products/pdnb-6-3-b2-423076/) | PDNB 6.3 B2 | Sawing & Cutting |
| [423081](https://informagico.github.io/parkside-catalog/en/products/pdt-40-h6-423081/) | PDT 40 H6 | Drilling & Fastening |
| [423419](https://informagico.github.io/parkside-catalog/en/products/peps-3-a1-423419/) | PEPS 3 A1 | Drilling & Fastening |
| [424876](https://informagico.github.io/parkside-catalog/en/products/pfbs-12-c7-424876/) | PFBS 12 C7 | Sanding & Grinding |
| [426020](https://informagico.github.io/parkside-catalog/en/products/ppha-20-li-b2-426020/) | PPHA 20-Li B2 | Sawing & Cutting |
| [426594](https://informagico.github.io/parkside-catalog/en/products/pmfs-200-c3-426594/) | PMFS 200 C3 | Sanding & Grinding |
| [427539](https://informagico.github.io/parkside-catalog/en/products/pps-200-c2-427539/) | PPS 200 C2 | Sanding & Grinding |
| [427540](https://informagico.github.io/parkside-catalog/en/products/psbm-750-b3-427540/) | PSBM 750 B3 | Drilling & Fastening |
| [427552](https://informagico.github.io/parkside-catalog/en/products/putk-50-b1-427552/) | PUTK 50 B1 | Workshop Equipment |
| [431133](https://informagico.github.io/parkside-catalog/en/products/pkhap-20-li-c3-431133/) | PKHAP 20-Li C3 | Drilling & Fastening |
| [434249](https://informagico.github.io/parkside-catalog/en/products/pphm-2-a1-ptdsm-2-a1-434249/) | PPHM 2 A1 / PTDSM 2 A1 | Measuring & Detection |
| [434255](https://informagico.github.io/parkside-catalog/en/products/ptm-2-b1-pnm-2-b1-434255/) | PTM 2 B1 / PNM 2 B1 | Measuring & Detection |
| [434653](https://informagico.github.io/parkside-catalog/en/products/prma-20-li-b2-434653/) | PRMA 20-Li B2 | Gardening |
| [434655](https://informagico.github.io/parkside-catalog/en/products/prpa-20-li-b2-434655/) | PRPA 20-Li B2 | Gardening |
| [434661](https://informagico.github.io/parkside-catalog/en/products/pahe-20-li-d4-434661/) | PAHE 20-Li D4 | Gardening |
| [434664](https://informagico.github.io/parkside-catalog/en/products/pksa-20-li-d4-434664/) | PKSA 20-Li D4 | Gardening |
| [434684](https://informagico.github.io/parkside-catalog/en/products/pthsa-20-li-c4-434684/) | PTHSA 20-Li C4 | Gardening |
| [435298](https://informagico.github.io/parkside-catalog/en/products/pms-160-b2-435298/) | PMS 160 B2 | Sanding & Grinding |
| [435321](https://informagico.github.io/parkside-catalog/en/products/pdsp-1000-e6-435321/) | PDSP 1000 E6 | Workshop Equipment |
| [436020](https://informagico.github.io/parkside-catalog/en/products/passk-20-li-c3-436020/) | PASSK 20-Li C3 | Drilling & Fastening |
| [436034](https://informagico.github.io/parkside-catalog/en/products/passk-20-li-c3-436034/) | PASSK 20-Li C3 | Drilling & Fastening |
| [436666](https://informagico.github.io/parkside-catalog/en/products/pfrs-1-5-b4-plprs-1-5-b4-436666/) | PFRS 1,5 B4 / PLPRS 1,5 B4 | Workshop Equipment |
| [436716](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-h9-436716/) | PABS 20-Li H9 | Drilling & Fastening |
| [436726](https://informagico.github.io/parkside-catalog/en/products/prks-264-a1-plvs-60-a1-plks-7-a1-pkss-22-a1-psss-450-a1-436726/) | PRKS 264 A1 / PLVS 60 A1 / PLKS 7 A1 / PKSS 22 A1 / PSSS 450 A1 | Accessories |
| [436735](https://informagico.github.io/parkside-catalog/en/products/pdam-300-a1-436735/) | PDAM 300 A1 | Measuring & Detection |
| [436755](https://informagico.github.io/parkside-catalog/en/products/pmnf-1500-b2-436755/) | PMNF 1500 B2 | Sawing & Cutting |
| [436778](https://informagico.github.io/parkside-catalog/en/products/paa-20-li-b3-436778/) | PAA 20-Li B3 | Accessories |
| [436783](https://informagico.github.io/parkside-catalog/en/products/psbsa-20-li-d4-436783/) | PSBSA 20-Li D4 | Drilling & Fastening |
| [436786](https://informagico.github.io/parkside-catalog/en/products/pwsa-20-li-f4-436786/) | PWSA 20-Li F4 | Sanding & Grinding |
| [437155](https://informagico.github.io/parkside-catalog/en/products/pnkp-105-c2-437155/) | PNKP 105 C2 | Workshop Equipment |
| [437460](https://informagico.github.io/parkside-catalog/en/products/pbspa-12-d4-437460/) | PBSPA 12 D4 | Drilling & Fastening |
| [437475](https://informagico.github.io/parkside-catalog/en/products/pbsd-900-a2-437475/) | PBSD 900 A2 | Sanding & Grinding |
| [437489](https://informagico.github.io/parkside-catalog/en/products/pwbs-180-b3-437489/) | PWBS 180 B3 | Sanding & Grinding |
| [437510](https://informagico.github.io/parkside-catalog/en/products/pbspa-12-d4-437510/) | PBSPA 12 D4 | Drilling & Fastening |
| [437518](https://informagico.github.io/parkside-catalog/en/products/pfbs-12-c7-437518/) | PFBS 12 C7 | Sanding & Grinding |
| [438488](https://informagico.github.io/parkside-catalog/en/products/pfdfa-20-li-a1-438488/) | PFDFA 20-Li A1 | Sawing & Cutting |
| [438492](https://informagico.github.io/parkside-catalog/en/products/pmts-180-b2-438492/) | PMTS 180 B2 | Sawing & Cutting |
| [438518](https://informagico.github.io/parkside-catalog/en/products/peh-30-d4-438518/) | PEH 30 D4 | Sawing & Cutting |
| [438572](https://informagico.github.io/parkside-catalog/en/products/palp-20-li-c3-pak-20-li-c3-438572/) | PALP 20-Li C3 / PAK 20-Li C3 | Workshop Equipment |
| [439414](https://informagico.github.io/parkside-catalog/en/products/passk-20-li-a1-439414/) | PASSK 20-Li A1 | Drilling & Fastening |
| [439550](https://informagico.github.io/parkside-catalog/en/products/plem-50-c4-439550/) | PLEM 50 C4 | Measuring & Detection |
| [443873](https://informagico.github.io/parkside-catalog/en/products/par-12-b2-443873/) | PAR 12 B2 | Drilling & Fastening |
| [443996](https://informagico.github.io/parkside-catalog/en/products/pwsa-20-li-e4-443996/) | PWSA 20-Li E4 | Sanding & Grinding |
| [444079](https://informagico.github.io/parkside-catalog/en/products/pbnsg-20-li-a1-444079/) | PBNSG 20-Li A1 | Drilling & Fastening |
| [445878](https://informagico.github.io/parkside-catalog/en/products/pfbs-160-c3-445878/) | PFBS 160 C3 | Sanding & Grinding |
| [445909](https://informagico.github.io/parkside-catalog/en/products/pfmr-1600-d5-445909/) | PFMR 1600 D5 | Workshop Equipment |
| [445966](https://informagico.github.io/parkside-catalog/en/products/pmfap-20-li-a1-445966/) | PMFAP 20-Li A1 | Sawing & Cutting |
| [445975](https://informagico.github.io/parkside-catalog/en/products/ppfsa-40-li-c2-445975/) | PPFSA 40-Li C2 | Gardening |
| [445985](https://informagico.github.io/parkside-catalog/en/products/pmk-550-c2-445985/) | PMK 550 C2 | Sawing & Cutting |
| [446001](https://informagico.github.io/parkside-catalog/en/products/pwsa-20-li-f4-446001/) | PWSA 20-Li F4 | Sanding & Grinding |
| [446011](https://informagico.github.io/parkside-catalog/en/products/prma-20-li-b2-446011/) | PRMA 20-Li B2 | Gardening |
| [446022](https://informagico.github.io/parkside-catalog/en/products/ptss-1200-e2-446022/) | PTSS 1200 E2 | Sawing & Cutting |
| [447863](https://informagico.github.io/parkside-catalog/en/products/peps-3-a1-447863/) | PEPS 3 A1 | Drilling & Fastening |
| [448902](https://informagico.github.io/parkside-catalog/en/products/pexs-480-a1-448902/) | PEXS 480 A1 | Sanding & Grinding |
| [449752](https://informagico.github.io/parkside-catalog/en/products/ppm-800-a1-449752/) | PPM 800 A1 | Sanding & Grinding |
| [449797](https://informagico.github.io/parkside-catalog/en/products/pss-270-c3-pms-200-a1-pexs-270-c3-449797/) | PSS 270 C3 / PMS 200 A1 / PEXS 270 C3 | Sanding & Grinding |
| [449833](https://informagico.github.io/parkside-catalog/en/products/psm-2-b4-pzm-2-b4-449833/) | PSM 2 B4 / PZM 2 B4 | Measuring & Detection |
| [449872](https://informagico.github.io/parkside-catalog/en/products/pdssa-20-li-b2-449872/) | PDSSA 20-Li B2 | Drilling & Fastening |
| [449880](https://informagico.github.io/parkside-catalog/en/products/ptbsa-20-li-b2-449880/) | PTBSA 20-Li B2 | Drilling & Fastening |
| [449881](https://informagico.github.io/parkside-catalog/en/products/pdslg-20-a1-449881/) | PDSLG 20 A1 | Accessories |
| [449886](https://informagico.github.io/parkside-catalog/en/products/pabs-20-li-h9-449886/) | PABS 20-Li H9 | Drilling & Fastening |
| [449894](https://informagico.github.io/parkside-catalog/en/products/pbsda-20-li-a1-449894/) | PBSDA 20-Li A1 | Sanding & Grinding |
| [449895](https://informagico.github.io/parkside-catalog/en/products/pts-20-li-b2-449895/) | PTS 20-Li B2 | Sawing & Cutting |
| [449937](https://informagico.github.io/parkside-catalog/en/products/pthsa-20-li-c4-449937/) | PTHSA 20-Li C4 | Gardening |
| [449942](https://informagico.github.io/parkside-catalog/en/products/pksa-20-li-d4-449942/) | PKSA 20-Li D4 | Gardening |
| [449943](https://informagico.github.io/parkside-catalog/en/products/pptlba-40-li-c3-449943/) | PPTLBA 40-Li C3 | Gardening |
| [449950](https://informagico.github.io/parkside-catalog/en/products/paghs-20-li-a1-449950/) | PAGHS 20-Li A1 | Gardening |
| [449979](https://informagico.github.io/parkside-catalog/en/products/pdssap-12-a1-449979/) | PDSSAP 12 A1 | Drilling & Fastening |
| [449981](https://informagico.github.io/parkside-catalog/en/products/papk-12-2-5-a1-plgk-12-6-0-a1-449981/) | PAPK 12 2.5 A1 / PLGK 12 6.0 A1 | Batteries |
| [449982](https://informagico.github.io/parkside-catalog/en/products/pbhap-12-a1-449982/) | PBHAP 12 A1 | Drilling & Fastening |
| [449985](https://informagico.github.io/parkside-catalog/en/products/phksap-12-a1-449985/) | PHKSAP 12 A1 | Sawing & Cutting |
| [449990](https://informagico.github.io/parkside-catalog/en/products/psbsap-12-a1-449990/) | PSBSAP 12 A1 | Drilling & Fastening |
| [449991](https://informagico.github.io/parkside-catalog/en/products/ppmfwa-12-a1-449991/) | PPMFWA 12 A1 | Sawing & Cutting |
| [450084](https://informagico.github.io/parkside-catalog/en/products/pmsa-4-a1-450084/) | PMSA 4 A1 | Sawing & Cutting |
| [450951](https://informagico.github.io/parkside-catalog/en/products/prrs-2-a1-450951/) | PRRS 2 A1 | Cleaning & Extraction |
| [453157](https://informagico.github.io/parkside-catalog/en/products/pblg-52-a1-453157/) | PBLG 52 A1 | Gardening |
| [453246](https://informagico.github.io/parkside-catalog/en/products/pds-30-b1-453246/) | PDS 30 B1 | Workshop Equipment |
| [455497](https://informagico.github.io/parkside-catalog/en/products/pksp-50-a1-455497/) | PKSP 50 A1 | Welding & Soldering |
| [455502](https://informagico.github.io/parkside-catalog/en/products/pfbsa-4-a1-455502/) | PFBSA 4 A1 | Sanding & Grinding |
| [456543](https://informagico.github.io/parkside-catalog/en/products/paexsg-20-li-a1-pamsg-20-li-a1-456543/) | PAEXSG 20-Li A1 / PAMSG 20-Li A1 | Sanding & Grinding |
| [457925](https://informagico.github.io/parkside-catalog/en/products/plk-60-a1-457925/) | PLK 60 A1 | Welding & Soldering |
| [458062](https://informagico.github.io/parkside-catalog/en/products/pgsa-14-a1-458062/) | PGSA 14 A1 | Gardening |
| [458678](https://informagico.github.io/parkside-catalog/en/products/pps-200-c2-458678/) | PPS 200 C2 | Sanding & Grinding |
| [458698](https://informagico.github.io/parkside-catalog/en/products/pfbs-12-c7-458698/) | PFBS 12 C7 | Sanding & Grinding |
| [458701](https://informagico.github.io/parkside-catalog/en/products/phlls-745-a1-458701/) | PHLLS 745 A1 | Welding & Soldering |
| [458710](https://informagico.github.io/parkside-catalog/en/products/pbnz-4-e3-458710/) | PBNZ 4 E3 | Drilling & Fastening |
| [458752](https://informagico.github.io/parkside-catalog/en/products/ppha-20-li-b2-458752/) | PPHA 20-Li B2 | Sawing & Cutting |
| [458763](https://informagico.github.io/parkside-catalog/en/products/pbsp-3-a1-458763/) | PBSP 3 A1 | Drilling & Fastening |
| [458937](https://informagico.github.io/parkside-catalog/en/products/pels-3-b1-pll-2-a1-458937/) | PELS 3 B1 / PLL 2 A1 | Welding & Soldering |
| [463217](https://informagico.github.io/parkside-catalog/en/products/psrb-31-a1-463217/) | PSRB 31 A1 | Drilling & Fastening |
| [465512](https://informagico.github.io/parkside-catalog/en/products/pmfw-310-h5-465512/) | PMFW 310 H5 | Sawing & Cutting |
| [466813](https://informagico.github.io/parkside-catalog/en/products/pma-4-b2-466813/) | PMA 4 B2 | Measuring & Detection |
| [470756](https://informagico.github.io/parkside-catalog/en/products/pkhap-20-li-1-9j-a1-470756/) | PKHAP 20-Li 1.9J A1 | Drilling & Fastening |
| [471015](https://informagico.github.io/parkside-catalog/en/products/pof-1200-e4-471015/) | POF 1200 E4 | Sawing & Cutting |
| [474595](https://informagico.github.io/parkside-catalog/en/products/pmk-550-c2-474595/) | PMK 550 C2 | Sawing & Cutting |
| [475325](https://informagico.github.io/parkside-catalog/en/products/pdsp-1000-e6-pdrp-6-2-b2-475325/) | PDSP 1000 E6 / PDRP 6.2 B2 | Workshop Equipment |
| [497642](https://informagico.github.io/parkside-catalog/en/products/paa-20-li-b2-497642/) | PAA 20-Li B2 | Accessories |
| [497672](https://informagico.github.io/parkside-catalog/en/products/pthsa-20-li-c4-497672/) | PTHSA 20-Li C4 | Gardening |
| [497683](https://informagico.github.io/parkside-catalog/en/products/pahe-20-li-d4-497683/) | PAHE 20-Li D4 | Gardening |
| [499626](https://informagico.github.io/parkside-catalog/en/products/pfs-450-a1-499626/) | PFS 450 A1 | Workshop Equipment |
| [499895](https://informagico.github.io/parkside-catalog/en/products/pmfw-310-f4-499895/) | PMFW 310 F4 | Sawing & Cutting |
| [499896](https://informagico.github.io/parkside-catalog/en/products/pwbs-180-b3-499896/) | PWBS 180 B3 | Sanding & Grinding |
| [499897](https://informagico.github.io/parkside-catalog/en/products/psss-450-a1-499897/) | PSSS 450 A1 | Accessories |
| [499911](https://informagico.github.io/parkside-catalog/en/products/pbsd-900-a2-499911/) | PBSD 900 A2 | Sanding & Grinding |
| [96269](https://informagico.github.io/parkside-catalog/en/products/pamfw-10-8-a1-96269/) | PAMFW 10.8 A1 | Sawing & Cutting |

## Updated IANs

| IAN | Model | Category |
| --- | --- | --- |
| [302268](https://informagico.github.io/parkside-catalog/en/products/pap-20-a1-302268/) | PAP 20 A1 | Batteries |
| [328030](https://informagico.github.io/parkside-catalog/en/products/pfbs-12-b4-328030/) | PFBS 12 B4 | Sanding & Grinding |
| [329697](https://informagico.github.io/parkside-catalog/en/products/psbsap-20-li-a1-329697/) | PSBSAP 20-Li A1 | Drilling & Fastening |
| [346156](https://informagico.github.io/parkside-catalog/en/products/plg-20-a1-346156/) | PLG 20 A1 | Accessories |
| [346166](https://informagico.github.io/parkside-catalog/en/products/pat-20-li-a1-346166/) | PAT 20-Li A1 | Drilling & Fastening |
| [351898](https://informagico.github.io/parkside-catalog/en/products/pamfw-12-c3-351898/) | PAMFW 12 C3 | Sawing & Cutting |
| [354661](https://informagico.github.io/parkside-catalog/en/products/pfsa-20-li-a1-354661/) | PFSA 20-Li A1 | Workshop Equipment |
| [360584](https://informagico.github.io/parkside-catalog/en/products/pdssa-20-li-a1-360584/) | PDSSA 20-Li A1 | Drilling & Fastening |
| [364886](https://informagico.github.io/parkside-catalog/en/products/pdssap-20-li-b2-364886/) | PDSSAP 20-Li B2 | Drilling & Fastening |
| [364899](https://informagico.github.io/parkside-catalog/en/products/pkhap-20-li-a1-364899/) | PKHAP 20-Li A1 | Drilling & Fastening |
| [365033](https://informagico.github.io/parkside-catalog/en/products/pdss-13-d4-365033/) | PDSS 13 D4 | Workshop Equipment |
| [367688](https://informagico.github.io/parkside-catalog/en/products/pwbsa-12-a1-367688/) | PWBSA 12 A1 | Drilling & Fastening |
| [373210](https://informagico.github.io/parkside-catalog/en/products/pmts-180-a1-373210/) | PMTS 180 A1 | Sawing & Cutting |
| [378345](https://informagico.github.io/parkside-catalog/en/products/phsl-900-b4-378345/) | PHSL 900 B4 | Gardening |
| [380747](https://informagico.github.io/parkside-catalog/en/products/pahe-20-li-c3-380747/) | PAHE 20-Li C3 | Gardening |
| [382535](https://informagico.github.io/parkside-catalog/en/products/pbsd-600-a1-382535/) | PBSD 600 A1 | Sanding & Grinding |
| [385628](https://informagico.github.io/parkside-catalog/en/products/pamfw-12-d4-385628/) | PAMFW 12 D4 | Sawing & Cutting |
| [388274](https://informagico.github.io/parkside-catalog/en/products/pva-20-li-a1-388274/) | PVA 20-Li A1 | Workshop Equipment |
| [389831](https://informagico.github.io/parkside-catalog/en/products/pbh-800-a1-389831/) | PBH 800 A1 | Drilling & Fastening |
| [390498](https://informagico.github.io/parkside-catalog/en/products/psbm-750-b3-390498/) | PSBM 750 B3 | Drilling & Fastening |
| [391002](https://informagico.github.io/parkside-catalog/en/products/passp-20-li-a3-391002/) | PASSP 20-Li A3 | Drilling & Fastening |
| [391011](https://informagico.github.io/parkside-catalog/en/products/psbsap-20-li-b3-391011/) | PSBSAP 20-Li B3 | Drilling & Fastening |
| [402248](https://informagico.github.io/parkside-catalog/en/products/pwsap-40-li-a1-402248/) | PWSAP 40-Li A1 | Sanding & Grinding |
| [405828](https://informagico.github.io/parkside-catalog/en/products/pams-12-a1-405828/) | PAMS 12 A1 | Sanding & Grinding |
| [413096](https://informagico.github.io/parkside-catalog/en/products/prsa-20-li-a1-413096/) | PRSA 20-Li A1 | Sawing & Cutting |
| [420423](https://informagico.github.io/parkside-catalog/en/products/pasa-20-li-b2-420423/) | PASA 20-Li B2 | Gardening |
| [436793](https://informagico.github.io/parkside-catalog/en/products/pmba-20-li-b2-436793/) | PMBA 20-Li B2 | Sawing & Cutting |
| [449919](https://informagico.github.io/parkside-catalog/en/products/pwds-920-c3-449919/) | PWDS 920 C3 | Sanding & Grinding |
| [449944](https://informagico.github.io/parkside-catalog/en/products/pahe-20-li-d4-449944/) | PAHE 20-Li D4 | Gardening |
| [449994](https://informagico.github.io/parkside-catalog/en/products/ppwsa-12-a1-449994/) | PPWSA 12 A1 | Sanding & Grinding |
| [450674](https://informagico.github.io/parkside-catalog/en/products/pbsae-12-a1-450674/) | PBSAE 12 A1 | Drilling & Fastening |
| [457889](https://informagico.github.io/parkside-catalog/en/products/pbmk-30-b2-457889/) | PBMK 30 B2 | Welding & Soldering |
| [458726](https://informagico.github.io/parkside-catalog/en/products/pof-1200-e4-458726/) | POF 1200 E4 | Sawing & Cutting |
| [458727](https://informagico.github.io/parkside-catalog/en/products/pmfs-200-c3-458727/) | PMFS 200 C3 | Sanding & Grinding |
| [458729](https://informagico.github.io/parkside-catalog/en/products/pfdf-900-c3-458729/) | PFDF 900 C3 | Sawing & Cutting |
| [458746](https://informagico.github.io/parkside-catalog/en/products/pgs-500-c2-458746/) | PGS 500 C2 | Sanding & Grinding |
| [458758](https://informagico.github.io/parkside-catalog/en/products/pdslg-20-b2-458758/) | PDSLG 20 B2 | Accessories |
| [458784](https://informagico.github.io/parkside-catalog/en/products/pkhap-20-li-c4-458784/) | PKHAP 20-Li C4 | Drilling & Fastening |
| [463276](https://informagico.github.io/parkside-catalog/en/products/pwbs-180-b3-463276/) | PWBS 180 B3 | Sanding & Grinding |
| [463350](https://informagico.github.io/parkside-catalog/en/products/ppmf-710-a1-463350/) | PPMF 710 A1 | Sawing & Cutting |
| [463369](https://informagico.github.io/parkside-catalog/en/products/pbfa-20-li-a1-463369/) | PBFA 20-Li A1 | Sanding & Grinding |
| [463551](https://informagico.github.io/parkside-catalog/en/products/pks-1100-a1-463551/) | PKS 1100 A1 | Workshop Equipment |
| [465513](https://informagico.github.io/parkside-catalog/en/products/pbsd-900-a2-465513/) | PBSD 900 A2 | Sanding & Grinding |
| [465536](https://informagico.github.io/parkside-catalog/en/products/pwsa-20-li-f4-465536/) | PWSA 20-Li F4 | Sanding & Grinding |
| [465600](https://informagico.github.io/parkside-catalog/en/products/pmts-180-c3-465600/) | PMTS 180 C3 | Sawing & Cutting |
| [465640](https://informagico.github.io/parkside-catalog/en/products/pmnf-1500-b2-465640/) | PMNF 1500 B2 | Sawing & Cutting |
| [465655](https://informagico.github.io/parkside-catalog/en/products/peh-30-e5-465655/) | PEH 30 E5 | Sawing & Cutting |
| [465828](https://informagico.github.io/parkside-catalog/en/products/prpa-20-li-b3-465828/) | PRPA 20-Li B3 | Gardening |
| [465844](https://informagico.github.io/parkside-catalog/en/products/pthsa-20-li-c4-465844/) | PTHSA 20-Li C4 | Gardening |
| [470632](https://informagico.github.io/parkside-catalog/en/products/pwbs-180-b3-470632/) | PWBS 180 B3 | Sanding & Grinding |
| [471090](https://informagico.github.io/parkside-catalog/en/products/peh-30-d4-471090/) | PEH 30 D4 | Sawing & Cutting |
| [471871](https://informagico.github.io/parkside-catalog/en/products/pbs-2-e5-471871/) | PBS 2 E5 | Gardening |
| [471947](https://informagico.github.io/parkside-catalog/en/products/pfmr-1600-e5-471947/) | PFMR 1600 E5 | Workshop Equipment |
| [472003](https://informagico.github.io/parkside-catalog/en/products/pmfap-20-li-a1-472003/) | PMFAP 20-Li A1 | Sawing & Cutting |
| [472005](https://informagico.github.io/parkside-catalog/en/products/ppfsa-40-li-d3-472005/) | PPFSA 40-Li D3 | Gardening |
| [472021](https://informagico.github.io/parkside-catalog/en/products/pmk-550-c2-472021/) | PMK 550 C2 | Sawing & Cutting |
| [472039](https://informagico.github.io/parkside-catalog/en/products/parm-20-li-a1-472039/) | PARM 20-Li A1 | Gardening |
| [472053](https://informagico.github.io/parkside-catalog/en/products/pbnsg-20-li-a1-472053/) | PBNSG 20-Li A1 | Drilling & Fastening |
| [478560](https://informagico.github.io/parkside-catalog/en/products/pgsa-14-a1-478560/) | PGSA 14 A1 | Gardening |
| [479065](https://informagico.github.io/parkside-catalog/en/products/pblg-52-a1-479065/) | PBLG 52 A1 | Gardening |
| [479364](https://informagico.github.io/parkside-catalog/en/products/pdssa-20-li-b2-479364/) | PDSSA 20-Li B2 | Drilling & Fastening |
| [479551](https://informagico.github.io/parkside-catalog/en/products/pwbs-180-b3-479551/) | PWBS 180 B3 | Sanding & Grinding |
| [480222](https://informagico.github.io/parkside-catalog/en/products/ppm-800-a1-480222/) | PPM 800 A1 | Sanding & Grinding |
| [480685](https://informagico.github.io/parkside-catalog/en/products/pss-270-c3-pms-220-a1-pexs-300-c3-480685/) | PSS 270 C3 / PMS 220 A1 / PEXS 300 C3 | Sanding & Grinding |
| [480698](https://informagico.github.io/parkside-catalog/en/products/pof-1200-e4-480698/) | POF 1200 E4 | Sawing & Cutting |
| [480898](https://informagico.github.io/parkside-catalog/en/products/pdssap-12-a1-480898/) | PDSSAP 12 A1 | Drilling & Fastening |
| [480900](https://informagico.github.io/parkside-catalog/en/products/pbhap-12-a1-480900/) | PBHAP 12 A1 | Drilling & Fastening |
| [480904](https://informagico.github.io/parkside-catalog/en/products/psbsap-12-a1-480904/) | PSBSAP 12 A1 | Drilling & Fastening |
| [480905](https://informagico.github.io/parkside-catalog/en/products/ppmfwa-12-a1-480905/) | PPMFWA 12 A1 | Sawing & Cutting |
| [480906](https://informagico.github.io/parkside-catalog/en/products/ppwsa-12-a1-480906/) | PPWSA 12 A1 | Sanding & Grinding |
| [480993](https://informagico.github.io/parkside-catalog/en/products/pthsa-20-li-d5-480993/) | PTHSA 20-Li D5 | Gardening |
| [480996](https://informagico.github.io/parkside-catalog/en/products/pahe-20-li-e5-480996/) | PAHE 20-Li E5 | Gardening |
| [481000](https://informagico.github.io/parkside-catalog/en/products/pptlba-40-li-c3-481000/) | PPTLBA 40-Li C3 | Gardening |
| [482150](https://informagico.github.io/parkside-catalog/en/products/pbs-2-e5-482150/) | PBS 2 E5 | Gardening |
| [484591](https://informagico.github.io/parkside-catalog/en/products/pfbs-12-c7-484591/) | PFBS 12 C7 | Sanding & Grinding |
| [485297](https://informagico.github.io/parkside-catalog/en/products/phlgd-2000-d5-485297/) | PHLGD 2000 D5 | Workshop Equipment |
| [485315](https://informagico.github.io/parkside-catalog/en/products/pmk-550-c2-485315/) | PMK 550 C2 | Sawing & Cutting |
| [485598](https://informagico.github.io/parkside-catalog/en/products/ppha-20-li-c3-485598/) | PPHA 20-Li C3 | Sawing & Cutting |
| [485948](https://informagico.github.io/parkside-catalog/en/products/ppfbsa-12-b2-485948/) | PPFBSA 12 B2 | Sanding & Grinding |
| [486220](https://informagico.github.io/parkside-catalog/en/products/pmfs-200-c3-486220/) | PMFS 200 C3 | Sanding & Grinding |
| [488465](https://informagico.github.io/parkside-catalog/en/products/pfbs-12-c7-488465/) | PFBS 12 C7 | Sanding & Grinding |
| [490352](https://informagico.github.io/parkside-catalog/en/products/pstd-350-a1-490352/) | PSTD 350 A1 | Sawing & Cutting |
| [490924](https://informagico.github.io/parkside-catalog/en/products/pms-160-b2-490924/) | PMS 160 B2 | Sanding & Grinding |
| [491252](https://informagico.github.io/parkside-catalog/en/products/pams-12-b2-491252/) | PAMS 12 B2 | Sanding & Grinding |
| [494223](https://informagico.github.io/parkside-catalog/en/products/prpa-20-li-b3-494223/) | PRPA 20-Li B3 | Gardening |
| [494636](https://informagico.github.io/parkside-catalog/en/products/pmts-180-b2-494636/) | PMTS 180 B2 | Sawing & Cutting |
| [494816](https://informagico.github.io/parkside-catalog/en/products/ppmf-710-a1-494816/) | PPMF 710 A1 | Sawing & Cutting |
| [495493](https://informagico.github.io/parkside-catalog/en/products/pehsl-800-a1-495493/) | PEHSL 800 A1 | Gardening |
| [495695](https://informagico.github.io/parkside-catalog/en/products/ppafs-40-li-a1-495695/) | PPAFS 40-Li A1 | Gardening |
| [496197](https://informagico.github.io/parkside-catalog/en/products/pbsae-12-a1-496197/) | PBSAE 12 A1 | Drilling & Fastening |
| [496218](https://informagico.github.io/parkside-catalog/en/products/pmnf-1500-b2-496218/) | PMNF 1500 B2 | Sawing & Cutting |
| [496297](https://informagico.github.io/parkside-catalog/en/products/pbfa-20-li-a1-496297/) | PBFA 20-Li A1 | Sanding & Grinding |
| [500084](https://informagico.github.io/parkside-catalog/en/products/pwbs-180-b3-500084/) | PWBS 180 B3 | Sanding & Grinding |
| [502092](https://informagico.github.io/parkside-catalog/en/products/pbs-750-a1-502092/) | PBS 750 A1 | Sanding & Grinding |
| [508088](https://informagico.github.io/parkside-catalog/en/products/pbk-4-d5-508088/) | PBK 4 D5 | Gardening |
| [508093](https://informagico.github.io/parkside-catalog/en/products/pbs-2-f6-508093/) | PBS 2 F6 | Gardening |
| [508292](https://informagico.github.io/parkside-catalog/en/products/pams-12-b2-508292/) | PAMS 12 B2 | Sanding & Grinding |
| [515642](https://informagico.github.io/parkside-catalog/en/products/pdssa-20-li-c3-515642/) | PDSSA 20-Li C3 | Drilling & Fastening |
| [516298](https://informagico.github.io/parkside-catalog/en/products/ppm-800-a1-516298/) | PPM 800 A1 | Sanding & Grinding |
| [516377](https://informagico.github.io/parkside-catalog/en/products/parp-20-li-b2-516377/) | PARP 20-Li B2 | Drilling & Fastening |
| [518250](https://informagico.github.io/parkside-catalog/en/products/pata-20-li-a1-518250/) | PATA 20-Li A1 | Gardening |
| [525467](https://informagico.github.io/parkside-catalog/en/products/pms-160-b2-525467/) | PMS 160 B2 | Sanding & Grinding |
| [550424](https://informagico.github.io/parkside-catalog/en/products/pbsae-12-a1-550424/) | PBSAE 12 A1 | Drilling & Fastening |

## Existing translations awaiting human review

328030, 329697, 346156, 346166, 351898, 354661, 360584, 364886, 364899, 365033, 367688, 373210, 378345, 380747, 382535, 385628, 388274, 389831, 390498, 391002, 391011, 402248, 405828, 413096, 420423, 436793, 449919, 449944, 449994, 450674, 457889, 458726, 458727, 458729, 458746, 458758, 458784, 463276, 463350, 463369, 463551, 465513, 465536, 465600, 465640, 465655, 465828, 465844, 470632, 471090, 471871, 471947, 472003, 472005, 472021, 472039, 472053, 478560, 479065, 479364, 479551, 480222, 480685, 480698, 480898, 480900, 480904, 480905, 480906, 480993, 480996, 481000, 482150, 484591, 485297, 485315, 485598, 485948, 486220, 488465, 490352, 490924, 491252, 494223, 494636, 494816, 495493, 495695, 496197, 496218, 496297, 500084, 502092, 508088, 508093, 508292, 515642, 516298, 516377, 518250, 525467, 550424.

## Reference entry points

- [Official Kompernass Parkside listing](https://www.kompernass.com/it/parkside).
- [Official Kompernass manual service](https://service.kompernass.com/).
- [Official Parkside manual search](https://parkside-diy.com/it/assistenza/manuals).

Per-IAN shop and manual references are retained in optional product metadata. Research HTML, extracted text, downloaded PDFs and preparation scripts are cached locally and excluded from version control. Product pages render product information and optional PDF manuals without research notes or collection-site citations.
