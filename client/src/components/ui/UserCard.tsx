import UserCardProps from "../../types/userType";

export default function UserCard({username, status, children}: UserCardProps) {

    return (
      <div className="p-4 mb-3 border border-gray-200 rounded-lg transition-all duration-200 hover:border-amber-300 hover:shadow-md cursor-pointer bg-white flex justify-between">
            <h3 className="font-semibold text-lg text-gray-800 mb-1 flex items-center gap-2">
                {username} <span className="text-gray-600 text-sm">{status === 'online' ? '🟢' : '⚪'}</span>
            </h3>
            {children}
        </div>
        
    );
}
