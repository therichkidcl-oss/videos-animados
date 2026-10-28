/* =====================================================================
   CLASE ZERNIO (curso NSFW · Automatizaciones, 26/10/2026). El panel de Zernio se RECREA igual que la web real (Geist,
   beige #F0EFEB, rojo #EB3514, tablas y paneles laterales copiados de zernio.com) dentro de una ventana de navegador,
   con cursor, clics y zoom de camara. Tambien Claude Code, la carpeta publicar/ y el flujo comentario -> DM.
   La UI se disena a 1200x625 (como un navegador al 130 %) y se escala x1.3 a la ventana de 1560x812.
   Escenas: zSign · zConectar · zLlave · zClaude · zCarpeta · zDiario · zPosts · zAuto · zFlujo
   ===================================================================== */
const ZS = 1.3, ZW2 = 1200, ZH2 = 625, VW = 1560, VH = 812;
const ZROJO = '#EB3514';
const zlogo = (h = 24) => `<img alt="" src="assets/zernio-logo.svg" style="height:${h}px;width:auto;display:block">`;
const chev = '<i class="chv"></i>';
const ZFECHA = 'Oct 27, 2026';

css(`
@font-face{font-family:'Geist';src:url(assets/geist-variable.woff2) format('woff2');font-weight:100 900}
.vz{width:${VW}px;height:${VH + 48}px;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 60px 140px -30px rgba(0,0,0,.95),0 0 0 1.5px rgba(255,255,255,.12),0 0 80px rgba(255,106,26,.16)}
.vz .zbar{height:48px;background:#202124;display:flex;align-items:center;gap:9px;padding:0 18px}
.vz .zbar>i{width:13px;height:13px;border-radius:50%;background:#ff5f57}.vz .zbar>i:nth-child(2){background:#febc2e}.vz .zbar>i:nth-child(3){background:#28c840}
.vz .zbar .url{margin-left:22px;width:760px;height:32px;border-radius:16px;background:#35363a;display:flex;align-items:center;gap:10px;padding:0 16px;font:500 17px 'Geist',sans-serif;color:#e8eaed}
.vz .zbar .url svg{color:#9aa0a6}
.vz .vp{position:relative;width:${VW}px;height:${VH}px;overflow:hidden;background:#F0EFEB}
.vz .cam{position:absolute;left:0;top:0;width:${ZW2}px;height:${ZH2}px;transform-origin:0 0}
.zn{position:absolute;inset:0;font-family:'Geist',sans-serif;color:#2d2d2d;background:#F0EFEB;opacity:0}
.zn *{box-sizing:border-box}
.zn .sd{position:absolute;left:0;top:0;bottom:0;width:206px;padding:12px 8px;display:flex;flex-direction:column}
.zn .usr{display:flex;align-items:center;gap:9px;padding:4px 8px 14px}
.zn .usr .ph{width:28px;height:28px;border-radius:5px;background:#d9d8d3;display:flex;align-items:center;justify-content:center;color:#7a7972}
.zn .usr b{display:block;font:600 12px 'Geist';color:#1a1a1a}.zn .usr small{display:block;font:400 10px 'Geist';color:#6b6b66}
.zn .nv{display:flex;align-items:center;gap:9px;height:26px;padding:0 8px;font:500 12px 'Geist';color:#2d2d2d;position:relative}
.zn .nv svg{color:#3a3a3a}
.zn .nv.on{background:rgba(0,0,0,.07)}
.zn .nv .chv{margin-left:auto}
.zn .chv{display:inline-block;width:6px;height:6px;border-right:1.4px solid #8a8984;border-bottom:1.4px solid #8a8984;transform:rotate(-45deg)}
.zn .sub{display:flex;align-items:center;justify-content:center;position:relative;height:26px;font:500 12px 'Geist';margin:2px 0 6px}
.zn .sub .bk{position:absolute;left:10px;top:9px;width:7px;height:7px;border-left:1.4px solid #6b6b66;border-bottom:1.4px solid #6b6b66;transform:rotate(45deg)}
.zn .doc{margin-top:auto;display:flex;align-items:center;gap:8px}
.zn .doc span{display:flex;align-items:center;gap:6px;height:24px;padding:0 10px;background:#262626;color:#fff;font:500 11px 'Geist';border-radius:2px}
.zn .mn{position:absolute;left:206px;right:0;top:0;bottom:0;background:#fff;padding:16px 18px}
.zn .hd{display:flex;align-items:flex-start;justify-content:space-between}
.zn .hd h1{margin:0;font:600 15px 'Geist';color:#1a1a1a}.zn .hd h1 em{font-style:normal;font-weight:400;color:#6b6b66;margin-left:6px;font-size:12px}
.zn .hd p{margin:3px 0 0;font:400 10px 'Geist';color:#6b6b66}
.zn .bts{display:flex;gap:6px}
.zn .btn{display:flex;align-items:center;gap:6px;height:24px;padding:0 10px;border-radius:2px;font:500 10.5px 'Geist';white-space:nowrap;border:1px solid #d9d8d3;background:#fff;color:#2d2d2d}
.zn .btn.r{background:${ZROJO};border-color:${ZROJO};color:#fff}
.zn .zflt{display:flex;align-items:center;gap:6px;margin:14px 0 12px}
.zn .inp{display:flex;align-items:center;gap:6px;height:25px;padding:0 9px;border:1px solid #d9d8d3;border-radius:2px;font:400 10.5px 'Geist';color:#8a8984;background:#fff;white-space:nowrap}
.zn .tbl{border:1px solid #e3e2dd;border-radius:2px}
.zn .tr{display:flex;align-items:center;min-height:38px;padding:0 12px;border-bottom:1px solid #ecebe7;font:400 11px 'Geist';color:#2d2d2d}
.zn .tr.th{min-height:24px;font:600 8.5px 'Geist';letter-spacing:.06em;text-transform:uppercase;color:#6b6b66;background:#fbfbfa}
.zn .tr>span{flex:none}
.zn .mono{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9.5px;color:#4a4a46}
.zn .bdg{display:inline-flex;align-items:center;height:16px;padding:0 6px;border-radius:2px;font:500 8.5px 'Geist';background:rgba(4,119,86,.12);color:#047756}
.zn .bdg.g{background:#f0efeb;color:#6b6b66}.zn .bdg.o{background:rgba(235,53,20,.1);color:${ZROJO}}
.zn .chip{border:0;gap:0;display:inline-flex;align-items:center;height:17px;padding:0 6px;border-radius:2px;font:500 9px 'Geist';background:#f0efeb;color:#4a4a46;margin-right:4px}
.zn .vacio{display:flex;flex-direction:column;align-items:center;gap:8px;padding:36px 0;font:500 11px 'Geist';color:#1a1a1a}
.zn .vacio i{width:34px;height:34px;border-radius:50%;background:#f0efeb;display:flex;align-items:center;justify-content:center;color:#6b6b66}
.zn .tile{width:24px;height:24px;border-radius:3px;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid #ecebe7;overflow:hidden}
.zn .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:1px dashed #d9d8d3;border-left:1px dashed #d9d8d3}
.zn .pc{height:118px;padding:10px;border-right:1px dashed #d9d8d3;border-bottom:1px dashed #d9d8d3;display:flex;flex-direction:column;position:relative}
.zn .pc .t{display:flex;align-items:center;gap:8px}.zn .pc .t b{display:block;font:500 11px 'Geist'}.zn .pc .t small{display:flex;align-items:center;gap:4px;font:400 9px 'Geist';color:#8a8984}
.zn .pc .t small::before{content:'';width:5px;height:5px;border-radius:50%;background:#b9b8b2}
.zn .pc .cn{margin-top:auto;height:24px;border:1px solid #d9d8d3;border-radius:2px;display:flex;align-items:center;justify-content:center;gap:5px;font:500 10px 'Geist';color:#2d2d2d}
.zn .pc .ok{display:none;flex-direction:column;gap:2px;margin-top:8px}.zn .pc .ok b{font:600 11px 'Geist'}.zn .pc .ok small{font:400 9px 'Geist';color:#8a8984}
.zn .pc.con .ok{display:flex}.zn .pc.con .t small{display:none}.zn .pc .t .bdg{display:none}.zn .pc.con .t .bdg{display:inline-flex}
.zn .pc.con{background:rgba(4,119,86,.04)}
.zn .dim{position:absolute;inset:0;background:rgba(20,20,18,.38);opacity:0}
.zn .pnl{position:absolute;top:0;right:0;bottom:0;width:372px;background:#fff;border-left:1px solid #e3e2dd;padding:16px 16px 0;transform:translateX(100%);display:flex;flex-direction:column}
.zn .pnl h2{margin:0;font:600 12px 'Geist';color:#1a1a1a}.zn .pnl>p{margin:3px 0 0;font:400 9.5px 'Geist';color:#6b6b66}
.zn .pnl .x{position:absolute;right:14px;top:14px;color:#6b6b66}
.zn .pnl .sec{margin:16px 0 6px;font:600 8px 'Geist';letter-spacing:.08em;color:#6b6b66;text-transform:uppercase}
.zn .pr{display:flex;align-items:center;gap:8px;height:30px;padding:0 8px;border:1px solid #ecebe7;margin-top:-1px;font:500 11px 'Geist';position:relative}
.zn .pr .ic{margin-left:auto;display:flex;gap:4px}.zn .pr .ic i{width:20px;height:20px;border:1px solid #ecebe7;border-radius:2px;display:flex;align-items:center;justify-content:center;color:#6b6b66}
.zn .opt{overflow:hidden;height:0;border:1px solid transparent;margin-top:-1px}
.zn .opt p{margin:8px 10px 4px;font:400 9px 'Geist';color:#8a8984}
.zn .opt div{display:flex;align-items:center;gap:8px;height:28px;padding:0 10px;font:500 11px 'Geist';position:relative}
.zn .opt div::after{content:'›';position:absolute;right:12px;color:#8a8984;font-size:14px}
.zn label.lb{display:block;margin:14px 0 5px;font:500 10px 'Geist';color:#1a1a1a}.zn label.lb b{color:${ZROJO}}
.zn .fld{height:28px;border:1px solid #d9d8d3;border-radius:2px;display:flex;align-items:center;padding:0 9px;font:400 11px 'Geist';color:#1a1a1a}
.zn .fld.f{box-shadow:0 0 0 2px #1a1a1a}
.zn .fld .ph{color:#9a9994}
.zn .seg{display:flex;border:1px solid #d9d8d3;border-radius:2px;padding:2px;height:28px}
.zn .seg span{display:flex;align-items:center;padding:0 9px;font:500 10.5px 'Geist';color:#4a4a46}.zn .seg span.on{background:#f0efeb;color:#1a1a1a}
.zn .tg{display:flex;align-items:center;justify-content:space-between;margin-top:12px;font:500 10px 'Geist'}
.zn .tg small{display:block;font:400 9px 'Geist';color:#6b6b66;margin-top:2px}
.zn .sw{width:28px;height:15px;border-radius:8px;background:#d9d8d3;position:relative}.zn .sw::after{content:'';position:absolute;left:2px;top:2px;width:11px;height:11px;border-radius:50%;background:#fff}
.zn .sw.on{background:#1a1a1a}.zn .sw.on::after{left:15px}
.zn .pf{margin-top:auto;border-top:1px solid #e3e2dd;display:flex;gap:8px;padding:12px 0}
.zn .mdl{position:absolute;left:50%;top:50%;width:440px;margin-left:-220px;margin-top:-130px;background:#fff;border:1px solid #e3e2dd;box-shadow:0 30px 80px -20px rgba(0,0,0,.4);padding:18px;opacity:0}
.zn .mdl h3{margin:0;font:600 13px 'Geist'}.zn .mdl p{margin:4px 0 12px;font:400 10px 'Geist';color:#6b6b66}
.zn .key{display:flex;align-items:center;gap:8px;height:32px;border:1px solid #d9d8d3;padding:0 6px 0 10px;background:#fbfbfa}
.zn .key span{flex:1;font-family:'JetBrains Mono',monospace;font-size:10px;color:#1a1a1a;white-space:nowrap;overflow:hidden}
.zn .warn{display:flex;align-items:center;gap:6px;margin-top:10px;padding:8px 10px;background:rgba(235,53,20,.07);color:#b8290f;font:500 9.5px 'Geist'}
.zn .tabs{display:flex;gap:18px;border-bottom:1px solid #e3e2dd;margin:-4px -18px 14px;padding:0 18px}
.zn .tabs span{padding:8px 0;font:500 11px 'Geist';color:#4a4a46}.zn .tabs span.on{color:#1a1a1a;box-shadow:inset 0 -2px 0 #1a1a1a}
.zn .cal{width:auto;height:auto;display:grid;grid-template-columns:repeat(7,1fr);border-left:1px solid #e3e2dd;border-top:1px solid #e3e2dd}
.zn .cal>div{height:76px;border-right:1px solid #e3e2dd;border-bottom:1px solid #e3e2dd;padding:4px 5px;position:relative}
.zn .cal>div.h{height:22px;display:flex;align-items:center;justify-content:center;font:500 8px 'JetBrains Mono',monospace;color:#6b6b66;letter-spacing:.06em}
.zn .cal>div b{display:block;text-align:right;font:500 9.5px 'JetBrains Mono',monospace;color:#2d2d2d}.zn .cal>div.o b{color:#c3c2bd}
.zn .cal>div.hoy{box-shadow:inset 0 0 0 1px ${ZROJO}}.zn .cal>div.hoy b{color:${ZROJO}}
.zn .ev{margin-top:3px;padding:3px 4px;border-left:2px solid #b9b8b2;background:#f6f5f2;font:400 7.5px 'Geist';color:#2d2d2d;opacity:0;white-space:nowrap;overflow:hidden}
.zn .ev em{font-style:normal;display:block;font-size:7.5px;color:#6b6b66}
.zn .ev.pub{border-left-color:#2e9e5b}
.zn .ev .stt{display:flex;gap:5px;font-size:7px;color:#4a4a46;margin-top:1px}
.zc{position:absolute;left:0;top:0;width:0;height:0;z-index:20;pointer-events:none}
.zc svg{position:absolute;left:-3px;top:-2px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}
.zc .rp{position:absolute;left:-16px;top:-16px;width:32px;height:32px;border-radius:50%;border:2.5px solid ${ZROJO};opacity:0}
.zhl{box-shadow:0 0 0 2px ${ZROJO},0 0 14px rgba(235,53,20,.55) !important}
/* Instagram: permiso */
.zig{position:absolute;left:50%;top:50%;width:330px;margin-left:-165px;margin-top:-170px;background:#fff;border:1px solid #dbdbdb;border-radius:10px;padding:22px 22px 18px;text-align:center;box-shadow:0 30px 80px -20px rgba(0,0,0,.45);opacity:0;font-family:'Geist'}
.zig .lg2{display:flex;justify-content:center;gap:14px;align-items:center;margin-bottom:12px}
.zig h3{margin:0 0 10px;font:600 13px 'Geist';color:#111}
.zig ul{list-style:none;margin:0 0 14px;padding:0;text-align:left}.zig li{display:flex;gap:8px;align-items:center;font:400 10.5px 'Geist';color:#262626;padding:5px 0;border-bottom:1px solid #f1f1f1}
.zig li i{color:#0095f6;display:flex}
.zig .ok2{height:30px;border-radius:7px;background:#0095f6;color:#fff;font:600 11px 'Geist';display:flex;align-items:center;justify-content:center}
.zig .no2{margin-top:6px;font:600 10.5px 'Geist';color:#0095f6}
/* signup */
.zsg{position:absolute;inset:0;background:#F0EFEB;overflow:hidden;opacity:0}
.zsg .brs{position:absolute;left:0;right:0;bottom:0;height:62%;display:flex;align-items:flex-end;gap:0}
.zsg .brs i{flex:1;background:linear-gradient(0deg,#c8240a 0%,#EB3514 28%,#ff7a3d 55%,rgba(255,170,120,.35) 82%,rgba(240,239,235,0) 100%)}
.zsg .lgz{position:absolute;left:50%;top:44px;transform:translateX(-50%)}
.zsg .crd{position:absolute;left:50%;top:150px;width:392px;margin-left:-196px;background:#fff;border-radius:16px;padding:26px 30px 24px;box-shadow:0 10px 40px -10px rgba(0,0,0,.15);text-align:center}
.zsg h2{margin:0 0 18px;font:500 22px 'Geist';color:#1a1a1a}
.zsg .ob{display:flex;align-items:center;justify-content:center;gap:9px;height:40px;border:1px solid #d9d8d3;border-radius:6px;font:500 13px 'Geist';color:#1a1a1a;margin-top:8px}
.zsg .sep{display:flex;align-items:center;gap:10px;margin:18px 0 14px;font:400 12px 'Geist';color:#6b6b66}.zsg .sep::before,.zsg .sep::after{content:'';flex:1;height:1px;background:#e3e2dd}
.zsg small{font:400 12px 'Geist';color:#4a4a46}.zsg small b{color:${ZROJO};font-weight:500}
.zsg .lgl{position:absolute;left:0;right:0;bottom:22px;text-align:center;font:400 10.5px 'Geist';color:#fff}
/* Claude Code */
.zcl{width:1500px;height:820px;border-radius:18px;overflow:hidden;background:#262624;border:1.5px solid rgba(255,255,255,.1);box-shadow:0 60px 140px -30px rgba(0,0,0,.95),0 0 80px rgba(217,119,87,.14);font-family:var(--sans)}
.zcl .ch{height:64px;display:flex;align-items:center;gap:14px;padding:0 28px;border-bottom:1px solid rgba(255,255,255,.07);font:700 24px var(--sans);color:#f2efe9}
.zcl .ch small{margin-left:auto;font:500 18px var(--mono);color:#9a968f}
.zcl .bd{position:absolute;left:0;right:0;top:64px;bottom:96px;padding:26px 60px;overflow:hidden}
.zcl .um{margin-left:auto;max-width:1020px;padding:18px 24px;border-radius:20px;background:#3a3836;font:500 24px/1.45 var(--sans);color:#f2efe9;white-space:pre-wrap;opacity:0}
.zcl .um b{color:#ffb27a}
.zcl .tl{display:flex;align-items:center;gap:14px;margin-top:16px;font:500 22px var(--mono);color:#d8d3ca;opacity:0}
.zcl .tl i{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#2e9e5b;color:#fff;flex:none}
.zcl .tl i.w{background:#d97757}
.zcl .tl em{font-style:normal;color:#9a968f}
.zcl .ar{margin-top:18px;font:500 24px/1.5 var(--sans);color:#e8e4dc;opacity:0}
.zcl .ar b{color:#5be38d}
.zcl .inp2{position:absolute;left:40px;right:40px;bottom:22px;height:62px;border-radius:16px;background:#30302e;border:1.5px solid rgba(255,255,255,.1);display:flex;align-items:center;padding:0 22px;font:500 21px var(--sans);color:#8f8b84}
/* carpeta publicar/ */
.zfx{width:820px;border-radius:18px;background:#141416;border:1.5px solid rgba(255,255,255,.1);box-shadow:0 50px 110px -30px rgba(0,0,0,.95);padding:22px 26px;font-family:var(--mono)}
.zfx .fh{display:flex;align-items:center;gap:12px;font:700 24px var(--mono);color:#ffd2b0;margin-bottom:14px}
.zfx .fr{display:flex;align-items:center;gap:12px;height:46px;font:500 21px var(--mono);color:#e6e2e8;opacity:0}
.zfx .fr.s{padding-left:40px;height:38px;font-size:18px;color:#b9b5bf}
.zfx .fr svg{color:#ff9f5e;flex:none}.zfx .fr.s svg{color:#8e8a96}
.zfx .fr .st{margin-left:auto;padding:4px 12px;border-radius:999px;font:700 15px var(--sans);opacity:0}
.zfx .fr .st.p{background:rgba(255,194,61,.16);color:#ffc23d}.zfx .fr .st.v{background:rgba(47,212,122,.16);color:#5be38d}
.ztk{display:flex;align-items:center;gap:16px;padding:20px 26px;border-radius:22px;background:linear-gradient(180deg,rgba(26,22,24,.96),rgba(12,10,12,.96));border:1.5px solid rgba(255,122,26,.6);box-shadow:0 30px 70px -25px rgba(0,0,0,.95),0 0 40px rgba(255,106,26,.2)}
.ztk i{width:64px;height:64px;border-radius:18px;background:rgba(255,122,26,.14);color:#ff8a3d;display:flex;align-items:center;justify-content:center}
.ztk b{display:block;font:400 36px/1 Impact,'Arial Narrow Bold',sans-serif;color:#fff;letter-spacing:.02em}.ztk small{display:block;font:600 21px var(--sans);color:#b9b5bf;margin-top:6px}
/* paso a paso diario */
.zst{display:flex;align-items:center;gap:14px;width:560px;height:96px;padding:0 22px;border-radius:24px;background:rgba(20,16,16,.92);border:1.5px solid rgba(255,255,255,.08);font:700 27px/1.2 var(--sans);color:#8e8a96;opacity:0}
.zst.on{color:#fff;border-color:rgba(255,122,26,.9);background:rgba(34,18,12,.95);box-shadow:0 0 40px rgba(255,122,26,.25)}
.zst.ok{color:#ddd6d8}
.zst i{flex:none;width:54px;height:54px;border-radius:16px;background:rgba(255,122,26,.14);color:#ff8a3d;display:flex;align-items:center;justify-content:center}
.zst.ok i{background:#2e9e5b;color:#fff}
.zdv{width:900px;height:640px;border-radius:24px;background:#141416;border:1.5px solid rgba(255,255,255,.1);box-shadow:0 50px 110px -30px rgba(0,0,0,.95);overflow:hidden}
.zdv .fs{position:absolute;left:30px;right:30px;top:30px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.zdv .fs i{display:block;height:250px;border-radius:12px;overflow:hidden;opacity:0;position:relative}.zdv .fs img{width:100%;height:100%;object-fit:cover}
.zdv .fs i::after{content:'';position:absolute;inset:0;border:3px solid transparent;border-radius:12px}
.zdv .fs i.ok::after{border-color:#5be38d}
.zdv .scn{position:absolute;top:30px;height:250px;width:6px;border-radius:3px;background:#ff8a3d;box-shadow:0 0 22px #ff6a1a;opacity:0}
.zdv .okc{position:absolute;left:50%;top:310px;transform:translateX(-50%);display:flex;align-items:center;gap:12px;padding:10px 22px;border-radius:999px;background:rgba(47,212,122,.14);border:1.5px solid rgba(91,227,141,.6);font:700 24px var(--sans);color:#5be38d;opacity:0;white-space:nowrap}
.zdv .tx{position:absolute;left:30px;right:30px;top:30px;bottom:30px;padding:22px 26px;border-radius:16px;background:#0d0d0f;border:1px solid rgba(255,255,255,.08);opacity:0}
.zdv .tx .fn{font:600 17px var(--mono);color:#8e8a96;margin-bottom:12px}
.zdv .tx p{margin:0 0 12px;font:500 22px/1.45 var(--sans);color:#e6e2e8;white-space:pre-wrap;min-height:30px}
.zdv .tx p.g{font-weight:800;color:#fff}.zdv .tx p.h{color:#7cc4ff}
.zdv .up{position:absolute;left:60px;right:60px;top:240px;opacity:0;text-align:center}
.zdv .up .lz{display:flex;justify-content:center;margin-bottom:24px}
.zdv .up .pb{height:16px;border-radius:8px;background:rgba(255,255,255,.08);overflow:hidden}.zdv .up .pb i{display:block;height:100%;width:0;background:linear-gradient(90deg,#ff9a4a,#EB3514)}
.zdv .up .pt2{margin-top:16px;font:600 22px var(--mono);color:#ffd2b0}
.zdv .up .prg{margin:22px auto 0;display:inline-flex;align-items:center;gap:12px;padding:12px 24px;border-radius:999px;background:rgba(255,194,61,.14);border:1.5px solid rgba(255,194,61,.6);font:700 24px var(--sans);color:#ffc23d;opacity:0}
/* flujo comentario -> DM */
.zfl .scr{display:flex;flex-direction:column}
.zfl .rh{padding:66px 22px 10px;font:800 22px var(--sans);color:#f5f5f5;border-bottom:1px solid #1f1f22}
.zfl .rm{flex:1;padding:12px 18px;display:flex;flex-direction:column;gap:12px}
.zfl .cm{display:flex;gap:10px;align-items:flex-start;opacity:0}
.zfl .cm .av2{width:38px;height:38px;border-radius:50%;flex:none;background:#3a3a40;display:flex;align-items:center;justify-content:center;font:800 16px var(--sans);color:#fff}
.zfl .cm .av2 img{width:100%;height:100%;border-radius:50%;object-fit:cover}
.zfl .cm div{flex:1;font:500 17px/1.35 var(--sans);color:#e8e8ea}.zfl .cm div b{display:block;font-weight:800;font-size:15px;color:#fff}
.zfl .cm .ht{flex:none;color:#8a8a90;padding-top:6px}.zfl .cm .ht.on{color:#ff3040}
.zfl .cm.r{margin-left:46px}
.zfl .cm .kw{background:rgba(255,194,61,.22);color:#ffc23d;border-radius:6px;padding:0 4px;font-weight:800}
.zfl .bu{max-width:80%;padding:12px 16px;border-radius:20px;font:500 17px/1.38 var(--sans);opacity:0}
.zfl .bu.in{align-self:flex-start;background:#262629;color:#f2f2f4}
.zfl .bu.out{align-self:flex-end;background:#3a5bff;color:#fff}
.zfl .bu .bb{margin-top:10px;height:42px;border-radius:12px;background:#f2f2f4;color:#111;display:flex;align-items:center;justify-content:center;font:800 16px var(--sans)}
.zfl .bu .bb.on{background:#5be38d}
`);

