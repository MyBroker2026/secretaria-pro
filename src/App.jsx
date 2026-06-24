import { useState, useEffect, useRef, useCallback } from "react";

// ─── LOGO (base64 embedded) ────────────────────────────────────────────────
const LOGO_B64 = "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";
const LOGO_SRC = `data:image/jpeg;base64,${LOGO_B64}`;

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────
const C = {
  petrol: "#0D4F6C", royal: "#1A6EA8", royalLight: "#E8F1F8",
  bg: "#F0F4F8", bgDark: "#0F1C26",
  card: "#FFFFFF", cardDark: "#162433",
  text: "#1E2A35", textDark: "#E8F0F7",
  muted: "#6B7F8E", mutedDark: "#7A9BB5",
  border: "#DDE4EA", borderDark: "#1E3347",
  success: "#16A34A", warning: "#D97706", danger: "#DC2626",
  sidebar: "#0A3D56",
};

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────
// 
// Dashboard → Settings → API
const SUPABASE_URL = "https://bhnegpnpupbxdjpveefu.supabase.co/rest/v1/"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJobmVncG5wdXBieGRqcHZlZWZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNjgxNzEsImV4cCI6MjA5Nzg0NDE3MX0.tt-ppOU5azA9SbTrKOoYRLKVzHuNkYJcvhTW0jxMpWg"; 

async function sb(path, opts = {}) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": opts.method === "POST" ? "return=representation" : "return=minimal",
    },
    ...opts,
  });
  if (!res.ok) { console.error("Supabase error", res.status, await res.text()); return null; }
  return res.json().catch(() => null);
}

// ─── NAV ────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "agenda", label: "Agenda", icon: "📅" },
  { id: "clientes", label: "Clientes", icon: "👥" },
  { id: "apolices", label: "Apólices", icon: "📋" },
  { id: "tarefas", label: "Tarefas", icon: "✓" },
  { id: "financeiro", label: "Financeiro", icon: "💰" },
  { id: "ia", label: "IA Assistente", icon: "✦" },
  { id: "config", label: "Configurações", icon: "⚙" },
];

// ─── SMALL UI ATOMS ─────────────────────────────────────────────────────
function Avatar({ initials = "?", size = 36, color = C.royal }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.33, fontWeight: 600, flexShrink: 0, letterSpacing: "0.02em" }}>
      {initials}
    </div>
  );
}

