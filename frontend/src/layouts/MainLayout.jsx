import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainLayout() {
  return (
    <div className="site-shell">
      <Header />
      <main className="site-main tw-surface w-full max-w-none min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
