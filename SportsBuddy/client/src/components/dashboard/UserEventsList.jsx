import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  TrashIcon,
  EditIcon,
  PlusCircleIcon,
} from "lucide-react";
import { formatDate, formatTime } from "@/utils/formatters";
import { useEvents } from "@/context/EventContext";

const UserEventsList = ({ events, loading }) => {
  const navigate = useNavigate();
  const { deleteEvent } = useEvents();

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
    } catch (error) {
      console.error("Error deleting event", error);
    }finally {
      window.location.reload();
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-[#1D4E4E]/30 rounded-lg">
        <CalendarIcon
          className="mx-auto mb-4 text-[#4CAF50] opacity-50"
          size={64}
        />
        <p className="text-[#81C784] text-xl mb-6">
          You haven't created any events yet
        </p>
        <Button
          onClick={() => navigate("/events/create")}
          className="bg-[#4CAF50] hover:bg-[#388E3C] group"
        >
          <PlusCircleIcon className="mr-2 group-hover:rotate-180 transition-transform" />
          Create First Event
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#4CAF50]">My Events</h2>
        <Button
          onClick={() => navigate("/events/create")}
          className="bg-[#4CAF50] hover:bg-[#388E3C] group"
        >
          <PlusCircleIcon className="mr-2 group-hover:rotate-180 transition-transform" />
          Create New Event
        </Button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-[#1D4E4E]/30 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <a
                href={`/events/${event._id}`}
                className="text-xl hover:underline font-semibold text-[#81C784]"
              >
                {event.name}
              </a>
              <p className="text-sm text-[#B2DFDB]">
                {formatDate(event.date)} at {formatTime(event.time)}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => navigate(`/events/edit/${event._id}`)}
                className="bg-[#4CAF50] hover:bg-[#388E3C]"
              >
                <EditIcon className="mr-1" /> Edit
              </Button>
              <Button
                onClick={() => handleDelete(event._id)}
                className="bg-red-500 hover:bg-red-600"
              >
                <TrashIcon className="mr-1" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default UserEventsList;
