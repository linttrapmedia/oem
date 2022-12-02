async function waitUntil(condition: () => boolean, intervalCheck: number = 1000) {
  return await new Promise((resolve) => {
    const interval = setInterval(() => {
      if (condition) {
        resolve(true);
        clearInterval(interval);
      }
    }, intervalCheck);
  });
}

export const Timers = {
  waitUntil,
};
