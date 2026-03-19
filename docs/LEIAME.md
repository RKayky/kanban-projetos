# LEIAME - Projeto Kanban de Projetos

## Visao geral
Aplicacao React para gerenciamento de tarefas por projeto no formato Kanban, com 3 colunas:
- A Fazer
- Em Progresso
- Concluido

A base estrutural ja esta no repositorio (Context API, rotas e stubs). Este documento cobre somente a execucao da equipe apos essa base.

## Ordem de execucao (pull/push)
1. Kelvin -> Sou lindo
2. Iany -> faz pull da base e sobe a parte dela.
3. Ryan -> faz pull apos merge da Iany e sobe a parte dele.
4. Gabriel -> faz pull apos merge do Ryan e sobe a parte dele.
5. Wendenmara -> faz pull apos merge do Gabriel e sobe a parte dela.

## Tabela de responsabilidades
| Pessoa | Arquivos principais | Entregas |
|---|---|---|
| Iany | src/components/Header.jsx, src/pages/PaginaInicio.jsx, src/pages/PaginaNaoEncontrada.jsx | Navegacao com NavLink, lista de projetos, tela 404 |
| Ryan | src/components/FormNovaTarefa.jsx, src/pages/PaginaProjeto.jsx, src/App.css | Formulario de tarefa, board do projeto, estilos globais |
| Gabriel | src/components/TarefaCard.jsx, src/pages/PaginaDetalhes.jsx | Card com prioridade e logs, detalhes com mover/remover |
| Wendenmara | src/components/ColunaKanban.jsx, src/components/FormNovoProjeto.jsx, src/pages/PaginaInicio.jsx (melhorias) | Coluna filtrada, formulario de projeto, badges de contagem |

## Tabela de rotas
| Rota | Pagina | Objetivo |
|---|---|---|
| / | PaginaInicio | Listar projetos e criar novo projeto |
| /projeto/:id | PaginaProjeto | Exibir board kanban do projeto e adicionar tarefa |
| /tarefa/:id | PaginaDetalhes | Mostrar detalhes, mover de coluna e remover tarefa |
| * | PaginaNaoEncontrada | Tratar rotas inexistentes |

## Funcionalidades obrigatorias
- Context API compartilhando projetos e tarefas entre paginas.
- Persistencia em localStorage.
- Tarefa com titulo, descricao, prioridade e status.
- 3 colunas irmas no Kanban consumindo mesmo Context.
- Navegacao com React Router.
- Filtro por status em cada coluna usando props + filter.
- Abertura de detalhes da tarefa por clique no card.
- Mover tarefa entre colunas.
- Remover tarefa.
- Historico de logs por tarefa.

## Checklist de integracao
1. Confirmar que todos instalaram dependencias com npm install.
2. Implementar cada parte conforme docs/parte*.md.
3. Rodar npm run build ao final de cada merge.
4. Resolver conflitos priorizando a versao mais recente da PaginaInicio (com badges).
5. Fazer revisao final de navegacao entre as 4 rotas.
