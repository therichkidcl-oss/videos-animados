/* =====================================================================
   MODULO ORGANICO v2 · clases 5 y 6 rehechas (23/10/2026). Fondo limpio de IA HUB (sin malla ni B-roll: Reimo).
   Piezas propias que se arman con la voz:
   - celular con un Instagram recreado (modos perfil / reel / estado de la cuenta), comun a varias escenas
     seguidas: escena con  tel: { modo, partes, resaltar, link, reel, estado }  -> el contenido va a la derecha.
   - visuales a la izquierda:  vis: { tipo: metadata | carrusel | buscar | marca }
   - escenas a medida: unaCuenta · caminos · linkDer · leyenda · redes · calendario · clonar
   Se inyecta despues de org-plantillas.js y reemplaza CLASE.
   ===================================================================== */
const XL = 560;
const IMG = s => `assets/img/${s}.png`;
const SVG_CORAZON = '<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20.5s-7.6-4.6-9.5-9.1C1 8 3.1 4.4 6.7 4.4c2.1 0 3.7 1.2 5.3 3 1.6-1.8 3.2-3 5.3-3 3.6 0 5.7 3.6 4.2 7-1.9 4.5-9.5 9.1-9.5 9.1z"/></svg>';
const SVG_GUARDAR = '<svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3.5h12v17l-6-4.4-6 4.4z"/></svg>';
const verClipBucle = (img, c, t, t0) => { const m = CLIPS[c]; if (!m) return; const d = m.n / m.fps; verClip(img, c, t0 + (((t - t0) % d) + d) % d, t0); };
const milK = v => v >= 1e6 ? (v / 1e6).toFixed(1).replace('.', ',') + ' M' : v >= 1e4 ? (v / 1e3).toFixed(1).replace('.', ',').replace(',0', '') + ' mil' : miles(Math.round(v));

