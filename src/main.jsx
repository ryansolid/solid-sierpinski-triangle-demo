import { createSignal, onCleanup, createMemo, startTransition, enableScheduling } from "solid-js";
import { render } from "solid-js/web";

enableScheduling();
const TARGET = 25;

const TriangleDemo = () => {
  const [elapsed, setElapsed] = createSignal(0),
    [seconds, setSeconds] = createSignal(0),
    scale = createMemo(() => {
      const e = (elapsed() / 1000) % 10;
      return 1 + (e > 5 ? 10 - e : e) / 10;
    }),
    start = Date.now(),
    t = setInterval(() => startTransition(() => setSeconds((seconds() % 10) + 1)), 1000);

  let f;
  const update = () => {
    setElapsed(Date.now() - start);
    f = requestAnimationFrame(update);
  };
  f = requestAnimationFrame(update);

  onCleanup(() => {
    clearInterval(t), cancelAnimationFrame(f);
  });

  return (
    <div
      class="container"
      style={{
        transform: "scaleX(" + scale() / 2.1 + ") scaleY(0.7) translateZ(0.1px)"
      }}
    >
      <Triangle x={0} y={0} s={1000} seconds={seconds} />
    </div>
  );
};

const Triangle = ({ x, y, s, seconds }) => {
  if (s <= TARGET) {
    return <Dot x={x - TARGET / 2} y={y - TARGET / 2} s={TARGET} text={seconds} />;
  }
  s = s / 2;

  const slow = createMemo(() => {
    var e = performance.now() + 0.8;
    // Artificially long execution time.
    while (performance.now() < e) {}
    return seconds();
  });

  return (
    <>
      <Triangle x={x} y={y - s / 2} s={s} seconds={slow} />
      <Triangle x={x - s} y={y + s / 2} s={s} seconds={slow} />
      <Triangle x={x + s} y={y + s / 2} s={s} seconds={slow} />
    </>
  );
};

const Dot = ({ x, y, s, text }) => {
  const [hover, setHover] = createSignal(false),
    onEnter = () => setHover(true),
    onExit = () => setHover(false);

  return (
    <div
      class="dot"
      style={{
        width: s + "px",
        height: s + "px",
        left: x + "px",
        top: y + "px",
        "border-radius": s / 2 + "px",
        "line-height": s + "px",
        background: hover() ? "#ff0" : "#61dafb"
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      textContent={hover() ? "**" + text() + "**" : text()}
    />
  );
};

render(TriangleDemo, document.body);
