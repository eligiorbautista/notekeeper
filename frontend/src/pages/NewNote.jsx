import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN, TOAST_PREFERENCE } from '../../../frontend/src/constants';
import { ToastContainer, toast } from 'react-toastify';
import Card from '../components/Card';
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../frontend/src/api';
import '../styles/home.css';

const NewNote = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


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

    </div>
  )
}

export default NewNote
