import { useEffect } from "react";

const usePaystackScript = () => {
  useEffect(() => {
    const scriptId = "paystack-script";
    if (document.getElementById(scriptId)) return; // Prevent duplicate script loading

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default usePaystackScript;
