# Ismail’s Curiosity Island

A first playable portfolio prototype built with React Three Fiber and Rapier. The original avatar is retained; the island scenery is procedural JSX and does not require downloaded model packs.

## Run

```sh
npm install
npm start -- --host 127.0.0.1 --port 5174
npm run build
node --test tests/mechanics.test.js
```

WASD / arrows move relative to the camera, Shift runs, Space jumps, E interacts, and R resets the avatar. The navigation buttons (or Explore menu on narrow screens) travel to each place. Touch movement controls are available on phones. Story cards support keyboard navigation and Escape.

## Included

- Workshop, boulder garden, half-court, Whim exhibit, London-to-SF departure board.
- Four story chapters based on Ismail’s supplied biography.
- Instanced reactive grass, moving flowers, pushable crates with recovery.
- Basketball shot with physics, descending-rim scoring, repeat-shot lock and reset.
- Ground-checked jump with a brief grace period, normalised movement, exponential smoothing, fixed physics step, input clearing on blur, and fall recovery.

`src/island/` contains the scene, player, grass shader, narrative and shared interaction maths. `src/App.jsx` owns the accessible HTML interface. The earlier scene components remain available under `src/components/`, but are no longer mounted. The avatar component filters an incompatible Armature animation track.

## Prototype boundaries

The boulders have collision but do not yet implement a climbing game. Climbing photos and project media have not been supplied. The basketball is an assisted repeatable shot, not a free-aim simulator. Story discovery and scores are session-only. There is no contact submission or invented contact information. No deployment has been made.

Production still needs asset/bundle optimisation, physical mobile-device performance testing and longer playtesting. The existing Vite build reports a large JavaScript bundle and warnings from dependency code.
