const banned = [
  "cure",
  "guaranteed",
  "100%",
  "before and after",
  "instant results",
  "drug"
];

const safeReplacements: Record<string, string> = {
  cure: "supports daily care",
  guaranteed: "designed for",
  "100%": "individual results vary",
  "before and after": "progress journey",
  "instant results": "gradual confidence",
  drug: "wellness formula"
};

export const complianceSafetyPrompt = `Avoid exaggerated medical claims, guaranteed effects, disease cure claims, dangerous before/after medical claims, misleading urgency, explicit sexual claims, and illegal drug claims. Use wording like supports, designed for, confidence, daily care, consult a professional, individual results vary.`;

export function sanitizeCopy(input: string): string {
  let output = input;
  for (const token of banned) {
    const regex = new RegExp(token, "gi");
    output = output.replace(regex, safeReplacements[token]);
  }
  return output;
}
