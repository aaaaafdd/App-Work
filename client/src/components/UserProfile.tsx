import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../auth/useAuth';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
}

export default function UserProfile() {
    const [user, setUser] = useState<UserAttributes | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {logout} = useAuth();
    const url = import.meta.env.VITE_REACT_URL_API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = localStorage.getItem('user');
                const userId = user ? JSON.parse(user).id : null;

                if (!userId) {
                    navigate('/');
                    return;
                }

                const response = await fetch(`${url}/user/me/${userId}`);
                if (!response.ok) throw new Error("Error al obtener datos del usuario");
                
                const data = await response.json();
                if (data.status === 'success') {
                    setUser(data.user);
                } 
            } catch (err) {
                console.error(err);
                if (err instanceof Error) {
                    alert(`Error: ${err.message}`);
                } else {
                    alert('Error desconocido al obtener datos del usuario');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        try {
            logout();
            navigate('/');
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                alert(`Error: ${err.message}`);
            } else {
                alert('Error desconocido al cerrar sesión');
            }
        }
    };

    if (loading) return <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>;

    return (
        <div className="flex items-center space-x-4">
            {user ? (
                <>
                    <div className="text-right hidden sm:block">
                        <p className="font-medium text-gray-800">{user.username}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}