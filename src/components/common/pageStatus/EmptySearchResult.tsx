import { IcSearchEmpty } from '@/assets/IconList'

import { Text } from '@/components/common/text'

export const EmptySearchResult = (): JSX.Element => {
  return (
    <div className='flex flex-col items-center gap-20'>
      <IcSearchEmpty width={100} height={100} />
      <div className='flex flex-col items-center gap-4'>
        <Text.Title variant='title1' weight='700'>
          검색결과가 없습니다.
        </Text.Title>
        <Text.Body variant='body2' color='gray600'>
          다른 검색어 또는 검색 필터를 삭제하세요.
        </Text.Body>
      </div>
    </div>
  )
}
