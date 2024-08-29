import React from 'react';

const DeleteConfirmationPopup = ({ show, deleteType, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this {deleteType}?</h3>
                <div className="flex justify-end">
                    <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
                        Confirm
                    </button>
                    <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationPopup;
