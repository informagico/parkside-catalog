import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {extractCodes,searchCode} from '../src/scanner-codes.js';

test('Scanner extracts labelled IANs, preserves suffixes and orders them before models',()=>{
 assert.deepEqual(extractCodes('PABS 20-Li D5\nIAN: 407702_2207'),[
  {kind:'ian',value:'407702_2207',query:'407702'},
  {kind:'model',value:'PABS 20-Li D5',query:'PABS 20-Li D5'}
 ]);
 assert.deepEqual(extractCodes('IAN 407702_2207\nIAN 407702_2308').map(c=>c.query),['407702']);
 assert.equal(extractCodes('IAN 1O1234')[0].query,'101234');
 assert.equal(extractCodes('IAN 193205')[0].query,'193205');
 assert.equal(extractCodes('IAN 407702\n230 V ~ 50 Hz')[0].query,'407702');
});

test('Scanner does not mistake EANs, serials or voltage ratings for IANs',()=>{
 for(const text of ['EAN 4055334999999','SERIAL 407702','230 V 50 Hz 1500 W','IAN 4055334999999','IAN 1234','IAN 1234567'])assert.deepEqual(extractCodes(text),[],text);
});

test('Scanner extracts multiple model candidates without inventing manufacturers',()=>{
 assert.deepEqual(extractCodes('PNTS 1500 B3\nPWS 125 G6\nPABS 20-LI D5').map(c=>c.value),['PNTS 1500 B3','PWS 125 G6','PABS 20-Li D5']);
});

test('Confirmed IAN searches drop the batch suffix; model searches remain editable',()=>{
 for(const value of ['407702_2207','IAN 407702_2207','ian: 407702','407702-2207'])assert.equal(searchCode(value),'407702');
 assert.equal(searchCode(' PABS 20-Li D5 '),'PABS 20-Li D5');
 assert.equal(searchCode('4055334999999'),'4055334999999');
});

test('Built scanner uses same-origin assets including OCR worker, WASM and language',()=>{
 if(!fs.existsSync('dist/it/index.html'))return;
 for(const file of ['tesseract.esm.min.js','worker.min.js','eng.traineddata.gz','core/tesseract-core-lstm.wasm.js','core/tesseract-core-simd-lstm.wasm.js','core/tesseract-core-relaxedsimd-lstm.wasm.js'])assert(fs.existsSync('dist/assets/ocr/'+file),file);
 const script=fs.readFileSync('dist/assets/scanner.js','utf8');
 assert(!/https?:\/\//.test(script));
 for(const lang of ['it','en']){
  const html=fs.readFileSync(`dist/${lang}/index.html`,'utf8');
  assert(html.includes('id="scan-open"'));
  assert(html.includes('type="module" src="../assets/scanner.js"'));
  assert(html.includes('capture="environment"'));
 }
});
