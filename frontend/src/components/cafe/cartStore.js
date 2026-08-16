const STORAGE_KEY = "dulce-cafe-cart";

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadCart() {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent("dulce-cafe:cart-changed", { detail: cart }));
}

export function clearCart() {
  saveCart([]);
}

export function addToCartGlobal(itemId, quantity = 1) {
  const cart = loadCart();
  const existing = cart.find((c) => c.itemId === itemId && !c.drink);
  const next = existing
    ? cart.map((c) =>
        c.itemId === itemId && !c.drink ? { ...c, quantity: c.quantity + quantity } : c
      )
    : [...cart, { itemId, quantity, drink: null, flavor: null, weight: null }];
  saveCart(next);
  return next;
}

export function cartCountFrom(cart) {
  return cart.reduce((sum, ci) => sum + ci.quantity, 0);
}