type Id = number
type TechStack = string
type SuccessResponse = boolean
type StatusCode = string
type Message = string
type URL = string
type Token = string

type Email = string
type Password = string
type Name = string
type Nickname = string
type GitHub = string

interface User {
  id: Id
  email: Email
  name: Name
  nickname: Nickname
  imageUrl: URL
}
