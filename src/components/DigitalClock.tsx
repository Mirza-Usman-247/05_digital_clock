"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DigitalClock = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [formatTime, setFormatTime] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeString = (time: Date, is24HourFormat: boolean): string => {
    if (is24HourFormat) {
      return time.toLocaleTimeString("en-US", { hour12: false });
    } else {
      return time.toLocaleTimeString("en-US", { hour12: true });
    }
  };

  const formattedTime = useMemo(
    () => formatTimeString(time, formatTime),
    [time, formatTime]
  );
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <Card className="p-8 shadow-lg rounded-2xl">
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">Digital Clock</div>
          <div className="text-sm text-gray-500 mb-4 mt-2">
            Display current time in hours, minutes, and seconds.
          </div>
          <div className="text-5xl font-bold tracking-tight">
            {formattedTime}
          </div>
          <div className="mt-4 flex items-center">
            <Button
              variant={formatTime ? "default" : "outline"}
              onClick={() => setFormatTime(true)}
              className="mr-2 font-bold"
            >
              24-Hour Format
            </Button>
            <Button
              variant={!formatTime ? "default" : "outline"}
              onClick={() => setFormatTime(false)}
              className="mr-2 font-bold"
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DigitalClock;
