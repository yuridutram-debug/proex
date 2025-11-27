"use client"

import { useState, useEffect } from "react"
import { User, MapPin, Calendar, Star, Heart, Award, Settings, LogOut, Crown, Shield, Bell, Edit2, Camera } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PerfilPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    bio: "",
    localizacao: ""
  })

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push("/login")
        return
      }

      setUser(session.user)

      // Buscar perfil do usuário
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single()

      if (error && error.code !== "PGRST116") {
        console.error("Erro ao carregar perfil:", error)
      }

      if (profileData) {
        setProfile(profileData)
        setFormData({
          nome: profileData.nome || "",
          bio: profileData.bio || "",
          localizacao: profileData.localizacao || ""
        })
      } else {
        // Criar perfil se não existir
        const newProfile = {
          id: session.user.id,
          email: session.user.email!,
          nome: session.user.user_metadata?.nome || session.user.email?.split("@")[0] || "Usuário",
          plano: "free"
        }

        const { data: createdProfile, error: createError } = await supabase
          .from("profiles")
          .insert(newProfile)
          .select()
          .single()

        if (!createError && createdProfile) {
          setProfile(createdProfile)
          setFormData({
            nome: createdProfile.nome,
            bio: "",
            localizacao: ""
          })
        }
      }
    } catch (error) {
      console.error("Erro:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async () => {
    if (!user) return

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          nome: formData.nome,
          bio: formData.bio,
          localizacao: formData.localizacao
        })
        .eq("id", user.id)

      if (error) throw error

      setProfile({ ...profile, ...formData })
      setEditMode(false)
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  const planBadge = {
    free: { label: "Free", color: "from-gray-500 to-gray-600", icon: User },
    pro: { label: "Pro", color: "from-emerald-500 to-teal-600", icon: Crown },
    premium: { label: "Premium", color: "from-purple-500 to-pink-600", icon: Star }
  }

  const currentPlan = planBadge[profile?.plano as keyof typeof planBadge] || planBadge.free
  const PlanIcon = currentPlan.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ExploreLocal
                </h1>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/notificacoes" className="relative p-2 hover:bg-emerald-50 rounded-lg transition-all">
                <Bell className="w-5 h-5 text-gray-700" />
              </Link>
              <Link href="/seguranca" className="p-2 hover:bg-emerald-50 rounded-lg transition-all">
                <Shield className="w-5 h-5 text-gray-700" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-emerald-500 to-teal-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.nome} className="w-full h-full rounded-2xl object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-emerald-500 text-white rounded-lg shadow-lg hover:bg-emerald-600 transition-all">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">{profile?.nome || "Usuário"}</h2>
                  <div className={`flex items-center gap-1 px-3 py-1 bg-gradient-to-r ${currentPlan.color} text-white rounded-full text-sm font-bold`}>
                    <PlanIcon className="w-4 h-4" />
                    {currentPlan.label}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{profile?.email}</p>
                
                {editMode ? (
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                      <input
                        type="text"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Conte um pouco sobre você..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                      <input
                        type="text"
                        value={formData.localizacao}
                        onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Cidade, Estado"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleUpdateProfile}
                        className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {profile?.bio && (
                      <p className="text-gray-700 mb-4">{profile.bio}</p>
                    )}
                    {profile?.localizacao && (
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{profile.localizacao}</span>
                      </div>
                    )}
                    <button
                      onClick={() => setEditMode(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-100 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar Perfil
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Trilhas Exploradas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Favoritos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Avaliações</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Conquistas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/planos" className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all">
            <Crown className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Upgrade para Premium</h3>
            <p className="text-purple-100 mb-4">Desbloqueie recursos exclusivos e trilhas premium</p>
            <button className="px-6 py-2 bg-white text-purple-600 font-bold rounded-lg hover:shadow-lg transition-all">
              Ver Planos
            </button>
          </Link>

          <Link href="/seguranca" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <Shield className="w-12 h-12 text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Segurança</h3>
            <p className="text-gray-600 mb-4">Configure autenticação de dois fatores e privacidade</p>
            <button className="px-6 py-2 bg-emerald-50 text-emerald-600 font-bold rounded-lg hover:bg-emerald-100 transition-all">
              Configurar
            </button>
          </Link>

          <Link href="/notificacoes" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <Bell className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Notificações</h3>
            <p className="text-gray-600 mb-4">Gerencie suas preferências de notificações</p>
            <button className="px-6 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-all">
              Gerenciar
            </button>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Atividade Recente</h3>
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma atividade recente</p>
            <p className="text-sm text-gray-400 mt-2">Comece explorando trilhas e experiências!</p>
            <Link href="/" className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              Explorar Agora
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
