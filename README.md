# WinnStack

Enkel statisk hemsida (ren HTML/CSS/JS, inga beroenden).

## Köra lokalt
Öppna `index.html` direkt i webbläsaren, eller använd t.ex.
VS Code-tillägget "Live Server" för snabb omladdning vid ändringar.

## Deploya på Vercel
1. Lägg den här mappen i ett GitHub-repo (t.ex. `winnstack`).
2. Gå till vercel.com, "Add New… > Project", välj repot.
   Vercel känner av att det är statisk HTML automatiskt, inga
   byggsteg behövs (Framework Preset: "Other").
3. Klicka "Deploy". Ni får direkt en gratis adress,
   förmodligen `winnstack.vercel.app`.
4. Vill ni senare ha ett eget domännamn: köp domänen hos valfri
   registrar, lägg till den under projektets Settings > Domains
   i Vercel, och lägg in de DNS-poster Vercel ger er hos
   registraren.

Efter det: varje `git push` till huvudgrenen deployar om sidan
automatiskt.

## Innan ni går live, dubbelkolla
- Mejladressen i offertformuläret och kontaktknappen (just nu
  c.winnhed@hotmail.com)
- Att Svanskogens Golf-länken/texten stämmer när den sidan är klar
  att publicera
