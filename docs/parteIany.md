# Parte da Iany

## Objetivo
Implementar navegação principal e tela inicial de projetos.

## Arquivo 1: src/components/Header.jsx

```jsx
import { NavLink } from 'react-router-dom'

function Header({ projetoAtualId }) {
  return (
    <header className="header">
      <div className="header__conteudo">
        <h1 className="header__logo">Kanban de Projetos</h1>

        <nav className="header__nav">
          {/* NavLink aplica estilo automaticamente para rota ativa */}
          <NavLink to="/" className={({ isActive }) => (isActive ? 'ativo' : '')} end>
            Inicio
          </NavLink>

          {/* Link dinamico aparece apenas quando existe projeto selecionado */}
          {projetoAtualId ? (
            <NavLink
              to={`/projeto/${projetoAtualId}`}
              className={({ isActive }) => (isActive ? 'ativo' : '')}
            >
              Projeto atual
            </NavLink>
          ) : null}
        </nav>
      </div>
    </header>
  )
}

export default Header
```

## Arquivo 2: src/pages/PaginaInicio.jsx

```jsx
import { useNavigate } from 'react-router-dom'
import FormNovoProjeto from '../components/FormNovoProjeto'
import Header from '../components/Header'
import { useTarefas } from '../contexts/TarefasContext'

function PaginaInicio() {
  const navigate = useNavigate()
  const { projetos } = useTarefas()

  return (
    <>
      <Header />

      <main className="pagina pagina--inicio">
        <section className="secao secao--formulario">
          <h2>Novo projeto</h2>
          {/* O formulario cria projeto via Context API e navega para o board */}
          <FormNovoProjeto />
        </section>

        <section className="secao">
          <h2>Projetos cadastrados</h2>

          {projetos.length === 0 ? (
            <p className="mensagem-vazia">Nenhum projeto ainda. Crie o primeiro acima.</p>
          ) : (
            <div className="grade-projetos">
              {projetos.map((projeto) => (
                <article
                  key={projeto.id}
                  className="card-projeto"
                  onClick={() => navigate(`/projeto/${projeto.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(evento) => {
                    if (evento.key === 'Enter' || evento.key === ' ') {
                      navigate(`/projeto/${projeto.id}`)
                    }
                  }}
                >
                  <h3>{projeto.nome}</h3>
                  <p>{projeto.descricao || 'Sem descricao.'}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default PaginaInicio
```

## Arquivo 3: src/pages/PaginaNaoEncontrada.jsx

```jsx
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function PaginaNaoEncontrada() {
  return (
    <>
      <Header />

      <main className="pagina pagina--404">
        <h2>404</h2>
        <p>A rota acessada nao existe neste projeto.</p>
        <Link className="botao" to="/">
          Voltar para a pagina inicial
        </Link>
      </main>
    </>
  )
}

export default PaginaNaoEncontrada
```