import './Menu.css';
import { useNavigate } from "react-router-dom";

function MenuPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className='tic-tac-toe'>
                <h1 className='title-game'>Tic <span>Tac</span> Toe</h1>
                <div className='content-menu'>
                    <div className='btns-menu'>
                        <button onClick={() => navigate("/game", { state: { vsAI: true } })} className='btn-menu btn-menu-primary'>
                            VS IA
                        </button>

                        <button onClick={() => navigate("/game", { state: { vsAI: false } })} className='btn-menu btn-menu-secondary'>
                            VS Jugador
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuPage
