import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreateEventForm from "@/components/events/CreateEventForm";
import { useEvents } from "@/context/EventContext";
import { toast } from "react-hot-toast";

const EventEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventById, createEvent } = useEvents();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const fetchedEvent = await getEventById(id);
      setEvent(fetchedEvent);
    };

    fetchEvent();
  }, [id, getEventById]);

  const handleEditEvent = async (data) => {
    try {
      await createEvent({ ...data, id: parseInt(id) }); // Update the event
      toast.success("Event updated successfully!");
      navigate("/events");
    } catch (error) {
      toast.error("Failed to update event");
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Event</h1>
      <h1 className="text-3xl font-bold mb-4">Edit Event: {event.name}</h1>
      <CreateEventForm initialData={event} onSubmit={handleEditEvent} />
    </div>
  );
};

export default EventEdit;
