"use client"
import { Chrono } from "react-chrono";
import moment from 'moment';
import "frappe-gantt/dist/frappe-gantt.css";
import { data } from '@/utils/data';

// type structure of any event
interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  tag: string;
  description: string;
  color: string; // color for the progress line
}

// Format the date to display as "Wed 5", "Thu 6", etc.
const formatDate = (date: string) => moment(date).format('ddd D');

// Create the event cards with progress line, tag, and description
const Timeline: React.FC = () => {
  const timelineItems = data.events.map(event => ({
    title: formatDate(event.start),
    cardTitle: event.tag,
    cardDetailedText: event.description,
  }));

  return (
    <div className="p-6">
      {/* React Chrono Timeline */}
      <Chrono
        items={timelineItems}
        mode="VERTICAL_ALTERNATING"
        slideShow={false}
        theme={{
          primary: "#4a90e2",
          secondary: "#D3D3D3",
          cardBgColor: "#fff",
          cardForeColor: "#333",
        }}
        cardWidth={300}
      />
    </div>
  );
};

export default Timeline;