css(`
.tlf{width:440px;height:900px;border-radius:66px;padding:12px;background:linear-gradient(155deg,#34363e,#101115 38%,#1d1e24 70%,#2a2b31);
  box-shadow:0 70px 140px -30px rgba(0,0,0,.95),0 0 0 2px rgba(255,255,255,.08),inset 0 0 0 2px rgba(255,255,255,.05),0 0 90px rgba(255,106,26,.2)}
.tlf .scr{position:relative;width:100%;height:100%;border-radius:54px;overflow:hidden;background:#000;color:#f5f5f5;font-family:var(--sans)}
.tlf .sb{position:absolute;left:0;right:0;top:0;height:56px;display:flex;align-items:center;justify-content:space-between;padding:4px 40px 0;font:700 19px var(--sans);z-index:5}
.tlf .sb .bat{width:30px;height:14px;border-radius:4px;border:2px solid #f5f5f5;position:relative}
.tlf .sb .bat::after{content:'';position:absolute;left:2px;top:2px;bottom:2px;width:60%;background:#f5f5f5;border-radius:1px}
.tlf .isla{position:absolute;left:50%;top:13px;width:124px;height:36px;margin-left:-62px;border-radius:20px;background:#000;z-index:6}
.tlf .pg{position:absolute;inset:0;opacity:0}
/* --- perfil --- */
.perfil{padding:62px 22px 0}
.perfil .hd{display:flex;align-items:center;justify-content:space-between;height:52px}
.perfil .hd .u{font:800 25px var(--sans);min-width:40px;min-height:30px}
.perfil .hd .hi{display:flex;align-items:center;gap:22px}
.perfil .mn{display:flex;flex-direction:column;gap:6px}.perfil .mn i{display:block;width:26px;height:3px;border-radius:2px;background:#f5f5f5}
.perfil .pf{display:flex;align-items:center;gap:26px;margin-top:10px}
.perfil .av{flex:none;width:118px;height:118px;border-radius:50%;padding:4px;background:linear-gradient(45deg,#ffb347,#ff6a1a,#ff3d6e,#b04bff)}
.perfil .av img{width:100%;height:100%;border-radius:50%;object-fit:cover;border:4px solid #000;display:block}
.perfil .st{flex:1;display:flex;justify-content:space-between}
.perfil .st div{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:74px}
.perfil .st b{font:800 22px var(--sans);white-space:nowrap}.perfil .st span{font:500 13px var(--sans);color:#c9c9cd}
.perfil .nm{margin-top:14px;font:700 20px var(--sans);min-height:26px}
.perfil .ai{display:flex;align-items:center;gap:7px;font:600 16px var(--sans);color:#a8a8ad;height:0;overflow:hidden;opacity:0}
.perfil .bio{margin-top:4px}.perfil .bio p{margin:0;font:500 18px/1.42 var(--sans);min-height:25px}
.perfil .lk{display:flex;align-items:center;gap:8px;margin-top:4px;font:700 18px var(--sans);color:#9fb4ff;min-height:28px;border-radius:10px;padding:0 4px;margin-left:-4px}
.perfil .lk.mal{color:#ff5a68}.perfil .lk.mal span{text-decoration:line-through;text-decoration-thickness:2px}
.perfil .lk.bien{color:#5be38d}
.perfil .bt{display:flex;gap:8px;margin-top:14px}
.perfil .bt span{flex:1;height:44px;border-radius:12px;background:#262629;display:flex;align-items:center;justify-content:center;font:700 17px var(--sans)}
.perfil .bt .seg{background:#2f6bff}.perfil .bt .ic{flex:none;width:46px}
.perfil .hl{display:flex;gap:14px;margin-top:18px}
.perfil .hl div{display:flex;flex-direction:column;align-items:center;gap:6px;width:68px}
.perfil .hl i{width:68px;height:68px;border-radius:50%;border:2px solid #3a3a3f;padding:3px;display:block}
.perfil .hl img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block}
.perfil .hl span{font:600 13px var(--sans);color:#e5e5e8;white-space:nowrap}
.perfil .tb{display:flex;margin:18px -22px 0;border-bottom:1px solid #1f1f22}
.perfil .tb i{flex:1;display:flex;justify-content:center;padding:10px 0;color:#8a8a90}.perfil .tb i.on{color:#f5f5f5;box-shadow:inset 0 -2px 0 #f5f5f5}
.perfil .gr{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin:2px -22px 0}
.perfil .gr i{display:block;aspect-ratio:3/4;background:#141416;overflow:hidden}
.perfil .gr img{width:100%;height:100%;object-fit:cover;display:block}
.perfil .sk{position:relative}
.perfil .u.sk::after,.perfil .nm.sk::after,.perfil .bio.sk p::after,.perfil .lk.sk::after{content:'';position:absolute;left:0;top:50%;height:15px;margin-top:-7px;border-radius:8px;background:#1d1d21;width:62%}
.perfil .bio.sk p{position:relative}.perfil .bio.sk p:nth-child(2)::after{width:78%}.perfil .bio.sk p:nth-child(3)::after{width:48%}
.perfil .u.sk::after{width:150px}.perfil .lk.sk svg{opacity:0}
.perfil .av.sk{background:#1d1d21}.perfil .av.sk img{opacity:0}
.perfil .st.sk b,.perfil .st.sk span{color:transparent;background:#1d1d21;border-radius:6px}
.perfil .bt.sk span{color:transparent;background:#1a1a1d}.perfil .bt.sk svg{opacity:0}
.perfil .hl.sk img,.perfil .hl.sk span{opacity:0}.perfil .hl.sk i{background:#1a1a1d;border-color:#1a1a1d}
.perfil .gr.sk img,.perfil .tb.sk svg{opacity:0}
.tlf .on{box-shadow:0 0 0 3px #ff7a1a,0 0 28px rgba(255,122,26,.7);border-radius:12px}
.perfil .av.on{box-shadow:0 0 0 5px #ff7a1a,0 0 50px rgba(255,122,26,.85);border-radius:50%}
/* --- reel --- */
.reel .rv{position:absolute;inset:0;overflow:hidden}.reel .rv img{width:100%;height:100%;object-fit:cover;display:block}
.reel .rv img.bgb{position:absolute;left:-30px;top:-30px;width:calc(100% + 60px);height:calc(100% + 60px);filter:blur(22px) brightness(.55)}
.reel .rv img.fg{position:relative}.reel .rv.ct img.fg{object-fit:contain}
.reel .rs{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.45) 0%,rgba(0,0,0,0) 22%,rgba(0,0,0,0) 55%,rgba(0,0,0,.75) 100%)}
.reel .rt{position:absolute;left:28px;right:28px;top:66px;display:flex;justify-content:space-between;align-items:center;font:800 27px var(--sans)}
.reel .rvw{position:absolute;left:28px;top:112px;display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:rgba(0,0,0,.55);font:800 20px var(--sans)}
.reel .rprom{position:absolute;left:28px;top:160px;display:flex;flex-direction:column;gap:2px;padding:10px 16px;border-radius:16px;background:rgba(10,10,12,.82);border:1.5px solid rgba(255,122,26,.7);opacity:0}
.reel .rprom span{font:600 14px var(--sans);color:#c9c9cd}.reel .rprom b{font:800 20px var(--sans)}.reel .rprom em{font-style:normal;font:800 26px var(--sans);color:#ff8a3d}
.reel .rp{position:absolute;left:24px;right:24px;top:112px;display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:14px;background:rgba(47,107,255,.92);font:700 16px/1.25 var(--sans);opacity:0}
.reel .rx{position:absolute;right:16px;bottom:150px;display:flex;flex-direction:column;align-items:center;gap:22px}
.reel .rx div{display:flex;flex-direction:column;align-items:center;gap:4px;color:#fff;filter:drop-shadow(0 2px 6px rgba(0,0,0,.6));padding:6px;border-radius:14px}
.reel .rx span{font:800 16px var(--sans)}
.reel .rx div.on{color:#ff8a3d;background:rgba(0,0,0,.45);box-shadow:0 0 0 3px #ff7a1a,0 0 26px rgba(255,122,26,.7)}
.reel .ru{position:absolute;left:24px;bottom:96px;display:flex;align-items:center;gap:10px;font:800 18px var(--sans)}
.reel .ru i{width:38px;height:38px;border-radius:50%;overflow:hidden;border:2px solid #fff;display:block}.reel .ru img{width:100%;height:100%;object-fit:cover}
.reel .ru .sg{padding:4px 12px;border:1.5px solid #fff;border-radius:8px;font:700 15px var(--sans)}
.reel .rc{position:absolute;left:24px;right:90px;bottom:58px;font:500 16px/1.3 var(--sans)}
.reel .rb{position:absolute;left:0;right:0;bottom:28px;height:3px;background:rgba(255,255,255,.25)}.reel .rb i{display:block;height:100%;width:0;background:#fff}
.reel .rg{position:absolute;left:50%;top:46%;display:flex;align-items:center;gap:10px;padding:12px 22px;margin-left:-80px;border-radius:999px;background:rgba(255,106,26,.95);font:800 28px var(--mono);opacity:0;box-shadow:0 0 40px rgba(255,106,26,.7)}
/* --- estado de la cuenta --- */
.estado{padding:66px 24px 0}
.estado .eh{display:flex;align-items:center;gap:16px;font:800 23px var(--sans);height:56px}
.estado .ea{display:flex;flex-direction:column;align-items:center;gap:8px;margin:18px 0 22px;text-align:center}
.estado .ea i{width:96px;height:96px;border-radius:50%;overflow:hidden;display:block}.estado .ea img{width:100%;height:100%;object-fit:cover}
.estado .ea b{font:800 20px var(--sans)}.estado .ea span{font:500 16px/1.35 var(--sans);color:#b9b9be;padding:0 10px}
.estado .ef{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:18px 14px;border-bottom:1px solid #1f1f22;font:600 18px/1.3 var(--sans);opacity:.25;border-radius:12px}
.estado .ef i{flex:none;width:36px;height:36px;border-radius:50%;background:#2e9e5b;display:flex;align-items:center;justify-content:center;color:#fff;transform:scale(0)}
.estado .eb{margin-top:26px;height:52px;border-radius:12px;background:#2f6bff;display:flex;align-items:center;justify-content:center;font:800 18px var(--sans);opacity:0}
/* --- piezas de las escenas --- */
.cta{display:flex;flex-direction:column;align-items:center;gap:16px}
.cta .cav{width:170px;height:170px;border-radius:50%;padding:5px;background:linear-gradient(45deg,#ffb347,#ff6a1a,#ff3d6e,#b04bff);transition:none}
.cta .cav img{width:100%;height:100%;border-radius:50%;object-fit:cover;border:5px solid #0a0a0b;display:block}
.cta b{font:800 30px var(--sans);color:#fff;white-space:nowrap}
.cta .sel,.cta .okb{position:absolute;right:-6px;top:-6px;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;opacity:0}
.cta .sel{background:#e23a4a}.cta .okb{background:#2e9e5b}
.cta.mal .cav{background:#ff4d5e;filter:grayscale(.7);box-shadow:0 0 50px rgba(255,77,94,.7)}.cta.mal .sel{opacity:1}
.cta.ok .cav{background:linear-gradient(45deg,#2fd47a,#7cf0b0);box-shadow:0 0 70px rgba(47,212,122,.6)}.cta.ok .okb{opacity:1}
.clin{height:6px;border-radius:3px;background:linear-gradient(90deg,#3fa9ff,#8fd0ff);box-shadow:0 0 18px rgba(63,169,255,.7)}
.clin.mal{background:#ff4d5e;box-shadow:0 0 18px rgba(255,77,94,.85)}
.sanc{padding:12px 30px;border:5px solid #ff4d5e;border-radius:14px;font:400 58px/1 Impact,'Arial Narrow Bold',sans-serif;letter-spacing:.06em;color:#ff4d5e;background:rgba(40,6,10,.7);box-shadow:0 0 40px rgba(255,77,94,.5)}
.cam{border-radius:32px;background:linear-gradient(180deg,rgba(26,22,24,.95),rgba(12,10,12,.95));border:2px solid var(--c);box-shadow:0 40px 90px -30px rgba(0,0,0,.95),0 0 50px color-mix(in srgb,var(--c) 25%,transparent);padding:26px 30px 30px}
.cam.v{--c:#2fd47a;width:620px}.cam.o{--c:#ff7a1a;width:880px}
.cam .ch{display:flex;align-items:center;gap:16px;font:400 46px/1 Impact,'Arial Narrow Bold',sans-serif;color:#fff;letter-spacing:.02em;margin-bottom:22px}
.cam .ch span{width:56px;height:56px;border-radius:50%;background:var(--c);display:flex;align-items:center;justify-content:center;font:800 30px var(--sans);color:#0b0b0c}
.cam .cb{display:flex;flex-direction:column;align-items:center;gap:20px;text-align:center;padding:10px 0}
.cam .cb .neo{position:relative}
.cam .cb p{margin:0;font:700 32px/1.3 var(--sans);color:#fff}.cam .cb p b{color:#5be38d}
.cam .cb small{font:600 24px/1.35 var(--sans);color:#b9b5bf}
.cam .cf{display:flex;align-items:center;gap:22px;padding:16px 18px;border-radius:20px;border:1.5px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);margin-top:12px;opacity:0}
.cam .cf.on{border-color:rgba(255,122,26,.85);background:rgba(255,106,26,.08);box-shadow:0 0 30px rgba(255,106,26,.25)}
.cam .cf>i{flex:none;width:66px;height:66px;border-radius:18px;background:rgba(255,122,26,.14);color:#ff8a3d;display:flex;align-items:center;justify-content:center}
.cam .cf em{display:block;font:700 18px var(--mono);font-style:normal;letter-spacing:.14em;color:#ff9f5e;text-transform:uppercase}
.cam .cf b{display:block;font:800 29px/1.2 var(--sans);color:#fff;white-space:nowrap}
.cam .cf b.url{font:700 23px var(--mono);color:#ffd2b0}
.cam .cf small{display:block;font:600 21px var(--sans);color:#b9b5bf;margin-top:2px}.cam .cf small b{display:inline;font:800 21px var(--mono);color:#ffd2b0}
.mlk{display:flex;align-items:center;gap:20px;width:660px;height:96px;padding:0 26px 0 18px;border-radius:24px;background:rgba(30,10,14,.9);border:2px solid rgba(255,77,94,.6)}
.mlk .lgx{width:62px;height:62px;border-radius:16px;background:#141416;display:flex;align-items:center;justify-content:center}
.mlk b{flex:1;font:700 30px var(--mono);color:#ffd9dc;text-decoration:line-through;text-decoration-color:#ff4d5e;text-decoration-thickness:3px;white-space:nowrap}
.mlk i{width:52px;height:52px;border-radius:50%;background:#e23a4a;display:flex;align-items:center;justify-content:center;color:#fff}
.flt{display:flex;flex-direction:column;align-items:center;gap:14px}
.flt .tile2{width:150px;height:150px;border-radius:36px;background:rgba(16,16,19,.95);border:2px solid rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;box-shadow:0 30px 60px -20px rgba(0,0,0,.9)}
.flt.on .tile2{border-color:#5be38d;box-shadow:0 0 0 2px rgba(91,227,141,.4),0 0 50px rgba(91,227,141,.35)}
.flt span{font:800 26px var(--sans);color:#fff;white-space:nowrap}
.lmk{width:330px;height:540px;border-radius:40px;background:linear-gradient(180deg,#1f3b2c,#0f1712);border:2px solid rgba(91,227,141,.6);display:flex;flex-direction:column;align-items:center;gap:16px;padding:44px 26px;box-shadow:0 40px 90px -30px rgba(0,0,0,.95),0 0 50px rgba(91,227,141,.2)}
.lmk i{width:110px;height:110px;border-radius:50%;overflow:hidden;display:block;border:3px solid #fff}.lmk i img{width:100%;height:100%;object-fit:cover}
.lmk b{font:800 26px var(--sans);color:#fff}.lmk small{font:600 17px var(--sans);color:#b7d8c4;margin-top:-8px}
.lmk span{width:100%;height:58px;border-radius:16px;background:#f4f4f2;color:#111;display:flex;align-items:center;justify-content:center;font:800 19px var(--sans);opacity:0}
.cap2{width:900px;padding:30px 36px;border-radius:28px;background:linear-gradient(180deg,rgba(28,24,26,.95),rgba(14,12,13,.95));border:1.5px solid rgba(255,255,255,.12);box-shadow:0 40px 90px -30px rgba(0,0,0,.95)}
.cap2 .cu{display:flex;align-items:center;gap:14px;font:800 26px var(--sans);color:#fff;margin-bottom:14px}
.cap2 .cu i{width:52px;height:52px;border-radius:50%;overflow:hidden;display:block}.cap2 .cu img{width:100%;height:100%;object-fit:cover}
.cap2 p{margin:0;font:600 34px/1.4 var(--sans);color:#d9d5da}
.cap2 p em{font-style:normal;border-radius:10px;padding:0 3px;margin:0 -3px;transition:none}
.cap2 p em.on{color:#1a1205;background:#ffc23d;box-shadow:0 0 26px rgba(255,194,61,.55)}
.hsh{display:flex;gap:14px}
.hsh span{height:58px;padding:0 22px;border-radius:999px;background:rgba(63,169,255,.14);border:1.5px solid rgba(63,169,255,.6);display:flex;align-items:center;font:700 26px var(--sans);color:#bfe0ff;opacity:0}
.hsh b{height:58px;padding:0 22px;border-radius:999px;background:#ff7a1a;display:flex;align-items:center;font:800 26px var(--sans);color:#fff;opacity:0}
.rdc{width:440px;padding:30px 30px 34px;border-radius:32px;background:linear-gradient(180deg,rgba(26,22,24,.95),rgba(12,10,12,.95));border:1.5px solid rgba(255,255,255,.1);box-shadow:0 40px 90px -30px rgba(0,0,0,.95)}
.rdc.on{border-color:rgba(255,122,26,.9);box-shadow:0 40px 90px -30px rgba(0,0,0,.95),0 0 60px rgba(255,122,26,.3)}
.rdc .rh{display:flex;align-items:center;gap:18px;margin-bottom:20px}
.rdc .rh .tile2{width:84px;height:84px;border-radius:24px;background:#111114;border:1.5px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center}
.rdc .rh b{font:400 44px/1 Impact,'Arial Narrow Bold',sans-serif;color:#fff;letter-spacing:.02em}
.rdc .rr{display:flex;align-items:flex-start;gap:14px;padding:12px 0;font:700 25px/1.3 var(--sans);color:#8e8a96;opacity:0}
.rdc .rr.on{color:#fff}
.rdc .rr i{flex:none;width:38px;height:38px;border-radius:50%;background:#2e9e5b;color:#fff;display:flex;align-items:center;justify-content:center;margin-top:-2px}
.rdc .rr i.no{background:#e23a4a}
.cal{width:1440px;height:150px}
.cal .trk{position:absolute;left:0;right:0;top:82px;height:14px;border-radius:7px;background:rgba(255,255,255,.08)}
.cal .fil{position:absolute;left:0;top:82px;height:14px;border-radius:7px;background:linear-gradient(90deg,#ff9a4a,#ff6a1a);box-shadow:0 0 24px rgba(255,106,26,.7)}
.cal .sg2{position:absolute;top:0;width:360px;text-align:center;font:400 40px/1 Impact,'Arial Narrow Bold',sans-serif;letter-spacing:.03em;color:#5a5660}
.cal .sg2.on{color:#fff;text-shadow:0 0 26px rgba(255,122,26,.6)}.cal .sg2.ok{color:#ffb27a}
.cal .tk{position:absolute;top:74px;width:4px;height:30px;margin-left:-2px;border-radius:2px;background:rgba(255,255,255,.25)}
.cal .dot{position:absolute;top:66px;width:46px;height:46px;margin-left:-23px;border-radius:50%;background:#fff;box-shadow:0 0 0 6px rgba(255,106,26,.55),0 0 34px rgba(255,106,26,.9)}
.cal .dot b{position:absolute;left:50%;top:60px;transform:translateX(-50%);padding:6px 14px;border-radius:999px;background:#ff6a1a;font:800 22px var(--mono);color:#fff;white-space:nowrap}
.cfz{width:1280px;padding:34px 40px 38px;border-radius:34px;background:linear-gradient(180deg,rgba(26,22,24,.95),rgba(12,10,12,.95));border:1.5px solid rgba(255,122,26,.5);box-shadow:0 40px 100px -30px rgba(0,0,0,.95),0 0 60px rgba(255,106,26,.15)}
.cfz .cfi{display:grid;grid-template-columns:1fr 1fr;gap:16px 26px;margin-top:26px}
.cfz .it{display:flex;align-items:center;gap:20px;min-height:92px;padding:14px 22px;border-radius:22px;background:rgba(255,255,255,.03);border:1.5px solid rgba(255,255,255,.07);font:700 30px/1.25 var(--sans);color:#8e8a96;opacity:0}
.cfz .it.on{color:#fff;border-color:rgba(255,122,26,.9);background:rgba(34,18,12,.94);box-shadow:0 0 36px rgba(255,122,26,.25)}
.cfz .it.ok{color:#ddd6d8}
.cfz .it i{flex:none;width:62px;height:62px;border-radius:18px;background:rgba(255,122,26,.14);color:#ff8a3d;display:flex;align-items:center;justify-content:center}
.cfz .it.no i{background:rgba(255,77,94,.16);color:#ff6b78}
.mtc{width:520px;height:150px;display:flex;align-items:center;gap:22px;padding:0 26px;border-radius:28px;background:linear-gradient(180deg,rgba(26,22,24,.95),rgba(12,10,12,.95));border:1.5px solid rgba(255,255,255,.1);box-shadow:0 30px 70px -25px rgba(0,0,0,.95)}
.mtc.on{border-color:rgba(255,122,26,.95);box-shadow:0 30px 70px -25px rgba(0,0,0,.95),0 0 50px rgba(255,122,26,.35)}
.mtc>i{flex:none;width:86px;height:86px;border-radius:24px;background:rgba(255,122,26,.14);color:#ff8a3d;display:flex;align-items:center;justify-content:center}
.mtc b{display:block;font:400 42px/1 Impact,'Arial Narrow Bold',sans-serif;color:#fff;letter-spacing:.02em}
.mtc small{display:block;font:600 22px/1.3 var(--sans);color:#b9b5bf;margin-top:6px}
.rcd{width:270px;height:480px;border-radius:34px;overflow:hidden;border:3px solid rgba(255,255,255,.85);background:#111;box-shadow:0 40px 90px -24px rgba(0,0,0,.95)}
.rcd img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.rcd .q{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#141416;font:400 120px/1 Impact,sans-serif;color:#3a3a40}
.rcd .fl{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);padding:7px 16px;border-radius:999px;background:rgba(0,0,0,.7);border:1.5px solid rgba(255,106,26,.8);font:700 19px var(--mono);letter-spacing:.1em;color:#fff;white-space:nowrap}
.rcd.ok{border-color:#5be38d;box-shadow:0 40px 90px -24px rgba(0,0,0,.95),0 0 50px rgba(91,227,141,.4)}
.flj{height:5px;border-radius:3px;background:linear-gradient(90deg,rgba(255,106,26,.2),#ff6a1a);box-shadow:0 0 14px rgba(255,106,26,.6);transform-origin:0 50%}
.pkt{width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 0 18px #ff8a3d,0 0 40px #ff6a1a}
.dts{display:flex;gap:12px}.dts i{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.12);border:2px solid rgba(255,255,255,.2)}.dts i.on{background:#ff6a1a;border-color:#ffb27a;box-shadow:0 0 16px rgba(255,106,26,.8)}
.vmd .ph{position:relative;width:420px;height:560px;border-radius:30px;overflow:hidden;border:3px solid rgba(255,255,255,.85);box-shadow:0 50px 110px -30px rgba(0,0,0,.95)}
.vmd .ph img{width:100%;height:100%;object-fit:cover;display:block}
.vmd .scan{position:absolute;left:0;right:0;height:120px;background:linear-gradient(180deg,rgba(255,106,26,0),rgba(255,140,60,.55) 80%,#ffd2b0);opacity:0}
.vmd .code{position:absolute;left:18px;right:18px;bottom:18px;padding:18px 20px;border-radius:18px;background:rgba(6,6,8,.86);border:1.5px solid rgba(255,122,26,.7);opacity:0}
.vmd .code p{margin:0;font:600 19px/1.5 var(--mono);color:#ffcfa8;white-space:pre;min-height:28px}
.vmd .lab{position:absolute;left:50%;top:-78px;transform:translateX(-50%);display:flex;align-items:center;gap:10px;height:54px;padding:0 22px;border-radius:999px;background:rgba(14,14,16,.95);border:1.5px solid rgba(255,255,255,.3);font:700 24px var(--sans);color:#fff;white-space:nowrap;opacity:0}
.vpc{width:440px;border-radius:30px;background:#000;border:1.5px solid rgba(255,255,255,.14);overflow:hidden;box-shadow:0 50px 110px -30px rgba(0,0,0,.95),0 0 60px rgba(255,106,26,.15)}
.vpc .vh{display:flex;align-items:center;gap:12px;padding:14px 18px;font:800 20px var(--sans);color:#fff}
.vpc .vh i{width:42px;height:42px;border-radius:50%;overflow:hidden;display:block}.vpc .vh img{width:100%;height:100%;object-fit:cover}.vpc .vh small{display:block;font:500 15px var(--sans);color:#b9b9be}
.vpc .vim{position:relative;width:440px;height:550px;overflow:hidden}
.vpc .vtr{position:absolute;left:0;top:0;height:100%;display:flex}
.vpc .vtr img{width:440px;height:550px;object-fit:cover;display:block;flex:none}
.vpc .vn{position:absolute;right:16px;top:16px;padding:5px 12px;border-radius:999px;background:rgba(0,0,0,.65);font:700 16px var(--sans);color:#fff}
.vpc .va{display:flex;align-items:center;gap:18px;padding:14px 18px 6px;color:#fff}
.vpc .va .dd{flex:1;display:flex;justify-content:center;gap:6px;margin-right:110px}.vpc .va .dd i{width:8px;height:8px;border-radius:50%;background:#4a4a50}.vpc .va .dd i.on{background:#3b82f6}
.vpc .vc{padding:4px 18px 18px;font:500 18px var(--sans);color:#e8e8ea}
.vbs{width:500px;padding:22px;border-radius:30px;background:#000;border:1.5px solid rgba(255,255,255,.14);box-shadow:0 50px 110px -30px rgba(0,0,0,.95),0 0 60px rgba(255,106,26,.15)}
.vbs .sbar{display:flex;align-items:center;gap:14px;height:62px;padding:0 20px;border-radius:16px;background:#1f1f22;color:#a8a8ad;font:600 26px var(--sans)}
.vbs .sbar .q{color:#fff}.vbs .sbar .cur{width:3px;height:30px;background:#3b82f6;margin-left:-10px}
.vbs .rw{display:flex;align-items:center;gap:16px;padding:14px 10px;margin-top:10px;border-radius:16px;opacity:0}
.vbs .rw.on{background:rgba(255,106,26,.12);box-shadow:0 0 0 2px rgba(255,122,26,.8)}
.vbs .rw i{width:66px;height:66px;border-radius:50%;overflow:hidden;display:block;flex:none}.vbs .rw img{width:100%;height:100%;object-fit:cover}
.vbs .rw b{display:block;font:800 22px var(--sans);color:#fff}.vbs .rw small{display:block;font:500 19px var(--sans);color:#b9b9be}
.vbs .rw em{font-style:normal;color:#ffc23d}
.vmr .fr{position:relative;width:400px;height:620px;border-radius:30px;overflow:hidden;border:3px solid rgba(255,255,255,.85);box-shadow:0 50px 110px -30px rgba(0,0,0,.95);background:#111}
.vmr .fr img.b{width:100%;height:100%;object-fit:cover;display:block}
.vmr .wm{position:absolute;display:flex;align-items:center;gap:8px;font:800 20px var(--sans);color:rgba(255,255,255,.9);text-shadow:0 2px 6px rgba(0,0,0,.7);opacity:0}
.vmr .wm img{width:34px;height:34px}
.vmr .tx{position:absolute;left:24px;right:24px;top:40%;padding:12px;border-radius:12px;background:rgba(255,255,255,.92);color:#111;font:800 26px var(--sans);text-align:center;opacity:0}
.vmr .bd{position:absolute;inset:0;border:26px solid #f2c94c;opacity:0}
.vmr .vl{position:absolute;right:20px;top:20px;padding:8px 14px;border-radius:12px;background:#3b82f6;font:800 24px var(--mono);color:#fff;opacity:0}
.vmr .stp{position:absolute;left:50%;bottom:-40px;padding:12px 26px;border-radius:14px;border:4px solid currentColor;font:400 44px/1 Impact,'Arial Narrow Bold',sans-serif;letter-spacing:.05em;white-space:nowrap;background:rgba(10,10,12,.9);opacity:0}
.vmr .stp.no{color:#ff4d5e}.vmr .stp.si{color:#5be38d}
`);

