import { SingInButton } from "../SingInButton"
import style from "./style.module.scss"


function Header(){
    return (
        <header className={style.conteinerHeader}>
            <div className={style.contextHeader}>
                <img src="/image/ig.news.svg" alt="ig.news" />
                <nav>
                    <a className={style.active}>Home</a>
                    <a>Post</a>
                </nav>
                <SingInButton/>
            </div>
        </header>
    )
}
export{Header}