function Badge({ label, color = "#E8F1F8", textColor = C.royal }) {
  return (
    <span style={{ padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: color, color: textColor, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    Ativa: { bg: "#DCFCE7", color: "#15803D" }, Ativo: { bg: "#DCFCE7", color: "#15803D" },
    Vencendo: { bg: "#FEF3C7", color: "#B45309" }, Pendente: { bg: "#FEE2E2", color: "#B91C1C" },
    Renovada: { bg: "#E0E7FF", color: "#3730A3" }, Cancelada: { bg: "#F3F4F6", color: "#6B7280" },
    Inativo: { bg: "#F3F4F6", color: "#6B7280" },
  };
  const s = map[status] || map["Ativa"];
  return <Badge label={status} color={s.bg} textColor={s.color} />;
}

function Spinner() {
  return (
    <div style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
  );
}

function EmptyState({ icon = "📭", title = "Nenhum dado ainda", sub = "" }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px", opacity: 0.7 }}>
      <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
      {sub && <div style={{ fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function MiniChart({ data }) {
  if (!data?.length) return null;
  const max = Math.max(...data.map(d => d.value));
  const w = 200, h = 48;
  const pts = data.map((d, i) => ({ x: (i / (data.length - 1)) * (w - 20) + 10, y: h - ((d.value / max) * (h - 8)) - 4 }));
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const fill = `${pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")} L ${pts[pts.length - 1].x} ${h} L ${pts[0].x} ${h} Z`;
  return (
    <svg width={w} height={h} style={{ opacity: 0.7 }}>
      <defs><linearGradient id="mcg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.royal} stopOpacity="0.3" /><stop offset="100%" stopColor={C.royal} stopOpacity="0" /></linearGradient></defs>
      <path d={fill} fill="url(#mcg)" />
      <path d={path} fill="none" stroke={C.royal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BarChart({ data, borderColor }) {
  if (!data?.length) return null;
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, padding: "0 4px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: 4 }}>
          <div style={{ width: "100%", borderRadius: "4px 4px 0 0", height: `${(d.value / max) * 100}px`, background: i === data.length - 1 ? C.royal : borderColor, transition: "height 0.4s cubic-bezier(.4,0,.2,1)" }} />
          <span style={{ fontSize: 10 }}>{d.month || d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── MODAL WRAPPER ────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children, cardBg, borderColor, textColor }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.15s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 480, maxHeight: "85vh", overflowY: "auto", background: cardBg, borderRadius: 16, border: `1px solid ${borderColor}`, boxShadow: "0 24px 64px rgba(0,0,0,0.2)", animation: "slideUp 0.2s cubic-bezier(.4,0,.2,1)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${borderColor}` }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: textColor }}>{title}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: textColor, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── FORM FIELD ────────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
      {children}
    </div>
  );
}

// ─── MEMORIA FORM ────────────────────────────────────────────────────────
function MemoriaForm({ onAdd, dark, bg, cardBg, textColor, mutedColor, borderColor }) {
  const [key, setKey] = useState("");
  const [val, setVal] = useState("");
  const [open, setOpen] = useState(false);
  const handle = () => {
    if (!key.trim() || !val.trim()) return;
    onAdd(key.trim(), val.trim());
    setKey(""); setVal(""); setOpen(false);
  };
  if (!open) return (
    <button onClick={() => setOpen(true)} style={{ width: "100%", padding: "7px 0", borderRadius: 8, border: `1px dashed ${borderColor}`, background: "transparent", color: mutedColor, fontSize: 12, cursor: "pointer", marginTop: 4 }}>
      + Adicionar informação
    </button>
  );
  return (
    <div style={{ padding: "10px", borderRadius: 8, border: `1px solid ${borderColor}`, background: cardBg, marginTop: 4 }}>
      <input value={key} onChange={e => setKey(e.target.value)} placeholder="Campo (ex: Seguradora preferida)" style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: `1px solid ${borderColor}`, background: bg, color: textColor, fontSize: 12, outline: "none", marginBottom: 6, fontFamily: "inherit" }} />
      <textarea value={val} onChange={e => setVal(e.target.value)} placeholder="Valor (ex: Porto Seguro)" rows={2} style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: `1px solid ${borderColor}`, background: bg, color: textColor, fontSize: 12, outline: "none", resize: "none", fontFamily: "inherit", marginBottom: 6 }} />
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={handle} style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: "none", background: "#1A6EA8", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Salvar</button>
        <button onClick={() => setOpen(false)} style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: `1px solid ${borderColor}`, background: "transparent", color: mutedColor, fontSize: 12, cursor: "pointer" }}>Cancelar</button>
      </div>
    </div>
  );
}

// ─── SPLASH SCREEN ────────────────────────────────────────────────────────
function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => onDone(), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, background: C.petrol, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 9999, opacity: phase ? 0 : 1, transition: "opacity 0.4s ease" }}>
      <div style={{ width: 96, height: 96, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 16px rgba(255,255,255,0.1)", marginBottom: 20, animation: "splashPop 0.5s cubic-bezier(.4,0,.2,1)" }}>
        <img src={LOGO_SRC} alt="Logo" style={{ width: 76, height: 76, borderRadius: "50%", objectFit: "cover" }} />
      </div>
      <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, letterSpacing: "0.04em", animation: "fadeInUp 0.5s 0.1s both" }}>Secretária Pro</div>
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4, animation: "fadeInUp 0.5s 0.2s both" }}>Gestão de Corretora</div>
    </div>
  );
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', -apple-system, sans-serif; }
input, select, textarea { font-family: inherit; }
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 99px; }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes splashPop { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes cardIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes shimmer { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

.card-anim { animation: cardIn 0.3s cubic-bezier(.4,0,.2,1) both; }
.card-anim:nth-child(1) { animation-delay: 0ms; }
.card-anim:nth-child(2) { animation-delay: 40ms; }
.card-anim:nth-child(3) { animation-delay: 80ms; }
.card-anim:nth-child(4) { animation-delay: 120ms; }
.card-anim:nth-child(5) { animation-delay: 160ms; }
.card-anim:nth-child(6) { animation-delay: 200ms; }

.row-hover:hover { border-color: #1A6EA8 !important; background: rgba(26,110,168,0.03) !important; transition: all 0.15s; }
.btn-primary { background: #1A6EA8; color: #fff; border: none; border-radius: 8px; padding: 8px 16px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.15s, transform 0.1s; font-family: inherit; }
.btn-primary:hover { background: #155d8e; }
.btn-primary:active { transform: scale(0.97); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-ghost { background: transparent; border: 1px solid #DDE4EA; border-radius: 8px; padding: 8px 14px; font-size: 12px; font-weight: 600; cursor: pointer; transition: background 0.15s; font-family: inherit; }
.btn-ghost:hover { background: rgba(0,0,0,0.04); }
input[data-field], select[data-field], textarea[data-field] {
  width: 100%; padding: 9px 12px; border-radius: 8px; border: 1px solid #DDE4EA; font-size: 13px; outline: none; transition: border-color 0.15s; font-family: inherit;
}
input[data-field]:focus, select[data-field]:focus, textarea[data-field]:focus { border-color: #1A6EA8; }
.loading-pulse { animation: shimmer 1.2s ease-in-out infinite; }
`;


// ─── STORAGE HELPER ───────────────────────────────────────────────────────
async function storageGet(key) {
  try {
    if (typeof window !== "undefined" && window.storage && typeof window.storage.get === "function") {
      const r = await window.storage.get(key);
      return r?.value ?? null;
    }
  } catch {}
  try { return window.localStorage?.getItem(key) ?? null; } catch {}
  return null;
}
async function storageSet(key, value) {
  try {
    if (typeof window !== "undefined" && window.storage && typeof window.storage.set === "function") {
      await window.storage.set(key, value);
      return;
    }
  } catch {}
  try { window.localStorage?.setItem(key, value); } catch {}
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────
export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // ── DATA STATE ────────────────────────────────────────────────────────
  const [clientes, setClientes] = useState([]);
  const [apolices, setApolices] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [financeiro, setFinanceiro] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);

  // ── MODAL STATE ───────────────────────────────────────────────────────
  const [modalClient, setModalClient] = useState(false);
  // filter states (moved out of render fns)
  const [filterClientes, setFilterClientes] = useState("Todos");
  const [buscaClientes, setBuscaClientes] = useState("");
  const [filterApolices, setFilterApolices] = useState("Todas");
  const [modalApolice, setModalApolice] = useState(false);
  const [modalAgenda, setModalAgenda] = useState(false);
  const [modalTarefa, setModalTarefa] = useState(false);
  const [saving, setSaving] = useState(false);

  // ── FORM STATE ────────────────────────────────────────────────────────
  const [fClient, setFClient] = useState({ nome: "", telefone: "", email: "", segmento: "Standard", status: "Ativo" });
  const [fApolice, setFApolice] = useState({ numero: "", cliente_nome: "", seguradora: "", categoria: "Automóvel", valor: "", vencimento: "", status: "Ativa" });
  const [fAgenda, setFAgenda] = useState({ data: "", horario: "", cliente_nome: "", tipo: "", observacoes: "" });
  const [fTarefa, setFTarefa] = useState({ titulo: "", prioridade: "Média", prazo: "", tag: "" });

  // ── IA STATE ──────────────────────────────────────────────────────────
  const [iaInput, setIaInput] = useState("");
  const [iaLoading, setIaLoading] = useState(false);
  const iaRef = useRef(null);
  const iaMsgEndRef = useRef(null);

  // Histórico de conversas (persistente via window.storage)
  const [iaConversas, setIaConversas] = useState([]); // [{id, titulo, data, msgs:[]}]
  const [iaConvAtiva, setIaConvAtiva] = useState(null); // id da conversa ativa
  const [iaSidebarOpen, setIaSidebarOpen] = useState(true);
  const [iaBuscaConv, setIaBuscaConv] = useState("");
  const [iaMemoria, setIaMemoria] = useState({}); // dados extras cadastrados pelo usuário

  // Msgs da conversa ativa
  const iaMessages = iaConversas.find(c => c.id === iaConvAtiva)?.msgs || [];
  const setIaMessages = (updater) => {
    setIaConversas(prev => prev.map(c => {
      if (c.id !== iaConvAtiva) return c;
      const newMsgs = typeof updater === "function" ? updater(c.msgs) : updater;
      return { ...c, msgs: newMsgs, titulo: newMsgs.find(m => m.role === "user")?.text?.slice(0,40) || c.titulo };
    }));
  };

  const bg = dark ? C.bgDark : C.bg;
  const cardBg = dark ? C.cardDark : C.card;
  const textColor = dark ? C.textDark : C.text;
  const mutedColor = dark ? C.mutedDark : C.muted;
  const borderColor = dark ? C.borderDark : C.border;
  const inputStyle = { background: cardBg, color: textColor, borderColor };

  // ── LOAD DATA ─────────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setLoading(true);
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      setDbConnected(false);
      setLoading(false);
      return;
    }
    setDbConnected(true);
    const [c, a, t, ag, fin] = await Promise.all([
      sb("clientes?order=nome.asc&select=*"),
      sb("apolices?order=created_at.desc&select=*"),
      sb("tarefas?order=created_at.desc&select=*"),
      sb("agenda?order=data.asc,horario.asc&select=*"),
      sb("financeiro?order=mes.asc&select=*"),
    ]);
    if (c) setClientes(c);
    if (a) setApolices(a);
    if (t) setTarefas(t);
    if (ag) setAgenda(ag);
    if (fin) setFinanceiro(fin);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // ── KEYBOARD SHORTCUTS ────────────────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") { setSearchOpen(false); setNotifOpen(false); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => { if (iaRef.current) iaRef.current.scrollTop = iaRef.current.scrollHeight; }, [iaMessages]);
  useEffect(() => { iaMsgEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [iaMessages, iaLoading]);

  // ── ACTIONS ───────────────────────────────────────────────────────────
  const saveClient = async () => {
    if (!fClient.nome.trim()) return alert("Nome é obrigatório.");
    setSaving(true);
    if (dbConnected) {
      const res = await sb("clientes", { method: "POST", body: JSON.stringify({ ...fClient, created_at: new Date().toISOString() }) });
      if (res) { await loadData(); }
    } else {
      setClientes(prev => [...prev, { id: Date.now(), ...fClient, avatar: fClient.nome.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) }]);
    }
    setFClient({ nome: "", telefone: "", email: "", segmento: "Standard", status: "Ativo" });
    setModalClient(false);
    setSaving(false);
  };

  const saveApolice = async () => {
    if (!fApolice.numero.trim()) return alert("Número é obrigatório.");
    setSaving(true);
    if (dbConnected) {
      await sb("apolices", { method: "POST", body: JSON.stringify({ ...fApolice, created_at: new Date().toISOString() }) });
      await loadData();
    } else {
      setApolices(prev => [...prev, { id: Date.now(), ...fApolice }]);
    }
    setFApolice({ numero: "", cliente_nome: "", seguradora: "", categoria: "Automóvel", valor: "", vencimento: "", status: "Ativa" });
    setModalApolice(false);
    setSaving(false);
  };

  const saveAgenda = async () => {
    if (!fAgenda.cliente_nome.trim() || !fAgenda.data) return alert("Cliente e data são obrigatórios.");
    setSaving(true);
    if (dbConnected) {
      await sb("agenda", { method: "POST", body: JSON.stringify({ ...fAgenda, created_at: new Date().toISOString() }) });
      await loadData();
    } else {
      setAgenda(prev => [...prev, { id: Date.now(), ...fAgenda }]);
    }
    setFAgenda({ data: "", horario: "", cliente_nome: "", tipo: "", observacoes: "" });
    setModalAgenda(false);
    setSaving(false);
  };

  const saveTarefa = async () => {
    if (!fTarefa.titulo.trim()) return alert("Título é obrigatório.");
    setSaving(true);
    if (dbConnected) {
      await sb("tarefas", { method: "POST", body: JSON.stringify({ ...fTarefa, done: false, created_at: new Date().toISOString() }) });
      await loadData();
    } else {
      setTarefas(prev => [...prev, { id: Date.now(), ...fTarefa, done: false }]);
    }
    setFTarefa({ titulo: "", prioridade: "Média", prazo: "", tag: "" });
    setModalTarefa(false);
    setSaving(false);
  };

  const toggleTarefa = async (id, done) => {
    if (dbConnected) {
      await sb(`tarefas?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ done: !done }) });
    }
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteItem = async (table, id, setter) => {
    if (!confirm("Confirma exclusão?")) return;
    if (dbConnected) await sb(`${table}?id=eq.${id}`, { method: "DELETE" });
    setter(prev => prev.filter(x => x.id !== id));
  };

  // ── IA ────────────────────────────────────────────────────────────────

  const novaConversa = (silent = false) => {
    const id = `conv-${Date.now()}`;
    const nova = {
      id,
      titulo: "Nova conversa",
      data: new Date().toISOString(),
      msgs: [{ role: "assistant", text: "Olá! Sou sua assistente especializada em seguros. Com acesso completo à sua carteira, posso ajudar com renovações, análises, mensagens para clientes e muito mais. Como posso ajudar hoje?" }],
    };
    setIaConversas(prev => [nova, ...prev]);
    setIaConvAtiva(id);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const val = await storageGet("ia-conversas");
        if (val) {
          const convs = JSON.parse(val);
          if (Array.isArray(convs) && convs.length > 0) {
            setIaConversas(convs);
            setIaConvAtiva(convs[0].id);
            return;
          }
        }
      } catch {}
      novaConversa(true);
      try {
        const val2 = await storageGet("ia-memoria");
        if (val2) setIaMemoria(JSON.parse(val2));
      } catch {}
    };
    load();
  }, []);

  useEffect(() => {
    if (iaConversas.length === 0) return;
    storageSet("ia-conversas", JSON.stringify(iaConversas));
  }, [iaConversas]);

  useEffect(() => {
    storageSet("ia-memoria", JSON.stringify(iaMemoria));
  }, [iaMemoria]);

