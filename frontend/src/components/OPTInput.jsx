import React, { useRef } from "react";

export default function OTPInputs({ length = 6, value, onChange }) {
  const refs = useRef([]);

  function handleChange(e, idx) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 1);
    const newVal = value.split("");
    newVal[idx] = val || "";
    onChange(newVal.join(""));
    if (val && refs.current[idx + 1]) refs.current[idx + 1].focus();
  }

  return (
    <div style={{ display: "flex", gap: 6 }}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(r) => (refs.current[i] = r)}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          maxLength={1}
          inputMode="numeric"
          className="otpBox"
        />
      ))}
    </div>
  );
}
