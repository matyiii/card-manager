import { useState } from 'react';

const useModal = () => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const close = () => setModalOpen(false);
	const open = () => setModalOpen(true);

	return { modalOpen, close, open };
};

export default useModal;
