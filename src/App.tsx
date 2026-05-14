import { useEffect } from 'react'
import { About } from './components/About'
import { AnimatedCursor } from './components/AnimatedCursor'
import { Contact } from './components/Contact'
import { Founder } from './components/Founder'
import { Coverage } from './components/Coverage'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ServiceChart } from './components/ServiceChart'
import { Services } from './components/Services'
import { Testimonials } from './components/Testimonials'
import { WhatsAppButton } from './components/WhatsAppButton'
import { WhyChooseUs } from './components/WhyChooseUs'
import { ThemeProvider } from './context/ThemeProvider'
import { scrollToCurrentHash, startSmoothScrollToUrlHash } from './lib/sectionNav'

function App() {
  useEffect(() => {
    const prevRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'

    const stopInitial = startSmoothScrollToUrlHash()

    const onHashOrPop = () => scrollToCurrentHash()
    window.addEventListener('hashchange', onHashOrPop)
    window.addEventListener('popstate', onHashOrPop)

    return () => {
      stopInitial()
      history.scrollRestoration = prevRestoration
      window.removeEventListener('hashchange', onHashOrPop)
      window.removeEventListener('popstate', onHashOrPop)
    }
  }, [])

  return (
    <ThemeProvider>
      <AnimatedCursor />
      <a
        href="#contact"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-stone-900 focus:shadow-lg"
        aria-label="Skip to contact form"
      >
        Skip to contact form
      </a>
      <Header />
      <main id="main-content" aria-label="Main content">
        <Hero />
        <About />
        <Founder />
        <Services />
        <WhyChooseUs />
        <Coverage />
        <ServiceChart />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </ThemeProvider>
  )
}

export default App
