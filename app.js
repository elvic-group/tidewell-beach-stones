/* Tidewell — demo storefront logic (no backend) */

const PRODUCTS = [
  { id:'grey-pebble', name:'Grey Pebble Grade', price:14, unit:'per kg',
    desc:'Classic North Atlantic greys. Palm-sized and rounded — the everyday workhorse stone.',
    a:'#9aa0a3', b:'#6f7679',
    img:'photo-1625556580855-a79aa8e44c50', alt:'Smooth grey and white beach pebbles',
    origin:'Nordland coast, Norway',
    type:'Weathered granite & gneiss',
    size:'3–6 cm',
    pieces:'~18–25 stones per kg',
    finish:'Matte when dry, mid-grey. Wet, they deepen to charcoal with pale veining.',
    story:'These come off long shingle beaches where the swell rolls stones back and forth for centuries. The result is an almost perfect egg shape with no sharp edges anywhere. It is the grade we sell most of, because it does nearly everything: plant pots, path edging, vase filler, or a bowl by the door for people to pick up and turn over.',
    care:'Rinse in fresh water. Safe outdoors year-round — they will not crack in frost.',
    uses:['Potted plants & terrariums','Garden path edging','Table centrepieces','Worry stones'] },

  { id:'slate-flats', name:'Slate Flats', price:19, unit:'per kg',
    desc:'Thin, flat and stackable. The skipping stone shape, ideal for cairns and place settings.',
    a:'#5e6a70', b:'#39434a',
    img:'photo-1761847246139-4be8a2da69ec', alt:'Dark layered slate rock, flat and stacked',
    origin:'Argyll shoreline, Scotland',
    type:'Marine slate',
    size:'5–9 cm across, 6–12 mm thick',
    pieces:'~12–16 stones per kg',
    finish:'Blue-grey to near-black, with a soft satin sheen along the cleavage plane.',
    story:'Slate splits along flat planes, so the sea delivers it already shaped into discs and ovals. We pick only pieces that have had their edges properly rounded — a fresh slate break is sharp, and those go back. Balanced one on top of another they make cairns that stand without glue.',
    care:'Keep dry indoors if you want to write on them — chalk and paint pens hold beautifully.',
    uses:['Cairns & stone stacking','Wedding place cards','Coasters','Painted stone crafts'] },

  { id:'chalk-white', name:'Chalk White', price:22, unit:'per kg',
    desc:'Pale limestone rounds bleached bright by sun and salt.',
    a:'#f2eee6', b:'#cfc7b8',
    img:'photo-1606681202570-b22b5fa3840e', alt:'Bright white stones on a beach',
    origin:'Dorset, southern England',
    type:'Limestone & flint nodules',
    size:'3–7 cm',
    pieces:'~15–20 stones per kg',
    finish:'Bone white to soft cream, chalky and light-absorbing rather than glossy.',
    story:'Chalk cliffs shed limestone into the surf, and what survives the tumbling is the dense stuff — the soft chalk washes away entirely. What is left is startlingly bright, especially against dark bowls, black gravel or green foliage. In low evening light they seem to hold a glow after everything else has gone flat.',
    care:'Porous and slightly soluble. Avoid soft-water aquariums; it will nudge the pH up.',
    uses:['Dark bowls & trays','Contrast in planters','Candle surrounds','Coastal styling'] },

  { id:'basalt-black', name:'Black Basalt', price:24, unit:'per kg',
    desc:'Dense volcanic stone that turns near-black when wet. Aquarium and sauna safe.',
    a:'#4a4a4c', b:'#232326',
    img:'photo-1517999144091-3d9dca6d1e43', alt:'Dense black basalt stone, close up',
    origin:'Reykjanes peninsula, Iceland',
    type:'Volcanic basalt',
    size:'4–8 cm',
    pieces:'~12–18 stones per kg',
    finish:'Deep charcoal dry, true black and glossy wet. Fine pinhole texture from gas bubbles.',
    story:'Lava that met cold Atlantic water, then spent a few thousand years being polished by it. Basalt is heavy for its size and holds heat remarkably well, which is why it ends up in saunas and hot-stone massage. Inert and non-reactive, so it will not alter water chemistry.',
    care:'Aquarium and sauna safe. Rinse before first use. Heats slowly and stays hot — handle with care near stoves.',
    uses:['Aquascaping','Sauna & hot stones','Fire bowl filler','Modern dark interiors'] },

  { id:'rose-granite', name:'Rose Granite', price:26, unit:'per kg',
    desc:'Speckled pink-and-grey granite with quartz flecks that catch the light.',
    a:'#c9a49b', b:'#8e6f68',
    img:'photo-1750748303414-e59454b1551b', alt:'Rough pink and grey speckled granite',
    origin:'Bohuslän archipelago, Sweden',
    type:'Feldspar-rich granite',
    size:'4–7 cm',
    pieces:'~14–18 stones per kg',
    finish:'Warm dusty pink with grey and black speckle. Quartz grains glint as you turn them.',
    story:'The pink is potassium feldspar, the sparkle is quartz, and the dark flecks are mica and hornblende. Bohuslän granite is famous enough that it paved half the streets of northern Europe. These are the offcuts nature made herself — rolled smooth in sheltered skerries where the water works slowly.',
    care:'Extremely hard and inert. Aquarium safe. Colour deepens noticeably when wet or oiled.',
    uses:['Warm-toned displays','Aquariums','Gift stones','Jewellery dish filler'] },

  { id:'sea-glass-mix', name:'Stone & Sea Glass Mix', price:29, unit:'per kg',
    desc:'Small tumbled stones blended with frosted green and amber sea glass.',
    a:'#a7bfae', b:'#6d8b7e',
    img:'photo-1528751759124-8e326442575c', alt:'Frosted green sea glass held in a hand',
    origin:'Mixed North Sea beaches',
    type:'Assorted pebbles + tumbled bottle glass',
    size:'1–3 cm',
    pieces:'Several hundred pieces per kg',
    finish:'Frosted, matte glass in green, amber and white among mixed pale pebbles.',
    story:'Sea glass is litter that the ocean spent forty years forgiving. Broken bottles get tumbled until every edge is gone and the surface etches to a soft frost. We blend roughly one part glass to four parts small stone. Green and amber dominate because those were the common bottle colours; blue and red turn up occasionally and are a genuine find.',
    care:'Do not polish — the frost is the whole point, and it does not come back.',
    uses:['Glass jars & lamp bases','Mosaics & craft','Memory jars','Sensory trays'] },

  { id:'giant-holders', name:'Large Hand Stones', price:12, unit:'each',
    desc:'Single oversized stones, 8–14 cm. Sold individually as paperweights or door stops.',
    a:'#b2ada4', b:'#7d776e',
    img:'photo-1609074502402-048186ef6510', alt:'Large brown and grey hand-sized stones',
    origin:'Hand-selected, mixed beaches',
    type:'Mixed granite, basalt & quartzite',
    size:'8–14 cm, 400 g – 1.4 kg',
    pieces:'Sold as one stone',
    finish:'Varies by stone. Each one photographed individually before dispatch.',
    story:'Every so often you find a stone that is simply better than the others around it — the weight sits right in the palm, the shape is resolved, the surface is flawless. Those get set aside rather than dropped in the bulk sack. Because these are one-offs, we send you a photo of the actual stone before it ships, and you can say no.',
    care:'Nothing required. A wipe of mineral oil once a year keeps the colour rich.',
    uses:['Paperweights','Door stops','Bookends','Desk objects & gifts'] },

  { id:'starter-set', name:'Starter Set (3 kg)', price:55, unit:'bundle',
    desc:'One kilo each of grey pebble, slate flats and chalk white. Our most popular gift.',
    a:'#c4bcae', b:'#8b8477',
    img:'photo-1624858712071-a04cefd715b8', alt:'White, grey and brown pebbles together',
    origin:'Norway, Scotland & England',
    type:'Three grades, one kilo each',
    size:'3–9 cm across the three grades',
    pieces:'~45–60 stones total',
    finish:'A deliberate contrast set: mid grey, dark blue-grey, and bright white.',
    story:'The three grades that look best together, and the set we send most often as a gift. Grey pebble gives you volume, slate flats give you structure and height, chalk white lifts the whole arrangement. Arrives in three separate cloth bags inside one recycled box, with a card explaining where each grade came from.',
    care:'See individual grades. Keep the chalk white out of soft-water aquariums.',
    uses:['Gifting','Full table arrangements','Starting a collection','Styling a shelf'] }
];

