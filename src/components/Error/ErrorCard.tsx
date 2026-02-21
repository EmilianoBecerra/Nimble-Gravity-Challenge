import "./ErrorCard.css";

export function ErrorCard() {
  return (
    <main className="error-container">
      <div className="error-card">
        <h2 className="error-title">Algo salió mal</h2>
        <p className="error-message">
          No pudimos conectarnos con el servidor. Revisá tu conexión e intentá de nuevo.
        </p>
        <button className="error-btn" onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    </main>
  )
}