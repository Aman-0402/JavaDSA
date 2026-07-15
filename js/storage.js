const NS = "javadsa";

function key(name) {
  return `${NS}:${name}`;
}

export function getJSON(name, fallback) {
  try {
    const raw = localStorage.getItem(key(name));
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function setJSON(name, value) {
  localStorage.setItem(key(name), JSON.stringify(value));
}

export function getRaw(name, fallback = "") {
  return localStorage.getItem(key(name)) ?? fallback;
}

export function setRaw(name, value) {
  localStorage.setItem(key(name), value);
}
