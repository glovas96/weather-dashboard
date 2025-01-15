import Navbar from "../components/Navbar";

function AppLayout({ children }) {
    return (
        <div>
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    );
}

export default AppLayout;
