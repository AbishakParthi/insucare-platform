import { company } from "@insucare/domain";
import { config } from "../config.js";

export async function notifyEnquiry(values: { name: string; email: string; phone: string; interest: string; message: string }) {
  // Web3Forms is now handled directly by the frontend because their API blocks
  // submissions coming directly from datacenter IP addresses (like Render's).
}
