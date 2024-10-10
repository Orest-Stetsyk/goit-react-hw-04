import css from './ImageCard.module.css'


export default function ImageCard  ({ data: { urls, alt_description}, onClick })  {
    return (
        <>
            <div onClick={() => onClick(urls.regular)}>
                <img className={css.img} src={urls.small} alt={alt_description} />
            </div>
            
        </>
    )
}