
export interface FeedbackCreateData {
  comment: string
  type: string
  screenshot?: string
}
export interface IFeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>
}