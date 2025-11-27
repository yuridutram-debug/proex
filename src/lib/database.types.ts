// Tipos do banco de dados Supabase
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          nome: string
          avatar_url: string | null
          bio: string | null
          localizacao: string | null
          plano: 'free' | 'pro' | 'premium'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          nome: string
          avatar_url?: string | null
          bio?: string | null
          localizacao?: string | null
          plano?: 'free' | 'pro' | 'premium'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          nome?: string
          avatar_url?: string | null
          bio?: string | null
          localizacao?: string | null
          plano?: 'free' | 'pro' | 'premium'
          created_at?: string
          updated_at?: string
        }
      }
      trilhas: {
        Row: {
          id: string
          nome: string
          descricao: string
          localizacao: string
          dificuldade: 'facil' | 'moderada' | 'dificil'
          distancia: number
          duracao: number
          rating: number
          total_avaliacoes: number
          imagem_url: string
          tags: string[]
          is_premium: boolean
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          descricao: string
          localizacao: string
          dificuldade: 'facil' | 'moderada' | 'dificil'
          distancia: number
          duracao: number
          rating?: number
          total_avaliacoes?: number
          imagem_url: string
          tags?: string[]
          is_premium?: boolean
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          descricao?: string
          localizacao?: string
          dificuldade?: 'facil' | 'moderada' | 'dificil'
          distancia?: number
          duracao?: number
          rating?: number
          total_avaliacoes?: number
          imagem_url?: string
          tags?: string[]
          is_premium?: boolean
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      experiencias: {
        Row: {
          id: string
          titulo: string
          descricao: string
          host_id: string
          host_nome: string
          localizacao: string
          preco: number
          rating: number
          total_participantes: number
          imagem_url: string
          tipo: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          titulo: string
          descricao: string
          host_id: string
          host_nome: string
          localizacao: string
          preco: number
          rating?: number
          total_participantes?: number
          imagem_url: string
          tipo: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          descricao?: string
          host_id?: string
          host_nome?: string
          localizacao?: string
          preco?: number
          rating?: number
          total_participantes?: number
          imagem_url?: string
          tipo?: string
          created_at?: string
          updated_at?: string
        }
      }
      eventos: {
        Row: {
          id: string
          titulo: string
          descricao: string
          data: string
          hora: string
          localizacao: string
          categoria: string
          total_participantes: number
          imagem_url: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          titulo: string
          descricao: string
          data: string
          hora: string
          localizacao: string
          categoria: string
          total_participantes?: number
          imagem_url: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          descricao?: string
          data?: string
          hora?: string
          localizacao?: string
          categoria?: string
          total_participantes?: number
          imagem_url?: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      favoritos: {
        Row: {
          id: string
          user_id: string
          item_id: string
          item_type: 'trilha' | 'experiencia' | 'evento' | 'lugar'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          item_id: string
          item_type: 'trilha' | 'experiencia' | 'evento' | 'lugar'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          item_id?: string
          item_type?: 'trilha' | 'experiencia' | 'evento' | 'lugar'
          created_at?: string
        }
      }
      avaliacoes: {
        Row: {
          id: string
          user_id: string
          item_id: string
          item_type: 'trilha' | 'experiencia' | 'evento' | 'lugar'
          rating: number
          comentario: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          item_id: string
          item_type: 'trilha' | 'experiencia' | 'evento' | 'lugar'
          rating: number
          comentario: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          item_id?: string
          item_type?: 'trilha' | 'experiencia' | 'evento' | 'lugar'
          rating?: number
          comentario?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
