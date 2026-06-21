import UserProfile from '../UserProfile';

function Navbar({children} : {children: React.ReactNode}) {
    return (
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-amber-600">张善茹 Chat App</h1>
                    <div className="flex items-center space-x-4">
                        {children}
                    </div>
                    <UserProfile />
            </nav>
    );
}

export default Navbar;
