import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="main-layout">
      <header className="bg-primary text-white py-3 px-4 text-xl">
        sellmate-ui-kit
      </header>
      <Outlet />
    </main>
  );
};

export default MainLayout;
