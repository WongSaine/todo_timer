// let callbacks = [];
// let prevTick = 0;
// const interval = 1000;

// function tick() {
//   const currentTime = Date.now();
//   if (currentTime - prevTick >= interval) {
//     callbacks.forEach((cb) => cb());
//     prevTick = currentTime;
//   }
//   window.requestAnimationFrame(tick);
// }

// export function startPulse() {
//   tick();
// }
let interval;
export let callbacks = [];

function tick(id) {
  callbacks.forEach(cb => cb(id));  
}

export function subscribe(callback) {
  callbacks.push(callback);
}

export function unsubscribe(callback) {
  callbacks = callbacks.filter(cb => cb !== callback);
}

export function startPulse() {
  if (!interval) {
    interval = setInterval(tick, 1000);
  }
}
// Не используется
export function stopPulse() {
  clearInterval(interval);
  interval = null;
}
