import { useState, useEffect } from 'react';

import styles from './StartingGameModal.module.css';

import ReactDOM from "react-dom";

import playerX from '../../assets/img/player-x.png';
import robot from '../../assets/img/robot-2.png';

const StartingGameModal = ({ isOpen, onClose }: any) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShow(true);

            const timer = setTimeout(() => {
                handleClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleClose = () => {
        setShow(false); // activa animación de salida

        setTimeout(() => {
            onClose(); // desmonta después de la animación
        }, 1000); // duración del fade-out
    };

    if (!isOpen) return null;

    const modalRoot: any = document.getElementById("modal-root");

    return ReactDOM.createPortal(
        <div className={`${styles.modalOverlay} ${show ? styles.show : styles.hide}`}>
            <div className={styles.modalContent}>
                <div className={styles.modalTextVersus}>
                    <img src={playerX} alt="" className={styles.playerX} />
                    <span className={styles.versusText}>VS</span> 
                    <img src={robot} alt="" className={styles.playerIA} />
                </div>
                <div className={styles.modalContentReady}>
                    <span className={styles.modalTextReady}>¿LISTO?</span>
                    <div className={styles.modalCount}>
                        <span>3</span>
                        <span>2</span>
                        {/* <span>1</span> */}
                    </div>
                    <span className={styles.modalTextGame}>¡VENGA!</span>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default StartingGameModal;