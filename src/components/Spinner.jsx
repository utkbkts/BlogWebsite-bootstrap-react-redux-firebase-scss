import { useState} from "react";
import HashLoader from "react-spinners/HashLoader";



function Spinner() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#36d7b7");

  return (
    <div className="sweet-loading">
      <HashLoader
        color={color}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;