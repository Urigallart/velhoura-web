/**
 * Everything the intro needs to know about the plate and the window.
 *
 * `computeIntro` is self-contained on purpose — literals only, no imports, no
 * helpers — because the inline gate script embeds its source and runs it
 * before first paint. The component calls the very same function afterwards,
 * so the first frame and every later frame agree.
 */

/** Pixel size of `public/intro/office.webp`. */
export const IMG_W = 1671;
export const IMG_H = 941;

export type Geometry = ReturnType<typeof computeIntro>;

export function computeIntro(vw: number, vh: number) {
  // Landmarks in the plate, in image pixels.
  //  · The display is very slightly keystoned (wider at the bottom); S* is the
  //    largest upright rectangle inside it. The slivers either side are white
  //    in the photo already, so the page reads as filling the whole screen.
  //  · LX/LW and TOP/BOTTOM bound the whole machine, base included — what
  //    the cards must never cover.
  const W = 1671;
  const H = 941;
  const SX = 520;
  const SY = 236;
  const SW = 681;
  const SH = 406;
  const LX = 355;
  const LW = 995;
  const TOP = 213;
  const BOTTOM = 830;

  const cover = Math.max(vw / W, vh / H);
  const sw = W * cover;
  const sh = H * cover;

  // Two ways to hang the cards. Wide windows get a column pinned to each
  // edge, and the laptop — base included — must sit entirely between them
  // with a clear gap either side; the camera backs off a touch if it has to.
  // When that would mean backing off too far, the camera pulls right back,
  // lifts the laptop, and the cards go in a row underneath instead.
  const GAP = 24;
  const cardW = Math.min(320, Math.max(220, vw * 0.17));
  const need = cardW + GAP * 2;
  let sides = false;
  let ss = 1;
  let tx = 0;
  if (vw >= 900) {
    for (; ss >= 0.8; ss -= 0.01) {
      // Centre the laptop, then keep the plate covering the window if it can.
      tx = vw / 2 - ss * (LX + LW / 2) * cover;
      if (ss * sw >= vw) tx = Math.min(0, Math.max(vw - ss * sw, tx));
      const l = tx + ss * LX * cover;
      const r = tx + ss * (LX + LW) * cover;
      if (l >= need && vw - r >= need) {
        sides = true;
        break;
      }
    }
  }

  const s0 = sides
    ? ss
    : Math.min(1, (vw * 0.94) / (LW * cover), (vh * 0.46) / ((BOTTOM - TOP) * cover));

  // Where the camera looks at the start, and where on the window that point
  // sits: the laptop between the columns, or — pulled back — held high.
  const fx0 = (LX + LW / 2) * cover;
  const fy0 = sides ? sh / 2 : ((TOP + BOTTOM) / 2) * cover;
  const cx0 = sides ? tx + s0 * fx0 : vw / 2;
  const cy0 = sides ? vh / 2 : vh * 0.34;
  const baseBottom = cy0 + s0 * (BOTTOM * cover - fy0);

  // The glass, in plate pixels.
  const gx = SX * cover;
  const gy = SY * cover;
  const gw = SW * cover;
  const gh = SH * cover;

  // The window-sized copy is *contained* in the glass and centred on it; the
  // glass itself is painted paper, so whatever the window's proportions the
  // screen reads as one lit page, and nothing ever spills over the bezel.
  // Ending at `s = 1 / k` then makes the copy exactly the window while the
  // glass, being at least as large, fills it.
  const k = Math.min(gw / vw, gh / vh);
  const left = gx + (gw - vw * k) / 2;
  const top = gy + (gh - vh * k) / 2;

  // The display's true outline — a slight keystone, wider at the bottom —
  // in plate pixels, pushed out a pixel so no hairline of the photo shows.
  // A demo laid out at DEMO_W × DEMO_H is projected onto it with a
  // homography, so a dark demo meets the bezel on all four sides.
  const DEMO_W = 1000;
  const DEMO_H = 580;
  const q = [
    [519, 235],
    [1201, 235],
    [1222, 642],
    [503, 642],
  ].map(([x, y]) => [x * cover, y * cover]);
  const [x0, y0] = q[0];
  const [x1, y1] = q[1];
  const [x2, y2] = q[2];
  const [x3, y3] = q[3];
  const dx1 = x1 - x2;
  const dx2 = x3 - x2;
  const dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2;
  const dy2 = y3 - y2;
  const dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const hg = (dx3 * dy2 - dx2 * dy3) / den;
  const hh = (dx1 * dy3 - dx3 * dy1) / den;
  const ha = x1 - x0 + hg * x1;
  const hb = x3 - x0 + hh * x3;
  const hd = y1 - y0 + hg * y1;
  const he = y3 - y0 + hh * y3;
  const quad =
    `matrix3d(${ha / DEMO_W},${hd / DEMO_W},0,${hg / DEMO_W},` +
    `${hb / DEMO_H},${he / DEMO_H},0,${hh / DEMO_H},0,0,1,0,${x0},${y0},0,1)`;

  return {
    vw,
    vh,
    sw,
    sh,
    s0,
    k,
    left,
    top,
    ax: gx + gw / 2,
    ay: gy + gh / 2,
    fx0,
    fy0,
    cx0,
    cy0,
    gx,
    gy,
    gw,
    gh,
    quad,
    layout: sides ? "sides" : "row",
    cardW,
    /** Side columns sit this far in from the window edges. */
    sideInset: GAP,
    /** Top of the row of cards: just under the laptop's base. */
    rowTop: baseBottom + 18,
    /** Scroll the zoom takes; phones get a shorter walk. */
    z: vh * (vw < 768 ? 1.6 : 2.4),
    /** Pulled back, the plate's edges are in shot: feather them into the blur. */
    mask:
      s0 * sw < vw || s0 * sh < vh
        ? "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent), linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)"
        : "none",
    /** The camera at progress 0, for the very first paint. */
    t0: `translate3d(${cx0 - s0 * fx0}px, ${cy0 - s0 * fy0}px, 0) scale(${s0})`,
  };
}

