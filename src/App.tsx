import "./App.css";
import { SidebarNav } from "./Components/Layout/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <section className="h-screen w-screen flex p-4 gap-4 bg-gray-800 overflow-hidden">
          <aside className="w-auto text-gray-200">
            <SidebarNav></SidebarNav>
          </aside>
          <main className="h-full flex-1 flex flex-col overflow-auto bg-gray-900 rounded-lg p-4">
            {/* <Header /> */}
            <div id="detail">
              {" "}
              <Outlet />
            </div>
          </main>
        </section>
      </div>
    </QueryClientProvider>
    // <div classNameName="h-screen w-screen bg-gray-200 flex flex-col-reverse sm:flex-row min-h-0 min-w-0 overflow-hidden">
    //   <div classNameName="mb-10"> <Header /></div>

    //   <div classNameName="flex">
    //     <div classNameName="w-1">
    //       <Sidebar></Sidebar>
    //     </div>
    //     <div classNameName="w-3">
    //       <main classNameName="relative container  w-full">ffdg</main>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
