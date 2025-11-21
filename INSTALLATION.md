# Installation und Schnellstart

## Voraussetzungen

- Google Chrome Browser (Version 88 oder höher)
- MOCO Account
- Persönlicher API Key von MOCO

## Schritt 1: Chrome Extension laden

1. **Repository herunterladen**
   - Laden Sie dieses Repository als ZIP herunter oder klonen Sie es:
     ```bash
     git clone https://github.com/ck-qm/moco-chrom-plugin.git
     ```
   - Entpacken Sie die ZIP-Datei (falls heruntergeladen)

2. **Extension in Chrome laden**
   - Öffnen Sie Chrome
   - Navigieren Sie zu: `chrome://extensions/`
   - Aktivieren Sie den **"Entwicklermodus"** (Schalter oben rechts)
   - Klicken Sie auf **"Entpackte Erweiterung laden"**
   - Wählen Sie den Ordner `moco-chrom-plugin` aus
   - Die Extension sollte nun in Ihrer Symbolleiste erscheinen (blaues "M" Icon)

## Schritt 2: API Key von MOCO erhalten

1. Melden Sie sich bei MOCO an: `https://ihre-firma.mocoapp.com`
2. Klicken Sie auf Ihr **Profil** (oben rechts, Ihr Name/Avatar)
3. Wählen Sie **"Integrationen"** aus dem Menü
4. Suchen Sie den Bereich **"API"**
5. **Kopieren** Sie Ihren persönlichen API Key

> **Hinweis:** Der persönliche API Key gibt Zugriff mit Ihren persönlichen Berechtigungen. Behandeln Sie ihn wie ein Passwort!

## Schritt 3: Extension konfigurieren

1. **Einstellungen öffnen**
   - Klicken Sie auf das MOCO Icon in der Chrome-Symbolleiste
   - Klicken Sie auf **"Einstellungen öffnen"** oder das **Zahnrad-Symbol** ⚙️

2. **Zugangsdaten eingeben**
   - **MOCO Domain**: Geben Sie nur den Firmennamen ein (z.B. `ihre-firma`)
     - ❌ NICHT: `https://ihre-firma.mocoapp.com`
     - ✅ NUR: `ihre-firma`
   - **API Key**: Fügen Sie den kopierten API Key ein

3. **Verbindung testen**
   - Klicken Sie auf **"Verbindung testen"**
   - Sie sollten eine Erfolgsmeldung sehen: "✓ Verbindung erfolgreich! Angemeldet als: [Ihr Name]"

4. **Speichern**
   - Klicken Sie auf **"Speichern"**
   - Ihre Zugangsdaten werden sicher lokal gespeichert

## Schritt 4: Erste Zeiterfassung

1. **Popup öffnen**
   - Klicken Sie auf das MOCO Icon in der Symbolleiste

2. **Zeit erfassen**
   - Wählen Sie ein **Projekt** aus der Liste
   - Wählen Sie eine **Aufgabe** für das Projekt
   - Das **Datum** ist auf heute voreingestellt
   - Geben Sie die **Stunden** ein (z.B. `1.5` für 1,5 Stunden)
   - Fügen Sie optional eine **Notiz** hinzu
   - Klicken Sie auf **"Zeiterfassung erstellen"**

3. **Einträge anzeigen**
   - Ihre heutigen Zeiteinträge werden unten angezeigt
   - Klicken Sie auf **"Aktualisieren"** um die Liste zu aktualisieren

## Fehlerbehebung

### "Verbindung fehlgeschlagen"

**Problem:** Die Verbindung zu MOCO kann nicht hergestellt werden.

**Lösungen:**
- Überprüfen Sie Ihre MOCO Domain (nur der Firmenname, ohne https:// oder .mocoapp.com)
- Überprüfen Sie Ihren API Key (kein Leerzeichen am Anfang/Ende)
- Stellen Sie sicher, dass Sie Internetzugang haben
- Prüfen Sie, ob Sie sich bei MOCO anmelden können

### "Fehler beim Laden der Projekte"

**Problem:** Projekte werden nicht geladen.

**Lösungen:**
- Stellen Sie sicher, dass Ihnen in MOCO Projekte zugewiesen sind
- Überprüfen Sie Ihre Berechtigungen in MOCO
- Kontaktieren Sie Ihren MOCO-Administrator

### Einträge werden nicht angezeigt

**Problem:** Heutige Einträge erscheinen nicht in der Liste.

**Lösungen:**
- Klicken Sie auf "Aktualisieren"
- Überprüfen Sie, ob heute bereits Einträge in MOCO vorhanden sind
- Melden Sie sich bei MOCO an und prüfen Sie dort

### Extension wird nicht angezeigt

**Problem:** Das MOCO Icon erscheint nicht in der Symbolleiste.

**Lösungen:**
- Gehen Sie zu `chrome://extensions/`
- Stellen Sie sicher, dass die Extension aktiviert ist
- Klicken Sie auf das Puzzle-Icon in Chrome und pinnen Sie die MOCO Extension

## Deinstallation

Falls Sie die Extension deinstallieren möchten:

1. Gehen Sie zu `chrome://extensions/`
2. Suchen Sie "MOCO Time Tracker"
3. Klicken Sie auf **"Entfernen"**

Ihre lokal gespeicherten Zugangsdaten werden dabei automatisch gelöscht.

## Support

Bei weiteren Fragen oder Problemen:
- Lesen Sie die ausführliche [README.md](README.md)
- Erstellen Sie ein Issue auf GitHub
- Kontaktieren Sie Ihren MOCO-Administrator für API-bezogene Fragen

## Sicherheitshinweis

🔒 **Ihre Daten sind sicher:**
- Alle API-Zugangsdaten werden nur lokal in Ihrem Browser gespeichert
- Es erfolgt keine Übertragung an Dritte
- Die Daten sind durch Chrome verschlüsselt
- Nur Sie haben Zugriff auf Ihre Zugangsdaten
