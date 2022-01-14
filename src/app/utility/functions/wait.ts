import { EDuration } from "@models/enums/duration.enum";

export async function wait(ms: EDuration): Promise<void> {
  return new Promise<void>((resolve): void => {
    setTimeout(() => resolve(), ms);
  });
}
