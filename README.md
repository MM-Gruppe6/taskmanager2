# Semesterprosjekt-MM-200
Semesterprosjekt for gruppe 6 - MM-200

Team Members
Charlotte Kasin - https://github.com/ckasin
Katarina M. Johannessen - https://github.com/KatarinaMJ
Stefan blomberg - https://github.com/blomshit

HEROKU - https://taskmanagergruppe6.herokuapp.com/
 
Road map - https://trello.com/b/DivIeg6d/story-map

Task manager Gruppe 6 - https://trello.com/b/01zZAyOg/task-manager-h%C3%B8sten-2017

 
Taskmanageren skal ha mulighet til å legge til avtaler og oppgaver. Man skal ha mulighet til å legge inn nødvendig informasjon, som tittel, beskrivelse, tid og sted.
Du skal kunne få varsler om tidsfrister dersom du ønsker det. 


Mål:
Lage den beste taskmanager mennesket noen gang har sett og vil se!
Den skal være enkel, men avansert for dem som ønsker flere funksjoner. 

Selling point:
Vi ønsker å lage en innovativ taskmanager. Den skal være brukervennlig for folk i alle aldre, i tillegg til å være avansert for dem som ønsker dette.
Vi ønsker at brukeren skal få en mestringsfølelse etter å ha utført en oppgave. 

Vi har kommet fram til at 2 dager i uken er den best egnede arbeidsmengden i hver sprint.


Acceptance tester:

Lage bruker:
Bruker skriver inn kontaktinfo for å lage en bruker. Når brukeren klikker på knappen for å lage bruker, blir det sendt en verifiseringsmail, hvor brukeren må klikke på en link for å få godkjent brukeren sin. Når man klikker på linken vil man komme inn på en side som sier “din konto er verifisert”. Deretter vil brukeren kunne komme inn på appen.

Login:
Brukeren skriver inn sitt brukernavn og passord, trykker på login knappen. Da blir brukernavn og passord sjekket opp mot databasen, og om dette stemmer vil brukeren komme inn på appen. 

Lage task:
Brukeren klikker på “legg til task” og får opp et form som tar inn “Tittel” og “tid + dato”.
Når “Tittelfeltet” er fylt ut, er det eneste kravet for å lage et task oppfylt, og brukeren kan trykke “legg til”. Da vil tasket komme opp i appen og ha muligheten til å bli “krysset ut” når det er utført.

Krysse ut task:
Brukeren skal kunne trykke på en “kryss ut” boks, som “onclick” fjerner tasket fra listen. 
Når et task er utført, kan man finne det i “utførte task” delen. Her har brukeren muligheten til å “gjenopprette” tasket om han/hun har krysset dette ut med et uhell.
