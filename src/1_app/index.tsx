import { Routing } from '2_pages';
import './index.css';
import '../6_shared/assets/images/header-1.png';
import { withProviders } from './providers';

function App() {
  return (
    <div className="App bg-[url('../6_shared/assets/images/header-1.png')] bg-cover">
      <Routing />
    </div>
  );
}

export default withProviders(App);
