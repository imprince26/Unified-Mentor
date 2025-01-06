/* eslint-disable react/prop-types */
import React from "react";

const EventEditForm = ({ eventData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
      <input
        type="text"
        name="title"
        value={eventData.title}
        onChange={handleChange}
        placeholder="Event Title"
        required
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <textarea
        name="description"
        value={eventData.description}
        onChange={handleChange}
        placeholder="Event Description"
        required
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="date"
        name="date"
        value={ eventData.date}
        onChange={handleChange}
        required
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="location"
        value={eventData.location}
        onChange={handleChange}
        placeholder="Event Location"
        required
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Update Event
      </button>
    </form>
  );
};

export default EventEditForm;