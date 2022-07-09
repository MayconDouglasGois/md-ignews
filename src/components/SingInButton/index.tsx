import { FaGithub } from "react-icons/fa"
import { FiX } from "react-icons/fi"
import style from "./style.module.scss"
import { useSession, signIn, signOut } from "next-auth/react"


const SingInButton = () => {
    const { data: session} = useSession()


    return session ? (
        <button type="button" className={style.singButton}>
            <FaGithub color="#04D361" className={style.gitHub}/>
           <span>{session.user.name}</span> 
           <FiX color="#737380"
           onClick={()=>signOut()}/>
        </button>
    ) : (
        <button type="button" className={style.singButton}
        onClick={()=>signIn()}>
            <FaGithub color="#eba417" className={style.gitHub}/>
           <span>Sing in with GitHub</span> 
        </button>
    )
}

export {SingInButton}