/* ---------- celular con Instagram recreado ---------- */
const PERFIL = {
  usuario: 'itsrubylane', nombre: 'Ruby Lane | Gym & Miami', avatar: 'ig-avatar', posts: 86, seg: 12400, sigue: 310,
  bio: ['22 · Miami', 'Gym, café y atardeceres', 'Escríbeme, no muerdo'],
  dest: [['ig-blanco', 'Yo'], ['ig-piscina', 'Playa'], ['ig-sendero', 'Gym'], ['ig-paella', 'Café'], ['ig-barco', 'Noche']],
  grid: ['ig-negro', 'ig-paella', 'ig-piscina', 'ig-cena', 'ig-sendero', 'ig-encaje'],
};
const ESTADO_FILAS = ['Contenido eliminado', 'Lo que no se puede recomendar', 'Funciones que no puedes usar', 'Riesgo de inhabilitación'];
let TEL = null;
function celularIG(tramos) {
  const p = PERFIL;
  const el = mk('div', 'L tlf z6', WORLDF, `<div class="scr"><div class="sb"><span>9:41</span><span class="bat"></span></div><i class="isla"></i>
    <div class="pg perfil">
      <div class="hd"><b class="u" data-p="usuario"></b><span class="hi">${icon('plus', 30, 2.2)}<i class="mn"><i></i><i></i><i></i></i></span></div>
      <div class="pf"><div class="av" data-p="foto"><img alt="" src="${IMG(p.avatar)}"></div>
        <div class="st" data-p="stats"><div><b>${p.posts}</b><span>publicaciones</span></div><div><b class="nseg">${milK(p.seg)}</b><span>seguidores</span></div><div><b>${p.sigue}</b><span>seguidos</span></div></div></div>
      <div class="nm" data-p="nombre"></div>
      <div class="ai" data-p="etiqueta">${icon('sparkles', 18, 2.2)}<span>Perfil generado con IA</span></div>
      <div class="bio" data-p="bio">${p.bio.map(() => '<p></p>').join('')}</div>
      <div class="lk" data-p="link">${icon('link', 18, 2.4)}<span></span></div>
      <div class="bt" data-p="botones"><span class="seg">Seguir</span><span>Mensaje</span><span class="ic">${icon('users', 20, 2.2)}</span></div>
      <div class="hl" data-p="destacadas">${p.dest.map(d => `<div><i><img alt="" src="${IMG(d[0])}"></i><span>${d[1]}</span></div>`).join('')}</div>
      <div class="tb" data-p="grid"><i class="on">${icon('layoutTemplate', 24, 2)}</i><i>${icon('video', 24, 2)}</i><i>${icon('scanFace', 24, 2)}</i></div>
      <div class="gr" data-p="grid">${p.grid.map(g => `<i><img alt="" src="${IMG(g)}"></i>`).join('')}</div>
    </div>
    <div class="pg reel"><div class="rv"><img class="bgb" alt=""><img class="fg" alt=""></div><div class="rs"></div>
      <div class="rt"><b>Reels</b>${icon('camera', 28, 2)}</div>
      <div class="rvw">${icon('play', 18, 2.6)}<span class="vv">0</span></div>
      <div class="rprom"><span>Promedio de la cuenta</span><b>8 mil vistas</b><em>5,7x</em></div>
      <div class="rp">${icon('flaskConical', 22, 2.4)}<span>Reel de prueba: lo ven primero quienes no te siguen</span></div>
      <div class="rx"><div data-r="gusta">${SVG_CORAZON}<span>0</span></div><div data-r="coment">${icon('messageSquare', 36, 2)}<span>0</span></div>
        <div data-r="enviar">${icon('send', 36, 2)}<span>0</span></div><div data-r="guardar">${SVG_GUARDAR}<span>0</span></div></div>
      <div class="ru"><i><img alt=""></i><b class="cu"></b><span class="sg">Seguir</span></div>
      <div class="rc"></div><div class="rb"><i></i></div>
      <div class="rg">${icon('timer', 26, 2.4)}<span>0:02</span></div>
    </div>
    <div class="pg estado"><div class="eh">${icon('arrowLeft', 28, 2.4)}<b>Estado de la cuenta</b></div>
      <div class="ea"><i><img alt="" src="${IMG(p.avatar)}"></i><b>${p.usuario}</b><span>Revisa si tu cuenta o tu contenido tienen alguna restricción</span></div>
      ${ESTADO_FILAS.map(f => `<div class="ef"><span>${f}</span><i>${icon('check', 22, 3)}</i></div>`).join('')}
      <div class="eb">Apelar una decisión</div>
    </div></div>`);
  const q = s => el.querySelector(s), qa = s => [...el.querySelectorAll(s)];
  const PG = { perfil: q('.perfil'), reel: q('.reel'), estado: q('.estado') };
  const partes = qa('.perfil [data-p]');
  // resolver anclas de cada tramo (relativas al inicio de su escena)
  const rev = {}, links = [];
  tramos.forEach(tr => {
    const R = v => A(v, tr.T0);
    for (const [k, v] of Object.entries(tr.partes || {})) { const x = R(v); if (rev[k] == null || x < rev[k]) rev[k] = x; }
    (tr.link || []).forEach(l => links.push([R(l[0]), l[1], l[2]]));
    tr.res = (tr.resaltar || []).map(r => [R(r[0]), r[1] === 'fin' ? tr.esc.b : R(r[1]), r[2]]);
    if (tr.reel) {
      const r = tr.reel; tr.rv = { ...r, res: (r.resaltar || []).map(x => [R(x[0]), x[1] === 'fin' ? tr.esc.b : R(x[1]), x[2]]),
        prom: r.prom != null ? R(r.prom) : null, gancho: r.gancho != null ? R(r.gancho) : null, prueba: r.prueba != null ? R(r.prueba) : null,
        sube: r.sube != null ? R(r.sube) : tr.esc.a + .6 };
      if (tr.rv.gancho != null) sfx(tr.rv.gancho - .1, 'ping', { vol: .5 });
      if (tr.rv.prueba != null) sfx(tr.rv.prueba - .1, 'notificacion', { vol: .5 });
      tr.rv.res.forEach(x => sfx(x[0] - .05, 'pop', { vol: .4 }));
    }
    if (tr.estado) { tr.es = { filas: tr.estado.filas.map(R), apelar: tr.estado.apelar != null ? R(tr.estado.apelar) : null };
      tr.es.filas.forEach(x => sfx(x, 'tick', { vol: .45 })); if (tr.es.apelar) sfx(tr.es.apelar, 'pop', { vol: .5 }); }
    if (tr.contar) tr.cont = tr.contar.map(R);
  });
  for (const k in rev) if (k !== 'grid' && k !== 'stats' && k !== 'botones') sfx(rev[k] - .05, 'pop', { vol: .4 });
  links.sort((a, b) => a[0] - b[0]);
  links.forEach(l => sfx(l[0], l[2] === 'mal' ? 'fallo' : 'brillo', { vol: .5 }));
  // grupos de tramos seguidos (el celular no sale entre escenas pegadas)
  const grupos = [];
  tramos.forEach(tr => { const g = grupos[grupos.length - 1]; if (g && Math.abs(g.b - tr.esc.a) < .3) { g.b = tr.esc.b; g.tr.push(tr); } else grupos.push({ a: tr.esc.a, b: tr.esc.b, tr: [tr] }); });
  sfx(grupos[0].a + .1, 'aire', { vol: .4 });
  let imgReel = null;
  return { el, pintar(t) {
    const g = grupos.find(g => t >= g.a - .02 && t < g.b + .02);
    if (!g) { off(el); return; }
    const i = g.tr.findIndex(tr => t >= tr.esc.a - .02 && t < tr.esc.b + .02), tr = g.tr[Math.max(0, i)], prev = i > 0 ? g.tr[i - 1] : null;
    const pe = P(t, g.a + .08, .65, E.out4), qs = P(t, g.b - .45, .4, E.in3);
    const x0 = tr.x ?? XL, xp = prev ? (prev.x ?? XL) : x0, mv = P(t, tr.esc.a, .6, E.io3);
    put(el, { x: lerp(xp, x0, mv) - (1 - pe) * 140, y: CY + 6 + flota(t, 2, 4), s: lerp(.9, 1, pe) * (1 - .05 * qs), o: clamp(pe * 1.6) * (1 - qs), b: (1 - pe) * 10 + qs * 10 });
    // pantalla activa (fundido si cambia de modo)
    for (const m in PG) {
      let o = m === tr.modo ? 1 : 0;
      if (prev && prev.modo !== tr.modo) { const f = P(t, tr.esc.a, .45, E.io3); o = m === tr.modo ? f : m === prev.modo ? 1 - f : 0; }
      PG[m].style.opacity = o.toFixed(3);
    }
    if (tr.modo === 'perfil' || (prev && prev.modo === 'perfil')) pintarPerfil(t, tr);
    if (tr.modo === 'reel') pintarReel(t, tr);
    if (tr.modo === 'estado') pintarEstado(t, tr);
  } };

  function pintarPerfil(t, tr) {
    const on = new Set((tr.res || []).filter(r => t >= r[0] && t < r[1]).map(r => r[2]));
    partes.forEach(pe => {
      const n = pe.dataset.p, r = rev[n], vis = r == null || t >= r - .05;
      if (n !== 'etiqueta') pe.classList.toggle('sk', !vis);
      pe.classList.toggle('on', vis && on.has(n));
      pe.style.transform = r != null ? `scale(${(1 + .05 * bump(t, r - .05, .4)).toFixed(4)})` : '';
    });
    const R0 = k => rev[k] ?? -99;
    escribir(q('.perfil .u'), p.usuario, t, R0('usuario'), R0('usuario') + .55);
    escribir(q('.perfil .nm'), p.nombre, t, R0('nombre'), R0('nombre') + .7);
    qa('.perfil .bio p').forEach((el2, k) => escribir(el2, p.bio[k], t, R0('bio') + k * .55, R0('bio') + k * .55 + .5));
    const L = links.filter(l => t >= l[0]).pop(), lk = q('.perfil .lk');
    lk.classList.toggle('sk', !L && rev.link != null && t < rev.link - .05);
    lk.classList.toggle('mal', !!L && L[2] === 'mal'); lk.classList.toggle('bien', !!L && L[2] === 'bien');
    escribir(lk.querySelector('span'), L ? L[1] : '', t, L ? L[0] : 0, L ? L[0] + .5 : 1);
    if (!L && rev.link == null) lk.style.display = 'none'; else lk.style.display = '';
    const ai = q('.perfil .ai'), pa = rev.etiqueta != null ? P(t, rev.etiqueta - .1, .45, E.out3) : 0;
    ai.style.height = (26 * pa).toFixed(1) + 'px'; ai.style.opacity = pa.toFixed(3);
    if (tr.cont) { const v = lerp(320, p.seg, P(t, tr.cont[0], Math.max(.5, tr.cont[1] - tr.cont[0]), E.io3)); const ns = q('.nseg'), tx = milK(v); if (ns._t !== tx) { ns._t = tx; ns.textContent = tx; } }
  }
  function pintarReel(t, tr) {
    const r = tr.rv, im = q('.reel .rv img.fg');
    if (imgReel !== (r.clip || r.img)) { imgReel = r.clip || r.img;                 // clip = video real de la modelo (cuadros JPG)
      if (!r.clip) im.src = IMG(r.img);
      q('.reel .rv img.bgb').src = r.clip ? fotoClip(r.clip, 1) : IMG(r.img); q('.reel .rv').classList.toggle('ct', !!r.contener);   // contener: foto chica completa sobre su fondo desenfocado
      q('.reel .ru img').src = IMG(r.avatar || r.img); q('.reel .cu').textContent = r.cuenta; q('.reel .rc').textContent = r.texto || ''; }
    if (r.clip) verClipBucle(im, r.clip, t, tr.esc.a);
    const k = clamp((t - tr.esc.a) / Math.max(1, tr.esc.b - tr.esc.a));
    im.style.transform = `scale(${(1.12 - .1 * k).toFixed(4)})`;
    q('.reel .rb i').style.width = (((t - tr.esc.a) % 9) / 9 * 100).toFixed(1) + '%';
    const sube = P(t, r.sube, 3.2, E.out3), on = new Set(r.res.filter(x => t >= x[0] && t < x[1]).map(x => x[2]));
    qa('.reel .rx div').forEach(d => {
      const n = d.dataset.r, v = (r.n?.[n] || 0) * sube, tx = milK(v), sp = d.querySelector('span');
      if (sp._t !== tx) { sp._t = tx; sp.textContent = tx; }
      d.classList.toggle('on', on.has(n));
      const pk = r.res.filter(x => x[2] === n).map(x => bump(t, x[0], .4)).reduce((a, b) => Math.max(a, b), 0);
      d.style.transform = `scale(${(1 + .18 * pk).toFixed(3)})`;
    });
    const vv = q('.reel .vv'), tv = milK((r.vistas || 0) * sube); if (vv._t !== tv) { vv._t = tv; vv.textContent = tv; }
    q('.reel .rprom').style.opacity = r.prom != null ? P(t, r.prom - .2, .4).toFixed(3) : 0;
    const rp = q('.reel .rp'); rp.style.opacity = r.prueba != null ? P(t, r.prueba - .2, .4).toFixed(3) : 0;
    q('.reel .rvw').style.opacity = r.prueba != null && t >= r.prueba - .2 ? 0 : 1;
    const rg = q('.reel .rg'), og = r.gancho != null ? Math.min(P(t, r.gancho - .2, .3), 1 - P(t, r.gancho + 2.6, .4)) : 0;
    rg.style.opacity = og.toFixed(3); rg.style.transform = `scale(${(1 + .06 * Math.sin(t * 9) * og).toFixed(3)})`;
  }
  function pintarEstado(t, tr) {
    const e = tr.es, filas = qa('.estado .ef');
    filas.forEach((f, k) => {
      const tf = e.filas[k], nx = k < e.filas.length - 1 ? e.filas[k + 1] : tr.esc.b;
      const p2 = P(t, tf - .15, .35);
      f.style.opacity = (.25 + .75 * p2).toFixed(3);
      f.querySelector('i').style.transform = `scale(${E.back(clamp(P(t, tf, .4, x => x))).toFixed(3)})`;
      f.classList.toggle('on', t >= tf - .1 && t < nx - .1 && e.apelar == null || (t >= tf - .1 && t < nx - .1 && t < (e.apelar ?? 1e9) - .1));
    });
    const b = q('.estado .eb'); if (e.apelar != null) { const pb = P(t, e.apelar - .2, .45, E.back); b.style.opacity = clamp(pb * 2).toFixed(3); b.style.transform = `scale(${lerp(.6, 1, pb).toFixed(3)})`; b.classList.toggle('on', t >= e.apelar); }
  }
}

