// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { useState } from "react";

const T = {
  bg: "#0F1117",
  surface: "#1A1D27",
  card: "#222534",
  border: "#2E3248",
  accent: "#6C63FF",
  accentMuted: "#6C63FF22",
  text: "#E8E9F3",
  muted: "#7B7F9E",
  danger: "#FF5E7D",
  fontSans: "'Inter', system-ui, sans-serif",
};

const initContent = {
  initial: { title: "How's your experience?", subtitle: "We'd love to hear from you." },
  feedback: {
    ratingType: "stars",
    options: [
      { id: 1, label: "Too complicated" },
      { id: 2, label: "Missing features" },
      { id: 3, label: "Poor performance" },
    ],
    showComment: true,
    submitText: "Submit Feedback",
  },
  thankYou: {
    media: null,
    mediaType: null,
    title: "Thank you! 🎉",
    subtitle: "Your feedback helps us improve.",
    buttonText: "Close",
  },
};

const initStyle = {
  bgColor: "#FFFFFF",
  titleColor: "#111827",
  subtitleColor: "#6B7280",
  buttonColor: "#6C63FF",
  buttonTextColor: "#FFFFFF",
  fontSize: 14,
  fontWeight: "400",
  borderRadius: 16,
  buttonWidth: 100,
  buttonHeight: 44,
  ratingSelectedColor: "#F59E0B",
  ratingUnselectedColor: "#D1D5DB",
};

let _id = 100;
const uid = () => ++_id;

// ── Primitives ───────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 600, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, style = {} }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", boxSizing: "border-box",
        background: T.bg, border: `1px solid ${T.border}`,
        borderRadius: 7, padding: "7px 10px",
        color: T.text, fontSize: 12,
        fontFamily: T.fontSans, outline: "none",
        ...style,
      }}
    />
  );
}

function ColorRow({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <Label>{label}</Label>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", borderRadius: 6, flexShrink: 0 }} />
        <Input value={value} onChange={onChange} style={{ flex: 1 }} />
      </div>
    </div>
  );
}

function SliderRow({ label, value, onChange, min, max, unit = "" }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <Label>{label} <span style={{ color: T.accent, fontWeight: 700 }}>{value}{unit}</span></Label>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: T.accent }} />
    </div>
  );
}

