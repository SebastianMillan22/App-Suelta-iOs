import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("RootErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    try {
      window.localStorage.removeItem("suelta-y-sana:estado-v1");
      window.localStorage.removeItem("suelta-y-sana:device-mode");
      window.localStorage.removeItem("suelta_idioma_configurado");
    } catch (e) {}
    window.location.hash = "";
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          backgroundColor: "#faf8f3",
          color: "#25332e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "system-ui, -apple-system, sans-serif"
        }}>
          <div style={{
            maxWidth: "520px",
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            border: "1px solid #eaf3ef",
            textAlign: "center"
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              margin: "0 auto 16px"
            }}>
              ⚠️
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px", color: "#1f2937" }}>
              Se presentó una interrupción
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.5", marginBottom: "20px" }}>
              La aplicación encontró un problema inesperado. Puedes reiniciar el estado local de prueba para continuar de inmediato.
            </p>
            <div style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "10px",
              padding: "12px",
              textAlign: "left",
              fontSize: "12px",
              fontFamily: "monospace",
              color: "#991b1b",
              maxHeight: "150px",
              overflowY: "auto",
              marginBottom: "20px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all"
            }}>
              {String(this.state.error?.message || this.state.error || "Error desconocido")}
            </div>
            <button
              onClick={this.handleReset}
              style={{
                width: "100%",
                backgroundColor: "#3f6b5b",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                padding: "14px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(63,107,91,0.2)"
              }}
            >
              Reiniciar aplicación y datos
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>
);

