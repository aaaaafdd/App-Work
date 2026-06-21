import {useState} from 'react'
import FormField from '../components/ui/FormField';
import { FormData } from '../types/formDataType';
import { fetchAuth } from '../utils/fetchAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../auth/useAuth';
import useSocket from '../hooks/useSocket';

export default function Auth() {
    const [formData, setFormData] = useState<FormData>({email: '', password: '', username: ''});
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const navigate = useNavigate();
    const { login } = useAuth();
    const {socket} = useSocket();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, isRegister: boolean) => {
        event.preventDefault();
        fetchAuth(isRegister, formData).then((response) => {
            if(response){
                if (response?.status === 'error') {
                    setError(response.error || 'An error ocurred');
                    setMessage(null);
                    return;
                }
                
                setMessage(response.message || (isRegister ? 'Register success!' : 'User logged succesfully'));
                setError(null);
                setFormData({email: '', password: '', username: ''});
                if (isRegister) {
                    setActiveTab('login'); 
                } else {
                    if (response.token) {
                        socket?.emit('register_user', response.userId);
                        login(response.token);
                        navigate('/home');
                    } else {
                        setError('No token received');
                    }
                }
            }         
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">张善茹 Chat App</h1>
                </div>

                {/* Mensajes de estado */}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
                        <p>{error}</p>
                    </div>
                )}
                {message && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-4 rounded">
                        <p>{message}</p>
                    </div>
                )}

                {/* Contenedor de pestañas */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Navegación por pestañas */}
                    <div className="flex border-b">
                        <button
                            className={`flex-1 py-3 font-medium ${activeTab === 'login' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('login')}
                        >
                            Log in
                        </button>
                        <button
                            className={`flex-1 py-3 font-medium ${activeTab === 'register' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('register')}
                        >
                            Register
                        </button>
                    </div>

                    {/* Contenido de pestañas */}
                    <div className="p-6">
                        {activeTab === 'login' ? (
                            <>
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Log in</h2>
                                <form onSubmit={(event) => handleSubmit(event, false)} className="space-y-4">
                                    <FormField 
                                        label="Email" 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                    />
                                    <FormField 
                                        label="Password" 
                                        type="password" 
                                        name="password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                    />
                                    <Button 
                                        type="submit" 
                                        label="Log in" 
                                    />
                                </form>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Account</h2>
                                <form onSubmit={(event) => handleSubmit(event, true)} className="space-y-4">
                                    <FormField 
                                        label="Username" 
                                        type="text" 
                                        name="username" 
                                        value={formData.username} 
                                        onChange={handleChange} 
                                    />
                                    <FormField 
                                        label="Email" 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                    />
                                    <FormField 
                                        label="Password" 
                                        type="password" 
                                        name="password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                    />
                                    <Button 
                                        type="submit" 
                                        label="Register" 
                                    />
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
