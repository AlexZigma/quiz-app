export type ExceptionType = {
  type: string,
  message: string,
  translation_key: string,
  debug_message: string,
  details: string,
  additional_info?: string
}