# ZORAX Web Prototype

A lightweight, original third-person combat sandbox built with Three.js (not a traditional game engine).

## Run
Open `index.html` through a local static web server. ES modules and import maps are not consistently supported from `file://` URLs.

If Python 3 is installed:
```bash
cd web
python -m http.server 8000
```
Then open `http://localhost:8000`.

The Three.js module is loaded from jsDelivr, so the first run requires an internet connection.

## Controls
- W / A / S / D: move
- Mouse: aim
- Left click: fire
- Shift: sprint
- Space: jump
- R: reload
- Escape: release mouse / pause

## Current build
- Procedural low-poly desert training arena
- Third-person operator and follow camera
- Basic movement, sprint, jump, simple building collision
- Five stationary hostile practice targets
- Hitscan shooting, ammo, reload, target counter and HUD
- Low-cost renderer settings for older hardware

## Not implemented yet
This is the first playable prototype, not a finished Battle Royale game. It has no multiplayer, server authority, matchmaking, inventory persistence, vehicles, aircraft, shrinking zone, anti-cheat, mobile touch controls, or production-ready character animations. These systems need separate implementation and testing.

## Performance
The scene intentionally uses simple geometry, no real-time shadows, and capped pixel ratio. Actual performance depends on browser, graphics driver, and available memory.