import React, { createContext, useState, useContext, useCallback } from "react";
import api from "@/utils/api";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/events");
      setEvents(response.data.data);
    } catch (error) {
      console.error("Error fetching events", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = async (eventData) => {
    try {
      setLoading(true);
      const response = await api.post("/events", eventData);
      setEvents((prev) => [...prev, response.data.data]);
      return response.data;
    } catch (error) {
      console.error("Error creating event", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (eventId, eventData) => {
    try {
      setLoading(true);
      const response = await api.put(`/events/${eventId}`, eventData);
      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId ? response.data.data : event
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error updating event", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      setLoading(true);
      await api.delete(`/events/${eventId}`);
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getEventById = async (eventId) => {
    try {
      setLoading(true);
      const response = await api.get(`/events/${eventId}`);
      setSelectedEvent(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching event details", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        selectedEvent,
        loading,
        fetchEvents,
        createEvent,
        updateEvent,
        deleteEvent,
        getEventById,
        setSelectedEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};