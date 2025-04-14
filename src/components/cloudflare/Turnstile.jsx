import { useEffect, useRef } from "react";

const Turnstile = ({ siteKey, onSuccess, onError, onExpire }) => {
  const turnstileRef = useRef(null);

  useEffect(() => {
    if (window.turnstile && turnstileRef.current) {
      window.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        callback: onSuccess,
        "error-callback": onError,
        "expired-callback": onExpire,
      });
    }
  }, [siteKey, onSuccess, onError, onExpire]);

  return <div ref={turnstileRef} className="cf-turnstile"></div>;
};

export default Turnstile;
