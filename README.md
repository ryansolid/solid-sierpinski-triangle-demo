# Solid Sierpinski Triangle Demo

Popularized by React Fiber demo.

Run it [here](https://ryansolid.github.io/solid-sierpinski-triangle-demo/)

I strongly suggest opening the Chrome debugger performance tab and throttling the CPU when running these demos. It's not about the FPS since on most computers these can run at 60fps. It's about how they degrade under low CPU resources. Look for implementations that don't update numbers, ones that start stepping on increments,and ones that animation swings. It comes down to aethestics as much as performance, but I think you will find Solid degrades the most gracefully given its natural setup for asynchronous rendering.

## Comparison

[React 15](https://claudiopro.github.io/react-fiber-vs-stack-demo/stack.html)
[React Fiber](https://claudiopro.github.io/react-fiber-vs-stack-demo/fiber.html)
[Stencil](https://stencil-fiber-demo.firebaseapp.com/perf.html)
[Aurelia](http://aurelia-thousand-nodes.bigopon.surge.sh/)
[Radi](https://radi.js.org/perf-test.html)