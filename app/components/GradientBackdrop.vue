<template>
  <canvas
    ref="canvasEl"
    class="gradient-backdrop"
    :class="{ 'is-fallback': isFallback }"
    aria-hidden="true"
  />
</template>

<style scoped lang="scss">
  .gradient-backdrop {
    display: block;
    position: fixed;
    z-index: var(--z0);
    inset: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
  }

  .gradient-backdrop.is-fallback {
    background:
      radial-gradient(
        60% 55% at 80% 22%,
        hsla(282, 70%, 86%, 0.85),
        hsla(282, 70%, 86%, 0) 70%
      ),
      radial-gradient(
        55% 50% at 95% 38%,
        hsla(330, 80%, 88%, 0.7),
        hsla(330, 80%, 88%, 0) 70%
      ),
      radial-gradient(
        45% 45% at 62% 12%,
        hsla(220, 80%, 90%, 0.55),
        hsla(220, 80%, 90%, 0) 70%
      ),
      #fff;
  }
</style>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  type Renderer = {
    render: (timeSeconds: number) => void
    resize: () => void
    destroy: () => void
  }

  const canvasEl = ref<HTMLCanvasElement | null>(null)
  const isFallback = ref(false)

  let renderer: Renderer | null = null
  let rafId = 0
  let startTime = 0
  let reduceMotion = false

  // Three slowly-drifting pastel blobs on white. A tiny low-frequency noise
  // warp gives organic, photo-blur-like edges without any fractal detail.
  const PEACH = 'vec3(0.99, 0.825, 0.78)'
  const LAVENDER = 'vec3(0.825, 0.785, 0.955)'
  const PALE_BLUE = 'vec3(0.815, 0.860, 0.965)'
  const SPEED = '0.14'
  const DRIFT = '0.08'
  const WARP_AMP = '0.20'
  const PULSE = '0.14'

  const WGSL = /* wgsl */ `
    struct Uniforms {
      time: f32,
      width: f32,
      height: f32,
      _pad: f32,
    }
    @group(0) @binding(0) var<uniform> u: Uniforms;

    @vertex
    fn vs(@builtin(vertex_index) vid: u32) -> @builtin(position) vec4<f32> {
      let x = f32((vid << 1u) & 2u) * 2.0 - 1.0;
      let y = 1.0 - f32(vid & 2u) * 2.0;
      return vec4<f32>(x, y, 0.0, 1.0);
    }

    fn hash21(p: vec2<f32>) -> f32 {
      let h = dot(p, vec2<f32>(127.1, 311.7));
      return fract(sin(h) * 43758.5453);
    }

    fn vnoise(p: vec2<f32>) -> f32 {
      let i = floor(p);
      let f = fract(p);
      let u_ = f * f * (3.0 - 2.0 * f);
      let a = hash21(i);
      let b = hash21(i + vec2<f32>(1.0, 0.0));
      let c = hash21(i + vec2<f32>(0.0, 1.0));
      let d = hash21(i + vec2<f32>(1.0, 1.0));
      return mix(mix(a, b, u_.x), mix(c, d, u_.x), u_.y);
    }

    fn blob(uv: vec2<f32>, center: vec2<f32>, radius: f32) -> f32 {
      let d = distance(uv, center);
      let k = d / radius;
      return exp(-k * k * 1.6);
    }

    @fragment
    fn fs(@builtin(position) pos: vec4<f32>) -> @location(0) vec4<f32> {
      let res = vec2<f32>(u.width, u.height);
      let aspect = res.x / max(res.y, 1.0);
      var uv = pos.xy / res;
      uv.x = uv.x * aspect;

      let t = u.time * ${SPEED};

      // low-frequency warp for organic, blurred-photo edges
      let warp = vec2<f32>(
        vnoise(uv * 1.4 + vec2<f32>(0.0, t * 1.2)),
        vnoise(uv * 1.4 + vec2<f32>(7.3, -t)),
      ) - 0.5;
      let p = uv + warp * ${WARP_AMP};

      // blob centers anchored to the right side, drifting slowly. A second
      // peach lobe sits lower so the warm wash carries further down.
      let c1 = vec2<f32>(0.92 * aspect, 0.12) + ${DRIFT} * vec2<f32>(sin(t * 1.1), cos(t * 1.3));
      let c2 = vec2<f32>(1.05 * aspect, 0.55) + ${DRIFT} * vec2<f32>(cos(t * 0.9), sin(t * 1.2));
      let c3 = vec2<f32>(0.92 * aspect, 0.92) + ${DRIFT} * vec2<f32>(sin(t * 0.8 + 1.4), cos(t * 0.7));
      let c4 = vec2<f32>(1.02 * aspect, 0.32) + ${DRIFT} * vec2<f32>(cos(t * 1.2 + 0.6), sin(t * 0.9));

      let r1 = 0.78 * aspect * (1.0 + ${PULSE} * sin(t * 0.85));
      let r2 = 0.58 * aspect * (1.0 + ${PULSE} * sin(t * 0.72 + 1.2));
      let r3 = 0.62 * aspect * (1.0 + ${PULSE} * sin(t * 0.65 + 2.4));
      let r4 = 0.55 * aspect * (1.0 + ${PULSE} * sin(t * 0.90 + 0.5));

      let w1 = blob(p, c1, r1);
      let w2 = blob(p, c2, r2);
      let w3 = blob(p, c3, r3);
      let w4 = blob(p, c4, r4);

      // soft left-to-right fade so the left third stays mostly white
      let sideMask = smoothstep(0.18, 0.85, uv.x / aspect);

      var col = vec3<f32>(1.0);
      col = mix(col, ${PEACH},    clamp(w1 * 0.85 * sideMask, 0.0, 1.0));
      col = mix(col, ${PEACH},    clamp(w4 * 0.60 * sideMask, 0.0, 1.0));
      col = mix(col, ${LAVENDER}, clamp(w2 * 0.58 * sideMask, 0.0, 1.0));
      col = mix(col, ${PALE_BLUE},clamp(w3 * 0.50 * sideMask, 0.0, 1.0));

      return vec4<f32>(col, 1.0);
    }
  `

  const GLSL_VERT = /* glsl */ `#version 300 es
    void main() {
      vec2 pos = vec2(
        float((gl_VertexID << 1) & 2),
        float(gl_VertexID & 2)
      );
      gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
    }
  `

  const GLSL_FRAG = /* glsl */ `#version 300 es
    precision highp float;
    uniform float u_time;
    uniform vec2 u_resolution;
    out vec4 outColor;

    float hash21(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float vnoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      float a = hash21(i);
      float b = hash21(i + vec2(1.0, 0.0));
      float c = hash21(i + vec2(0.0, 1.0));
      float d = hash21(i + vec2(1.0, 1.0));
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    float blob(vec2 uv, vec2 center, float radius) {
      float d = distance(uv, center);
      float k = d / radius;
      return exp(-k * k * 1.6);
    }

    void main() {
      vec2 res = u_resolution;
      // flip y so the composition matches WebGPU (origin top-left)
      vec2 frag = vec2(gl_FragCoord.x, res.y - gl_FragCoord.y);
      float aspect = res.x / max(res.y, 1.0);
      vec2 uv = frag / res;
      uv.x *= aspect;

      float t = u_time * ${SPEED};

      vec2 warp = vec2(
        vnoise(uv * 1.4 + vec2(0.0, t * 1.2)),
        vnoise(uv * 1.4 + vec2(7.3, -t))
      ) - 0.5;
      vec2 p = uv + warp * ${WARP_AMP};

      vec2 c1 = vec2(0.92 * aspect, 0.12) + ${DRIFT} * vec2(sin(t * 1.1), cos(t * 1.3));
      vec2 c2 = vec2(1.05 * aspect, 0.55) + ${DRIFT} * vec2(cos(t * 0.9), sin(t * 1.2));
      vec2 c3 = vec2(0.92 * aspect, 0.92) + ${DRIFT} * vec2(sin(t * 0.8 + 1.4), cos(t * 0.7));
      vec2 c4 = vec2(1.02 * aspect, 0.32) + ${DRIFT} * vec2(cos(t * 1.2 + 0.6), sin(t * 0.9));

      float r1 = 0.78 * aspect * (1.0 + ${PULSE} * sin(t * 0.85));
      float r2 = 0.58 * aspect * (1.0 + ${PULSE} * sin(t * 0.72 + 1.2));
      float r3 = 0.62 * aspect * (1.0 + ${PULSE} * sin(t * 0.65 + 2.4));
      float r4 = 0.55 * aspect * (1.0 + ${PULSE} * sin(t * 0.90 + 0.5));

      float w1 = blob(p, c1, r1);
      float w2 = blob(p, c2, r2);
      float w3 = blob(p, c3, r3);
      float w4 = blob(p, c4, r4);

      float sideMask = smoothstep(0.18, 0.85, uv.x / aspect);

      vec3 col = vec3(1.0);
      col = mix(col, ${PEACH},    clamp(w1 * 0.85 * sideMask, 0.0, 1.0));
      col = mix(col, ${PEACH},    clamp(w4 * 0.60 * sideMask, 0.0, 1.0));
      col = mix(col, ${LAVENDER}, clamp(w2 * 0.58 * sideMask, 0.0, 1.0));
      col = mix(col, ${PALE_BLUE},clamp(w3 * 0.50 * sideMask, 0.0, 1.0));

      outColor = vec4(col, 1.0);
    }
  `

  function applyCanvasSize(canvas: HTMLCanvasElement) {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const w = Math.max(1, Math.floor(canvas.clientWidth * dpr * 0.85))
    const h = Math.max(1, Math.floor(canvas.clientHeight * dpr * 0.85))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }
  }

  async function createWebGPURenderer(
    canvas: HTMLCanvasElement,
  ): Promise<Renderer | null> {
    const nav = navigator as Navigator & { gpu?: GPU }
    if (!nav.gpu) return null

    const adapter = await nav.gpu.requestAdapter()
    if (!adapter) throw new Error('requestAdapter() returned null')
    const device = await adapter.requestDevice()
    device.addEventListener('uncapturederror', (e) => {
      console.error(
        '[GradientBackdrop] WebGPU uncaptured error',
        (e as GPUUncapturedErrorEvent).error,
      )
    })

    const context = canvas.getContext('webgpu') as GPUCanvasContext | null
    if (!context) throw new Error('canvas.getContext("webgpu") returned null')
    const format = nav.gpu.getPreferredCanvasFormat()
    context.configure({ device, format, alphaMode: 'opaque' })

    const module = device.createShaderModule({ code: WGSL })
    const info = await module.getCompilationInfo()
    if (info.messages.some((m) => m.type === 'error')) {
      console.error('[GradientBackdrop] WGSL compile errors', info.messages)
      throw new Error('WGSL compilation failed')
    }
    const pipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex: { module, entryPoint: 'vs' },
      fragment: { module, entryPoint: 'fs', targets: [{ format }] },
      primitive: { topology: 'triangle-list' },
    })
    const uniformBuffer = device.createBuffer({
      size: 16,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })
    const bindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
    })

    return {
      resize: () => applyCanvasSize(canvas),
      render: (timeSeconds: number) => {
        const data = new Float32Array([
          timeSeconds,
          canvas.width,
          canvas.height,
          0,
        ])
        device.queue.writeBuffer(uniformBuffer, 0, data)
        const encoder = device.createCommandEncoder()
        const pass = encoder.beginRenderPass({
          colorAttachments: [
            {
              view: context.getCurrentTexture().createView(),
              clearValue: { r: 1, g: 1, b: 1, a: 1 },
              loadOp: 'clear',
              storeOp: 'store',
            },
          ],
        })
        pass.setPipeline(pipeline)
        pass.setBindGroup(0, bindGroup)
        pass.draw(3)
        pass.end()
        device.queue.submit([encoder.finish()])
      },
      destroy: () => device.destroy(),
    }
  }

  function compileShader(
    gl: WebGL2RenderingContext,
    type: number,
    src: string,
  ): WebGLShader {
    const sh = gl.createShader(type)
    if (!sh) throw new Error('createShader returned null')
    gl.shaderSource(sh, src.trimStart())
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(sh)
      gl.deleteShader(sh)
      throw new Error(`shader compile failed: ${log}`)
    }
    return sh
  }

  function createWebGL2Renderer(canvas: HTMLCanvasElement): Renderer | null {
    const gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    })
    if (!gl) return null

    const vs = compileShader(gl, gl.VERTEX_SHADER, GLSL_VERT)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, GLSL_FRAG)
    const program = gl.createProgram()
    if (!program) throw new Error('createProgram returned null')
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program)
      throw new Error(`program link failed: ${log}`)
    }
    gl.deleteShader(vs)
    gl.deleteShader(fs)

    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes = gl.getUniformLocation(program, 'u_resolution')

    // A no-attribute VAO is required for draw calls in core-profile WebGL2.
    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)

    gl.useProgram(program)

    return {
      resize: () => {
        applyCanvasSize(canvas)
        gl.viewport(0, 0, canvas.width, canvas.height)
      },
      render: (timeSeconds: number) => {
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.useProgram(program)
        gl.bindVertexArray(vao)
        gl.uniform1f(uTime, timeSeconds)
        gl.uniform2f(uRes, canvas.width, canvas.height)
        gl.clearColor(1, 1, 1, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      },
      destroy: () => {
        gl.deleteProgram(program)
        gl.deleteVertexArray(vao)
      },
    }
  }

  function loop() {
    if (!renderer) return
    renderer.render((performance.now() - startTime) / 1000)
    rafId = requestAnimationFrame(loop)
  }

  function onResize() {
    renderer?.resize()
    if (reduceMotion) renderer?.render((performance.now() - startTime) / 1000)
  }

  async function init() {
    const canvas = canvasEl.value
    if (!canvas) return
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    try {
      renderer = await createWebGPURenderer(canvas)
      if (renderer) {
        console.info('[GradientBackdrop] using WebGPU')
      }
    } catch (err) {
      console.warn('[GradientBackdrop] WebGPU init failed, trying WebGL2', err)
      renderer = null
    }

    if (!renderer) {
      try {
        renderer = createWebGL2Renderer(canvas)
        if (renderer) console.info('[GradientBackdrop] using WebGL2')
      } catch (err) {
        console.error('[GradientBackdrop] WebGL2 init failed', err)
        renderer = null
      }
    }

    if (!renderer) {
      console.warn(
        '[GradientBackdrop] no GPU renderer available — using CSS fallback',
      )
      isFallback.value = true
      return
    }

    renderer.resize()
    window.addEventListener('resize', onResize, { passive: true })
    startTime = performance.now()
    if (reduceMotion) {
      renderer.render(8)
    } else {
      rafId = requestAnimationFrame(loop)
    }
  }

  onMounted(() => {
    init()
  })

  onBeforeUnmount(() => {
    if (rafId) cancelAnimationFrame(rafId)
    window.removeEventListener('resize', onResize)
    renderer?.destroy()
    renderer = null
  })
</script>
