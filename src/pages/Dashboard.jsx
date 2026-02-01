export default function Dashboard() {
  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>
      <p style={styles.text}>Você está logado.</p>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f5f9"
  },
  text: {
    fontSize: "18px",
    color: "#334155"
  }
}
