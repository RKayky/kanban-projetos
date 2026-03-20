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