# node-channels

The main goal is have fun :)

Based on https://tour.golang.org/concurrency/2

# Caution 🙋⛔️

Threads on Node have specific usage. As pointed at the [documentation](https://nodejs.org/api/worker_threads.html#worker_threads_worker_threads), you should use it for _performing CPU-intensive JavaScript operations_. For I/O operation, libuv performs better.

# Roadmap

- [x] Copy https://tour.golang.org/concurrency/2 example
- [x] Having fun
- [ ] Testing
- [ ] Concurrency using [Worker Threads](https://nodejs.org/api/worker_threads.html)
- [ ] Add CodeClimate badge
- [ ] Implement Stricter Generators :)
- [ ] Example using SharedBuffers
