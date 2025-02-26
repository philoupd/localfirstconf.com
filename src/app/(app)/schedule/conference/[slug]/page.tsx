import {allSessions, allSpeakers} from 'contentlayer/generated'
import {notFound} from 'next/navigation'
import {DesktopDrawer} from '@/components/desktop-drawer'
import {MobileDrawer} from '@/components/mobile-drawer'
import {Metadata} from 'next'

const sessions = allSessions.map((session) => {
  const speaker = allSpeakers.find((speaker) => speaker.slug === session.speaker)!
  return {...session, speaker}
})

export async function generateMetadata({params: {slug}}: {params: {slug: string}}): Promise<Metadata> {
  const session = sessions.find((session) => session.path === `/schedule/conference/${slug}`)
  if (!session || session.placeholder) notFound()

  return {
    title: `${session.title} – Conference Day – Local-First Conf 2024`
  }
}

export default function SessionPage({params: {slug}}: {params: {slug: string}}) {
  const session = sessions.find((session) => session.path === `/schedule/conference/${slug}`)
  if (!session || session.placeholder) notFound()

  return (
    <>
      <DesktopDrawer session={session} />
      <MobileDrawer session={session} />
    </>
  )
}
