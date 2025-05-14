import { Shop } from './shop';
import { Fidelity } from '@/type/fidelity';

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  code: string
  shops: Shop[]
  clients: Fidelity[]
};
