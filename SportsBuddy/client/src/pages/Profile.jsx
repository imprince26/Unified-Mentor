// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EventCard from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";
import { 
  UserIcon, 
  EventIcon, 
  EditIcon, 
  TrashIcon 
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { getUserEvents, deleteEvent } = useEvents();
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const events = await getUserEvents();
        setUserEvents(events);
      } catch (error) {
        console.error("Error fetching user events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, [getUserEvents]);

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setUserEvents((prev) => prev.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A1A] via-[#0F2C2C] to-[#0A1A1A] text-[#E0F2F1]">
      <Header />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16"
      >
        {/* Profile Header */}
        <div className="flex items-center mb-12">
          <UserIcon className="h-16 w-16 text-[#4CAF50] mr-4" />
          <div>
            <h1 className="text-4xl font-bold text-[#4CAF50]">
              {user.name}
            </h1>
            <p className="text-[#81C784]">@{user.username}</p>
          </div>
        </div>

        {/* User Events Section */}
        <section>
          <h2 className="text-3xl font-bold text-[#4CAF50] mb-8 flex items-center">
            <EventIcon className="mr-3" /> My Events
          </h2>

          {loading ? (
            <p>Loading events...</p>
          ) : userEvents.length === 0 ? (
            <div className="text-center text-[#81C784]">
               <p>No events created yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userEvents.map((event) => (
                <EventCard key={event._id} event={event}>
                  <div className="flex justify-between mt-4">
                    <Button onClick={() => handleDeleteEvent(event._id)} variant="danger">
                      <TrashIcon className="mr-2" /> Delete
                    </Button>
                    <Button variant="primary" onClick={() => {/* Navigate to edit event */}}>
                      <EditIcon className="mr-2" /> Edit
                    </Button>
                  </div>
                </EventCard>
              ))}
            </div>
          )}
        </section>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Profile;