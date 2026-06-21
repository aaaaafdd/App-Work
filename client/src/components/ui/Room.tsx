import RoomData from "../../types/roomDataType";

export default function Room({roomName, description }: RoomData) {
    return (
      <div className="p-4 mb-3 border border-gray-200 rounded-lg transition-all duration-200 hover:border-amber-300 hover:shadow-md cursor-pointer bg-white">
        <h3 className="font-semibold text-lg text-gray-800 mb-1 flex items-center">
          <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
          {roomName}
        </h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    );
  }

