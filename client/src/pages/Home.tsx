import {useState} from 'react'
import ChatBox from '../components/ChatBox';
import CreateRoomForm from '../components/room/CreateRoomForm';
import RoomList from '../components/room/RoomList';
import UserRoomList from '../components/room/UserRoomList';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import ContactList from '../components/users/ContactList';
import UserList from '../components/users/UserList';

export default function Home() {
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState('rooms');
    const [activeRoom, setActiveRoom] = useState<'myRooms' | 'rooms'>('rooms')

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header/Navbar */}
            <header className="bg-white shadow-sm">
                <Navbar>
                <Button 
                        label="Rooms" 
                        type="button"
                        onClick={() => setActiveSection('rooms')}
                    />
                    <Button 
                        label="Contacts" 
                        type="button"
                        onClick={() => setActiveSection('contacts')}
                    />
                    <Button 
                        label="Find people" 
                        type="button"
                        onClick={() => setActiveSection('people')}
                    />
                </Navbar>
            </header>

            {/* Notificación de error global */}
            {error && (
                <div className="fixed top-4 right-4 z-50">
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg flex items-start">
                        <span className="mr-2">⚠️</span>
                        <div>
                            <p className="font-medium">Error</p>
                            <p>{error}</p>
                        </div>
                        <button 
                            onClick={() => setError(null)}
                            className="ml-4 text-red-500 hover:text-red-700"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            {/* Contenido Principal */}
            <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sección de Salas */}
                <div className="lg:col-span-1 space-y-6">
                {activeSection === 'rooms' && (
                        <>
                            <CreateRoomForm />
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Rooms</h2>
                                <Button 
                                    label={activeRoom === 'myRooms' ? 'All Rooms' : 'My Rooms'} 
                                    type="button"
                                    onClick={() => setActiveRoom(activeRoom === 'myRooms' ? 'rooms' : 'myRooms')}
                                />
                                </div>
                            {activeRoom === 'myRooms' ? (
                                <UserRoomList />
                            ) : (
                                <RoomList />
                            )}
                        </>
                    )}
                    
                    {activeSection === 'contacts' && (
                        <ContactList />
                    )}
                    
                    {activeSection === 'people' && (
                        <UserList />
                    )}
                </div>

                {/* Chat Principal */}
                <div className="lg:col-span-2">
                    <ChatBox/>
                </div>
            </main>
        </div>
    );
}