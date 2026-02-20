import "./Header.css"

export function Header() {
  return (
    <header>
      <h1 className="title">Nimble Gravity Challenge</h1>
      <nav className="nav-bar">
        <a href="https://github.com/EmilianoBecerra" target="_blank">Repositorio Personal</a>
        <a href="https://www.linkedin.com/in/becerra-emiliano/" target="_blank">Linkedin</a>
        <a href="https://lamosca.vercel.app/" target="_blank">Proyecto Destacado</a>
      </nav>
      <hr style={{ border: "1px solid white", width: "90%", marginTop: "5px" }} />
    </header>
  )
}