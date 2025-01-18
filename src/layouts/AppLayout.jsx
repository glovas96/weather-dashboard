import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AppLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="container mx-auto flex-1 p-6">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;
