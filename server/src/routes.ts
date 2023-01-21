import { FastifyInstance } from "fastify";
import dayjs from "dayjs";
import { prisma } from "./lib/prisma";
import { promise, z } from "zod";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      habitFrequency: z.array(z.number().min(0).max(6)),
    });
    const { title, habitFrequency } = createHabitBody.parse(request.body);
    const today = dayjs().startOf("day").toDate();
    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        habitFrequency: {
          create: habitFrequency.map((day) => {
            return { day_freq: day };
          }),
        },
      },
    });
  });

  app.get("/day", async (request) => {
    const getDayParams = z.object({ date: z.coerce.date() });
    const { date } = getDayParams.parse(request.query);
    const parsedDate = dayjs(date).startOf("day");
    const weekDay = parsedDate.get("day");
    const availableHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        habitFrequency: {
          some: {
            day_freq: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: { habitDay: true },
    });

    const completedHabits = day?.habitDay.map((habit) => {
      return habit.habit_id;
    });

    return {
      availableHabits,
      completedHabits,
    };
  });

  app.patch("/habits/:id/toggle", async (request) => {
    const toggleHabitParams = z.object({ id: z.string().uuid() });
    const { id } = toggleHabitParams.parse(request.params);
    const today = dayjs().startOf("day").toDate();
    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    const habitDay = await prisma.habitDay.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });

    if (habitDay) {
      await prisma.habitDay.delete({
        where: {
          id: habitDay.id,
        },
      });
    } else {
      await prisma.habitDay.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }
  });

  app.get("/summary", async () => {
    const summary = await prisma.$queryRaw`
    SELECT 
      D.id,
      D.date,
      (
        SELECT 
          cast(count(*) as float)
        FROM habit_days HD
        WHERE HD.day_id = D.id
      ) as completed,
      (
        SELECT 
          cast(count(*) as float)
        FROM habit_frequency HF
        JOIN habits H
          ON H.id = HF.habit_id
        WHERE
          HF.day_freq = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
          AND H.created_at <= D.date
      ) as total
    FROM day D
    `;
    return summary;
  });
}
