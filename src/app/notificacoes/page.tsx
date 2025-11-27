"use client"

import { useState } from "react"
import { Bell, Check, X, Clock, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function NotificacoesPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Pagamento Confirmado",
      message: "Seu plano Pro foi ativado com sucesso! Aproveite todos os recursos premium.",
      time: "Há 5 minutos",
      isRead: false,
    },
    {
      id: 2,
      type: "info",
      title: "Nova Trilha Disponível",
      message: "A trilha 'Caminho das Estrelas' foi adicionada na sua região. Confira agora!",
      time: "Há 1 hora",
      isRead: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Evento Próximo",
      message: "O Festival de Música ao Ar Livre começa em 2 dias. Não esqueça!",
      time: "Há 3 horas",
      isRead: false,
    },
    {
      id: 4,
      type: "success",
      title: "Avaliação Recebida",
      message: "Maria Silva avaliou sua experiência com 5 estrelas!",
      time: "Há 1 dia",
      isRead: true,
    },
    {
      id: 5,
      type: "info",
      title: "Novo Seguidor",
      message: "João Santos começou a seguir você. Veja o perfil dele!",
      time: "Há 2 dias",
      isRead: true,
    },
    {
      id: 6,
      type: "error",
      title: "Tentativa de Login Suspeita",
      message: "Detectamos uma tentativa de login do Rio de Janeiro. Se não foi você, altere sua senha.",
      time: "Há 3 dias",
      isRead: true,
    },
  ]

  const filteredNotifications = filter === "unread" 
    ? notifications.filter(n => !n.isRead)
    : notifications

  const unreadCount = notifications.filter(n => !n.isRead).length

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-emerald-500" />
      case "error":
        return <XCircle className="w-6 h-6 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />
      default:
        return <Info className="w-6 h-6 text-blue-500" />
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-50 border-emerald-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Notificações
                </h1>
              </div>
            </Link>
            <Link
              href="/"
              className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all font-medium"
            >
              Voltar
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Central de Notificações
                </h2>
                <p className="text-gray-600">
                  {unreadCount > 0 
                    ? `Você tem ${unreadCount} notificação${unreadCount > 1 ? 'ões' : ''} não lida${unreadCount > 1 ? 's' : ''}`
                    : "Você está em dia com todas as notificações!"}
                </p>
              </div>
              <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all">
                Marcar Todas como Lidas
              </button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  filter === "all"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todas ({notifications.length})
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  filter === "unread"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Não Lidas ({unreadCount})
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Nenhuma notificação não lida
                </h3>
                <p className="text-gray-600">
                  Você está em dia! Volte mais tarde para ver novas atualizações.
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    !notification.isRead ? "border-l-4 border-emerald-500" : ""
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`p-3 rounded-xl ${getBgColor(notification.type)}`}>
                        {getIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
                              NOVA
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-3">{notification.message}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{notification.time}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {!notification.isRead && (
                          <button
                            className="p-2 hover:bg-emerald-50 rounded-lg transition-all"
                            title="Marcar como lida"
                          >
                            <Check className="w-5 h-5 text-emerald-600" />
                          </button>
                        )}
                        <button
                          className="p-2 hover:bg-red-50 rounded-lg transition-all"
                          title="Remover"
                        >
                          <X className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Settings Link */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Configurações de Notificações
                </h3>
                <p className="text-sm text-gray-600">
                  Personalize como e quando você recebe notificações
                </p>
              </div>
              <Link
                href="/seguranca"
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
              >
                Configurar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
