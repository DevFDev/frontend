export const Highlight = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  return <span className={'text-primary-normal'}>{children}</span>
}
