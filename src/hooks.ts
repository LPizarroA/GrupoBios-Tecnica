import { addDays, format, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";
import { es } from "date-fns/locale";
import { fakerES_MX as faker } from "@faker-js/faker";

type AppointmentBlock = {
  available: boolean;
  patientName?: string;
};

export const useWeeklyAppointments = (
  date: Date
): {
  data: {
    dayLabel: string;
    monthLabel: string;
    blocks: {
      "8:00 - 9:00": AppointmentBlock;
      "9:00 - 10:00": AppointmentBlock;
      "10:00 - 11:00": AppointmentBlock;
      "11:00 - 12:00": AppointmentBlock;
      "12:00 - 13:00": AppointmentBlock;
      "13:00 - 14:00": AppointmentBlock;
      "14:00 - 15:00": AppointmentBlock;
      "15:00 - 16:00": AppointmentBlock;
      "16:00 - 17:00": AppointmentBlock;
      "17:00 - 18:00": AppointmentBlock;
      "18:00 - 19:00": AppointmentBlock;
    };
  }[];
  isLoading: boolean;
} => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(
      () => setIsLoading(false),
      500 + Math.random() * 500
    );
    return () => clearTimeout(timeout);
  }, []);

  let data = [];
  let currentDate = startOfWeek(date, { weekStartsOn: 1 });
  for (let i = 0; i < 7; i++) {
    data.push({
      dayLabel: format(currentDate, "iiii d", { locale: es }),
      monthLabel: format(currentDate, "MMMM yy", { locale: es }),
      blocks: {
        "8:00 - 9:00": generateBlock(),
        "9:00 - 10:00": generateBlock(),
        "10:00 - 11:00": generateBlock(),
        "11:00 - 12:00": generateBlock(),
        "12:00 - 13:00": generateBlock(),
        "13:00 - 14:00": generateBlock(),
        "14:00 - 15:00": generateBlock(),
        "15:00 - 16:00": generateBlock(),
        "16:00 - 17:00": generateBlock(),
        "17:00 - 18:00": generateBlock(),
        "18:00 - 19:00": generateBlock(),
      },
    });
    currentDate = addDays(currentDate, 1);
  }

  return {
    isLoading,
    data,
  };
};

const generateBlock = () =>
  Math.random() > 0.4
    ? {
        available: false,
        patientName: faker.person.firstName() + " " + faker.person.lastName(),
      }
    : { available: true };
