import "./ListGroup.css";
import { useState } from "react";

interface Props {
  header: string;
  subheader: string;
  price: string;
  id: string;
  onClick: () => void;
  isChecked: boolean;
}

const ListGroup = ({
  header,
  subheader,
  price,
  id,
  onClick,
  isChecked,
}: Props) => {
  const [checked, setChecked] = useState(isChecked);

  const handleClick = () => {
    setChecked(!checked);
    onClick();
  };

  return (
    <div
      className={`checkbox-container ${isChecked ? "checked" : ""}`}
      onClick={handleClick}
    >
      <div className="check-box">
        <input
          className="form-check-input"
          type="checkbox"
          id={id}
          value={header}
          checked={isChecked}
          onClick={handleClick}
        />
      </div>
      <label className="form-check-label" htmlFor="flexCheckDefault">
        <p className="header">{header}</p>
        <p className="subheader">{subheader}</p>
      </label>
      <p className="price">{price}</p>
    </div>
  );
};

export default ListGroup;
