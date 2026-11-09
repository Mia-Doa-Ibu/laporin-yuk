import { useAlertStore } from "../stores/useAlertStore";

export default function AlertModal({
  isOpen: propIsOpen,
  type: propType,
  title: propTitle,
  message: propMessage,
  buttonText: propButtonText,
  onClose: propOnClose,
  onConfirm: propOnConfirm,
}) {
  const store = useAlertStore();

  const isControlled = propIsOpen !== undefined;
  const isOpen = isControlled ? propIsOpen : store.isOpen;
  const type = (isControlled ? propType : store.type) || "success";
  const title = isControlled ? propTitle : store.title;
  const message = isControlled ? propMessage : store.message;
  const buttonText = (isControlled ? propButtonText : store.buttonText) || "OKE";
  const onConfirm = isControlled ? propOnConfirm : store.onConfirm;
  const onClose = isControlled ? propOnClose : store.closeAlert;

  if (!isOpen) return null;

  const handleAction = () => {
    if (onConfirm) {
      onConfirm();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full p-8 sm:p-10 flex flex-col items-center text-center transform transition-all duration-200 scale-100">
        
        {type === "success" && (
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[3.5px] border-[#00a86b] flex items-center justify-center">
            <svg
              className="w-12 h-12 sm:w-14 sm:h-14 text-[#00a86b]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}

        {type === "error" && (
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[3.5px] border-[#c81e1e] flex items-center justify-center">
            <svg
              className="w-12 h-12 sm:w-14 sm:h-14 text-[#c81e1e]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        )}

        {type === "waiting" && (
          <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
            <svg
              className="w-24 h-24 sm:w-28 sm:h-28 text-[#0082c8]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              
              <path
                d="M 50 14 A 36 36 0 1 1 20 30"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
              />
              
              <polygon points="56,4 70,16 56,28" fill="currentColor" />
              
              <path
                d="M 50 26 L 50 50 L 68 64"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mt-6 mb-3">
          {title}
        </h3>

        
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xs mx-auto mb-8 whitespace-pre-line">
          {message}
        </p>

        
        <button
          type="button"
          onClick={handleAction}
          className="bg-[#0082c8] hover:bg-[#0274b3] text-white font-bold text-sm sm:text-base px-12 py-2.5 rounded-lg shadow-md transition-all active:scale-95 cursor-pointer"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

