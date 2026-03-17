import { useState, useEffect, useRef } from "react";

function useInView(th = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setV(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          obs.unobserve(el);
        }
      },
      { threshold: th }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [th]);

  return [ref, v];
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;700;800&display=swap');
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes spinR{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
@keyframes orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes shimmer{0%{left:-100%}100%{left:200%}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes flow{0%{stroke-dashoffset:20}100%{stroke-dashoffset:0}}
@keyframes moveR{0%{transform:translateX(0);opacity:1}100%{transform:translateX(70px);opacity:0}}
@keyframes riseUp{0%{transform:translateY(0);opacity:.9}100%{transform:translateY(-45px);opacity:0}}
@keyframes wave{0%,100%{transform:translateX(0)}50%{transform:translateX(8px)}}
@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}
@keyframes popIn{from{transform:scale(0) rotate(-15deg)}to{transform:scale(1) rotate(0)}}
@keyframes drawLine{from{stroke-dashoffset:300}to{stroke-dashoffset:0}}
@keyframes rollBearing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes flyPlane{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-6px) rotate(2deg)}}
@keyframes cncMove{0%,100%{transform:translateX(0)}50%{transform:translateX(70px)}}
@keyframes flowDot{0%{transform:translateX(-20px);opacity:0}50%{opacity:1}100%{transform:translateX(240px);opacity:0}}
@keyframes hotPulse{0%,100%{r:12;opacity:.5}50%{r:16;opacity:.8}}
body{margin:0;background:#060B18}
`;

function Avatar({ msg, visible }) {
  return (
    <div style={{ display: "flex", gap: 14, margin: "20px 0", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease" }}>
      <svg viewBox="0 0 60 80" width="44" height="60" style={{ flexShrink: 0 }}>
        <g style={{ animation: "bob 2s ease-in-out infinite" }}>
          <ellipse cx="30" cy="14" rx="17" ry="9" fill="#FFB830" />
          <rect x="13" y="12" width="34" height="5" rx="2" fill="#FF9500" />
          <circle cx="30" cy="25" r="10" fill="#D4A574" />
          <circle cx="26" cy="23" r="1.8" fill="#1a1a2e" />
          <circle cx="34" cy="23" r="1.8" fill="#1a1a2e" />
          <path d="M 26 28 Q 30 32 34 28" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="21" y="35" width="18" height="22" rx="4" fill="#00D4FF" />
          <line x1="21" y1="40" x2="10" y2="50" stroke="#D4A574" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="39" y1="40" x2="50" y2="36" stroke="#D4A574" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="52" cy="34" r="2.5" fill="#D4A574" />
          <line x1="26" y1="57" x2="24" y2="72" stroke="#2D3436" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="34" y1="57" x2="36" y2="72" stroke="#2D3436" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      </svg>
      <div style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)", borderRadius: "4px 16px 16px 16px", padding: "10px 16px", maxWidth: 320, fontFamily: "Nunito,sans-serif", fontSize: 13, color: "#E0F7FF", lineHeight: 1.6 }}>{msg}</div>
    </div>
  );
}

function PlanetaryGear({ active, size = 280 }) {
  if (!active) return null;
  return (
    <svg viewBox="0 0 300 300" style={{ width: "100%", maxWidth: size }}>
      <g style={{ animation: "spinR 12s linear infinite", transformOrigin: "150px 150px" }}>
        <circle cx="150" cy="150" r="128" fill="none" stroke="#FF6B6B" strokeWidth="2" opacity=".5" />
        {[...Array(20)].map((_, i) => <line key={i} x1={150 + 118 * Math.cos(i * Math.PI / 10)} y1={150 + 118 * Math.sin(i * Math.PI / 10)} x2={150 + 133 * Math.cos(i * Math.PI / 10)} y2={150 + 133 * Math.sin(i * Math.PI / 10)} stroke="#FF6B6B" strokeWidth="3" opacity=".4" strokeLinecap="round" />)}
      </g>
      <g style={{ animation: "spin 3s linear infinite", transformOrigin: "150px 150px" }}>
        {[...Array(8)].map((_, i) => <rect key={i} x="143" y="122" width="14" height="56" rx="3" fill="none" stroke="#FFB830" strokeWidth="2" opacity=".7" transform={`rotate(${i * 45} 150 150)`} />)}
        <circle cx="150" cy="150" r="20" fill="none" stroke="#FFB830" strokeWidth="2.5" />
        <circle cx="150" cy="150" r="7" fill="#FFB830" opacity=".4" />
      </g>
      <g style={{ animation: "orbit 6s linear infinite", transformOrigin: "150px 150px" }}>
        {[0, 120, 240].map((a, idx) => {
          const r = 65, cx = 150 + r * Math.cos(a * Math.PI / 180), cy = 150 + r * Math.sin(a * Math.PI / 180);
          const c = ["#00D4FF", "#00FF88", "#FF61D8"][idx];
          return <g key={idx} style={{ animation: "spinR 2s linear infinite", transformOrigin: `${cx}px ${cy}px` }}>
            {[...Array(6)].map((_, i) => <rect key={i} x={cx - 5} y={cy - 18} width="10" height="36" rx="2" fill="none" stroke={c} strokeWidth="1.5" opacity=".6" transform={`rotate(${i * 60} ${cx} ${cy})`} />)}
            <circle cx={cx} cy={cy} r="12" fill="none" stroke={c} strokeWidth="2" />
            <circle cx={cx} cy={cy} r="4" fill={c} opacity=".3" />
          </g>;
        })}
      </g>
    </svg>
  );
}

function HeatTransfer({ active }) {
  if (!active) return null;
  return (
    <svg viewBox="0 0 360 170" style={{ width: "100%", maxWidth: 380 }}>
      <rect x="10" y="40" width="100" height="40" rx="5" fill="rgba(255,184,48,0.15)" stroke="#FFB830" strokeWidth="1.5" />
      {[0, 1, 2, 3].map(i => <circle key={i} cx={22 + i * 8} cy="60" r="4" fill="#FF6B6B" style={{ animation: `moveR 1.8s linear infinite`, animationDelay: `${i * 0.3}s` }} />)}
      <text x="60" y="30" textAnchor="middle" fill="#FFB830" fontSize="11" fontFamily="Nunito" fontWeight="700">Conduction</text>
      <rect x="130" y="58" width="80" height="10" rx="4" fill="rgba(255,107,107,0.2)" stroke="#FF6B6B" strokeWidth="1" />
      {[0, 1, 2, 3, 4].map(i => <circle key={i} cx={138 + i * 14} cy="55" r="3" fill="#FFB830" style={{ animation: `riseUp 1.5s ease-out infinite`, animationDelay: `${i * 0.25}s` }} />)}
      <text x="170" y="45" textAnchor="middle" fill="#FF6B6B" fontSize="11" fontFamily="Nunito" fontWeight="700">Convection</text>
      <circle cx="300" cy="60" r="12" fill="#FF4500" opacity=".4" style={{ animation: "hotPulse 1.5s ease-in-out infinite" }} />
      <circle cx="300" cy="60" r="7" fill="#FFB830" opacity=".5" />
      {[0, 1, 2, 3].map(i => <path key={i} d={`M 316 ${45 + i * 10} Q 336 ${40 + i * 10} 356 ${45 + i * 10}`} fill="none" stroke="#FF6B6B" strokeWidth="2" style={{ animation: `wave 1.2s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }} opacity=".6" />)}
      <text x="300" y="28" textAnchor="middle" fill="#FF6B6B" fontSize="11" fontFamily="Nunito" fontWeight="700">Radiation</text>
      <text x="180" y="140" textAnchor="middle" fill="rgba(255,184,48,0.35)" fontSize="10" fontFamily="monospace">q = -k∇T·A | q = hA(Ts-T∞) | q = εσAT⁴</text>
    </svg>
  );
}

