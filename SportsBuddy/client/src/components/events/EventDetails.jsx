import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEvents } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  EditIcon,
  TrashIcon,
  ClockIcon,
  TagIcon,
  TrophyIcon,
  DollarSignIcon,
  UserCheckIcon,
} from "lucide-react";
import { formatDate, formatTime, formatCurrency } from "@/utils/formatters";
import { toast } from "react-hot-toast";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventById, deleteEvent } = useEvents();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const fetchedEvent = await getEventById(id);
        setEvent(fetchedEvent);
      } catch (error) {
        toast.error("Failed to fetch event details");
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, getEventById, navigate]);

  const handleDeleteEvent = async () => {
    if (user?.role !== "admin") {
      toast.error("Only admins can delete events");
      return;
    }

    try {
      await deleteEvent(id);
      toast.success("Event deleted successfully");
      navigate("/events");
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  const handleEditEvent = () => {
    if (user?.role !== "admin") {
      toast.error("Only admins can edit events");
      return;
    }
    navigate(`/events/edit/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  // Difficulty level color mapping
  const difficultyColors = {
    Beginner: "bg-green-500/20 text-green-600 border-green-500",
    Intermediate: "bg-yellow-500/20 text-yellow-600 border-yellow-500",
    Advanced: "bg-red-500/20 text-red-600 border-red-500",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A1A] via-[#0F2C2C] to-[#0A1A1A] text-[#E0F2F1]">
      <Header />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16 relative z-10"
      >
        <div className="max-w-4xl mx-auto bg-[#0F2C2C]/70 rounded-2xl shadow-2xl overflow-hidden">
          {/* Event Header */}
          <div className="bg-[#2E7D32]/20 p-6 border-b border-[#2E7D32]/30">
            <h1 className="text-3xl font-bold text-[#4CAF50] mb-2">
              {event.name}
            </h1>
            <div
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold 
              ${difficultyColors[event.difficulty]}`}
            >
              {event.difficulty} Level
            </div>
          </div>

          {/* Event Details Grid */}
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <CalendarIcon className="text-[#4CAF50]" size={24} />
                <div>
                  <p className="text-[#81C784]">Date</p>
                  <p className="font-semibold">
                    {formatDate(event.date)} at {formatTime(event.time)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPinIcon className="text-[#4CAF50]" size={24} />
                <div>
                  <p className="text-[#81C784]">Location</p>
                  <p className="font-semibold">
                    {event.location.address}, {event.location.city}
                    {event.location.state && `, ${event.location.state}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <UsersIcon className="text-[#4CAF50]" size={24} />
                <div>
                  <p className="text-[#81C784]">Participants</p>
                  <p className="font-semibold">
                    {event.participants.length} / {event.maxParticipants}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <TagIcon className="text-[#4CAF50]" size={24} />
                <div>
                  <p className="text-[#81C784]">Category</p>
                  <p className="font-semibold">{event.category}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <DollarSignIcon className="text-[#4CAF50]" size={24} />
                <div>
                  <p className="text-[#81C784]">Registration Fee</p>
                  <p className="font-semibold">
                    {event.registrationFee > 0
                      ? formatCurrency(event.registrationFee)
                      : "Free"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <TrophyIcon className="text-[#4CAF50]" size={24} />
                <div>
                  <p className="text-[#81C784]">Difficulty</p>
                  <p className="font-semibold">{event.difficulty}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="p-6 bg-[#0F2C2C]/50">
            <h2 className="text-xl font-bold text-[#4CAF50] mb-4">
              Event Description
            </h2>
            <p className="text-[#B2DFDB]">{event.description}</p>
          </div>

          {/* Admin Actions */}
          {user?.role === "admin" && (
            <div className="p-6 flex justify-between border-t border-[#2E7D32]/30">
              <Button
                onClick={handleEditEvent}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                <EditIcon className="mr-2" /> Edit Event
              </Button>
              <Button
                onClick={handleDeleteEvent}
                className="bg ```jsx
                red-500 text-white hover:bg-red-600"
              >
                <TrashIcon className="mr-2" /> Delete Event
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default EventDetails;