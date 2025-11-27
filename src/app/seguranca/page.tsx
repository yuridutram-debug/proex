"use client"

import { useState } from "react"
import { Shield, Lock, Key, Smartphone, Eye, EyeOff, Check, AlertTriangle, Bell, Activity } from "lucide-react"
import Link from "next/link"

export default function SegurancaPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showBackupCodes, setShowBackupCodes] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const backupCodes = [
    "ABCD-1234-EFGH",
    "IJKL-5678-MNOP",
    "QRST-9012-UVWX",
    "YZAB-3456-CDEF",
    "GHIJ-7890-KLMN",
  ]

  const securityLogs = [
    {
      id: 1,
      action: "Login bem-sucedido",
      location: "São Paulo, SP",
      device: "Chrome no Windows",
      time: "Há 2 horas",
      status: "success",
    },
    {
      id: 2,
      action: "Senha alterada",
      location: "São Paulo, SP",
      device: "Chrome no Windows",
      time: "Há 1 dia",
      status: "success",
    },
    {
      id: 3,
      action: "Tentativa de login falhou",
      location: "Rio de Janeiro, RJ",
      device: "Safari no iPhone",
      time: "Há 3 dias",
      status: "warning",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ExploreLocal
                </h1>
              </div>
            </Link>
            <Link
              href="/perfil"
              className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all font-medium"
            >
              Voltar ao Perfil
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Segurança da Conta
            </h1>
            <p className="text-lg text-gray-600">
              Proteja sua conta com autenticação de dois fatores e monitoramento de atividades
            </p>
          </div>

          {/* Security Status */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Status de Segurança</h2>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <Check className="w-5 h-5" />
                <span className="font-semibold">Protegido</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-emerald-50 rounded-xl">
                <Lock className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Senha Forte</h3>
                <p className="text-sm text-gray-600">Última alteração há 30 dias</p>
              </div>

              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <Smartphone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">2FA {twoFactorEnabled ? "Ativo" : "Inativo"}</h3>
                <p className="text-sm text-gray-600">
                  {twoFactorEnabled ? "Proteção extra ativada" : "Recomendamos ativar"}
                </p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <Activity className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Monitoramento</h3>
                <p className="text-sm text-gray-600">Atividade sendo rastreada</p>
              </div>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Autenticação de Dois Fatores (2FA)
                </h2>
                <p className="text-gray-600">
                  Adicione uma camada extra de segurança à sua conta
                </p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  twoFactorEnabled ? "bg-emerald-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    twoFactorEnabled ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {twoFactorEnabled ? (
              <div className="space-y-6">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-emerald-900 mb-2">
                        2FA Ativado com Sucesso!
                      </h3>
                      <p className="text-emerald-700 mb-4">
                        Sua conta agora está protegida com autenticação de dois fatores. Use seu aplicativo autenticador para fazer login.
                      </p>
                      <button
                        onClick={() => setShowBackupCodes(!showBackupCodes)}
                        className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
                      >
                        {showBackupCodes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {showBackupCodes ? "Ocultar" : "Ver"} Códigos de Backup
                      </button>
                    </div>
                  </div>
                </div>

                {showBackupCodes && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Códigos de Backup</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Guarde estes códigos em um lugar seguro. Você pode usá-los para acessar sua conta se perder acesso ao seu dispositivo.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {backupCodes.map((code, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 rounded-lg p-3 font-mono text-center"
                        >
                          {code}
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 w-full py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all">
                      Baixar Códigos
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-yellow-900 mb-2">
                      Recomendamos Ativar 2FA
                    </h3>
                    <p className="text-yellow-700 mb-4">
                      A autenticação de dois fatores adiciona uma camada extra de segurança, exigindo um código do seu celular além da senha.
                    </p>
                    <button
                      onClick={() => setTwoFactorEnabled(true)}
                      className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-all"
                    >
                      Ativar Agora
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Password Change */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Alterar Senha</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Senha Atual
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Digite sua senha atual"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Digite sua nova senha"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Confirme sua nova senha"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Atualizar Senha
              </button>
            </form>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Notificações de Segurança
                </h2>
                <p className="text-gray-600">
                  Receba alertas sobre atividades suspeitas em sua conta
                </p>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  notificationsEnabled ? "bg-emerald-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    notificationsEnabled ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Novos logins</span>
                </div>
                <Check className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Alterações de senha</span>
                </div>
                <Check className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Tentativas de login falhas</span>
                </div>
                <Check className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </div>

          {/* Security Logs */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Atividade Recente</h2>
            <div className="space-y-4">
              {securityLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      log.status === "success"
                        ? "bg-emerald-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    {log.status === "success" ? (
                      <Check className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{log.action}</h3>
                    <p className="text-sm text-gray-600">{log.device}</p>
                    <p className="text-sm text-gray-500">{log.location} • {log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-3 border-2 border-emerald-500 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-all">
              Ver Histórico Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
