import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <header className="p-4 bg-blue-50">Public Header</header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
