import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@/context/EventContext";
import { CalendarIcon, SaveIcon } from "lucide-react";

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
  maxParticipants: z.number().min(1).max(100),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  registrationFee: z.number().min(0).optional(),
});

const CreateEventForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createEvent } = useEvents();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      category: "Other",
      description: "",
      date: "",
      time: "",
      location: {
        address: "",
        city: "",
        state: "",
      },
      maxParticipants: 10,
      difficulty: "Beginner",
      registrationFee: 0,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await createEvent(data);
      toast.success("Event created successfully!", {
        style: {
          background: "#0F2C2C",
          color: "#E0F2F1",
        },
      });
      navigate("/events");
    } catch (error) {
      toast.error("Failed to create event", {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1A1A] via-[#0F2C2C] to-[#0A1A1A] p-4">
      <div className="w-full max-w-md bg-[#0F2C2C]/70 rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <CalendarIcon
            className="mx-auto h-12 w-12 text-[#4CAF50] mb-4"
            strokeWidth={1.5}
          />
          <h2 className="text-3xl font-bold text-[#E0F2F1]">Create Event</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Form fields similar to RegisterForm style */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#B0BEC5]">Event Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter event name"
                      className="bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1]"
                    />
                  </FormControl>
                  <FormMessage className="text-[#FF5252]" />
                </FormItem>
              )}
            />

            {/* Add more form fields following similar styling */}
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1D4E4E] border-[#2E7D32]/30 text-[#E0F2F1]">
                      {[
                        "Football",
                        "Basketball",
                        "Tennis",
                        "Running",
                        "Cycling",
                        "Swimming",
                        "Volleyball",
                        "Cricket",
                        "Other",
                      ].map((category) => (
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

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Describe your event"
                      className="w-full bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1] rounded-md p-2"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1]"
                      />
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
                      <Input
                        type="time"
                        {...field}
                        className="bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter address"
                        className="bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1]"
                      />
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
                      <Input
                        {...field}
                        placeholder="Enter city"
                        className="bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1]"
                      />
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
                      <Input
                        {...field}
                        placeholder="Enter state"
                        className="bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Max Participants */}
            <FormField
              control={form.control}
              name="maxParticipants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Participants</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      min={1}
                      max={100}
                      className="bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Difficulty Level */}
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1]">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1D4E4E] border-[#2E7D32]/30 text-[#E0F2F1]">
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

            {/* Registration Fee */}
            <FormField
              control={form.control}
              name="registrationFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Fee (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      min={0}
                      className="bg-[#1D4E4E]/30 border-[#2E7D32]/30 text-[#E0F2F1]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white"
            >
              {isLoading ? "Creating..." : "Create Event"}
              <SaveIcon className="ml-2" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateEventForm;
