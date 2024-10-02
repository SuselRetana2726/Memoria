import Card from '../Card/Card';
import './Board.css';

const Board = ({animating, handleMemoClick, cards}) => {
    return (
        <div className="board">
            {cards.map( (card, i) => {
                return <Card key={`${i}_${card.image}`} animating={animating} handleMemoClick={handleMemoClick} card={card} index={i} />
            })}
        </div>
    );
}

export default Board;