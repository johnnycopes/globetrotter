import { EDuration } from "@models/duration.enum";

export async function wait(ms: EDuration): Promise<void> {
  return new Promise<void>((resolve): void => {
    setTimeout(() => resolve(), ms);
  });
}
