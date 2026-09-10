<template>
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="open"
        key="fotos-dialog"
        class="fotos-layer"
        :initial="enter"
        :animate="shown"
        :exit="leave"
      >
        <div
          class="fotos-layer__backdrop"
          @click="close"
        />

        <div
          id="fotos-dialog"
          class="fotos-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fotos-dialog-title"
          tabindex="-1"
          @click.stop
        >
          <button
            ref="closeRef"
            type="button"
            class="fotos-dialog__close"
            aria-label="Close case study"
            @click="close"
          >
            <IconClose class="fotos-dialog__close-icon" />
          </button>

          <div class="fotos-dialog__fade" />

          <div class="fotos-dialog__scroll">
            <header class="fotos-dialog__header">
              <h2
                id="fotos-dialog-title"
                class="fotos-dialog__title"
              >
                Proportional Design Fotos Architecture
              </h2>
            </header>

            <div class="fotos-dialog__meta">
              <p class="thin">Contributions: Agentic engineering</p>
              <p class="thin">Timeline: 2026</p>
            </div>

            <article class="fotos-dialog__article">
              <p>
                I take a lot of photos of my woodworking projects — finished
                pieces, half-cut joinery, the workshop on a quiet morning. For
                years they'd pile up on my Camera Roll until I either lost them
                in iCloud or never posted them. I wanted a small public-facing
                gallery that felt like mine — not Instagram, not Lightroom, not
                a cloud-photo product I'd have to feed forever. So I built one.
                The whole thing lives at
                <a
                  href="https://proportional.design"
                  target="_blank"
                  rel="noopener"
                  >proportional.design</a
                >, and I never open it to upload a photo.
              </p>

              <h3 class="fotos-dialog__heading">
                ↬ What prompted me to build this?
              </h3>

              <p>
                ① The honest answer is friction. Every existing path between my
                Camera Roll and a personal website involves at least three steps
                — pick the photo, open a CMS, upload, fill in a caption — and
                most of the time I don't make it past step two. I wanted the act
                of publishing to disappear into something I was already doing.
                Sharing.
              </p>

              <p>
                The iPhone Share Sheet is the most under-loved design surface on
                the platform. It's where every app gets one button to be useful.
                So I gave myself a constraint: the website would have no upload
                UI at all. If I couldn't publish from the Share Sheet, I
                couldn't publish.
              </p>

              <h3 class="fotos-dialog__heading">↬ Where did I start?</h3>

              <p>
                ② With a Shortcut. I built a Shortcut called "Fotos" that sits
                in the Share Sheet next to "Copy" and "AirDrop". When I tap it,
                three things happen — the photo gets resized to 1000px wide
                (it's a website, not a print archive), it's POSTed as raw binary
                to a single endpoint at /api/upload-photo, and the original
                filename rides along as a query param so I can use it as a
                public id later.
              </p>

              <p>
                That's the whole upload "flow." There's no form. The Shortcut is
                the form.
              </p>

              <h3 class="fotos-dialog__heading">↬ What did I build?</h3>

              <p>
                ③ The site is a small Nuxt 4 app on Vercel. The interesting
                parts aren't really the framework choices — they're the bits
                that try to honor the original constraint, which is that I
                shouldn't have to think about any of this once a photo leaves my
                phone.
              </p>

              <p>
                The upload handler does the work I'd otherwise be doing in a
                CMS. When the binary arrives, the handler reads EXIF data with
                sharp to recover the date the photo was actually taken (so the
                gallery sorts by capture time, not upload time), re-encodes the
                file to WebP at quality 85, and uploads it to Cloudinary, which
                is acting as the only real database in the system. There's no
                Postgres, no S3 bucket, no admin panel — just a folder.
              </p>

              <p>
                Tags are written by Claude, but on a leash. After the upload,
                the handler hands the WebP plus a list of every tag that already
                exists on Cloudinary to Claude as a vision request. The system
                prompt is strict: choose zero to six tags from the allowed list,
                never invent new ones, prefer fewer high-confidence tags, treat
                workbenches and floors as setting (not subject). The model
                returns JSON. Anything outside the vocabulary is dropped
                server-side. The point isn't to let an AI categorize my work —
                it's to let it re-use categories I already chose, so the
                gallery's vocabulary doesn't drift over time.
              </p>

              <p>
                The gallery is one page that streams in. The home view fetches a
                single /api/photos JSON and renders an 8-column grid that
                collapses to 2 columns on phones. Each photo reveals with a
                small blur-to-sharp transition as it enters the viewport via
                IntersectionObserver. The lightbox is a Teleport-based overlay
                with arrow-key nav, swipe support, and a soft blur during
                transitions so the swap doesn't feel like a flash of broken
                layout. Long-pressing any tile triggers an iOS-style wiggle and
                a delete affordance that's password protected — the same gesture
                I'd use on the home screen, mapped to the same outcome.
              </p>

              <p>
                Filtering happens by talking to it. There's a small floating
                "island" at the bottom of the screen — a single text input with
                a tag menu. You can tap a tag to filter, but you can also type
                "show me just the walnut chairs" and a second Claude call
                returns a tag set whose intersection becomes the active filter.
                The model gets a manifest of every photo's caption and tags as
                cached system context, plus the current active filter, and
                decides whether the user wants to add, replace, intersect, or
                clear. The grid updates on the response.
              </p>

              <p>
                Vercel's edge cache holds the photo list. The /api/photos
                endpoint returns the same JSON for every visitor in any given
                minute, so I declared it cacheable via routeRules with
                s-maxage=60, stale-while-revalidate=300. First request in a
                window pays the Cloudinary round-trip; the next 60 seconds of
                visitors get the response from the edge with no function
                invocation at all. Combined with switching the gallery's data
                fetch to useLazyFetch so the page shell paints before the data
                resolves, the app now gets to first interaction in well under a
                second on a cold visit.
              </p>

              <h3 class="fotos-dialog__heading">
                ↬ What I deliberately didn't build
              </h3>

              <p>
                ④ No accounts. no comments, or likes. No EXIF flexing (lens,
                ISO, focal length — the photo is the photo). No infinite scroll
                — 500 photos render fine and pagination would be a tax on the
                one viewer who wants to see all of them. No upload screen on the
                website.
              </p>

              <p>
                The site is small on purpose. The constraint that started the
                project — publishing should disappear into sharing — turned out
                to be the thing that kept it small the whole way through. Every
                time I considered adding a feature, the question was whether it
                would survive being invoked from a Share Sheet on a phone with
                one thumb. Most things didn't.
              </p>

              <p>
                I'd happily extrapolate on any of the above — the Shortcut
                definition itself, the auto-tag prompt, the chat tool schema, or
                the perf work — if you're curious.
              </p>
            </article>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<style scoped lang="scss">
  .fotos-layer {
    position: fixed;
    inset: 0;
    z-index: var(--z5);
  }

  .fotos-layer__backdrop {
    position: absolute;
    inset: 0;
  }

  .fotos-dialog {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    right: calc(var(--safe-right) + 1.6rem);
    bottom: calc(var(--safe-bottom) + 1.6rem);
    width: min(49.2rem, calc(100vw - 3.2rem - var(--safe-left) - var(--safe-right)));
    height: min(58.4rem, calc(100dvh - 3.2rem - var(--safe-top) - var(--safe-bottom)));
    overflow: hidden;
    border-radius: 2.3rem;
    background: #fff;
    box-shadow:
      0 1.13px 3.63px 0 rgba(0, 0, 0, 0.05),
      0 9px 29px 0 rgba(0, 0, 0, 0.09);
  }

  .fotos-dialog__close {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 2;
    top: 1.6rem;
    right: 1.6rem;
    width: 4.6rem;
    height: 4.6rem;
    border: 1px solid #e8e8e8;
    border-radius: 100px;
    color: #000;
    background: #fff;
    box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.06);
    cursor: var(--cursor);
    transition: background var(--ease);

    &:hover {
      background: #f7f7f7;
    }
  }

  .fotos-dialog__close-icon {
    display: block;
    width: 1.2rem;
    height: 1.2rem;
  }

  .fotos-dialog__fade {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    left: 0;
    height: 7.2rem;
    background: linear-gradient(180deg, #fff 52%, rgba(255, 255, 255, 0));
    pointer-events: none;
  }

  .fotos-dialog__scroll {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
    padding: 8.4rem 2.8rem 3.2rem;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .fotos-dialog__header {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .fotos-dialog__title {
    color: #000;
    font-size: 2.8rem;
    font-family: var(--system-font);
    font-weight: 500;
    letter-spacing: -0.112rem;
    line-height: 1.2;
  }

  .fotos-dialog__meta {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    width: 100%;
  }

  .fotos-dialog__meta p {
    margin: 0;
    font-size: 1.5rem;
    letter-spacing: 0.025rem;
    line-height: 1.2;
  }

  .fotos-dialog__article {
    display: flex;
    flex-direction: column;
    gap: 2.8rem;
  }

  .fotos-dialog__heading {
    color: #000;
    font-size: 1.6rem;
    font-family: var(--system-font);
    font-weight: 500;
    letter-spacing: -0.05rem;
    line-height: 1.5;
  }

  .fotos-dialog__article p {
    margin: 0;
    color: #000;
    font-size: 1.6rem;
    font-family: var(--system-font);
    font-weight: 400;
    letter-spacing: -0.075rem;
    line-height: 1.6;
  }

  .fotos-dialog__article p + p {
    margin-bottom: 0;
  }

  .fotos-dialog__article a {
    text-decoration: underline;
    text-decoration-thickness: 0.064rem;
    text-underline-offset: 0.3rem;
  }
</style>

<script setup lang="ts">
  import { motion, AnimatePresence } from 'motion-v'

  const props = defineProps<{
    open: boolean
  }>()

  const emit = defineEmits<{
    close: []
  }>()

  const closeRef = ref<HTMLButtonElement | null>(null)
  const reduceMotion = ref(false)
  let previousOverflow = ''
  let previousFocus: HTMLElement | null = null

  const motionMs = computed(() => (reduceMotion.value ? 0.01 : 0.4))

  const enter = computed(() => ({
    opacity: 0,
    filter: reduceMotion.value ? 'blur(0px)' : 'blur(10px)',
  }))

  const shown = computed(() => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: motionMs.value, ease: [0.8, 0, 0.16, 1] },
  }))

  const leave = computed(() => ({
    opacity: 0,
    filter: reduceMotion.value ? 'blur(0px)' : 'blur(10px)',
    transition: { duration: reduceMotion.value ? 0.01 : 0.28, ease: [0.8, 0, 0.16, 1] },
  }))

  function close() {
    emit('close')
  }

  function onWindowKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
    }
  }

  watch(
    () => props.open,
    async (isOpen) => {
      if (!import.meta.client) return

      if (isOpen) {
        previousFocus = document.activeElement as HTMLElement | null
        previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', onWindowKeydown)
        await nextTick()
        closeRef.value?.focus()
        return
      }

      window.removeEventListener('keydown', onWindowKeydown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
      previousFocus = null
    },
  )

  onMounted(() => {
    reduceMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onWindowKeydown)
    if (props.open) {
      document.body.style.overflow = previousOverflow
    }
  })
</script>
