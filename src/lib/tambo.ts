/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Read more about Tambo at https://tambo.co/docs
 */

// import { Graph, graphSchema } from "@/components/tambo/graph";
import { DataCard, dataCardSchema } from "@/components/ui/card-data";
import {
  getCountryPopulations,
  getGlobalPopulationTrend,
} from "@/services/population-stats";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { z } from "zod";
import StudyPlanCard from "@/components/StudyPlanCard";
import DetailedScheduleCard from "@/components/DetailedScheduledCard";
import StudyPreferencesCard from "@/components/StudyPreferencesCard";
import KeyTopicsCard from "@/components/KeyTopicsCard";
import RevisionChecklistCard from "@/components/RevisionChecklistCard";
import OverallProgressCard from "@/components/OverallProgressCard";
import SectionProgressCard from "@/components/SectionProgressCard"; 
import FocusSessionCard from "@/components/FocusSessionCard";
import MotivationGuidanceCard from "@/components/MotivationGuidanceCard";


/**
 * tools
 *
 * This array contains all the Tambo tools that are registered for use within the application.
 * Each tool is defined with its name, description, and expected props. The tools
 * can be controlled by AI to dynamically fetch data based on user interactions.
 */

export const tools: TamboTool[] = [
  {
    name: "countryPopulation",
    description:
      "A tool to get population statistics by country with advanced filtering options",
    tool: getCountryPopulations,
    inputSchema: z.object({
      continent: z.string().optional(),
      sortBy: z.enum(["population", "growthRate"]).optional(),
      limit: z.number().optional(),
      order: z.enum(["asc", "desc"]).optional(),
    }),
    outputSchema: z.array(
      z.object({
        countryCode: z.string(),
        countryName: z.string(),
        continent: z.enum([
          "Asia",
          "Africa",
          "Europe",
          "North America",
          "South America",
          "Oceania",
        ]),
        population: z.number(),
        year: z.number(),
        growthRate: z.number(),
      }),
    ),
  },
  {
    name: "globalPopulation",
    description:
      "A tool to get global population trends with optional year range filtering",
    tool: getGlobalPopulationTrend,
    inputSchema: z.object({
      startYear: z.number().optional(),
      endYear: z.number().optional(),
    }),
    outputSchema: z.array(
      z.object({
        year: z.number(),
        population: z.number(),
        growthRate: z.number(),
      }),
    ),
  },
  // Add more tools here
];

/**
 * components
 *
 * This array contains all the Tambo components that are registered for use within the application.
 * Each component is defined with its name, description, and expected props. The components
 * can be controlled by AI to dynamically render UI elements based on user interactions.
 */
