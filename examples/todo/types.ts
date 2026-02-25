// ─── Types ────────────────────────────────────────────────────────────────────

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  editedAt?: number;
};

export type Filter = 'all' | 'active' | 'completed';
