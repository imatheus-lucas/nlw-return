import { prisma } from "../../prisma";
import { FeedbackCreateData, IFeedbacksRepository } from "../feedbacksRepository.interface";

export class FeedbacksRepository implements IFeedbacksRepository {
  async create({ comment, type, screenshot }: FeedbackCreateData): Promise<void> {
    await prisma.feedback.create({
      data: {
        comment,
        type,
        screenshot
      }
    })

  }

}