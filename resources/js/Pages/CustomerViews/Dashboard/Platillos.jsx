import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const PlatilloDetalle = ({ productId }) => {
  const [platillo, setPlatillo] = useState(null);

  useEffect(() => {
    fetch(`/product/${productId}`)
      .then((res) => res.json())
      .then((data) => setPlatillo(data.product));
  }, [productId]);

  if (!platillo) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h4" color="white">
        {platillo.name}
      </Typography>
      <Typography variant="body1" color="gray">
        {platillo.price}
      </Typography>
      <Typography variant="body2" color="yellow">
        {"⭐".repeat(platillo.rating || 0)}
      </Typography>
    </Box>
  );
};

export default PlatilloDetalle;
