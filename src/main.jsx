import { createSignal, onCleanup, createMemo, createEffect } from 'solid-js';
import { render } from 'solid-js/dom';

const TARGET = 25;

const dePrioritize = signal => {
  let i, t;
  const [delayed, setDelayed] = createSignal(signal()),
    box = { current: null },
    method = () => {
      cancelIdleCallback(i);
      clearTimeout(t);
      t = null;
      setDelayed(box.current);
    };
  createEffect(() => {
    box.current = signal();
    cancelIdleCallback(i);
    if (!t) t = setTimeout(method, ~~(Math.random() * 4 + 1) * 100);
    i = requestIdleCallback(method);
  });
  return delayed;
}

const TriangleDemo = () => {
  const [elapsed, setElapsed] = createSignal(0),
    [seconds, setSeconds] = createSignal(0),
    scale = createMemo(() => {
      const e = elapsed() / 1000 % 10;
      return  1 + (e > 5 ? 10 - e : e) / 10;
    }),
    start = Date.now(),
    t = setInterval(() => setSeconds((seconds() % 10) + 1), 1000);

  let f;
  const update = () => {
    setElapsed(Date.now() - start);
    f = requestAnimationFrame(update);
  }
  f = requestAnimationFrame(update);

  onCleanup(() => {clearInterval(t), cancelAnimationFrame(f)});

  return <div class='container' style={{transform: 'scaleX(' + scale() / 2.1 + ') scaleY(0.7) translateZ(0.1px)'}}>
    <Triangle x={0} y={0} s={1000} seconds={seconds} />
  </div>
}

const Triangle = ({ x, y, s, seconds }) => {
  if (s <= TARGET) {
    return <Dot x={x - TARGET / 2} y={y - TARGET / 2} s={TARGET} text={seconds} />
  }
  s = s / 2;

  if (s === 125) seconds = dePrioritize(seconds);

  // var slowDown = true;
  // if (slowDown) {
  //   var e = performance.now() + 0.8;
  //   while (performance.now() < e) {
  //     // Artificially long execution time.
  //   }
  // }

  return <>
    <Triangle x={x} y={y - s / 2} s={s} seconds={seconds} />
    <Triangle x={x - s} y={y + s / 2} s={s} seconds={seconds} />
    <Triangle x={x + s} y={y + s / 2} s={s} seconds={seconds} />
  </>
}

const Dot = ({x, y, s, text}) => {
  const [hover, setHover] = createSignal(false),
    onEnter = () => setHover(true),
    onExit = () => setHover(false);

  return <div
    class='dot'
    style={{
      width: s + 'px',
      height: s + 'px',
      left: x + 'px',
      top: y + 'px',
      borderRadius: s / 2 + 'px',
      lineHeight: s + 'px',
      background: hover() ? '#ff0' : '#61dafb'
    }}
    onMouseEnter={onEnter}
    onMouseLeave={onExit}
    textContent={hover() ? '**' + text() + '**' : text()}
  />
}

render(TriangleDemo, document.body);