import { State } from '@/registry';

export const useOnlineState = () => {
  const state = State<boolean>(navigator.onLine);
  const setOnline = () => state.set(true);
  const setOffline = () => state.set(false);
  window.addEventListener('online', setOnline);
  window.addEventListener('offline', setOffline);
  return state;
};
