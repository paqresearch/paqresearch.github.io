# Obecní volby 2026 – váha mandátu

Stránka PAQ Research k sčítání hlasů komunálních voleb 9.–10. října 2026:
mandáty přepočtené na obyvatele, hlasy přepočtené na voliče a změna proti
roku 2022, za celou ČR i po krajích.

`index.html` a `assets/` jsou stránka, `data_v2.json` její data. Stránka si
data načítá znovu každou minutu. Během sčítání je sem po každé dávce ČSÚ
nahrává `R/live.R --publish` z repozitáře `matyasLevinsky/obecni-volby`
(viz `R/29_publish.R`); před začátkem sčítání obsahuje stav bez výsledků roku
2026, s konečnými výsledky roku 2022.

Tady se nic needituje ručně.

## Vložení na jinou stránku

Stránka se dá vložit do článku přes iframe. Adresa s `?embed` skryje nadpis
stránky, odkazy otevírá v nové záložce a hlásí hostitelské stránce svou výšku,
takže iframe roste a zmenšuje se s obsahem a nemá vlastní posuvník. Konkrétní
pohled se vybere částí adresy za `#` – stačí ji zkopírovat z prohlížeče
(např. `#mandatu/CZ064/zmena`).

```html
<iframe src="https://paqresearch.github.io/obecni-volby-nahled-v2/?embed#obyvatel/CZ/stav"
        title="Obecní volby 2026 – PAQ Research"
        style="width:100%;height:900px;border:0" loading="lazy"></iframe>
<script>
(function () {
  var PUVOD = 'https://paqresearch.github.io'
  window.addEventListener('message', function (e) {
    if (e.origin !== PUVOD || !e.data || e.data.typ !== 'paq-volby-vyska') return
    document.querySelectorAll('iframe').forEach(function (f) {
      if (f.contentWindow === e.source) f.style.height = e.data.vyska + 'px'
    })
  })
  document.querySelectorAll('iframe').forEach(function (f) {
    if (f.contentWindow && f.src.indexOf(PUVOD + '/') === 0) f.contentWindow.postMessage({ typ: 'paq-volby-dotaz' }, PUVOD)
  })
})()
</script>
```

Skript stačí na stránce jednou, i pro několik vložených pohledů. Bez něj iframe
funguje také, jen s pevnou výškou 900 px a posuvníkem uvnitř.
