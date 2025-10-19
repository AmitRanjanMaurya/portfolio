(function(){
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const data = [
    { name:'E-Commerce Platform', desc:'Custom scalable e-commerce site', tech:['React','Node.js','MongoDB'], cat:'web', img:'assets/placeholder-1.svg' },
    { name:'Analytics Dashboard', desc:'Interactive dashboard for business metrics', tech:['Python','D3.js','SQL'], cat:'data', img:'assets/placeholder-2.svg' },
    { name:'AI Chatbot', desc:'AI-powered customer service assistant', tech:['Python','NLP'], cat:'ai', img:'assets/placeholder-3.svg' },
    { name:'WordPress Theme', desc:'Custom WordPress theme for blog/portfolio', tech:['WordPress'], cat:'web', img:'assets/placeholder-1.svg' },
    { name:'Task Management App', desc:'Full-stack app for productivity', tech:['JS','REST'], cat:'web', img:'assets/placeholder-2.svg' },
    { name:'REST API Service', desc:'Custom API backend for integrations', tech:['Node.js','Express'], cat:'web', img:'assets/placeholder-3.svg' }
  ];

  const createCard = (p) => {
    const article = document.createElement('article');
    article.className = 'card';
    article.setAttribute('data-cat', p.cat);
    article.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy" width="640" height="420" />
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
      </div>
    `;
    article.addEventListener('click', () => openModal(p));
    return article;
  };

  const render = (items) => {
    grid.innerHTML = '';
    items.forEach(p => grid.appendChild(createCard(p)));
  };

  const filterButtons = document.querySelectorAll('[data-filter]');
  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.getAttribute('data-filter');
    render(f === 'all' ? data : data.filter(d => d.cat === f));
  }));

  // Modal
  const modal = document.getElementById('project-modal');
  const title = document.getElementById('project-title');
  const desc = document.getElementById('project-desc');
  const tech = document.getElementById('project-tech');

  const openModal = (p) => {
    if (!modal) return;
    title.textContent = p.name;
    desc.textContent = p.desc;
    tech.innerHTML = p.tech.map(t => `<span class="chip">${t}</span>`).join('');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  };
  if (modal){
    modal.addEventListener('click', (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.hasAttribute('data-close') || t.classList.contains('modal')) closeModal();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }

  // Initial render and lazy image handling handled by native loading=lazy
  render(data);
})();


