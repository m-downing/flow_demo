import Image from 'next/image';

export default function MimirPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-900">
          <Image
            src="/icons/ui/mimir.svg"
            alt="Mimir"
            width={50}
            height={50}
            className="opacity-90"
          />
        </div>
        <h1 className="text-2xl font-medium text-gray-600">
          Mimir UI coming soon
        </h1>
      </div>
    </div>
  );
} 