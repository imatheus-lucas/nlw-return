import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";



const creteFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedbackUseCase = new SubmitFeedbackUseCase({
  create: creteFeedbackSpy
}, {
  send: sendMailSpy
});

describe('SubmitFeedbackUseCase', () => {
  it('should be able to submit a feedback', async () => {




    await expect(submitFeedbackUseCase.execute({
      type: 'bug',
      comment: 'teste',
      screenshot: 'data:image/png;base64,2348901uhujnfs9d8'
    })).resolves.not.toThrow()

    expect(creteFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit feedback without type', async () => {

    await expect(submitFeedbackUseCase.execute({
      type: '',
      comment: 'algum comentario',
      screenshot: 'data:image/png;base64,2348901uhujnfs9d8'
    })).rejects.toThrow()
  })

  it('should not be able to submit feedback without comment', async () => {

    await expect(submitFeedbackUseCase.execute({
      type: 'bug',
      comment: '',
      screenshot: 'data:image/png;base64,2348901uhujnfs9d8'
    })).rejects.toThrow()
  })

  it('should not be able to submit feedback invalid screenshot', async () => {

    await expect(submitFeedbackUseCase.execute({
      type: 'bug',
      comment: '',
      screenshot: 'teste.jpg'
    })).rejects.toThrow()
  })
})


