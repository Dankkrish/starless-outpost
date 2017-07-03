# Starless outpost

## About

WIP

### Note on revision history

Majority of the development of this project occured in the repository of katamori.github.io - I tried to rebase the corresponding branch as well and long as I could, but the result is slightly confusing now.

Everything before commit `4c5345dea506e4f0ddbe3b7d27b4dc2e34da6743` is rebased content, with conflict resolving commits being commented with single numbers. None of those "snapshots" are working on their own, though, due to file access path failures.


## How to start

Simply pull and start `index.html` by opening it in any modern-day browser. Every recent release of Google Chrome, Mozilla Firefox, Opera and Safari should do the trick.

It should be mentioned, though, that the creators of Phaser [raised their concerns about locally running Javascript.](http://phaser.io/tutorials/getting-started) As such, it *might* be recommended for you to start a simple web server in the folder containing the game.

For me, Python's one-line solution is by far the simplest way of doing so, but your taste and expectations may vary.

Since this document is still work in progress, I may post some exact methods on your demands.

## Controls

### General

`W A S D` to move camera.

`X` to set it to the middle of the map automatically. If you scroll too far from the map, a message indicates it.

`Esc` to turn of following object, `E` to turn it on - currently hard-coded.

### Scenarios

`1` to load `followTest` scenario.

`2` to load `crowdTest` scenario.

`3` to load `giantMap` scenario.

`4` to load `strandedPeople` scenario.

### Debug

`B` to toggle object hitboxes.


