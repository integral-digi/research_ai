"use client"
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const AddEvent = () => {
  const [title, setTitle] = useState<string>("");
  const [eventDate, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  // Function to add a tag
  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagInput && !selectedTags.includes(tagInput)) {
      setSelectedTags((prevTags) => [...prevTags, tagInput]);
      setTagInput("");
    }
  };

  // Function to remove a tag
  const removeTag = (tag: string) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <div className="w-full space-y-8">
        <h3 className="font-bold text-xl text-gray-700 dark:text-white text-left">
            Add New Event
        </h3>
      <form className="w-full space-y-12" onSubmit={addTag}>
        {/* Title Section */}
        <section className="space-y-2 flex flex-col justify-start">
          <label
            className="text-left text-gray-500 dark:text-white font-medium text-base"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="w-full font-normal border border-slate-300 text-gray-700 dark:text-white bg-transparent rounded-lg p-2 focus:ring focus:ring-gray-300"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </section>

        {/* Date Section */}
        <section className="space-y-2 flex flex-col justify-start">
          <label
            className="text-left text-gray-500 dark:text-white font-medium text-base"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="w-full font-normal border border-slate-300 text-gray-700 dark:text-white bg-transparent rounded-lg p-2 focus:ring focus:ring-gray-300"
            id="date"
            type="date"
            value={eventDate}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </section>

        {/* Description Section */}
        <section className="space-y-2 flex flex-col justify-start">
          <label
            className="text-left text-gray-500 dark:text-white font-medium text-base"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full h-20 font-normal border border-slate-300 text-gray-700 dark:text-white bg-transparent rounded-lg p-2 focus:ring focus:ring-gray-300"
            id="description"
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </section>

        {/* Tag Section */}
        <section className="space-y-8">
          <label
            htmlFor="tag"
            className="block text-base font-medium text-gray-700 dark:text-gray-300"
          >
            Tag
          </label>
          <div className="mt-3 flex items-center gap-4">
            <input
              id="tag"
              name="tag"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Enter tag"
              className="flex-1 px-3 h-12 bg-transparent font-medium border border-slate-300 text-gray-700 dark:text-white rounded-lg p-2 focus:ring focus:ring-gray-300"
            />
            <button
              type="submit"
              className="px-4 h-12 dark:text-gray-700  dark:bg-white bg-zinc-900 text-white rounded-lg hover:bg-neutral-800 font-medium"
              onClick={addTag}
            >
              Add Tag
            </button>
          </div>

          {/* Display selected tags */}
          <div className="flex flex-wrap gap-4 mt-3">
            {selectedTags.map((tag) => (
              <div
                key={tag}
                className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-full"
              >
                <span className="font-medium">{tag}</span>
                <XMarkIcon
                  className="w-4 h-4 text-gray-700 dark:text-white ml-2 cursor-pointer"
                  onClick={() => removeTag(tag)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full h-12 font-bold text-base dark:text-gray-700 text-white dark:bg-white bg-zinc-900 rounded-lg"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddEvent;

