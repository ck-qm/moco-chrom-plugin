# Verwendungsanleitung

## Übersicht

Diese Anleitung zeigt Ihnen, wie Sie die MOCO Chrome Extension optimal nutzen.

## Tägliche Verwendung

### Schnelle Zeiterfassung

Die Extension ist für schnelle, unkomplizierte Zeiterfassung während der Arbeit konzipiert.

**Typischer Workflow:**

1. Klicken Sie auf das MOCO-Icon in der Chrome-Symbolleiste
2. Wählen Sie Ihr aktuelles Projekt
3. Wählen Sie die entsprechende Aufgabe
4. Geben Sie die Stunden ein (Standard: 1 Stunde)
5. Optional: Fügen Sie eine kurze Notiz hinzu
6. Klicken Sie auf "Zeiterfassung erstellen"

**Zeitangaben:**
- Volle Stunden: `1`, `2`, `8`
- Halbe Stunden: `0.5`, `1.5`, `2.5`
- Viertelstunden: `0.25`, `0.75`, `1.25`
- Beliebig: `2.3`, `4.7` (auf zwei Dezimalstellen)

### Zeiteinträge überprüfen

Im unteren Bereich des Popups sehen Sie Ihre **heutigen Zeiteinträge**:

- **Projekt** und **Aufgabe** werden angezeigt
- **Stunden** werden auf 2 Dezimalstellen gerundet
- **Uhrzeit** zeigt, wann der Eintrag erstellt wurde
- **Notizen** (falls vorhanden) werden kursiv dargestellt

Klicken Sie auf **"Aktualisieren"** um die Liste zu aktualisieren.

## Praktische Beispiele

### Beispiel 1: Entwicklungsarbeit buchen

```
Projekt: Website Redesign
Aufgabe: Entwicklung
Datum: 21.11.2025 (heute)
Stunden: 2.5
Notiz: Frontend Komponenten für Dashboard implementiert
```

→ Klick auf "Zeiterfassung erstellen"

### Beispiel 2: Meeting buchen

```
Projekt: Internes
Aufgabe: Meeting
Datum: 21.11.2025
Stunden: 1
Notiz: Sprint Planning mit Team
```

### Beispiel 3: Mehrere Einträge für verschiedene Projekte

**Vormittag:**
```
Projekt: Projekt A
Aufgabe: Entwicklung
Stunden: 3
Notiz: API Endpoints implementiert
```

**Nachmittag:**
```
Projekt: Projekt B
Aufgabe: Testing
Stunden: 2
Notiz: Unit Tests für Authentifizierung
```

**Ende des Tages:**
```
Projekt: Projekt A
Aufgabe: Dokumentation
Stunden: 1.5
Notiz: README und API Docs aktualisiert
```

## Tipps & Tricks

### ⚡ Effizienz-Tipps

1. **Favoriten-Projekte:**
   - Die zuletzt verwendeten Projekte werden von MOCO bereitgestellt
   - Wählen Sie Ihre Hauptprojekte in MOCO als "aktiv"

2. **Standard-Datum:**
   - Das Datum ist immer auf heute voreingestellt
   - Ändern Sie es nur bei Nachträgen

3. **Tastatur-Navigation:**
   - Benutzen Sie `Tab` um zwischen Feldern zu wechseln
   - Drücken Sie `Enter` im letzten Feld um das Formular abzusenden

4. **Schnelle Notizen:**
   - Kurze, prägnante Notizen sind effektiver
   - Beschreiben Sie WAS Sie gemacht haben, nicht WIE

### 📝 Best Practices für Notizen

**Gut:**
- ✅ "Frontend Komponenten implementiert"
- ✅ "Kundenbesprechung zur neuen Feature-Anforderung"
- ✅ "Bugfix für Login-Problem"
- ✅ "Code Review und Merge von PR #123"

**Zu vermeiden:**
- ❌ "Gearbeitet" (zu unspezifisch)
- ❌ "Verschiedenes" (nicht aussagekräftig)
- ❌ Sehr lange Texte (> 200 Zeichen)

### 🔄 Workflow-Empfehlungen

**Option 1: Echtzeit-Erfassung**
- Erfassen Sie Zeit sofort nach Abschluss einer Aufgabe
- Vorteil: Genau und aktuell
- Nachteil: Unterbricht den Workflow

**Option 2: Batch-Erfassung**
- Notieren Sie sich Ihre Tätigkeiten
- Erfassen Sie alle Einträge am Ende des Tages
- Vorteil: Weniger Unterbrechungen
- Nachteil: Risiko des Vergessens

