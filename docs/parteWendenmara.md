# Parte da Wendenmara

## Objetivo
Criar a coluna reutilizavel do Kanban, formulario de novo projeto e aplicar melhorias visuais na pagina inicial com badges de contagem.

## Arquivo 1: src/components/ColunaKanban.jsx

```jsx
import TarefaCard from './TarefaCard'

function ColunaKanban({ titulo, status, tarefas }) {
  // filter garante que cada coluna mostre apenas seu status.
  const tarefasDaColuna = tarefas.filter((tarefa) => tarefa.status === status)

  return (
    <section className="coluna">
      <div className="coluna__topo">
        <h3>{titulo}</h3>
        <span className="badge">{tarefasDaColuna.length}</span>
      </div>

      <div className="coluna__lista">
        {tarefasDaColuna.length === 0 ? (
          <p className="mensagem-vazia">Sem tarefas nesta coluna.</p>
        ) : (
          tarefasDaColuna.map((tarefa) => <TarefaCard key={tarefa.id} tarefa={tarefa} />)
        )}
      </div>
    </section>
  )
}

export default ColunaKanban
```

## Arquivo 2: src/components/FormNovoProjeto.jsx

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTarefas } from '../contexts/TarefasContext'

function FormNovoProjeto() {
  const navigate = useNavigate()
  const { adicionarProjeto } = useTarefas()

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')

  function handleSubmit(evento) {
    evento.preventDefault()

    if (!nome.trim()) {
      return
    }

    // Cria projeto no estado global e abre o board imediatamente.
    const projetoId = adicionarProjeto({ nome, descricao })

    setNome('')
    setDescricao('')

    navigate(`/projeto/${projetoId}`)
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <label htmlFor="nome-projeto">Nome do projeto</label>
      <input
        id="nome-projeto"
        value={nome}
        onChange={(evento) => setNome(evento.target.value)}
        placeholder="Ex: Kanban Mobile"
        required
      />

      <label htmlFor="desc-projeto">Descricao</label>
      <textarea
        id="desc-projeto"
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
        rows={3}
        placeholder="Escopo resumido do projeto"
      />

      <button className="botao" type="submit">
        Criar projeto
      </button>
    </form>
  )
}

export default FormNovoProjeto
```

## Arquivo 3: src/pages/PaginaInicio.jsx (versao com badges)

Substitua a versao da Iany por esta apos merge para manter as melhorias visuais.

```jsx
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import FormNovoProjeto from '../components/FormNovoProjeto'
import Header from '../components/Header'
import { useTarefas } from '../contexts/TarefasContext'

function PaginaInicio() {
  const navigate = useNavigate()
  const { projetos, tarefas } = useTarefas()

  const contagemPorProjeto = useMemo(() => {
    return tarefas.reduce((acumulador, tarefa) => {
      if (!acumulador[tarefa.projetoId]) {
        acumulador[tarefa.projetoId] = { total: 0, concluidas: 0 }
      }

      acumulador[tarefa.projetoId].total += 1
      if (tarefa.status === 'concluido') {
        acumulador[tarefa.projetoId].concluidas += 1
      }

      return acumulador
    }, {})
  }, [tarefas])

  return (
    <>
      <Header />

      <main className="pagina pagina--inicio">
        <section className="secao secao--formulario">
          <h2>Novo projeto</h2>
          <FormNovoProjeto />
        </section>

        <section className="secao">
          <h2>Projetos cadastrados</h2>

          {projetos.length === 0 ? (
            <p className="mensagem-vazia">Nenhum projeto ainda. Crie o primeiro acima.</p>
          ) : (
            <div className="grade-projetos">
              {projetos.map((projeto) => {
                const contagem = contagemPorProjeto[projeto.id] || { total: 0, concluidas: 0 }

                return (
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

                    <div className="badges">
                      <span className="badge">Total: {contagem.total}</span>
                      <span className="badge">Concluidas: {contagem.concluidas}</span>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default PaginaInicio
```