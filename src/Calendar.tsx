import { useState } from "react";
import "./Calendar.css";
import { useWeeklyAppointments } from "./hooks";

// Nombre: Luis Pizarro Avila
// Email: LPIZARROAVILA@GMAIL.COM

const Calendar = () => {
  const { data, isLoading } = useWeeklyAppointments(new Date());
  const [flag, setFlag] = useState(true);

  if (isLoading) {
    return "Cargando...";
  }
  const auxFunction = () => {
    setFlag(!flag)
  }

  // console.log({ data });
  // console.log(">>>", data);
  return (
    <div className="Calendar__container">
      <div className="Calendar__main">
        <div className="Calendar__container__data">
          <div className="Calendar__container__row Calendar__row__sticky">
            <div className="Calendar__container__items Calendar__row__titles">Bloque</div>
            {data.map((day, index) => (
              <div key={index} className="Calendar__container__items Calendar__row__titles">
                {day.dayLabel}
              </div>
            ))}
          </div>
          {Object.keys(data[0].blocks).map((hora, indexHoras) => (
            <div key={indexHoras} className="Calendar__container__row">
              <div className="Calendar__container__items Calendar__hours">{hora}</div>
              {data.map((day, indexDay) => {
                const info = day.blocks[hora];
                return (
                  <div key={indexDay} className="Calendar__container__items Calendar__item_desc">
                    {info.available ? "" : info.patientName}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <button className="Calendar__previous_week_button Calendar__button" onClick={() => auxFunction()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z"
          ></path>
        </svg>{" "}
        Semana anterior
      </button>
      <button className="Calendar__next_week_button Calendar__button" onClick={() => auxFunction()}>
        Semana siguiente{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Calendar;
