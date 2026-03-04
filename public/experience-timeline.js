(function () {
  function initTimeline() {
    const wrap  = document.getElementById('experienceWrap');
    const rail  = document.getElementById('experienceRail');
    const fill  = document.getElementById('railFill');
    if (!wrap || !rail || !fill) {
      console.log('Timeline elements not found');
      return;
    }

    const items = Array.from(wrap.querySelectorAll('.experience-item'));
    if (items.length === 0) {
      console.log('No experience items found');
      return;
    }

    function setup() {
      rail.querySelectorAll('.timeline-node').forEach(n => n.remove());
      wrap.querySelectorAll('.experience__date-label').forEach(d => d.remove());

      const wrapRect    = wrap.getBoundingClientRect();
      const railXInWrap = wrapRect.width / 2;

      const midpoints = items.map(item => {
        const r = item.getBoundingClientRect();
        return (r.top - wrapRect.top) + r.height / 2;
      });

      const firstMid   = midpoints[0];
      const lastMid    = midpoints[midpoints.length - 1];
      const railHeight = lastMid - firstMid;

      rail.style.top    = firstMid + 'px';
      rail.style.height = railHeight + 'px';

      items.forEach((item, i) => {
        const nodeTopInRail = midpoints[i] - firstMid;
        const node = document.createElement('div');
        node.className      = 'timeline-node';
        node.style.top      = nodeTopInRail + 'px';
        node.dataset.index  = i;
        rail.appendChild(node);

        const dateStart = item.dataset.dateStart || '';
        const dateEnd   = item.dataset.dateEnd   || '';
        const isCurrent = item.dataset.current === 'true';
        const isLeft = (i % 2 !== 0);

        const label = document.createElement('div');
        label.className     = 'experience__date-label';
        label.dataset.index = i;
        label.innerHTML = isCurrent
          ? `<span class="date--current-text">${dateEnd}</span><span>${dateStart}</span>`
          : `<span>${dateEnd}</span><span>${dateStart}</span>`;

        label.style.top = midpoints[i] + 'px';

        if (isLeft) {
          label.style.left      = (railXInWrap + 20) + 'px';
          label.style.right     = 'auto';
          label.style.textAlign = 'left';
        } else {
          label.style.right     = (wrapRect.width - railXInWrap + 20) + 'px';
          label.style.left      = 'auto';
          label.style.textAlign = 'right';
        }

        wrap.appendChild(label);
      });
    }

    const getNode  = i => rail.querySelector(`.timeline-node[data-index="${i}"]`);
    const getLabel = i => wrap.querySelector(`.experience__date-label[data-index="${i}"]`);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const item = entry.target;
        const idx = items.indexOf(item);
        setTimeout(() => {
          const node  = getNode(idx);
          const label = getLabel(idx);
          if (node)  node.classList.add('is-visible');
          if (label) label.classList.add('is-visible');
        }, 200);
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' });

    items.forEach(item => observer.observe(item));

    function updateRail() {
      const railRect = rail.getBoundingClientRect();
      const viewH    = window.innerHeight;
      const scrolled = Math.max(0, viewH * 0.55 - railRect.top);
      const pct      = Math.min(100, (scrolled / railRect.height) * 100);
      fill.style.height = pct + '%';
    }

    requestAnimationFrame(() => { setup(); updateRail(); });
    window.addEventListener('scroll', updateRail, { passive: true });
    window.addEventListener('resize', () => requestAnimationFrame(setup), { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeline);
  } else {
    initTimeline();
  }
  
  window.initTimeline = initTimeline;
})();