**Empfehlung:** Kombinieren Sie beide Ansätze:
- Große Blöcke (>2h) sofort erfassen
- Kleine Aufgaben am Ende zusammenfassen

## Häufige Anwendungsfälle

### Nachträgliche Erfassung

**Situation:** Sie haben gestern vergessen, Zeit zu erfassen.

**Lösung:**
1. Öffnen Sie das Popup
2. Ändern Sie das Datum auf gestern
3. Erfassen Sie die fehlende Zeit
4. Setzen Sie das Datum wieder auf heute

### Mehrere kurze Aufgaben

**Situation:** Sie haben mehrere kleine Aufgaben (je 15-30 Min) am gleichen Projekt.

**Option 1:** Einzeln erfassen
```
Task 1: 0.25h - "E-Mails bearbeitet"
Task 2: 0.5h - "Code Review"
Task 3: 0.25h - "Dokumentation"
```

**Option 2:** Zusammenfassen (empfohlen für <30 Min Aufgaben)
```
1h - "E-Mails, Code Review und Dokumentation"
```

### Projekt-Wechsel während des Tages

**Situation:** Sie arbeiten an mehreren Projekten am gleichen Tag.

**Lösung:**
- Erfassen Sie jeden Projekt-Block separat
- Verwenden Sie aussagekräftige Notizen
- Die Extension zeigt automatisch alle Einträge von heute an

### Überstunden erfassen

**Situation:** Sie haben mehr als 8 Stunden an einem Tag gearbeitet.

**Lösung:**
- Erfassen Sie alle Einträge normal
- Die Extension hat keine Beschränkung auf 8 Stunden/Tag
- Die Gesamtstunden werden von MOCO verwaltet

## Einstellungen verwalten

### API-Zugangsdaten ändern

1. Klicken Sie auf das Zahnrad-Symbol ⚙️ im Popup
2. Oder Rechtsklick auf Extension-Icon → "Optionen"
3. Ändern Sie Domain oder API Key
4. Testen Sie die Verbindung
5. Speichern Sie die Änderungen

### Zwischen mehreren MOCO-Accounts wechseln

**Hinweis:** Die Extension unterstützt aktuell nur einen Account gleichzeitig.

**Workaround für mehrere Accounts:**
- Erstellen Sie mehrere Chrome-Profile (chrome://settings/people)
- Installieren Sie die Extension in jedem Profil
- Konfigurieren Sie jeden mit unterschiedlichen Zugangsdaten

## Fehlermeldungen verstehen

### "Bitte füllen Sie alle Pflichtfelder aus"
**Grund:** Projekt, Aufgabe, Datum oder Stunden fehlen
**Lösung:** Überprüfen Sie alle Felder

### "Fehler beim Laden der Projekte"
**Grund:** API-Verbindung fehlgeschlagen oder keine Projekte zugewiesen
**Lösung:** Überprüfen Sie Ihre MOCO-Berechtigungen

### "MOCO API Error: 401"
**Grund:** API Key ungültig oder abgelaufen
**Lösung:** Überprüfen Sie Ihren API Key in den Einstellungen

### "MOCO API Error: 422"
**Grund:** Ungültige Daten (z.B. Projekt/Aufgabe Kombination existiert nicht)
**Lösung:** Überprüfen Sie Ihre Auswahl

## Datenschutz & Sicherheit

### Was wird gespeichert?

**Lokal im Browser:**
- MOCO Domain
- API Key
- Keine Zeiteinträge
- Keine Projektdaten

**Nur temporär im Speicher:**
- Geladene Projekte und Aufgaben
- Heutige Zeiteinträge (für Anzeige)

### Was wird an MOCO gesendet?

- Nur die Daten, die Sie in die Formulare eingeben
- API Key für Authentifizierung
- Keine zusätzlichen Metadaten

### Was wird NICHT getan?

- ❌ Keine Tracking oder Analytics
- ❌ Keine Weitergabe an Dritte
- ❌ Keine automatischen Übertragungen
- ❌ Kein Zugriff auf andere Websites

## Support & Weiterführende Links

- [Installationsanleitung](INSTALLATION.md)
- [README](README.md)
- [MOCO API Dokumentation](https://everii-group.github.io/mocoapp-api-docs/)
- [GitHub Issues](https://github.com/ck-qm/moco-chrom-plugin/issues)

## Version & Updates

**Aktuelle Version:** 1.0.0

Um Updates zu erhalten:
1. Gehen Sie zu `chrome://extensions/`
2. Klicken Sie auf "Entwicklermodus"
3. Klicken Sie auf "Aktualisieren" (Update-Symbol)
4. Oder laden Sie die neueste Version von GitHub herunter
