import './styles.css';

export default function MainLoadingSpinner() {
  return (
    <div className="loading-container">
      <div 
        className="text-center"
        style={{ 
          width: '400px',
          height: '300px',
          padding: '48px 64px',
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          boxShadow: 'none',
          borderRadius: '0'
        }}
      >
        <div className="loading-content">
          <div className="spinner-wrapper">
            <div className="w-8 h-8 border-[3px] border-neutral-300 dark:border-neutral-500 border-t-primary-500 dark:border-t-neutral-50 rounded-full rotating-spinner"></div>
          </div>
          <p className="text-neutral-900 dark:text-neutral-50 font-semibold text-lg m-0 font-body">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}