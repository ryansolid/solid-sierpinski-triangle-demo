# Solid Sierpinski Triangle Demo

Popularized by React Fiber demo.

Run it [here](https://ryansolid.github.io/solid-sierpinski-triangle-demo/)

This demo is often misunderstood. Even I didn't really get it 100% at first. It's not about the FPS since on most computers these days can run at 60fps. It's about how they degrade under low CPU resources. I previously suggested throttling the CPU in chrome dev tools, and that's still a good exercise but this isn't just about external aspects. React purposefully sticks a slowdown in the component to simulate an expensive computation in every single node. I've done the same with Solid now.
## Comparison

[React 15](https://claudiopro.github.io/react-fiber-vs-stack-demo/stack.html)

[React Fiber](https://claudiopro.github.io/react-fiber-vs-stack-demo/fiber.html)

# Examples without Slowdown

[Stencil](https://stencil-fiber-demo.firebaseapp.com/perf.html)

[Glimmer](https://mupkoo.github.io/react-fiber-demo-with-glimmerjs/)

[Aurelia](http://aurelia-thousand-nodes.bigopon.surge.sh/)

[Imba](https://imba-perf-demo.firebaseapp.com/)

[Radi](https://radi.js.org/perf-test.html)