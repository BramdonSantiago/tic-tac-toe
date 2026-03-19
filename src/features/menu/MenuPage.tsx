import './Menu.css';
import { useNavigate } from "react-router-dom";

import robot from '../../assets/img/robot.png';
import multijugador from '../../assets/img/multijugador.png';
import configuracion from '../../assets/img/configuracion.png';
import apagar from '../../assets/img/apagar.png';

function MenuPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className='tic-tac-toe'>
                <h1 className='title-game'>Tic <span>Tac</span> Toe</h1>
                <div className='content-menu'>
                    <div className='btns-menu'>
                        <button onClick={() => navigate("/game", { state: { vsAI: true } })} className='btn-menu btn-menu-primary btn-box-shadow-animate'>
                            <div className='img-content'>
                                <img src={robot} alt="" />
                            </div>
                            <h3 className='title-main-btn'><span className='versus-text'>VS</span> IA</h3>
                            <p className='text-description-btn'>Juega contra la IA y obtén la victoria</p>
                        </button>
                        <button onClick={() => navigate("/game", { state: { vsAI: false } })} className='btn-menu btn-menu-secondary btn-box-shadow-animate'>
                            <div className='img-content'>
                                <img src={multijugador} alt="" />
                            </div>
                            <h3 className='title-main-btn'><span className='versus-text'>VS</span> OPONENTE</h3>
                            <p className='text-description-btn'>Juega en contra de un jugador local</p>
                        </button>
                    </div>
                    <div className='btns-options'>
                        <div className='btn btn-primary'><img src={configuracion} alt="" className='btn-icon' />Configuración</div>
                        <div className='btn btn-secondary'><img src={apagar} alt="" className='btn-icon' />Salir</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuPage
