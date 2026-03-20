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