function Toggle({ value, onChange, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
      <Label>{label}</Label>
      <div onClick={() => onChange(!value)} style={{
        width: 38, height: 21, borderRadius: 11,
        background: value ? T.accent : T.border,
        position: "relative", cursor: "pointer", transition: "background .2s", flexShrink: 0,
      }}>
        <div style={{
          position: "absolute", top: 2.5, left: value ? 19 : 2.5,
          width: 16, height: 16, borderRadius: "50%",
          background: "#fff", transition: "left .2s",
        }} />
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontSize: 10, fontWeight: 700, color: T.accent,
        letterSpacing: "0.1em", textTransform: "uppercase",
        marginBottom: 10, paddingBottom: 6,
        borderBottom: `1px solid ${T.border}`,
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

// ── Content Tab ──────────────────────────────────────────────────────────────
function ContentTab({ content, setContent }) {
  const set = (section, key, val) =>
    setContent(c => ({ ...c, [section]: { ...c[section], [key]: val } }));

  const addOption = () =>
    setContent(c => ({
      ...c, feedback: { ...c.feedback, options: [...c.feedback.options, { id: uid(), label: "New option" }] },
    }));

  const deleteOption = id =>
    setContent(c => ({
      ...c, feedback: { ...c.feedback, options: c.feedback.options.filter(o => o.id !== id) },
    }));

  const updateOption = (id, label) =>
    setContent(c => ({
      ...c, feedback: { ...c.feedback, options: c.feedback.options.map(o => o.id === id ? { ...o, label } : o) },
    }));

  const handleMedia = e => {
    const file = e.target.files[0];
    if (!file) return;
    const isLottie = file.name.endsWith(".json");
    const reader = new FileReader();
    reader.onload = ev => setContent(c => ({
      ...c, thankYou: { ...c.thankYou, media: ev.target.result, mediaType: isLottie ? "lottie" : file.type },
    }));
    if (isLottie) reader.readAsText(file); else reader.readAsDataURL(file);
  };

  return (
    <div>
      <Section title="Initial Screen">
        <Label>Title</Label>
        <div style={{ marginBottom: 8 }}>
          <Input value={content.initial.title} onChange={v => set("initial", "title", v)} placeholder="How's your experience?" />
        </div>
        <Label>Subtitle</Label>
        <Input value={content.initial.subtitle} onChange={v => set("initial", "subtitle", v)} placeholder="Subtitle" />
      </Section>

      <Section title="Feedback Screen">
        <Label>Rating Style</Label>
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          {["stars", "numbers"].map(type => (
            <button key={type} onClick={() => set("feedback", "ratingType", type)} style={{
              flex: 1, padding: "7px 0", borderRadius: 7,
              border: `1px solid ${content.feedback.ratingType === type ? T.accent : T.border}`,
              background: content.feedback.ratingType === type ? T.accentMuted : T.bg,
              color: content.feedback.ratingType === type ? T.accent : T.muted,
              fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: T.fontSans,
            }}>
              {type === "stars" ? "★ Stars" : "# Numbers"}
            </button>
          ))}
        </div>

        <Label>Feedback Options</Label>
        <div style={{ marginBottom: 8 }}>
          {content.feedback.options.map(opt => (
            <div key={opt.id} style={{ display: "flex", gap: 6, marginBottom: 5, alignItems: "center" }}>
              <Input value={opt.label} onChange={v => updateOption(opt.id, v)} style={{ flex: 1 }} />
              <button onClick={() => deleteOption(opt.id)} style={{
                width: 26, height: 26, borderRadius: 6, border: "none",
                background: "#FF5E7D22", color: T.danger, cursor: "pointer",
                fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>×</button>
            </div>
          ))}
          <button onClick={addOption} style={{
            width: "100%", padding: "7px 0", marginTop: 2,
            border: `1px dashed ${T.border}`, borderRadius: 7,
            background: "transparent", color: T.muted, cursor: "pointer",
            fontSize: 11, fontFamily: T.fontSans,
          }}>+ Add option</button>
        </div>

        <Toggle value={content.feedback.showComment} onChange={v => set("feedback", "showComment", v)} label="Additional Comment" />

        <Label>Submit Button Text</Label>
        <Input value={content.feedback.submitText} onChange={v => set("feedback", "submitText", v)} />
      </Section>

      <Section title="Thank You Screen">
        <Label>Upload Media (PNG, JPG, GIF, Lottie JSON)</Label>
        <label style={{
          display: "block", padding: "12px", textAlign: "center",
          border: `1px dashed ${T.border}`, borderRadius: 7, cursor: "pointer",
          color: T.muted, fontSize: 11, marginBottom: 10, background: T.bg,
        }}>
          {content.thankYou.media ? "✓ Uploaded — click to replace" : "Click to upload media"}
          <input type="file" accept=".png,.jpg,.jpeg,.gif,.json" onChange={handleMedia} style={{ display: "none" }} />
        </label>

        <Label>Title</Label>
        <div style={{ marginBottom: 8 }}><Input value={content.thankYou.title} onChange={v => set("thankYou", "title", v)} /></div>
        <Label>Subtitle</Label>
        <div style={{ marginBottom: 8 }}><Input value={content.thankYou.subtitle} onChange={v => set("thankYou", "subtitle", v)} /></div>
        <Label>Button Text</Label>
        <Input value={content.thankYou.buttonText} onChange={v => set("thankYou", "buttonText", v)} />
      </Section>
    </div>
  );
}

// ── Styling Tab ──────────────────────────────────────────────────────────────
function StylingTab({ style, setStyle }) {
  const set = (key, val) => setStyle(s => ({ ...s, [key]: val }));
  return (
    <div>
      <Section title="Colors">
        <ColorRow label="Background" value={style.bgColor} onChange={v => set("bgColor", v)} />
        <ColorRow label="Title" value={style.titleColor} onChange={v => set("titleColor", v)} />
        <ColorRow label="Subtitle" value={style.subtitleColor} onChange={v => set("subtitleColor", v)} />
        <ColorRow label="Button" value={style.buttonColor} onChange={v => set("buttonColor", v)} />
        <ColorRow label="Button Text" value={style.buttonTextColor} onChange={v => set("buttonTextColor", v)} />
        <ColorRow label="Rating Selected" value={style.ratingSelectedColor} onChange={v => set("ratingSelectedColor", v)} />
        <ColorRow label="Rating Unselected" value={style.ratingUnselectedColor} onChange={v => set("ratingUnselectedColor", v)} />
      </Section>

      <Section title="Typography">
        <SliderRow label="Font Size" value={style.fontSize} onChange={v => set("fontSize", v)} min={10} max={22} unit="px" />
        <Label>Font Weight</Label>
        <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
          {["300", "400", "500", "600", "700"].map(w => (
            <button key={w} onClick={() => set("fontWeight", w)} style={{
              flex: 1, padding: "5px 0", borderRadius: 6,
              border: `1px solid ${style.fontWeight === w ? T.accent : T.border}`,
              background: style.fontWeight === w ? T.accentMuted : T.bg,
              color: style.fontWeight === w ? T.accent : T.muted,
              fontSize: 10, cursor: "pointer", fontFamily: T.fontSans, fontWeight: w,
            }}>{w}</button>
          ))}
        </div>
      </Section>

      <Section title="Layout">
        <SliderRow label="Border Radius" value={style.borderRadius} onChange={v => set("borderRadius", v)} min={0} max={40} unit="px" />
        <SliderRow label="Button Width" value={style.buttonWidth} onChange={v => set("buttonWidth", v)} min={40} max={100} unit="%" />
        <SliderRow label="Button Height" value={style.buttonHeight} onChange={v => set("buttonHeight", v)} min={28} max={64} unit="px" />
      </Section>
    </div>
  );
}

// ── Phone Preview ─────────────────────────────────────────────────────────────
function StarRating({ selectedColor, unselectedColor }) {
  const [hovered, setHovered] = useState(3);
  return (
    <div style={{ display: "flex", gap: 4, justifyContent: "center", margin: "10px 0" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(3)}
          style={{ fontSize: 24, cursor: "pointer", color: i < hovered ? selectedColor : unselectedColor, transition: "color .15s" }}>
          ★
        </span>
      ))}
    </div>
  );
}

function NumberRating({ selectedColor, unselectedColor }) {
  const [sel, setSel] = useState(3);
  return (
    <div style={{ display: "flex", gap: 5, justifyContent: "center", margin: "10px 0" }}>
      {[1, 2, 3, 4, 5].map(n => (
        <div key={n} onClick={() => setSel(n)} style={{
          width: 32, height: 32, borderRadius: 7,
          background: sel === n ? selectedColor : unselectedColor,
          color: sel === n ? "#fff" : "#555",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "background .15s",
        }}>{n}</div>
      ))}
    </div>
  );
}

function MobilePreview({ content, style: s, activeScreen }) {
  // Phone is 260×500. We scale it down via CSS transform to always fit the preview pane.
  const phoneW = 260;
  const phoneH = 500;

  const cardStyle = {
    background: s.bgColor,
    borderRadius: `${s.borderRadius}px`,
    padding: "16px 14px 14px",
    fontFamily: T.fontSans,
    fontSize: `${s.fontSize}px`,
    fontWeight: s.fontWeight,
  };
  const titleStyle = { color: s.titleColor, fontWeight: 700, fontSize: `${s.fontSize + 2}px`, marginBottom: 3, textAlign: "center" };
  const subtitleStyle = { color: s.subtitleColor, fontSize: `${s.fontSize - 1}px`, textAlign: "center", marginBottom: 10 };
  const btnStyle = {
    display: "block",
    width: `${s.buttonWidth}%`,
    height: `${s.buttonHeight}px`,
    background: s.buttonColor,
    color: s.buttonTextColor,
    border: "none",
    borderRadius: `${Math.min(s.borderRadius, s.buttonHeight / 2)}px`,
    fontWeight: 600, fontSize: `${s.fontSize}px`,
    cursor: "pointer", margin: "0 auto",
    fontFamily: T.fontSans,
  };

  return (
    // Outer wrapper reserves exact space so parent layout doesn't shift
    <div style={{ width: phoneW, height: phoneH, flexShrink: 0 }}>
      <div style={{
        width: phoneW, height: phoneH,
        background: "#16172b",
        borderRadius: 32,
        border: "7px solid #252640",
        boxShadow: "0 0 0 1.5px #0a0a1a, 0 24px 56px #00000077",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Status bar */}
        <div style={{ height: 24, background: "#0d0d1a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontSize: 9, fontWeight: 600 }}>9:41</span>
          <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
            <span style={{ color: "#fff", fontSize: 8 }}>●●●</span>
            <span style={{ color: "#fff", fontSize: 8 }}>WiFi 🔋</span>
          </div>
        </div>

        {/* App bg */}
        <div style={{ flex: 1, background: "#eef0f5", position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 10px 10px", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 28px, #e2e4ee 29px)", opacity: 0.35 }} />

          {/* CSAT bottom sheet */}
          <div style={{ ...cardStyle, width: "100%", boxShadow: "0 -4px 20px #0002", position: "relative", zIndex: 1 }}>

            {activeScreen === "initial" && (
              <>
                <div style={titleStyle}>{content.initial.title || "Title"}</div>
                <div style={subtitleStyle}>{content.initial.subtitle}</div>
                <button style={btnStyle}>Get Started</button>
              </>
            )}

            {activeScreen === "feedback" && (
              <>
                <div style={{ fontSize: 9, color: s.subtitleColor, textAlign: "center", marginBottom: 6 }}>Rate your experience</div>
                {content.feedback.ratingType === "stars"
                  ? <StarRating selectedColor={s.ratingSelectedColor} unselectedColor={s.ratingUnselectedColor} />
                  : <NumberRating selectedColor={s.ratingSelectedColor} unselectedColor={s.ratingUnselectedColor} />}
                {content.feedback.options.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center", marginBottom: 8 }}>
                    {content.feedback.options.map(o => (
                      <span key={o.id} style={{
                        padding: "3px 8px", borderRadius: 20,
                        border: `1px solid ${s.ratingUnselectedColor}`,
                        fontSize: Math.max(8, s.fontSize - 4), color: s.subtitleColor,
                      }}>{o.label}</span>
                    ))}
                  </div>
                )}
                {content.feedback.showComment && (
                  <textarea readOnly placeholder="Add a comment..." style={{
                    width: "100%", height: 44, resize: "none", boxSizing: "border-box",
                    border: `1px solid ${s.ratingUnselectedColor}`, borderRadius: 7,
                    padding: "5px 7px", fontSize: Math.max(8, s.fontSize - 3),
                    color: s.subtitleColor, marginBottom: 8, background: "transparent", fontFamily: T.fontSans,
                  }} />
                )}
                <button style={btnStyle}>{content.feedback.submitText || "Submit"}</button>
              </>
            )}

            {activeScreen === "thankYou" && (
              <>
                {content.thankYou.media
                  ? <div style={{ textAlign: "center", marginBottom: 8 }}><img src={content.thankYou.media} alt="" style={{ maxHeight: 70, maxWidth: "100%", borderRadius: 7 }} /></div>
                  : <div style={{ textAlign: "center", fontSize: 32, marginBottom: 6 }}>🎉</div>
                }
                <div style={titleStyle}>{content.thankYou.title}</div>
                <div style={{ ...subtitleStyle, marginBottom: 12 }}>{content.thankYou.subtitle}</div>
                <button style={btnStyle}>{content.thankYou.buttonText || "Close"}</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── App Shell ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("content");
  const [activeScreen, setActiveScreen] = useState("initial");
  const [content, setContent] = useState(initContent);
  const [style, setStyle] = useState(initStyle);

  const tabs = [{ id: "content", label: "Content" }, { id: "styling", label: "Styling" }];
  const screens = [{ id: "initial", label: "Initial" }, { id: "feedback", label: "Feedback" }, { id: "thankYou", label: "Thank You" }];

  return (
    <div style={{
      height: "100vh",           // ← exact viewport height, no overflow
      display: "flex",
      flexDirection: "column",
      background: T.bg,
      fontFamily: T.fontSans,
      color: T.text,
      overflow: "hidden",        // ← prevent any outer scroll
    }}>
      {/* ── Header (fixed 52px) ── */}
      <div style={{
        height: 52, flexShrink: 0,
        background: T.surface, borderBottom: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>📊</div>
          <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-0.02em" }}>CSAT Builder</span>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", background: T.bg, borderRadius: 8, padding: 3, border: `1px solid ${T.border}` }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: "5px 20px", borderRadius: 6, border: "none",
              background: activeTab === t.id ? T.accent : "transparent",
              color: activeTab === t.id ? "#fff" : T.muted,
              fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: T.fontSans,
            }}>{t.label}</button>
          ))}
        </div>

        <div style={{ width: 120 }} />
      </div>

      {/* ── Body (fills remaining height exactly) ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

        {/* Left panel — scrollable content */}
        <div style={{
          width: 320, flexShrink: 0,
          background: T.surface, borderRight: `1px solid ${T.border}`,
          overflowY: "auto",
          padding: "16px 16px",
        }}>
          {activeTab === "content" && <ContentTab content={content} setContent={setContent} />}
          {activeTab === "styling" && <StylingTab style={style} setStyle={setStyle} />}
        </div>

        {/* Right panel — preview, never scrolls, phone centered */}
        <div style={{
          flex: 1, minWidth: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 16,
          background: `radial-gradient(ellipse at 50% 60%, #1e1b3a 0%, ${T.bg} 68%)`,
          overflow: "hidden",
          padding: 20,
        }}>
          {/* Screen switcher pill */}
          <div style={{
            display: "flex", background: T.surface,
            borderRadius: 9, padding: 3, border: `1px solid ${T.border}`,
            flexShrink: 0,
          }}>
            {screens.map(s => (
              <button key={s.id} onClick={() => setActiveScreen(s.id)} style={{
                padding: "5px 14px", borderRadius: 7, border: "none",
                background: activeScreen === s.id ? T.accent : "transparent",
                color: activeScreen === s.id ? "#fff" : T.muted,
                fontWeight: 600, fontSize: 11, cursor: "pointer", fontFamily: T.fontSans,
              }}>{s.label}</button>
            ))}
          </div>

          {/* Phone — scale down on small screens via CSS transform */}
          <div style={{
            transform: "scale(var(--phone-scale, 1))",
            transformOrigin: "center center",
          }}>
            <MobilePreview content={content} style={style} activeScreen={activeScreen} />
          </div>

          <div style={{ fontSize: 10, color: T.muted, flexShrink: 0 }}>
            Live preview · no save needed
          </div>
        </div>
      </div>

      {/* Inline CSS to set --phone-scale based on viewport height */}
      <style>{`
        html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
        * { box-sizing: border-box; }
        :root { --phone-scale: 1; }
        @media (max-height: 680px)  { :root { --phone-scale: 0.82; } }
        @media (max-height: 580px)  { :root { --phone-scale: 0.70; } }
        input[type=range] { height: 4px; }
      `}</style>
    </div>
  );
}