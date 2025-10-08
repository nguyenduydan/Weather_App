const Alert = ({ message, onClose }) => (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
        <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
            <span className="flex-1">{message}</span>
            <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
            >
                ✕
            </button>
        </div>
    </div>
);

export default Alert;
