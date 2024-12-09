import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "@/theme";

const Modal = ({ isOpen, onClose, title, children }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        } else {
            window.removeEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className="rounded-lg shadow-lg p-6 w-full max-w-lg"
                style={{
                    backgroundColor: colors.primary[900],
                    color: colors.grey[300],
                }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-lg px-4 py-2 rounded-lg font-semibold transition"
                        style={{
                            color: colors.redAccent[100],
                        }}
                    >
                        X
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
