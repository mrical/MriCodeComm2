export default function MenuButton({ open, handleClick }) {
  const styles = {
    container: {
      height: "32px",
      width: "32px",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      padding: "4px",
    },
    line: {
      height: "2px",
      width: "20px",
      background: "white",
      transition: "all 0.5s ease",
    },
    lineTop: {
      transform: open ? "rotate(45deg)" : "none",
      transformOrigin: "top left",
      marginBottom: "5px",
    },
    lineMiddle: {
      opacity: open ? 0 : 1,
      transform: open ? "translateX(-16px)" : "none",
    },
    lineBottom: {
      transform: open ? "translateX(-1px) rotate(-45deg)" : "none",
      transformOrigin: "top left",
      marginTop: "5px",
    },
  };

  return (
    <div
      style={styles.container}
      onClick={handleClick}
      className="flex sm:hidden"
    >
      <div style={{ ...styles.line, ...styles.lineTop }} />
      <div style={{ ...styles.line, ...styles.lineMiddle }} />
      <div style={{ ...styles.line, ...styles.lineBottom }} />
    </div>
  );
}
