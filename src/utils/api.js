/* ============================================================
   WESTERN PARK — SERVICE LAYER (FRONTEND PHASE 1)
   ------------------------------------------------------------
   These are clearly-identified MOCK functions. No data is
   transmitted, stored or emailed in this build.

   PHASE 2: replace the bodies with real API calls, e.g.
     export async function submitVillaEnquiry(lead) {
       const res = await fetch("/api/enquiry", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(lead),
       });
       if (!res.ok) throw new Error("Submission failed");
       return res.json();
     }
   No UI changes are required to connect the backend.
   ============================================================ */

const MOCK_LATENCY = 900;

const mockResolve = (tag) =>
  new Promise((resolve) => {
    // No personal details are sent, logged or persisted in this frontend demo.
    console.info(`[Western Park] MOCK ${tag}: no data transmitted or stored.`);
    setTimeout(() => {
      resolve({ ok: true, id: `WP-DEMO-${Date.now()}` });
    }, MOCK_LATENCY);
  });

/** Mock villa-enquiry submission (Enquiry form, step 3). */
export function submitVillaEnquiry(lead) {
  return mockResolve("villa enquiry", lead);
}

/** Mock brochure lead capture (brochure modal). */
export function submitBrochureLead(lead) {
  return mockResolve("brochure lead", lead);
}
