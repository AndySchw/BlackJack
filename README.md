# BlackJack Spiel

Dieses Projekt enthält den Quellcode für ein einfaches BlackJack-Spiel. Es besteht aus einer HTML-Datei, einer CSS-Datei und einer JavaScript-Datei, die alle notwendigen Funktionen und Stile enthalten, um das Spiel zu spielen.

## Inhaltsverzeichnis

- [Dateien](#dateien)
- [Spielablauf](#spielablauf)
- [Funktionen](#funktionen)
- [Verwendete Ressourcen](#verwendete-ressourcen)
- [Installation und Ausführung](#installation-und-ausführung)
- [Mitwirkende](#mitwirkende)
- [Lizenz](#lizenz)

## Dateien

Das Projekt besteht aus den folgenden Dateien:

- `index.html`: Die Haupt-HTML-Datei, die die Spieloberfläche und das Markup enthält.
- `main.css`: Die CSS-Datei, die das Aussehen und das Layout der Spieloberfläche definiert.
- `main.js`: Die JavaScript-Datei, die die Spiellogik implementiert.

## Spielablauf

Das Spiel beginnt, nach dem Laden der Seite. Dabei werden die Karten gemischt und an den Dealer und den Spieler ausgeteilt. Der Dealer erhält eine Karte verdeckt und eine Karte offen, während der Spieler zwei Karten offen erhält.

Der Spieler hat die Möglichkeit, entweder eine weitere Karte zu ziehen ("Hit") oder keine weiteren Karten zu ziehen ("Stay"). Das Ziel des Spiels ist es, mit den gezogenen Karten möglichst nahe an eine Summe von 21 zu gelangen, ohne diese zu überschreiten.

Wenn der Spieler sich entscheidet, keine weiteren Karten zu ziehen, ist der Dealer an der Reihe. Der Dealer zieht solange Karten, bis er eine Summe von mindestens 17 erreicht oder überschreitet. Danach werden die Karten des Dealers aufgedeckt und die Ergebnisse werden verglichen. Der Spieler mit der höheren Summe, die aber nicht über 21 liegt, gewinnt das Spiel.

Nach dem Ende einer Runde startet nach 4 Sekunden eine neue, ohne den Spielstand zu verlieren. Nach dem Drücken des "Neustart" Button werden die Spielerstände zurückgesetzt.

## Funktionen

Das Spiel implementiert die folgenden JavaScript-Funktionen:

- `window.onload`: Diese Funktion wird beim Laden der Seite aufgerufen und initialisiert das Spiel, indem sie die Karten mischt und die erste Runde startet.
- `alleKarten`: Diese Funktion erstellt ein Array mit allen möglichen Kartenkombinationen.
- `mischen`: Diese Funktion mischt das Karten-Array, um eine zufällige Reihenfolge der Karten zu erhalten.
- `getValue`: Diese Funktion gibt den Wert einer Karte basierend auf ihrem Namen zurück.
- `starten`: Diese Funktion startet eine neue Runde, indem sie die Karten an den Dealer und den Spieler verteilt.
- `hit`: Diese Funktion wird aufgerufen, wenn der Spieler auf den "Hit" Button klickt und zieht eine weitere Karte für den Spieler.
- `halt`: Diese Funktion wird aufgerufen, wenn der Spieler auf den "Stay" Button klickt und beendet den Zug des Spielers, vergleicht die Ergebnisse und bestimmt den Gewinner.
- `checkAce`: Diese Funktion überprüft, ob eine Karte ein Ass ist und gibt entsprechend einen Wert zurück.
- `reduceAce`: Diese Funktion reduziert den Wert von Assen, wenn die Gesamtsumme der Karten des Spielers 21 überschreitet.

## Verwendete Ressourcen

Das Projekt verwendet keine externen Bibliotheken oder Ressourcen. Es basiert ausschließlich auf HTML, CSS und JavaScript.

## Installation und Ausführung

Um das BlackJack-Spiel auszuführen, folgen Sie bitte den nachstehenden Schritten:

1. Laden Sie alle Projektdateien herunter und speichern Sie sie in einem lokalen Verzeichnis.

2. Öffnen Sie die `index.html`-Datei in einem Webbrowser Ihrer Wahl.

3. Das BlackJack-Spiel wird im Browser geladen, und Sie können das Spiel starten.

Viel Spaß beim Spielen!

## Mitwirkende

Wenn Sie zum Projekt beitragen möchten, können Sie gerne Forks erstellen und Pull Requests einreichen.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden Sie in der LICENSE-Datei.
