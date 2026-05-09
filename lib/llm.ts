export async function llmOrMock<T>(mock: T, _prompt: string): Promise<T> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return mock;
  }

  // MVP intentionally stays local-first; real provider calls can be dropped in here.
  return mock;
}
