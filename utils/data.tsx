import CanvasTabView from "@/app/canvas/components/TabView";
import ChatTabView from "@/app/chat/components/TabView";
import PDFTabView from "@/app/pdf-viewer/components/TabView";
import TimelineTabView from "@/app/timeline/components/TabView";
import LogoIcon from "@/public/assets/LogoIcon";
import { CalendarIcon, DocumentCheckIcon, DocumentTextIcon, PresentationChartLineIcon } from "@heroicons/react/24/solid";


export const data = {
  user: {
    username: "JohnDoe",
    avatar: "assets/user.jpg",
    vault: [
      {name: "Demo"},
      {name: "website copy"}
    ]
  },
  items: [
    {
      id: '1',
      label: 'Documents',
      children: [
        { id: '1.1', label: 'Company', children: [{ id: '1.1.1', label: 'Invoice', fileType: 'pdf' }, { id: '1.1.2', label: 'Meeting notes', fileType: 'doc' }] },
        { id: '1.2', label: 'Personal', fileType: 'folder' },
        { id: '1.3', label: 'Group photo', fileType: 'image' },
      ],
    },
    {
      id: '5',
      label: 'Root Folder',
      fileType: 'folder',
      children: [
        { id: '5.1', label: 'Document 1', fileType: 'doc' },
        { id: '5.2', label: 'Image 1', fileType: 'image' }, 
      ],
    },
    { id: '2', label: 'Bookmarked', fileType: 'pinned', children: [{ id: '2.1', label: 'Learning materials', fileType: 'folder' }] },
    { id: '3', label: 'History', fileType: 'folder' },
    { id: '4', label: 'Trash', fileType: 'trash' },
  ],
  features: [
    { id: 1, title: "Create a New Note", content: "", image: DocumentTextIcon   },
    { id: 2, title: "Create a New Canvas", content: CanvasTabView, image: PresentationChartLineIcon  },
    { id: 3, title: "Create a New Timeline", content: TimelineTabView, image: CalendarIcon  },
    // { id: 4, title: "View PDF", content:PDFTabView , image: DocumentCheckIcon  },
    { id: 5, title: "Chat with Research AI", content: ChatTabView, image: LogoIcon  }
  ],
  chatData: {
      id: 1,
      title: "Disastrous Product Launch",
      isTyping: true,
      lastSeen: "Active now",
      conversation: [
          // ... (your conversation data here)
          {
              "id": 1,
              "role": "user",
              "message": "Hey, can you help me analyze this text? The product launch was a disaster. Despite months of preparation, nothing went as planned. Customers were unhappy, and the team is feeling really low. We need to figure out how to recover from this.",
              "messageType": "text",
              "time": "5 hrs ago",
              "isRead": true,
          },
          {
              "id": 2, 
              "role": "chatbot",
              "messageType": "text",
              "message": "Of course! I'll start by analyzing the overall sentiment, identifying themes, and assessing the tone of the text you’ve provided. Let me break it down:",
              "time": "5 mins ago",
              "isRead": true,
          }
      ],
      isActive: true,
      unreadCount: 3
  },
  // Sample events
  events: [
    {
      id: "1",
      name: "Design Phase",
      start: "2023-09-05",
      end: "2023-09-07",
      progress: 75,
      tag: "Design",
      description: "Complete the design of the homepage and dashboard.",
      color: "#4CAF50", // Green color
    },
    {
      id: "2",
      name: "Development Phase",
      start: "2023-09-07",
      end: "2023-09-10",
      progress: 45,
      tag: "Development",
      description: "Implement features and connect backend APIs.",
      color: "#FF9800", // Orange color
    },
    {
      id: "3",
      name: "Testing Phase",
      start: "2023-09-10",
      end: "2023-09-12",
      progress: 30,
      tag: "Testing",
      description: "Test all the features and resolve bugs.",
      color: "#F44336", // Red color
    },
  ]
}

