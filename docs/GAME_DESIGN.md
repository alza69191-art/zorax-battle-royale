# ZORAX — Game Design Brief

## High concept
ZORAX is an original tactical battle royale built around readable combat, compact environments, and scalable performance.

## First playable prototype
- One small island arena (graybox, not final art).
- One playable operator.
- Third-person movement and camera.
- Basic collision and fall protection.
- One placeholder rifle with firing, reload, and hit feedback.
- A small set of cover objects and enterable test structures.
- Offline test session first; bots later.

## Match concept
The long-term target is up to 50 players per match. The first prototype will not attempt 50 networked players. Player count increases only after server authority, bandwidth, synchronization, latency, and load tests pass.

## Core loop (planned)
1. Enter lobby and ready up.
2. Deploy into the arena.
3. Search for equipment and positioning.
4. Fight while the playable zone contracts.
5. Survive to the final team/player.
6. Earn progression rewards and return to lobby.

## Original visual identity
- Primary colors: charcoal black, dark olive, electric orange, and muted steel.
- Silhouette language: angular, practical, readable at distance.
- Avoid visual imitation of existing battle royale franchises.

## First map: working title — REDLINE ISLAND
A compact island prototype with a coastal landing zone, industrial yard, small residential block, radio hill, and central logistics depot. Layout and scale will be tuned after the first playable test.

## Performance principles
- Start with low-poly geometry and few materials.
- Prefer 512–1024 px textures for common props.
- Use level-of-detail and visibility culling where supported.
- Keep dynamic lights and particle counts low.
- Measure frame rate and memory on the actual target PC.