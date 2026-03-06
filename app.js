/* ══════════════════════════════════════
   DOFLAMINGO — STATIC VERSION
   Netlify-ready e-commerce store
══════════════════════════════════════ */

const { useState, useEffect } = React;

/* ── Static product data ── */
const PRODUCTS = [
  { id: 1, name: "Монгол Малгай", price: 45000, description: "Уламжлалт монгол малгай, гоёмсог өнгөтэй", category: "Хувцас", image: "" },
  { id: 2, name: "Кашмер Ноолуур", price: 120000, description: "100% цэвэр кашмер ноолуур, зөөлөн бөгөөд дулаахан", category: "Эдлэл", image: "" },
  { id: 3, name: "Монгол Гутал", price: 85000, description: "Эх орны гар урлалын гутал, өндөр чанартай", category: "Хувцас", image: "" },
  { id: 4, name: "Айраг 5L", price: 25000, description: "Эрүүл хүнсний уламжлалт айраг", category: "Хүнс", image: "" },
  { id: 5, name: "Хөөмий CD", price: 15000, description: "Монгол хөөмийн унших дууны цомог", category: "Урлаг", image: "" },
  { id: 6, name: "Гэр Модел", price: 350000, description: "Миниатюр монгол гэр, гар урлалын бүтээл", category: "Гарааны", image: "" },
];

/* ── Colors ── */
const C = {
  bg: "#F2EEFF",
  panel: "#FFFFFF",
  ink: "#1C0B3A",
  muted: "#9585B8",
  pink: "#FF2D8A",
  yellow: "#FFB800",
  cyan: "#00C8E8",
  lime: "#5FD400",
  orange: "#FF6200",
  purple: "#9B30FF",
  white: "#FFFFFF",
  border: "#E2D6FF",
};

const CARD_COLS = [
  { line: "#FF2D8A", bg: "#FFF0F7", tag: "#FF2D8A", fg: "#FFFFFF" },
  { line: "#FFB800", bg: "#FFFBEC", tag: "#FFB800", fg: "#1C0B3A" },
  { line: "#00C8E8", bg: "#EAF9FF", tag: "#00C8E8", fg: "#1C0B3A" },
  { line: "#5FD400", bg: "#F0FFE4", tag: "#5FD400", fg: "#1C0B3A" },
  { line: "#FF6200", bg: "#FFF3EC", tag: "#FF6200", fg: "#FFFFFF" },
  { line: "#9B30FF", bg: "#F5EEFF", tag: "#9B30FF", fg: "#FFFFFF" },
];

const clip = (s = 8) => `polygon(0 0,calc(100% - ${s}px) 0,100% ${s}px,100% 100%,${s}px 100%,0 calc(100% - ${s}px))`;

/* ── Icons ── */
const ICart = () => <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>;
const ITrash = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>;
const IClose = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const ICheck = () => <svg width="44" height="44" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>;

/* ── UI Components ── */
const Tag = ({ children, bg = C.pink, fg, style = {} }) => {
  const textCol = fg || ([C.yellow, C.lime, C.cyan].includes(bg) ? C.ink : C.white);
  return <span style={{ display: "inline-block", background: bg, color: textCol, fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: ".68rem", letterSpacing: ".1em", padding: "3px 10px", clipPath: clip(5), ...style }}>{children}</span>;
};

const SectionHead = ({ children, color = C.pink, sub = "" }) => (
  <div style={{ borderLeft: `5px solid ${color}`, paddingLeft: "1.2rem", marginBottom: "2rem" }}>
    {sub && <p style={{ fontFamily: "'Oswald',sans-serif", color: color, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".26em", marginBottom: 3 }}>{sub}</p>}
    <h2 style={{ fontFamily: "'Black Ops One',cursive", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: C.ink, lineHeight: 1 }}>{children}</h2>
  </div>
);

