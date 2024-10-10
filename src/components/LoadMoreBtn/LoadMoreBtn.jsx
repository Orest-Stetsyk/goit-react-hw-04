import css from './LoadMoreBtn.module.css'

export default function LoadMoreBtn({ fetchMore }) {
    return (
        <>
            <button className={css.btn} onClick={fetchMore}>Load more</button>
        </>
    )
}