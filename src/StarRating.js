const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  ilneHeight: "1",
  margin: "0",
};

export default function StarRating({ maxRating = 1 }) {
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span>⭐{i + 1}</span>
        ))}
      </div>
      <p style={textStyle}>{maxRating}</p>
    </div>
  );
}
