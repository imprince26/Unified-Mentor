import { useEffect, useState } from "react";
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
  TagIcon,
  TrophyIcon,
  IndianRupee,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { formatDate, formatTime, formatCurrency } from "@/utils/formatters";
import { toast } from "react-hot-toast";
import SportsBuddyLoader from "../layout/Loader";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventById, participateInEvent, leaveEvent } = useEvents();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const fetchedEvent = await getEventById(id);
        if (!fetchedEvent) {
          navigate("/");
          return;
        }
        setEvent(fetchedEvent);
      } catch (error) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, getEventById, navigate, user]);

  const handleParticipate = async () => {
    try {
      await participateInEvent(id);
      toast.success("Successfully joined the event!", {
        style: {
          background: "#0F2C2C",
          color: "#E0F2F1",
        },
        icon: <UserPlus className="text-[#4CAF50]" />,
      });
      const updatedEvent = await getEventById(id);
      setEvent(updatedEvent);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to join event", {
        style: {
          background: "#2C3E50",
          color: "#ECF0F1",
        },
      });
    }
  };

  const handleLeaveEvent = async () => {
    try {
      const confirmLeave = window.confirm("Are you sure you want to leave?");
      if (confirmLeave) {
        await leaveEvent(id);
        toast.success("Left the event successfully", {
          style: {
            background: "#0F2C2C",
            color: "#E0F2F1",
          },
          icon: <UserMinus className="text-red-500" />,
        });
        // Refresh event details
        const updatedEvent = await getEventById(id);
        setEvent(updatedEvent);
      }
      return null;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to leave event", {
        style: {
          background: "#2C3E50",
          color: "#ECF0F1",
        },
      });
    }
  };

  if (loading) return <SportsBuddyLoader />;
  if (!event) return <div>Event not found</div>;

  const isParticipating = event.participants.some(
    (participant) => participant.toString() === user.id
  );

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
          <div className="bg-[#2E7D32]/20 p-6 border-b border-[#2E7D32]/30 flex justify-between items-center">
            <div>
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
                    {event.location.address}, {event.location.city},{" "}
                    {event.location.state}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <UsersIcon className="text-[#4CAF50]" size={24} />
                <div>
                  <p className="text-[#81C784]">Participants</p>
                  <p className="font-semibold">
                    {event.participants.length}/{event.maxParticipants}
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
                <IndianRupee className="text-[#4CAF50]" size={24} />
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

          {/* Participation Button */}
          <div className="flex justify-center p-6">
            {isParticipating ? (
              <Button
                onClick={handleLeaveEvent}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Leave Event
              </Button>
            ) : (
              <Button
                onClick={handleParticipate}
                disabled={event.participants.length >= event.maxParticipants}
                className="bg-[#4CAF50] hover:bg-[#388E3C] text-white"
              >
                {event.participants.length >= event.maxParticipants
                  ? "Event Full"
                  : "Participate"}
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default EventDetails;