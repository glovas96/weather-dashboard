function Footer() {
    return (
        <footer className="border-t bg-white">
            <div className="container mx-auto p-4 text-sm text-gray-500 flex justify-between">
                <span>Built for portfolio</span>
                <a
                    href="https://github.com/glovas96"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-600"
                >
                    made by @glovas96
                </a>
            </div>
        </footer>
    );
}

export default Footer;
