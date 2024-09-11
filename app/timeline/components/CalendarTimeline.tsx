"use client";
import dayjs from 'dayjs';
import { data } from '@/utils/data';

// Helper function to calculate the difference between dates
const getDaysDifference = (start: string, end: string) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  return endDate.diff(startDate, 'day');
};

const CustomGanttTimeline: React.FC = () => {
  const timelineStart = '2023-09-01'; // Define the start of the timeline
  const timelineLength = 14; // Number of days in the timeline
  const currentDate = dayjs().format('YYYY-MM-DD'); // Get the current date in 'YYYY-MM-DD' format

  // Calculate the position of the current date relative to the timeline's start
  const currentDatePosition = getDaysDifference(timelineStart, currentDate) + 1; // +1 to match array index

  return (
    <div className="flex flex-col w-full relative">
      <div className="relative overflow-x-auto w-full pt-6">
        <div className="grid grid-cols-[repeat(14,_minmax(100px,_1fr))] gap-4">
          {/* Date Headers */}
          {Array.from({ length: timelineLength }).map((_, index) => {
            const date = dayjs(timelineStart).add(index, 'day').format('ddd D');
            const isCurrentDate = index === currentDatePosition - 1; // Compare index to currentDatePosition

            return (
              <div
                key={index}
                className={`text-center font-medium ${
                  isCurrentDate ? 'text-blue-600' : 'text-gray-700 dark:text-white'
                }`}
              >
                {/* Current Date Indicator */}
                <div
                  className={`relative ${
                    isCurrentDate ? 'w-8 h-8 bg-blue-600 rounded-full mx-auto flex items-center justify-center' : ''
                  }`}
                >
                  <span className={`${isCurrentDate ? 'text-white' : ''}`}>{date}</span>
                </div>
              </div>
            );
          })}
        </div>
        <hr className='w-full border border-slate-300 dark:border-gray-700 mt-4 overflow-x-auto' />

        {/* Vertical Line for Current Date */}
        {currentDatePosition > 0 && currentDatePosition <= timelineLength && (
          <div
            className="absolute top-0 bottom-0 left-0 w-0.5 bg-blue-600"
            style={{
              left: `${(currentDatePosition - 1) * (100 / timelineLength)}%`,
            }}
          ></div>
        )}

        {/* Task Bars */}
        <div className="grid grid-cols-[repeat(14,_minmax(100px,_1fr))] gap-4 mt-4">
          {data.tasks.map((task) => {
            const daysFromStart = getDaysDifference(timelineStart, task.start) + 1;
            const taskDuration = getDaysDifference(task.start, task.end) + 1;

            return (
              <div
                key={task.id}
                className="flex items-center p-8"
                style={{
                  gridColumnStart: daysFromStart,
                  gridColumnEnd: daysFromStart + taskDuration,
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-full bg-green-500 rounded-full"></div>
                  <div className="bg-white dark:bg-neutral-800 p-4 pr-8 shadow-lg rounded-lg flex space-x-8">
                    {/* Colored line for progress */}
                    <div className="flex-shrink-0 w-1" style={{ backgroundColor: task.color }}></div>
                    {/* Task details */}
                    <div className="w-fit">
                      <p className="text-sm font-medium text-gray-700 dark:text-white">
                        {task.tag}
                      </p>
                      <p className="text-gray-700 dark:text-white font-bold text-base">
                        {task.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomGanttTimeline;
