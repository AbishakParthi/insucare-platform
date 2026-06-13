import { company } from "@insucare/domain";
import { config } from "../config.js";

export async function notifyEnquiry(values: { name: string; email: string; phone: string; interest: string; message: string }) {
  if (!config.WEB3FORMS_ACCESS_KEY) {
    console.warn("WEB3FORMS_ACCESS_KEY is not configured.");
    return;
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: config.WEB3FORMS_ACCESS_KEY,
        name: values.name,
        email: values.email,
        phone: values.phone,
        interest: values.interest,
        message: values.message,
        subject: `New InsuCARE enquiry: ${values.interest}`,
        from_name: company.displayName
      })
    });

    const result = await response.json();
    if (!response.ok) {
      console.error("Web3Forms error:", result);
    }
  } catch (error) {
    console.error("Failed to send enquiry via Web3Forms:", error);
  }
}
