import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";

// Component Imports
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EventCard from "@/components/events/EventCard";

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
import { Skeleton } from "@/components/ui/skeleton";

// Icons
import {
  PlusIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

const EventSkeleton = () => (
  <div className="bg-[#0F2C2C]/50 rounded-lg p-6 space-y-4">
    <Skeleton className="h-6 w-3/4 bg-[#1D4E4E]" />
    <Skeleton className="h-4 w-full bg-[#1D4E4E]" />
    <Skeleton className="h-4 w-1/2 bg-[#1D4E4E]" />
  </div>
);

const Events = () => {
  const navigate = useNavigate();
  const { events, fetchEvents, loading } = useEvents();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL_CATEGORIES");
  const [difficultyFilter, setDifficultyFilter] = useState("ALL_LEVELS");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

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

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search filter
      const matchesSearch = event.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        categoryFilter === "ALL_CATEGORIES" ||
        event.category === categoryFilter;

      // Difficulty filter
      const matchesDifficulty =
        difficultyFilter === "ALL_LEVELS" ||
        event.difficulty === difficultyFilter;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [events, searchTerm, categoryFilter, difficultyFilter]);

  // Pagination Logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Pagination Handlers
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, difficultyFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A1A] via-[#0F2C2C] to-[#0A1A1A] text-[#E0F2F1] relative">
      <Header />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16 relative z-10"
      >
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl mt-4 font-bold text-[#4CAF50] mb-4">
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
          transition={{ duration: 0.4 }}
          className="mb-12 grid md:grid-cols-3 gap-6 items-center"
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

        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: eventsPerPage }).map((_, index) => (
              <EventSkeleton key={index} />
            ))
          ) : currentEvents.length === 0 ? (
            <div className="text-center h-20 w-[100vw] text-[#81C784]">
              <p className="text-2xl font-semibold">No events found.</p>
            </div>
          ) : (
            currentEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-[#4CAF50] hover:bg-[#2E7D32]"
          >
            <ChevronLeftIcon className="mr-2" /> Previous
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-[#4CAF50] hover:bg-[#2E7D32]"
          >
            Next <ChevronRightIcon className="ml-2 " />
          </Button>
        </div>

        {/* Add Event Button */}
        {user && (
          <div className="fixed bottom-4 right-4">
            <Button
              onClick={() => navigate("/events/create")}
              className="bg-[#4CAF50] hover:bg-[#2E7D32]"
            >
              <PlusIcon className="mr-2" /> Add Event
            </Button>
          </div>
        )}
      </motion.div>

      <Footer />
    </div>
  );
};

export default Events;
