"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MapPin, Users, Calendar, Star, Heart, Globe, Music, MessageCircle, Clock, ChevronRight, Menu, X, LogOut, User as UserIcon, Crown, Bell, Shield } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Home() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("explorar")
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    // Verificar se há usuário logado
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const categories = [
    { id: "explorar", label: "Explorar", icon: Globe },
    { id: "trilhas", label: "Trilhas", icon: MapPin },
    { id: "experiencias", label: "Experiências", icon: Users },
    { id: "eventos", label: "Eventos", icon: Calendar },
    { id: "avaliacoes", label: "Avaliações", icon: Star },
  ]

  const featuredTrails = [
    {
      id: 1,
      name: "Trilha da Cachoeira Escondida",
      location: "Serra da Mantiqueira, SP",
      difficulty: "Moderada",
      distance: "8.5 km",
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
      tags: ["Cachoeira", "Vida Selvagem", "Fotografia"],
      isPremium: false
    },
    {
      id: 2,
      name: "Rota dos Pássaros Raros",
      location: "Pantanal, MT",
      difficulty: "Fácil",
      distance: "5.2 km",
      rating: 4.9,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop",
      tags: ["Observação", "Natureza", "Fotografia"],
      isPremium: true
    },
    {
      id: 3,
      name: "Caminho das Araucárias",
      location: "Campos do Jordão, SP",
      difficulty: "Difícil",
      distance: "12.3 km",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      tags: ["Montanha", "Aventura", "Camping"],
      isPremium: true
    }
  ]

  const localExperiences = [
    {
      id: 1,
      title: "Aula de Fotografia de Natureza",
      host: "Maria Silva",
      location: "São Paulo, SP",
      price: "R$ 150",
      rating: 4.9,
      participants: 12,
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop",
      type: "Aula"
    },
    {
      id: 2,
      title: "Encontro de Trilheiros",
      host: "Grupo Aventura",
      location: "Rio de Janeiro, RJ",
      price: "Gratuito",
      rating: 4.8,
      participants: 45,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
      type: "Social"
    },
    {
      id: 3,
      title: "Tour Gastronômico Local",
      host: "João Santos",
      location: "Salvador, BA",
      price: "R$ 80",
      rating: 5.0,
      participants: 8,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      type: "Experiência"
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Festival de Música ao Ar Livre",
      date: "15 Jun 2024",
      time: "18:00",
      location: "Parque Ibirapuera, SP",
      category: "Música",
      attendees: 2500,
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Feira de Artesanato Regional",
      date: "20 Jun 2024",
      time: "10:00",
      location: "Centro Histórico, MG",
      category: "Cultural",
      attendees: 800,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Corrida de Montanha",
      date: "25 Jun 2024",
      time: "07:00",
      location: "Serra do Mar, RJ",
      category: "Esporte",
      attendees: 350,
      image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&h=600&fit=crop"
    }
  ]

  const topPlaces = [
    {
      id: 1,
      name: "Restaurante Vista da Serra",
      category: "Restaurante",
      location: "Gramado, RS",
      rating: 4.9,
      reviews: 567,
      priceRange: "R$$ - R$$$",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      name: "Pousada Recanto Verde",
      category: "Hotel",
      location: "Bonito, MS",
      rating: 4.8,
      reviews: 423,
      priceRange: "R$$ - R$$$",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      name: "Bar do Mirante",
      category: "Bar",
      location: "Florianópolis, SC",
      rating: 4.7,
      reviews: 892,
      priceRange: "R$ - R$$",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ExploreLocal
                </h1>
                <p className="text-xs text-gray-600">Descubra o extraordinário</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      activeTab === cat.id
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-emerald-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{cat.label}</span>
                  </button>
                )
              })}
            </nav>

            {/* User Menu / Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  {/* Notifications */}
                  <Link
                    href="/notificacoes"
                    className="relative p-2 hover:bg-emerald-50 rounded-lg transition-all"
                  >
                    <Bell className="w-5 h-5 text-gray-700" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </Link>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-all"
                    >
                      <UserIcon className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {user.user_metadata?.nome || user.email?.split('@')[0]}
                      </span>
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                        <Link
                          href="/perfil"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 transition-all"
                        >
                          <UserIcon className="w-4 h-4" />
                          <span>Meu Perfil</span>
                        </Link>
                        <Link
                          href="/planos"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 transition-all"
                        >
                          <Crown className="w-4 h-4" />
                          <span>Planos Premium</span>
                        </Link>
                        <Link
                          href="/seguranca"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 transition-all"
                        >
                          <Shield className="w-4 h-4" />
                          <span>Segurança</span>
                        </Link>
                        <hr className="my-2 border-gray-100" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sair</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all font-medium"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/cadastro"
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                  >
                    Cadastrar
                  </Link>
                  <Link
                    href="/planos"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                  >
                    <Crown className="w-4 h-4" />
                    Ver Planos
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-emerald-50"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveTab(cat.id)
                      setMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === cat.id
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                        : "text-gray-700 hover:bg-emerald-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{cat.label}</span>
                  </button>
                )
              })}

              {/* Mobile Auth */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                {user ? (
                  <>
                    <Link
                      href="/notificacoes"
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-all"
                    >
                      <Bell className="w-5 h-5" />
                      <span>Notificações</span>
                      {notifications > 0 && (
                        <span className="ml-auto w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {notifications}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/perfil"
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-all"
                    >
                      <UserIcon className="w-5 h-5" />
                      <span>Meu Perfil</span>
                    </Link>
                    <Link
                      href="/planos"
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-all"
                    >
                      <Crown className="w-5 h-5" />
                      <span>Planos Premium</span>
                    </Link>
                    <Link
                      href="/seguranca"
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-all"
                    >
                      <Shield className="w-5 h-5" />
                      <span>Segurança</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sair</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block w-full px-4 py-3 text-center text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all font-medium"
                    >
                      Entrar
                    </Link>
                    <Link
                      href="/cadastro"
                      className="block w-full px-4 py-3 text-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                    >
                      Cadastrar
                    </Link>
                    <Link
                      href="/planos"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                    >
                      <Crown className="w-5 h-5" />
                      Ver Planos
                    </Link>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-500/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Explore o Mundo ao Seu Redor
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Descubra trilhas secretas, conecte-se com locais, participe de experiências únicas e planeje viagens inesquecíveis
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar trilhas, experiências, eventos..."
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-400" />
                <select className="bg-transparent outline-none text-gray-700 cursor-pointer">
                  <option>Todos os Estados</option>
                  <option>São Paulo</option>
                  <option>Rio de Janeiro</option>
                  <option>Minas Gerais</option>
                  <option>Bahia</option>
                  <option>Santa Catarina</option>
                </select>
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Banner */}
      <section className="container mx-auto px-4 mb-12">
        <Link href="/planos">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl hover:shadow-3xl transition-all cursor-pointer">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Crown className="w-12 h-12" />
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Desbloqueie Recursos Premium
                  </h3>
                  <p className="text-purple-100">
                    Trilhas exclusivas, notificações em tempo real, sem anúncios e muito mais
                  </p>
                </div>
              </div>
              <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:shadow-2xl transition-all whitespace-nowrap">
                Ver Planos
              </button>
            </div>
          </div>
        </Link>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Trilhas Section */}
        {(activeTab === "explorar" || activeTab === "trilhas") && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Trilhas em Destaque</h3>
                <p className="text-gray-600">Rotas menos exploradas e vida selvagem única</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtros</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTrails.map((trail) => (
                <div
                  key={trail.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={trail.image}
                      alt={trail.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {trail.isPremium && (
                      <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-bold rounded-full">
                        <Crown className="w-3 h-3" />
                        PREMIUM
                      </div>
                    )}
                    <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all">
                      <Heart className="w-5 h-5 text-gray-700" />
                    </button>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {trail.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{trail.name}</h4>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{trail.location}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-medium">{trail.distance}</span>
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
                          {trail.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{trail.rating}</span>
                        <span className="text-sm text-gray-500">({trail.reviews})</span>
                      </div>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      Ver Detalhes
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experiências Locais Section */}
        {(activeTab === "explorar" || activeTab === "experiencias") && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Experiências Locais</h3>
                <p className="text-gray-600">Conecte-se com moradores e outros viajantes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-teal-500 text-white text-xs font-medium rounded-full">
                      {exp.type}
                    </span>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h4>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Por {exp.host}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{exp.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">{exp.participants} participantes</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-2xl font-bold text-emerald-600">{exp.price}</span>
                      <button className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all">
                        Participar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Eventos Section */}
        {(activeTab === "explorar" || activeTab === "eventos") && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Eventos em Tempo Real</h3>
                <p className="text-gray-600">Acontecendo agora nas cidades próximas</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-emerald-600">15</div>
                      <div className="text-xs text-gray-600">JUN</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full mb-3">
                      {event.category}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h4>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{event.attendees} pessoas confirmadas</span>
                      </div>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                      Confirmar Presença
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Avaliações Section */}
        {(activeTab === "explorar" || activeTab === "avaliacoes") && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Lugares Recomendados</h3>
                <p className="text-gray-600">Avaliações de usuários para restaurantes, hotéis e mais</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPlaces.map((place) => (
                <div
                  key={place.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all">
                      <Heart className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {place.category}
                      </span>
                      <span className="text-sm font-medium text-gray-600">{place.priceRange}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h4>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{place.location}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg font-bold text-gray-900">{place.rating}</span>
                        <span className="text-sm text-gray-500">({place.reviews} avaliações)</span>
                      </div>
                    </div>
                    <button className="w-full py-3 border-2 border-emerald-500 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Ver Avaliações
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para sua próxima aventura?
          </h3>
          <p className="text-lg md:text-xl mb-8 text-emerald-50">
            Junte-se a milhares de exploradores e descubra experiências únicas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                href="/perfil"
                className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:shadow-2xl transition-all"
              >
                Ver Meu Perfil
              </Link>
            ) : (
              <>
                <Link
                  href="/cadastro"
                  className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:shadow-2xl transition-all"
                >
                  Criar Conta Gratuita
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-all"
                >
                  Já tenho conta
                </Link>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">ExploreLocal</span>
              </div>
              <p className="text-gray-400 text-sm">
                Conectando pessoas a experiências autênticas e lugares extraordinários
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Explorar</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">Trilhas</li>
                <li className="hover:text-white cursor-pointer">Experiências</li>
                <li className="hover:text-white cursor-pointer">Eventos</li>
                <li className="hover:text-white cursor-pointer">Avaliações</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Comunidade</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">Seja um Anfitrião</li>
                <li className="hover:text-white cursor-pointer">Grupos</li>
                <li className="hover:text-white cursor-pointer">Blog</li>
                <li className="hover:text-white cursor-pointer">Fórum</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">Central de Ajuda</li>
                <li className="hover:text-white cursor-pointer">Contato</li>
                <li className="hover:text-white cursor-pointer">Termos de Uso</li>
                <li className="hover:text-white cursor-pointer">Privacidade</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 ExploreLocal. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
