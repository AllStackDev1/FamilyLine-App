/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'
import { GridItem, Skeleton as ChakraSkeleton } from '@chakra-ui/react'

interface ISkeleton {
  len?: number
  mWidth?: any
  height: any
  width: any
}

const Skeleton: FC<ISkeleton> = ({ len, mWidth, height, width }) => {
  return (
    <>
      {Array(len)
        .fill(1)
        .map((_, index) => (
          <GridItem key={index} width={mWidth}>
            <ChakraSkeleton height={height} width={width} />
          </GridItem>
        ))}
    </>
  )
}

export default Skeleton
