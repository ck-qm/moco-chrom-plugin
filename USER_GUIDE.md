# MOCO Time Tracker - Benutzerhandbuch

## 🎯 Kurzübersicht

Die MOCO Time Tracker Chrome-Erweiterung ermöglicht schnelle und einfache Zeiterfassung direkt aus dem Browser.

### Hauptfunktionen

| Feature | Beschreibung |
|---------|--------------|
| ⏱️ **Timer** | Start/Stop-Timer für automatische Zeiterfassung |
| 📝 **Manuelle Eingabe** | Direkte Zeiterfassung mit Stunden-Angabe |
| ⏰ **Anpassungen** | Nachträgliche Änderung in 15-Min-Schritten |
| 📊 **Übersicht** | Anzeige aller heutigen Einträge |
| ⚠️ **Warnungen** | Benachrichtigung bei >10h Arbeitszeit |
| 🔐 **Sicher** | Lokale Speicherung aller Zugangsdaten |

---

## 📥 Installation

### Schritt 1: Extension laden

1. Repository herunterladen
2. Chrome öffnen → `chrome://extensions/`
3. "Entwicklermodus" aktivieren (oben rechts)
4. "Entpackte Erweiterung laden" klicken
5. Ordner auswählen

### Schritt 2: API konfigurieren

1. MOCO-Icon in Chrome-Symbolleiste klicken
2. "Einstellungen öffnen" wählen
3. **Domain** eingeben (nur Firmenname, z.B. `ihre-firma`)
4. **API Key** einfügen (aus MOCO → Profil → Integrationen)
5. "Verbindung testen" klicken
6. Bei Erfolg: "Speichern" klicken

---

## 🚀 Funktionen im Detail

### ⏱️ Timer-Funktion

**Timer starten:**
1. Projekt auswählen
2. Aufgabe auswählen
3. Optional: Notiz eingeben
4. "▶ Timer starten" klicken

**Während Timer läuft:**
- Läuft-Anzeige wird eingeblendet
- Elapsed Time wird angezeigt (HH:MM)
- Badge zeigt "▶" (grün)
- Timer läuft im Hintergrund weiter

**Timer stoppen:**
1. "⏹ Timer stoppen" klicken
2. Zeit wird automatisch gerundet (auf 0,25h)
3. Eintrag wird in MOCO erstellt
4. Erfolgsm eldung wird angezeigt

```
Beispiel:
Timer läuft 1:37 → wird zu 1,75 Stunden (1h 45min)
Timer läuft 2:03 → wird zu 2,00 Stunden (2h 00min)
```

### 📝 Manuelle Zeiterfassung

**Eintrag erstellen:**
1. Projekt auswählen
2. Aufgabe auswählen
3. Datum wählen (Standard: heute)
4. Stunden eingeben (z.B. 2.5 für 2,5h)
5. Optional: Notiz hinzufügen
6. "Zeiterfassung erstellen" klicken

**Tipps:**
- Verwenden Sie Dezimalzahlen: 1.5 = 1,5 Stunden
- 0.25 = 15 Minuten
- 0.5 = 30 Minuten
- 0.75 = 45 Minuten

### ⏰ Zeit-Anpassungen

**Vorhandene Einträge anpassen:**

Jeder heutige Eintrag zeigt zwei Buttons:
- **− 15 Min**: Subtrahiert 0,25 Stunden
- **+ 15 Min**: Addiert 0,25 Stunden

**Verwendung:**
1. Eintrag in der Liste finden
2. "+ 15 Min" oder "− 15 Min" klicken
3. Änderung wird sofort in MOCO gespeichert
4. Angepasste Zeit wird angezeigt

**Hinweis:** Minimale Zeit ist 0,25h (15 Minuten)

### ⚠️ Arbeitszeit-Warnung

**Automatische Überwachung:**
- System addiert alle heutigen Stunden
- Bei >10 Stunden: Freundliche Warnung
- Ermutigt zu Pausen und Erholung

**Warnungs-Popup:**
```
⚠️ Hohe Arbeitszeit
Sie haben heute bereits 10.50 Stunden erfasst.
Das ist mehr als üblich. Bitte achten Sie auf 
ausreichend Pausen und Erholung! 🌟
```

### 📊 Tagesübersicht