export const components: TamboComponent[] = [
  // {
  //   name: "Graph",
  //   description:
  //     "A component that renders various types of charts (bar, line, pie) using Recharts. Supports customizable data visualization with labels, datasets, and styling options.",
  //   component: Graph,
  //   propsSchema: graphSchema,
  // },
  {
    name: "DataCard",
    description:
      "A component that displays options as clickable cards with links and summaries with the ability to select multiple items.",
    component: DataCard,
    propsSchema: dataCardSchema,
  },
  // Add more components here

  {
    name: "StudyPlanCard",
    description:
      "Immediately render this component when a user mentions exams, exam preparation, finals, study planning, or days left before exams. Render a draft study plan first, then allow refinement when the user provides more details like class, subjects, or priorities. Do not block rendering with follow-up questions.",
    component: StudyPlanCard,
    propsSchema: z.object({
      days: z
        .number()
        .describe("Number of days left before exams"),

      subjects: z
        .array(
          z.object({
            name: z.string().describe("Name of the subject"),
            priority: z
              .enum(["High", "Medium", "Low"])
              .describe("Priority level of the subject"),
          })
        )
        .optional()
        .describe(
          "Subjects the student needs to study. If not provided, generate a neutral draft plan."
        ),
    }),
  },

  {
    name: "DetailedScheduleCard",
    description:
      "Render this component when the user asks for a detailed, full, or remaining-days study schedule, day-by-day breakdown, or wants to see the complete plan instead of a summary.",
    component: DetailedScheduleCard,
    propsSchema: z.object({
      days: z
        .number()
        .describe("Total number of days remaining before exams"),

      schedule: z
        .array(
          z.object({
            day: z.number().describe("Day number in the schedule"),
            tasks: z
              .array(z.string())
              .describe("Subjects or tasks planned for this day"),
          })
        )
        .optional()
        .describe(
          "Day-wise detailed study schedule. If missing, generate a neutral balanced plan."
        ),
    }),
  },

  {
    name: "StudyPreferencesCard",
    description:
      "Render this component when the user expresses preferences or constraints about study intensity, daily workload, available time, energy levels, or flexibility such as light, moderate, or intensive plans.",
    component: StudyPreferencesCard,
    propsSchema: z.object({
      intensity: z
        .enum(["Light", "Moderate", "Intensive"])
        .describe("Overall daily study intensity"),

      dailyHours: z
        .number()
        .optional()
        .describe("Preferred study hours per day"),

      flexibility: z
        .enum(["Flexible", "Strict"])
        .optional()
        .describe("Whether the study plan should be flexible or strict"),
    }),
  },

  {
    name: "KeyTopicsCard",
    description:
      "Render this component when the user asks for important topics, key areas to focus on, high-priority topics, or wants guidance on what matters most for quick revision.",
    component: KeyTopicsCard,
    propsSchema: z.object({
      subject: z
        .string()
        .optional()
        .describe("The subject being revised, if specified"),

      topics: z
        .array(
          z.object({
            name: z.string().describe("Name of the topic"),
            importance: z
              .enum(["High", "Medium"])
              .describe("Relative importance of the topic"),
          })
        )
        .optional()
        .describe(
          "List of key topics to focus on during revision. If missing, generate a neutral set."
        ),
    }),
  },

  {
    name: "RevisionChecklistCard",
    description:
      "Render this component when the user wants to revise topics, start a revision session, track completed and pending topics, or asks for a revision checklist.",
    component: RevisionChecklistCard,
    propsSchema: z.object({
      subject: z
        .string()
        .optional()
        .describe("The subject being revised, if specified"),

      topics: z
        .array(
          z.object({
            name: z.string().describe("Name of the topic"),
            status: z
              .enum(["Done", "Pending"])
              .describe("Revision status of the topic"),
          })
        )
        .optional()
        .describe(
          "Checklist of revision topics with their completion status. If missing, generate a default pending list."
        ),
    }),
  },

  {
    name: "OverallProgressCard",
    description:
      "Render this component when the user asks about overall progress, preparation status, how they are doing, or wants a high-level view of their study progress.",
    component: OverallProgressCard,
    propsSchema: z.object({
      completionPercentage: z
        .number()
        .describe("Overall preparation completion percentage"),

      status: z
        .enum(["On Track", "Needs Attention", "Behind"])
        .optional()
        .describe("Overall preparation status"),

      message: z
        .string()
        .optional()
        .describe("Short encouraging or guiding message about progress"),
    }),
  },

  {
    name: "SectionProgressCard",
    description:
      "Render this component when the user wants a breakdown of their preparation progress by section or area, such as study planning, revision, or practice.",
    component: SectionProgressCard,
    propsSchema: z.object({
      sections: z
        .array(
          z.object({
            name: z.string().describe("Name of the section"),
            completionPercentage: z
              .number()
              .describe("Completion percentage for this section"),
          })
        )
        .optional()
        .describe(
          "Progress breakdown by section. If missing, generate a neutral breakdown."
        ),
    }),
  },

  {
    name: "FocusSessionCard",
    description:
      "Render this component when the user wants to start a focus session, pomodoro timer, or says things like start studying, focus for 25 minutes, or pomodoro.",
    component: FocusSessionCard,
    propsSchema: z.object({
      durationMinutes: z
        .number()
        .optional()
        .describe("Length of the focus session in minutes"),

      sessionNumber: z
        .number()
        .optional()
        .describe("Current focus session count"),
    }),
  },

  {
    name: "MotivationGuidanceCard",
    description:
      "Render this component when the user feels stressed, overwhelmed, needs motivation, reassurance, or asks if they are behind. The goal is to provide calm encouragement, small tips, and a clear next step.",
    component: MotivationGuidanceCard,
    propsSchema: z.object({
      mood: z
        .enum(["Stressed", "Overwhelmed", "Uncertain", "Low"])
        .optional()
        .describe("The user's emotional state"),

      encouragement: z
        .string()
        .optional()
        .describe("A short, reassuring message"),

      tips: z
        .array(z.string())
        .optional()
        .describe("Small, practical tips to reduce stress"),

      nextStep: z
        .string()
        .optional()
        .describe("One simple, actionable next step"),
    }),
  },

];
