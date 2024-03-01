import { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import Backdrop from '/@/components/Modals/Backdrop/Backdrop';
import './Modal.scss';

type Props = {
	children: ReactNode;
	handleClose: Function;
	closeOnBackdropClick?: boolean;
	styles?: string;
};

const Modal = ({ children, handleClose, closeOnBackdropClick = true, styles = '' }: Props) => {
	useEffect(() => {
		document.querySelector('body')?.classList.add('overflow-hidden');

		return () => {
			document.querySelector('body')?.classList.remove('overflow-hidden');
		};
	}, []);

	return (
		<Backdrop closeOnBackdropClick={closeOnBackdropClick} cb={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className={`message-modal ${styles}`}
				initial='hidden'
				animate='visible'
				exit='exit'
			>
				{children}
			</motion.div>
		</Backdrop>
	);
};

export default Modal;