/* ---------- visuales a la izquierda (vis) ---------- */
const VISUALES = [];
const VIS_TIPOS = {};
function entVis(el, esc, t, x, y) {
  const { a, b } = esc;
  if (t < a - .05 || t > b + .05) { off(el); return 0; }
  const p = P(t, a + .1, .7, E.out4), q = P(t, b - .45, .4, E.in3);
  put(el, { x: x - (1 - p) * 90, y: y + flota(t, 1, 4), s: lerp(.92, 1, p) * (1 - .04 * q), o: clamp(p * 1.8) * (1 - q), b: (1 - p) * 12 + q * 10 });
  return p;
}
/* metadata: foto con la etiqueta «Hecho con IA» y un escaneo que revela la marca invisible */
VIS_TIPOS.metadata = (esc, v, P0) => {
  const lines = ['<c2pa:manifest>', 'digitalSourceType:', '  trainedAlgorithmicMedia', 'generado_con_ia: true'];
  const el = mk('div', 'L vmd z5', WORLDF, `<div class="ph"><img alt="" src="${IMG(v.img)}"><i class="scan"></i><div class="code">${lines.map(() => '<p></p>').join('')}</div></div>` +
    `<div class="lab">${icon('sparkles', 24, 2.4)}Hecho con IA</div>`);
  const tE = A(v.etiqueta, P0), tS = A(v.scan, P0);
  sfx(tE - .1, 'notificacion', { vol: .5 }); sfx(tS, 'subida', { vol: .4 }); sfx(tS + 1.3, 'tecleo', { vol: .35 });
  return { pintar(t) {
    if (!entVis(el, esc, t, XL, 590)) return;
    const lab = el.querySelector('.lab'), pl = P(t, tE - .2, .45, E.back);
    lab.style.opacity = clamp(pl * 2).toFixed(3); lab.style.transform = `translateX(-50%) scale(${lerp(.6, 1, pl).toFixed(3)})`;
    const sc = el.querySelector('.scan'), ps = clamp((t - tS) / 1.3);
    sc.style.opacity = (t >= tS && ps < 1 ? 1 : 0); sc.style.top = (ps * 560 - 120).toFixed(1) + 'px';
    const cd = el.querySelector('.code'); cd.style.opacity = P(t, tS + 1.1, .4).toFixed(3);
    [...cd.children].forEach((pp, k) => escribir(pp, lines[k], t, tS + 1.3 + k * .55, tS + 1.3 + k * .55 + .5));
  } };
};
/* carrusel: publicacion de varias fotos de un mismo dia que se desliza sola */
VIS_TIPOS.carrusel = (esc, v) => {
  const n = v.fotos.length;
  const el = mk('div', 'L vpc z5', WORLDF, `<div class="vh"><i><img alt="" src="${IMG(PERFIL.avatar)}"></i><div>${PERFIL.usuario}<small>Miami, Florida</small></div></div>` +
    `<div class="vim"><div class="vtr">${v.fotos.map(f => `<img alt="" src="${IMG(f)}">`).join('')}</div><span class="vn">1/${n}</span></div>` +
    `<div class="va">${SVG_CORAZON}${icon('messageSquare', 34, 2)}${icon('send', 34, 2)}<span class="dd">${v.fotos.map(() => '<i></i>').join('')}</span>${SVG_GUARDAR}</div>` +
    `<div class="vc"><b>${PERFIL.usuario}</b> ${v.texto || ''}</div>`);
  const paso = v.paso || 2.6, t0 = esc.a + 1.4;
  for (let k = 1; k < n * 3; k++) { const tk = t0 + k * paso; if (tk < esc.b - .5) sfx(tk, 'aire', { vol: .25 }); }
  return { pintar(t) {
    if (!entVis(el, esc, t, XL, 560)) return;
    const k = Math.max(0, (t - t0) / paso), i0 = Math.floor(k), f = E.io3(clamp((k - i0) / .25));
    const pos = (i0 % n) + (i0 % n === n - 1 ? -f * (n - 1) : f), idx = Math.round(pos) % n;
    el.querySelector('.vtr').style.transform = `translateX(${(-pos * 440).toFixed(1)}px)`;
    const nn = el.querySelector('.vn'), tx = `${idx + 1}/${n}`; if (nn._t !== tx) { nn._t = tx; nn.textContent = tx; }
    el.querySelectorAll('.dd i').forEach((d, j) => d.classList.toggle('on', j === idx));
  } };
};
/* buscar: buscador de Instagram que escribe palabras clave y muestra perfiles */
VIS_TIPOS.buscar = (esc, v, P0) => {
  const rs = v.resultados;
  const el = mk('div', 'L vbs z5', WORLDF, `<div class="sbar">${icon('search', 30, 2.4)}<span class="q"></span><i class="cur"></i></div>` +
    rs.map(r => `<div class="rw"><i>${r[0] ? `<img alt="" src="${IMG(r[0])}">` : `<span style="display:flex;width:100%;height:100%;align-items:center;justify-content:center;background:#2a2a30;font:800 26px var(--sans);color:#fff">${r[1][0].toUpperCase()}</span>`}</i>` +
      `<div><b>${r[1]}</b><small>${r[2]}</small></div></div>`).join(''));     // sin foto = otra cuenta: inicial, nunca la cara de otra mujer
  const tq = A(v.escribe, P0), dq = .9;
  sfx(tq, 'tecleo', { vol: .4 }); rs.forEach((_, k) => sfx(tq + dq + .2 + k * .3, 'tick', { vol: .35 }));
  return { pintar(t) {
    if (!entVis(el, esc, t, XL, 540)) return;
    escribir(el.querySelector('.q'), v.texto, t, tq, tq + dq);
    el.querySelector('.cur').style.opacity = blink(t, 1.6) && t < tq + dq + 1 ? 1 : 0;
    el.querySelectorAll('.rw').forEach((r, k) => { const pr = P(t, tq + dq + .2 + k * .3, .4); r.style.opacity = pr.toFixed(3); r.style.transform = `translateY(${((1 - pr) * 20).toFixed(1)}px)`; r.classList.toggle('on', k === 0 && t >= tq + dq + 1.2); });
  } };
};
/* marca: un reel con marca de agua, texto, borde y velocidad (NO ORIGINAL) que luego queda limpio (ORIGINAL) */
VIS_TIPOS.marca = (esc, v, P0) => {
  const el = mk('div', 'L vmr z5', WORLDF, `<div class="fr"><img class="b" alt="" src="${IMG(v.img)}"><i class="bd"></i>` +
    `<div class="wm">${logo('tiktok', 34)}<span>@otra.cuenta</span></div><div class="tx">TEXTO NUEVO</div><div class="vl">1.5x</div></div>` +
    `<div class="stp no">NO ORIGINAL</div><div class="stp si">ORIGINAL</div>`);
  const T = k => v[k] != null ? A(v[k], P0) : null;
  const tm = T('marca'), tt = T('texto'), tb = T('borde'), tv = T('acelerar'), tl = T('limpia');
  [tm, tt, tb, tv].forEach(x => x != null && sfx(x - .1, 'pop', { vol: .4 })); if (tm != null) sfx(tm + .5, 'fallo', { vol: .5 }); if (tl != null) sfx(tl, 'brillo', { vol: .6 });
  return { pintar(t) {
    if (!entVis(el, esc, t, XL, 520)) return;
    const lim = tl != null ? P(t, tl - .2, .4) : 0, ap = (x) => x != null ? P(t, x - .2, .35) * (1 - lim) : 0;
    const wm = el.querySelector('.wm'), k = (t * .35) % 1;
    wm.style.opacity = ap(tm).toFixed(3); wm.style.left = (k < .5 ? 24 : 170) + 'px'; wm.style.top = (k < .5 ? 60 : 500) + 'px';
    el.querySelector('.tx').style.opacity = ap(tt).toFixed(3);
    el.querySelector('.bd').style.opacity = ap(tb).toFixed(3);
    el.querySelector('.vl').style.opacity = ap(tv).toFixed(3);
    const no = el.querySelector('.stp.no'), si = el.querySelector('.stp.si'), pn = tm != null ? P(t, tm + .4, .4, E.back) * (1 - lim) : 0, psi = P(t, tl ?? 1e9, .45, E.back);
    no.style.opacity = clamp(pn * 2).toFixed(3); no.style.transform = `translateX(-50%) rotate(-6deg) scale(${lerp(1.6, 1, pn).toFixed(3)})`;
    si.style.opacity = clamp(psi * 2).toFixed(3); si.style.transform = `translateX(-50%) rotate(-6deg) scale(${lerp(1.6, 1, psi).toFixed(3)})`;
    el.querySelector('.fr').style.borderColor = lim > .5 ? '#5be38d' : t >= (tm ?? 1e9) + .4 ? '#ff4d5e' : 'rgba(255,255,255,.85)';
  } };
};

