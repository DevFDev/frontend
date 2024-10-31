// commit-config.js

module.exports = {
  types: [
    { value: '🌱', name: '🌱 seed: 브랜치에서의 첫 커밋' },
    { value: '✨', name: '✨ feat: 새로운 기능 추가' },
    { value: '🐛', name: '🐛 fix: 버그 수정' },
    { value: '📝', name: '📝 docs: 문서 추가 및 수정' },
    { value: '💄', name: '💄 style: 코드 포맷팅, 스타일 변경 (UI, CSS 등)' },
    { value: '♻️', name: '♻️ refactor: 코드 리팩토링 (기능 변경 없음)' },
    { value: '🚀', name: '🚀 perf: 성능 개선' },
    { value: '✅', name: '✅ test: 테스트 추가 및 수정' },
    { value: '🔧', name: '🔧 chore: 기타 작업 (빌드, 설정 파일 수정 등)' },
    { value: '🗑️', name: '🗑️ remove: 코드 또는 파일 삭제' },
    { value: '📦', name: '📦 package: 패키지의 수정 및 추가' },
  ],
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  messages: {
    type: '작업의 종류를 선택하세요:',
    subject: '변경 내용을 간단하게 설명하세요 (필수):',
    issueNumber: '이슈 번호를 입력하세요 (숫자만):',
    confirmCommit: '커밋 메시지를 확인하세요.',
  },
  subjectLimit: 100,
  prompter: (cz, commit) => {
    const questions = [
      {
        type: 'list',
        name: 'type',
        message: '1️⃣ 커밋 유형을 선택하세요:',
        choices: module.exports.types.map(({ value, name }) => ({
          value,
          name,
        })),
      },
      {
        type: 'input',
        name: 'subject',
        message: '2️⃣ 커밋 메시지를 입력하세요:',
        validate: input => input.length > 0 && input.length <= 100,
      },
      {
        type: 'input',
        name: 'issueNumber',
        message: '3️⃣ 이슈 번호를 입력하세요 (숫자만):',
        validate: input => /^\d+$/.test(input),
      },
    ]

    cz.prompt(questions).then(answers => {
      const { type, subject, issueNumber } = answers
      const message = `[#${issueNumber}]${type} ${subject} `

      const divider = '='.repeat(50)
      const decoratedMessage = `
${divider}
✅ 커밋 메시지가 다음과 같아요! 커밋할까요?

${message}

${divider}
`

      cz.prompt([
        {
          type: 'confirm',
          name: 'confirmCommit',
          message: decoratedMessage,
          default: false,
        },
      ]).then(confirmAnswer => {
        if (confirmAnswer.confirmCommit) {
          commit(message)
        } else {
          console.log('❌ 커밋이 취소되었습니다.')
        }
      })
    })
  },
}
