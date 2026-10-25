import { describe, expect, it } from "vitest";
import { SERVICES } from "./business";

describe("client-confirmed service menu", () => {
  const confirmed = [
    ["women", null, 60], ["shape-up", 15, 15], ["kids", 25, 30], ["haircut-eyebrows", 35, 30],
    ["color", null, 45], ["shape-beard", 25, 30], ["combo", 40, 30], ["shampoo", null, 60],
    ["combo-eyebrows", 45, 45], ["haircut", 25, 30], ["beard-conditioning", 20, 15], ["beard-dye", 20, 15],
    ["beard", 20, 15], ["buzz", 30, 35], ["curly", 25, 30], ["custom", 30, 45], ["eyebrows", 10, 10],
    ["head-shave", 30, 30], ["scissor", 30, 30], ["seniors", 25, 25],
  ] as const;
  for (const [id, amount, minutes] of confirmed) {
    it(`${id} has the confirmed price`, () => { expect(SERVICES.find((s) => s.id === id)?.amount).toBe(amount); });
    it(`${id} has the confirmed duration`, () => { expect(SERVICES.find((s) => s.id === id)?.minutes).toBe(minutes); });
  }
  it("contains exactly twenty distinct services", () => { expect(SERVICES).toHaveLength(20); expect(new Set(SERVICES.map((s) => s.id)).size).toBe(20); });
});