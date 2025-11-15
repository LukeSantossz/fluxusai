import { useEffect, useState } from 'react'
import { useAppState } from '../context/StateContext'

interface Task {
  id: string
  title: string
  bedNumber?: string
  priority: 'normal' | 'urgent'
  completed: boolean
  isPCP?: boolean
}

export default function Page3CleaningTasks() {
  const { state, completeCleaning } = useAppState()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Higienizar Leito 302B',
      priority: 'normal',
      completed: false,
    },
    {
      id: '2',
      title: 'Reabastecer estoque de materiais - Ala 4',
      priority: 'normal',
      completed: false,
    },
    {
      id: '3',
      title: 'Limpeza geral - Corredor principal',
      priority: 'normal',
      completed: false,
    },
  ])
  const [showPCPTask, setShowPCPTask] = useState(false)
  const [isCompleting, setIsCompleting] = useState<string | null>(null)

  useEffect(() => {
    // Adicionar tarefa PCP quando médico confirmar
    if (state.medicalConfirmed && !showPCPTask && !state.cleaningCompleted) {
      setTimeout(() => {
        setShowPCPTask(true)
        setTasks((prev) => [
          {
            id: 'pcp-1',
            title: `URGENTE (PCP): Higienizar Leito ${state.bedNumber}`,
            bedNumber: state.bedNumber,
            priority: 'urgent',
            completed: false,
            isPCP: true,
          },
          ...prev,
        ])
      }, 500)
    }
  }, [state.medicalConfirmed, showPCPTask, state.cleaningCompleted, state.bedNumber])

  const handleCompleteTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task || task.completed) return

    setIsCompleting(taskId)
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
      )
      setIsCompleting(null)

      // Se for tarefa PCP, atualizar estado global
      if (task.isPCP) {
        completeCleaning()
      }
    }, 800)
  }

  const urgentTasks = tasks.filter((t) => t.priority === 'urgent' && !t.completed)
  const normalTasks = tasks.filter((t) => t.priority === 'normal' && !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Lista de Tarefas
          </h1>
          <p className="text-lg text-gray-600">Higienização e Limpeza</p>
        </div>

        {/* Tasks Container */}
        <div className="space-y-4">
          {/* Urgent Tasks (PCP) */}
          {urgentTasks.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Prioridade Máxima
              </h2>
              {urgentTasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`
                    bg-white rounded-xl shadow-lg border-2 p-5
                    transition-all duration-300
                    ${task.isPCP ? 'animate-slide-down border-fuchsia-500 bg-fuchsia-50/30' : 'border-red-300'}
                    ${index === 0 && task.isPCP ? 'animate-slide-down' : ''}
                  `}
                  role="article"
                  aria-label={`Tarefa urgente: ${task.title}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-fuchsia-100 text-fuchsia-800 mr-2">
                          URGENTE
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-fuchsia-100 text-fuchsia-800">
                          PCP
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {task.title}
                      </h3>
                      {task.bedNumber && (
                        <p className="text-sm text-gray-600">
                          Leito: {task.bedNumber}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={isCompleting === task.id || task.completed}
                      className={`
                        ml-4 px-4 py-2
                        text-sm font-semibold
                        rounded-lg
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-fuchsia-500
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${
                          task.completed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-md hover:shadow-lg'
                        }
                      `}
                      aria-label={`Concluir tarefa: ${task.title}`}
                    >
                      {isCompleting === task.id ? (
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      ) : task.completed ? (
                        <span className="flex items-center">
                          <svg
                            className="w-5 h-5 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Concluído
                        </span>
                      ) : (
                        'Concluir'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Normal Tasks */}
          {normalTasks.length > 0 && (
            <div className="space-y-3 mt-6">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Tarefas de Rotina
              </h2>
              {normalTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow"
                  role="article"
                  aria-label={`Tarefa: ${task.title}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900">
                        {task.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={isCompleting === task.id || task.completed}
                      className={`
                        ml-4 px-4 py-2
                        text-sm font-medium
                        rounded-lg
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-gray-400
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${
                          task.completed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        }
                      `}
                      aria-label={`Concluir tarefa: ${task.title}`}
                    >
                      {isCompleting === task.id ? (
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      ) : task.completed ? (
                        <span className="flex items-center">
                          <svg
                            className="w-5 h-5 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Concluído
                        </span>
                      ) : (
                        'Concluir'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div className="space-y-3 mt-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Concluídas
              </h2>
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-50 rounded-xl border border-gray-200 p-5 opacity-75"
                  role="article"
                  aria-label={`Tarefa concluída: ${task.title}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <svg
                        className="w-5 h-5 text-green-600 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <h3 className="text-base font-medium text-gray-600 line-through">
                        {task.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {tasks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhuma tarefa disponível</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

