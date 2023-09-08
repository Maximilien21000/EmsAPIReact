import {useNavigate} from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const navigateToLogin = () => {navigate('login')}
  
  return (
    <div className="App bg-zinc-500 min-h-screen flex
        flex-col justify-center items-center">
      <button class="btn btn-primary" onClick={navigateToLogin}>EMS-API-Portal - Login</button>
    </div>
); }
export default App;