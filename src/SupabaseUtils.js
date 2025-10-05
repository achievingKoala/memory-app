import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

class SupabaseUtils {
  static async upsert(table, data, options = {}) {
    const { data: result, error } = await supabase
      .from(table)
      .upsert(data)
      .select()
    
    return { data: result, error }
  }

  static async insert(table, data) {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
    
    return { data: result, error }
  }

  static async select(table, columns = '*', filters = {'chapter': 'Test'}) {
    let query = supabase.from(table).select(columns)
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    
    const { data, error } = await query
    return { data, error }
  }

  static async update(table, data, filters = {}) {
    let query = supabase.from(table).update(data)
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    
    const { data: result, error } = await query.select()
    return { data: result, error }
  }

  static async delete(table, filters = {}) {
    let query = supabase.from(table)
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.delete().eq(key, value)
    })
    
    const { data, error } = await query
    return { data, error }
  }
}

export default SupabaseUtils