const IMG_BASE  = 'https://images.unsplash.com/';
const IMG_CARD  = '?w=600&h=420&q=80&fm=jpg&fit=crop';
const IMG_MODAL = '?w=900&h=1100&q=80&fm=jpg&fit=crop';
const cardImg  = p => IMG_BASE + p.img + IMG_CARD;
const modalImg = p => IMG_BASE + p.img + IMG_MODAL;

const money = n => '$' + n.toFixed(2);
const cart = new Map();

/* ---------- render products ---------- */
const grid = document.getElementById('grid');
grid.innerHTML = PRODUCTS.map(p => `
  <article class="card" data-open="${p.id}" tabindex="0" role="button"
           aria-label="View details for ${p.name}">
    <img class="swatch" src="${cardImg(p)}" alt="${p.alt}"
         width="600" height="420" loading="lazy" decoding="async"
         style="background:linear-gradient(145deg,${p.a},${p.b})">
    <div class="card-body">
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <div class="row">
        <span class="price">${money(p.price)} <small>${p.unit}</small></span>
        <button class="add" data-id="${p.id}">Add</button>
      </div>
      <span class="more">Read more →</span>
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

/* ---------- product detail modal ---------- */
const modal     = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');

function openModal(id){
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  modalBody.innerHTML = `
    <img class="modal-swatch" src="${modalImg(p)}" alt="${p.alt}"
         loading="lazy" decoding="async"
         style="background:linear-gradient(145deg,${p.a},${p.b})">
    <div class="modal-text">
      <p class="eyebrow">${p.origin}</p>
      <h2 id="modalTitle">${p.name}</h2>
      <p class="modal-price">${money(p.price)} <small>${p.unit}</small></p>

      <p class="story">${p.story}</p>

      <dl class="spec">
        <div><dt>Stone type</dt><dd>${p.type}</dd></div>
        <div><dt>Size</dt><dd>${p.size}</dd></div>
        <div><dt>Quantity</dt><dd>${p.pieces}</dd></div>
        <div><dt>Colour &amp; finish</dt><dd>${p.finish}</dd></div>
      </dl>

      <h4>Good for</h4>
      <ul class="uses">${p.uses.map(u => `<li>${u}</li>`).join('')}</ul>

      <h4>Care</h4>
      <p class="care">${p.care}</p>

      <button class="btn add" data-id="${p.id}">Add to cart — ${money(p.price)}</button>
    </div>`;
  modal.classList.add('open');
  scrim.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.scrollTop = 0;
  document.getElementById('closeModal').focus({ preventScroll:true });
}

function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (!drawer.classList.contains('open')) scrim.classList.remove('show');
}

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const add = e.target.closest('.add');
  if (add){
    e.stopPropagation();
    const id = add.dataset.id;
    cart.set(id, (cart.get(id) || 0) + 1);
    render(); closeModal(); openCart(true);
    return;
  }

  const rm = e.target.closest('[data-remove]');
  if (rm){
    const id = rm.dataset.remove;
    const q = cart.get(id) - 1;
    q > 0 ? cart.set(id, q) : cart.delete(id);
    render();
    return;
  }

  const card = e.target.closest('[data-open]');
  if (card) openModal(card.dataset.open);
});

/* keyboard access on cards */
grid.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset.open){
    e.preventDefault();
    openModal(e.target.dataset.open);
  }
});

document.getElementById('cartBtn').onclick    = () => openCart(true);
document.getElementById('closeCart').onclick  = () => openCart(false);
document.getElementById('closeModal').onclick = closeModal;
scrim.onclick = () => { closeModal(); openCart(false); };
document.addEventListener('keydown', e => {
  if (e.key === 'Escape'){ closeModal(); openCart(false); }
});

/* ---------- checkout ---------- */
const checkoutBtn  = document.getElementById('checkoutBtn');
const checkoutNote = document.getElementById('checkoutNote');

function note(msg, isError){
  checkoutNote.textContent = msg || '';
  checkoutNote.classList.toggle('error', !!isError);
}

checkoutBtn.onclick = async () => {
  if (!cart.size){ note('Your cart is empty.', true); return; }

  const items = [...cart].map(([id, qty]) => ({ id, qty }));

  checkoutBtn.disabled = true;
  const label = checkoutBtn.textContent;
  checkoutBtn.textContent = 'Starting checkout…';
  note('');

  try {
    const res  = await fetch('/api/checkout', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ items })
    });

    let data = {};
    try { data = await res.json(); } catch { /* non-JSON error page */ }

    if (!res.ok || !data.url){
      throw new Error(data.error || `Checkout unavailable (${res.status}).`);
    }
    window.location.href = data.url;          // hand off to Stripe
    return;                                    // keep button disabled during nav
  } catch (err){
    note(err.message || 'Could not reach checkout. Please try again.', true);
    checkoutBtn.disabled = false;
    checkoutBtn.textContent = label;
  }
};

document.getElementById('year').textContent = new Date().getFullYear();
render();
