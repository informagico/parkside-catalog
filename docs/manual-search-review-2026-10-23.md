# Manual discovery and catalog review — 23 October 2026

The `codex/find-missing-manuals` branch was run locally against the official Italian Parkside manual search. Discovery required Internet access; downloaded PDFs and subsequent inspection were kept in the ignored local cache. The research command does not edit product records or run during website builds.

## Discovery results

| Outcome | IANs |
| --- | ---: |
| Searched from the original incomplete-record queue | 2023 |
| Candidate PDF found and downloaded | 473 |
| No exact result in the Italian service | 1550 |
| Lookup or download errors after retry | 0 |
| Unsupported or ambiguous service responses after retry | 0 |

The first pass left 21 results for review because their URLs used historical folders on the same official media host. After checking those paths, the client was updated to support them and only those IANs were retried. The final 473 cached PDFs passed signature and SHA-256 checks. A search result establishes document availability, not complete technical or manufacturer verification. The 1,550 empty results do not prove that no manual exists elsewhere.

## Applied content review

Updated 85 of the catalog's 2665 product files after checking the relevant documents:

- Added 76 manual links and replaced 3 links with the editions used for technical review.
- Added 34 manufacturer attributions from explicit declarations of conformity for the corresponding IAN and model. Historical Grizzly Gartengeräte and Grizzly Tools declarations retain their distinct legal names. Importer, service and warranty addresses alone were not used.
- Added or corrected 10 model codes and enriched specifications in 19 records. Page references remain in optional product metadata.
- Preserved IAN strings, file names, product-page URLs, categories, OEM values and images. Product prose describes the documented product; research metadata is not displayed on product pages.
- Added the maintainer-approved shared power label `Replaceable batteries` / `Batterie sostituibili`; the individual battery types and quantities appear in specifications.

The English changes initially made 44 existing Italian translations outdated. Their fingerprints were not refreshed during the manual review. The site holds outdated translations back and displays English with its review notice until a human reviews them. The catalog localization test now verifies this fallback rather than requiring all translations to be current.

The maintainer subsequently approved the Italian titles and descriptions for IANs 546429, 546419, 546416, 540257 and 540704 in chat. Those five translations were updated and their fingerprints refreshed with `npm.cmd run translation -- IAN it --reviewed`. Their optional documentary references remain in English. After this first batch, 39 translations remained outdated.

The maintainer then explicitly authorized updating and approving all 39 remaining translations as a batch. They were aligned with the current English records: 14 titles/descriptions were updated, 31 documentary references were translated, and English qualifiers in specification values were translated where needed. The standard `--reviewed` command recorded the batch approval for each IAN. All 44 translations affected by this manual review are now current.

### Model identification

| IAN | Previous catalog model | Documented model |
| --- | --- | --- |
| 492558 | — | PAPS 208 A1 |
| 521603 | — | HG13534 |
| 523143 | — | HG14911 |
| 523320 | — | WWS-HKP15-F01 |
| 540173 | — | HG14524 |
| 546416 | PKLL 7 F6 / PLEM 20 B5 20 | PLEM 20 B5 |
| 509622 | PKLL 7 F7 / PLEM 20 B6 | PLEM 20 B6 |
| 516654 | PMFD A3 / PFMG A3 | PFMG A3 |
| 520945 | PMS 220 A1 / PSS 270 C3 / PEXS 300 C3 | PEXS 300 C3 |
| 516655 | PZM 2 B4 / PSM 2 B4 | PZM 2 |

Assortment entries were narrowed to the model identified in the available exact-IAN manual. This review does not document every other possible assortment variant.

### Review boundaries

- IAN 488387 remains unchanged: the returned drill manual does not establish specifications for the complete seven-piece kit.
- IAN 514969 remains unchanged: the returned document did not clearly establish the operating-manual scope for the catalog entry.
- IAN 515653 retains its unresolved model variants: the document covers more than one generation.
- Other discovered PDFs remain research candidates. Technical values and manufacturer evidence were not copied between IANs, and all 473 documents have not received an exhaustive content review.

## Reproduce locally

```powershell
npm.cmd run manuals -- --all --download --delay-ms 500
```

