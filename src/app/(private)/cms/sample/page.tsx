"use client";
import { useState } from "react";

export default function Sample() {
  const [dropdown, setDropdown] = useState("");

  return (
    <div>
      <select value={dropdown} onChange={(e) => setDropdown(e.target.value)}>
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
}
