export interface RouteComponentProps<P> {
  match: match<P>
  staticContext?: unknown
}

export interface match<P> {
  params: P
  isExact?: boolean
  path?: string
  url?: string
}
