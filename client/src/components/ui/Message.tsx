
import MessageAttributes from '../../types/messageType';

export default function Message({ receivedUserRoom, content, isCurrentUser = false }: MessageAttributes) {

    return (
      <div className={`mb-3 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[80%] px-4 py-2 rounded-lg ${
            isCurrentUser
              ? 'bg-amber-400 text-gray-800 rounded-br-none' 
              : 'bg-gray-100 text-gray-800 rounded-bl-none'  
          } shadow-sm`}
        >
          <strong className={`block text-sm ${isCurrentUser ? 'text-amber-800' : 'text-gray-600'}`}>
            {receivedUserRoom.username}
          </strong>
          <p className="mt-1 text-gray-700">{content}</p>
        </div>
      </div>
    );
  }