/* ══════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════ */
function ProductCard({ product, onAdd, added, ci, delay }) {
  const col = CARD_COLS[ci];
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="sharp-card"
      style={{
        background: col.bg,
        border: `2.5px solid ${hov ? col.line : col.line + "55"}`,
        boxShadow: hov ? `5px 5px 0 ${col.line}` : `3px 3px 0 ${col.line}44`,
        animation: `sprayIn .4s ease ${delay}ms both`,
      }}
    >
      <div style={{ width: "100%", paddingBottom: "63%", position: "relative", overflow: "hidden", background: `${col.line}12`, borderBottom: `2.5px solid ${col.line}33` }}>
        {product.image
          ? <img src={product.image} alt={product.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
          : <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Black Ops One',cursive", color: `${col.line}33`, fontSize: "1.3rem" }}>NO PIC</div>
        }
        {product.category && <Tag bg={col.tag} fg={col.fg} style={{ position: "absolute", top: 10, left: 10 }}>{product.category}</Tag>}
      </div>
      <div style={{ padding: "1rem" }}>
        <h3 style={{ fontFamily: "'Black Ops One',cursive", fontSize: "1.05rem", color: C.ink, marginBottom: 5, lineHeight: 1.2 }}>{product.name}</h3>
        {product.description && <>
          <p style={{ color: C.muted, fontFamily: "'Oswald',sans-serif", fontSize: ".8rem", lineHeight: 1.4, marginBottom: 4, ...(expanded ? {} : { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }) }}>{product.description}</p>
          {product.description.length > 60 && <button onClick={e => { e.stopPropagation(); setExpanded(!expanded); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Oswald',sans-serif", fontSize: ".72rem", fontWeight: 700, color: col.line, padding: 0, marginBottom: 6, letterSpacing: ".05em" }}>{expanded ? "▲ ХУРААХ" : "▼ ДЭЛГЭРЭНГҮЙ"}</button>}
        </>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, gap: 8 }}>
          <div style={{ background: col.tag, color: col.fg, fontFamily: "'Black Ops One',cursive", fontSize: "1.15rem", padding: "4px 14px", clipPath: clip(6), boxShadow: `2px 2px 0 ${col.line}44` }}>
            ₮{Number(product.price).toLocaleString()}
          </div>
          <button onClick={onAdd} className="btn" style={{
            background: added ? C.lime : "transparent",
            color: added ? C.ink : col.line,
            border: `2.5px solid ${added ? C.lime : col.line}`,
            padding: ".35rem .85rem", fontSize: ".76rem",
            boxShadow: added ? `2px 2px 0 ${C.lime}88` : `2px 2px 0 ${col.line}44`,
          }}>{added ? "✓ НЭМЛЭЭ" : "+ САГС"}</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   STORE VIEW
══════════════════════════════════════ */
function StoreView({ products, addToCart }) {
  const [added, setAdded] = useState({});
  const [search, setSearch] = useState("");
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || (p.category || "").toLowerCase().includes(search.toLowerCase())
  );
  const handleAdd = p => {
    addToCart(p);
    setAdded(prev => ({ ...prev, [p.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [p.id]: false })), 1400);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <div className="slide-l">
        <SectionHead color={C.pink} sub="▶▶ ОНЦЛОХ БАРАА">ШИЛДЭГ БҮТЭЭГДЭХҮҮН</SectionHead>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: "2.5rem", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ХАЙХ..." className="raw-input" style={{ paddingLeft: "1rem" }} />
        </div>
        <Tag bg={C.pink}>{filtered.length} БАРАА</Tag>
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: "5rem 0 5rem 1.5rem", borderLeft: `5px solid ${C.border}` }}>
          <p style={{ fontFamily: "'Black Ops One',cursive", fontSize: "2.2rem", color: C.border }}>
            {products.length === 0 ? "ДЭЛГҮҮР ХООСОН" : "ОЛДСОНГҮЙ"}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1.4rem" }}>
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} onAdd={() => handleAdd(p)} added={added[p.id]} ci={i % CARD_COLS.length} delay={i * 50} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   CART VIEW
══════════════════════════════════════ */
function CartView({ cart, removeFc, updateQty, total, onCheckout, onBack }) {
  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <div className="slide-l"><SectionHead color={C.cyan} sub="▶ ШАЛГАХ">ТАНЫ САГС</SectionHead></div>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "5rem 0" }}>
          <p style={{ fontFamily: "'Black Ops One',cursive", fontSize: "2.8rem", color: C.border, marginBottom: "1.5rem" }}>ХООСОН</p>
          <button onClick={onBack} className="btn" style={{ background: C.pink, color: C.white, border: `2px solid ${C.pink}`, padding: ".75rem 2rem", fontSize: "1rem", boxShadow: `4px 4px 0 ${C.yellow}` }}>
            ← ДЭЛГҮҮР РҮҮ
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "1.8rem" }}>
            {cart.map((item, i) => {
              const col = CARD_COLS[i % CARD_COLS.length];
              return (
                <div key={item.id} className="sharp-sm" style={{ display: "flex", alignItems: "center", gap: "1rem", background: C.white, border: `2.5px solid ${col.line}44`, padding: ".85rem 1rem", boxShadow: `3px 3px 0 ${col.line}33` }}>
                  <div style={{ width: 58, height: 58, background: col.bg, flexShrink: 0, overflow: "hidden", border: `2px solid ${col.line}55` }}>
                    {item.image && <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Black Ops One',cursive", color: C.ink, fontSize: ".95rem" }}>{item.name}</p>
                    <Tag bg={col.tag} fg={col.fg} style={{ marginTop: 4 }}>₮{Number(item.price).toLocaleString()}</Tag>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="btn" style={{ width: 28, height: 28, background: "transparent", color: col.line, border: `2px solid ${col.line}`, padding: 0, fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ minWidth: 24, textAlign: "center", fontFamily: "'Oswald',sans-serif", fontWeight: 700, color: C.ink, fontSize: "1.1rem" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="btn" style={{ width: 28, height: 28, background: col.tag, color: col.fg, border: `2px solid ${col.tag}`, padding: 0, fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  </div>
                  <p style={{ minWidth: 90, textAlign: "right", fontFamily: "'Oswald',sans-serif", fontWeight: 700, color: C.ink, fontSize: "1rem" }}>₮{(item.price * item.qty).toLocaleString()}</p>
                  <button onClick={() => removeFc(item.id)} className="btn" style={{ background: "#FFF0F0", color: C.pink, border: `2px solid ${C.pink}33`, padding: "6px 9px" }}><ITrash /></button>
                </div>
              );
            })}
          </div>
          <div className="sharp-sm" style={{ background: C.white, border: `2.5px solid ${C.yellow}55`, padding: "1.4rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", boxShadow: `4px 4px 0 ${C.yellow}44` }}>
            <div>
              <p style={{ fontFamily: "'Oswald',sans-serif", color: C.muted, fontSize: ".78rem", fontWeight: 700, letterSpacing: ".15em" }}>НИЙТ ДҮН</p>
              <p style={{ fontFamily: "'Black Ops One',cursive", fontSize: "2rem", color: C.ink, textShadow: `3px 3px 0 ${C.yellow}55` }}>₮{total.toLocaleString()}</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onBack} className="btn" style={{ background: "transparent", color: C.muted, border: `2px solid ${C.border}`, padding: ".65rem 1.3rem", fontSize: ".85rem" }}>← ҮРГЭЛЖЛҮҮЛЭХ</button>
              <button onClick={onCheckout} className="btn" style={{ background: C.pink, color: C.white, border: `2px solid ${C.pink}`, padding: ".65rem 1.8rem", fontSize: ".9rem", boxShadow: `4px 4px 0 ${C.yellow}` }}>
                ЗАХИАЛАХ ▶
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   SUCCESS MODAL
══════════════════════════════════════ */
function SuccessModal({ order, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(28,10,58,.55)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, padding: "1rem" }}>
      <div className="sharp-card pop-sharp" style={{ background: C.white, border: `3px solid ${C.lime}`, width: "min(480px,100%)", padding: "3rem 2rem", textAlign: "center", boxShadow: `8px 8px 0 ${C.lime}55` }}>
        <div style={{ color: C.lime, display: "flex", justifyContent: "center", marginBottom: "1rem" }}><ICheck /></div>
        <h2 style={{ fontFamily: "'Black Ops One',cursive", fontSize: "2.2rem", color: C.ink, marginBottom: 6 }}>АМЖИЛТТАЙ!</h2>
        <p style={{ fontFamily: "'Oswald',sans-serif", color: C.muted, fontSize: ".85rem", letterSpacing: ".1em", marginBottom: "1.5rem" }}>
          ЗАХИАЛГА #{order.id}
        </p>
        <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: ".82rem", color: C.muted, margin: "1.4rem 0", letterSpacing: ".05em" }}>
          Баталгаажуулалт <strong style={{ color: C.ink }}>{order.buyer.email}</strong> руу илгээгдэнэ.
        </p>
        <button onClick={onClose} className="btn" style={{ background: C.pink, color: C.white, border: `2px solid ${C.pink}`, padding: ".85rem 2.5rem", fontSize: ".95rem", boxShadow: `4px 4px 0 ${C.yellow}` }}>
          БОЛЦГООСОН ▶
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   CHECKOUT MODAL
══════════════════════════════════════ */
function CheckoutModal({ total, onClose, onPlace }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Шаардлагатай";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Зөв имэйл оруулна уу";
    if (!form.address.trim()) e.address = "Шаардлагатай";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(28,10,58,.5)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: "1rem" }}>
      <div className="sharp-card pop-sharp" style={{ background: C.white, border: `3px solid ${C.pink}`, width: "min(540px,100%)", maxHeight: "90vh", overflow: "auto", padding: "2rem", boxShadow: `8px 8px 0 ${C.pink}44` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div style={{ borderLeft: `4px solid ${C.cyan}`, paddingLeft: ".8rem" }}>
            <p style={{ fontFamily: "'Oswald',sans-serif", color: C.cyan, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".2em" }}>▶ ЗАХИАЛГА</p>
            <h3 style={{ fontFamily: "'Black Ops One',cursive", color: C.ink, fontSize: "1.4rem" }}>ТАНЫ МЭДЭЭЛЭЛ</h3>
          </div>
          <button onClick={onClose} className="btn" style={{ background: "transparent", color: C.muted, border: `2px solid ${C.border}`, padding: "6px 8px" }}><IClose /></button>
        </div>

        <div style={{ display: "grid", gap: "1rem" }}>
          {[["name", "▶ БҮТЭН НЭР", "text"], ["email", "▶ ИМЭЙЛ", "email"], ["phone", "▶ УТАС (ЗААВАЛ БИШ)", "tel"], ["address", "▶ ХҮРГЭЛТИЙН ХАЯГ", "text"]].map(([k, label, type]) => (
            <div key={k}>
              <label style={{ fontFamily: "'Oswald',sans-serif", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em", color: errors[k] ? C.pink : C.muted, display: "block", marginBottom: 4 }}>{label}</label>
              <input type={type} value={form[k]} onChange={e => set(k, e.target.value)} className="raw-input" style={{ borderColor: errors[k] ? C.pink : C.border }} />
              {errors[k] && <p style={{ color: C.pink, fontFamily: "'Oswald',sans-serif", fontSize: ".72rem", marginTop: 3, fontWeight: 700 }}>⚠ {errors[k]}</p>}
            </div>
          ))}
        </div>
        <div style={{ background: C.bg, clipPath: clip(8), padding: "1rem", marginTop: "1.2rem", border: `2px solid ${C.border}` }}>
          <p style={{ fontFamily: "'Oswald',sans-serif", color: C.muted, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".15em" }}>НИЙТ ДҮН</p>
          <p style={{ fontFamily: "'Black Ops One',cursive", fontSize: "1.8rem", color: C.ink }}>₮{total.toLocaleString()}</p>
        </div>
        <button onClick={() => validate() && onPlace(form)} className="btn" style={{ width: "100%", marginTop: "1.2rem", background: C.pink, color: C.white, border: `2px solid ${C.pink}`, padding: "1rem", fontSize: ".95rem", boxShadow: `4px 4px 0 ${C.yellow}` }}>
          ЗАХИАЛГА БАТЛАХ ✓
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   APP ROOT
══════════════════════════════════════ */
function App() {
  const [products] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("store");
  const [co, setCo] = useState(false);
  const [succ, setSucc] = useState(null);

  const addToCart = p => setCart(prev => {
    const ex = prev.find(i => i.id === p.id);
    return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }];
  });
  const removeFc = id => setCart(p => p.filter(i => i.id !== id));
  const updateQty = (id, qty) => qty < 1 ? removeFc(id) : setCart(p => p.map(i => i.id === id ? { ...i, qty } : i));
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  const placeOrder = (buyer) => {
    const orderData = { 
      id: Date.now(), 
      buyer, 
      items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })), 
      total 
    };
    setSucc(orderData);
    setCart([]);
    setCo(false);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: C.bg }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        <header style={{
          position: "sticky", top: 0, zIndex: 200,
          background: "rgba(242,238,255,.96)", backdropFilter: "blur(10px)",
          borderBottom: `3px solid ${C.pink}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 1.5rem", height: 66,
          boxShadow: `0 3px 0 ${C.pink}22`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}>
            <div>
              <div style={{ fontFamily: "'Black Ops One',cursive", fontSize: "1.85rem", lineHeight: 1, color: C.ink, textShadow: `3px 3px 0 ${C.pink}44, 5px 5px 0 ${C.purple}33` }}>
                DOFLAMINGO
              </div>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: ".58rem", fontWeight: 700, color: C.pink, letterSpacing: ".28em", marginTop: 1 }}>
                ▶ МОНГОЛ БАЗАР ◀
              </div>
            </div>
            <nav style={{ display: "flex", gap: 6 }}>
              <button onClick={() => setView("store")} className="btn" style={{
                background: view === "store" ? C.pink : "transparent",
                color: view === "store" ? C.white : C.muted,
                border: `2px solid ${view === "store" ? C.pink : C.border}`,
                padding: ".3rem .9rem", fontSize: ".78rem",
                boxShadow: view === "store" ? `3px 3px 0 ${C.purple}55` : "none",
              }}>// ДЭЛГҮҮР</button>
            </nav>
          </div>

          <button onClick={() => setView("cart")} className="btn" style={{
            background: count > 0 ? C.pink : "transparent",
            color: count > 0 ? C.white : C.muted,
            border: `2px solid ${count > 0 ? C.pink : C.border}`,
            padding: ".38rem 1.1rem", fontSize: ".82rem",
            boxShadow: count > 0 ? `3px 3px 0 ${C.yellow}` : "none",
            display: "flex", alignItems: "center", gap: 7, position: "relative",
          }}>
            <ICart /> САГС
            {count > 0 && <span style={{
              position: "absolute", top: -10, right: -10,
              background: C.yellow, color: C.ink,
              clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
              width: 21, height: 21, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: ".72rem",
              animation: "badgePop 1.1s ease-in-out infinite",
            }}>{count}</span>}
          </button>
        </header>

        {view === "store" && <StoreView products={products} addToCart={addToCart} />}
        {view === "cart" && <CartView cart={cart} removeFc={removeFc} updateQty={updateQty} total={total} onCheckout={() => setCo(true)} onBack={() => setView("store")} />}

        {co && <CheckoutModal total={total} onClose={() => setCo(false)} onPlace={placeOrder} />}
        {succ && <SuccessModal order={succ} onClose={() => { setSucc(null); setView("store"); }} />}
      </div>
    </div>
  );
}

/* ── Error Boundary & Mount ── */
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return (
      <div style={{ textAlign: "center", padding: "5rem 2rem", fontFamily: "'Oswald',sans-serif", background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h1 style={{ fontFamily: "'Black Ops One',cursive", fontSize: "2.5rem", color: C.ink, marginBottom: "1rem" }}>АЛДАА ГАРЛАА</h1>
        <p style={{ color: C.muted, marginBottom: "2rem" }}>Хуудсаа дахин ачааллана уу.</p>
        <button onClick={() => location.reload()} className="btn" style={{ background: C.pink, color: C.white, border: `2px solid ${C.pink}`, padding: ".8rem 2rem", fontSize: "1rem", boxShadow: `4px 4px 0 ${C.yellow}` }}>ДАХИН АЧААЛЛАХ</button>
      </div>
    );
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ErrorBoundary><App /></ErrorBoundary>);