function StressStrain({ active }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!active) return;
    let v = 0;
    const id = setInterval(() => {
      v += .015;
      if (v >= 1) {
        setP(1);
        clearInterval(id);
      } else setP(v);
    }, 25);
    return () => clearInterval(id);
  }, [active]);
  if (!active) return null;
  const pts = [[20, 145], [40, 125], [55, 105], [70, 82], [85, 60], [100, 42], [112, 33], [130, 30], [155, 28], [180, 32], [205, 42], [228, 56], [248, 74], [260, 92], [268, 108]];
  const n = Math.floor(p * pts.length);
  const d = pts.slice(0, n).map((pt, i) => (i === 0 ? `M${pt[0]} ${pt[1]}` : `L${pt[0]} ${pt[1]}`)).join(" ");
  return (
    <svg viewBox="0 0 300 180" style={{ width: "100%", maxWidth: 320 }}>
      <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#00FF88" /><stop offset="50%" stopColor="#FFB830" /><stop offset="100%" stopColor="#FF6B6B" /></linearGradient></defs>
      <line x1="20" y1="145" x2="285" y2="145" stroke="#444" strokeWidth="1" /><line x1="20" y1="145" x2="20" y2="10" stroke="#444" strokeWidth="1" />
      <text x="150" y="170" textAnchor="middle" fill="#888" fontSize="10" fontFamily="monospace">Strain (ε)</text>
      {n >= 6 && <rect x="20" y="25" width="92" height="120" fill="rgba(0,255,136,0.04)" />}
      {n >= 10 && <rect x="112" y="22" width="160" height="123" fill="rgba(255,107,107,0.04)" />}
      {d && <path d={d} fill="none" stroke="url(#sg)" strokeWidth="3" strokeLinecap="round" />}
      {n >= 6 && <><circle cx="100" cy="42" r="5" fill="#00FF88" /><text x="78" y="26" fill="#00FF88" fontSize="9" fontFamily="monospace" fontWeight="700">Yield</text></>}
      {n >= 9 && <text x="148" y="20" fill="#FFB830" fontSize="9" fontFamily="monospace" fontWeight="700">UTS</text>}
      {n >= 13 && <text x="238" y="50" fill="#FF6B6B" fontSize="9" fontFamily="monospace">Necking →</text>}
      {n >= 15 && <text x="260" y="122" fill="#FF6B6B" fontSize="10" fontFamily="monospace" fontWeight="700">Fracture ✕</text>}
    </svg>
  );
}

function PVDiagram({ active }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!active) return;
    let v = 0;
    const id = setInterval(() => {
      v += .012;
      if (v >= 1) {
        setP(1);
        clearInterval(id);
      } else setP(v);
    }, 25);
    return () => clearInterval(id);
  }, [active]);
  if (!active) return null;
  return (
    <svg viewBox="0 0 280 200" style={{ width: "100%", maxWidth: 300 }}>
      <line x1="30" y1="170" x2="260" y2="170" stroke="#444" strokeWidth="1" /><line x1="30" y1="170" x2="30" y2="15" stroke="#444" strokeWidth="1" />
      <text x="145" y="195" textAnchor="middle" fill="#888" fontSize="10" fontFamily="monospace">Volume</text>
      {p > 0 && <path d="M 60 38 Q 105 33 155 62 Q 205 82 225 125 Q 180 135 130 110 Q 78 88 60 38" fill="rgba(0,212,255,0.08)" stroke="#00D4FF" strokeWidth="2.5" strokeDasharray={`${p * 550}`} />}
      {p > .25 && <circle cx="60" cy="38" r="6" fill="#FF6B6B" />}
      {p > .4 && <circle cx="155" cy="62" r="6" fill="#00D4FF" />}
      {p > .55 && <circle cx="225" cy="125" r="6" fill="#FFB830" />}
      {p > .7 && <circle cx="130" cy="110" r="6" fill="#00FF88" />}
      {p >= 1 && <text x="140" y="85" textAnchor="middle" fill="rgba(0,212,255,0.5)" fontSize="13" fontFamily="monospace" fontWeight="700">W_net</text>}
    </svg>
  );
}

