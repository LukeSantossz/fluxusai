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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-5 sm:mb-6 md:mb-8 animate-slide-down">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Lista de Tarefas
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">Higienização e Limpeza</p>
        </div>

        {/* Tasks Container */}
        <div className="space-y-3 sm:space-y-4">
          {/* Urgent Tasks (PCP) */}
          {urgentTasks.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide px-1">
                Prioridade Máxima
              </h2>
              {urgentTasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`
                    bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border-2 p-4 sm:p-5 md:p-6
                    transition-all duration-300
                    hover:shadow-2xl hover:scale-[1.02]
                    ${task.isPCP ? 'animate-slide-down border-fuchsia-500 bg-gradient-to-r from-fuchsia-50/80 via-fuchsia-50/40 to-white' : 'border-red-300'}
                    ${index === 0 && task.isPCP ? 'animate-slide-down' : ''}
                  `}
                  role="article"
                  aria-label={`Tarefa urgente: ${task.title}`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex-1 w-full sm:w-auto">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-fuchsia-100 text-fuchsia-800 shadow-sm">
                          URGENTE
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-fuchsia-100 text-fuchsia-800 shadow-sm">
                          PCP
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                        {task.title}
                      </h3>
                      {task.bedNumber && (
                        <p className="text-xs sm:text-sm text-gray-600">
                          Leito: {task.bedNumber}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={isCompleting === task.id || task.completed}
                      className={`
                        relative w-full sm:w-auto sm:ml-4 px-5 sm:px-6 py-3 sm:py-2.5
                        text-sm font-bold
                        rounded-xl sm:rounded-2xl
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2
                        disabled:opacity-50 disabled:cursor-not-allowed
                        active:scale-95
                        overflow-hidden
                        ${
                          task.completed
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-300'
                            : 'bg-gradient-to-r from-fuchsia-600 via-fuchsia-700 to-purple-600 hover:from-fuchsia-700 hover:via-fuchsia-800 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                        }
                      `}
                      aria-label={`Concluir tarefa: ${task.title}`}
                    >
                      {isCompleting === task.id ? (
                        <span className="flex items-center justify-center">
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
                        </span>
                      ) : task.completed ? (
                        <span className="flex items-center justify-center">
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
            <div className="space-y-3 mt-4 sm:mt-6">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide px-1">
                Tarefas de Rotina
              </h2>
              {normalTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
                  role="article"
                  aria-label={`Tarefa: ${task.title}`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex-1 w-full sm:w-auto">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900">
                        {task.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={isCompleting === task.id || task.completed}
                      className={`
                        w-full sm:w-auto sm:ml-4 px-4 sm:px-5 py-2.5 sm:py-2
                        text-sm font-medium
                        rounded-lg sm:rounded-xl
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-gray-400
                        disabled:opacity-50 disabled:cursor-not-allowed
                        active:scale-95
                        ${
                          task.completed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm hover:shadow-md'
                        }
                      `}
                      aria-label={`Concluir tarefa: ${task.title}`}
                    >
                      {isCompleting === task.id ? (
                        <span className="flex items-center justify-center">
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
                        </span>
                      ) : task.completed ? (
                        <span className="flex items-center justify-center">
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
            <div className="space-y-3 mt-4 sm:mt-6">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide px-1">
                Concluídas
              </h2>
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 opacity-75"
                  role="article"
                  aria-label={`Tarefa concluída: ${task.title}`}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-600 mr-2 flex-shrink-0"
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
                    <h3 className="text-sm sm:text-base font-medium text-gray-600 line-through">
                      {task.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {tasks.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-gray-500">Nenhuma tarefa disponível</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
