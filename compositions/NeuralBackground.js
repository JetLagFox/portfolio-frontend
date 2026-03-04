import { useEffect, useRef } from "react";

const NODES_COUNT = 75;
const DECAY_DISTANCE = 150;
const NODE_RADIUS = 4.5;
const HIGHLIGHTED_COUNT = 10;
const COLOR_GREEN = "214, 243, 31";
const COLOR_RED = "233, 69, 96";
const COLOR_WHITE = "255, 255, 255";

const NeuralBackground = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let nodes = [];
    let decayDist = DECAY_DISTANCE;

    const initNodes = () => {
      const isMobile = canvas.width < 768;
      decayDist = isMobile ? 80 : DECAY_DISTANCE;
      const count = isMobile ? 35 : NODES_COUNT;
      const hot = isMobile ? 4 : HIGHLIGHTED_COUNT;
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        highlighted: i < hot,
      }));
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initNodes();
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const updateOpacity = () => {
      const t = Math.min(1, window.scrollY / window.innerHeight);
      canvas.style.opacity = (1 - t * 0.85).toFixed(2);
    };
    updateOpacity();
    window.addEventListener("scroll", updateOpacity, { passive: true });

    const draw = () => {
      const now = Date.now() / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const p = Math.exp(-dist / decayDist);
          if (p < 0.01) continue;
          const isHot = nodes[i].highlighted || nodes[j].highlighted;
          ctx.strokeStyle = `rgba(${isHot ? COLOR_RED : COLOR_WHITE}, ${isHot ? p * 0.55 : p * 0.22})`;
          ctx.lineWidth = isHot ? 1.2 : 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      nodes.forEach((n) => {
        const pulse = n.highlighted
          ? NODE_RADIUS + Math.sin(now * 2 + n.x * 0.05) * 1.8
          : NODE_RADIUS;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.highlighted ? COLOR_RED : COLOR_GREEN}, ${n.highlighted ? 0.9 : 0.55})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      window.removeEventListener("scroll", updateOpacity);
    };
  }, []);

  return <canvas ref={canvasRef} className="neural-bg" aria-hidden="true" />;
};

export default NeuralBackground;
