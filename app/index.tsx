import 'react-native-gesture-handler';
import Home from '../src/pages/Home';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
      <PaperProvider>
        <Home/>
      </PaperProvider>
  );
}