/* ---------- piezas del panel ---------- */
const ZNAV = [['plug', 'Connections'], ['penTool', 'Posts', 1], ['chartColumn', 'Analytics', 1], ['messageSquare', 'Inbox', 1], ['target', 'Ads', 1],
  ['shoppingCart', 'Commerce', 1], ['smartphone', 'WhatsApp', 1], ['messageSquare', 'iMessage', 1], ['circleCheck', 'RCS'], ['smartphone', 'Phone', 1],
  ['lock', 'API Keys'], ['users', 'Users'], ['workflow', 'Webhooks'], ['gauge', 'Logs'], ['slidersHorizontal', 'Settings', 1]];
const ZUSR = `<div class="usr"><div class="ph">${icon('users', 15, 2)}</div><div><b>Tu nombre</b><small>tucorreo@gmail.com</small></div><i class="chv" style="margin-left:auto;transform:rotate(45deg)"></i></div>`;
const ZDOC = `<div class="doc"><span>${icon('code', 12, 2)}Documentation</span>${icon('sun', 13, 2)}</div>`;
function zSide(activo) {
  return `<div class="sd">${ZUSR}${ZNAV.map(n => `<div class="nv${n[1] === activo ? ' on' : ''}" data-nv="${n[1]}">${icon(n[0], 13, 2)}${n[1]}${n[2] ? chev : ''}</div>`).join('')}${ZDOC}</div>`;
}
function zSideSub(titulo, items, activo) {
  return `<div class="sd">${ZUSR}<div class="sub"><i class="bk"></i>${titulo}</div>${items.map(n => `<div class="nv${n[1] === activo ? ' on' : ''}" data-nv="${n[1]}">${icon(n[0], 13, 2)}${n[1]}</div>`).join('')}${ZDOC}</div>`;
}
const ZPLAT = [['discord', 'Discord'], ['facebook', 'Facebook'], ['instagram', 'Instagram'], ['pinterest', 'Pinterest'], ['threads', 'Threads'], ['tiktok', 'TikTok'], ['x', 'Twitter/X'], ['youtube', 'YouTube']];
const zTile = (slug, t = 24) => `<span class="tile" style="width:${t}px;height:${t}px">${logo(slug, Math.round(t * .66))}</span>`;
function zConexiones() {
  return `<div class="mn"><div class="hd"><div><h1>Connections</h1><p>Manage platform integrations</p></div><div class="bts"><span class="btn">${icon('users', 12, 2)}New Profile</span>` +
    `<span class="btn r" data-k="nueva">${icon('plus', 12, 2.4)}New Connection</span></div></div>` +
    `<div class="zflt"><span class="inp" style="width:150px">● &nbsp;Default</span><span class="mono" style="align-self:center;color:#8a8984">6adabef6a6e5a3bc853ead09</span></div>` +
    `<div class="grid">${ZPLAT.map(p => `<div class="pc" data-pc="${p[0]}"><div class="t">${zTile(p[0], 28)}<div><b>${p[1]}</b><small>Not connected</small><span class="bdg">connected</span></div></div>` +
      `<div class="ok"><b>@tu.modelo</b><small>27/10/2026</small></div><div class="cn"><span>+ Connect</span></div></div>`).join('')}</div></div>`;
}
function zPanelConexion() {
  const rows = [['tiktok', 'TikTok'], ['instagram', 'Instagram'], ['facebook', 'Facebook'], ['youtube', 'YouTube'], ['x', 'Twitter/X'], ['threads', 'Threads'], ['pinterest', 'Pinterest']];
  return `<div class="dim"></div><div class="pnl" data-k="pnl"><span class="x">${icon('x', 13, 2)}</span><h2>New Connection</h2><p>Choose a platform to connect.</p><div class="sec">Social</div>` +
    rows.map(r => `<div class="pr" data-pr="${r[0]}">${zTile(r[0], 20)}${r[1]}<span class="ic"><i>${icon('smartphone', 10, 2)}</i><i>${icon('link', 10, 2)}</i><i data-k="${r[0]}-chv">${r[0] === 'instagram' ? '<span class="chv" style="transform:rotate(45deg);margin-top:-3px"></span>' : '›'}</i></span></div>` +
      (r[0] === 'instagram' ? `<div class="opt" data-k="opt"><p>Choose how to sign in to Instagram.</p><div data-k="conIG">${logo('instagram', 14)}Connect with Instagram</div><div>${logo('facebook', 14)}Connect with Facebook</div></div>` : '')).join('') + '</div>';
}
function zPermisoIG() {
  return `<div class="zig" data-k="ig"><div class="lg2">${zlogo(15)}<span style="color:#8a8984">↔</span>${logo('instagram', 30)}</div><h3>Zernio quiere acceder a tu cuenta de Instagram</h3>` +
    `<ul><li><i>${icon('check', 13, 3)}</i>Publicar reels y fotos</li><li><i>${icon('check', 13, 3)}</i>Leer y responder comentarios</li><li><i>${icon('check', 13, 3)}</i>Enviar y responder mensajes</li><li><i>${icon('check', 13, 3)}</i>Ver estadísticas</li></ul>` +
    `<div class="ok2" data-k="permitir">Permitir</div><div class="no2">Cancelar</div></div>`;
}
function zLlaves() {
  return `<div class="mn"><div class="hd"><div><h1>API Keys<em data-k="nkeys">0</em></h1><p>Authentication tokens for the programmatic API</p></div><span class="btn r" data-k="crear">${icon('plus', 12, 2.4)}Create key</span></div>` +
    `<div class="zflt"><span class="inp" style="width:160px">${icon('search', 11, 2)}Search keys...</span><span class="inp">All ${chev}</span><span class="inp">All perms ${chev}</span></div>` +
    `<div class="tbl"><div class="tr th"><span style="width:190px">Name</span><span style="width:210px">Key</span><span style="width:120px">Scope</span><span style="width:90px">Status</span><span>Permission</span></div>` +
    `<div class="vacio" data-k="vacio"><i>${icon('lock', 15, 2)}</i>No API keys yet.</div>` +
    `<div class="tr" data-k="fila" style="display:none"><span style="width:190px"><b style="font-weight:500">claude</b><br><small style="color:#8a8984">27/10/2026</small></span><span class="mono" style="width:210px">sk_7f3a9...c2e91</span>` +
    `<span style="width:120px;color:#6b6b66">All profiles</span><span style="width:90px"><span class="bdg">active</span></span><span class="bdg">Read &amp; Write</span></div></div></div>`;
}
function zPanelLlave() {
  return `<div class="dim"></div><div class="pnl" data-k="pnl"><span class="x">${icon('x', 13, 2)}</span><h2>Create New API Key</h2><p>Configure permissions and profile access for your new key.</p>` +
    `<label class="lb">Key Name <b>*</b></label><div class="fld" data-k="nombre"><span class="ph">e.g., Production API Key</span></div>` +
    `<label class="lb">Permission</label><div class="seg" data-k="perm"><span class="on">Read &amp; Write</span><span>Read Only</span></div>` +
    `<div class="tg"><span>Full access (all profiles)</span><i class="sw on"></i></div><div class="tg"><span>Restrict access<small>Limit which parts of the API this key can use</small></span><i class="sw"></i></div>` +
    `<div class="pf"><span class="btn r" data-k="crearK" style="height:28px">Create key</span><span class="btn" style="height:28px">Cancel</span></div></div>` +
    `<div class="mdl" data-k="mdl"><h3>Your new API key</h3><p>Copy it now and keep it safe. You won't be able to see it again.</p>` +
    `<div class="key"><span>sk_7f3a9c2e5b81d04f6a2c9e7b3d1f8a6c4e2c2e91</span><span class="btn" data-k="copiar" style="flex:none">${icon('fileText', 11, 2)}<b data-k="copTx" style="font-weight:500">Copy</b></span></div>` +
    `<div class="warn">${icon('lock', 12, 2.2)}Never share this key or paste it in public.</div></div>`;
}
/* calendario de posts: semanas de octubre/noviembre 2026 (domingo primero) */
function zPosts() {
  const semanas = [[25, 26, 27, 28, 29, 30, 31], [1, 2, 3, 4, 5, 6, 7]];
  return zSideSub('Posts', [['layoutTemplate', 'Overview'], ['layers', 'Queues']], 'Overview') +
    `<div class="mn"><div class="hd"><div><h1>Posts</h1><p>Manage your scheduled and published content</p></div><div class="bts"><span class="btn r">${icon('plus', 12, 2.4)}Create post</span><span class="btn">${icon('download', 12, 2)}Import CSV</span></div></div>` +
    `<div class="zflt"><span class="inp">Zernio posts ${chev}</span><span class="inp">All posts ${chev}</span><span class="inp">All platforms ${chev}</span><span class="inp">All profiles ${chev}</span>` +
    `<span class="inp" style="margin-left:auto">${icon('calendarDays', 11, 2)}</span></div>` +
    `<div style="font:600 12px 'Geist';margin:0 0 8px">October 2026 ${chev}</div>` +
    `<div class="cal">${['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => `<div class="h">${d}</div>`).join('')}` +
    semanas.flat().map((d, i) => `<div class="${i >= 7 ? 'o' : ''}${d === 27 && i < 7 ? ' hoy' : ''}" data-dia="${i}"><b>${d}</b></div>`).join('') + '</div></div>';
}
function zAutos() {
  return zSideSub('Inbox', [['messageSquare', 'Messages'], ['messageSquare', 'Comments'], ['star', 'Reviews'], ['users', 'Mentions'], ['send', 'Campaigns'], ['workflow', 'Workflows'], ['users', 'Contacts']], 'Campaigns') +
    `<div class="mn"><div class="tabs"><span>Broadcasts</span><span>Sequences</span><span class="on" data-k="tab">Comment-to-DM</span></div>` +
    `<div class="hd"><div><h1>Automations<em data-k="nauto">0</em></h1><p>Auto-reply to comments with DMs and public replies</p></div><span class="btn r">${icon('plus', 12, 2.4)}New Automation</span></div>` +
    `<div class="zflt"><span class="inp" style="width:170px">${icon('search', 11, 2)}Search automations...</span><span class="inp">All statuses ${chev}</span><span class="inp">All platforms ${chev}</span>` +
    `<span style="margin-left:auto;display:flex;align-items:center;gap:6px;font:400 10px 'Geist';color:#4a4a46"><i class="sw on"></i>Track clicks by default</span></div>` +
    `<div class="tbl"><div class="tr th"><span style="width:380px">Name</span><span style="width:120px">Platform</span><span style="width:110px">Keywords</span><span style="width:140px">Stats</span><span>Date</span></div>` +
    `<div class="tr" data-k="fila" style="opacity:0"><span style="width:380px;font-weight:500">LINK - 01 - Noche en Miami <span class="chip" style="margin-left:6px">Also DMs</span><span class="bdg">active</span></span>` +
    `<span style="width:120px;display:flex;align-items:center;gap:5px">${logo('instagram', 12)}Instagram</span><span style="width:110px"><span class="chip">link</span><span class="chip">links</span></span>` +
    `<span style="width:140px"><span data-k="trig">0</span> triggered &nbsp;<b style="color:#047756;font-weight:500"><span data-k="sent">0</span> sent</b></span><span>${ZFECHA}</span></div></div></div>`;
}

