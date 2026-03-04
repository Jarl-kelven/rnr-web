import { useState } from "react";

const MAX_SIZE_MB = 1;

export default function useUpload() {
  const [error, setError] = useState("");

  const upload = async (files, cb = (data)=> null) => {    
    setError("");    

    if (!files) {
      setError("Invalid File");      
      return null;
    }

    const file = Array.from(files)[0];

    if (file.size > MAX_SIZE_MB * (1024 * 1024)) {
      setError("Failed to submit", "Image size must be 1 MB or less");      
      return null;
    }
    
    cb(URL.createObjectURL(file));
  };

  return { upload, error};
}
