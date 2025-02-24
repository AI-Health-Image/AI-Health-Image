# Frontend für AI-Health-Image Analyzer

## Übersicht
Dieses Projekt ist das Frontend für die AI-Health-Image Analyzer Anwendung. Es ermöglicht Nutzern das Hochladen und Analysieren medizinischer Bilder mithilfe von KI-gestützten Algorithmen.

## Technologien
Das Frontend basiert auf den folgenden Technologien:
- **React 19** – Komponentenbasierte Benutzeroberfläche
- **Vite** – Entwicklungs- und Build-Tool für eine schnelle Entwicklungsumgebung
- **Tailwind CSS** – Stilisierung der UI mit Utility-First-Prinzip
- **Framer Motion** – Animationsbibliothek für reibungslose UI-Effekte
- **Zustand** – Zustandverwaltung für einfaches State-Handling
- **Axios** – API-Requests für Backend-Kommunikation
- **React Router DOM** – Routing innerhalb der Anwendung

## Installation & Setup
### Voraussetzungen
- **Node.js** (mindestens Version 18 empfohlen)
- **npm** oder **yarn**

### Installation
1. **Repository klonen:**
   ```sh
   git clone https://github.com/AI-Health-Image/AI-Health-Image.git
   cd AI-Health-Image/frontend
   ```
2. **Abhängigkeiten installieren:**
   ```sh
   npm install
   ```
3. **Entwicklungsserver starten:**
   ```sh
   npm run dev
   ```
   Der Server läuft standardmäßig unter `http://localhost:5173/`.

## Projektstruktur
```sh
/frontend
│── src/
│   ├── components/      # Wiederverwendbare UI-Komponenten
│   ├── layout/          # Layout-Komponenten (Header, Footer, etc.)
│   ├── pages/           # Seiten (Home, About, Contact, etc.)
│   ├── store/           # Zustandverwaltung mit Zustand
│   ├── styles/          # Globale CSS- und Tailwind-Dateien
│   ├── main.jsx         # Einstiegspunkt der Anwendung
│── public/              # Statische Assets wie Bilder
│── package.json         # Abhängigkeitsverwaltung
│── vite.config.js       # Vite Konfigurationsdatei
```

## Deployment
Für den produktiven Einsatz kann das Projekt mit folgendem Befehl gebaut werden:
```sh
npm run build
```
Das generierte `dist/`-Verzeichnis kann dann auf einem Webserver bereitgestellt werden.

## Lizenz
Dieses Projekt steht unter der MIT-Lizenz. Mehr Details in der `LICENSE`-Datei.
