# MOCO Time Tracker - Schnellreferenz

> **Visueller Leitfaden** für die Chrome Extension zur MOCO-Zeiterfassung

---

## 🎯 Auf einen Blick

### Was kann die Extension?

<table>
<tr>
<td width="50%">

**⏱️ Timer-Modus**
- Automatische Zeiterfassung
- Start/Stop per Klick
- Läuft im Hintergrund
- Badge zeigt Status

</td>
<td width="50%">

**📝 Manuelle Eingabe**
- Direkte Stundenangabe
- Projekt & Aufgabe wählen
- Notiz hinzufügen
- Sofort gespeichert

</td>
</tr>
<tr>
<td>

**⏰ Anpassungen**
- +/- 15 Minuten
- Per Button-Klick
- Für heutige Einträge
- Sofort aktualisiert

</td>
<td>

**📊 Übersicht**
- Alle heutigen Einträge
- Projekt & Zeit
- Mit Notizen
- Aktualisierbar

</td>
</tr>
</table>

---

## 🚦 Schnellstart

### 1️⃣ Installation (einmalig)

```
Chrome öffnen
  ↓
chrome://extensions/
  ↓
Entwicklermodus AN
  ↓
"Entpackte Erweiterung laden"
  ↓
Ordner auswählen
  ↓
✅ Fertig!
```

### 2️⃣ Konfiguration (einmalig)

```
Extension-Icon klicken
  ↓
"Einstellungen öffnen"
  ↓
Domain eingeben (z.B. "meine-firma")
  ↓
API Key einfügen
  ↓
"Verbindung testen"
  ↓
Bei Erfolg: "Speichern"
  ↓
✅ Fertig!
```

---

## ⏱️ Timer verwenden

### Start

<table>
<tr><td width="30%"><strong>Schritt</strong></td><td><strong>Aktion</strong></td></tr>
<tr><td>1. Projekt</td><td>Aus Liste wählen</td></tr>
<tr><td>2. Aufgabe</td><td>Aus Liste wählen</td></tr>
<tr><td>3. Notiz</td><td>Optional eingeben</td></tr>
<tr><td>4. Start</td><td>"▶ Timer starten" klicken</td></tr>
</table>

**Ergebnis:**
- ✅ Badge wird grün mit "▶"
- ✅ Elapsed Time läuft
- ✅ Timer im Hintergrund aktiv

### Stop

<table>
<tr><td width="30%"><strong>Schritt</strong></td><td><strong>Aktion</strong></td></tr>
<tr><td>1. Stop</td><td>"⏹ Timer stoppen" klicken</td></tr>
<tr><td>2. Auto</td><td>Zeit wird gerundet (0,25h)</td></tr>
<tr><td>3. Auto</td><td>Eintrag wird erstellt</td></tr>
<tr><td>4. Info</td><td>Erfolgsmel dung erscheint</td></tr>
</table>

**Ergebnis:**
- ✅ Badge wird leer
- ✅ Eintrag in Liste sichtbar
- ✅ In MOCO gespeichert

---

## 📝 Manuelle Eingabe

### Formular ausfüllen

| Feld | Beispiel | Pflicht |
|------|----------|---------|
| **Projekt** | Website Redesign | ✅ Ja |
| **Aufgabe** | Entwicklung | ✅ Ja |
| **Datum** | 21.11.2025 | ✅ Ja |
| **Stunden** | 2.5 | ✅ Ja |
| **Notiz** | "Frontend implementiert" | ⚪ Nein |

### Stunden-Eingabe

| Eingabe | Bedeutung | Verwendung |
|---------|-----------|------------|
| `0.25` | 15 Minuten | Kurze Aufgabe |
| `0.5` | 30 Minuten | Halbe Stunde |
| `0.75` | 45 Minuten | Drei Viertel |
| `1` | 1 Stunde | Eine Stunde |
| `1.5` | 1,5 Stunden | Eineinhalb |
| `2.5` | 2,5 Stunden | Zweieinhalb |

---

## ⏰ Zeit anpassen

### Buttons in Einträgen

Jeder Eintrag zeigt:

```
┌─────────────────────────────────┐
│ Website Redesign                │
│ Entwicklung                     │
│ 2.50 Stunden         09:30      │
│ Frontend implementiert          │
│ ┌──────────┐  ┌──────────┐     │
│ │ − 15 Min │  │ + 15 Min │     │
│ └──────────┘  └──────────┘     │
└─────────────────────────────────┘
```

### Verwendung

**Zeit reduzieren:**
- "− 15 Min" klicken
- Subtrahiert 0,25 Stunden
- Minimum: 0,25h (15 Min)

**Zeit erhöhen:**
- "+ 15 Min" klicken
- Addiert 0,25 Stunden
- Kein Maximum

---

## 🔔 Badge-Bedeutung

| Anzeige | Status | Bedeutung |
|---------|--------|-----------|
| **▶** 🟢 | Läuft | Timer ist aktiv |
| *Leer* | Stop | Kein Timer aktiv |

**Hover zeigt:**
- Mit Timer: "Timer läuft: Projektname"
- Ohne Timer: "MOCO Time Tracker"

---

## ⚠️ Warnung bei >10h

### Automatische Überwachung

