import { RefreshCwIcon, XIcon } from 'lucide-react'

export default function ErrorPageDisplay({ message }: { message?: string }) {
  const handleRetry = () => {
    window.location.reload()
    console.log('Retrying...')
    // Add your retry logic here
  }
  return (
    <div>
      <ErrorMessage title="Failed to load data" message={message} onRetry={handleRetry} />
    </div>
  )
}

type ErrorMessageProps = {
  title?: string
  message?: string
  onRetry?: () => void
  showRetry?: boolean
  className?: string
}
const ErrorMessage = ({
  title = 'Something went wrong',
  message = 'We encountered an error while loading this page. Please try again.',
  onRetry,
  showRetry = true,
  className = '',
}: ErrorMessageProps) => {
  return (
    <div className={`px-4 py-12 text-center ${className}`}>
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex justify-center text-red-500">
          <ErrorIcon />
        </div>
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        <p className="mb-6 text-gray-600">{message}</p>
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-2 rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700"
          >
            <RefreshIcon />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  )
}
const ErrorIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
)

const RefreshIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
)
