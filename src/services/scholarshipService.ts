import { supabase } from '@/lib/supabase';

export interface Scholarship {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  category: string;
  state: string;
  provider: string;
  official_link?: string;
  requirements?: string[];
  documents?: string[];
}

export const scholarshipService = {
  // Fetch real scholarships from Supabase
  async fetchExternalScholarships(): Promise<Scholarship[]> {
    try {
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(s => ({
        id: s.id,
        title: s.title,
        description: s.description,
        amount: s.amount,
        deadline: s.deadline || 'Ongoing',
        category: s.category,
        state: s.state,
        provider: s.provider || 'Verified Provider',
        official_link: s.official_link || '',
      }));
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      return [];
    }
  },

  async getScholarshipById(id: string): Promise<Scholarship | null> {
    const all = await this.fetchExternalScholarships();
    return all.find(s => s.id === id) || null;
  },

  async saveScholarship(userId: string, scholarshipId: string) {
    const { error } = await supabase
      .from('saved_scholarships')
      .insert({ user_id: userId, scholarship_id: scholarshipId });
    return { error };
  }
};
