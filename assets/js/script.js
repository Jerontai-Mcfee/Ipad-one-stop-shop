document.addEventListener("DOMContentLoaded", () => {
  console.log("Cricket iPad Setup Hub loaded");

  const allDetails = document.querySelectorAll("details");

  // Collapse all details when another opens
  allDetails.forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        allDetails.forEach((other) => {
          if (other !== detail && other.open) other.open = false;
        });
      }
    });
  });

  // Dropdown auto-next logic for Step 1
  const btSelect = document.getElementById("btStatus");
  if (btSelect) {
    btSelect.addEventListener("change", (event) => {
      const value = event.target.value;

      // Close all details after Step 1
      allDetails.forEach((detail, index) => {
        if (index > 0) detail.open = false;
      });

      switch (value) {
        case "none":
          allDetails[1].open = true; // Step 2
          break;
        case "white":
          alert("Follow the iPad & Ingenico Pairing process from Exceed Article.");
          break;
        case "orange":
          allDetails[2].open = true; // Step 3
          break;
        case "green":
          allDetails[3].open = true; // Step 4
          break;
        default:
          break;
      }

      const openDetail = document.querySelector("details[open]");
      if (openDetail) openDetail.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // --- Next Step Button ---
  document.querySelectorAll(".next-btn").forEach(button => {
    button.addEventListener("click", () => {
      const currentDetail = button.closest("details");
      const nextIndex = parseInt(button.getAttribute("data-next")) + 1;

      currentDetail.open = false;

      if (allDetails[nextIndex]) {
        allDetails[nextIndex].open = true;
        allDetails[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // --- Checkboxes Feedback ---
  for (let i = 1; i <= 5; i++) {
    const resolved = document.getElementById(`resolved${i}`);
    const tier2 = document.getElementById(`tier2_${i}`);
    const feedback = document.getElementById(`feedback${i}`);

    if (resolved && tier2 && feedback) {
      resolved.addEventListener("change", () => {
        if (resolved.checked) {
          feedback.style.display = "block";
          feedback.innerHTML = "✅ Issue resolved. You may proceed to other troubleshooting if needed.";
          tier2.checked = false;
        } else feedback.style.display = "none";
      });

      tier2.addEventListener("change", () => {
        if (tier2.checked) {
          feedback.style.display = "block";
          feedback.innerHTML = "⚠️ Contact <strong>Tier II Support</strong> for assistance.";
          resolved.checked = false;
        } else feedback.style.display = "none";
      });
    }
  }
});
