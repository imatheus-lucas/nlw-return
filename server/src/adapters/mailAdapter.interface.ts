

export interface IMailAdapterData {
  subject: string
  body: string
}
export interface IMailAdapter {
  send: (data: IMailAdapterData) => Promise<void>
}