"use client";
import dayjs from 'dayjs';
import { data } from '@/utils/data';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import AddEvent from './AddEvent';
import { Fragment, useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import OptionTray from './OptionTray';

const options = [
  { name: "Edit Event", onclick: "" },
  { name: "Delete Event", onclick: "" }
];

const getDaysDifference = (start: string, end: string) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  if (endDate.isBefore(startDate)) {
    console.warn(`End date (${end}) is before start date (${start}). Adjusting to start date.`);
    return 0; // Prevents negative duration
  }

  return endDate.diff(startDate, 'day');
};

const CustomGanttTimeline: React.FC = () => {
  const [events, setEvents] = useState(data.events);
  const timelineStart = '2023-09-01';
  const timelineLength = 31;
  const currentDate = dayjs().format('YYYY-MM-DD');
  const currentDatePosition = getDaysDifference(timelineStart, currentDate) + 1;

  const handleAddEvent = (newEvent: {
    title: string;
    startDate: string | Date;
    endDate?: string | Date;
    description: string;
    tags: string[];
  }) => {
    const formattedStartDate = typeof newEvent.startDate === 'string'
      ? newEvent.startDate
      : dayjs(newEvent.startDate).format('YYYY-MM-DD');
    const formattedEndDate = typeof newEvent.endDate === 'string'
      ? newEvent.endDate || formattedStartDate
      : dayjs(newEvent.endDate).format('YYYY-MM-DD') || formattedStartDate;
  
    setEvents((prevEvents: any) => [
      ...prevEvents,
      {
        id: Date.now().toString(),
        tag: newEvent.tags.join(', '),
        description: newEvent.description,
        start: formattedStartDate,
        end: formattedEndDate,
        color: '#32CD32',
      },
    ]);
  };
  

  const renderEvent = (event: any) => {
    const daysFromStart = Math.max(1, getDaysDifference(timelineStart, event.start) + 1);
    const eventDuration = Math.min(
      timelineLength - daysFromStart + 1,
      getDaysDifference(event.start, event.end) + 1
    );

    if (daysFromStart > timelineLength || eventDuration <= 0) {
      return null; // Skip rendering the event if it doesn't fit within the timeline
    }

    return (
      <div
        key={event.id}
        className="flex items-center p-8"
        style={{
          gridColumnStart: daysFromStart,
          gridColumnEnd: daysFromStart + eventDuration,
        }}
      >
        <div className="flex items-center space-x-4">
          <div className="w-2 h-full bg-green-500 rounded-full"></div>
          <div className="bg-white dark:bg-neutral-800 p-4 pr-8 shadow-lg rounded-lg flex space-x-8">
            <div className="flex-shrink-0 w-1" style={{ backgroundColor: event.color }}></div>
            <div className="w-fit">
              <p className="text-sm font-medium text-gray-700 dark:text-white">{event.tag}</p>
              <p className="text-gray-700 dark:text-white font-bold text-base">{event.description}</p>
            </div>
            <Popover className="relative">
              <PopoverButton className="w-fit">
                <EllipsisVerticalIcon className="text-gray-700 dark:text-white w-4 h-4" />
              </PopoverButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute top-6 left-0 z-50">
                  <OptionTray options={options} />
                </PopoverPanel>
              </Transition>
            </Popover>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen relative">
      <div className="relative overflow-x-auto w-full">
        {/* Subtle Background Grid */}
        <div className="w-full absolute inset-0 grid grid-cols-[repeat(31,_minmax(100px,_1fr))] pointer-events-none z-0">
          {Array.from({ length: timelineLength }).map((_, index) => (
            <div
              key={index}
              className={`h-full ${
                index % 2 === 0
                  ? 'bg-slate-50 dark:bg-neutral-900/10'
                  : 'bg-transparent'
              }`}
            ></div>
          ))}
        </div>

        {/* Date Headers */}
        <div className="relative grid grid-cols-[repeat(32,_minmax(100px,_1fr))] gap-4 w-max border-b border-slate-300 dark:border-gray-700 bg-white dark:bg-neutral-800 py-4 z-10">
          {Array.from({ length: timelineLength }).map((_, index) => {
            const date = dayjs(timelineStart).add(index, 'day').format('ddd D');
            const isCurrentDate = index === currentDatePosition - 1;

            return (
              <div
                key={index}
                className={`text-center font-medium ${
                  isCurrentDate ? 'text-blue-600' : 'text-gray-700 dark:text-white'
                }`}
              >
                <div
                  className={`relative ${
                    isCurrentDate
                      ? 'w-fit h-8 px-1 bg-indigo-500 rounded-full mx-auto flex items-center justify-center'
                      : ''
                  }`}
                >
                  <span className={`${isCurrentDate ? 'text-white' : ''}`}>
                    {date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vertical Line for Current Date */}
        {currentDatePosition > 0 && currentDatePosition <= timelineLength && (
          <div
            className="absolute top-0 min-h-screen h-full w-0.5 bg-indigo-500 z-50"
            style={{
              left: `${(currentDatePosition - 1) * (100 / timelineLength)}%`,
            }}
          ></div>
        )}

        {/* Event Bars */}
        <div className="relative grid grid-cols-[repeat(31,_minmax(100px,_1fr))] gap-4 mt-4 z-10">
          {events.map(renderEvent)}
        </div>
      </div>

      {/* Add Event Button */}
      <Popover>
        <PopoverButton
          className="bg-white dark:bg-zinc-900 shadow-3xl rounded-full p-4 fixed bottom-32 right-8 z-50"
        >
          <PlusIcon className="w-5 h-5 text-gray-700 dark:text-white" />
        </PopoverButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel className="fixed right-0 top-0 overflow-auto w-[30%] lg:w-full h-full min-h-screen z-50 bg-white dark:bg-neutral-800 shadow-3xl p-8">
            <AddEvent onSave={handleAddEvent} />
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  );
};

export default CustomGanttTimeline;