/* ventana de navegador con la app adentro: pantallas apiladas que se cambian con fundido */
function ventanaZ(url, pantallas) {
  return `<div class="L vz"><div class="zbar"><i></i><i></i><i></i><span class="url">${icon('lock', 15, 2.2)}<span class="u">${url}</span></span></div>` +
    `<div class="vp"><div class="cam">${pantallas.map(p => `<div class="zn" data-pg="${p[0]}">${p[1]}</div>`).join('')}` +
    `<div class="zc"><i class="rp"></i><svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 2.5l15 8.6-6.6 1.6 3.9 7.2-3 1.6-3.9-7.2L4.6 19z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg></div></div></div></div>`;
}
/* centro de un elemento [data-k] en px de la UI (la camara esta en escala 1 al medir) */
function zPos(raiz, sel) {
  const el = raiz.querySelector(sel); if (!el) { console.error('zPos: no existe ' + sel); return [600, 300]; }
  const cam = raiz.querySelector('.cam'), a = el.getBoundingClientRect(), c = cam.getBoundingClientRect(), k = c.width / ZW2;
  return [(a.left + a.width / 2 - c.left) / k, (a.top + a.height / 2 - c.top) / k];
}
/* pintor comun de la ventana: pantalla activa, cursor con clics y zoom de camara.
   pgs: [[t, nombre, url]] · cur: [[t, sel | [x,y]]] (el cursor llega en t) · clics: [t] · zoom: [[t, z, sel | [x,y]]] */
