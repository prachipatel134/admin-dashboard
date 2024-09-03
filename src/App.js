import React from 'react';
import { BrowserRouter ,Router, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Dashboard from './components/Dashboard';


const App = () => {
  return (
    <Provider store={store}>
     <BrowserRouter>
      <Routes>
        
          <Route index element={<Dashboard />} />
          
        
      </Routes>
    </BrowserRouter>
    </Provider>
  );
};

export default App;
