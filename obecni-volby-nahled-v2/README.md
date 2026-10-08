# Obecní volby 2026 – váha mandátu (verze 2), náhled

**Vymyšlené výsledky, ne skutečné.** Kandidátky jsou skutečné kandidátky
roku 2026, hlasy vymyšlené: každá kandidátka dostala, co její strana získala
v téže obci v roce 2022, s náhodnou odchylkou. Nejde o odhad ani průzkum.
Každá stránka to říká v pruhu nahoře a vyhledávačům se nenabízí (noindex).

`index.html` vede na čtyři okamžiky noci sčítání (10, 50, 90 a 100 %
spočtených zastupitelstev) s časy podle skutečného průběhu sčítání v roce
2022. Každá složka obsahuje stránku a její `data_v2.json`; `assets/` sdílejí.

Vzniká v repozitáři `matyasLevinsky/obecni-volby` příkazem
`Rscript R/26_preview.R --export DIR`; tady se nic needituje ručně.
