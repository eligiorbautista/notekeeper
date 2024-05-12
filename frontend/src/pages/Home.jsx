import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN, TOAST_PREFERENCE } from '../../../frontend/src/constants';
import { ToastContainer, toast } from 'react-toastify';
import Card from '../components/Card';
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../frontend/src/api';
import '../styles/home.css';

const Home = () => {
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

  const createNote = async (event) => {
    event.preventDefault();
    await api.post('/api/notes/', { title: title, content: content }).then((res) => {
      console.log(res.status)
      if (res.status === 201) {
        toast.success("New note created successfully.", TOAST_PREFERENCE);
      } else {
        toast.error("Error occurred while attempting to create note. ", TOAST_PREFERENCE);
      }
    }).catch((err) => {
      console.error(err);
      toast.error("An error occurred. Please try again later.", TOAST_PREFERENCE);
    }).finally(() => {
      setTitle('');
      setContent('');
      getNotes(); // Call getNotes after the toast is dismissed
    });
  }


  return (
    <div>
      <Header />
      <section>
        <h2 className='section-name'>New Note</h2>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title</label>
          <input type="text" id='title' name='title' required onChange={(event) => setTitle(event.target.value)} value={title} />

          <label htmlFor="content">Content</label>
          <textarea id='content' name='content' rows={5} required onChange={(event) => setContent(event.target.value)} value={content} />


          <input type="submit" value="Submit" />
        </form>
      </section>
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

export default Home
