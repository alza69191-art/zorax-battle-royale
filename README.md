# ZORAX — Battle Royale

An original, low-spec-friendly tactical battle royale prototype.

## Direction
- First target: a small, playable third-person arena prototype.
- Planned platforms: Windows first; web and mobile require separate compatibility validation.
- Long-term match target: up to 50 players. This is not an implemented capability; it requires an authoritative server and staged load testing.
- Visual identity: charcoal, dark olive, electric orange; original characters, weapons, vehicles, and maps.

## Current milestone
1. Verify the installed CopperCube build launches on Windows 8.1.
2. Create and reopen a blank scene.
3. Build a small graybox island with terrain, cover, and buildings.
4. Add player movement, camera, collision, and a weapon prototype.
5. Integrate and test ZORAX Operator 01.

## Repository
- `docs/` — design and technical plans.
- `assets/characters/` — approved character models and source notes.
- `assets/maps/` — map references and environment assets.
- `assets/weapons/` — weapon models and references.
- `game/` — CopperCube project files and scripts after version verification.

## Target PC constraints
Windows 8.1, 3 GB RAM, no discrete GPU. Keep scenes small, use low-poly assets, small textures, baked lighting where possible, and test often. Multiplayer for 50 players requires separate hosting, server authority, bandwidth planning, anti-cheat, and load tests.

## Asset licensing
Record source, license, and modification history for every external asset. Do not use PUBG names, logos, maps, characters, or copied designs.