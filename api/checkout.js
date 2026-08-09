/**
 * POST /api/checkout
 *
 * Builds a Stripe Checkout Session from the cart.
 *
 * SECURITY: prices are never taken from the request body. The client sends
 * only { id, qty } pairs; every price is looked up in CATALOGUE below, which
 * lives server-side. Otherwise anyone could POST a $0.01 price.
 */

const Stripe = require('stripe');

/* Server-side source of truth. Amounts are in cents (USD). */
const CATALOGUE = {
  'grey-pebble':   { name: 'Grey Pebble Grade',      amount: 1400, unit: 'per kg' },
  'slate-flats':   { name: 'Slate Flats',            amount: 1900, unit: 'per kg' },
  'chalk-white':   { name: 'Chalk White',            amount: 2200, unit: 'per kg' },
  'basalt-black':  { name: 'Black Basalt',           amount: 2400, unit: 'per kg' },
  'rose-granite':  { name: 'Rose Granite',           amount: 2600, unit: 'per kg' },
  'sea-glass-mix': { name: 'Stone & Sea Glass Mix',  amount: 2900, unit: 'per kg' },
  'giant-holders': { name: 'Large Hand Stones',      amount: 1200, unit: 'each'   },
  'starter-set':   { name: 'Starter Set (3 kg)',     amount: 5500, unit: 'bundle' }
};

const MAX_QTY = 99;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({
      error: 'Stripe is not configured. Set STRIPE_SECRET_KEY in the environment.'
    });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const body  = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const items = Array.isArray(body.items) ? body.items : [];

    if (!items.length) {
      return res.status(400).json({ error: 'Cart is empty.' });
    }

    const line_items = [];
    for (const item of items) {
      const product = CATALOGUE[item.id];
      if (!product) {
        return res.status(400).json({ error: `Unknown product: ${item.id}` });
      }
      const qty = Math.floor(Number(item.qty));
      if (!Number.isFinite(qty) || qty < 1 || qty > MAX_QTY) {
        return res.status(400).json({ error: `Invalid quantity for ${item.id}` });
      }
      line_items.push({
        quantity: qty,
        price_data: {
          currency: 'usd',
          unit_amount: product.amount,
          product_data: {
            name: product.name,
            description: `Sold ${product.unit}`
          }
        }
      });
    }

    const proto  = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];
    const host   = req.headers['x-forwarded-host'] || req.headers.host;
    const origin = `${proto}://${host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${origin}/#shop`,
      // Stones are heavy — collect an address so shipping can be worked out.
      shipping_address_collection: {
        allowed_countries: ['US','CA','GB','NO','SE','DK','FI','DE','NL','FR','IE']
      },
      phone_number_collection: { enabled: false }
    });

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error('Checkout session failed:', err);
    return res.status(500).json({ error: err.message || 'Could not start checkout.' });
  }
};