function EVCharging({ active }) {
  if (!active) return null;
  return (
    <svg viewBox="0 0 380 200" style={{ width: "100%", maxWidth: 400 }}>
      <rect x="70" y="45" width="65" height="65" rx="8" fill="rgba(0,212,255,0.06)" stroke="#00D4FF" strokeWidth="2" />
      <text x="102" y="73" textAnchor="middle" fill="#00D4FF" fontSize="11" fontFamily="Nunito" fontWeight="700">Smart</text>
      <text x="102" y="88" textAnchor="middle" fill="#00D4FF" fontSize="11" fontFamily="Nunito" fontWeight="700">Grid</text>
      <rect x="185" y="38" width="55" height="78" rx="8" fill="rgba(255,184,48,0.06)" stroke="#FFB830" strokeWidth="2" />
      <text x="212" y="70" textAnchor="middle" fill="#FFB830" fontSize="10" fontFamily="Nunito" fontWeight="700">EVSE</text>
      <rect x="198" y="88" width="30" height="10" rx="3" fill="none" stroke="#00FF88" strokeWidth="1" />
      <rect x="199" y="89" width="0" height="8" rx="2" fill="#00FF88" opacity=".6"><animate attributeName="width" from="0" to="28" dur="2s" repeatCount="indefinite" /></rect>
      <rect x="290" y="42" width="72" height="50" rx="12" fill="rgba(0,255,136,0.06)" stroke="#00FF88" strokeWidth="2" />
      <text x="326" y="65" textAnchor="middle" fill="#00FF88" fontSize="11" fontFamily="Nunito" fontWeight="700">EV</text>
      <text x="326" y="78" textAnchor="middle" fill="#00FF88" fontSize="8" fontFamily="monospace">Li-Ion</text>
      <circle cx="302" cy="92" r="8" fill="none" stroke="#00FF88" strokeWidth="1.5" /><circle cx="350" cy="92" r="8" fill="none" stroke="#00FF88" strokeWidth="1.5" />
      <line x1="135" y1="77" x2="185" y2="77" stroke="#00D4FF" strokeWidth="2" strokeDasharray="6 4" style={{ animation: "flow .8s linear infinite" }} />
      <line x1="240" y1="77" x2="290" y2="65" stroke="#FFB830" strokeWidth="2" strokeDasharray="6 4" style={{ animation: "flow .8s linear infinite" }} />
      <text x="160" y="68" textAnchor="middle" fill="#888" fontSize="8" fontFamily="monospace">G2V</text>
      <text x="160" y="92" textAnchor="middle" fill="#888" fontSize="8" fontFamily="monospace">V2G</text>
      <polygon points="20,50 48,50 54,28 14,28" fill="none" stroke="#FFB830" strokeWidth="1.2" />
      <text x="34" y="22" textAnchor="middle" fill="#FFB830" fontSize="7" fontFamily="monospace">PV</text>
      <line x1="48" y1="50" x2="70" y2="60" stroke="#FFB830" strokeWidth="1.5" strokeDasharray="4 3" style={{ animation: "flow 1s linear infinite" }} />
      <rect x="180" y="145" width="48" height="24" rx="5" fill="none" stroke="#FF61D8" strokeWidth="1.5" style={{ animation: "pulse 1.5s ease-in-out infinite" }} />
      <text x="204" y="161" textAnchor="middle" fill="#FF61D8" fontSize="8" fontFamily="monospace" fontWeight="700">ESS</text>
    </svg>
  );
}

function BatteryAnim({ active }) {
  if (!active) return null;
  return (
    <svg viewBox="0 0 260 120" style={{ width: "100%", maxWidth: 280 }}>
      <rect x="40" y="25" width="150" height="55" rx="8" fill="none" stroke="#00FF88" strokeWidth="2" />
      <rect x="190" y="40" width="10" height="22" rx="3" fill="none" stroke="#00FF88" strokeWidth="2" />
      <rect x="45" y="30" width="0" height="45" rx="4" fill="rgba(0,255,136,0.2)"><animate attributeName="width" from="0" to="138" dur="3s" repeatCount="indefinite" /></rect>
      {[0, 1, 2, 3].map(i => <line key={i} x1={76 + i * 33} y1="30" x2={76 + i * 33} y2="75" stroke="#00FF88" strokeWidth=".5" opacity=".3" />)}
      <text x="115" y="58" textAnchor="middle" fill="#00FF88" fontSize="20" style={{ animation: "pulse 1.2s ease-in-out infinite" }}>⚡</text>
      <text x="115" y="105" textAnchor="middle" fill="#00FF88" fontSize="8" fontFamily="monospace" opacity=".6">Li-Ion Battery Pack</text>
    </svg>
  );
}

function BearingAnim({ active }) {
  if (!active) return null;
  return (
    <svg viewBox="0 0 180 140" style={{ width: "100%", maxWidth: 200 }}>
      <circle cx="90" cy="70" r="52" fill="none" stroke="#00FF88" strokeWidth="1.5" opacity=".4" />
      <circle cx="90" cy="70" r="22" fill="none" stroke="#00FF88" strokeWidth="2" />
      <g style={{ animation: "rollBearing 2s linear infinite", transformOrigin: "90px 70px" }}>
        {[0, 60, 120, 180, 240, 300].map((a, i) => {
          const cx = 90 + 37 * Math.cos(a * Math.PI / 180), cy = 70 + 37 * Math.sin(a * Math.PI / 180);
          return <circle key={i} cx={cx} cy={cy} r="6.5" fill="rgba(0,255,136,0.2)" stroke="#00FF88" strokeWidth="1.5" />;
        })}
      </g>
      <circle cx="90" cy="70" r="7" fill="#00FF88" opacity=".2" />
      <text x="90" y="132" textAnchor="middle" fill="#00FF88" fontSize="8" fontFamily="monospace" opacity=".6">Ball Bearing</text>
    </svg>
  );
}

