export interface AllMessages{
    counter: number,
    messages: Array<Message>,
    pageToken: string
}

export interface Message{
    author: AuthorObj,
    content: string,
    id: number,
    updated: string
}

interface AuthorObj{
    name: string,
    photoUrl: string
}