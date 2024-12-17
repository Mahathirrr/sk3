{`export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string
          role: 'student' | 'instructor'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string
          avatar_url?: string
          role?: 'student' | 'instructor'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string
          role?: 'student' | 'instructor'
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          instructor_id: string
          price: number
          category: string
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          thumbnail_url: string
          created_at: string
          updated_at: string
          student_count: number
        }
        Insert: {
          id?: string
          title: string
          description: string
          instructor_id: string
          price: number
          category: string
          difficulty: 'beginner' | 'intermediate' | 'advanced'
          thumbnail_url?: string
          created_at?: string
          updated_at?: string
          student_count?: number
        }
        Update: {
          id?: string
          title?: string
          description?: string
          instructor_id?: string
          price?: number
          category?: string
          difficulty?: 'beginner' | 'intermediate' | 'advanced'
          thumbnail_url?: string
          created_at?: string
          updated_at?: string
          student_count?: number
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string
          video_url: string
          order: number
          duration: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description: string
          video_url: string
          order: number
          duration: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string
          video_url?: string
          order?: number
          duration?: number
          created_at?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          status: 'active' | 'completed' | 'cancelled'
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          status?: 'active' | 'completed' | 'cancelled'
          progress?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          status?: 'active' | 'completed' | 'cancelled'
          progress?: number
          created_at?: string
          updated_at?: string
        }
      }
      access_tokens: {
        Row: {
          id: string
          token: string
          course_id: string
          created_by: string
          used_by: string | null
          used_at: string | null
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          token: string
          course_id: string
          created_by: string
          used_by?: string | null
          used_at?: string | null
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          token?: string
          course_id?: string
          created_by?: string
          used_by?: string | null
          used_at?: string | null
          expires_at?: string
          created_at?: string
        }
      }
      discussions: {
        Row: {
          id: string
          course_id: string
          user_id: string
          title: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          user_id: string
          title: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          user_id?: string
          title?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          discussion_id: string
          user_id: string
          content: string
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          discussion_id: string
          user_id: string
          content: string
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          discussion_id?: string
          user_id?: string
          content?: string
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}`}