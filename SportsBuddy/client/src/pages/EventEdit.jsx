import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreateEventForm from "@/components/events/CreateEventForm";
import { useEvents } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const EventEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventById, updateEvent } = useEvents();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const fetchedEvent = await getEventById(id);
        
        // Check if the current user is the event creator or an admin
        if (fetchedEvent.createdBy !== user.id && user.role !== "admin") {
          toast.error("You are not authorized to edit this event");
          navigate("/events");
          return;
        }

        setEvent(fetchedEvent);
      } catch (error) {
        toast.error("Failed to fetch event details");
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, getEventById, navigate, user]);

  const handleEditEvent = async (data) => {
    try {
      await updateEvent(id, data);
      navigate(`/events/${id}`);
    } catch (error) {
      toast.error("Failed to Edit event");
      // Error handling is done in the context
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A1A] via-[#0F2C2C] to-[#0A1A1A]">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-[#4CAF50] mb-8">
          Edit Event: {event.name}
        </h1>
        <CreateEventForm 
          initialData={event} 
          onSubmit={handleEditEvent} 
          isEditing={true}
        />
      </div>
      <Footer />
    </div>
  );
};

export default EventEdit;