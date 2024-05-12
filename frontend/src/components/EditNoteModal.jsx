import React, { useState } from 'react';
import { TOAST_PREFERENCE } from '../../../frontend/src/constants';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../frontend/src/api';

const EditNoteModal = ({ note, onClose }) => {
    const [updatedTitle, setUpdatedTitle] = useState(note.title);
    const [updatedContent, setUpdatedContent] = useState(note.content);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedNote = {
                id: note.id,
                title: updatedTitle,
                content: updatedContent,
            };
            const res = await api.put(`/api/notes/update/${note.id}/`, updatedNote);
            if (res.status === 200) {
                toast.success("Note updated successfully.", TOAST_PREFERENCE);
                onClose();
            } else {
                toast.error("Error occurred while updating note.", TOAST_PREFERENCE);
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred. Please try again later.", TOAST_PREFERENCE);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
                        <input
                            id="title"
                            type="text"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700 font-medium mb-1">Content</label>
                        <textarea
                            id="content"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            rows="4"
                            value={updatedContent}
                            onChange={(e) => setUpdatedContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditNoteModal;