/* ---------- escenas a medida ---------- */
/* unaCuenta: 3 cuentas conectadas -> una cae y arrastra a las otras -> una sola cuenta cuidada.
   at: { tres, ch0..ch3 (celular, internet, correo, uso), sancion, caen, una, energia } */
ESC_TIPOS.unaCuenta = s => {
  const P0 = s.t[0], at = k => A(s.at[k], P0);
  const NOM = ['Principal', 'Reels', 'Desechable'], CH = [['smartphone', 'Celular'], ['globe', 'Internet'], ['mail', 'Correo'], ['gauge', 'Cómo la usas']];
  const xs = [520, 960, 1400];
  const e = escenaT(s.t[0], s.t[1], H.tit('Antes:', '3 cuentas', 'c') + H.tit('Hoy:', 'una sola cuenta', 'c') +
    NOM.map(n => `<div class="L cta"><div class="cav"><img alt="" src="${IMG(PERFIL.avatar)}"></div><b>${n}</b><i class="sel">${icon('x', 30, 3)}</i><i class="okb">${icon('shieldCheck', 30, 2.6)}</i></div>`).join('') +
    '<div class="L clin"></div><div class="L clin"></div>' + CH.map(c => `<div class="L tag3" style="--c:${NEON.b}">${icon(c[0], 28, 2.4)}${c[1]}</div>`).join('') +
    `<div class="L sanc">SANCIÓN</div><div class="L tag3" style="--c:${NEON.v}">${icon('shieldCheck', 30, 2.4)}Toda tu energía va ahí</div>`, (t, { a }) => {
    const [t1, t2, c0, c1, c2, l0, l1, ...r] = e.$, chips = r.slice(0, 4), [sanc, pill] = r.slice(4);
    const tTres = at('tres'), tCh = CH.map((_, i) => at('ch' + i)), tS = at('sancion'), tC = at('caen'), tU = at('una'), tE = at('energia');
    fitW(t1, 1500); fitW(t2, 1500);
    ent(t1, t, a + .15, CX, 160, { s0: .85, t1: tU - .35 });
    ent(t2, t, tU, CX, 160, { s0: .85 });
    const junta = P(t, tU, .9, E.io3);
    [c0, c1, c2].forEach((c, i) => {
      const pe = P(t, tTres + i * .4 - .3, .5, E.back), tr = i === 0 ? tS : tC + .3 * (i - 1), rojo = t >= tr && t < tU;
      c.classList.toggle('mal', rojo); c.classList.toggle('ok', i === 0 && t >= tU + .4);
      const sh = rojo ? 7 * Math.sin(t * 46) * bump(t, tr, .5) : 0;
      if (i === 0) put(c, { x: lerp(xs[0], CX, junta) + sh, y: lerp(450, 500, junta), s: lerp(.5, 1, pe) * lerp(1, 1.4, junta), o: clamp(pe * 2) });
      else put(c, { x: lerp(xs[i], CX, junta) + sh, y: 450 + (rojo ? 14 * P(t, tr, .5) : 0), s: lerp(.5, 1, pe) * (1 - .45 * junta), o: clamp(pe * 2) * (rojo ? .55 : 1) * (1 - junta) });
    });
    [l0, l1].forEach((l, i) => {
      const p = P(t, tCh[0] - .3, .6, E.io3) * (1 - junta);
      if (p <= .002) { off(l); return; }
      put(l, { x: xs[i] + 100, y: 450, ax: 0, ay: 50, o: 1 }); l.style.width = ((xs[1] - xs[0] - 200) * p).toFixed(1) + 'px';
      l.classList.toggle('mal', t >= tC + .3 * i && t < tU);
    });
    chips.forEach((c, i) => ent(c, t, tCh[i] - .25, 300 + i * 440, 760, { ease: E.back, s0: .6, dy: 0, t1: tU - .3 }));
    ent(sanc, t, tS - .1, xs[0], 250, { ease: E.back, s0: 1.8, dy: 0, r: -8, t1: tU - .3 });
    ent(pill, t, tE - .3, CX, 830, { ease: E.back, s0: .6, dy: 0 });
  });
  [0, 1, 2].forEach(i => sfx(at('tres') + i * .4 - .3, 'pop', { vol: .45 }));
  [0, 1, 2, 3].forEach(i => sfx(at('ch' + i) - .25, 'tick', { vol: .4 }));
  sfx(at('sancion') - .1, 'fallo', { vol: .7 }); sfx(at('caen'), 'glitch', { vol: .5 }); sfx(at('una'), 'golpe', { vol: .7 }); sfx(at('energia') - .3, 'brillo', { vol: .5 });
  return e;
};
/* caminos: 1 declararlo  vs  2 limpiar la metadata (imagenes / videos / verificar). at: { uno, dos, img, vid, ver } */
ESC_TIPOS.caminos = s => {
  const P0 = s.t[0], at = k => A(s.at[k], P0);
  const F = [['image', 'Imágenes', 'Limpiar Metadata · IA HUB', 'Herramientas locales · bot de Telegram: <b>clean</b>', 'img'],
    ['video', 'Videos', 'cloudinary.com/tools/remove-metadata-from-video', 'Quita la metadata del video', 'vid'],
    ['search', 'Verifica', 'contentcredentials.org/verify', 'Que el archivo ya salga limpio', 'ver']];
  const e = escenaT(s.t[0], s.t[1], H.tit('Dos', 'caminos', 'c') +
    `<div class="L cam v"><div class="ch"><span>1</span>DECLARARLO</div><div class="cb">${neo('shieldCheck', 'v', 110, '', true)}` +
    `<p>Activa la etiqueta<br><b>creador de contenido con IA</b></p><small>Como en la clase 1 · tu cuenta no pierde alcance</small></div></div>` +
    `<div class="L cam o"><div class="ch"><span>2</span>LIMPIAR LA METADATA</div>${F.map(f => `<div class="cf"><i>${icon(f[0], 32, 2.2)}</i><div><em>${f[1]}</em>` +
    `<b class="${f[4] === 'img' ? '' : 'url'}">${f[2]}</b><small>${f[3]}</small></div></div>`).join('')}</div>`, (t, { a }) => {
    const [tit, c1, c2] = e.$;
    fitW(tit, 1500); ent(tit, t, a + .15, CX, 150, { s0: .85 });
    const t1 = at('uno'), t2 = at('dos'), ts = F.map(f => at(f[4]));
    ent(c1, t, t1 - .3, 450, 600, { ease: E.back, s0: .7 });
    ent(c2, t, t2 - .3, 1330, 600, { ease: E.back, s0: .7 });
    c1.classList.toggle('on', t >= t1 && t < t2);
    [...c2.querySelectorAll('.cf')].forEach((f, k) => {
      const pf = P(t, ts[k] - .25, .4); f.style.opacity = pf.toFixed(3); f.style.transform = `translateX(${((1 - pf) * 30).toFixed(1)}px)`;
      f.classList.toggle('on', t >= ts[k] - .1 && (k === F.length - 1 || t < ts[k + 1] - .1));
      const b = f.querySelector('b'); fitW(b, 700);
    });
  });
  sfx(at('uno') - .3, 'pop', { vol: .5 }); sfx(at('dos') - .3, 'pop', { vol: .5 }); F.forEach(f => sfx(at(f[4]) - .25, 'tick', { vol: .45 }));
  return e;
};
/* linkDer (derecha, junto al celular): links directos tachados -> link secundario -> pagina limpia.
   at: { fv, of, tg, restr, lt, flujo, pagina, sinfotos, botones, lista, despues } */
