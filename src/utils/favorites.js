const STORAGE_KEY = 'favorites';

const getStorage = () => (typeof window === 'undefined' ? null : window.localStorage);

export function getFavorites() {
  const storage = getStorage();
  if (!storage) {
    return [];
  }
  const raw = storage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addFavorite(city) {
  const storage = getStorage();
  if (!storage) {
    return;
  }
  const favs = getFavorites();
  if (!favs.includes(city)) {
    favs.push(city);
    storage.setItem(STORAGE_KEY, JSON.stringify(favs));
  }
}

export function removeFavorite(city) {
  const storage = getStorage();
  if (!storage) {
    return;
  }
  const favs = getFavorites().filter((c) => c !== city);
  storage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export function isFavorite(city) {
  return getFavorites().includes(city);
}
