import { useState } from "react";

export default function InitDatabase() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const initializeDatabase = async () => {
    setStatus("loading");
    setMessage("Initializing database...");

    try {
      const response = await fetch("/api/init-db", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Database initialized successfully!");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to initialize database");
      }
    } catch (error) {
      setStatus("error");
      setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-6">Initialize Database</h1>
        
        <p className="text-white/80 mb-6">
          Click the button below to create all necessary database tables for the application.
        </p>

        <button
          onClick={initializeDatabase}
          disabled={status === "loading"}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 mb-4"
        >
          {status === "loading" ? "Initializing..." : "Initialize Database"}
        </button>

        {message && (
          <div className={`p-4 rounded-lg ${
            status === "success" ? "bg-green-500/20 text-green-100" :
            status === "error" ? "bg-red-500/20 text-red-100" :
            "bg-white/20 text-white"
          }`}>
            {message}
          </div>
        )}

        {status === "success" && (
          <div className="mt-4 p-4 rounded-lg bg-white/20 text-white">
            <p className="font-bold mb-2">Next steps:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Go to <a href="/admin/create-first" className="underline">/admin/create-first</a></li>
              <li>Create your admin account</li>
              <li>Login at <a href="/admin/login" className="underline">/admin/login</a></li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
