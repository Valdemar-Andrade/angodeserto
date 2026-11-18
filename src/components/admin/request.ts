export async function adminRequest<T>(path: string, input: object | Blob): Promise<T> {
  const binary = input instanceof Blob;
  const response = await fetch(path, {
    method: "POST",
    credentials: "same-origin",
    mode: "same-origin",
    // Keep Origin on same-origin POSTs from pages served with no-referrer.
    referrerPolicy: "strict-origin",
    headers: {
      "Content-Type": binary ? input.type : "application/json",
      "X-Angodeserto-Admin": "1",
    },
    body: binary ? input : JSON.stringify(input),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(result?.error ?? (response.status === 413
      ? "O ficheiro ultrapassa o tamanho permitido."
      : "Não foi possível concluir a operação. Tente novamente."));
  }
  return result as T;
}
