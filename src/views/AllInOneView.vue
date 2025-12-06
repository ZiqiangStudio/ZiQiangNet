<script setup lang="ts">
import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'
import TimelineView from './TimelineView.vue'
import ActivityView from './ActivityView.vue'
import ProductView from './ProductView.vue'
import DepartmentView from './Departmentview.vue'
import JoinView from './JoinView.vue'
import { onMounted, onUnmounted } from 'vue'
import router from '../router'

let observer: IntersectionObserver | null = null
let rafId: number | null = null
let scrollRafId: number | null = null

function updateHash(id: string) {
  const newHash = `#${id}`
  if (window.location.hash === newHash) return
  // Use replace to avoid polluting back stack while scrolling
  router.replace({ hash: newHash })
}

onMounted(() => {
  const sectionEls = Array.from(document.querySelectorAll<HTMLElement>('main.all-in-one > section'))
  if (!sectionEls.length) return

  const visibleRatios = new Map<string, number>()

  const handle = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(e => {
      const id = (e.target as HTMLElement).id
      visibleRatios.set(id, e.intersectionRatio)
    })
    if (rafId != null) return
    rafId = window.requestAnimationFrame(() => {
      rafId = null
      // Pick the most visible section over a small threshold
      let bestId = ''
      let bestRatio = 0
      visibleRatios.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio
          bestId = id
        }
      })
      if (bestId && bestRatio >= 0.51) {
        updateHash(bestId)
      }
    })
  }

  observer = new IntersectionObserver(handle, {
    root: null,
    // Slight top bias so the next section activates earlier
    rootMargin: '-10% 0px -40% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1],
  })

  sectionEls.forEach(el => observer!.observe(el))

  // Fallback: scroll listener using viewport center to decide active section
  const onScroll = () => {
    // 防抖
    if( scrollRafId != null ) {
      clearTimeout(scrollRafId)
    }
    scrollRafId = setTimeout(() => {
      const viewportCenter = window.scrollY + window.innerHeight * 0.5
      let bestId = ''
      let bestDist = Number.POSITIVE_INFINITY
      for (const el of sectionEls) {
        const rect = el.getBoundingClientRect()
        const elCenter = window.scrollY + rect.top + rect.height / 2
        const dist = Math.abs(elCenter - viewportCenter)
        if (dist < bestDist) {
          bestDist = dist
          bestId = el.id
        }
      }
      if (bestId) updateHash(bestId)
      scrollRafId = null
    }, 100);
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  // Initial sync
  if (!window.location.hash) {
    onScroll()
  }

  // Store remover reference for cleanup
  ; (window as any).__allInOneScrollRemover = () => window.removeEventListener('scroll', onScroll)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (rafId != null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  if (scrollRafId != null) {
    cancelAnimationFrame(scrollRafId)
    scrollRafId = null
  }
  // Remove scroll listener via stored reference
  const remover = (window as any).__allInOneScrollRemover as (() => void) | undefined
  if (typeof remover === 'function') {
    remover()
      ; (window as any).__allInOneScrollRemover = null
  }
})
</script>

<template>
  <main class="all-in-one">
    <section id="home" class="section">
      <HomeView />
    </section>
    <section id="about" class="section">
      <AboutView />
    </section>
    <section id="timeline" class="section">
      <TimelineView />
    </section>
    <section id="product" class="section">
      <ProductView />
    </section>
    <section id="activity" class="section">
      <ActivityView />
    </section>
    <section id="department" class="section">
      <DepartmentView />
    </section>
    <section id="join" class="section">
      <JoinView />
    </section>
  </main>

</template>

<style scoped>
.all-in-one {
  width: 100%;
  scroll-snap-type: y mandatory;
}

.section {
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
</style>
