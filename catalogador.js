/**
 * Catalogador 7a0
 * ---------------
 * Cole este script no console do navegador em 7a0.com.br
 * jogando no modo CLÁSSICO. Ele cataloga automaticamente
 * cada elenco sorteado e permite exportar um CSV.
 *
 * Uso:
 *   1. Abra 7a0.com.br
 *   2. Pressione F12 → Console
 *   3. Cole o conteúdo deste arquivo e pressione Enter
 *   4. Jogue normalmente — o painel aparece no canto inferior direito
 *   5. Clique em "Exportar CSV" ao final
 */
(function () {
  if (window.__cat7a0) { console.warn('[7a0] Já está rodando.'); return; }
  window.__cat7a0 = { times: {}, total: 0 };

  const painel = document.createElement('div');
  painel.id = '__cat7a0_painel';
  painel.style.cssText = `
    position:fixed;bottom:16px;right:16px;width:340px;max-height:480px;
    background:#1a1a2e;color:#e0e0e0;font-family:monospace;font-size:12px;
    border-radius:10px;border:1px solid #444;overflow:hidden;z-index:999999;
    display:flex;flex-direction:column;box-shadow:0 4px 20px rgba(0,0,0,0.5);
  `;
  painel.innerHTML = `
    <div id="__cat7a0_header" style="background:#16213e;padding:8px 12px;display:flex;
      justify-content:space-between;align-items:center;cursor:move;user-select:none;
      border-bottom:1px solid #333;">
      <span style="font-weight:bold;color:#00d4aa;">⚽ Catalogador 7a0</span>
      <div style="display:flex;gap:8px;">
        <button id="__cat7a0_export" style="background:#0f3460;color:#00d4aa;
          border:1px solid #00d4aa;border-radius:4px;padding:2px 8px;
          cursor:pointer;font-size:11px;">Exportar CSV</button>
        <button id="__cat7a0_fechar" style="background:transparent;color:#aaa;
          border:none;cursor:pointer;font-size:16px;line-height:1;">✕</button>
      </div>
    </div>
    <div id="__cat7a0_status" style="padding:6px 12px;background:#0d1b2a;
      color:#aaa;font-size:11px;border-bottom:1px solid #222;">
      Aguardando sorteio...</div>
    <div id="__cat7a0_corpo" style="overflow-y:auto;flex:1;padding:8px 12px;"></div>
  `;
  document.body.appendChild(painel);

  // --- Arrastar ---
  const hdr = document.getElementById('__cat7a0_header');
  let drag = false, ox = 0, oy = 0;
  hdr.addEventListener('mousedown', e => {
    drag = true;
    ox = e.clientX - painel.offsetLeft;
    oy = e.clientY - painel.offsetTop;
  });
  document.addEventListener('mousemove', e => {
    if (!drag) return;
    painel.style.left   = (e.clientX - ox) + 'px';
    painel.style.top    = (e.clientY - oy) + 'px';
    painel.style.bottom = 'auto';
    painel.style.right  = 'auto';
  });
  document.addEventListener('mouseup', () => drag = false);

  // --- Fechar ---
  document.getElementById('__cat7a0_fechar').onclick = () => {
    painel.remove();
    clearInterval(window.__cat7a0._interval);
    delete window.__cat7a0;
    console.log('[7a0] Encerrado.');
  };

  // --- Exportar CSV ---
  document.getElementById('__cat7a0_export').onclick = () => {
    const db = window.__cat7a0.times;
    if (!Object.keys(db).length) { alert('Nenhum elenco catalogado ainda.'); return; }
    let csv = 'Sele\u00e7\u00e3o,Copa,Jogador,Posi\u00e7\u00e3o,Overall\n';
    for (const t of Object.values(db))
      for (const j of t.jogadores)
        csv += `"${t.sel}","${t.copa}","${j.nome}","${j.pos}",${j.overall}\n`;
    const a = document.createElement('a');
    a.href     = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'overalls_7a0.csv';
    a.click();
  };

  // --- Atualizar painel ---
  function atualizarPainel() {
    const db     = window.__cat7a0.times;
    const corpo  = document.getElementById('__cat7a0_corpo');
    const status = document.getElementById('__cat7a0_status');
    const n      = Object.keys(db).length;
    status.textContent = `${n} elenco(s) · ${window.__cat7a0.total} jogador(es)`;
    if (!n) return;

    let html = '';
    for (const t of Object.values(db)) {
      const media = t.jogadores.length
        ? Math.round(t.jogadores.reduce((s, j) => s + j.overall, 0) / t.jogadores.length)
        : '—';
      html += `
        <div style="margin-bottom:12px;">
          <div style="color:#00d4aa;font-weight:bold;font-size:12px;
            border-bottom:1px solid #333;padding-bottom:3px;margin-bottom:4px;">
            ${t.sel} · ${t.copa}
            <span style="color:#888;font-size:10px;font-weight:normal;"> · m\u00e9dia ${media}</span>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="color:#555;font-size:10px;">
              <td>Jogador</td>
              <td style="text-align:center">Pos</td>
              <td style="text-align:right">OVR</td>
            </tr>`;
      for (const j of [...t.jogadores].sort((a, b) => b.overall - a.overall)) {
        const cor = j.overall >= 90 ? '#ffd700'
                  : j.overall >= 80 ? '#00d4aa'
                  : j.overall >= 70 ? '#e0e0e0'
                  : '#888';
        html += `
          <tr>
            <td style="padding:1px 0;">${j.nome}</td>
            <td style="text-align:center;color:#888;">${j.pos}</td>
            <td style="text-align:right;font-weight:bold;color:${cor};">${j.overall}</td>
          </tr>`;
      }
      html += `</table></div>`;
    }
    corpo.innerHTML = html;
  }

  // --- Leitura do DOM do 7a0 ---
  function lerTela() {
    const selEl  = document.querySelector('.rr-sel');
    const copaEl = document.querySelector('.rr-copa');
    if (!selEl || !copaEl) return;

    // Remove emojis de bandeira do nome da seleção
    const sel = selEl.textContent.replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '').trim();

    const copaM = copaEl.textContent.trim().match(/\d{4}/);
    if (!copaM) return;
    const copa  = copaM[0];
    const chave = `${sel}_${copa}`;

    // Já catalogado — ignora
    if (window.__cat7a0.times[chave]) return;

    const linhas    = document.querySelectorAll('.pool-row');
    if (!linhas.length) return;

    const jogadores = [];
    linhas.forEach(linha => {
      const nomeEl  = linha.querySelector('.pool-name');
      const posEl   = linha.querySelector('.pool-pos');
      const forceEl = linha.querySelector('.pool-force');
      if (!nomeEl || !forceEl) return;

      const txt = forceEl.textContent.trim();
      if (txt === '?' || txt === '') return;  // modo Memory — não coleta

      const overall = parseInt(txt, 10);
      if (isNaN(overall)) return;

      jogadores.push({
        nome:    nomeEl.textContent.trim(),
        pos:     posEl ? posEl.textContent.trim().split('/')[0] : '—',
        overall,
      });
    });

    if (!jogadores.length) return;

    window.__cat7a0.times[chave] = { sel, copa, jogadores };
    window.__cat7a0.total = Object.values(window.__cat7a0.times)
      .reduce((s, t) => s + t.jogadores.length, 0);

    atualizarPainel();
    console.log(`[7a0] Catalogado: ${sel} ${copa} (${jogadores.length} jogadores)`);
  }

  window.__cat7a0._interval = setInterval(lerTela, 600);
  console.log('%c[7a0] Catalogador iniciado! Jogue no modo Cl\u00e1ssico.', 'color:#00d4aa;font-weight:bold;');
})();
