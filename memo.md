DANNO
VELOCITA
VITA

Classe Vita (Health)    Danno (Damage)    Velocità d'Attacco (Attack Speed)    Punti Totali
Berserker 1/5 5/5 1/5 7/15 (Esempio)
Assassino 2/5 1/5 4/5 7/15 (Esempio)
Guardiano 5/5 2/5 1/5 8/15 (Esempio)

nella scena gameplay stai passando gli Sprite della scena precedente. evita di fare questo
e passa un oggetto semplice
con i dati importanti di ogni sprite
e tramite quelli ricostruisci gli sprite nella scena gameplay

-[x] capire come gestire la perdita di vita dei dude all itnterno del LIfePointsContainer class

-[x] aggiungere gli attacchi per pink e white dude
-[x] uniforma i tipi di attacchi e dai al whitedude la spada come attacco
-[x] studia un modo intelligente per far spostare gli enemy e non farli stare sempre sullo stesso posto (environment
 manager)
-[x] controlla perchè gli enemydudes non visualizzano la barra della vita sopra la loro testa
-[x] capisci come fare per far muovere gli enemy dudes dentro alla trigger zone (assegna chiaramente le azioni dentro
 alla
 triggerZone)

-[x] implementa una classe comune per i dude del giocatore da far estendere poi a pink white e blue dude
-[x] il white dude non ha un arma, il suo danno base sarà maggiore perche non dotato di arma che può fare danno
-[x] prova ad implementare le collisioni tra weapon e enemy e vedo se riesci a fargli abbassare la vita
-[x] ripensa all ereditarietà delle entità all interno del progetto
-[x] ripensa tutti i cast che vengono fatti ( elabora magari una classe che sia un castHelperManager)
-[x] separa le responsabilità di environment manager fa troppe cose!
 [ ]aggiungere la feature di pausa del gioco
- [x] impostare timer azioni che puoi fare un comando solo ogni 2 secondi
- [x] scrivi collisioni tra shuriken nemico e dude player
- [x] implementa salto dei dudeplayer

-[x] capisci perche ogni tanto fai delle animazioni ma il player è morto e crasha (tipo è morto e subito dopo acchiappa
 un altra animaizone da fare crasha )
 - [x]capisci perche se white dude prende la pozione perde un po di vita

- [x]aggiungi suono di refill hp

- []gestisci quando enemydude escono fuori dalla canvas e fai destroy in quei casi sia cehe escano verso sinistra che
  verso destra (usa un add event magari)
  -[] se chiami un attacco con i dudes bianchi quando un nemico non è presnete nella trigger zone, i comandi vengono
  bloccati (test: ad inizio gioco attacco subito con 5 dudes bianchi)
  -[] aggiungi shield protettivo
  -[] aggiungi boss finale
  -[] una volta finita la wave dei dude nemici rimuovi il rettangolo di collisione
  -[] dopo che i dudes alleati ricevono una pozione la loro vita sembra minore quando prendono danno. tankano meno
  danni (
  healing buggato)