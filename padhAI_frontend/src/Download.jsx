import { useLocation } from "react-router-dom";
import './ShortNotes.css';

const DownloadNotes = () => {
  const { state } = useLocation();

  if (!state?.notes) {
    return <p>No notes found</p>;
  }

  const downloadNotes = () => {
    const blob = new Blob([state.notes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "short-notes.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="download-page">
      <h2>Your Short Notes</h2>
      <pre>{state.notes}</pre>

      <button onClick={downloadNotes}>
        Download Notes
      </button>
    </div>
  );
};

export default DownloadNotes;