/** Name → value pairs, written as `--intro-*` custom properties. */
function introVars(g: Geometry): [string, string][] {
  return [
    ["vw", `${g.vw}px`],
    ["vh", `${g.vh}px`],
    ["sw", `${g.sw}px`],
    ["sh", `${g.sh}px`],
    ["left", `${g.left}px`],
    ["top", `${g.top}px`],
    ["k", String(g.k)],
    ["z", `${g.z}px`],
    ["gx", `${g.gx}px`],
    ["gy", `${g.gy}px`],
    ["gw", `${g.gw}px`],
    ["gh", `${g.gh}px`],
    ["card-w", `${g.cardW}px`],
    ["quad", g.quad],
    ["side-inset", `${g.sideInset}px`],
    ["row-top", `${g.rowTop}px`],
    ["t0", g.t0],
    ["mask", g.mask],
  ];
}

export function writeIntroVars(g: Geometry) {
  const root = document.documentElement;
  for (const [name, value] of introVars(g)) {
    root.style.setProperty(`--intro-${name}`, value);
  }
  root.dataset.introCards = g.layout;
}

export function measure() {
  return computeIntro(document.documentElement.clientWidth, window.innerHeight);
}

/**
 * Runs inline, before the first paint, on the two home pages (`/`, `/en`).
 * A visit that opens the page opens in the office; a reload, or arriving with
 * the browser's back/forward buttons, goes straight to the page itself, as
 * does a reduced-motion preference. The geometry is written here so the very
 * first frame is already framed. Without JavaScript this never runs,
 * `data-intro` stays unset, and the CSS shows the page directly.
 */
export const gateScript = `(function(){try{
var lp=location.pathname;if(lp!=='/'&&lp!=='/en'&&lp!=='/en/')return;
var d=document.documentElement;
var nv=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];var nt=nv?nv.type:(performance.navigation&&performance.navigation.type===1?'reload':'navigate');
if(nt==='reload'||nt==='back_forward'||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='skip';return}
d.dataset.intro='play';
var g=(${computeIntro.toString()})(d.clientWidth,innerHeight);
var v=(${introVars.toString()})(g);
for(var i=0;i<v.length;i++)d.style.setProperty('--intro-'+v[i][0],v[i][1]);
d.dataset.introCards=g.layout;
if('scrollRestoration' in history)history.scrollRestoration='manual';
}catch(e){}})();`;
