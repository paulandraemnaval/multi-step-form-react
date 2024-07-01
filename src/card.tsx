import "./card.css";

interface Props {
  image: string;
  header: string;
  subheader: string;
  style?: any;
  onClick: () => void;
  isYearly: boolean;
}

const Card = ({
  image,
  header,
  subheader,
  style,
  onClick,
  isYearly,
}: Props) => {
  return (
    <div className="card-container" style={style} onClick={onClick}>
      <div className="image-container">
        <img src={image} alt="card_iamge" />
      </div>
      <div className="card-text-content">
        <h6>{header}</h6>
        <p>{subheader}</p>
        {isYearly && <span className="year-offer">2 months free</span>}
      </div>
    </div>
  );
};

export default Card;
