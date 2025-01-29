export function getFavorites() {
  const raw = localStorage.getItem("favorites");
  return raw ? JSON.parse(raw) : [];
}

export function addFavorite(city) {
  const favs = getFavorites();
  if (!favs.includes(city)) {
    favs.push(city);
    localStorage.setItem("favorites", JSON.stringify(favs));
  }
}

export function removeFavorite(city) {
  const favs = getFavorites().filter((c) => c !== city);
  localStorage.setItem("favorites", JSON.stringify(favs));
}

export function isFavorite(city) {
  return getFavorites().includes(city);
}