The original full run and the historical-path retry are consolidated in `.cache/manual-search/reviewed-full-scan-report.json` and `.md`. Per-IAN results and PDFs remain under `.cache/manual-search/`. Those ignored research files are not committed or bundled into the site. The latest normal `report.json` / `report.md` cover only the most recent command invocation. See [the manual-search workflow](manual-search.md) for selection, caching, retries and review requirements.

## Validation

- `npm.cmd run build`: both languages generated successfully.
- `npm.cmd test`: all 31 tests passed.
- `npm.cmd run audit`: no consistency or classification warnings.
- Checked the 170 generated pages for the 85 changed products in both languages: manual links, stale-translation notices, English fallback, the approved shared label and manufacturer-only identity sections. Research metadata was absent from page content.
- Checked cached PDF signatures and hashes, exact source-URL membership, technical page bounds, unchanged IANs/categories/images/OEM values and the unchanged total of 2,665 products.
- After the final translation approval, checked all 39 additional Italian pages, their translated specification values and unchanged English sources. No outdated Italian translation fingerprints remain.

## Updated records

| IAN | Changed content |
| --- | --- |
| [546429](../content/products/pabs-20-li-i9-546429.md) | manual added; manufacturer declaration; specifications; description |
| [546419](../content/products/pbssa-20-li-b1-546419.md) | manual added; manufacturer declaration; specifications; description |
| [546416](../content/products/pkll-7-f6-plem-20-b5-20-546416.md) | manual edition; model; specifications; description; power |
| [545261](../content/products/pap-202-a1-plg-20-c1-545261.md) | manual added; specifications |
| [545252](../content/products/ian-545252-545252.md) | specifications; description; power |
| [540704](../content/products/pws-115-c3-540704.md) | manual added; manufacturer declaration; specifications; description |
| [540257](../content/products/psbsa-20-li-c3-540257.md) | manual added; manufacturer declaration; specifications; description |
| [540173](../content/products/ian-540173-540173.md) | manual added; model |
| [527933](../content/products/pat-4-d6-527933.md) | manual added |
| [523333](../content/products/pmcdp-a1-523333.md) | manual added |
| [523320](../content/products/ian-523320-523320.md) | manual added; model; specifications; description |
| [523313](../content/products/pmfw-250-a1-523313.md) | manual added; manufacturer declaration; specifications; description |
| [523312](../content/products/psbm-500-e5-523312.md) | manual added; manufacturer declaration; specifications; description |
| [523160](../content/products/peps-3-c2-523160.md) | manual added |
| [523156](../content/products/phlgd-2000-e5-523156.md) | manual added |
| [523143](../content/products/ian-523143-523143.md) | manual added; model; specifications; description; power |
| [523095](../content/products/plkla-20-li-a1-523095.md) | manual added; manufacturer declaration; specifications; description |
| [523087](../content/products/pwsa-20-li-d4-523087.md) | manual added |
| [521603](../content/products/ian-521603-521603.md) | manual added; model; specifications; description; power |
| [521214](../content/products/paukgb-a1-521214.md) | manual added |
| [521199](../content/products/paal-6000-e1-521199.md) | manual added |
| [521188](../content/products/ian-521188-521188.md) | manual added; power |
| [520945](../content/products/pms-220-a1-pss-270-c3-pexs-300-c3-520945.md) | manual edition; model; specifications; description |
| [518627](../content/products/pmfw-15-a1-518627.md) | manual added |
| [518529](../content/products/ppeps-3-a1-518529.md) | manufacturer declaration |
| [516655](../content/products/pzm-2-b4-psm-2-b4-516655.md) | model; specifications; description; power |
| [516654](../content/products/pmfd-a3-pfmg-a3-516654.md) | model; specifications; description; power |
| [516385](../content/products/prsk-6-b2-516385.md) | manual added |
| [514445](../content/products/ppmfwa-12-b2-514445.md) | manual added; manufacturer declaration; specifications; description |
| [513979](../content/products/pelsb-2600-a1-513979.md) | manual added |
| [509736](../content/products/ian-509736-509736.md) | manual added; power |
| [509622](../content/products/pkll-7-f7-plem-20-b6-509622.md) | manual edition; model; specifications; description; power |
| [505110](../content/products/paps-208-a1-505110.md) | manual added |
| [505105](../content/products/paps-2012-a1-505105.md) | manual added |
| [502239](../content/products/plgs-2012-a1-502239.md) | manual added |
| [496304](../content/products/papp-208-a1-496304.md) | manufacturer declaration |
| [492558](../content/products/ian-492558-492558.md) | manual added; manufacturer declaration; model; specifications; description |
| [492555](../content/products/paps-204-b1-492555.md) | manual added |
| [492260](../content/products/pkllp-3360-a1-492260.md) | manual added |
| [482911](../content/products/ppaghs-20-li-a1-482911.md) | manual added |
| [481670](../content/products/paps-208-a1-481670.md) | manual added |
| [481669](../content/products/paps-204-b1-481669.md) | manual added |
| [477958](../content/products/ppbssa-12-a1-477958.md) | manual added; manufacturer declaration |
| [472007](../content/products/pabsp-20-li-c4-472007.md) | manual added |
| [472002](../content/products/pprds-20-li-c3-472002.md) | manual added |
| [470740](../content/products/ppmsa-20-li-a1-470740.md) | manual added |
| [465661](../content/products/paps-204-b1-465661.md) | manual added |
| [460914](../content/products/paps-204-b1-460914.md) | manual added |
| [458082](../content/products/pkhap-2058-a1-458082.md) | manual added |
| [448851](../content/products/ppwd-30-a1-448851.md) | manual added; manufacturer declaration |
| [445906](../content/products/pwd-12-b1-445906.md) | manual added; manufacturer declaration |
| [435062](../content/products/pwd-20-b2-435062.md) | manual added; manufacturer declaration |
| [426460](../content/products/pwd-25-c4-426460.md) | manual added; manufacturer declaration |
| [380530](../content/products/pwd-30-b1-380530.md) | manual added; manufacturer declaration |
| [373293](../content/products/pwd-20-a1-373293.md) | manual added |
| [367468](../content/products/pwd-25-a2-367468.md) | manual added; manufacturer declaration |
| [365906](../content/products/paps-208-a1-365906.md) | manual added |
| [360557](../content/products/pkga-20-li-c2-360557.md) | manufacturer declaration |
| [353257](../content/products/pwd-12-a1-353257.md) | manual added; manufacturer declaration |
| [346160](../content/products/pwda-20-li-a1-346160.md) | manual added |
| [346106](../content/products/pwd-20-a1-346106.md) | manual added |
| [340059](../content/products/pwd-30-a1-340059.md) | manual added; manufacturer declaration |
| [332961](../content/products/pwd-12-a1-332961.md) | manual added; manufacturer declaration |
| [328642](../content/products/pwd-25-a1-328642.md) | manual added; manufacturer declaration |
| [322475](../content/products/pnts-1400-h4-322475.md) | manual added |
| [315160](../content/products/pnts-1300-f5-315160.md) | manual added |
| [310656](../content/products/pntsa-20-li-a1-310656.md) | manual added; manufacturer declaration |
| [304887](../content/products/pnts-1500-d5-304887.md) | manual added; manufacturer declaration |
| [298744](../content/products/pnts-1500-c4-298744.md) | manual added; manufacturer declaration |
| [296615](../content/products/pnts-1300-e4-296615.md) | manual added |
| [290887](../content/products/pnts-1300-d3-290887.md) | manual added; manufacturer declaration |
| [287974](../content/products/pnts-1400-f2-287974.md) | manual added |
| [284950](../content/products/pnts-1500-c4-284950.md) | manual added |
| [279418](../content/products/pnts-1300-c3-279418.md) | manual added; manufacturer declaration |
| [275394](../content/products/pnts-1400-e2-275394.md) | manual added; manufacturer declaration |
| [275083](../content/products/pnts-1500-b3-275083.md) | manual added; manufacturer declaration |
| [270424](../content/products/pnts-1300-c3-270424.md) | manual added; manufacturer declaration |
| [104474](../content/products/pnts-1500-b3-104474.md) | manual added; manufacturer declaration |
| [102791](../content/products/pnts-1300-c3-102791.md) | manual added; manufacturer declaration |
| [100131](../content/products/pnts-1400-d1-100131.md) | manual added |
| [97734](../content/products/pnts-1500-b3-97734.md) | manual added; manufacturer declaration |
| [89964](../content/products/pnts-1400-c1-89964.md) | manual added |
| [87778](../content/products/pnts-1500-b2-87778.md) | manual added |
| [72080](../content/products/pnts-1500-b2-72080.md) | manual added |
| [69502](../content/products/pnts-1300-b2-69502.md) | manual added |
