'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TEventsFormSchema } from '@/lib/validators/forms'

export default function DateAndTimePicker({
  setValue,
}: {
  setValue: UseFormSetValue<TEventsFormSchema>
}) {
  const today = new Date()
  // const [date, setDate] = useState<Date>(today)
  const [date, setDate] = useState<Date | undefined>(new Date(Date.now()))
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    if (date && time) {
      const [hours, minutes] = time.split(':').map(Number)
      const updatedDate = new Date(date)
      updatedDate.setHours(hours)
      updatedDate.setMinutes(minutes)
      updatedDate.setSeconds(0)
      updatedDate.setMilliseconds(0)

      setValue('date', updatedDate.toISOString()) // ✅ Register final combined Date+Time
    }
  }, [date, time, setValue])
  // Mock time slots data
  const timeSlots = [
    { time: '09:00', available: false },
    { time: '09:30', available: false },
    { time: '10:00', available: true },
    { time: '10:30', available: true },
    { time: '11:00', available: true },
    { time: '11:30', available: true },
    { time: '12:00', available: false },
    { time: '12:30', available: true },
    { time: '13:00', available: true },
    { time: '13:30', available: true },
    { time: '14:00', available: true },
    { time: '14:30', available: false },
    { time: '15:00', available: false },
    { time: '15:30', available: true },
    { time: '16:00', available: true },
    { time: '16:30', available: true },
    { time: '17:00', available: true },
    { time: '17:30', available: true },
  ]

  return (
    <div>
      <div className="rounded-md border">
        <div className="flex max-sm:flex-col">
          <div className="flex items-center justify-center">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
          </div>
          <div className="relative w-full max-sm:h-48 sm:w-40">
            <div className="absolute inset-0 py-4 max-sm:border-t">
              <ScrollArea className="h-full sm:border-s">
                <div className="space-y-3">
                  <div className="flex h-5 shrink-0 items-center px-5">
                    <p className="text-sm font-medium">{format(date ?? today, 'EEEE, d')}</p>
                  </div>
                  <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                    {timeSlots.map(({ time: timeSlot, available }) => (
                      <Button
                        key={timeSlot}
                        variant={time === timeSlot ? 'default' : 'outline'}
                        size="sm"
                        className="w-full"
                        onClick={() => setTime(timeSlot)}
                        disabled={!available}
                      >
                        {timeSlot}
                      </Button>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
