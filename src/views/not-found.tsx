import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not Found";
  }, []);

  return (
    <div className="bg-gray-background">
      <p className="text-center text-2xl">Not Found!</p>
    </div>
  );
}
