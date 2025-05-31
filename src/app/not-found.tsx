import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
} 