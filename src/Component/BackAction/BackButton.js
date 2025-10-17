import { FaArrowLeft } from "react-icons/fa";
import "./BackButton.css";

const BackButton = () => {
  return (
    <div className="back-arrow disabled">
      <FaArrowLeft />
    </div>
  );
};

export default BackButton;
