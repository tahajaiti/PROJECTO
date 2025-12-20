import { memo, useCallback, useState } from "react";
import useConfirmStore from "../../stores/confirmStore";

const ConfirmToast = memo(() => {
    const { isVisible, message, actionType, onConfirm, hideModal, skipAction } = useConfirmStore();
    const [dontAskAgain, setDontAskAgain] = useState(false);

    const handleConfirm = useCallback(() => {
        if (dontAskAgain && actionType) {
            skipAction(actionType);
        }
        onConfirm();
        hideModal();
        setDontAskAgain(false);
    }, [onConfirm, hideModal, dontAskAgain, actionType, skipAction]);

    const handleCancel = useCallback(() => {
        hideModal();
        setDontAskAgain(false);
    }, [hideModal]);

    const handleOutsideClick = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
                handleCancel();
            }
        },
        [handleCancel]
    );

    if (!isVisible) return null;

    return (
        <div
            onClick={handleOutsideClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
                <h2 className="text-white text-lg font-medium mb-2">Are you sure?</h2>
                <p className="text-zinc-400 text-sm mb-4">{message}</p>

                {actionType && (
                    <label className="flex items-center gap-2 mb-6 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={dontAskAgain}
                            onChange={(e) => setDontAskAgain(e.target.checked)}
                            className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-red-600 focus:ring-red-600 focus:ring-offset-zinc-900"
                        />
                        <span className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors">
                            Don't ask again
                        </span>
                    </label>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-sm rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ConfirmToast;