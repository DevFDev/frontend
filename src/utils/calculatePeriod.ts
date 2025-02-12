import { PortfolioCareer } from '@/types/api/Portfolio.types'

/**
 * 'YYYY.MM' 또는 'YYYY-MM' 형식의 두 날짜 간의 차이를 계산합니다.
 * @param startDate 시작 날짜 (예: '2022.03' 또는 '2022-03')
 * @param endDate 종료 날짜 (예: '2024.02' 또는 '2024-02')
 * @returns {string} 'n년 m개월' 형식의 문자열
 */
export const calculatePeriod = (startDate: string, endDate: string): string => {
  // 날짜 문자열에서 구분자(. 또는 -) 제거
  const cleanStartDate = startDate.replace(/[.-]/g, '')
  const cleanEndDate = endDate.replace(/[.-]/g, '')

  // 년도와 월을 분리
  const startYear = parseInt(cleanStartDate.substring(0, 4))
  const startMonth = parseInt(cleanStartDate.substring(4, 6))
  const endYear = parseInt(cleanEndDate.substring(0, 4))
  const endMonth = parseInt(cleanEndDate.substring(4, 6))

  // 전체 개월 수 계산
  const monthsDiff = (endYear - startYear) * 12 + (endMonth - startMonth)

  // 년과 월로 변환
  const years = Math.floor(monthsDiff / 12)
  const months = monthsDiff % 12

  // 결과 문자열 생성
  if (years === 0) {
    return `${months}개월`
  }
  if (months === 0) {
    return `${years}년`
  }
  return `${years}년 ${months}개월`
}

// 사용 예시:
// calculatePeriod('2022.03', '2024.02') => '1년 11개월'
// calculatePeriod('2022-03', '2024-02') => '1년 11개월'
// calculatePeriod('2023.03', '2024.02') => '11개월'
// calculatePeriod('2022.03', '2024.03') => '2년'

/**
 * 'YYYY.MM' 형식의 날짜들로부터 총 경력 기간을 계산합니다.
 * @param careers 경력 배열
 * @returns {string} 'n년 m개월' 형식의 문자열
 */
export const calculateTotalCareerPeriod = (
  careers: Array<PortfolioCareer>
): string => {
  const currentDate = new Date()
  const currentYearMonth = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}`

  let totalMonths = 0

  careers.forEach(career => {
    const endDate = career.isCurrent ? currentYearMonth : career.endDate
    if (!endDate) return

    const cleanStartDate = career.startDate!.replace(/[.-]/g, '')
    const cleanEndDate = endDate.replace(/[.-]/g, '')

    const startYear = parseInt(cleanStartDate.substring(0, 4))
    const startMonth = parseInt(cleanStartDate.substring(4, 6))
    const endYear = parseInt(cleanEndDate.substring(0, 4))
    const endMonth = parseInt(cleanEndDate.substring(4, 6))

    totalMonths += (endYear - startYear) * 12 + (endMonth - startMonth)
  })

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years === 0) {
    return `${months}개월`
  }
  if (months === 0) {
    return `${years}년`
  }
  return `${years}년 ${months}개월`
}
