import { FastifyInstance } from "fastify";
import dayjs from "dayjs";
import { prisma } from "./lib/prisma";
import { z } from "zod";

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
}
