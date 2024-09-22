import CanvasTabView from "@/app/canvas/components/TabView";
import ChatTabView from "@/app/chat/components/TabView";
import PDFTabView from "@/app/pdf-viewer/components/TabView";
import TimelineTabView from "@/app/timeline/components/TabView";
import LogoIcon from "@/public/assets/LogoIcon";
import { CalendarIcon, DocumentCheckIcon, DocumentTextIcon, PresentationChartLineIcon } from "@heroicons/react/24/solid";


export const data = {
  user: {
    username: "johndoe",
    avatar: "/assets/user.jpg",
    email: "jd@example.com",
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
    { id: 4, title: "View PDF", content:PDFTabView , image: DocumentCheckIcon  },
    { id: 5, title: "Chat with Research AI", content: ChatTabView, image: LogoIcon  }
  ],

  chatData: [
    {
      id: 1,
      title: "Disastrous Product Launch",
      isTyping: true,
      lastSeen: "Active now",
      conversation: [
        {
          id: 1,
          role: "user",
          message: "Hey, can you help me analyze this text? The product launch was a disaster. Despite months of preparation, nothing went as planned. Customers were unhappy, and the team is feeling really low. We need to figure out how to recover from this.",
          messageType: "text",
          time: "5 hrs ago",
          isRead: true,
        },
        {
          id: 2,
          role: "chatbot",
          messageType: "text",
          message: "Of course! I'll start by analyzing the overall sentiment, identifying themes, and assessing the tone of the text you’ve provided. Let me break it down:",
          time: "5 mins ago",
          isRead: true,
        },
        {
          id: 3,
          role: "chatbot",
          messageType: "text",
          message: "Sentiment: Negative. Themes: Product failure, customer dissatisfaction, team morale. Suggestions: Immediate feedback collection from customers, internal team debrief to understand pain points, and focus on a recovery plan to regain trust.",
          time: "4 mins ago",
          isRead: true,
        },
        {
          id: 4,
          role: "user",
          message: "What kind of feedback should we collect from customers? I’m not sure where to start.",
          messageType: "text",
          time: "3 mins ago",
          isRead: true,
        },
        {
          id: 5,
          role: "chatbot",
          messageType: "text",
          message: "You should ask open-ended questions to get detailed feedback. For example: 'What aspects of the product did you find most frustrating?' 'What would you like to see improved?' 'Were your expectations met?'",
          time: "2 mins ago",
          isRead: true,
        },
      ],
      isActive: true,
      unreadCount: 3,
    },
    {
      id: 2,
      title: "AI Model Implementation",
      isTyping: false,
      lastSeen: "2 days ago",
      conversation: [
        {
          id: 1,
          role: "user",
          message: "I’m struggling with implementing a language model into my app. Can you guide me through the process?",
          messageType: "text",
          time: "2 days ago",
          isRead: true,
        },
        {
          id: 2,
          role: "chatbot",
          messageType: "text",
          message: "Sure! First, you need to choose a model based on your use case. For example, GPT-3 is a great choice for generating human-like text. Are you familiar with how to access OpenAI’s API?",
          time: "2 days ago",
          isRead: true,
        },
        {
          id: 3,
          role: "user",
          message: "Yes, I have an API key. I’m just not sure how to integrate it.",
          messageType: "text",
          time: "2 days ago",
          isRead: true,
        },
        {
          id: 4,
          role: "chatbot",
          messageType: "text",
          message: "Great! You’ll need to make HTTP requests to OpenAI’s API. Here’s an example using JavaScript: `fetch('https://api.openai.com/v1/completions', { method: 'POST', headers: { 'Authorization': 'Bearer YOUR_API_KEY', 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'text-davinci-003', prompt: 'Your prompt here', max_tokens: 100 }) })`.",
          time: "2 days ago",
          isRead: true,
        },
        {
          id: 5,
          role: "user",
          message: "Thanks! That’s exactly what I needed.",
          messageType: "text",
          time: "2 days ago",
          isRead: true,
        },
      ],
      isActive: false,
      unreadCount: 0,
    },
    {
      id: 3,
      title: "Marketing Strategy",
      isTyping: false,
      lastSeen: "3 days ago",
      conversation: [
        {
          id: 1,
          role: "user",
          message: "We’re thinking about launching a new marketing campaign. Any tips on how to make it more effective?",
          messageType: "text",
          time: "3 days ago",
          isRead: true,
        },
        {
          id: 2,
          role: "chatbot",
          messageType: "text",
          message: "Absolutely! Focus on your target audience first. What are their pain points? Tailor your messaging to speak directly to those needs. Also, leverage multiple channels: email, social media, and targeted ads.",
          time: "3 days ago",
          isRead: true,
        },
        {
          id: 3,
          role: "user",
          message: "Should we also consider influencer marketing?",
          messageType: "text",
          time: "3 days ago",
          isRead: true,
        },
        {
          id: 4,
          role: "chatbot",
          messageType: "text",
          message: "Influencer marketing can be very effective, especially if you can find influencers who align with your brand values. Make sure their audience matches your target demographic for the best results.",
          time: "3 days ago",
          isRead: true,
        },
      ],
      isActive: false,
      unreadCount: 0,
    },
  ],

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

