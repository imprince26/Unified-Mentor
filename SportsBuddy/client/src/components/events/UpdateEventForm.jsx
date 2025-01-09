import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "@/context/EventContext";
import { 
  CalendarIcon, 
  SaveIcon, 
  AlertCircleIcon 
} from "lucide-react";

const eventSchema = z.object({
  name: z
    .string()
    .min(3, "Event name must be at least 3 characters")
    .max(100, "Event name cannot exceed 100 characters"),
  category: z.enum([
    "Football",
    "Basketball",
    "Tennis",
    "Running",
    "Cycling",
    "Swimming",
    "Volleyball",
    "Cricket",
    "Other",
  ]),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
  date: z.string().refine((val) => new Date(val) > new Date(), {
    message: "Event date must be in the future",
  }),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  location: z.object({
    address: z.string().min(3, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().optional(),
  }),
  maxParticipants: z.coerce
    .number()
    .int("Must be a whole number")
    .min(1, "At least 1 participant required")
    .max(100, "Maximum 100 participants allowed"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  registrationFee: z.coerce.number().min(0, "Fee cannot be negative").optional(),
});

const UpdateEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventById, updateEvent } = useEvents();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      }
    };
    fetchEvent();
  }, [id, getEventById, navigate]);

  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: event?.name || "",
      category: event?.category || "Other",
      description: event?.description || "",
      date: event?.date || "",
      time: event?.time || "",
      location: {
        address: event?.location.address || "",
        city: event?.location.city || "",
        state: event?.location.state || "",
      },
      maxParticipants: event?.maxParticipants || 10,
      difficulty: event?.difficulty || "Beginner",
      registrationFee: event?.registrationFee || 0,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await updateEvent(id, data);
      toast.success("Event updated successfully!", {
        icon: '🎉',
        style: {
          background: "#0F2C2C",
          color: "#E0F2F1",
          border: "1px solid #4CAF50",
        },
      });
      navigate("/events");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update event";
      toast.error(errorMessage, {
        icon: <AlertCircleIcon className="text-red-500" />,
        style: {
          background: "#2C3E50",
          color: "#ECF0F1",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient ```jsx
    -bg-gray-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Update Event</h2>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input placeholder={event?.name} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Football", "Basketball", "Tennis", "Running", "Cycling", "Swimming", "Volleyball", "Cricket", "Other"].map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder={event?.description} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder={event?.location.address} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder={event?.location.city} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State (optional)</FormLabel>
                <FormControl>
                  <Input placeholder={event?.location.state} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxParticipants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Participants</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationFee"
            render={({ field }) => <FormItem>
                <FormLabel>Registration Fee (optional)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }
          />

          <Button type="submit" disabled={isLoading} className="mt-4">
            {isLoading ? "Updating..." : "Update Event"}
            <SaveIcon className="ml-2" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateEventForm;