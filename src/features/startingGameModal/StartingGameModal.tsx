import { useState, useEffect } from 'react';

import styles from './StartingGameModal.module.css';

import ReactDOM from "react-dom";

import playerX from '../../assets/img/player-x.png';
import robot from '../../assets/img/robot-2.png';
import playerXOrange from '../../assets/img/player-x-naranja.png';
import playerO from '../../assets/img/player-o.png';

const StartingGameModal = ({ isOpen, onClose, mode }: any) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
            document.querySelector("body")!.style.overflow =  "hidden";
            const timer = setTimeout(() => {
                handleClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleClose = () => {
        setShow(false); // activa animación de salida

        setTimeout(() => {
            document.querySelector("body")!.style.overflow =  "visible";
            onClose(); // desmonta después de la animación
        }, 1000); // duración del fade-out
    };

    if (!isOpen) return null;

    const modalRoot: any = document.getElementById("modal-root");

    return ReactDOM.createPortal(
        <div className={`${styles.modalOverlay} ${show ? styles.show : styles.hide}`}>
            <div className={styles.modalContent}>
                {(mode === 'AI') && (
                    <div className={styles.modalTextVersus}>
                        <img src={playerX} alt="" className={styles.playerX} />
                        <span className={styles.versusText}>VS</span> 
                        <img src={robot} alt="" className={styles.playerIA} />
                    </div>

                )}
                {(mode === 'opponent') && (
                    <div className={styles.modalTextVersus}>
                        <img src={playerXOrange} alt="" className={styles.playerX} />
                        <span className={styles.versusText}>VS</span> 
                        <img src={playerO} alt="" className={styles.playerIA} />
                    </div>
                )}
                <div className={styles.modalContentReady}>
                    {(mode === 'AI') && (
                        <span className={styles.modalTextReady}>¿LISTO?</span>
                    )}
                    {(mode === 'opponent') && (
                        <span className={styles.modalTextReady}>¡ALISTEN LOS TURNOS!</span>
                    )}
                    <div className={styles.modalCount}>
                        <span>3</span>
                        <span>2</span>
                        {/* <span>1</span> */}
                    </div>
                    {(mode === 'AI') && (
                        <span className={styles.modalTextGame}>¡VENGA!</span>
                    )}
                    {(mode === 'opponent') && (
                        <span className={styles.modalTextGame}>¡VAMOS!</span>
                    )}
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default StartingGameModal;