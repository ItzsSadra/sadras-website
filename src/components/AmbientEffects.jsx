import { useEffect, useRef, useMemo } from "react";

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        size: ((i * 7 + 3) % 25) / 10 + 1,
        left: ((i * 13 + 7) % 100),
        top: ((i * 17 + 11) % 100),
        delay: ((i * 3) % 60) / 10,
        duration: ((i * 5) % 80) / 10 + 8,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#64DC90]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: 0,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function CursorGlow() {
  const ref = useRef(null);
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

  useEffect(() => {
    if (isTouchDevice) return;

    let rafId;
    let currentX = -200;
    let currentY = -200;

    const onMove = (e) => {
      const targetX = e.clientX;
      const targetY = e.clientY;

      function tick() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        if (ref.current) {
          ref.current.style.left = `${currentX - 150}px`;
          ref.current.style.top = `${currentY - 150}px`;
        }

        rafId = requestAnimationFrame(tick);
      }
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [isTouchDevice]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-[60]"
      style={{
        left: -150,
        top: -150,
        width: 300,
        height: 300,
        background:
          "radial-gradient(circle, rgba(100,220,144,0.06) 0%, transparent 70%)",
        borderRadius: "50%",
        willChange: "left, top",
      }}
    />
  );
}

export default function AmbientEffects() {
  return (
    <>
      <CursorGlow />
      <Particles />
    </>
  );
}
