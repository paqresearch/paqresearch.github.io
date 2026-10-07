# Obecní volby 2026 – váha mandátu

Živý přehled obecních voleb 9.–10. října 2026. Vedle počtu mandátů ukazuje,
jakou váhu každý mandát nese: kolik obyvatel a kolik zapsaných voličů na něj
připadá.

**Zatím jde o náhled na ukázkových datech** – výsledky voleb 2022, ne 2026.
Stránka to říká červeným pruhem nahoře. Ostrá data se sem dostanou až v den
voleb.

## Jak to funguje

`index.html` je jeden soběstačný soubor: žádné CDN, žádný JavaScript zvenčí,
žádný server. Data jsou vedle něj v `data.json` a stránka si je každých
60 sekund sama načte znovu, takže otevřená stránka se aktualizuje bez obnovení.

Obojí generuje `Rscript R/live.R` v repozitáři `matyasLevinsky/obecni-volby`.
Tady se nic needituje ručně.

## Metodika

Je na samostatné záložce přímo ve stránce.