**Anzeige heutiger Einträge:**
- Projekt- und Aufgabenname
- Erfasste Stunden
- Erstellungszeit
- Optional: Notiz
- Anpassungs-Buttons

**Aktualisieren:**
- Klicken Sie "Aktualisieren" für neueste Daten
- Automatische Aktualisierung nach Änderungen

---

## 🔔 Badge-Status

Das Extension-Icon zeigt den aktuellen Status:

| Badge | Status | Bedeutung |
|-------|--------|-----------|
| ▶ (grün) | Timer läuft | Aktive Zeiterfassung |
| Leer | Timer gestoppt | Keine aktive Erfassung |

**Hover-Info:**
- Mit Timer: "Timer läuft: [Projektname]"
- Ohne Timer: "MOCO Time Tracker"

---

## 🔒 Sicherheit

**Lokale Datenspeicherung:**
- ✅ API-Zugangsdaten nur im Browser
- ✅ Verschlüsselt durch Chrome
- ✅ Keine Weitergabe an Dritte
- ✅ Kein Tracking oder Analytics

**Berechtigungen:**
- `storage`: Lokale Datenspeicherung
- `alarms`: Timer-Updates
- `https://*.mocoapp.com/*`: MOCO API Zugriff

---

## 💡 Best Practices

### Timer-Nutzung

**✅ Empfohlen:**
- Timer bei Arbeitsbeginn starten
- Für fokussierte Arbeitsblöcke nutzen
- Bei längeren Pausen stoppen

**⚠️ Hinweise:**
- Timer läuft auch bei geschlossenem Popup
- Timer überlebt Browser-Neustart
- Nur ein Timer gleichzeitig

### Zeiterfassung

**Genauigkeit:**
- Timer rundet auf 0,25h (15 Min)
- Anpassungen in 15-Min-Schritten
- Manuelle Eingabe: beliebige Genauigkeit

**Organisation:**
- Notizen für Nachvollziehbarkeit
- Zeitnahe Erfassung empfohlen
- Tägliche Überprüfung der Einträge

---

## ❓ Häufige Fragen

### Wie lange läuft der Timer?
Der Timer läuft unbegrenzt, auch bei geschlossenem Browser. Er stoppt nur durch manuelles Stoppen.

### Was passiert bei Browser-Neustart?
Timer-Status wird gespeichert und fortgesetzt. Elapsed Time wird korrekt berechnet.

### Kann ich mehrere Timer gleichzeitig laufen lassen?
Nein, nur ein Timer gleichzeitig. Stoppen Sie den aktuellen Timer vor dem Start eines neuen.

### Wie ändere ich einen Eintrag von gestern?
Nutzen Sie MOCO direkt. Die Extension zeigt nur heutige Einträge.

### Was bedeutet die 10-Stunden-Warnung?
Sie soll Sie daran erinnern, auf Ihre Arbeitszeit zu achten. Sie können trotzdem weiter erfassen.

---

## 🛠️ Troubleshooting

### Timer startet nicht
- ✅ Projekt und Aufgabe ausgewählt?
- ✅ API-Verbindung aktiv?
- ✅ Anderen Timer gestoppt?

### Einträge werden nicht angezeigt
- ✅ "Aktualisieren" klicken
- ✅ API-Zugangsdaten überprüfen
- ✅ Datum korrekt (nur heute)?

### Anpassungs-Buttons funktionieren nicht
- ✅ API-Verbindung aktiv?
- ✅ Berechtigung für Projekt?
- ✅ Eintrag von heute?

---

## 📞 Support

Bei Problemen oder Fragen:
- 📖 [Vollständige README](README.md)
- 📝 [Installationsanleitung](INSTALLATION.md)
- 🔧 [GitHub Issues](https://github.com/ck-qm/moco-chrom-plugin/issues)

---

## 🔄 Version

**Aktuelle Version:** 1.1.0

**Changelog:**
- ✅ Timer-Funktion mit Start/Stop
- ✅ Badge-Status-Anzeige
- ✅ 15-Minuten-Anpassungen
- ✅ 10-Stunden-Warnung
- ✅ Verbesserte Sicherheit
- ✅ XSS-Schutz

---

*Erstellt für einfache und effiziente Zeiterfassung mit MOCO*
