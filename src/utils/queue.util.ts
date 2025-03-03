import { Queue } from "bullmq";

let imagesProcessingQueue = new Queue("image-queue");

export async function addToQueue(message: object): Promise<void> {
  const queueResponse = await imagesProcessingQueue.add("", message);
}
