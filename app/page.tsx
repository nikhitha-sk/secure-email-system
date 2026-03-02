"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const [showKeys, setShowKeys] = useState(false);
  const [keys, setKeys] = useState<any>(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    setUser(loggedUser);

    if (loggedUser) {
      fetch("/api/login?email=" + loggedUser)
        .then((res) => res.json())
        .then((data) => {
          if (data.publicKey) {
            setKeys(data);
          }
        });
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-16 text-center">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">
        Digital Signature Based Secure Email System
      </h1>

      <p className="text-gray-400 mb-10">
        Secure email communication using RSA Digital Signatures and
        SHA-256 hashing. Ensures authenticity and data integrity.
      </p>

      {user ? (
        <div>
          <p className="text-green-400 mb-4">
            Logged in as: {user}
          </p>

          <button
            onClick={() => setShowKeys(!showKeys)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
          >
            {showKeys ? "Hide My Keys" : "Show My Keys"}
          </button>

          {showKeys && keys && (
            <div className="card mt-6 text-left text-xs break-all">
              <p className="text-blue-400 mb-2">Public Key:</p>
              <p>{keys.publicKey}</p>

              <p className="text-red-400 mt-6 mb-2">
                Private Key:
              </p>
              <p>{keys.privateKey}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-400">
          Please login to access your secure mailbox.
        </div>
      )}
    </div>
  );
}