import "./App.css";
import { SidebarNav } from "./components/layout/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/query.client";

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <section className="h-screen w-screen flex p-4 gap-4 bg-gray-800 overflow-hidden">
          <aside className="w-auto text-gray-200">
            <SidebarNav></SidebarNav>
          </aside>
          <main className="h-full flex-1 flex flex-col overflow-auto bg-gray-900 rounded-lg p-4">
            <div id="detail">
              <Outlet />
            </div>
          </main>
        </section>
      </div>
    </QueryClientProvider>
  );
}

export default App;
