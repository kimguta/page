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

function buildGmailCompose(project: string, sender: string, message: string) {
  const subject = encodeURIComponent(`[DQ UI Archive] ${project || 'Inquiry'}`)
  const body = encodeURIComponent(
    [
      `Project: ${project || '-'}`,
      `Email: ${sender || '-'}`,
      '',
      message || '-',
    ].join('\n'),
  )

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(inquiryEmail)}&su=${subject}&body=${body}`
}

export function QnaPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const project = String(formData.get('project') ?? '')
    const sender = String(formData.get('email') ?? '')
    const message = String(formData.get('message') ?? '')

    const gmailUrl = buildGmailCompose(project, sender, message)
    const mailtoUrl = buildMailto(project, sender, message)

    const popup = window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    if (!popup) {
      window.location.href = mailtoUrl
    }
  }

  return (
    <form className="panel card qna-form" onSubmit={handleSubmit}>
      <div className="panel__eyebrow">Inquiry</div>
      <h2>문의 메일 보내기</h2>
      <p>Gmail 작성창이 우선 열리고, 막히면 기본 메일 앱으로 연결됩니다.</p>
      <Input name="project" label="Project" placeholder="예: 강원워케이션" />
      <Input name="email" label="Email" type="email" placeholder="you@example.com" />
      <Input name="message" label="Message" placeholder="문의 내용을 적어주세요." />
      <Button type="submit">메일 보내기</Button>
    </form>
  )
}
