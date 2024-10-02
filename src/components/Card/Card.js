import './Card.css';

const Card = ({animating, handleMemoClick, card, index}) => (
    <div className="memo-block" onClick={() => (!card.flipped && !animating) && handleMemoClick(card)}>
        <div className={`memo-block-inner ${card.flipped && 'memo-block-flipped'}`}>
            <div className="memo-block-front">
                <img key={index} src={'cards/back.svg'} alt={`Card ${index + 1}`} />
            </div>
            <div className="memo-block-back">
                <img key={index} src={card.image} alt={`Card ${index + 1}`} />
            </div>
        </div>
    </div>
)

export default Card;