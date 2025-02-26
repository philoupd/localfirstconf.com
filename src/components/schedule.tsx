'use client'

import {cn} from '@/utils/cn'
import {Session, Speaker} from 'contentlayer/generated'
import {addHours, addMinutes, eachHourOfInterval, interval, startOfHour} from 'date-fns'
import {format} from 'date-fns-tz'
import {ScheduleSession} from './schedule-session'
import {CurrentTimeMarker} from './current-time-marker'

export const Schedule: React.FC<{sessions: (Omit<Session, 'speaker'> & {speaker: Speaker})[]}> = ({sessions}) => {
  const firstStart = startOfHour(new Date(sessions[0].start))
  const lastEnd = addMinutes(new Date(sessions[sessions.length - 1].start), sessions[sessions.length - 1].duration)
  const hours = eachHourOfInterval(interval(firstStart, addHours(lastEnd, 1)))

  return (
    <div className="relative">
      <div className="">
        {hours.map((date, index) => (
          <div key={index} className={cn('h-20 border-white text-xs text-white', index === hours.length - 1 ? 'border-t' : 'mb-20 border-y')}>
            {format(date, 'HH:mm', {timeZone: 'America/New_York'})}
          </div>
        ))}
      </div>
      {/* {new Date().getDay() !== firstStart.getDay() && <CurrentTimeMarker firstStart={firstStart} />} */}
      <ul className="">
        {sessions.map((session, index) => (
          <ScheduleSession key={index} session={session} firstStart={firstStart} />
        ))}
      </ul>
    </div>
  )
}
