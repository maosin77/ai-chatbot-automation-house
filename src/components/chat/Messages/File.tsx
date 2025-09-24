import Image from 'next/image';
import { PaperclipIcon } from 'lucide-react';

interface FileMessageProps {
  messageId: string;
  part: {
    type: 'file';
    mediaType?: string;
    url?: string;
    filename?: string;
  };
}

export const FileMessage = ({ messageId, part }: FileMessageProps) => {
  return (
    <div key={messageId} className="p-4">
      {part.mediaType?.startsWith('image/') ? (
        <div className="max-w-md">
          {part.url && !part.url.startsWith('blob:') ? (
            <Image
              src={part.url}
              alt={part.filename || 'Uploaded image'}
              width={400}
              height={300}
              className="rounded-lg max-w-full h-auto"
            />
          ) : (
            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image processed</span>
            </div>
          )}
          {part.filename && (
            <p className="text-sm text-gray-500 mt-1">{part.filename}</p>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 p-3 border rounded-lg max-w-md">
          <PaperclipIcon className="w-4 h-4" />
          <span className="text-sm">{part.filename}</span>
        </div>
      )}
    </div>
  );
};
