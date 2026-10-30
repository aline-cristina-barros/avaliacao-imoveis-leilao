import { useEffect, useState } from 'react'
import './AnaliseOportunidade.css'

const property = {
  marketValue: 480000,
  bid: 320000,
  auctioneer: 16000,
  itbi: 10800,
  registry: 6500,
  other: 3500,
}

const initialCosts = {
  bid: String(property.bid),
  auctioneer: String(property.auctioneer),
  itbi: String(property.itbi),
  registry: String(property.registry),
  other: String(property.other),
}

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

const costFields = [
  { key: 'bid', label: 'Lance' },
  { key: 'auctioneer', label: 'Comissão do leiloeiro' },
  { key: 'itbi', label: 'ITBI estimado (ilustrativo)' },
  { key: 'registry', label: 'Registro e despesas cartorárias' },
  { key: 'other', label: 'Outros custos considerados' },
]

function numericValue(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

function AnaliseOportunidade() {
  const [isSimulationOpen, setIsSimulationOpen] = useState(false)
  const [costs, setCosts] = useState(initialCosts)
  const total = costFields.reduce((sum, field) => sum + numericValue(costs[field.key]), 0)
  const marketDifference = Math.abs(property.marketValue - total)
  const isBelowMarket = total <= property.marketValue

  useEffect(() => {
    if (!isSimulationOpen) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') setIsSimulationOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isSimulationOpen])

  function updateCost(key, value) {
    setCosts((current) => ({ ...current, [key]: value }))
  }

  return (
    <main className="page-main analysis-page" id="analise">
      <div className="analysis-heading page-heading">
        <div>
          <p className="page-heading__eyebrow">ANÁLISE DEMONSTRATIVA</p>
          <h1>Análise de oportunidade</h1>
        </div>
        <span className="demo-notice">Dados fictícios — demonstração do produto</span>
      </div>

      <section className="property-summary" aria-labelledby="property-title">
        <img
          className="property-summary__image"
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85"
          alt="Casa contemporânea com jardim, imagem ilustrativa do imóvel fictício"
        />
        <div className="property-summary__details">
          <div className="property-summary__topline">
            <span className="property-summary__tag">IMÓVEL 01</span>
            <span className="property-summary__location">São Francisco, Niterói — RJ</span>
          </div>
          <h2 id="property-title">Casa residencial</h2>
          <dl className="property-facts">
            <div><dt>Área</dt><dd>78 m²</dd></div>
            <div><dt>Quartos</dt><dd>2</dd></div>
            <div><dt>Ocupação</dt><dd>Ocupado</dd></div>
            <div><dt>Data do leilão</dt><dd>18 nov 2026</dd></div>
          </dl>
        </div>
      </section>

      <section className="analysis-metrics" aria-label="Indicadores principais">
        <article className="metric">
          <p>LANCE MÍNIMO</p>
          <strong>{currency.format(property.bid)}</strong>
        </article>
        <article className="metric">
          <p>VALOR DE MERCADO ESTIMADO</p>
          <strong>{currency.format(property.marketValue)}</strong>
          <span>Referência fictícia, não gerada por IA.</span>
        </article>
        <article className="metric metric--total">
          <p>CUSTO TOTAL ESTIMADO</p>
          <strong>{currency.format(property.bid + property.auctioneer + property.itbi + property.registry + property.other)}</strong>
          <span>Soma dos custos detalhados abaixo.</span>
        </article>
      </section>

      <div className="analysis-columns">
        <section className="analysis-section cost-section" aria-labelledby="costs-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">AQUISIÇÃO</p>
              <h2 id="costs-title">Detalhamento dos custos</h2>
            </div>
            <span>ESTIMATIVA</span>
          </div>
          <dl className="cost-list">
            {costFields.map((field) => (
              <div className="cost-list__row" key={field.key}>
                <dt>{field.label}</dt>
                <dd>{currency.format(Number(initialCosts[field.key]))}</dd>
              </div>
            ))}
            <div className="cost-list__row cost-list__row--total">
              <dt>Custo total estimado</dt>
              <dd>{currency.format(property.bid + property.auctioneer + property.itbi + property.registry + property.other)}</dd>
            </div>
          </dl>
          <p className="cost-note">O ITBI é uma estimativa ilustrativa, sujeita às regras e à base de cálculo do município.</p>
        </section>

        <section className="analysis-section notice-section" aria-labelledby="notice-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">LEITURA DO EDITAL</p>
              <h2 id="notice-title">Resumo do edital</h2>
            </div>
            <span>EXEMPLO FICTÍCIO</span>
          </div>
          <dl className="notice-list">
            <div><dt>Pagamento</dt><dd>À vista em até 24 horas após a arrematação, conforme este cenário fictício.</dd></div>
            <div><dt>Débitos</dt><dd>O edital hipotético atribui ao arrematante débitos não cobertos pelo preço.</dd></div>
            <div><dt>Ocupação</dt><dd>Imóvel ocupado; desocupação pode exigir prazo, negociação ou medida judicial.</dd></div>
            <div><dt>Documentação</dt><dd>Confirmar matrícula, ônus, débitos e condições do edital antes de qualquer decisão.</dd></div>
          </dl>
          <p className="notice-disclaimer">Resumo ilustrativo, não extraído nem interpretado por IA. Consulte o edital oficial e profissionais habilitados.</p>
        </section>
      </div>

      <section className="analysis-conclusion" aria-labelledby="analysis-title">
        <div>
          <p className="section-kicker">PONTOS DE ATENÇÃO</p>
          <h2 id="analysis-title">Preço não é custo total.</h2>
          <p>Embora o lance mínimo fictício seja inferior à referência de mercado, comissão, tributos, cartório e eventuais despesas de desocupação elevam o desembolso. Ocupação, débitos e documentação trazem incertezas; esta demonstração não recomenda a compra.</p>
        </div>
        <button className="primary-action" type="button" onClick={() => setIsSimulationOpen(true)}>
          Simular compra <span aria-hidden="true">↗</span>
        </button>
      </section>

      <footer className="page-footer">
        <span>RADAR IMOBILIÁRIO</span>
        <span>ANÁLISE <i /> 01</span>
      </footer>

      {isSimulationOpen && (
        <div className="simulation-backdrop">
          <section className="simulation-dialog" role="dialog" aria-modal="true" aria-labelledby="simulation-title">
            <div className="simulation-dialog__heading">
              <div>
                <p className="section-kicker">CENÁRIO EDITÁVEL</p>
                <h2 id="simulation-title">Simular compra</h2>
              </div>
              <button
                className="drawer-close"
                type="button"
                aria-label="Fechar simulação"
                onClick={() => setIsSimulationOpen(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <p className="simulation-intro">Altere os valores para recalcular o custo estimado. Os campos são apenas uma simulação local.</p>
            <div className="simulation-fields">
              {costFields.map((field) => (
                <label key={field.key}>
                  <span>{field.label}</span>
                  <span className="currency-input">
                    <span>R$</span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      inputMode="decimal"
                      value={costs[field.key]}
                      onChange={(event) => updateCost(field.key, event.target.value)}
                      aria-label={field.label}
                    />
                  </span>
                </label>
              ))}
            </div>
            <p className="simulation-itbi-note">ITBI estimado de forma ilustrativa, sujeito às regras do município.</p>
            <div className="simulation-total">
              <span>Custo total simulado</span>
              <strong>{currency.format(total)}</strong>
            </div>
            <div className="market-comparison">
              <span>{isBelowMarket ? 'Abaixo da referência de mercado' : 'Acima da referência de mercado'}</span>
              <strong>{currency.format(marketDifference)} de diferença referencial</strong>
              <small>Comparação com valor fictício de {currency.format(property.marketValue)}. Não representa lucro garantido.</small>
            </div>
            <button className="primary-action simulation-done" type="button" onClick={() => setIsSimulationOpen(false)}>
              Concluir simulação
            </button>
          </section>
        </div>
      )}
    </main>
  )
}

export default AnaliseOportunidade
