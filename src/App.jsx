import { useState } from 'react'
import './App.css'

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState("");
  const [filtro, setFiltro] = useState("todas");

  function adicionarTarefa(evento) {
    evento.preventDefault();

    const textoLimpo = texto.trim();
    if (textoLimpo === "") {
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      texto: textoLimpo,
      concluida: false
    };

    setTarefas((anteriores) => [...anteriores, novaTarefa]);
    setTexto("");
  }

  function alternarConclusao(id) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) => {
        if (tarefa.id === id) {
          return { ...tarefa, concluida: !tarefa.concluida };
        }
        return tarefa;
      })
    );
  }
  
  function removerTarefa(id) {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => tarefa.id !== id)
    );
  }

  const total = tarefas.length;
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const pendentes = total - concluidas;

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") {
      return !tarefa.concluida;
    }
    if (filtro === "concluidas") {
      return tarefa.concluida;
    }
    return true;
  });
  function limparConcluidas() {
  setTarefas((anteriores) =>
    anteriores.filter((tarefa) => !tarefa.concluida)
  );
}

  return (
    <>
      <main>
        <h1>Organizador de tarefas</h1>

        {/* 1. Formulário adicionado aqui */}
        <form onSubmit={adicionarTarefa}>
          <label htmlFor="nova-tarefa">Nova tarefa</label>
          <input
            id="nova-tarefa"
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
          />
          <button type="submit">Adicionar</button>
        </form>

        <p>
          Total: {total} | Concluídas: {concluidas} | Pendentes: {pendentes}
        </p>

        {/* 2. Botões de filtro adicionados aqui */}
        <div style={{ marginBottom: '1rem' }}>
          <button type="button" onClick={() => setFiltro("todas")}>Todas</button>
          <button type="button" onClick={() => setFiltro("pendentes")}>Pendentes</button>
          <button type="button" onClick={() => setFiltro("concluidas")}>Concluídas</button>
        </div>

        <ul>
          {tarefasVisiveis.length === 0 && (
            <li>Nenhuma tarefa para exibir.</li>
          )}
          {tarefasVisiveis.map((tarefa) => (
            <li key={tarefa.id}>
              <label>
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => alternarConclusao(tarefa.id)}
                />
                {tarefa.texto}
              </label>
              <button
                type="button"
                onClick={() => removerTarefa(tarefa.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
        <button
  type="button"
  onClick={limparConcluidas}
>Limpar concluídas</button>
      </main>
    </>
  )
}

export default App