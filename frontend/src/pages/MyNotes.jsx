import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN, TOAST_PREFERENCE } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import Card from '../components/Card';
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api';
import '../styles/home.css';

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    getNotes();
  }, [])

  const getNotes = () => {
    api.get('api/notes/')
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      }).catch((err) => alert(err))
  }

  const deleteNote = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this note?')
    if (confirm) {
      api.delete(`/api/notes/delete/${id}/`).then((res) => {

        if (res.status === 204) {
          toast.success("Note removed successfully. ", TOAST_PREFERENCE);
        } else {
          toast.error("Error occurred while attempting to delete note. ", TOAST_PREFERENCE);
        }
      }).catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please try again later.", TOAST_PREFERENCE);
      }).finally(() => {
        getNotes(); // Call getNotes after the toast is dismissed
      });
    }
  } 

  const updateNote = (id) => {
    toast.success(`Note ID: ${id} (updated)`, TOAST_PREFERENCE);

  }

  return (
    <div>
      <Header />
      <section>
        <div>
          <h2 className='section-name'>My Notes</h2>
          <div className="cards-container">
            {notes.length > 0 ? (
              notes.map((note) => (
                <Card key={note.id} note={note} onDelete={() => deleteNote(note.id)} onUpdate={() => updateNote(note.id)} />
              ))
            ) : (
              <p className='cards-status'>No data found.</p>
            )}
          </div>


        </div>
      </section>
    </div>
  )
}

export default MyNotes
