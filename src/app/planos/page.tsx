"use client"

import { useState } from "react"
import { Check, Crown, Zap, Shield, TrendingUp, Users, Bell, BarChart3, Lock, Star } from "lucide-react"
import Link from "next/link"

export default function PlanosPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      icon: Zap,
      color: "from-gray-500 to-gray-600",
      description: "Perfeito para começar sua jornada",
      features: [
        "Acesso básico a trilhas",
        "5 trilhas por mês",
        "Comunidade básica",
        "Suporte por email",
        "Perfil público",
      ],
      cta: "Começar Grátis",
      popular: false,
    },
    {
      name: "Pro",
      price: { monthly: 29.90, yearly: 299.00 },
      icon: Crown,
      color: "from-emerald-500 to-teal-600",
      description: "Para exploradores sérios",
      features: [
        "Acesso ilimitado a trilhas",
        "Trilhas exclusivas Premium",
        "Notificações em tempo real",
        "Suporte prioritário 24/7",
        "Sem anúncios",
        "Badge Pro no perfil",
        "Grupos privados",
        "Download de mapas offline",
      ],
      cta: "Assinar Pro",
      popular: true,
    },
    {
      name: "Premium",
      price: { monthly: 49.90, yearly: 499.00 },
      icon: Star,
      color: "from-purple-500 to-pink-600",
      description: "Experiência completa e exclusiva",
      features: [
        "Tudo do plano Pro",
        "Painel de administração",
        "Analytics avançado",
        "API access completo",
        "Consultoria mensal 1:1",
        "Badge Premium exclusivo",
        "Eventos VIP",
        "Acesso antecipado a novidades",
        "Suporte dedicado",
        "Personalização avançada",
      ],
      cta: "Assinar Premium",
      popular: false,
    },
  ]

  const savings = billingCycle === "yearly" ? "Economize 17%" : ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ExploreLocal
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

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Escolha o Plano Perfeito para Você
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Desbloqueie todo o potencial do ExploreLocal com recursos exclusivos e suporte premium
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-white rounded-2xl p-2 shadow-lg">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all relative ${
                  billingCycle === "yearly"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Anual
                {savings && (
                  <span className="absolute -top-2 -right-2 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                    {savings}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon
              const price = plan.price[billingCycle]
              const priceDisplay = price === 0 ? "Grátis" : `R$ ${price.toFixed(2)}`
              const period = billingCycle === "monthly" ? "/mês" : "/ano"

              return (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    plan.popular ? "ring-4 ring-emerald-500" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-1 text-sm font-bold rounded-bl-xl">
                      MAIS POPULAR
                    </div>
                  )}

                  <div className="p-8">
                    {/* Icon & Name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    </div>

                    <p className="text-gray-600 mb-6">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-gray-900">{priceDisplay}</span>
                        {price > 0 && <span className="text-gray-600">{period}</span>}
                      </div>
                      {billingCycle === "yearly" && price > 0 && (
                        <p className="text-sm text-emerald-600 font-medium mt-2">
                          Economize R$ {((plan.price.monthly * 12) - plan.price.yearly).toFixed(2)} por ano
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all mb-8 ${
                        plan.popular
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-2xl"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      {plan.cta}
                    </button>

                    {/* Features */}
                    <div className="space-y-4">
                      <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        Recursos incluídos:
                      </p>
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Por Que Escolher um Plano Premium?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Segurança Avançada</h4>
              <p className="text-gray-600">
                Autenticação de dois fatores e proteção de dados de nível empresarial
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Notificações em Tempo Real</h4>
              <p className="text-gray-600">
                Receba alertas instantâneos sobre novos eventos e trilhas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Analytics Avançado</h4>
              <p className="text-gray-600">
                Acompanhe suas estatísticas e progresso com dashboards detalhados
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Comunidade Exclusiva</h4>
              <p className="text-gray-600">
                Acesso a grupos privados e eventos VIP para membros premium
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Perguntas Frequentes
          </h3>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Posso cancelar minha assinatura a qualquer momento?
              </h4>
              <p className="text-gray-600">
                Sim! Você pode cancelar sua assinatura a qualquer momento. Você continuará tendo acesso aos recursos premium até o final do período pago.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Existe período de teste gratuito?
              </h4>
              <p className="text-gray-600">
                Sim! Oferecemos 7 dias de teste gratuito para os planos Pro e Premium. Você pode cancelar antes do fim do período sem nenhum custo.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Como funciona a segurança dos meus dados?
              </h4>
              <p className="text-gray-600">
                Utilizamos criptografia de ponta a ponta, autenticação de dois fatores e seguimos as melhores práticas de segurança da indústria para proteger seus dados.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Posso mudar de plano depois?
              </h4>
              <p className="text-gray-600">
                Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor imediatamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Começar sua Jornada?
          </h3>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de exploradores que já estão descobrindo experiências incríveis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cadastro"
              className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:shadow-2xl transition-all"
            >
              Começar Agora
            </Link>
            <Link
              href="/"
              className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-all"
            >
              Ver Demonstração
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 ExploreLocal. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
