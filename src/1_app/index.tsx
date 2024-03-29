import { Routing } from '2_pages';
import './index.css';
import '../6_shared/assets/images/header-1.png';
import { withProviders } from './providers';

function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default withProviders(App);
