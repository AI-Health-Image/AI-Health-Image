# AI-Health-Image Frontend

## Übersicht
Dieses Repository enthält das Frontend der Anwendung **AI-Health-Image Analyzer**. Die Anwendung ermöglicht es Nutzern, medizinische Bilder hochzuladen und mithilfe von Künstlicher Intelligenz zu analysieren. Das Frontend ist mit **React** entwickelt und nutzt **Tailwind CSS** für das Styling.

## Technologien
- **React** – UI-Framework
- **React Router** – Seiten-Navigation
- **Tailwind CSS** – Styling
- **Framer Motion** – Animationen
- **Zustand** – State Management

## Installation & Setup
### Voraussetzungen
- Node.js (>= 16.x)
- npm oder yarn

### Installation
```sh
# Repository klonen
git clone https://github.com/AI-Health-Image/AI-Health-Image.git
cd AI-Health-Image/frontend

# Abhängigkeiten installieren
npm install
```

### Starten der Anwendung
```sh
npm run dev
```
Die Anwendung ist dann unter `http://localhost:5173/` erreichbar.

## Projektstruktur
```
frontend/
│-- public/              # Statische Assets (z.B. Bilder)
│-- src/
│   ├── components/      # Wiederverwendbare UI-Komponenten
│   ├── layout/          # Layout-Komponenten
│   ├── pages/           # Seiten der Anwendung
│   ├── styles/          # CSS-Dateien (Tailwind genutzt)
│   ├── store/           # Zustand-Management (Zustand)
│   ├── App.jsx          # Haupteinstiegspunkt
│   └── main.jsx         # React Rendering
│-- package.json         # Abhängigkeiten & Skripte
│-- README.md            # Diese Datei
```

## Features
- **Bild-Upload**: Nutzer können medizinische Bilder hochladen.
- **KI-Analyse**: Die hochgeladenen Bilder werden mithilfe von KI-Modellen analysiert.
- **Archiv**: Hochgeladene Bilder und Analysen können gespeichert und erneut angesehen werden.
- **Authentifizierung**: Login- und Registrierungsfunktionalität.
- **Responsive Design**: Optimiert für Desktop und Mobilgeräte.

## Deployment
Das Frontend kann auf **Vercel**, **Netlify** oder **AWS Amplify** gehostet werden.
```sh
# Beispiel für Vercel Deployment
npm install -g vercel
vercel
```

## Mitwirkende
- [Team AI-Health-Image](https://github.com/AI-Health-Image)

## Lizenz
Dieses Projekt steht unter der **MIT-Lizenz**.