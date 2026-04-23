import type { FormEvent } from 'react'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'

const inquiryEmail = 'shimjunseop001@gmail.com'

function buildMailto(project: string, sender: string, message: string) {
  const subject = encodeURIComponent(`[DQ UI Archive] ${project || 'Inquiry'}`)
  const body = encodeURIComponent(
    [
      `Project: ${project || '-'}`,
      `Email: ${sender || '-'}`,
      '',
      message || '-',
    ].join('\n'),
  )

  return `mailto:${inquiryEmail}?subject=${subject}&body=${body}`
}

export function QnaPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const project = String(formData.get('project') ?? '')
    const sender = String(formData.get('email') ?? '')
    const message = String(formData.get('message') ?? '')

    window.location.href = buildMailto(project, sender, message)
  }

  return (
    <form className="panel card qna-form" onSubmit={handleSubmit}>
      <div className="panel__eyebrow">Inquiry</div>
      <h2>문의 메일 보내기</h2>
      <p>간단한 내용을 적으면 메일 작성창이 열립니다.</p>
      <Input name="project" label="Project" placeholder="예: 강원워케이션" />
      <Input name="email" label="Email" type="email" placeholder="you@example.com" />
      <Input name="message" label="Message" placeholder="문의 내용을 적어주세요." />
      <Button type="submit">메일 보내기</Button>
    </form>
  )
}
