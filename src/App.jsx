import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { Island } from "./island/Island";
import { chapters } from "./island/story";

class WorldBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="world-error">
        <h2>The island couldn’t load.</h2>
        <p>You can still explore my story using the menu.</p>
        <button onClick={() => location.reload()}>Try again</button>
      </div>
    ) : (
      this.props.children
    );
  }
}
function Loading() {
  const { active, progress } = useProgress();
  return active ? (
    <div className="loading">
      Planting the island <span>{Math.round(progress)}%</span>
    </div>
  ) : null;
}
export default function App() {
  const [chapter, setChapter] = useState(null);
  const [near, setNear] = useState(null);
  const [score, setScore] = useState(0);
  const [shooting, setShooting] = useState(false);
  const [hint, setHint] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [visited, setVisited] = useState([]);
  const input = useRef({
    keys: new Set(),
    touch: { x: 0, z: 0 },
    jump: false,
    teleport: null,
    shot: false,
    reset: false,
    blocked: false,
  });
  const open = useCallback((id) => {
    setChapter(id);
    setVisited((v) => (v.includes(id) ? v : [...v, id]));
  }, []);
  const act = useCallback(() => {
    if (chapter) return;
    if (near === "basket") input.current.shot = true;
    else if (near === "rocks")
      setHint("A little outdoor escape. Climbing photos will live here.");
    else if (near) open(near);
  }, [near, chapter, open]);
  useEffect(() => {
    input.current.blocked = !!chapter;
    input.current.keys.clear();
    input.current.touch = { x: 0, z: 0 };
    input.current.jump = false;
  }, [chapter]);
  useEffect(() => {
    const down = (e) => {
      if (e.target.closest?.("input, textarea, select") && e.code !== "Escape")
        return;
      if (e.code === "Space" && e.target.closest?.("button")) return;
      if (
        ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
          e.code,
        )
      )
        e.preventDefault();
      if (e.code === "Escape") setChapter(null);
      if (e.repeat) return;
      if (e.code === "KeyE") act();
      if (e.code === "KeyR" && !chapter) input.current.reset = true;
      if (e.code === "Space" && !chapter) input.current.jump = true;
      input.current.keys.add(e.code);
    };
    const up = (e) => input.current.keys.delete(e.code);
    const clear = () => {
      input.current.keys.clear();
      input.current.touch = { x: 0, z: 0 };
      input.current.jump = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", clear);
    };
  }, [act, chapter]);
  useEffect(() => {
    if (!hint) return;
    const t = setTimeout(() => setHint(""), 4500);
    return () => clearTimeout(t);
  }, [hint]);
  const travel = (id) => {
    setChapter(null);
    input.current.teleport =
      id === "basket"
        ? [7, 0, 6]
        : id === "rocks"
          ? [-8, 0, 7.8]
          : chapters.find((c) => c.id === id).arrival;
    setHint(
      id === "basket"
        ? "Press E or tap Take a shot. Make yourself at home."
        : "Walk up to the marker, or open a chapter from My story.",
    );
  };
  const c = chapters.find((c) => c.id === chapter);
  const closeRef = useRef();
  useEffect(() => {
    if (chapter) closeRef.current?.focus();
  }, [chapter]);
  return (
    <main>
      <WorldBoundary>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          orthographic
          camera={{ position: [20, 24, 30], zoom: 32, near: 0.1, far: 120 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Island
              input={input}
              onNear={setNear}
              onScore={() => {
                setScore((s) => s + 1);
                setHint("Swish. There’s always time for one more.");
              }}
              onShooting={setShooting}
              onReady={() => setLoaded(true)}
            />
          </Suspense>
        </Canvas>
      </WorldBoundary>
      <Loading />
      <header className="topbar">
        <a
          className="wordmark"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            input.current.reset = true;
          }}
        >
          ismail<span className="wordmark-dot">.</span>
        </a>
        <div className="edition">A SMALL WORLD, ALWAYS IN PROGRESS</div>
        <select
          className="travel-select"
          aria-label="Explore the island"
          value=""
          onChange={(e) => travel(e.target.value)}
        >
          <option value="" disabled>
            Explore ↗
          </option>
          <option value="build">The workshop</option>
          <option value="basket">Shoot some hoops</option>
          <option value="rocks">The boulder garden</option>
          <option value="next">Next stop: SF</option>
        </select>
        <button className="story-toggle" onClick={() => open("spark")}>
          My story <span>↗</span>
        </button>
      </header>
      <section className="intro">
        <div className="eyebrow">
          <span className="status-dot" /> BUILDER · LONDON → SF
        </div>
        <h1>
          A little world.
          <br />A lot of curiosity.
        </h1>
        <p>
          I make things. Sometimes useful.
          <br />
          Sometimes just because it feels like magic.
        </p>
      </section>
      <aside className="destinations" aria-label="Explore the island">
        <span className="eyebrow">TAKE THE SCENIC ROUTE</span>
        <button onClick={() => travel("build")}>
          <span>01</span> The workshop <b>↗</b>
        </button>
        <button onClick={() => travel("basket")}>
          <span>02</span> Shoot some hoops <b>↗</b>
        </button>
        <button onClick={() => travel("rocks")}>
          <span>03</span> The boulder garden <b>↗</b>
        </button>
        <button onClick={() => travel("next")}>
          <span>04</span> Next stop: SF <b>↗</b>
        </button>
      </aside>
      <div className="world-caption">
        <span className="tiny-star">✳</span> THE CURIOSITY ISLAND{" "}
        <span className="caption-sub">Est. with a little imagination</span>
      </div>
      {hint && (
        <div className="toast" role="status">
          {hint}
        </div>
      )}
      {near && !chapter && loaded && (
        <div className="interaction">
          <span>
            {near === "basket"
              ? `HALF-COURT · ${score} ${score === 1 ? "BASKET" : "BASKETS"}`
              : near === "rocks"
                ? "A BREATH OF FRESH AIR"
                : chapters.find((v) => v.id === near)?.period}
          </span>
          <button onClick={act} disabled={near === "basket" && shooting}>
            <kbd>E</kbd>
            {near === "basket"
              ? shooting
                ? "Nice arc…"
                : "Take a shot"
              : near === "rocks"
                ? "The boulder garden"
                : chapters.find((v) => v.id === near)?.short}
            <b>↗</b>
          </button>
        </div>
      )}
      <footer>
        <div className="desktop-controls">
          <kbd>W A S D</kbd> move <i /> <kbd>SHIFT</kbd> run <i />{" "}
          <kbd>SPACE</kbd> jump <i /> <kbd>E</kbd> explore
        </div>
        <button
          className="reset"
          onClick={() => {
            input.current.reset = true;
            setHint("Back on solid ground.");
          }}
        >
          ↺ Reset position
        </button>
        <span className="chapter-count">
          {visited.length} / 4 chapters discovered
        </span>
      </footer>
      <div className="touch-controls" aria-label="Movement controls">
        {[
          ["↑", 0, -1],
          ["←", -1, 0],
          ["↓", 0, 1],
          ["→", 1, 0],
        ].map(([label, x, z]) => (
          <button
            key={label}
            aria-label={`Move ${label}`}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              input.current.touch = { x, z };
            }}
            onPointerUp={() => (input.current.touch = { x: 0, z: 0 })}
            onPointerCancel={() => (input.current.touch = { x: 0, z: 0 })}
            onLostPointerCapture={() => (input.current.touch = { x: 0, z: 0 })}
          >
            {label}
          </button>
        ))}
        <button aria-label="Jump" onClick={() => (input.current.jump = true)}>
          ↟
        </button>
      </div>
      {c && (
        <div className="modal-shade" onClick={() => setChapter(null)}>
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="chapter-title"
            className="story-card"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                const items = [...e.currentTarget.querySelectorAll("button")];
                const first = items[0],
                  last = items[items.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                  e.preventDefault();
                  last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first.focus();
                }
              }
            }}
          >
            <button
              className="close"
              ref={closeRef}
              aria-label="Close story"
              onClick={() => setChapter(null)}
            >
              ×
            </button>
            <span className="eyebrow">
              CHAPTER {c.number} / {c.period}
            </span>
            <div className="chapter-art">
              {c.id === "spark"
                ? "✳"
                : c.id === "build"
                  ? "⌘"
                  : c.id === "whim"
                    ? "w."
                    : "↗"}
            </div>
            <h2 id="chapter-title">{c.title}</h2>
            <p>{c.text}</p>
            <p>{c.extra}</p>
            <nav aria-label="Story chapters">
              {chapters.map((item) => (
                <button
                  key={item.id}
                  className={item.id === c.id ? "selected" : ""}
                  aria-label={item.short}
                  aria-current={item.id === c.id ? "step" : undefined}
                  onClick={() => open(item.id)}
                >
                  {item.number}
                </button>
              ))}
              <button className="back-world" onClick={() => setChapter(null)}>
                Back to the island ↗
              </button>
            </nav>
          </article>
        </div>
      )}
    </main>
  );
}
