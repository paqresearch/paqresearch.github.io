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

Stránka se dá vložit do článku přes iframe. Adresa s `?embed` ukáže jen jeden
graf: bez záhlaví, bez záložek a bez vysvětlivek pod grafem. Odkazy otevírá
v nové záložce a hostitelské stránce hlásí svou výšku, takže iframe roste
a zmenšuje se s obsahem a nemá vlastní posuvník. Který graf to bude, určuje
část adresy za `#` – stačí ji zkopírovat z prohlížeče (např.
`#mandatu/CZ064/zmena`; záložky jsou `obyvatel`, `volicu`, `hlasu`, `mandatu`).
Ovládání grafu (rok, kraj, NK) zůstává.

```html
<iframe src="https://paqresearch.github.io/obecni-volby-nahled-v2/?embed#obyvatel/CZ/stav"
        title="Obecní volby 2026 – PAQ Research"
        style="width:100vw;max-width:100%;height:900px;border:0" loading="lazy"></iframe>
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

Šířka `100vw` s `max-width:100%` je kvůli šabloně paqresearch.cz: sloupec
článku je tam od 1024 px široký jen jako jeho obsah a `width:100%` by iframe
nechala na výchozích 300 px. Takhle sloupec vyplní (670 px) a na telefonu se
vejde na šířku displeje.

Na Ghostu je nejspolehlivější dát skript jednou do Settings → Code injection →
Site footer (nebo do Code injection konkrétního příspěvku); do HTML karty pak
stačí samotný iframe.
