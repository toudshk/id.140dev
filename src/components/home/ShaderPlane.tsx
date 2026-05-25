"use client";

import { useEffect, useRef } from "react";

/**
 * Three.js шейдерная плоскость на весь экран.
 * Это не «жирный 3D-фон». Это медленно дышащее поле тумана и помех,
 * которое реагирует на курсор и время. Без сайтовых клише.
 *
 * Подгружаем three лениво, чтобы main bundle оставался худым.
 */
export function ShaderPlane() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let raf = 0;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      if (disposed || !ref.current) return;

      const canvas = ref.current;
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "low-power"
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight, false);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uRes: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        }
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec2 uRes;

          // дешёвый псевдошум
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }

          void main() {
            vec2 uv = vUv;
            vec2 p = uv;
            p.x *= uRes.x / uRes.y;

            float t = uTime * 0.04;
            float n1 = noise(p * 2.5 + t);
            float n2 = noise(p * 6.0 - t * 1.4);
            float n3 = noise(p * 22.0 + t * 0.6);

            float field = pow(n1, 2.0) * 0.7 + n2 * 0.25 + n3 * 0.05;

            // тяжесть к курсору
            float d = distance(uv, uMouse);
            float pull = smoothstep(0.7, 0.0, d);
            field = mix(field, field * 1.6, pull * 0.4);

            // горизонтальные «строчки развёртки»
            float scan = step(0.5, fract(uv.y * 320.0)) * 0.05;

            vec3 bone = vec3(0.905, 0.886, 0.839);
            vec3 voidc = vec3(0.039, 0.039, 0.039);
            vec3 col = mix(voidc, bone, field * 0.18 + scan);

            // лёгкая ржавчина по краям
            float vign = smoothstep(1.2, 0.4, length(uv - 0.5) * 1.4);
            col = mix(col * 0.6, col, vign);

            // зерно
            float g = (hash(uv * uRes + uTime) - 0.5) * 0.05;
            col += g;

            gl_FragColor = vec4(col, 0.92);
          }
        `
      });

      const geom = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geom, material);
      scene.add(mesh);

      const onResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
      };
      const onMove = (e: MouseEvent) => {
        uniforms.uMouse.value.set(
          e.clientX / window.innerWidth,
          1 - e.clientY / window.innerHeight
        );
      };
      window.addEventListener("resize", onResize);
      window.addEventListener("mousemove", onMove);

      const start = performance.now();
      const tick = () => {
        uniforms.uTime.value = (performance.now() - start) / 1000;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMove);
        geom.dispose();
        material.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 h-screen w-screen"
      aria-hidden="true"
    />
  );
}