// icaro esteve aqui

  const excluirConversa = (id) => {
    setIaConversas(prev => {
      const novas = prev.filter(c => c.id !== id);
      if (iaConvAtiva === id) {
        if (novas.length > 0) setIaConvAtiva(novas[0].id);
        else novaConversa(true);
      }
      return novas;
    });
  };

  const buildSystemPrompt = () => {
    const clientesStr = clientes.length > 0
      ? clientes.map(c => `- ${c.nome} | Tel: ${c.telefone || "N/A"} | Email: ${c.email || "N/A"} | Seg: ${c.segmento || "N/A"} | Status: ${c.status || "N/A"}${c.observacoes ? " | Obs: " + c.observacoes : ""}`).join("\n")
      : "Nenhum cliente cadastrado.";
    const apolicesStr = apolices.length > 0
      ? apolices.map(a => `- Nº${a.numero} | Cliente: ${a.cliente_nome} | ${a.categoria} | ${a.seguradora} | Valor: ${a.valor} | Venc: ${a.vencimento} | Status: ${a.status}`).join("\n")
      : "Nenhuma apólice cadastrada.";
    const tarefasStr = tarefas.filter(t => !t.done).length > 0
      ? tarefas.filter(t => !t.done).map(t => `- ${t.titulo} | Prioridade: ${t.prioridade} | Prazo: ${t.prazo || "N/A"}`).join("\n")
      : "Sem tarefas pendentes.";
    const memoriaStr = Object.keys(iaMemoria).length > 0
      ? Object.entries(iaMemoria).map(([k, v]) => `${k}: ${v}`).join("\n")
      : "";
    const vencendoLogo = apolices.filter(a => {
      if (!a.vencimento) return false;
      const dias = Math.ceil((new Date(a.vencimento) - new Date()) / 86400000);
      return dias >= 0 && dias <= 30;
    });
    return `Você é uma assistente corporativa especializada em corretoras de seguros no Brasil, com acesso completo e memória permanente dos dados desta corretora.

DADOS DA CARTEIRA (use sempre que relevante, busca case-insensitive):

CLIENTES (${clientes.length}):
${clientesStr}

APÓLICES (${apolices.length} total, ${vencendoLogo.length} vencendo em 30 dias):
${apolicesStr}

TAREFAS PENDENTES:
${tarefasStr}

${memoriaStr ? `INFORMAÇÕES EXTRAS CADASTRADAS:\n${memoriaStr}\n` : ""}
REGRAS:
- Sempre consulte os dados acima antes de responder.
- Ao mencionar um cliente por nome (mesmo com erros de grafia ou maiúsculas), identifique o mais próximo na lista.
- Responda em português, de forma concisa e profissional.
- Se perguntado sobre dados de um cliente, busque nas listas acima.
- Para renovações urgentes (≤7 dias), seja proativo e sugira ação imediata.
- Você tem MEMÓRIA PERMANENTE: dados cadastrados persistem entre conversas.`;
  };

  const sendIaMessage = async () => {
    if (!iaInput.trim() || iaLoading) return;
    const userMsg = iaInput.trim();
    setIaInput("");
    setIaMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setIaLoading(true);
    try {
      const msgs = iaMessages.filter(m => m.role !== "assistant" || iaMessages.indexOf(m) > 0);
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1200,
          system: buildSystemPrompt(),
          messages: [
            ...msgs.map(m => ({ role: m.role, content: m.text })),
            { role: "user", content: userMsg },
          ],
        }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || data.error?.message || "Não consegui processar.";
      setIaMessages(prev => [...prev, { role: "assistant", text }]);
    } catch {
      setIaMessages(prev => [...prev, { role: "assistant", text: "Erro de conexão." }]);
    }
    setIaLoading(false);
  };

  // ── HELPERS ───────────────────────────────────────────────────────────
  const card = (children, extra = {}) => (
    <div className="card-anim" style={{ background: cardBg, borderRadius: 12, padding: 20, border: `1px solid ${borderColor}`, transition: "border-color 0.15s", ...extra }}>
      {children}
    </div>
  );
  const lbl = (text) => <div style={{ fontSize: 11, fontWeight: 600, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{text}</div>;
  const inputCss = { width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${borderColor}`, background: cardBg, color: textColor, fontSize: 13, outline: "none", fontFamily: "inherit" };

  // ── VIEWS ─────────────────────────────────────────────────────────────
  const sidebarW = sidebarOpen ? 260 : 64;

  // ── DB BANNER ─────────────────────────────────────────────────────────
  const DbBanner = () => !SUPABASE_URL ? (
    <div style={{ background: "#FEF3C7", border: "1px solid #FCD34D", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#92400E" }}>
      ⚠️ <strong>Banco de dados não configurado.</strong> Os dados estão apenas na memória desta sessão.{" "}
      <strong>Veja as instruções de configuração no arquivo <code>SUPABASE_SETUP.md</code>.</strong>
    </div>
  ) : null;

  // ── DASHBOARD ─────────────────────────────────────────────────────────
  const renderDashboard = () => {
    const ativos = clientes.filter(c => c.status === "Ativo").length;
    const vencendo = apolices.filter(a => a.status === "Vencendo");
    const tasksPendentes = tarefas.filter(t => !t.done);
    const hoje = new Date().toISOString().split("T")[0];
    const agendaHoje = agenda.filter(a => a.data === hoje);
    const receitaMes = financeiro[financeiro.length - 1]?.valor || 0;
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
        {card(<>
          {lbl("Clientes ativos")}
          <div style={{ fontSize: 30, fontWeight: 700, color: textColor }}>{loading ? <span className="loading-pulse">—</span> : ativos}</div>
          <div style={{ fontSize: 12, color: mutedColor, marginTop: 2 }}>{clientes.length} total</div>
          <div style={{ marginTop: 14, display: "flex", gap: 6 }}>
            <div style={{ flex: ativos || 1, height: 5, borderRadius: 99, background: C.royal }} />
            <div style={{ flex: Math.max(clientes.length - ativos, 0) || 1, height: 5, borderRadius: 99, background: borderColor }} />
          </div>
        </>)}
        {card(<>
          {lbl("Apólices vencendo")}
          <div style={{ fontSize: 30, fontWeight: 700, color: vencendo.length > 0 ? C.warning : textColor }}>{loading ? <span className="loading-pulse">—</span> : vencendo.length}</div>
          <div style={{ fontSize: 12, color: mutedColor, marginTop: 2 }}>{apolices.length} apólices ativas</div>
          {vencendo.length > 0 && <div style={{ marginTop: 6 }}><Badge label="Atenção necessária" color="#FEF3C7" textColor="#B45309" /></div>}
        </>)}
        {card(<>
          {lbl("Tarefas pendentes")}
          <div style={{ fontSize: 30, fontWeight: 700, color: textColor }}>{loading ? <span className="loading-pulse">—</span> : tasksPendentes.length}</div>
          <div style={{ fontSize: 12, color: mutedColor, marginTop: 2 }}>{tarefas.filter(t => t.done).length} concluídas</div>
          <div style={{ marginTop: 10 }}>
            {tasksPendentes.filter(t => t.prioridade === "Alta").length > 0 && <Badge label={`${tasksPendentes.filter(t => t.prioridade === "Alta").length} alta`} color="#FEE2E2" textColor="#B91C1C" />}
          </div>
        </>)}
        {card(<>
          {lbl("Receita registrada")}
          <div style={{ fontSize: 26, fontWeight: 700, color: textColor }}>{loading ? <span className="loading-pulse">—</span> : `R$ ${Number(receitaMes || 0).toLocaleString("pt-BR")}`}</div>
          <div style={{ fontSize: 12, color: mutedColor, marginTop: 2 }}>Último mês registrado</div>
          <div style={{ marginTop: 10 }}><MiniChart data={financeiro.map(f => ({ value: f.valor }))} /></div>
        </>)}

        {card(<>
          {lbl("Agenda de hoje")}
          {agendaHoje.length === 0
            ? <EmptyState icon="📅" title="Nenhum compromisso hoje" sub="" />
            : <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
              {agendaHoje.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: bg }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: mutedColor, minWidth: 40 }}>{a.horario}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: textColor }}>{a.cliente_nome}</div>
                    <div style={{ fontSize: 11, color: mutedColor }}>{a.tipo}</div>
                  </div>
                </div>
              ))}
            </div>
          }
          <button onClick={() => setModalAgenda(true)} className="btn-ghost" style={{ width: "100%", marginTop: 12, color: C.royal, borderColor: C.royal }}>
            + Novo agendamento
          </button>
        </>, { gridColumn: "span 2" })}

        {card(<>
          {lbl("Apólices vencendo em breve")}
          {vencendo.length === 0
            ? <EmptyState icon="✅" title="Nenhuma vencendo" sub="Tudo em dia!" />
            : <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
              {vencendo.slice(0, 4).map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: bg }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: textColor }}>{p.cliente_nome}</div>
                    <div style={{ fontSize: 11, color: mutedColor }}>{p.categoria} · {p.numero}</div>
                  </div>
                  <Badge label="Vencendo" color="#FEF3C7" textColor="#B45309" />
                </div>
              ))}
            </div>
          }
        </>, { gridColumn: "span 2" })}
      </div>
    );
  };

  // ── CLIENTES ──────────────────────────────────────────────────────────
  const renderClientes = () => {
    if (selectedClient) {
      const c = selectedClient;
      const policesClient = apolices.filter(a => a.cliente_nome === c.nome);
      return (
        <div style={{ animation: "cardIn 0.2s ease" }}>
          <button onClick={() => setSelectedClient(null)} style={{ background: "none", border: "none", color: C.royal, cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 16, padding: 0 }}>← Voltar</button>
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 }}>
            {card(<>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingBottom: 16, borderBottom: `1px solid ${borderColor}`, marginBottom: 16 }}>
                <Avatar initials={(c.nome || c.avatar || "?").slice(0, 2).toUpperCase()} size={64} />
                <div style={{ fontWeight: 700, fontSize: 18, color: textColor, marginTop: 10 }}>{c.nome}</div>
                <div style={{ marginTop: 6 }}><StatusBadge status={c.status} /></div>
                <Badge label={c.segmento} color={C.royalLight} textColor={C.royal} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["Telefone", c.telefone], ["E-mail", c.email], ["Apólices", policesClient.length], ["Segmento", c.segmento]].map(([k, v]) => (
                  <div key={k}><div style={{ fontSize: 11, color: mutedColor, fontWeight: 600 }}>{k}</div><div style={{ fontSize: 13, color: textColor }}>{v || "—"}</div></div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                {c.telefone && <a href={`https://wa.me/55${c.telefone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ flex: 1, textAlign: "center", color: C.success, borderColor: C.success, textDecoration: "none", padding: "8px 0", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>WhatsApp</a>}
                {c.telefone && <a href={`tel:${c.telefone}`} className="btn-primary" style={{ flex: 1, textAlign: "center", textDecoration: "none", padding: "8px 0", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>Ligar</a>}
              </div>
              <button onClick={() => { if (confirm("Excluir cliente?")) { deleteItem("clientes", c.id, setClientes); setSelectedClient(null); } }} style={{ marginTop: 10, width: "100%", padding: "7px 0", borderRadius: 8, border: `1px solid ${C.danger}`, background: "transparent", color: C.danger, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                Excluir cliente
              </button>
            </>)}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {card(<>
                {lbl("Apólices")}
                {policesClient.length === 0
                  ? <EmptyState icon="📋" title="Nenhuma apólice" sub="Adicione a primeira apólice." />
                  : <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                    {policesClient.map((p, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: `1px solid ${borderColor}` }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: textColor }}>{p.categoria} · {p.numero}</div>
                          <div style={{ fontSize: 11, color: mutedColor }}>{p.seguradora} · {p.valor}</div>
                        </div>
                        <StatusBadge status={p.status} />
                      </div>
                    ))}
                  </div>
                }
              </>)}
            </div>
          </div>
        </div>
      );
    }

    const status = ["Todos", "Ativo", "Pendente", "Inativo"];
    const filtered = clientes.filter(c => {
      const matchStatus = filterClientes === "Todos" || c.status === filterClientes;
      const matchBusca = !buscaClientes || c.nome?.toLowerCase().includes(buscaClientes.toLowerCase()) || c.email?.toLowerCase().includes(buscaClientes.toLowerCase());
      return matchStatus && matchBusca;
    });

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {status.map(s => (
              <button key={s} className="btn-ghost" onClick={() => setFilterClientes(s)} style={{ color: filterClientes === s ? "#fff" : mutedColor, background: filterClientes === s ? C.royal : "transparent", borderColor: filterClientes === s ? C.royal : borderColor }}>
                {s}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={buscaClientes} onChange={e => setBuscaClientes(e.target.value)} placeholder="Buscar cliente..." style={{ ...inputCss, width: 220 }} />
            <button onClick={() => setModalClient(true)} className="btn-primary">+ Novo cliente</button>
          </div>
        </div>
        {loading && <div style={{ textAlign: "center", padding: 40, color: mutedColor }}>Carregando...</div>}
        {!loading && filtered.length === 0 && <EmptyState icon="👥" title="Nenhum cliente encontrado" sub={!dbConnected ? "Configure o banco de dados e adicione clientes." : "Tente outro filtro ou adicione um novo cliente."} />}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(c => (
            <div key={c.id} className="card-anim row-hover" onClick={() => setSelectedClient(c)}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 10, border: `1px solid ${borderColor}`, background: cardBg, cursor: "pointer" }}>
              <Avatar initials={(c.nome || c.avatar || "?").slice(0, 2).toUpperCase()} size={40} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: textColor }}>{c.nome}</div>
                <div style={{ fontSize: 12, color: mutedColor }}>{c.telefone} {c.telefone && c.email ? "·" : ""} {c.email}</div>
              </div>
              <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <StatusBadge status={c.status} />
              </div>
              <Badge label={c.segmento || "Standard"} color={C.royalLight} textColor={C.royal} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── APÓLICES ──────────────────────────────────────────────────────────
  const renderApolices = () => {
    const filters = ["Todas", "Ativa", "Vencendo", "Pendente", "Cancelada"];
    const filtered = filterApolices === "Todas" ? apolices : apolices.filter(a => a.status === filterApolices);
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 8, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {filters.map(f => (
              <button key={f} className="btn-ghost" onClick={() => setFilterApolices(f)} style={{ color: filterApolices === f ? "#fff" : mutedColor, background: filterApolices === f ? C.royal : "transparent", borderColor: filterApolices === f ? C.royal : borderColor }}>
                {f}
              </button>
            ))}
          </div>
          <button onClick={() => setModalApolice(true)} className="btn-primary">+ Nova apólice</button>
        </div>
        {loading && <div style={{ textAlign: "center", padding: 40, color: mutedColor }}>Carregando...</div>}
        {!loading && filtered.length === 0 && <EmptyState icon="📋" title="Nenhuma apólice" sub={!dbConnected ? "Configure o banco de dados e adicione apólices." : "Tente outro filtro."} />}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(p => (
            <div key={p.id} className="card-anim" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 90px 80px", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 10, border: `1px solid ${p.status === "Vencendo" ? "#FCD34D" : borderColor}`, background: cardBg }}>
              <div><div style={{ fontSize: 12, fontWeight: 700, color: textColor }}>{p.numero}</div><div style={{ fontSize: 11, color: mutedColor }}>{p.cliente_nome}</div></div>
              <div><div style={{ fontSize: 12, fontWeight: 600, color: textColor }}>{p.categoria}</div><div style={{ fontSize: 11, color: mutedColor }}>{p.seguradora}</div></div>
              <div><div style={{ fontSize: 12, fontWeight: 600, color: textColor }}>{p.valor}</div><div style={{ fontSize: 11, color: mutedColor }}>Vence: {p.vencimento}</div></div>
              <StatusBadge status={p.status} />
              <button onClick={() => deleteItem("apolices", p.id, setApolices)} style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${C.danger}`, background: "transparent", color: C.danger, fontSize: 11, cursor: "pointer" }}>Excluir</button>
              <button onClick={() => { /* detalhe futuro */ alert(`Apólice: ${p.numero}`) }} className="btn-ghost" style={{ fontSize: 11 }}>Detalhes</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── TAREFAS ───────────────────────────────────────────────────────────
  const renderTarefas = () => {
    const cols = [
      { col: "A fazer", filter: t => !t.done && t.prioridade === "Alta", accent: "#FEE2E2", atext: "#B91C1C" },
      { col: "Em andamento", filter: t => !t.done && t.prioridade !== "Alta", accent: "#FEF3C7", atext: "#B45309" },
      { col: "Concluídas", filter: t => t.done, accent: "#DCFCE7", atext: "#15803D" },
    ];
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button onClick={() => setModalTarefa(true)} className="btn-primary">+ Nova tarefa</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {cols.map(({ col, filter, accent, atext }) => (
            <div key={col}>
              <div style={{ fontSize: 12, fontWeight: 700, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>{col}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {tarefas.filter(filter).map(t => (
                  <div key={t.id} className="card-anim" style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${borderColor}`, background: cardBg, opacity: t.done ? 0.65 : 1, transition: "opacity 0.2s" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <div onClick={() => toggleTarefa(t.id, t.done)}
                        style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${t.done ? C.success : borderColor}`, background: t.done ? C.success : "transparent", cursor: "pointer", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                        {t.done && <span style={{ color: "#fff", fontSize: 10 }}>✓</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: textColor, textDecoration: t.done ? "line-through" : "none" }}>{t.titulo}</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                          {t.prazo && <Badge label={t.prazo} color={bg} textColor={mutedColor} />}
                          {t.tag && <Badge label={t.tag} color={accent} textColor={atext} />}
                          <Badge label={t.prioridade} color={t.prioridade === "Alta" ? "#FEE2E2" : (t.prioridade === "Baixa" ? "#DCFCE7" : "#FEF3C7")} textColor={t.prioridade === "Alta" ? "#B91C1C" : (t.prioridade === "Baixa" ? "#15803D" : "#B45309")} />
                        </div>
                      </div>
                      <button onClick={() => deleteItem("tarefas", t.id, setTarefas)} style={{ background: "none", border: "none", color: mutedColor, cursor: "pointer", fontSize: 14, padding: 0, lineHeight: 1 }}>×</button>
                    </div>
                  </div>
                ))}
                {tarefas.filter(filter).length === 0 && (
                  <div style={{ padding: "20px 14px", borderRadius: 10, border: `2px dashed ${borderColor}`, textAlign: "center", color: mutedColor, fontSize: 12 }}>
                    Vazio
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── AGENDA ─────────────────────────────────────────────────────────────
  const renderAgenda = () => {
    const hoje = new Date();
    const mesAtual = hoje.toLocaleString("pt-BR", { month: "long", year: "numeric" });
    const diasNoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
    const agendaHoje = agenda.filter(a => a.data === hoje.toISOString().split("T")[0]);
    const diaInicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1).getDay();
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
        {card(<>
          {lbl(mesAtual)}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginTop: 10 }}>
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: mutedColor, padding: "4px 0" }}>{d}</div>
            ))}
            {Array.from({ length: diaInicio }, (_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: diasNoMes }, (_, i) => {
              const dia = i + 1;
              const isHoje = dia === hoje.getDate();
              const temAgenda = agenda.some(a => a.data === `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`);
              return (
                <div key={dia} style={{ textAlign: "center", padding: "6px 0", borderRadius: 6, fontSize: 12, cursor: "pointer", background: isHoje ? C.royal : "transparent", color: isHoje ? "#fff" : (temAgenda ? C.royal : textColor), fontWeight: isHoje || temAgenda ? 700 : 400, transition: "background 0.15s" }}>
                  {dia}
                  {temAgenda && !isHoje && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.royal, margin: "1px auto 0" }} />}
                </div>
              );
            })}
          </div>
        </>)}
        {card(<>
          {lbl(`Hoje · ${hoje.toLocaleDateString("pt-BR")}`)}
          {agendaHoje.length === 0
            ? <EmptyState icon="🕐" title="Sem compromissos hoje" />
            : <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
              {agendaHoje.sort((a, b) => (a.horario || "").localeCompare(b.horario || "")).map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: mutedColor, minWidth: 42 }}>{a.horario}</span>
                  <Avatar initials={(a.cliente_nome || "?").slice(0, 2).toUpperCase()} size={26} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: textColor }}>{a.cliente_nome}</div>
                    <div style={{ fontSize: 11, color: mutedColor }}>{a.tipo}</div>
                  </div>
                  <button onClick={() => deleteItem("agenda", a.id, setAgenda)} style={{ background: "none", border: "none", color: mutedColor, cursor: "pointer", fontSize: 14 }}>×</button>
                </div>
              ))}
            </div>
          }
          <button onClick={() => setModalAgenda(true)} className="btn-ghost" style={{ width: "100%", marginTop: 14, color: C.royal, borderColor: C.royal }}>
            + Novo agendamento
          </button>
        </>)}
      </div>
    );
  };

  // ── FINANCEIRO ─────────────────────────────────────────────────────────
  const renderFinanceiro = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
      {loading
        ? [1, 2, 3].map(i => <div key={i} className="card-anim loading-pulse" style={{ background: cardBg, borderRadius: 12, padding: 20, height: 90, border: `1px solid ${borderColor}` }} />)
        : [["Receita total", financeiro.reduce((s, f) => s + (Number(f.valor) || 0), 0)],
          ["Média mensal", financeiro.length ? financeiro.reduce((s, f) => s + (Number(f.valor) || 0), 0) / financeiro.length : 0],
          ["Meses registrados", financeiro.length]
        ].map(([l, v], i) => card(<>
          {lbl(l)}
          <div style={{ fontSize: 26, fontWeight: 700, color: textColor, marginTop: 4 }}>
            {i < 2 ? `R$ ${Math.round(v).toLocaleString("pt-BR")}` : v}
          </div>
        </>, { key: l }))
      }
      {card(<>
        {lbl("Evolução mensal")}
        {financeiro.length === 0
          ? <EmptyState icon="💰" title="Sem dados financeiros" sub={!dbConnected ? "Configure o banco de dados." : "Adicione registros financeiros."} />
          : <div style={{ marginTop: 8 }}><BarChart data={financeiro.map(f => ({ value: f.valor, month: f.mes || f.created_at?.slice(0, 7) }))} borderColor={borderColor} /></div>
        }
      </>, { gridColumn: "span 3" })}
    </div>
  );

  // ── IA ────────────────────────────────────────────────────────────────
  const renderIA = () => {
    const convsFiltradas = iaConversas.filter(c =>
      !iaBuscaConv || c.titulo?.toLowerCase().includes(iaBuscaConv.toLowerCase()) ||
      c.msgs.some(m => m.text?.toLowerCase().includes(iaBuscaConv.toLowerCase()))
    );
    const grouped = convsFiltradas.reduce((acc, c) => {
      const d = new Date(c.data);
      const hoje = new Date();
      const diff = Math.floor((hoje - d) / 86400000);
      const grupo = diff === 0 ? "Hoje" : diff === 1 ? "Ontem" : diff <= 7 ? "Esta semana" : "Mais antigas";
      if (!acc[grupo]) acc[grupo] = [];
      acc[grupo].push(c);
      return acc;
    }, {});
    const gruposOrdem = ["Hoje", "Ontem", "Esta semana", "Mais antigas"];

    return (
      <div style={{ display: "flex", gap: 0, height: "calc(100vh - 130px)", borderRadius: 12, overflow: "hidden", border: `1px solid ${borderColor}` }}>

        {/* SIDEBAR CONVERSAS */}
        {iaSidebarOpen && (
          <div style={{ width: 240, background: dark ? "#0d1e2b" : "#F7FAFC", borderRight: `1px solid ${borderColor}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ padding: "12px 12px 8px" }}>
              <button onClick={() => novaConversa()} className="btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13 }}>
                <span style={{ fontSize: 16 }}>+</span> Nova conversa
              </button>
            </div>
            <div style={{ padding: "0 10px 8px" }}>
              <input value={iaBuscaConv} onChange={e => setIaBuscaConv(e.target.value)}
                placeholder="Buscar conversas..."
                style={{ width: "100%", padding: "7px 10px", borderRadius: 8, border: `1px solid ${borderColor}`, background: cardBg, color: textColor, fontSize: 12, outline: "none" }} />
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "0 8px" }}>
              {gruposOrdem.filter(g => grouped[g]?.length).map(grupo => (
                <div key={grupo}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.06em", padding: "8px 6px 4px" }}>{grupo}</div>
                  {grouped[grupo].map(conv => (
                    <div key={conv.id} onClick={() => setIaConvAtiva(conv.id)}
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 8px", borderRadius: 8, cursor: "pointer", marginBottom: 2, background: conv.id === iaConvAtiva ? (dark ? "rgba(26,110,168,0.3)" : C.royalLight) : "transparent", transition: "background 0.15s" }}
                      onMouseEnter={e => conv.id !== iaConvAtiva && (e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)")}
                      onMouseLeave={e => conv.id !== iaConvAtiva && (e.currentTarget.style.background = "transparent")}>
                      <div style={{ fontSize: 14, flexShrink: 0 }}>💬</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: conv.id === iaConvAtiva ? 600 : 400, color: textColor, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {conv.titulo || "Nova conversa"}
                        </div>
                        <div style={{ fontSize: 10, color: mutedColor }}>{conv.msgs.length} mensagens</div>
                      </div>
                      <button onClick={e => { e.stopPropagation(); excluirConversa(conv.id); }}
                        style={{ background: "none", border: "none", color: mutedColor, cursor: "pointer", fontSize: 14, padding: "0 2px", opacity: 0, transition: "opacity 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "0"}>×</button>
                    </div>
                  ))}
                </div>
              ))}
              {convsFiltradas.length === 0 && (
                <div style={{ textAlign: "center", padding: 24, color: mutedColor, fontSize: 12 }}>Nenhuma conversa encontrada.</div>
              )}
            </div>
          </div>
        )}

        {/* CHAT PRINCIPAL */}
        <div style={{ flex: 1, background: cardBg, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Header do chat */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: `1px solid ${borderColor}`, flexShrink: 0 }}>
            <button onClick={() => setIaSidebarOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", color: mutedColor, fontSize: 16, padding: "4px 6px", borderRadius: 6 }} title="Histórico">☰</button>
            <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", border: `2px solid ${C.royal}`, flexShrink: 0, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={LOGO_SRC} alt="Logo" style={{ width: "88%", height: "88%", objectFit: "contain" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: textColor, fontSize: 14 }}>IA Assistente</div>
              <div style={{ fontSize: 11, color: C.success }}>● Memória ativa · {clientes.length} clientes · {apolices.length} apólices</div>
            </div>
            <button onClick={() => novaConversa()} className="btn-ghost" style={{ fontSize: 12, color: C.royal, borderColor: C.royal }}>+ Nova</button>
          </div>

          {/* Mensagens */}
          <div ref={iaRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, padding: "16px 18px" }}>
            {iaMessages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", animation: "fadeInUp 0.2s ease" }}>
                {m.role === "assistant" && (
                  <div style={{ width: 26, height: 26, borderRadius: "50%", overflow: "hidden", flexShrink: 0, marginRight: 8, marginTop: 4, background: "#fff", border: `1px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={LOGO_SRC} style={{ width: "88%", height: "88%", objectFit: "contain" }} alt="IA" />
                  </div>
                )}
                <div style={{ maxWidth: "75%", padding: "10px 14px", borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", background: m.role === "user" ? C.royal : bg, color: m.role === "user" ? "#fff" : textColor, fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {m.text}
                </div>
              </div>
            ))}
            {iaLoading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", overflow: "hidden", background: "#fff", border: `1px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={LOGO_SRC} style={{ width: "88%", height: "88%", objectFit: "contain" }} alt="IA" />
                </div>
                <div style={{ padding: "10px 14px", borderRadius: "12px 12px 12px 2px", background: bg, display: "flex", gap: 5, alignItems: "center" }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: mutedColor, animation: `shimmer 1.2s ${i*0.2}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={iaMsgEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${borderColor}`, flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <textarea value={iaInput} onChange={e => setIaInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendIaMessage(); } }}
                placeholder="Pergunte sobre clientes, apólices, renovações... (Enter para enviar)"
                rows={2} style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1px solid ${borderColor}`, background: bg, color: textColor, fontSize: 13, outline: "none", resize: "none", fontFamily: "inherit", lineHeight: 1.5 }} />
              <button onClick={sendIaMessage} disabled={iaLoading} className="btn-primary" style={{ padding: "10px 18px", borderRadius: 10, height: 60 }}>
                {iaLoading ? <Spinner /> : "→"}
              </button>
            </div>
            <div style={{ fontSize: 10, color: mutedColor, marginTop: 5, textAlign: "center" }}>
              Enter para enviar · Shift+Enter para nova linha · Dados da carteira enviados automaticamente
            </div>
          </div>
        </div>

        {/* PAINEL DIREITO: Memória + Sugestões */}
        <div style={{ width: 240, background: dark ? "#0d1e2b" : "#F7FAFC", borderLeft: `1px solid ${borderColor}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Sugestões */}
          <div style={{ padding: "12px 12px 8px", borderBottom: `1px solid ${borderColor}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Sugestões rápidas</div>
            {["Quais apólices vencem nos próximos 7 dias?", "Resumo completo da carteira", "Rascunhe mensagem de renovação", "Clientes com mais apólices ativas", "Análise de receita mensal"].map((s, i) => (
              <button key={i} onClick={() => { setIaInput(s); }} className="btn-ghost" style={{ width: "100%", textAlign: "left", color: textColor, borderColor, marginBottom: 5, fontSize: 11, padding: "6px 10px" }}>{s}</button>
            ))}
          </div>

          {/* Memória extra */}
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: mutedColor, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Memória da IA</div>
            <div style={{ fontSize: 11, color: mutedColor, marginBottom: 8, lineHeight: 1.5 }}>Informe dados que a IA deve lembrar permanentemente:</div>
            {Object.entries(iaMemoria).map(([k, v]) => (
              <div key={k} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 6, padding: "6px 8px", borderRadius: 6, background: cardBg, border: `1px solid ${borderColor}` }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: C.royal, textTransform: "uppercase" }}>{k}</div>
                  <div style={{ fontSize: 12, color: textColor, wordBreak: "break-word" }}>{v}</div>
                </div>
                <button onClick={() => setIaMemoria(p => { const n = {...p}; delete n[k]; return n; })} style={{ background: "none", border: "none", cursor: "pointer", color: mutedColor, fontSize: 14, padding: 0, flexShrink: 0 }}>×</button>
              </div>
            ))}
            <MemoriaForm dark={dark} bg={bg} cardBg={cardBg} textColor={textColor} mutedColor={mutedColor} borderColor={borderColor}
              onAdd={(k, v) => setIaMemoria(p => ({ ...p, [k]: v }))} />
          </div>
        </div>

      </div>
    );
  }

  // ── CONFIG ─────────────────────────────────────────────────────────────
  const renderConfig = () => (
    <div style={{ maxWidth: 520 }}>
      {card(<>
        {lbl("Banco de dados · Supabase")}
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ padding: "12px 14px", borderRadius: 8, background: dbConnected ? "#DCFCE7" : "#FEE2E2", border: `1px solid ${dbConnected ? "#86EFAC" : "#FCA5A5"}`, fontSize: 13, color: dbConnected ? "#15803D" : "#B91C1C", fontWeight: 600 }}>
            {dbConnected ? "✅ Conectado ao Supabase" : "❌ Não conectado — edite SUPABASE_URL e SUPABASE_KEY no código"}
          </div>
          <div style={{ fontSize: 12, color: mutedColor, lineHeight: 1.6 }}>
            Para conectar: abra o arquivo JSX, encontre as variáveis <code>SUPABASE_URL</code> e <code>SUPABASE_KEY</code> no topo e substitua pelos valores do seu projeto. Veja o arquivo <strong>SUPABASE_SETUP.md</strong> para o SQL completo.
          </div>
        </div>
      </>, { marginBottom: 16 })}
      {card(<>
        {lbl("Aparência")}
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: textColor }}>Tema escuro</span>
          <div onClick={() => setDark(d => !d)} style={{ width: 44, height: 24, borderRadius: 99, background: dark ? C.royal : borderColor, cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
            <div style={{ position: "absolute", top: 3, left: dark ? 22 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
          </div>
        </div>
      </>)}
    </div>
  );

  const views = { dashboard: renderDashboard, agenda: renderAgenda, clientes: renderClientes, apolices: renderApolices, tarefas: renderTarefas, financeiro: renderFinanceiro, ia: renderIA, config: renderConfig };

  if (!splashDone) return (
    <>
      <style>{GLOBAL_CSS}</style>
      <SplashScreen onDone={() => setSplashDone(true)} />
    </>
  );

  const searchResults = search ? clientes.filter(c => c.nome?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase())) : clientes.slice(0, 5);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{ display: "flex", height: "100vh", background: bg, fontFamily: "'Inter', -apple-system, sans-serif", color: textColor, overflow: "hidden" }}>

        {/* SIDEBAR */}
        <div style={{ width: sidebarW, background: C.sidebar, transition: "width 250ms cubic-bezier(.4,0,.2,1)", display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden" }}>
          <div style={{ padding: "16px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, overflow: "hidden", flexShrink: 0, border: "2px solid rgba(255,255,255,0.15)", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <img src={LOGO_SRC} alt="Logo" style={{ width: "88%", height: "88%", objectFit: "contain" }} />
            </div>
            {sidebarOpen && (
              <div style={{ overflow: "hidden", animation: "fadeInUp 0.2s ease" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#fff", whiteSpace: "nowrap" }}>Secretária Pro</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}>Gestão de Corretora</div>
              </div>
            )}
          </div>
          <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
            {NAV.map(item => {
              const isActive = active === item.id;
              return (
                <div key={item.id} onClick={() => { setActive(item.id); setSelectedClient(null); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, cursor: "pointer", marginBottom: 2, background: isActive ? "rgba(26,110,168,0.3)" : "transparent", borderLeft: isActive ? `3px solid ${C.royal}` : "3px solid transparent", transition: "all 0.15s" }}
                  onMouseEnter={e => !isActive && (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                  onMouseLeave={e => !isActive && (e.currentTarget.style.background = "transparent")}>
                  <span style={{ fontSize: 15, flexShrink: 0, width: 20, textAlign: "center" }}>{item.icon}</span>
                  {sidebarOpen && <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "rgba(255,255,255,0.6)", whiteSpace: "nowrap", transition: "opacity 0.15s" }}>{item.label}</span>}
                </div>
              );
            })}
          </nav>
          <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px" }}>
              <Avatar initials="SP" size={28} color={C.royal} />
              {sidebarOpen && <div><div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Secretária Pro</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Admin</div></div>}
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* HEADER */}
          <div style={{ height: 54, background: cardBg, borderBottom: `1px solid ${borderColor}`, display: "flex", alignItems: "center", gap: 12, padding: "0 18px", flexShrink: 0, transition: "background 0.2s" }}>
            <button onClick={() => setSidebarOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", color: mutedColor, fontSize: 18, padding: 4, borderRadius: 6, transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = bg} onMouseLeave={e => e.currentTarget.style.background = "none"}>
              ☰
            </button>
            {!sidebarOpen && (
              <div style={{ width: 28, height: 28, borderRadius: 6, overflow: "hidden", border: `1px solid ${borderColor}` }}>
                <img src={LOGO_SRC} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}
            <button onClick={() => setSearchOpen(true)} style={{ flex: 1, maxWidth: 360, display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 8, border: `1px solid ${borderColor}`, background: bg, color: mutedColor, fontSize: 13, cursor: "text", textAlign: "left", fontFamily: "inherit" }}>
              <span>🔍</span> Buscar clientes... <span style={{ marginLeft: "auto", fontSize: 10, padding: "1px 5px", borderRadius: 4, border: `1px solid ${borderColor}` }}>⌘K</span>
            </button>
            <div style={{ flex: 1 }} />
            <button onClick={() => setDark(d => !d)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 4, borderRadius: 6, transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = bg} onMouseLeave={e => e.currentTarget.style.background = "none"}>
              {dark ? "☀️" : "🌙"}
            </button>
            <button onClick={() => setNotifOpen(o => !o)} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 4, borderRadius: 6, transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = bg} onMouseLeave={e => e.currentTarget.style.background = "none"}>
              🔔{apolices.filter(a => a.status === "Vencendo").length > 0 && <span style={{ position: "absolute", top: 2, right: 2, width: 7, height: 7, borderRadius: "50%", background: C.danger, border: `1px solid ${cardBg}` }} />}
            </button>
            <Avatar initials="SP" size={30} />
          </div>

          {/* CONTENT */}
          <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
            <DbBanner />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div>
                <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: textColor }}>{NAV.find(n => n.id === active)?.label}</h1>
                <div style={{ fontSize: 12, color: mutedColor, marginTop: 2 }}>
                  {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>
              {active === "clientes" && <button onClick={() => setModalClient(true)} className="btn-primary">+ Novo cliente</button>}
              {active === "apolices" && <button onClick={() => setModalApolice(true)} className="btn-primary">+ Nova apólice</button>}
              {active === "agenda" && <button onClick={() => setModalAgenda(true)} className="btn-primary">+ Novo agendamento</button>}
              {active === "tarefas" && <button onClick={() => setModalTarefa(true)} className="btn-primary">+ Nova tarefa</button>}
            </div>
            {views[active] ? views[active]() : (
              <div style={{ textAlign: "center", padding: 60, color: mutedColor }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🚧</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: textColor }}>Em desenvolvimento</div>
              </div>
            )}
          </div>
        </div>

        {/* SEARCH MODAL */}
        {searchOpen && (
          <div onClick={() => { setSearchOpen(false); setSearch(""); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 80, animation: "fadeIn 0.15s ease" }}>
            <div onClick={e => e.stopPropagation()} style={{ width: 560, background: cardBg, borderRadius: 14, border: `1px solid ${borderColor}`, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.2)", animation: "slideUp 0.2s ease" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: `1px solid ${borderColor}` }}>
                <span style={{ color: mutedColor }}>🔍</span>
                <input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar clientes, apólices..." style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 14, color: textColor, fontFamily: "inherit" }} />
                <span style={{ fontSize: 11, color: mutedColor, cursor: "pointer" }} onClick={() => { setSearchOpen(false); setSearch(""); }}>ESC</span>
              </div>
              <div style={{ padding: 8 }}>
                {searchResults.length === 0 && <div style={{ padding: "16px 12px", textAlign: "center", color: mutedColor, fontSize: 13 }}>Nenhum resultado.</div>}
                {searchResults.map(c => (
                  <div key={c.id} onClick={() => { setActive("clientes"); setSelectedClient(c); setSearchOpen(false); setSearch(""); }}
                    className="row-hover" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, cursor: "pointer", border: "1px solid transparent" }}>
                    <Avatar initials={(c.nome || "?").slice(0, 2).toUpperCase()} size={32} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: textColor }}>{c.nome}</div>
                      <div style={{ fontSize: 11, color: mutedColor }}>{c.telefone} {c.email ? `· ${c.email}` : ""}</div>
                    </div>
                    <div style={{ marginLeft: "auto" }}><StatusBadge status={c.status} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NOTIF PANEL */}
        {notifOpen && (
          <div onClick={() => setNotifOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }}>
            <div onClick={e => e.stopPropagation()} style={{ position: "absolute", top: 58, right: 16, width: 320, background: cardBg, borderRadius: 12, border: `1px solid ${borderColor}`, boxShadow: "0 10px 40px rgba(0,0,0,0.15)", overflow: "hidden", animation: "slideUp 0.2s ease" }}>
              <div style={{ padding: "14px 16px", borderBottom: `1px solid ${borderColor}`, fontWeight: 700, fontSize: 13, color: textColor }}>Notificações</div>
              {apolices.filter(a => a.status === "Vencendo").length === 0 && (
                <div style={{ padding: "20px 16px", textAlign: "center", color: mutedColor, fontSize: 13 }}>✅ Nenhuma notificação pendente</div>
              )}
              {apolices.filter(a => a.status === "Vencendo").slice(0, 5).map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "12px 16px", borderBottom: `1px solid ${borderColor}` }}>
                  <span style={{ fontSize: 16 }}>⚠️</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: textColor }}>Apólice <strong>{p.numero}</strong> vencendo</div>
                    <div style={{ fontSize: 11, color: mutedColor, marginTop: 2 }}>{p.cliente_nome} · {p.categoria}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── MODAIS ─────────────────────────────────────────────────── */}

        {/* NOVO CLIENTE */}
        <Modal open={modalClient} onClose={() => setModalClient(false)} title="Novo cliente" cardBg={cardBg} borderColor={borderColor} textColor={textColor}>
          <Field label="Nome completo">
            <input data-field value={fClient.nome} onChange={e => setFClient(p => ({ ...p, nome: e.target.value }))} placeholder="Ana Paula Ferreira" style={{ ...inputCss }} />
          </Field>
          <Field label="Telefone">
            <input data-field value={fClient.telefone} onChange={e => setFClient(p => ({ ...p, telefone: e.target.value }))} placeholder="(11) 99999-9999" style={{ ...inputCss }} />
          </Field>
          <Field label="E-mail">
            <input data-field type="email" value={fClient.email} onChange={e => setFClient(p => ({ ...p, email: e.target.value }))} placeholder="ana@email.com" style={{ ...inputCss }} />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Segmento">
              <select data-field value={fClient.segmento} onChange={e => setFClient(p => ({ ...p, segmento: e.target.value }))} style={{ ...inputCss }}>
                {["Standard", "Premium", "VIP"].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select data-field value={fClient.status} onChange={e => setFClient(p => ({ ...p, status: e.target.value }))} style={{ ...inputCss }}>
                {["Ativo", "Pendente", "Inativo"].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
            <button onClick={() => setModalClient(false)} className="btn-ghost" style={{ color: mutedColor }}>Cancelar</button>
            <button onClick={saveClient} disabled={saving} className="btn-primary">{saving ? <Spinner /> : "Salvar cliente"}</button>
          </div>
        </Modal>

        {/* NOVA APÓLICE */}
        <Modal open={modalApolice} onClose={() => setModalApolice(false)} title="Nova apólice" cardBg={cardBg} borderColor={borderColor} textColor={textColor}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Número da apólice">
              <input data-field value={fApolice.numero} onChange={e => setFApolice(p => ({ ...p, numero: e.target.value }))} placeholder="APL-2024-001" style={{ ...inputCss }} />
            </Field>
            <Field label="Status">
              <select data-field value={fApolice.status} onChange={e => setFApolice(p => ({ ...p, status: e.target.value }))} style={{ ...inputCss }}>
                {["Ativa", "Vencendo", "Pendente", "Cancelada"].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Cliente">
            <input data-field value={fApolice.cliente_nome} onChange={e => setFApolice(p => ({ ...p, cliente_nome: e.target.value }))} placeholder="Nome do cliente" list="clientes-list" style={{ ...inputCss }} />
            <datalist id="clientes-list">{clientes.map(c => <option key={c.id} value={c.nome} />)}</datalist>
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Seguradora">
              <input data-field value={fApolice.seguradora} onChange={e => setFApolice(p => ({ ...p, seguradora: e.target.value }))} placeholder="Porto Seguro" style={{ ...inputCss }} />
            </Field>
            <Field label="Categoria">
              <select data-field value={fApolice.categoria} onChange={e => setFApolice(p => ({ ...p, categoria: e.target.value }))} style={{ ...inputCss }}>
                {["Automóvel", "Residencial", "Vida", "Saúde", "Empresarial", "Outros"].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Valor (ex: R$ 1.800/ano)">
              <input data-field value={fApolice.valor} onChange={e => setFApolice(p => ({ ...p, valor: e.target.value }))} placeholder="R$ 1.800/ano" style={{ ...inputCss }} />
            </Field>
            <Field label="Vencimento">
              <input data-field type="date" value={fApolice.vencimento} onChange={e => setFApolice(p => ({ ...p, vencimento: e.target.value }))} style={{ ...inputCss }} />
            </Field>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
            <button onClick={() => setModalApolice(false)} className="btn-ghost" style={{ color: mutedColor }}>Cancelar</button>
            <button onClick={saveApolice} disabled={saving} className="btn-primary">{saving ? <Spinner /> : "Salvar apólice"}</button>
          </div>
        </Modal>

        {/* NOVO AGENDAMENTO */}
        <Modal open={modalAgenda} onClose={() => setModalAgenda(false)} title="Novo agendamento" cardBg={cardBg} borderColor={borderColor} textColor={textColor}>
          <Field label="Cliente">
            <input data-field value={fAgenda.cliente_nome} onChange={e => setFAgenda(p => ({ ...p, cliente_nome: e.target.value }))} placeholder="Nome do cliente" list="clientes-list2" style={{ ...inputCss }} />
            <datalist id="clientes-list2">{clientes.map(c => <option key={c.id} value={c.nome} />)}</datalist>
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Data">
              <input data-field type="date" value={fAgenda.data} onChange={e => setFAgenda(p => ({ ...p, data: e.target.value }))} style={{ ...inputCss }} />
            </Field>
            <Field label="Horário">
              <input data-field type="time" value={fAgenda.horario} onChange={e => setFAgenda(p => ({ ...p, horario: e.target.value }))} style={{ ...inputCss }} />
            </Field>
          </div>
          <Field label="Tipo de atendimento">
            <select data-field value={fAgenda.tipo} onChange={e => setFAgenda(p => ({ ...p, tipo: e.target.value }))} style={{ ...inputCss }}>
              <option value="">Selecione...</option>
              {["Renovação", "Nova proposta", "Revisão de apólice", "Assinatura de contrato", "Consulta", "Ligação", "Reunião"].map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Observações (opcional)">
            <textarea data-field value={fAgenda.observacoes} onChange={e => setFAgenda(p => ({ ...p, observacoes: e.target.value }))} placeholder="Informações adicionais..." rows={2} style={{ ...inputCss, resize: "vertical" }} />
          </Field>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
            <button onClick={() => setModalAgenda(false)} className="btn-ghost" style={{ color: mutedColor }}>Cancelar</button>
            <button onClick={saveAgenda} disabled={saving} className="btn-primary">{saving ? <Spinner /> : "Salvar agendamento"}</button>
          </div>
        </Modal>

        {/* NOVA TAREFA */}
        <Modal open={modalTarefa} onClose={() => setModalTarefa(false)} title="Nova tarefa" cardBg={cardBg} borderColor={borderColor} textColor={textColor}>
          <Field label="Título da tarefa">
            <input data-field value={fTarefa.titulo} onChange={e => setFTarefa(p => ({ ...p, titulo: e.target.value }))} placeholder="Ex: Renovar apólice Ana Paula" style={{ ...inputCss }} />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Prioridade">
              <select data-field value={fTarefa.prioridade} onChange={e => setFTarefa(p => ({ ...p, prioridade: e.target.value }))} style={{ ...inputCss }}>
                {["Alta", "Média", "Baixa"].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Prazo">
              <input data-field type="date" value={fTarefa.prazo} onChange={e => setFTarefa(p => ({ ...p, prazo: e.target.value }))} style={{ ...inputCss }} />
            </Field>
          </div>
          <Field label="Tag (opcional)">
            <select data-field value={fTarefa.tag} onChange={e => setFTarefa(p => ({ ...p, tag: e.target.value }))} style={{ ...inputCss }}>
              <option value="">Sem tag</option>
              {["Renovação", "Proposta", "Contato", "Documentos", "Reunião", "Cobrança"].map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
            <button onClick={() => setModalTarefa(false)} className="btn-ghost" style={{ color: mutedColor }}>Cancelar</button>
            <button onClick={saveTarefa} disabled={saving} className="btn-primary">{saving ? <Spinner /> : "Salvar tarefa"}</button>
          </div>
        </Modal>

      </div>
    </>
  );
}
