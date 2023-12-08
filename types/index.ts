export type Dataset = {
  id: string
  data1: string
  data2: string
}

export type Posts = {
  edges: Array<{
    node: {
      body: string
      id: string
    }
  }>
}

export type PostProps = { 
  author: Author
  post: Post
}

export type SidebarProps = {
  name?: string
  username?: string
  id?: string
}

export type Author = {
  id: string
  name: string
  username: string

  emoji: string
}

type Post = {
  body: string
  id: string
  tag: string
  created?: string
}