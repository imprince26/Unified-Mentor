import React from 'react';
import CreateEventForm from '@/components/events/CreateEventForm';
import { motion } from 'framer-motion';

const EventCreate = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#0A1A1A] via-[#0F2C2C] to-[#0A1A1A] py-16 px-4"
    >
      <CreateEventForm />
    </motion.div>
  );
};

export default EventCreate;