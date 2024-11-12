# Rezervačný sýstem športovísk

Tento program obsahuje základné funkcie a komponenty, ktoré sú predprípravou na komplexný systém, v ktorom sa používatelia môžu prihlásiť a vykonať rezerváciu na vybrané športovisko na konkrétny čas a dátum. Po úspešnej rezervácii, ak používateľ naskenuje QR kód alebo zadá kód ihriska, sa automaticky otvoria dvere a počas noci sa zapnú svetlá.

Okrem toho môžu používatelia nahrať sťažnosti, ak je niečo poškodené na športovisku.

## Použité technológie

- **Next.js** - na vytvorenie frontend aplikácie
- **Firebase Authentication** - na prihlasovanie používateľov
- **Firebase Firestore** - na ukladanie dát o používateľoch a rezerváciách
- **React** knižnice:
  - **FullCalendar** - na zobrazenie rezervácií v kalendári
  - **Stripe** - na realizáciu platieb
  - **Leaflet** - na zobrazenie mapy
  - **React Datepicker** - na UI výber dátumu
  - **ZXing/library** - na skenovanie QR kódov
- **MQTT** - na komunikáciu s ihriskom a svetlami. Na strane hardvéru bude ESP32 prijímať tieto signály. https://wokwi.com/projects/414204292551207937
- **Bootstrap** - na dizajn UI


## Inštalácia


1. Klonujte tento repozitár:
git clone https://github.com/Richardos17/hackathonapp.git


2. Prejdite do priečinka projektu:
cd hackathonapp


3. Nainštalujte závislosti:
npm install


4. Spustite aplikáciu:
npm run dev



5. Aplikácia bude dostupná na `http://localhost:3000`.



