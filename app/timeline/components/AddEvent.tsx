"use client";
import { PopoverButton } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AddEventProps {
  onSave: (newEvent: {
    title: string;
    startDate: Date;
    endDate: Date;
    description: string;
    tags: string[];
  }) => void; 
}

const AddEvent: React.FC<AddEventProps> = ({ onSave }) => {
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagInput && !selectedTags.includes(tagInput)) {
      setSelectedTags((prevTags) => [...prevTags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      onSave({
        title,
        startDate,
        endDate,
        description,
        tags: selectedTags,
      });
      // Clear form after submission
      setTitle("");
      setStartDate(undefined);
      setEndDate(undefined);
      setDescription("");
      setSelectedTags([]);
    }
  };

  return (
    <div className="w-full space-y-8">
      <section className="flex items-center justify-between">
        <h3 className="font-bold text-xl text-gray-700 dark:text-white text-left">
          Add New Event
        </h3>
        <PopoverButton>
          <XMarkIcon className="w-5 h-5 text-gray-700 dark:text-white" />
        </PopoverButton>
      </section>
      <form className="w-full space-y-12" onSubmit={handleSubmit}>
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
          <label className="text-left text-gray-500 dark:text-white font-medium text-base">
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date || undefined)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="w-full font-normal border border-slate-300 text-gray-700 dark:text-white bg-transparent rounded-lg p-2 focus:ring focus:ring-gray-300"
            placeholderText="Select start date"
            required
          />
        </section>

        <section className="space-y-2 flex flex-col justify-start">
          <label className="text-left text-gray-500 dark:text-white font-medium text-base">
            End Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date || undefined)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="w-full font-normal border border-slate-300 text-gray-700 dark:text-white bg-transparent rounded-lg p-2 focus:ring focus:ring-gray-300"
            placeholderText="Select end date"
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
              className="px-4 h-12 dark:text-gray-700 dark:bg-white bg-zinc-900 text-white rounded-lg hover:bg-neutral-800 font-medium"
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
