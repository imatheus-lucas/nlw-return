import { Router } from 'express';
import nodemailer from 'nodemailer';
import { MailAdapter } from './adapters/implementations/mailAdapter';
import { FeedbacksRepository } from './repositories/prisma/feedbacks.repositories';
import { SubmitFeedbackUseCase } from './usecases/submitFeedbackUseCase';


const routes = Router()


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "38423048eaa1e1",
    pass: "902bbbc301e40c"
  }
});


routes.post('/feedbacks', async (req, res) => {
  const mailAdapter = new MailAdapter()
  const feedbacksRepository = new FeedbacksRepository();
  const submitFeedbacksUseCase = new SubmitFeedbackUseCase(feedbacksRepository, mailAdapter)
  await submitFeedbacksUseCase.execute(req.body)

  return res.status(201).send()
})

export default routes
