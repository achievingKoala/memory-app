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

  static async select(table, columns = '*', filters = {'chapter': 'Test'}) {
    let query = supabase.from(table).select(columns)
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    
    const { data, error } = await query
    return { data, error }
  }
}

export default SupabaseUtils