ESC_TIPOS.linkDer = s => {
  const P0 = s.t[0], at = k => A(s.at[k], P0), X = XZ;
  const MAL = [['fanvue', 'fanvue.com/rubylane', 'fv'], ['onlyfans', 'onlyfans.com/rubylane', 'of'], ['telegram', 't.me/rubyprivado', 'tg']];
  const e = escenaT(s.t[0], s.t[1], H.tit('El link', 'de tu bio', 'c') +
    MAL.map(m => `<div class="L mlk"><span class="lgx">${logo(m[0], 40)}</span><b>${m[1]}</b><i>${icon('x', 30, 3)}</i></div>`).join('') +
    `<div class="L tag3" style="--c:${NEON.r}">${icon('triangleAlert', 28, 2.4)}Alcance bajo o cuenta restringida</div>` +
    `<div class="L flt"><div class="tile2">${logo('linktree', 84)}</div><span>Linktree · link.me</span></div>` + H.flecha('arrowRight', 80) +
    `<div class="L flt"><div class="tile2">${logo('telegram', 80)}</div><span>Telegram</span></div><div class="L flt"><div class="tile2">${logo('fanvue', 80)}</div><span>Fanvue</span></div>` +
    `<div class="L lmk"><i><img alt="" src="${IMG(PERFIL.avatar)}"></i><b>Ruby Lane</b><small>linktr.ee/rubylane</small><span>Contenido exclusivo</span><span>Mi canal privado</span><span>Mi Instagram</span></div>` +
    `<div class="L tag3" style="--c:${NEON.b}">${icon('search', 28, 2.4)}Instagram también la revisa</div>` +
    `<div class="L tag3" style="--c:${NEON.v}">${icon('check', 28, 3)}Sin fotos explícitas</div><div class="L tag3" style="--c:${NEON.v}">${icon('check', 28, 3)}Botones de nombre suave</div>` +
    `<div class="L tag3" style="--c:${NEON.o}">${icon('listChecks', 28, 2.4)}La lista de páginas está en el módulo de Telegram</div>` +
    `<div class="L tag3" style="--c:${NEON.a}">${icon('clock', 28, 2.4)}Ponlo cuando tu cuenta ya esté calentada</div>`, (t, { a }) => {
    const [tit, m0, m1, m2, restr, flt, fl, ftg, ffv, lmk, g1, g2, g3, pl1, pl2] = e.$;
    fitW(tit, ZW); ent(tit, t, a + .15, X, 170, { s0: .85 });
    const tLt = at('lt'), tFl = at('flujo'), tPg = at('pagina'), tLi = at('lista'), tDe = at('despues');
    [m0, m1, m2].forEach((m, k) => ent(m, t, at(MAL[k][2]) - .25, X, 360 + k * 118, { dx: 50, dy: 0, t1: tLt - .3 }));
    ent(restr, t, at('restr') - .3, X, 740, { ease: E.back, s0: .6, dy: 0, t1: tLt - .3 });
    ent(flt, t, tLt - .25, X - 300, 480, { ease: E.back, s0: .5, dy: 0, t1: tPg - .3 }); flt.classList.toggle('on', t >= tLt);
    ent(fl, t, tFl - .3, X - 60, 460, { dx: -40, dy: 0, t1: tPg - .3 });
    ent(ftg, t, tFl - .1, X + 230, 360, { ease: E.back, s0: .5, dy: 0, t1: tPg - .3 });
    ent(ffv, t, tFl + .15, X + 230, 590, { ease: E.back, s0: .5, dy: 0, t1: tPg - .3 });
    const pm = ent(lmk, t, tPg - .25, X - 210, 590, { s0: .85, t1: tLi - .3 });
    [...lmk.querySelectorAll('span')].forEach((b, k) => { const pb = P(t, tPg + .3 + k * .25, .35, E.back); b.style.opacity = clamp(pb * 2).toFixed(3); b.style.transform = `scale(${lerp(.7, 1, pb).toFixed(3)})`; });
    [g1, g2, g3].forEach((g, k) => { const tg = at(['revisa', 'sinfotos', 'botones'][k]); fitW(g, 470); ent(g, t, tg - .25, X + 250, 470 + k * 105, { dx: 40, dy: 0, t1: tLi - .3 }); });
    fitW(pl1, ZW); fitW(pl2, ZW);
    ent(pl1, t, tLi - .2, X, 560, { ease: E.back, s0: .6, dy: 0, t1: tDe - .3 });
    ent(pl2, t, tDe - .2, X, 560, { ease: E.back, s0: .6, dy: 0 });
    if (pm <= 0) off(lmk);
  });
  MAL.forEach(m => sfx(at(m[2]) - .25, 'descarte', { vol: .45 })); sfx(at('restr') - .3, 'fallo', { vol: .5 });
  sfx(at('lt') - .25, 'pop', { vol: .5 }); sfx(at('flujo') - .1, 'barrido', { vol: .4 }); sfx(at('pagina') - .25, 'aire', { vol: .5 });
  ['revisa', 'sinfotos', 'botones'].forEach(k => sfx(at(k) - .25, 'tick', { vol: .4 })); sfx(at('lista') - .2, 'pop', { vol: .45 }); sfx(at('despues') - .2, 'pop', { vol: .45 });
  return e;
};
/* leyenda (derecha): texto de una publicacion con palabras clave que se encienden + hashtags (3 a 5 max).
   { tit, texto con [[palabra|ancla]], hashtags:[...], hAt, maxAt } */
