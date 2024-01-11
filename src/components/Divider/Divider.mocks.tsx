import { ReactElement, ReactNode } from 'react'

type SplitTextComponentProps = {
  children: ReactNode,
  mockedText1?: string,
  mockedText2?: string,
}

export const SplitTextComponent = ({
  children,
  mockedText1,
  mockedText2,
}: SplitTextComponentProps): ReactElement => {
  const text1 = mockedText1 || 'Text mocked 1'
  const text2 = mockedText2 || 'Text mocked 2'

  return (
    <>
      <span>{text1}</span>
      {children}
      <span>{text2}</span>
    </>
  )
}
