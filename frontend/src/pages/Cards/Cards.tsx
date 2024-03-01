import { useEffect, useState } from 'react';
import { CardType } from '/@/shared';
import DataService from '/@/service/DataService';
import AccountCard from '/@/components/AccountCard/AccountCard';
import './Cards.scss';

const Cards = () => {
	/* States */
	const [cards, setCards] = useState<CardType[]>();

	/* Effects */
	useEffect(() => {
		DataService.card
			.getCards()
			.then((res) => setCards(res.data.cards))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<h1>Cards</h1>

			<ul className='cards'>
				{cards?.map((card: CardType) => (
					<AccountCard card={card} key={card.id} />
				))}
			</ul>
		</div>
	);
};

export default Cards;
