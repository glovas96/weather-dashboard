import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AppLayout({ children }) {
    return (
        <div>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;
