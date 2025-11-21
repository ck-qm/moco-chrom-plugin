# MOCO Chrome Plugin - Zeiterfassung

Eine Chrome-Erweiterung für die einfache Zeiterfassung mit MOCO.

## Features

- ⏱️ **Schnelle Zeiterfassung**: Erfassen Sie Ihre Arbeitszeit direkt aus dem Browser
- 🔒 **Sichere Speicherung**: API-Zugangsdaten werden nur lokal in Ihrem Browser gespeichert
- 📊 **Übersicht**: Sehen Sie Ihre heutigen Zeiteinträge auf einen Blick
- 🎯 **Einfache Bedienung**: Intuitive Benutzeroberfläche für schnelles Buchen

## Installation

### Voraussetzungen

- Google Chrome Browser (Version 88 oder höher)
- MOCO Account mit API-Zugang
- Persönlicher API Key von MOCO

### Chrome Extension installieren

1. Laden Sie dieses Repository herunter oder klonen Sie es:
   ```bash
   git clone https://github.com/ck-qm/moco-chrom-plugin.git
   ```

2. Öffnen Sie Chrome und navigieren Sie zu: `chrome://extensions/`

3. Aktivieren Sie den "Entwicklermodus" (oben rechts)

4. Klicken Sie auf "Entpackte Erweiterung laden"

5. Wählen Sie den Ordner mit den Plugin-Dateien aus

6. Die MOCO Zeiterfassung-Erweiterung sollte nun in Ihrer Symbolleiste erscheinen

## Konfiguration

### MOCO API Key erhalten

1. Melden Sie sich bei MOCO an (https://ihre-firma.mocoapp.com)
2. Klicken Sie auf Ihr Profil (oben rechts)
3. Wählen Sie "Integrationen"
4. Kopieren Sie Ihren persönlichen API Key

### Plugin konfigurieren

1. Klicken Sie auf das MOCO-Icon in der Chrome-Symbolleiste
2. Klicken Sie auf "Einstellungen öffnen" oder das Zahnrad-Symbol
3. Geben Sie Ihre MOCO Domain ein (z.B. "ihre-firma")
4. Fügen Sie Ihren API Key ein
5. Klicken Sie auf "Verbindung testen" um die Einstellungen zu prüfen
6. Klicken Sie auf "Speichern"

## Verwendung

### Neue Zeiterfassung erstellen

1. Klicken Sie auf das MOCO-Icon in der Chrome-Symbolleiste
2. Wählen Sie ein Projekt aus der Liste
3. Wählen Sie eine Aufgabe für das Projekt
4. Wählen Sie das Datum (Standard: heute)
5. Geben Sie die Stunden ein (z.B. 1.5 für 1,5 Stunden)
6. Fügen Sie optional eine Notiz hinzu
7. Klicken Sie auf "Zeiterfassung erstellen"

### Heutige Einträge anzeigen

Die heutigen Zeiteinträge werden automatisch im unteren Bereich angezeigt. Klicken Sie auf "Aktualisieren" um die Liste zu aktualisieren.

## Sicherheit

- **Lokale Speicherung**: Ihre API-Zugangsdaten werden ausschließlich lokal in Ihrem Browser gespeichert
- **Verschlüsselung**: Chrome speichert die Daten verschlüsselt über die Storage API
- **Keine Weitergabe**: Daten werden nur an die MOCO API gesendet, niemals an Dritte
- **API Key Zugriff**: Der API Key hat die gleichen Berechtigungen wie Ihr MOCO-Account

## Berechtigungen

Die Extension benötigt folgende Berechtigungen:

- `storage`: Zum lokalen Speichern der API-Zugangsdaten
- `https://*.mocoapp.com/*`: Zum Kommunizieren mit der MOCO API

## MOCO API Dokumentation

Diese Extension verwendet die offizielle MOCO API:
- API Dokumentation: https://everii-group.github.io/mocoapp-api-docs/
- Authentifizierung: Token-basiert über Authorization Header
- Hauptendpunkte:
  - `/api/v1/activities` - Zeiteinträge
  - `/api/v1/projects` - Projekte
  - `/api/v1/users/me` - Benutzerinformationen

## Entwicklung

### Projektstruktur

```
moco-chrom-plugin/
├── manifest.json          # Chrome Extension Manifest
├── popup.html            # Popup-Oberfläche
├── options.html          # Einstellungsseite
├── scripts/
│   ├── api.js           # MOCO API Integration
│   ├── popup.js         # Popup-Logik
│   └── options.js       # Einstellungs-Logik
├── styles/
│   ├── popup.css        # Popup-Styling
│   └── options.css      # Einstellungs-Styling
└── icons/               # Extension Icons
```

### Lokales Testen

1. Änderungen am Code vornehmen
2. In `chrome://extensions/` auf das Aktualisierungs-Symbol klicken
3. Plugin testen

## Fehlerbehebung

### "Verbindung fehlgeschlagen"

- Überprüfen Sie Ihre MOCO Domain (ohne https:// und .mocoapp.com)
- Überprüfen Sie Ihren API Key
- Stellen Sie sicher, dass Sie Zugriff auf MOCO haben

### "Fehler beim Laden der Projekte"

- Stellen Sie sicher, dass Sie Projekten zugewiesen sind
- Überprüfen Sie, ob Ihre Berechtigungen ausreichen

### Einträge werden nicht angezeigt

- Klicken Sie auf "Aktualisieren"
- Überprüfen Sie, ob heute bereits Einträge vorhanden sind

## Lizenz

Dieses Projekt ist Open Source.

## Support

Bei Fragen oder Problemen erstellen Sie bitte ein Issue auf GitHub.