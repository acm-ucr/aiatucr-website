"use client";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar.jsx";
import CustomEvent from "./CustomEvents.jsx";
import CustomHeader from "./CustomHeader.jsx";
import Modal from "./Modal.jsx";
import Events from "../events/Events.jsx";
import { motion } from "framer-motion";

const localizer = momentLocalizer(moment);

const CalendarEvent = () => {
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());

  const animation = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  useEffect(() => {
    const startDate = new Date(
      new Date().getTime() - 60 * 60 * 24 * 7 * 10 * 1000
    ).toISOString();
    const endDate = new Date(
      new Date().getTime() + 60 * 60 * 24 * 7 * 10 * 1000
    ).toISOString();

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_EMAIL}/events?key=${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}&singleEvents=true&orderBy=startTime&timeMin=${startDate}&timeMax=${endDate}`
        );

        const offset = new Date().getTimezoneOffset() * 60000;
        const data = await response.json();

        if (data.items) {
          const items = data.items.map((item) => {
            item.allDay = !item.start.dateTime;
            (item.start = item.start.dateTime
              ? new Date(item.start.dateTime)
              : new Date(new Date(item.start.date).getTime() + offset)),
              (item.end = new Date(
                item.end.dateTime || new Date(item.end.date).getTime() + offset
              )),
              (item.hidden = false);

            return item;
          });
          setEvents(items);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <section className="md:w-10/12 w-full flex justify-center items-center flex-col mt-[2vh]">
        <Events events={events} />
        <motion.div
          className="w-full flex justify-center items-center"
          variants={animation}
          transition={{ delay: 0.2 }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex justify-center lg:h-[90vh] h-[60vh] w-full font-righteous relative">
            <Calendar
              date={date}
              className="w-full m-0 p-0 text-md md:text-2xl flex justify-center overflow-hidden"
              allDayAccessor="allDay"
              showAllEvents={true}
              events={events}
              localizer={localizer}
              defaultView="month"
              views={["month"]}
              components={{
                event: CustomEvent,
                toolbar: CustomToolbar,
                header: CustomHeader,
              }}
              onNavigate={(newDate) => {
                setDate(newDate);
              }}
              dayPropGetter={(event) => {
                return {
                  className: `${
                    new Date(event).toLocaleDateString() ===
                    new Date().toLocaleDateString()
                      ? "!bg-opacity-80"
                      : "!bg-transparent"
                  }`,
                  style: {
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                };
              }}
              eventPropGetter={() => {
                return {
                  className:
                    "!p-0 !active:ring-0 !focus:outline-0 !bg-transparent",
                };
              }}
              onSelectEvent={(event) => setEvent(event)}
            />
          </div>
          {event && <Modal event={event} setEvent={setEvent} />}
        </motion.div>
      </section>
    </div>
  );
};

export default CalendarEvent;
