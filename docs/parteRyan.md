# Parte do Ryan

## Objetivo
Montar o board de um projeto com formulario de nova tarefa e estilos globais da aplicacao.

## Arquivo 1: src/components/FormNovaTarefa.jsx

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTarefas } from '../contexts/TarefasContext'

function FormNovaTarefa({ projetoId }) {
  const navigate = useNavigate()
  const { adicionarTarefa } = useTarefas()

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState('media')

  function handleSubmit(evento) {
    evento.preventDefault()

    if (!titulo.trim()) {
      return
    }

    // Ao salvar, criamos a tarefa no Context e redirecionamos para detalhes.
    const tarefaId = adicionarTarefa({
      projetoId,
      titulo,
      descricao,
      prioridade,
    })

    setTitulo('')
    setDescricao('')
    setPrioridade('media')

    navigate(`/tarefa/${tarefaId}`)
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h3>Nova tarefa</h3>

      <label htmlFor="titulo">Titulo</label>
      <input
        id="titulo"
        value={titulo}
        onChange={(evento) => setTitulo(evento.target.value)}
        placeholder="Ex: Criar endpoint de login"
        required
      />

      <label htmlFor="descricao">Descricao</label>
      <textarea
        id="descricao"
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
        rows={3}
        placeholder="Detalhes da tarefa"
      />

      <label htmlFor="prioridade">Prioridade</label>
      <select
        id="prioridade"
        value={prioridade}
        onChange={(evento) => setPrioridade(evento.target.value)}
      >
        <option value="baixa">Baixa</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>

      <button className="botao" type="submit">
        Salvar tarefa
      </button>
    </form>
  )
}

export default FormNovaTarefa
```

## Arquivo 2: src/pages/PaginaProjeto.jsx

```jsx
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ColunaKanban from '../components/ColunaKanban'
import FormNovaTarefa from '../components/FormNovaTarefa'
import Header from '../components/Header'
import { useTarefas } from '../contexts/TarefasContext'

function PaginaProjeto() {
  const { id } = useParams()
  const { tarefas, obterProjetoPorId } = useTarefas()

  const projeto = obterProjetoPorId(id)

  const tarefasProjeto = useMemo(
    () => tarefas.filter((tarefa) => tarefa.projetoId === id),
    [tarefas, id],
  )

  if (!projeto) {
    return (
      <>
        <Header />
        <main className="pagina">
          <p>Projeto nao encontrado.</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Header projetoAtualId={id} />

      <main className="pagina pagina--projeto">
        <section className="cabecalho-projeto">
          <h2>{projeto.nome}</h2>
          <p>{projeto.descricao || 'Sem descricao.'}</p>
        </section>

        <section className="kanban-grid">
          {/* Cada coluna recebe SOMENTE tarefas do status correspondente */}
          <ColunaKanban titulo="A Fazer" status="a_fazer" tarefas={tarefasProjeto} />
          <ColunaKanban titulo="Em Progresso" status="progresso" tarefas={tarefasProjeto} />
          <ColunaKanban titulo="Concluido" status="concluido" tarefas={tarefasProjeto} />
        </section>

        <section className="secao secao--formulario">
          <FormNovaTarefa projetoId={id} />
        </section>
      </main>
    </>
  )
}

export default PaginaProjeto
```

## Arquivo 3: src/App.css

```css
:root {
  --bg: #f6f7fb;
  --surface: #ffffff;
  --text: #1f2937;
  --muted: #6b7280;
  --line: #e5e7eb;
  --brand: #0f766e;
  --brand-2: #115e59;
  --danger: #b91c1c;
  --prioridade-alta: #dc2626;
  --prioridade-media: #d97706;
  --prioridade-baixa: #16a34a;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: radial-gradient(circle at top left, #ecfeff 0%, #f6f7fb 35%);
  color: var(--text);
}

a {
  color: inherit;
  text-decoration: none;
}

.header {
  border-bottom: 1px solid var(--line);
  background: var(--surface);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header__conteudo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  margin: 0;
  font-size: 1.2rem;
}

.header__nav {
  display: flex;
  gap: 0.75rem;
}

.header__nav a {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  color: var(--muted);
}

.header__nav a.ativo {
  background: #ccfbf1;
  color: var(--brand-2);
  font-weight: 600;
}

.pagina {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem;
}

.secao {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 0.75rem;
  padding: 1rem;
}

.secao--formulario {
  margin-top: 1rem;
}

.cabecalho-projeto {
  margin-bottom: 1rem;
}

.kanban-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(240px, 1fr));
  gap: 1rem;
}

.coluna {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 0.75rem;
  padding: 0.75rem;
  min-height: 300px;
}

.coluna__topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.coluna__lista {
  display: grid;
  gap: 0.75rem;
}

.tarefa-card {
  border: 1px solid var(--line);
  border-left: 6px solid var(--prioridade-media);
  border-radius: 0.65rem;
  background: #fcfcfd;
  padding: 0.75rem;
}

.tarefa-card--alta {
  border-left-color: var(--prioridade-alta);
}

.tarefa-card--media {
  border-left-color: var(--prioridade-media);
}

.tarefa-card--baixa {
  border-left-color: var(--prioridade-baixa);
}

.formulario {
  display: grid;
  gap: 0.65rem;
}

input,
textarea,
select,
button {
  font: inherit;
}

input,
textarea,
select {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.6rem 0.75rem;
}

.botao {
  border: none;
  border-radius: 0.5rem;
  background: var(--brand);
  color: #fff;
  padding: 0.6rem 0.9rem;
  cursor: pointer;
}

.botao:hover {
  background: var(--brand-2);
}

.botao--perigo {
  background: var(--danger);
}

.badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge {
  border: 1px solid var(--line);
  background: #f9fafb;
  border-radius: 999px;
  padding: 0.25rem 0.6rem;
  font-size: 0.8rem;
  color: var(--muted);
}

@media (max-width: 960px) {
  .kanban-grid {
    grid-template-columns: 1fr;
  }
}
```