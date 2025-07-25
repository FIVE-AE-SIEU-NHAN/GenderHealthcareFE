import VideoChatRoom from '@/components/Chats/VideoChatRoom'
import { useParams } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

export default function VideoChatRoomPage() {
  const { roomId } = useParams<{ roomId: string }>()

  // Handle case where roomId is not in the URL
  if (!roomId) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-gray-900 text-white'>
        <div role='alert' className='flex items-center gap-4 rounded-lg border border-red-500 bg-red-900/50 p-6'>
          <AlertCircle className='h-8 w-8 text-red-400' />
          <div>
            <h3 className='text-xl font-bold text-red-300'>Invalid Room ID</h3>
            <p className='text-red-400'>
              The chat room ID is missing from the URL. This page cannot be loaded directly.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const handleLeaveCall = () => {
    window.close()
  }

  return <VideoChatRoom chat_room_id={roomId} onLeave={handleLeaveCall} />
}
