import { useEffect, useState } from 'react'
import './App.css'

const features = [
  {
    label: 'OPORTUNIDADES',
    title: 'Identificar as melhores oportunidades',
    description:
      'Encontre imóveis em leilão que merecem uma análise mais atenta.',
  },
  {
    label: 'AVALIAÇÃO',
    title: 'Estimar o valor de mercado',
    description:
      'Tenha uma referência de valor para avaliar cada imóvel com mais contexto.',
  },
  {
    label: 'EDITAIS',
    title: 'Consultar condições e riscos',
    description:
      'Visualize informações importantes do edital antes de considerar um lance.',
  },
  {
    label: 'RETORNO',
    title: 'Analisar retorno e incerteza',
    description:
      'Compare o retorno potencial e a possibilidade de prejuízo em diferentes cenários.',
  },
]

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen])

  function moveFeature(direction) {
    setActiveFeature((current) => (current + direction + features.length) % features.length)
  }

  return (
    <div className="app-shell" id="home">
      <header className="topbar">
        <div className="topbar__identity">
          <button
            className={`menu-toggle${isMenuOpen ? ' is-open' : ''}`}
            type="button"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="menu-toggle__icon" aria-hidden="true" />
          </button>
          <a className="brand" href="#home" aria-label="Radar imobiliário, início">
            <span className="brand__mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="brand__name">RADAR</span>
            <span className="brand__divider" />
            <span className="brand__descriptor">IMÓVEIS EM LEILÃO</span>
          </a>
        </div>
      </header>

      {isMenuOpen && (
        <>
          <button
            className="drawer-scrim"
            type="button"
            aria-label="Fechar menu"
            onClick={() => setIsMenuOpen(false)}
          />
          <aside className="side-drawer" id="main-navigation">
            <div className="side-drawer__heading">
              <span>NAVEGAÇÃO</span>
              <button
                className="drawer-close"
                type="button"
                aria-label="Fechar menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <nav aria-label="Menu principal">
              <a
                className="navigation-link navigation-link--active"
                href="#home"
                aria-current="page"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="navigation-link__icon" aria-hidden="true">
                  <span />
                </span>
                Home
                <span className="navigation-link__arrow" aria-hidden="true">↗</span>
              </a>
            </nav>
            <div className="side-drawer__footer">
              <span className="side-drawer__footer-mark" aria-hidden="true" />
              <span>RADAR IMOBILIÁRIO</span>
            </div>
          </aside>
        </>
      )}

      <main className="page-main">
        <div className="page-heading">
          <div>
            <p className="page-heading__eyebrow">VISÃO GERAL</p>
            <h1>Oportunidades imobiliárias, com mais contexto.</h1>
          </div>
          <p className="page-heading__note">
            IMÓVEIS <span /> LEILÕES <span /> ANÁLISE
          </p>
        </div>

        <section
          className="feature-carousel"
          aria-label="Funcionalidades da aplicação"
          aria-roledescription="carrossel"
        >
          <div className="map-visual" aria-hidden="true">
            <span className="map-park map-park--one" />
            <span className="map-park map-park--two" />
            <span className="map-waterway" />
            <span className="map-road map-road--diagonal" />
            <span className="map-road map-road--horizontal" />
            <span className="map-road map-road--vertical" />
            <span className="map-road map-road--small-one" />
            <span className="map-road map-road--small-two" />
            <span className="map-label map-label--one">SETOR 04</span>
            <span className="map-label map-label--two">QUADRA 18</span>
            <span className="map-label map-label--three">ÁREA URBANA</span>
            <span className="map-marker"><span /></span>
            <span className="map-coordinate">23° 33&apos; 01.2&quot; S</span>
          </div>

          <div className="feature-content" aria-live="polite">
            <div className="feature-content__topline">
              <span>FUNCIONALIDADE</span>
              <span className="feature-content__number">
                {String(activeFeature + 1).padStart(2, '0')}
                <span />
                {String(features.length).padStart(2, '0')}
              </span>
            </div>
            <div className="feature-copy" key={features[activeFeature].title}>
              <p className="feature-copy__label">{features[activeFeature].label}</p>
              <h2>{features[activeFeature].title}</h2>
              <p className="feature-copy__description">
                {features[activeFeature].description}
              </p>
            </div>
            <div className="feature-controls">
              <div className="feature-pagination" aria-label="Selecionar funcionalidade">
                {features.map((feature, index) => (
                  <button
                    className={`feature-pagination__item${index === activeFeature ? ' is-active' : ''}`}
                    key={feature.title}
                    type="button"
                    aria-label={`Exibir funcionalidade ${index + 1}: ${feature.title}`}
                    aria-current={index === activeFeature ? 'true' : undefined}
                    onClick={() => setActiveFeature(index)}
                  />
                ))}
              </div>
              {features.length > 1 && (
                <div className="feature-arrows">
                  <button
                    type="button"
                    aria-label="Funcionalidade anterior"
                    onClick={() => moveFeature(-1)}
                  >
                    <span aria-hidden="true">←</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Próxima funcionalidade"
                    onClick={() => moveFeature(1)}
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <footer className="page-footer">
          <span>RADAR IMOBILIÁRIO</span>
          <span>HOME <i /> 01</span>
        </footer>
      </main>
    </div>
  )
}

export default App
