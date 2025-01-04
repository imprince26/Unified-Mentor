import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";

// Component Imports
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CreateEventForm from "@/components/events/CreateEventForm";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Icons
import {
  PlusIcon,
  SearchIcon,
  CalendarIcon,
  TrophyIcon,
  FilterIcon,
} from "lucide-react";

// Skeleton for loading state
const EventSkeleton = () => (
  <div className="bg-[#0F2C2C]/50 rounded-lg animate-pulse p-6">
    <div className="h-6 bg-[#1D4E4E] mb-4 w-3/4"></div>
    <div className="h-4 bg-[#1D4E4E] mb-2 w-full"></div>
    <div className="h-4 bg-[#1D4E4E] mb-2 w-1/2"></div>
  </div>
);

const Events = () => {
  const navigate = useNavigate();
  const { events, fetchEvents, loading } = useEvents();
  const { user } = useAuth();

  // State Management
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL_CATEGORIES");
  const [difficultyFilter, setDifficultyFilter] = useState("ALL_LEVELS");

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Categories and difficulty levels
  const categories = [
    "Football",
    "Basketball",
    "Tennis",
    "Running",
    "Cycling",
    "Swimming",
    "Volleyball",
    "Cricket",
    "Other",
  ];

  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

  // Filtered and Memoized Events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "ALL_CATEGORIES" ||
        event.category === categoryFilter;

      const matchesDifficulty =
        difficultyFilter === "ALL_LEVELS" ||
        event.difficulty === difficultyFilter;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [events, searchTerm, categoryFilter, difficultyFilter]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Event Card Component
  const EventCard = ({ event }) => (
    <motion.div
      variants={itemVariants}
      className="bg-[#0F2C2C]/70 rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 transition-transform"
      onClick={() => navigate(`/events/${event._id}`)}
    >
      <h2 className="text-2xl font-bold text-[#4CAF50] mb-2">{event.name}</h2>
      <p className="text-[#B2DFDB] mb-4 line-clamp-2">{event.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="text-[#4CAF50]" size={18} />
          <span className="text-[#81C784]">
            {new Date(event.date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <TrophyIcon className="text-[#4CAF50]" size={18} />
          <span className="text-[#81C784]">{event.difficulty}</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A1A] via-[#0F2C2C] to-[#0A1A1A] text-[#E0F2F1]">
      <Header />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16 relative z-10"
      >
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-[#4CAF50] mb-4">
            Sports Events
          </h1>
          <p className="text-xl text-[#81C784] max-w-2xl mx-auto">
            Discover exciting sports events, connect with athletes, and elevate
            your sporting experience.
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 grid md:grid-cols-3 gap-6"
        >
          {/* Search Input */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4CAF50]" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1]"
            />
          </div>

          {/* Category Filter */}
          <div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1]">
                <SelectValue placeholder="Select Category">
                  {categoryFilter === "ALL_CATEGORIES"
                    ? "All Categories"
                    : categoryFilter}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-[#1D4E4E] border-[#2E7D32]/30 text-[#E0F2F1]">
                <SelectItem value="ALL_CATEGORIES">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <Select
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
              <SelectTrigger className="bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1]">
                <SelectValue placeholder="Select Difficulty">
                  {difficultyFilter === "ALL_LEVELS"
                    ? "All Levels"
                    : difficultyFilter}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-[#1D4E4E] border-[#2E7D32]/30 text-[#E0F2F1]">
                <SelectItem value="ALL_LEVELS">All Levels</SelectItem>
                {difficultyLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Create Event Button */}
        {user && (
          <div className="mb-8 text-center">
            <Button
              onClick={() => setShowCreateEvent(true)}
              className="bg-[#4CAF50] hover:bg-[#388E3C]"
            >
              <PlusIcon className="mr-2" />
              Create Event
            </Button>
          </div>
        )}

        {/* Events List */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            {[...Array(3)].map((_, index) => (
              <EventSkeleton key={index} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center text-lg text-[#B2DFDB]">
                No events found.
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Create Event Form Modal */}
      {showCreateEvent && (
        <CreateEventForm onClose={() => setShowCreateEvent(false)} />
      )}

      <Footer />
    </div>
  );
};

export default Events;
