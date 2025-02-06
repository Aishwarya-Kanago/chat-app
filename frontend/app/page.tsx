import Sidebar from "./components/Sidebar";
import Chatbox from "./components/ChatWindow";

const HomePage = () => {
  return (
    <>
      <div className="lg:h-[90vh] lg:p-4 p-2 w-full overflow-x-hidden">
        <div className="flex items-center justify-center">
          <div className="shadow-xl rounded-lg w-full max-w-6xl h-[90vh] lg:h-[calc(100vh-8rem)]">
            <div className="flex rounded-lg w-full max-w-6xl h-[90vh] lg:h-[calc(100vh-8rem)]">
              <Sidebar />
              <Chatbox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
