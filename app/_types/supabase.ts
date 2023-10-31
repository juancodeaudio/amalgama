import { PostgrestError } from '@supabase/supabase-js'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      classes: {
        Row: {
          class_number: number | null
          content: string
          course_id: string
          created_at: string
          description: string
          duration: number | null
          id: string
          slug: string
          title: string
        }
        Insert: {
          class_number?: number | null
          content?: string
          course_id: string
          created_at?: string
          description?: string
          duration?: number | null
          id?: string
          slug?: string
          title?: string
        }
        Update: {
          class_number?: number | null
          content?: string
          course_id?: string
          created_at?: string
          description?: string
          duration?: number | null
          id?: string
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          class_id: string
          content: string
          created_at: string
          id: string
          reply_of: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          class_id: string
          content: string
          created_at?: string
          id?: string
          reply_of?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          class_id?: string
          content?: string
          created_at?: string
          id?: string
          reply_of?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          }
        ]
      }
      courses: {
        Row: {
          created_at: string
          description: string
          duration: number | null
          id: string
          image: string
          slug: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          duration?: number | null
          id?: string
          image: string
          slug: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          duration?: number | null
          id?: string
          image?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          course_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
export type CoursesWithClasses = Tables<'courses'> & {
	classes: Tables<'classes'>[];
}

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError

