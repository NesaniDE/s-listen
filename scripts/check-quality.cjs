const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const root = path.resolve(__dirname, '..');
const ts = require(path.join(root, 'node_modules/typescript'));
const cache = new Map();
function read(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file).exports;
  const mod = {exports:{}}; cache.set(file, mod);
  const code = ts.transpileModule(fs.readFileSync(file,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS, target:ts.ScriptTarget.ES2020, jsx:ts.JsxEmit.ReactJSX}}).outputText;
  const req = (id) => {
    if (id.startsWith('@/') || id.startsWith('.')) {
      const stem = id.startsWith('@/') ? path.join(root,'src',id.slice(2)) : path.resolve(path.dirname(file),id);
      const found = [stem+'.ts',stem+'.tsx',path.join(stem,'index.ts')].find(p=>fs.existsSync(p));
      return read(found);
    }
    return require(require.resolve(id,{paths:[root]}));
  };
  vm.runInThisContext('(function(require,module,exports){'+code+'\n})', {filename:file})(req,mod,mod.exports);
  return mod.exports;
}
const {companies} = read(path.join(root,'src/data/companies/index.ts'));
const {top10Lists} = read(path.join(root,'src/data/lists/index.ts'));
const {isThinCompany,isThinList,isIndexableCompany} = read(path.join(root,'src/lib/quality.ts'));
const city = read(path.join(root,'src/lib/config.ts')).siteConfig.city;
const fixture = {...companies[0],description:'Eigener konkreter Text.',longDescription:'Ein redaktioneller Text.',website:'https://example.com',address:'Ort'};
assert.equal(isThinCompany({...fixture,longDescription:''}),true);
assert.equal(isThinCompany({...fixture,longDescription:'Ein erster Arbeitsstand'}),true);
for (const description of [`Café in ${city}.`,`Café in ${city} (Teststraße).`,`Friseur in ${city}-Mitte (Teststraße).`]) assert.equal(isThinCompany({...fixture,description}),true,description);
assert.equal(isThinCompany(fixture),false);
assert.equal(isIndexableCompany({...fixture,website:undefined}),false);
const thin = companies.find(isThinCompany), rich = companies.find(c=>!isThinCompany(c));
const list = {...top10Lists[0],intro:'Eigene Einordnung.'};
assert.equal(isThinList({...list,entries:[{slug:thin.slug},{slug:rich.slug}]}),false);
assert.equal(isThinList({...list,entries:[{slug:thin.slug},{slug:thin.slug},{slug:rich.slug}]}),true);
assert.equal(isThinList({...list,intro:'Diese Liste bündelt zehn Adressen aus dem Bereich Test',entries:[{slug:rich.slug}]}),true);
assert.equal(isThinList({...list,entries:[{slug:'missing'}]}),true);
const sitemap = read(path.join(root,'src/app/sitemap.ts')).default();
const urls = new Set(sitemap.map(e=>e.url));
const base = read(path.join(root,'src/lib/config.ts')).siteConfig.url;
for(const c of companies) assert.equal(urls.has(`${base}/unternehmen/${c.slug}`),isIndexableCompany(c));
for(const l of top10Lists) assert.equal(urls.has(`${base}/top10/${l.slug}`),!isThinList(l));
const {categories} = read(path.join(root,'src/data/categories/index.ts'));
for(const c of categories) {
 assert.equal(urls.has(`${base}/kategorie/${c.slug}`),top10Lists.some(l=>l.categorySlug===c.slug&&!isThinList(l)));
 for(const s of c.subcategories) assert.equal(urls.has(`${base}/kategorie/${c.slug}/${s.slug}`),top10Lists.some(l=>l.slug===s.listSlug&&!isThinList(l)));
}
const stats = {city,profiles:companies.length,previousIndexableProfiles:companies.filter(c=>c.website&&(c.address||c.phone)).length,indexableProfiles:companies.filter(isIndexableCompany).length,noindexProfiles:companies.filter(c=>!isIndexableCompany(c)).length,lists:top10Lists.length,indexableLists:top10Lists.filter(l=>!isThinList(l)).length,noindexLists:top10Lists.filter(isThinList).length};
console.log(JSON.stringify(stats,null,2));