function pintarVentana(win, t, { pgs, cur = [], clics = [], zoom = [], prep, unprep }) {
  const cam = win.querySelector('.cam');
  // pantalla activa (fundido solo cuando cambia de pantalla; la misma pantalla puede cambiar de url)
  let ia = 0;
  pgs.forEach((p, i) => { if (t >= p[0] - .01) ia = i; });
  const act = pgs[ia], prv = ia > 0 ? pgs[ia - 1] : null, cambia = prv && prv[1] !== act[1], f = cambia ? P(t, act[0] - .15, .3) : 1;
  win.querySelectorAll('.zn').forEach(z => {
    const o = z.dataset.pg === act[1] ? f : (cambia && z.dataset.pg === prv[1] ? 1 - f : 0);
    z.style.opacity = clamp(o).toFixed(3);
  });
  const u = win.querySelector('.u'); if (u._t !== act[2]) { u._t = act[2]; u.textContent = act[2]; }
  // medir posiciones (una vez, con la camara en escala 1)
  if (!win._pos) {
    cam.style.transform = 'scale(1)';
    if (prep) prep();                                      // abre paneles/opciones para medir donde quedan sus botones
    win._pos = new Map();
    for (const c of [...cur, ...zoom]) { const s = c[c.length - 1]; if (typeof s === 'string' && !win._pos.has(s)) win._pos.set(s, zPos(win, s)); }
    if (unprep) unprep();
  }
  const pos = s => typeof s === 'string' ? win._pos.get(s) : s;
  // camara
  let z = 1, fc = [ZW2 / 2, ZH2 / 2];
  if (zoom.length) {
    let k0 = [-1e9, 1, [ZW2 / 2, ZH2 / 2]];
    for (const k of zoom) {
      if (t >= k[0]) { const pr = E.io3(clamp((t - k[0]) / .9)), fp = pos(k[2]);
        z = lerp(k0[1], k[1], pr); fc = [lerp(k0[2][0], fp[0], pr), lerp(k0[2][1], fp[1], pr)]; k0 = [k[0], z, fc]; }
    }
  }
  const s = ZS * z, tx = clamp(VW / 2 - fc[0] * s, VW - ZW2 * s, 0), ty = clamp(VH / 2 - fc[1] * s, VH - ZH2 * s, 0);
  cam.style.transform = `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${s.toFixed(4)})`;
  // cursor
  const zc = win.querySelector('.zc');
  if (!cur.length) { zc.style.opacity = 0; return; }
  let p0 = pos(cur[0][1]), x = p0[0], y = p0[1];
  for (let i = 1; i < cur.length; i++) {
    const [ti, si] = cur[i], pa = pos(cur[i - 1][1]), pb = pos(si), mv = E.io3(clamp((t - (ti - .7)) / .7));
    if (t >= ti - .7) { x = lerp(pa[0], pb[0], mv); y = lerp(pa[1], pb[1], mv) - Math.sin(Math.PI * mv) * 18; }
  }
  const cl = clics.filter(c => t >= c - .05 && t < c + .5).pop();
  zc.style.opacity = P(t, cur[0][0] - .3, .3).toFixed(3);
  zc.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${(1 - .18 * (cl != null ? bump(t, cl - .05, .25) : 0)).toFixed(3)})`;
  const rp = zc.querySelector('.rp');
  if (cl != null && t >= cl) { const q = clamp((t - cl) / .5); rp.style.opacity = (1 - q).toFixed(3); rp.style.transform = `scale(${lerp(.4, 1.6, E.out3(q)).toFixed(3)})`; } else rp.style.opacity = 0;
}
const zPanel = (win, pg, t, a, b) => {      // panel lateral que entra en a y sale en b
  const z = win.querySelector(`[data-pg="${pg}"]`), pn = z.querySelector('.pnl'), dm = z.querySelector('.dim');
  const p = P(t, a, .45, E.out4) * (1 - P(t, b, .35, E.in3));
  pn.style.transform = `translateX(${((1 - p) * 102).toFixed(2)}%)`; dm.style.opacity = p.toFixed(3);
};
const zHL = (el, on) => el && el.classList.toggle('zhl', !!on);
const zPaso = (n, txt) => `<div class="L phd"><span class="pn">${n}</span><span class="pt">${txt}</span></div>`;
