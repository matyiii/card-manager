import { motion } from 'framer-motion';
import closeImg from '/@/assets/icons/close.svg';
import { ReactNode } from 'react';

import './Backdrop.scss';

type BackdropType = {
	children: ReactNode,
	cb: Function,
	closeOnBackdropClick: boolean
}

const Backdrop = ({ children, cb, closeOnBackdropClick }: BackdropType) => {
	return (
		<motion.div
			className="modal-backdrop"
			onClick={ () => {
				closeOnBackdropClick && cb();
			} }
			initial={ { opacity: 0 } }
			animate={ { opacity: 1 } }
			exit={ { opacity: 0 } }>

			{
				closeOnBackdropClick && <img className='close-icon' src={ closeImg } />
			}
			{children}
		</motion.div>
	);
};

export default Backdrop;