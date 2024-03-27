import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating(props) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  return (
    <>
      <div>
        {[...Array(5)].map((_, index) => {
          return (
            <FaStar
              key={index}
              onClick={() => setRating(index)}
              onMouseMove={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
              className={` ${
                index >= props.number ? "starinactive" : "staractive"
              } `}
              size={props.size}
            />
          );
        })}
      </div>
    </>
  );
}
// export default 
//     </>
//   );
// }
