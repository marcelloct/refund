import { use } from 'react'; // same as useContext
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const context = use(AuthContext);
  return context;
}
