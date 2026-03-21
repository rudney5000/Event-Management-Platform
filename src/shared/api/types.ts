export type AppError =
    | {
    type: "FETCH_ERROR"
    message: string
}
    | {
    type: "PARSING_ERROR"
    message: string
    details?: unknown
}
    | {
    type: "HTTP_ERROR"
    status: number
    message: string
    data?: unknown
}