```
Tageszeit berechnen
  ↓
> 10 Stunden?
  ↓ Ja
Popup anzeigen
  ↓
"⚠️ Hohe Arbeitszeit
Sie haben heute bereits X Stunden erfasst.
Bitte achten Sie auf Pausen! 🌟"
  ↓
"Verstanden" klicken
```

**Hinweis:** Dies ist nur eine freundliche Erinnerung. Sie können weiter erfassen.

---

## 💡 Tipps & Tricks

### ⚡ Effizienz

<table>
<tr>
<td width="50%">

**✅ DO**
- Timer für fokussierte Arbeit
- Notizen für Nachvollziehbarkeit
- Regelmäßige Pausenmeldung beachten
- Tägliche Übersichtsprüfung

</td>
<td width="50%">

**❌ DON'T**
- Timer über Nacht laufen lassen
- Mehrere Timer gleichzeitig (nicht möglich)
- Zu genaue manuelle Eingaben (z.B. 2.387h)
- Gestern-Einträge hier ändern (MOCO nutzen)

</td>
</tr>
</table>

### 🎯 Best Practices

| Szenario | Empfehlung |
|----------|------------|
| **Langer Arbeitsblock** | Timer verwenden (Start/Stop) |
| **Mehrere kurze Aufgaben** | Manuell zusammenfassen |
| **Vergessene Zeit** | Manuell mit korrektem Datum |
| **Anpassung nötig** | +/- Buttons verwenden |
| **Überprüfung** | Aktualisieren-Button klicken |

---

## 🛠️ Probleme lösen

### Häufige Probleme

<table>
<tr>
<th width="40%">Problem</th>
<th>Lösung</th>
</tr>
<tr>
<td>Timer startet nicht</td>
<td>
✓ Projekt & Aufgabe gewählt?<br>
✓ Anderen Timer gestoppt?<br>
✓ API-Verbindung ok?
</td>
</tr>
<tr>
<td>Keine Einträge sichtbar</td>
<td>
✓ "Aktualisieren" klicken<br>
✓ Heute Einträge erstellt?<br>
✓ API-Key korrekt?
</td>
</tr>
<tr>
<td>Anpassung klappt nicht</td>
<td>
✓ Eintrag von heute?<br>
✓ API-Verbindung ok?<br>
✓ Berechtigung vorhanden?
</td>
</tr>
<tr>
<td>Badge zeigt nichts</td>
<td>
✓ Extension aktiviert?<br>
✓ Timer tatsächlich laufend?<br>
✓ Browser neu gestartet?
</td>
</tr>
</table>

---

## 📊 Zeiterfassung-Workflow

### Täglicher Ablauf (Beispiel)

```
08:00 - Arbeitsbeginn
  ↓ Timer starten (Projekt A, Entwicklung)
10:30 - Timer stoppen → 2,5h erfasst
  ↓ Kurze Pause
10:45 - Timer starten (Projekt B, Testing)
12:00 - Timer stoppen → 1,25h erfasst
  ↓ Mittagspause
13:00 - Manuell erfassen (Meeting, 1h)
  ↓
14:00 - Timer starten (Projekt A, Doku)
16:30 - Timer stoppen → 2,5h erfasst
  ↓
Ende: Übersicht prüfen, ggf. anpassen
```

**Tages-Total:** 7,25 Stunden ✅

---

## 🔐 Sicherheit

### Datenschutz

| Was | Wo gespeichert | Verschlüsselt |
|-----|----------------|---------------|
| API Key | Lokal (Chrome) | ✅ Ja |
| Domain | Lokal (Chrome) | ✅ Ja |
| Timer-Status | Lokal (Chrome) | ✅ Ja |
| Zeiteinträge | Nur in MOCO | ✅ Ja |

**Garantie:**
- ❌ Keine Cloud-Speicherung
- ❌ Keine Drittanbieter-Zugriffe
- ❌ Kein Tracking
- ❌ Keine Analytics

---

## 📞 Hilfe & Support

### Dokumentation

| Dokument | Inhalt | Link |
|----------|--------|------|
| **USER_GUIDE.md** | Ausführliches Handbuch | [Öffnen](USER_GUIDE.md) |
| **README.md** | Technische Details | [Öffnen](README.md) |
| **INSTALLATION.md** | Setup-Anleitung | [Öffnen](INSTALLATION.md) |
| **USAGE.md** | Verwendungsbeispiele | [Öffnen](USAGE.md) |

### Support

- 💬 GitHub Issues: [Problem melden](https://github.com/ck-qm/moco-chrom-plugin/issues)
- 📧 MOCO API: [MOCO Dokumentation](https://everii-group.github.io/mocoapp-api-docs/)

---

## 📋 Checkliste

### Tägliche Nutzung

- [ ] Timer bei Arbeitsbeginn starten
- [ ] Bei Pausenende neuen Timer starten oder stoppen
- [ ] Am Tagesende Übersicht prüfen
- [ ] Bei >10h Warnung beachten
- [ ] Fehlende Einträge manuell nachtragen

### Wöchentliche Pflege

- [ ] MOCO auf Vollständigkeit prüfen
- [ ] Projekt-/Aufgabenliste aktuell?
- [ ] API-Verbindung funktioniert?

---

*Version 1.1.0 - Zeiterfassung leicht gemacht* ⏱️
