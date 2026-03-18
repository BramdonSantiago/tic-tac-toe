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
                        <button onClick={() => navigate("/game", { state: { vsAI: true } })} className='btn-menu btn-menu-primary btn-box-shadow-animate'>
                            <h3 className='title-main-btn'><span className='versus-text'>VS</span> IA</h3>
                            <p className='text-description-btn'>Juega contra la IA</p>
                        </button>
                        <button onClick={() => navigate("/game", { state: { vsAI: false } })} className='btn-menu btn-menu-secondary btn-box-shadow-animate'>
                            <h3 className='title-main-btn'><span className='versus-text'>VS</span> OPONENTE</h3>
                            <p className='text-description-btn'>Juega contra un jugador local</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuPage
