import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainLayout() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
