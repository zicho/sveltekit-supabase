import type { UserProfileModel } from '$lib/models/user/UserProfileModel'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const users = {
    async profile(username: string): Promise<UserProfileModel> {
        const { data } = await supabase
            .from('profiles')
            .select('username, description')
            .eq('username', username);

        return data[0] as UserProfileModel;
    },
    
    async profileById(id: string): Promise<UserProfileModel> {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id);

        return data[0] as UserProfileModel;
    }
}