ESC_TIPOS.leyenda = s => {
  const P0 = s.t[0], X = XZ, claves = [];
  const txt = s.texto.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, (_, w, an) => { claves.push(an); return `<em>${w}</em>`; });
  const e = escenaT(s.t[0], s.t[1], H.tit(s.tit[0], s.tit[1], 'c') +
    `<div class="L cap2"><div class="cu"><i><img alt="" src="${IMG(PERFIL.avatar)}"></i>${PERFIL.usuario}</div><p>${txt}</p></div>` +
    `<div class="L hsh">${s.hashtags.map(h => `<span>${h}</span>`).join('')}<b>3 a 5 máx.</b></div>`, (t, { a }) => {
    const [tit, cap, hs] = e.$;
    fitW(tit, ZW); ent(tit, t, a + .15, X, 190, { s0: .85 });
    ent(cap, t, A(s.capAt, P0) - .3, X, 480, { s0: .9 });
    const ems = [...cap.querySelectorAll('em')];
    ems.forEach((m, k) => m.classList.toggle('on', t >= A(claves[k], P0) - .1));
    const th = A(s.hAt, P0), tm = A(s.maxAt, P0);
    ent(hs, t, th - .3, X, 760, { dy: 20 });
    [...hs.querySelectorAll('span')].forEach((h, k) => { const ph = P(t, th + k * .2, .35, E.back); h.style.opacity = clamp(ph * 2).toFixed(3); h.style.transform = `scale(${lerp(.6, 1, ph).toFixed(3)})`; });
    const mx = hs.querySelector('b'), pm = P(t, tm - .2, .4, E.back); mx.style.opacity = clamp(pm * 2).toFixed(3); mx.style.transform = `scale(${lerp(.6, 1, pm).toFixed(3)})`;
  });
  claves.forEach(c => sfx(A(c, P0) - .1, 'tick', { vol: .4 })); sfx(A(s.hAt, P0) - .3, 'pop', { vol: .4 }); sfx(A(s.maxAt, P0) - .2, 'golpe-corto', { vol: .5 });
  return e;
};
/* redes: una tarjeta por red (logo oficial + reglas que se encienden) y el mismo link secundario en todas.
   { tit, redes:[{ slug, nombre, at, reglas:[[txt, at, ok]] }], pie:{ txt, at } } */
ESC_TIPOS.redes = s => {
  const P0 = s.t[0], R = s.redes, n = R.length, gap = 500;
  const e = escenaT(s.t[0], s.t[1], H.tit(s.tit[0], s.tit[1], 'c') +
    R.map(r => `<div class="L rdc"><div class="rh"><div class="tile2">${logo(r.slug, 56)}</div><b>${r.nombre}</b></div>` +
      r.reglas.map(g => `<div class="rr"><i class="${g[2] === false ? 'no' : ''}">${icon(g[2] === false ? 'x' : 'check', 22, 3)}</i><span>${g[0]}</span></div>`).join('') + '</div>').join('') +
    `<div class="L tag3" style="--c:${NEON.v}">${logo('linktree', 34)}${s.pie.txt}</div>`, (t, { a }) => {
    const [tit, ...r] = e.$, cards = r.slice(0, n), pie = r[n];
    fitW(tit, 1500); ent(tit, t, a + .15, CX, 150, { s0: .85 });
    cards.forEach((c, i) => {
      const tc = A(R[i].at, P0), tn = i < n - 1 ? A(R[i + 1].at, P0) : A(s.pie.at, P0);
      ent(c, t, tc - .3, CX + (i - (n - 1) / 2) * gap, 560, { ease: E.back, s0: .7 });
      c.classList.toggle('on', t >= tc && t < tn);
      [...c.querySelectorAll('.rr')].forEach((g, k) => { const tg = A(R[i].reglas[k][1], P0), pg = P(t, tg - .25, .35); g.style.opacity = pg.toFixed(3); g.classList.toggle('on', t >= tg - .1); });
    });
    fitW(pie, 1500); ent(pie, t, A(s.pie.at, P0) - .3, CX, 930, { ease: E.back, s0: .6, dy: 0 });
  });
  R.forEach(r => { sfx(A(r.at, P0) - .3, 'pop', { vol: .45 }); r.reglas.forEach(g => sfx(A(g[1], P0) - .25, 'tick', { vol: .35 })); });
  sfx(A(s.pie.at, P0) - .3, 'brillo', { vol: .5 });
  return e;
};
/* calendario: barra de 30+ dias con el dia que avanza + tarjeta de la fase con lo que se hace (se enciende con la voz).
   { fases:[{ desde, lab, chip, tit, dias:[d0, d1], items:[[ico, txt, at, no?]] }] } */