function SkillCard({ title, icon, desc, anim, color, visible, delay = 0 }) {
  const [open, setOpen] = useState(false);
  const rgb = color === "#00D4FF" ? "0,212,255" : color === "#FFB830" ? "255,184,48" : color === "#FF6B6B" ? "255,107,107" : color === "#00FF88" ? "0,255,136" : color === "#FF61D8" ? "255,97,216" : "135,206,235";
  return (
    <div onClick={() => setOpen(!open)} style={{
      background: open ? `rgba(${rgb},0.08)` : "rgba(255,255,255,0.02)",
      border: `1px solid ${open ? color : "rgba(255,255,255,0.06)"}`,
      borderRadius: 16, padding: 22, cursor: "pointer",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.6s ease ${delay}s, background 0.3s, border 0.3s`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%", background: `linear-gradient(90deg,transparent,rgba(${rgb},0.05),transparent)`, animation: visible ? "shimmer 3s ease-in-out infinite" : "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: open ? 14 : 6 }}>
        <span style={{ fontSize: 26 }}>{icon}</span>
        <div>
          <h4 style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 15, color: open ? color : "#E8E8E8", margin: 0, transition: "color 0.3s" }}>{title}</h4>
          {!open && <span style={{ fontFamily: "monospace", fontSize: 10, color, opacity: .7 }}>Click to explore →</span>}
        </div>
      </div>
      {open && <div style={{ animation: "fadeUp 0.4s ease-out" }}>
        <p style={{ fontFamily: "Nunito", fontSize: 13, color: "#BBB", lineHeight: 1.7, margin: "0 0 14px 0" }}>{desc}</p>
        <div style={{ display: "flex", justifyContent: "center" }}>{anim}</div>
      </div>}
    </div>
  );
}

function SkillsTimeline({ active }) {
  const [step, setStep] = useState(0);
  const steps = [
    { year: "2017", label: "Mechanical Fundamentals", skills: ["Thermodynamics", "Fluid Mechanics", "Materials"], color: "#00D4FF", icon: "📚" },
    { year: "2018", label: "Design & Manufacturing", skills: ["SolidWorks", "AutoCAD", "CNC Machining"], color: "#FFB830", icon: "⚙️" },
    { year: "2019", label: "Formula Student", skills: ["Vehicle Design", "Fabrication", "Racing"], color: "#FF6B6B", icon: "🏎️" },
    { year: "2020", label: "CAD Mastery", skills: ["CATIA V5", "Creo", "Solid Edge", "GD&T"], color: "#00FF88", icon: "💻" },
    { year: "2022", label: "Industry Engineering", skills: ["Gearbox Design", "ANSYS FEA", "Power BI"], color: "#FF61D8", icon: "🏭" },
    { year: "2024", label: "E-Mobility & Smart Grid", skills: ["MATLAB/Simulink", "OPAL-RT", "Python"], color: "#FFB830", icon: "⚡" },
    { year: "2026", label: "Full-Stack Engineer", skills: ["AI/ML", "Lean Six Sigma", "E-Plan"], color: "#00D4FF", icon: "🚀" },
  ];
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setStep(s => s < steps.length - 1 ? s + 1 : 0), 2500);
    return () => clearInterval(id);
  }, [active]);
  const s = steps[step];
  const rgb = s.color === "#00D4FF" ? "0,212,255" : s.color === "#FFB830" ? "255,184,48" : s.color === "#FF6B6B" ? "255,107,107" : s.color === "#00FF88" ? "0,255,136" : "255,97,216";
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "28px 22px" }}>
      <div style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 13, color: "#888", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20, textAlign: "center" }}>▶ Skills Acquisition Timeline</div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, marginBottom: 24, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${((step + 1) / steps.length) * 100}%`, background: s.color, borderRadius: 2, transition: "all 0.5s" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, minHeight: 90 }}>
        <div key={step} style={{ fontSize: 44, animation: "popIn 0.4s ease-out" }}>{s.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "monospace", fontSize: 26, fontWeight: 900, color: s.color }}>{s.year}</div>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, color: "#F0F0F0", margin: "4px 0 10px" }}>{s.label}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {s.skills.map((sk, i) => <span key={sk + step} style={{ padding: "3px 10px", background: `rgba(${rgb},0.15)`, border: `1px solid ${s.color}40`, borderRadius: 10, fontSize: 11, fontFamily: "monospace", color: s.color, animation: `fadeUp 0.3s ease ${i * 0.1}s both` }}>{sk}</span>)}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 7, marginTop: 20 }}>
        {steps.map((st, i) => <div key={i} onClick={() => setStep(i)} style={{ width: step === i ? 22 : 8, height: 7, borderRadius: 4, background: step === i ? st.color : "rgba(255,255,255,0.1)", cursor: "pointer", transition: "all 0.3s" }} />)}
      </div>
    </div>
  );
}

function CounterStat({ end, suffix = "", inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const stepTime = 25;
    const increment = end / (duration / stepTime);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [end, inView]);
  return <>{count}{suffix}</>;
}

