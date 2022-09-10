import './App.css';
import Invoices from './Invoices/Invoices';
import Sidebar from './SideBar/SideBar';
import Navbar from './Navbar/Navbar';
function App() {
  return (
    <div className="App">
      
      <div>
        <Navbar />
      </div>
      <div className='LayoutContainer'>
        <div>
          <Sidebar />
        </div>
        <div>
          <Invoices />
        </div>
      </div>
    </div>
  );
}

export default App;
