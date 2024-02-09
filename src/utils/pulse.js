export const callbacks = new Map();

function tick() {
  callbacks.forEach(cb => cb());
}

export function subscribe(id, callback) {
  if (callbacks.has(id)) return;
  callbacks.set(id, callback);
}

export function unsubscribe(id) {
  callbacks.delete(id);
}

export function startPulse() {
  setInterval(tick, 1000);
}
// Не используется
// export function stopPulse() {
//   clearInterval(interval);
//   interval = null;
// }
