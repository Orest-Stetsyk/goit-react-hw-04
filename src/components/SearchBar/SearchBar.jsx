import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css'

export default function SearchBar({ onSearch }) {

    const notify = () => toast(`Write something, please`)
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const form = evt.target;
        const search = form.elements.search.value;

        if (form.elements.search.value.trim() === "") {
            return notify();
        }
        onSearch(search);
        form.reset();
    }

    return (
        <header className={css.head}>
            <form className={css.form} onSubmit={handleSubmit}>
                <input
                className={css.input}
                name='search'
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                />
                <button className={css.btn}  type="submit">Search</button>
            </form>
        </header>
    )
}