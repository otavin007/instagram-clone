import logo from "../logo.svg";
import {useForm} from "react-hook-form";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {FirebaseAplication} from "../firebase";
import {useState} from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export function Header (props) {
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(0)
    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors
        }
    } = useForm();
    // const [user,  setUser] = useState("Otávio")
    const criarConta = async (data) => {

        let email = data.email_cadastro
        let username = data.username_cadastro
        let senha = data.senha_cadastro

        const auth = getAuth(FirebaseAplication.app);
        createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                alert(`Conta criada com sucesso ${userCredential.user}`)

            })
            .catch((error) => {
                alert(error.message)
            });
    }

    const abrirModalCriarConta = (e) => {
        let modal = document.querySelector('.modalCriarConta')
        modal.style.display = "block";
    }

    const fecharModal = () => {
        let modal = document.querySelector('.modalCriarConta')

        modal.style.display = "none";
    }

    const login = (data) => {
        const auth = getAuth(FirebaseAplication.app);
        signInWithEmailAndPassword(auth, data.email_login, data.senha_login)
            .then((res)=>{
                props.setUser(res.user.email)
                alert("usuario logado")
            }).catch((err)=>{
                alert(`erro ao logar: ${err.message}`)
        })

    }

    const uploadPost = (data) => {
        let progressEl = document.getElementById("progress-upload")

        const storage = getStorage();
        const storageRef = ref(storage, `${file.name}`);

        uploadBytes(storageRef, file).then((snapshot) => {
            alert('Uploaded a blob or file!');
        });
    }

    const abrirModalUpload = () => {
        let modal = document.querySelector('.modalUpload')
        modal.style.display = "block";
    }

    const fecharModalUpload = () => {
        let modal = document.querySelector('.modalUpload')
        modal.style.display = "none";
    }


    return (
        <div className='header'>

            <div className={"modalCriarConta"}>
                <div className={"formCriarConta"}>
                    <div className={"close-modal-criar"} onClick={(e)=>{fecharModal(e)}}>X</div>
                    <h2>Criar conta</h2>
                    <form onSubmit={handleSubmit(criarConta)}>
                        <input  {...register("email_cadastro")} type={"text"} placeholder={"Email"} />
                        <input {...register("username_cadastro")} type={"text"} placeholder={"Username"} />
                        <input {...register("senha_cadastro")} type={"password"} placeholder={"Senha"} />
                        <input type={"submit"} />
                    </form>
                </div>
            </div>

            <div className={"modalUpload"}>
                <div className={"formUpload"}>
                    <div onClick={()=>{fecharModalUpload()}} className={"close-modal-upload"}>X</div>
                    <h2>Fazer Upload</h2>
                    <form onSubmit={handleSubmit(uploadPost)}>
                        <progress value={progress} id={"progress-upload"}/>
                        <input  {...register("titulo_upload")} type={"text"} placeholder={"Email"}/>
                        <input  onChange={(e)=>setFile(e.target.files[0])} type={"file"} placeholder={"Username"}/>
                        <input type={"submit"} />
                    </form>

                </div>
            </div>


            <div className={"center"}>

                <div className='header__logo'>
                    <a href={""} className={"logo"}><img src={logo} width={50} height={50}/> ReactGran</a>
                </div>
                {
                    props.user ?
                        <div className={"header__logadoInfo"}>
                            <span>Olá <b>{props.user}</b> </span>
                            <a href={"#"} onClick={(e)=>{
                                abrirModalUpload()
                            }}>Postar!</a>
                        </div>
                        :
                        <div className={"header__loginForm"}>
                            <form onSubmit={handleSubmit(login)}>
                                <input {...register("email_login")} type={"text"} placeholder={"Email..."}/>
                                <input {...register("senha_login")} type={"password"} placeholder={"senha..."}/>
                                <input type={"submit"} name={"acao"} value={"Logar!"}/>
                            </form>
                            <div className={"btn__criarConta"}>
                                <a onClick={(e) =>{
                                    abrirModalCriarConta(e)
                                }} href={"#"}>Criar Conta!</a>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