ESC_TIPOS.calendario = s => {
  const P0 = s.t[0], F = s.fases.map(f => ({ ...f, a0: A(f.desde, P0) })), n = F.length, W = 1440, SW = W / n;
  const e = escenaT(s.t[0], s.t[1], `<div class="L cal"><i class="trk"></i><i class="fil"></i>${F.map((f, i) => `<span class="sg2" style="left:${i * SW}px;width:${SW}px">${f.lab}</span>`).join('')}` +
    F.slice(1).map((f, i) => `<i class="tk" style="left:${(i + 1) * SW}px"></i>`).join('') + `<i class="dot"><b>DÍA 1</b></i></div>` +
    F.map(f => `<div class="L cfz"><div class="phd"><span class="pn">${f.chip}</span><span class="pt">${f.tit}</span></div>` +
      `<div class="cfi">${f.items.map(it => `<div class="it${it[3] ? ' no' : ''}"><i>${icon(it[0], 32, 2.2)}</i><span>${it[1]}</span></div>`).join('')}</div></div>`).join(''), (t, { a, b }) => {
    const [cal, ...cards] = e.$;
    ent(cal, t, a + .1, CX, 175, { dy: -20 });
    let k = 0; F.forEach((f, i) => { if (t >= f.a0 - .1) k = i; });
    const f = F[k], fin = k < n - 1 ? F[k + 1].a0 : b, pr = E.io3(clamp((t - f.a0) / Math.max(1, fin - f.a0 - .8)));
    const xf = (k + pr) * SW;
    cal.querySelector('.fil').style.width = Math.max(0, xf).toFixed(1) + 'px';
    const dot = cal.querySelector('.dot'); dot.style.left = xf.toFixed(1) + 'px';
    const dia = Math.round(lerp(f.dias[0], f.dias[1], pr)), lab = f.dias[0] >= 30 ? 'DÍA 30+' : `DÍA ${dia}`, db = dot.querySelector('b');
    if (db._t !== lab) { db._t = lab; db.textContent = lab; }
    cal.querySelectorAll('.sg2').forEach((sg, i) => { sg.classList.toggle('on', i === k); sg.classList.toggle('ok', i < k); });
    cards.forEach((c, i) => {
      const fi = F[i], t1 = i < n - 1 ? F[i + 1].a0 - .3 : null;
      ent(c, t, fi.a0 - .15, CX, 640, { s0: .92, dy: 40, t1 });
      const hd = c.querySelector('.phd'); fitW(hd, 1150);
      const its = [...c.querySelectorAll('.it')];
      its.forEach((it, j) => {
        const ti = A(fi.items[j][2], P0), tn = j < its.length - 1 ? A(fi.items[j + 1][2], P0) : (t1 ?? b) + 1;
        const p2 = P(t, ti - .25, .35); it.style.opacity = p2.toFixed(3); it.style.transform = `translateY(${((1 - p2) * 18).toFixed(1)}px)`;
        it.classList.toggle('on', t >= ti - .1 && t < tn - .1); it.classList.toggle('ok', t >= tn - .1);
      });
    });
  });
  F.forEach(f => { sfx(f.a0, 'barrido', { vol: .45 }); f.items.forEach(it => sfx(A(it[2], P0) - .25, 'tick', { vol: .4 })); });
  return e;
};
/* clonar: reel viral -> Wan Video / Genjutsu / MiniMax -> tu reel; luego cambia ropa/lugar/musica y repite hasta 5 veces.
   at: { inicio, wan, genj, mini, cambia, cien } */
ESC_TIPOS.clonar = s => {
  const P0 = s.t[0], at = k => A(s.at[k], P0);
  const M = [['workflow', 'Wan Video', 'Copia el movimiento y pone a tu modelo', 'wan'], ['sparkles', 'Genjutsu', 'Recrea el video con tu personaje', 'genj'],
    ['wandSparkles', 'MiniMax', 'Tus videos desde cero: foto + prompt', 'mini']];
  const e = escenaT(s.t[0], s.t[1], H.tit('Clona el', 'viral', 'c') +
    `<div class="L rcd"><img alt="" src="${IMG(s.ref)}"><span class="fl">REEL VIRAL</span></div>` +
    `<div class="L rcd"><div class="q">?</div><img alt="" src="${IMG(s.tuyo)}"><span class="fl">TU MODELO</span></div>` +
    M.map(m => `<div class="L mtc"><i>${icon(m[0], 44, 2.2)}</i><div><b>${m[1]}</b><small>${m[2]}</small></div></div>`).join('') +
    '<div class="L flj"></div><div class="L flj"></div><div class="L pkt"></div>' +
    `<div class="L tag3" style="--c:${NEON.o}">${icon('refreshCw', 28, 2.4)}Cambia la ropa, el lugar y la música</div>` +
    `<div class="L tag3" style="--c:${NEON.a}">${icon('trendingUp', 28, 2.4)}+100 mil vistas: repítelo hasta 5 veces<span class="dts" style="margin-left:14px">${'<i></i>'.repeat(5)}</span></div>`, (t, { a }) => {
    const [tit, cr, ct, m0, m1, m2, f0, f1, pk, pc, p5] = e.$, ms = [m0, m1, m2];
    fitW(tit, 1500); ent(tit, t, a + .15, CX, 130, { s0: .85 });
    const ti = at('inicio'), tm = M.map(m => at(m[3])), tc = at('cambia'), t5 = at('cien'), sube = t >= tc - .4 ? 1 : 0;
    const yb = sube ? lerp(560, 500, P(t, tc - .4, .5, E.io3)) : 560;
    ent(cr, t, ti - .3, 300, yb, { ease: E.back, s0: .6 });
    ent(ct, t, ti, 1620, yb, { ease: E.back, s0: .6 });
    const lleg = P(t, tm[0] + .6, .45, E.io3); ct.querySelector('.q').style.opacity = (1 - lleg).toFixed(3); ct.querySelector('img').style.opacity = lleg.toFixed(3); ct.classList.toggle('ok', lleg > .9);
    let act = -1; tm.forEach((x, k) => { if (t >= x - .15) act = k; });
    ms.forEach((m, k) => { ent(m, t, tm[k] - .3, CX, 330 + k * 175, { ease: E.back, s0: .7, dy: 0, t1: tc - .3 }); m.classList.toggle('on', k === act); fitW(m.querySelector('small'), 380); });
    [f0, f1].forEach((f, k) => {
      const p = P(t, tm[0] - .4 + k * .3, .5, E.io3) * (1 - P(t, tc - .3, .3));
      if (p <= .002) { off(f); return; }
      put(f, { x: k ? 1230 : 445, y: 505, ax: 0, o: 1 }); f.style.width = (260 * p).toFixed(1) + 'px';
    });
    if (act >= 0 && t < tc - .3) { const ph = ((t - tm[act]) % 1.4) / 1.4, yA = 330 + act * 175, x = ph < .5 ? lerp(445, 700, ph * 2) : lerp(1220, 1480, (ph - .5) * 2);
      put(pk, { x, y: ph < .5 ? lerp(505, yA, ph * 2) : lerp(yA, 505, (ph - .5) * 2), o: 1 }); } else off(pk);
    fitW(pc, 1500); fitW(p5, 1500);
    ent(pc, t, tc - .2, CX, 800, { ease: E.back, s0: .6, dy: 0 });
    ent(p5, t, t5 - .2, CX, 910, { ease: E.back, s0: .6, dy: 0 });
    [...p5.querySelectorAll('.dts i')].forEach((d, k) => d.classList.toggle('on', t >= t5 + .5 + k * .35));
  });
  sfx(at('inicio') - .3, 'pop', { vol: .45 }); M.forEach(m => sfx(at(m[3]) - .3, 'pop', { vol: .5 }));
  sfx(at('cambia') - .2, 'pop', { vol: .45 }); for (let k = 0; k < 5; k++) sfx(at('cien') + .5 + k * .35, 'tick', { vol: .4 });
  return e;
};

/* ---------- armador de la clase v2: fondo limpio, celular comun, visuales y cierre ---------- */
function CLASE(spec) {
  FIN_VOZ = spec.finVoz ?? +(FR[FR.length - 1][1] + .25).toFixed(2);
  MALLA.style.display = 'none';                                                        // fondo limpio (sin malla ni B-roll)
  const TELS = [];
  (spec.escenas || []).forEach(s => {
    const T = s.t.map(v => v === 'fin' ? FIN_VOZ : (typeof v === 'string' && /^f\d+$/.test(v)) ? FR[+v.slice(1)][0] - .05 : v);
    if (!ESC_TIPOS[s.tipo]) { console.error('tipo de escena desconocido: ' + s.tipo); return; }
    const lst = (s.items || []).map(i => i[1]).concat((s.cards || s.nodos || s.tags || s.logos || s.pills || []).map(c => c.at)).filter(v => v != null);
    let prev = -1;
    lst.forEach(v => { const x = A(v, T[0]); if (x < T[0] - .6 || x > T[1] + .6) console.error(`ANCLA fuera de escena [${T[0]}-${T[1]}]: ${v} = ${x.toFixed(2)}`);
      if (x < prev - .05) console.error(`ANCLA desordenada en [${T[0]}-${T[1]}]: ${v} = ${x.toFixed(2)}`); prev = x; });
    const lado = s.lado || s.tel || s.vis;
    const esc = ESC_TIPOS[s.tipo]({ ...s, t: T, img: s.img || (lado ? 'lado' : undefined) });
    if (!esc) return;
    if (s.img) lamina(esc, [].concat(s.img), [].concat(s.cap || []));
    if (s.tel) TELS.push({ esc, T0: T[0], ...s.tel });
    if (s.vis) VISUALES.push(VIS_TIPOS[s.vis.tipo](esc, s.vis, T[0]));
  });
  if (TELS.length) TEL = celularIG(TELS);
  window.extra = t => { pintarLaminas(t); VISUALES.forEach(v => v.pintar(t)); if (TEL) TEL.pintar(t); };
  const SF = escenaT(FIN_VOZ, CONFIG.dur, H.tit(`Clase ${spec.num}`, 'completada', 'c') +
    (spec.siguiente ? `<div class="L tag3" style="--c:${NEON.o}">${icon('arrowRight', 28, 2.6)}Siguiente: ${spec.siguiente}</div>` : ''), (t, { a }) => {
    const [tit, sig] = SF.$;
    ent(tit, t, a + .55, CX, 470, { s0: .85 });
    if (sig) { fitW(sig, 1500); ent(sig, t, a + 1.05, CX, 700, { ease: E.back, s0: .6, dy: 0 }); }
  });
  sfx(FIN_VOZ + .2, 'golpe', { vol: .7 });
  activarPro(ESCENAS.slice(0, -1).map(e => e.b), { grano: .05 });
}
