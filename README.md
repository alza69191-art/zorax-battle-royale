# ZORAX — Battle Royale

An original, low-spec-friendly tactical battle royale project.

## Playable prototype
The first browser prototype is in [`web/`](web/README.md). It uses Three.js directly rather than a traditional game engine.

To run it, serve the `web` folder with a local static HTTP server, then open the local address in a modern browser. See the web README for exact instructions and controls.

## Direction
- First target: a small, playable third-person arena prototype.
- Planned platforms: browser prototype first; Windows and mobile require separate packaging and compatibility validation.
- Long-term match target: up to 50 players. This is not implemented; it requires an authoritative multiplayer server and staged load testing.
- Visual identity: charcoal, dark olive, electric orange; original characters, weapons, vehicles, and maps.

## Repository
- `web/` — Three.js browser prototype.
- `docs/` — game design and technical roadmap.
- `assets/characters/` — approved character models and source notes.
- `assets/maps/` — map references and environment assets.
- `assets/weapons/` — weapon models and references.
- `game/coppercube/` — legacy experiments; not required to run the web prototype.

## Target PC constraints
Target hardware includes Windows 8.1, 3 GB RAM, and no discrete GPU. Keep scenes small, use low-poly assets, small textures, avoid real-time shadows, and test often. Actual browser performance depends on the graphics driver and browser.

## Current limitations
The web prototype is a first playable combat sandbox, not a finished Battle Royale game. Multiplayer, matchmaking, server authority, anti-cheat, mobile touch controls, vehicles, aircraft, inventory persistence, and production-ready character animations are not implemented yet.

## Asset licensing
Record source, license, and modification history for every external asset. Do not use PUBG names, logos, maps, characters, or copied designs.