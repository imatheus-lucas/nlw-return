import { IMailAdapter } from "../adapters/mailAdapter.interface"
import { IFeedbacksRepository } from "../repositories/feedbacksRepository.interface"

interface SubmitFeedbackUseCaseRequest {
  comment: string
  type: string
  screenshot?: string

}

export class SubmitFeedbackUseCase {
  constructor(
    private readonly feedbacksRepository: IFeedbacksRepository,
    private readonly mailAdapter: IMailAdapter
  ) {
  }
  async execute(request: SubmitFeedbackUseCaseRequest): Promise<void> {
    const { type, comment, screenshot } = request

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot')
    }
    if (!comment) {
      throw new Error('Invalid comment')
    }
    if (!type) {
      throw new Error('Type is required')
    }

    await this.mailAdapter.send({
      body: comment,
      subject: type
    })
    await this.feedbacksRepository.create({
      comment,
      type,
      screenshot
    })
  }
}