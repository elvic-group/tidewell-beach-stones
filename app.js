/* Tidewell — demo storefront logic (no backend) */

const PRODUCTS = [
  { id:'grey-pebble',  name:'Grey Pebble Grade',   price:14, unit:'per kg',
    desc:'Classic North Atlantic greys. Palm-sized and rounded — the everyday workhorse stone.',
    a:'#9aa0a3', b:'#6f7679' },
  { id:'slate-flats',  name:'Slate Flats',          price:19, unit:'per kg',
    desc:'Thin, flat and stackable. The skipping stone shape, ideal for cairns and place settings.',
    a:'#5e6a70', b:'#39434a' },
  { id:'chalk-white',  name:'Chalk White',          price:22, unit:'per kg',
    desc:'Pale limestone rounds bleached bright by sun and salt. Beautiful in dark bowls.',
    a:'#f2eee6', b:'#cfc7b8' },
  { id:'basalt-black', name:'Black Basalt',         price:24, unit:'per kg',
    desc:'Dense volcanic stone that turns near-black when wet. Aquarium and sauna safe.',
    a:'#4a4a4c', b:'#232326' },
  { id:'rose-granite', name:'Rose Granite',         price:26, unit:'per kg',
    desc:'Speckled pink-and-grey granite with quartz flecks that catch the light.',
    a:'#c9a49b', b:'#8e6f68' },
  { id:'sea-glass-mix',name:'Stone & Sea Glass Mix',price:29, unit:'per kg',
    desc:'Small tumbled stones blended with frosted green and amber sea glass.',
    a:'#a7bfae', b:'#6d8b7e' },
  { id:'giant-holders',name:'Large Hand Stones',    price:12, unit:'each',
    desc:'Single oversized stones, 8–14 cm. Sold individually as paperweights or door stops.',
    a:'#b2ada4', b:'#7d776e' },
  { id:'starter-set',  name:'Starter Set (3 kg)',   price:55, unit:'bundle',
    desc:'One kilo each of grey pebble, slate flats and chalk white. Our most popular gift.',
    a:'#c4bcae', b:'#8b8477' }
];

const money = n => '$' + n.toFixed(2);
const cart = new Map();

/* ---------- render products ---------- */
const grid = document.getElementById('grid');
grid.innerHTML = PRODUCTS.map(p => `
  <article class="card">
    <span class="swatch" style="background:linear-gradient(145deg,${p.a},${p.b})"></span>
    <div class="card-body">
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <div class="row">
        <span class="price">${money(p.price)} <small>${p.unit}</small></span>
        <button class="add" data-id="${p.id}">Add</button>
      </div>
    </div>
  </article>`).join('');

/* ---------- cart ---------- */
const drawer = document.getElementById('drawer');
const scrim  = document.getElementById('scrim');
const items  = document.getElementById('cartItems');

function openCart(open){
  drawer.classList.toggle('open', open);
  scrim.classList.toggle('show', open);
  drawer.setAttribute('aria-hidden', String(!open));
}

function render(){
  let count = 0, total = 0;
  const rows = [];
  cart.forEach((qty, id) => {
    const p = PRODUCTS.find(x => x.id === id);
    count += qty; total += qty * p.price;
    rows.push(`<div class="line">
      <span>${p.name} × ${qty}</span>
      <span>${money(qty * p.price)}
        <button data-remove="${id}" aria-label="Remove ${p.name}">×</button>
      </span>
    </div>`);
  });
  items.innerHTML = rows.length ? rows.join('') : '<p class="empty">Your cart is empty.</p>';
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = money(total);
}

document.addEventListener('click', e => {
  const add = e.target.closest('.add');
  if (add){
    const id = add.dataset.id;
    cart.set(id, (cart.get(id) || 0) + 1);
    render(); openCart(true);
  }
  const rm = e.target.closest('[data-remove]');
  if (rm){
    const id = rm.dataset.remove;
    const q = cart.get(id) - 1;
    q > 0 ? cart.set(id, q) : cart.delete(id);
    render();
  }
});

document.getElementById('cartBtn').onclick   = () => openCart(true);
document.getElementById('closeCart').onclick = () => openCart(false);
scrim.onclick = () => openCart(false);
document.addEventListener('keydown', e => { if (e.key === 'Escape') openCart(false); });

document.getElementById('year').textContent = new Date().getFullYear();
render();