export default function App() {
  const [active, setActive] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    const f = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          const i = refs.current.indexOf(e.target);
          if (i >= 0) setActive(i);
        }
      });
    }, { threshold: .25 });
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const go = i => refs.current[i]?.scrollIntoView({ behavior: "smooth" });

  const [r0, v0] = useInView(); const [r1, v1] = useInView(); const [r1b, v1b] = useInView(); const [r1c, v1c] = useInView(); const [r1d, v1d] = useInView();
  const [r2, v2] = useInView(); const [r2b, v2b] = useInView(); const [r2c, v2c] = useInView(); const [rc, vc] = useInView();
  const [r3, v3] = useInView(); const [r3b, v3b] = useInView(); const [rv, vv] = useInView();
  const [r4, v4] = useInView(); const [r4b, v4b] = useInView(); const [rs, vs] = useInView();

  const nav = ["Origin", "Foundation", "Industry", "The Leap", "Horizon"];
  const S = { minHeight: "100vh", padding: "clamp(80px,12vw,140px) clamp(20px,5vw,80px)", position: "relative" };
  const G = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 22, alignItems: "start" };

  return (
    <div style={{ background: "#060B18", color: "#E8E8E8", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{CSS}</style>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(0,212,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.025) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
      <div style={{ position: "fixed", top: "8%", left: "-8%", width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,255,0.04),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "5%", right: "-12%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,184,48,0.03),transparent 70%)", pointerEvents: "none" }} />

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrollY > 80 ? "rgba(6,11,24,0.94)" : "transparent", backdropFilter: scrollY > 80 ? "blur(20px)" : "none", borderBottom: scrollY > 80 ? "1px solid rgba(0,212,255,0.1)" : "none", transition: "all 0.4s", padding: "0 clamp(20px,4vw,60px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 60, maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 900 }}>N<span style={{ color: "#00D4FF" }}>.</span>R</div>
          <div style={{ display: "flex", gap: "clamp(8px,2vw,24px)" }}>
            {nav.map((n, i) => <button key={i} onClick={() => go(i)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Nunito", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: active === i ? "#00D4FF" : "#666", borderBottom: active === i ? "2px solid #00D4FF" : "2px solid transparent", padding: "6px 0" }}>{n}</button>)}
          </div>
        </div>
      </nav>

      <section ref={el => refs.current[0] = el} style={{ ...S, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div ref={r0} style={{ maxWidth: 820, zIndex: 1 }}>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#00D4FF", letterSpacing: 6, textTransform: "uppercase", marginBottom: 20, opacity: v0 ? 1 : 0, transition: "opacity 1s ease .2s" }}>The Engineering Journey of</div>
          <h1 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(44px,9vw,86px)", fontWeight: 900, lineHeight: 1.04, margin: 0, opacity: v0 ? 1 : 0, transform: v0 ? "translateY(0)" : "translateY(50px)", transition: "all 1.2s cubic-bezier(.16,1,.3,1) .3s" }}>Navaneeth<br /><span style={{ color: "#00D4FF" }}>Ram</span></h1>
          <p style={{ fontFamily: "Nunito", fontSize: "clamp(15px,2.2vw,19px)", color: "#999", marginTop: 24, maxWidth: 540, lineHeight: 1.75, opacity: v0 ? 1 : 0, transition: "all 1s ease .6s" }}>Mechanical & Systems Engineer — from thermodynamic first principles to smart grid optimisation. A story told through gears, equations, and relentless curiosity.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28, opacity: v0 ? 1 : 0, transition: "opacity 1s ease .8s" }}>
            {["Drivetrain Design", "CAD · FEA", "E-Mobility", "Smart Grids", "MATLAB/Simulink"].map(t => <span key={t} style={{ padding: "5px 14px", borderRadius: 18, border: "1px solid rgba(0,212,255,0.25)", background: "rgba(0,212,255,0.06)", fontFamily: "monospace", fontSize: 11, color: "#00D4FF" }}>{t}</span>)}
          </div>
          <div style={{ marginTop: 45, opacity: v0 ? 1 : 0, transition: "opacity 1s ease 1.1s" }}><span style={{ fontFamily: "monospace", fontSize: 11, color: "#555", letterSpacing: 3 }}>SCROLL TO EXPLORE ↓</span></div>
        </div>
        <div style={{ position: "absolute", right: "clamp(-60px,-2vw,20px)", top: "18%", opacity: v0 ? .3 : 0, transition: "opacity 2s ease .5s", pointerEvents: "none" }}><PlanetaryGear active={v0} size={380} /></div>
      </section>

      <section ref={el => refs.current[1] = el} style={S}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={r1} style={{ opacity: v1 ? 1 : 0, transform: v1 ? "translateY(0)" : "translateY(40px)", transition: "all 1s ease" }}>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: "#00D4FF", letterSpacing: 5, textTransform: "uppercase", marginBottom: 14 }}>Chapter I</div>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(30px,5vw,50px)", fontWeight: 900, color: "#F5F5F5", margin: 0 }}>The Foundation</h2>
            <p style={{ fontFamily: "monospace", fontSize: 13, color: "#888", marginTop: 10 }}>B.E. Mechanical Engineering · VIT Vellore · 2017 – 2021</p>
            <div style={{ width: 80, height: 3, marginTop: 20, background: "linear-gradient(90deg,#00D4FF,#FFB830,transparent)" }} />
          </div>
          <Avatar visible={v1} msg="Welcome! Click any skill card below to see the engineering concepts come alive. Each one has a hidden animation inside!" />
          <p style={{ fontFamily: "Nunito", fontSize: 16, color: "#C8C8C8", lineHeight: 1.85, maxWidth: 650, opacity: v1 ? 1 : 0, transition: "all .8s ease .3s" }}>It began with curiosity — why engines convert heat to motion, why bridges bear load, why gears mesh with mathematical precision. At VIT Vellore, that curiosity found its formal language.</p>

          <div ref={r1b} style={{ ...G, marginTop: 44 }}>
            <SkillCard visible={v1b} delay={0} title="Thermodynamics" icon="🔥" color="#FFB830" desc="Carnot cycles, entropy, the quest for efficiency. Understanding why no engine is perfect, and how close we can get." anim={<PVDiagram active={v1b} />} />
            <SkillCard visible={v1b} delay={.15} title="Heat Transfer" icon="🌡️" color="#FF6B6B" desc="Conduction, convection, radiation — Fourier, Newton, Stefan-Boltzmann in action." anim={<HeatTransfer active={v1b} />} />
          </div>
          <div ref={r1c} style={{ ...G, marginTop: 22 }}>
            <SkillCard visible={v1c} delay={0} title="Mechanisms & Machine Design" icon="⚙️" color="#00D4FF" desc="Four-bar linkages, cam profiles, planetary gear trains. The geometry that converts one motion into another." anim={<PlanetaryGear active={v1c} size={260} />} />
            <SkillCard visible={v1c} delay={.15} title="Materials Science" icon="🔬" color="#00FF88" desc="Crystal structures, phase diagrams, heat treatment. Understanding why materials behave the way they do." anim={<StressStrain active={v1c} />} />
          </div>
          <div ref={r1d} style={{ ...G, marginTop: 22 }}>
            <SkillCard visible={v1d} delay={0} title="Fluid Mechanics" icon="🌊" color="#87CEEB" desc="Bernoulli's equation, Navier-Stokes, boundary layers — the foundation of aerodynamics." anim={
              <svg viewBox="0 0 260 100" style={{ width: "100%", maxWidth: 280 }}>
                {[28, 42, 56, 70, 84].map((y, i) => <path key={i} d={`M 0 ${y} Q 70 ${y + (y > 50 && y < 72 ? 12 : -4)} 130 ${y} Q 190 ${y - (y > 50 && y < 72 ? 8 : -3)} 260 ${y}`} fill="none" stroke="#87CEEB" strokeWidth="1" opacity=".3" />)}
                <ellipse cx="130" cy="56" rx="22" ry="16" fill="rgba(135,206,235,0.1)" stroke="#87CEEB" strokeWidth="1.5" />
                {[0, 1, 2, 3, 4].map(i => <circle key={i} cx="0" cy={30 + i * 12} r="2.5" fill="#87CEEB" style={{ animation: `flowDot 2.5s linear infinite`, animationDelay: `${i * .4}s` }} />)}
              </svg>} />
            <SkillCard visible={v1d} delay={.15} title="Manufacturing Technology" icon="🏭" color="#FF61D8" desc="CNC turning, milling, waterjet cutting. Hands-on fabrication at Formula Student's Pravega Racing." anim={
              <svg viewBox="0 0 260 100" style={{ width: "100%", maxWidth: 280 }}>
                <rect x="25" y="60" width="210" height="18" rx="3" fill="rgba(255,97,216,0.1)" stroke="#FF61D8" strokeWidth="1.5" />
                <g style={{ animation: "cncMove 3s ease-in-out infinite" }}><rect x="70" y="25" width="14" height="35" rx="2" fill="rgba(255,97,216,0.3)" stroke="#FF61D8" strokeWidth="1.5" /><circle cx="77" cy="60" r="3" fill="#FF61D8" /></g>
              </svg>} />
          </div>
        </div>
      </section>

      <section ref={el => refs.current[2] = el} style={{ ...S, background: "rgba(255,255,255,.008)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={r2} style={{ opacity: v2 ? 1 : 0, transform: v2 ? "translateY(0)" : "translateY(40px)", transition: "all 1s ease" }}>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: "#00D4FF", letterSpacing: 5, textTransform: "uppercase", marginBottom: 14 }}>Chapter II</div>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(30px,5vw,50px)", fontWeight: 900, color: "#F5F5F5", margin: 0 }}>The Industry</h2>
            <p style={{ fontFamily: "monospace", fontSize: 13, color: "#888", marginTop: 10 }}>Mechanical Design Engineer · Magtorq Pvt. Ltd · 2022 – 2023</p>
            <div style={{ width: 80, height: 3, marginTop: 20, background: "linear-gradient(90deg,#00D4FF,#FFB830,transparent)" }} />
          </div>
          <Avatar visible={v2} msg="Industrial gearbox design for major clients! Click the cards to see stress-strain curves and planetary gear systems." />
          <p style={{ fontFamily: "Nunito", fontSize: 16, color: "#C8C8C8", lineHeight: 1.85, maxWidth: 650, opacity: v2 ? 1 : 0, transition: "all .8s ease .3s" }}>Theory met practice. At Magtorq, every gear had to mesh, every shaft had to hold, every bearing had to last. Designing custom drivetrains for heavy industrial applications.</p>

          <div ref={r2b} style={{ ...G, marginTop: 44 }}>
            <SkillCard visible={v2b} delay={0} title="Stress Analysis & FEA" icon="📊" color="#FF6B6B" desc="ANSYS structural & thermal validation — von Mises stress, deformation analysis. Every design validated before the shop floor." anim={<StressStrain active={v2b} />} />
            <SkillCard visible={v2b} delay={.15} title="Gearbox & Drivetrain" icon="⚙️" color="#FFB830" desc="Complete powertrain sizing — shaft dimensioning, gear calculations, bearing pre-selection. Concept to GD&T drawings." anim={<PlanetaryGear active={v2b} size={240} />} />
          </div>
          <div ref={r2c} style={{ ...G, marginTop: 22 }}>
            <SkillCard visible={v2c} delay={0} title="CAD & Technical Drawing" icon="📐" color="#00D4FF" desc="SolidWorks, Creo, Inventor for 3D. AutoCAD for 2D manufacturing drawings with tight tolerances and GD&T." anim={
              <svg viewBox="0 0 260 120" style={{ width: "100%", maxWidth: 280 }}>
                <rect x="35" y="15" width="190" height="90" rx="3" fill="none" stroke="#00D4FF" strokeWidth="1" opacity=".3" />
                <path d="M 55 80 L 55 35 L 110 35 L 110 48 L 82 48 L 82 80 Z" fill="none" stroke="#00D4FF" strokeWidth="2" strokeDasharray="300" style={{ animation: "drawLine 2.5s ease-out forwards" }} />
                <path d="M 150 42 L 205 42 L 205 88 L 170 88 L 170 70 L 150 70 Z" fill="none" stroke="#FFB830" strokeWidth="2" strokeDasharray="300" style={{ animation: "drawLine 2.5s ease-out .5s forwards" }} />
                <text x="68" y="97" textAnchor="middle" fill="#FF6B6B" fontSize="7" fontFamily="monospace">30±0.05</text>
              </svg>} />
            <SkillCard visible={v2c} delay={.15} title="Bearing & Materials" icon="🔩" color="#00FF88" desc="SKF catalogue calculations, contact stress, L10 life estimation. DIN material selection for wear resistance." anim={<BearingAnim active={v2c} />} />
          </div>

          <div ref={rc} style={{ marginTop: 65 }}>
            <Avatar visible={vc} msg="Major clients I designed drivetrain systems for. Each demanded engineering excellence." />
            <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, color: "#F5F5F5", margin: "28px 0 22px", opacity: vc ? 1 : 0, transition: "opacity .8s" }}>Key Clients</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 18 }}>
              {[{ name: "Tata Motors", sec: "Automotive · Commercial", desc: "Custom drivetrain solutions for India's largest auto manufacturer.", color: "#00D4FF" }, { name: "L&T (Larsen & Toubro)", sec: "Heavy Engineering", desc: "Precision gearbox systems for heavy machinery.", color: "#FFB830" }, { name: "DRDO", sec: "Defence · R&D", desc: "Specialised drivetrain components for defence research.", color: "#FF6B6B" }].map((c, i) =>
                <div key={i} style={{ background: "rgba(255,255,255,.02)", border: `1px solid ${c.color}30`, borderRadius: 14, padding: "22px 18px", textAlign: "center", opacity: vc ? 1 : 0, transform: vc ? "translateY(0)" : "translateY(25px)", transition: `all .7s ease ${.1 + i * .15}s`, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${c.color},transparent)` }} />
                  <div style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, color: c.color, marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#888", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>{c.sec}</div>
                  <p style={{ fontFamily: "Nunito", fontSize: 12, color: "#999", lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                </div>
              )}
            </div>
          </div>
          <div style={{ marginTop: 70, padding: "45px 0", borderTop: "1px solid rgba(0,212,255,.08)", textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(20px,3.5vw,34px)", fontWeight: 700, color: "#FFB830", fontStyle: "italic", maxWidth: 500, margin: "0 auto", lineHeight: 1.4, opacity: vc ? 1 : 0, transition: "opacity 1s ease .5s" }}>&quot;Go to Germany. The future of mobility is being written there.&quot;</p>
            <p style={{ fontFamily: "monospace", fontSize: 12, color: "#666", marginTop: 14 }}>— A mentor who changed everything</p>
          </div>
        </div>
      </section>

      <section ref={el => refs.current[3] = el} style={S}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={r3} style={{ opacity: v3 ? 1 : 0, transform: v3 ? "translateY(0)" : "translateY(40px)", transition: "all 1s ease" }}>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: "#00D4FF", letterSpacing: 5, textTransform: "uppercase", marginBottom: 14 }}>Chapter III</div>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(30px,5vw,50px)", fontWeight: 900, color: "#F5F5F5", margin: 0 }}>The Leap</h2>
            <p style={{ fontFamily: "monospace", fontSize: 13, color: "#888", marginTop: 10 }}>M.Sc. Sustainable Technology Management · SRH Berlin · 2024 – 2026</p>
            <div style={{ width: 80, height: 3, marginTop: 20, background: "linear-gradient(90deg,#00D4FF,#FFB830,transparent)" }} />
          </div>
          <Avatar visible={v3} msg="Germany! Click the cards to explore smart grids, EV charging, and battery technology." />
          <p style={{ fontFamily: "Nunito", fontSize: 16, color: "#C8C8C8", lineHeight: 1.85, maxWidth: 650, opacity: v3 ? 1 : 0, transition: "all .8s ease .3s" }}>Berlin. A new continent, a new language, and an entirely new dimension. Mechanical design met electrification, energy systems, and sustainability.</p>

          <div ref={r3b} style={{ ...G, marginTop: 44 }}>
            <SkillCard visible={v3b} delay={0} title="Smart Grid & EV Charging" icon="⚡" color="#00D4FF" desc="Thesis: optimising EV charging in urban smart grids using MATLAB/Simulink with OPAL-RT/RT-LAB. V2G, V2V, G2V strategies." anim={<EVCharging active={v3b} />} />
            <SkillCard visible={v3b} delay={.15} title="Battery & E-Motors" icon="🔋" color="#00FF88" desc="Li-Ion packs, thermal management, BMS. Inverter design, PMSM/BLDC motors, regenerative braking." anim={<BatteryAnim active={v3b} />} />
          </div>
          <div style={{ ...G, marginTop: 22 }}>
            <SkillCard visible={v3b} delay={.3} title="Future Mobility" icon="🚀" color="#FFB830" desc="Electric aviation (eVTOL), electric shipping, hydrogen fuel cells, autonomous driving fundamentals." anim={
              <svg viewBox="0 0 260 100" style={{ width: "100%", maxWidth: 280 }}>
                <g style={{ animation: "flyPlane 3s ease-in-out infinite", transformOrigin: "130px 45px" }}>
                  <path d="M 70 45 L 118 32 L 190 40 L 198 45 L 190 50 L 118 58 Z" fill="rgba(255,184,48,.12)" stroke="#FFB830" strokeWidth="1.5" />
                  <circle cx="90" cy="45" r="3.5" fill="#FFB830" opacity=".4" />
                </g>
                <text x="130" y="88" textAnchor="middle" fill="#FFB830" fontSize="8" fontFamily="monospace" opacity=".6">Electric Aviation</text>
              </svg>} />
            <SkillCard visible={v3b} delay={.45} title="Python & Data" icon="🐍" color="#FF61D8" desc="NumPy, Pandas, Matplotlib for engineering data. ML clustering for grid optimisation." anim={
              <svg viewBox="0 0 260 90" style={{ width: "100%", maxWidth: 280 }}>
                {[38, 18, 52, 32, 60, 42, 65, 28, 48, 55].map((h, i) => <rect key={i} x={18 + i * 24} y={75 - h} width="16" height={h} rx="3" fill={`rgba(255,97,216,${.3 + (h / 65) * .5})`} stroke="#FF61D8" strokeWidth="1"><animate attributeName="height" from="0" to={h} dur={`${.4 + i * .08}s`} fill="freeze" /><animate attributeName="y" from="75" to={75 - h} dur={`${.4 + i * .08}s`} fill="freeze" /></rect>)}
                <line x1="14" y1="75" x2="260" y2="75" stroke="#444" strokeWidth=".5" />
              </svg>} />
          </div>
        </div>
      </section>

      <section style={{ padding: "70px clamp(20px,5vw,80px)" }}>
        <div ref={rv} style={{ maxWidth: 680, margin: "0 auto" }}>
          <Avatar visible={vv} msg="Watch my skills evolve over the years! This auto-playing timeline shows my technical growth." />
          <div style={{ marginTop: 20 }}><SkillsTimeline active={vv} /></div>
        </div>
      </section>

      <section ref={el => refs.current[4] = el} style={{ ...S, background: "rgba(255,255,255,.008)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={r4} style={{ opacity: v4 ? 1 : 0, transform: v4 ? "translateY(0)" : "translateY(40px)", transition: "all 1s ease" }}>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: "#00D4FF", letterSpacing: 5, textTransform: "uppercase", marginBottom: 14 }}>Chapter IV</div>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(30px,5vw,50px)", fontWeight: 900, color: "#F5F5F5", margin: 0 }}>The Horizon</h2>
            <p style={{ fontFamily: "monospace", fontSize: 13, color: "#888", marginTop: 10 }}>The search for the right engineering challenge</p>
            <div style={{ width: 80, height: 3, marginTop: 20, background: "linear-gradient(90deg,#00D4FF,#FFB830,transparent)" }} />
          </div>
          <Avatar visible={v4} msg="Eight industries, one engineer, endless possibilities. Each card shows where my skills create the most impact." />
          <p style={{ fontFamily: "Nunito", fontSize: 16, color: "#C8C8C8", lineHeight: 1.85, maxWidth: 650, opacity: v4 ? 1 : 0, transition: "all .8s ease .3s" }}>Mechanical design, drivetrain engineering, and energy systems — the next chapter is finding where this combination creates the most impact.</p>

          <div ref={r4b} style={{ marginTop: 45 }}>
            <h3 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 700, color: "#F5F5F5", margin: "0 0 28px", opacity: v4b ? 1 : 0, transition: "opacity .8s" }}>Target Industries</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 18 }}>
              {[
                { n: "Aerospace", i: "✈️", d: "Aircraft structures, propulsion, composites", c: "#00D4FF" },
                { n: "Automotive", i: "🚗", d: "Powertrain, chassis, EV platforms", c: "#FF6B6B" },
                { n: "Shipbuilding", i: "🚢", d: "Marine propulsion, electric shipping", c: "#FFB830" },
                { n: "Heavy Machinery", i: "🏗️", d: "Industrial gearboxes, crane systems", c: "#00FF88" },
                { n: "Locomotive", i: "🚄", d: "Rail propulsion, electric traction", c: "#FF61D8" },
                { n: "E-Mobility", i: "⚡", d: "EV charging, battery systems, smart grids", c: "#87CEEB" },
                { n: "Defence", i: "🛡️", d: "Military vehicles, precision engineering", c: "#DDA0DD" },
                { n: "Trucks & Buses", i: "🚛", d: "Commercial powertrains, electrification", c: "#FFD700" },
              ].map((x, i) => {
                const rgb = x.c === "#00D4FF" ? "0,212,255" : x.c === "#FF6B6B" ? "255,107,107" : x.c === "#FFB830" ? "255,184,48" : x.c === "#00FF88" ? "0,255,136" : x.c === "#FF61D8" ? "255,97,216" : x.c === "#87CEEB" ? "135,206,235" : x.c === "#DDA0DD" ? "221,160,221" : "255,215,0";
                return <div key={i} style={{ background: `rgba(${rgb},.04)`, border: `1px solid ${x.c}30`, borderRadius: 16, padding: "26px 18px", textAlign: "center", opacity: v4b ? 1 : 0, transform: v4b ? "translateY(0) scale(1)" : "translateY(35px) scale(.88)", transition: `all .7s ease ${.08 + i * .08}s`, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 2, background: `linear-gradient(90deg,transparent,${x.c},transparent)`, opacity: .5 }} />
                  <div style={{ fontSize: 38, marginBottom: 10 }}>{x.i}</div>
                  <h4 style={{ fontFamily: "Nunito", fontWeight: 800, fontSize: 15, color: x.c, margin: "0 0 6px" }}>{x.n}</h4>
                  <p style={{ fontFamily: "Nunito", fontSize: 12, color: "#999", lineHeight: 1.5, margin: 0 }}>{x.d}</p>
                </div>;
              })}
            </div>
          </div>

          <div style={{ marginTop: 55 }}>
            <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, color: "#F5F5F5", margin: "0 0 22px", opacity: v4b ? 1 : 0, transition: "opacity .8s ease .3s" }}>Core Competencies</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
              {[{ l: "Drivetrain & Powertrain Design", c: "#00D4FF", p: 95 }, { l: "CAD — SolidWorks, Creo, Inventor", c: "#FFB830", p: 92 }, { l: "FEA — ANSYS Structural & Thermal", c: "#FF6B6B", p: 85 }, { l: "Smart Grid & EV Systems", c: "#00FF88", p: 88 }, { l: "MATLAB/Simulink & Python", c: "#FF61D8", p: 82 }, { l: "GD&T & Manufacturing Drawings", c: "#87CEEB", p: 90 }].map((x, i) =>
                <div key={i} style={{ padding: "14px 18px", background: "rgba(255,255,255,.02)", borderRadius: 10, opacity: v4b ? 1 : 0, transform: v4b ? "translateY(0)" : "translateY(18px)", transition: `all .6s ease ${.4 + i * .1}s` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                    <span style={{ fontFamily: "Nunito", fontSize: 12, fontWeight: 700, color: "#ddd" }}>{x.l}</span>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: x.c }}>{x.p}%</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,.05)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: v4b ? `${x.p}%` : "0%", background: x.c, borderRadius: 2, transition: `width 1.5s ease ${.6 + i * .12}s` }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section ref={rs} style={{ padding: "80px clamp(20px,5vw,80px)", borderTop: "1px solid rgba(0,212,255,.08)", borderBottom: "1px solid rgba(0,212,255,.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 35, textAlign: "center" }}>
          {[{ v: 8, s: "+", l: "Years in Engineering" }, { v: 6, s: "+", l: "CAD Platforms" }, { v: 3, s: "", l: "Major Clients" }, { v: 3, s: "", l: "Countries" }, { v: 2, s: "", l: "Degrees" }].map((x, i) =>
            <div key={i} style={{ opacity: vs ? 1 : 0, transform: vs ? "translateY(0)" : "translateY(18px)", transition: `all .6s ease ${i * .1}s` }}>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 46, fontWeight: 900, color: "#00D4FF" }}><CounterStat end={x.v} suffix={x.s} inView={vs} /></div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#777", letterSpacing: 1, textTransform: "uppercase", marginTop: 7 }}>{x.l}</div>
            </div>
          )}
        </div>
      </section>

      <footer style={{ padding: "80px clamp(20px,5vw,80px)", textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(24px,4vw,38px)", fontWeight: 900, color: "#F5F5F5", margin: "0 0 16px" }}>Let's Build Something <span style={{ color: "#FFB830" }}>Together</span></h2>
          <p style={{ fontFamily: "Nunito", fontSize: 16, color: "#888", lineHeight: 1.75, marginBottom: 32 }}>I'm looking for my next engineering challenge in Germany — in aerospace, automotive, heavy machinery, shipbuilding, or e-mobility.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
            <a href="mailto:navaneethram52@gmail.com" style={{ fontFamily: "Nunito", fontSize: 13, fontWeight: 700, color: "#060B18", textDecoration: "none", background: "linear-gradient(135deg,#00D4FF,#00FF88)", padding: "11px 26px", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,212,255,.3)" }}>navaneethram52@gmail.com</a>
            <a href="https://linkedin.com/in/navaneethrama109681b7" target="_blank" rel="noreferrer" style={{ fontFamily: "Nunito", fontSize: 13, fontWeight: 700, color: "#00D4FF", textDecoration: "none", border: "1px solid rgba(0,212,255,.3)", padding: "11px 26px", borderRadius: 8 }}>LinkedIn ↗</a>
          </div>
          <p style={{ fontFamily: "monospace", fontSize: 11, color: "#888", marginTop: 22 }}>Berlin, Germany · +49 1573 4563039</p>
          <div style={{ marginTop: 45, fontFamily: "monospace", fontSize: 10, color: "#333", letterSpacing: 2 }}>© 2026 NAVANEETH RAM · ENGINEERED WITH PRECISION</div>
        </div>
      </footer>
    </div>
  );
}
