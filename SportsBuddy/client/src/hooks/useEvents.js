// import { useState } from "react";
// import { useEvents } from "@/context/EventContext";
// import { toast } from "react-hot-toast";

// export const useEventActions = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { fetchEvents, createEvent, updateEvent, deleteEvent } = useEvents();

//   const handleFetchEvents = async () => {
//     setIsLoading(true);
//     try {
//       await fetchEvents();
//     } catch (error) {
//       toast.error("Failed to fetch events", {
//         style: {
//           background: "#2C3E50",
//           color: "#ECF0F1",
//         },
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreateEvent = async (eventData) => {
//     setIsLoading(true);
//     try {
//       await createEvent(eventData);
//       toast.success("Event created successfully!", {
//         style: {
//           background: "#0F2C2C",
//           color: "#E0F2F1",
//         },
//       });
//     } catch (error) {
//       toast.error("Failed to create event", {
//         style: {
//           background: "#2C3E50",
//           color: "#ECF0F1",
//         },
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUpdateEvent = async (eventId, eventData) => {
//     setIsLoading(true);
//     try {
//       await updateEvent(eventId, eventData);
//       toast.success("Event updated successfully!", {
//         style: {
//           background: "#0F2C2C",
//           color: "#E0F2F1",
//         },
//       });
//     } catch (error) {
//       toast.error("Failed to update event", {
//         style: {
//           background: "#2C3E50",
//           color: "#ECF0F1",
//         },
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteEvent = async (eventId) => {
//     setIsLoading(true);
//     try {
//       await deleteEvent(eventId);
//       toast.success("Event deleted successfully!", {
//         style: {
//           background: "#0F2C2C",
//           color: "#E0F2F1",
//         },
//       });
//     } catch (error) {
//       toast.error("Failed to delete event", {
//         style: {
//           background: "#2C3E50",
//           color: "#ECF0F1",
//         },
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     fetchEvents: handleFetchEvents,
//     createEvent: handleCreateEvent,
//     updateEvent: handleUpdateEvent,
//     deleteEvent: handleDeleteEvent,
//     isLoading,
//   };
// };
