import { z } from "zod";

// Event Schemas
export const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  date: z.string().min(1, "Date is required"),
  time: z.string().optional().nullable().or(z.literal("")),
  location: z.string().min(2, "Location is required"),
  meetingLink: z.union([z.string().url("Must be a valid URL"), z.literal(""), z.null()]).optional().nullable(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["sports", "cultural", "social", "educational", "other"]).default("other"),
  status: z.enum(["UPCOMING", "COMPLETED", "CANCELLED"]).default("UPCOMING"),
  upcoming: z.boolean().default(true),
  featured: z.boolean().default(false),
  image: z.union([z.string(), z.literal(""), z.null()]).optional().nullable(),
});

export const updateEventSchema = createEventSchema.partial();

export const eventQuerySchema = z.object({
  category: z.string().optional(),
  status: z.string().optional(),
  upcoming: z.string().transform((val) => val === "true").optional(),
  featured: z.string().transform((val) => val === "true").optional(),
});

// Member Schemas
export const createMemberSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().min(7, "Phone number must be at least 7 digits").optional().or(z.literal("")),
  address: z.string().optional(),
});

// Team Member Schemas
export const createTeamMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role is required"),
  department: z.enum([
    "Founders",
    "Current Team",
    "Alumni",
    "Executive Committee",
    "Office Bearers",
    "Program Coordinators",
    "Youth Wing",
  ]),
  bio: z.string().optional().nullable().or(z.literal("")),
  email: z.string().email().optional().nullable().or(z.literal("")),
  phone: z.string().optional().nullable().or(z.literal("")),
  initials: z.string().max(4).optional().nullable().or(z.literal("")),
  badge: z.string().optional().nullable().or(z.literal("")),
  image: z.string().optional().nullable().or(z.literal("")),
  linkedin: z.union([z.string().url("Must be a valid LinkedIn URL"), z.literal(""), z.null()]).optional().nullable(),
  instagram: z.union([z.string().url("Must be a valid Instagram URL"), z.literal(""), z.null()]).optional().nullable(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

export const updateTeamMemberSchema = createTeamMemberSchema.partial();

export const teamQuerySchema = z.object({
  department: z.string().optional(),
  isActive: z.string().transform((val) => val === "true").optional(),
});

// Announcement Schemas
export const createAnnouncementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  date: z.string(),
  summary: z.string().min(5, "Summary must be at least 5 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.enum(["General", "Urgent", "Event", "Meeting", "Notice"]),
  important: z.boolean().default(false),
  badge: z.string().optional(),
});

export const announcementQuerySchema = z.object({
  category: z.string().optional(),
  important: z.string().transform((val) => val === "true").optional(),
});

// Admin Notification Schemas
export const createNotificationSchema = z.object({
  adminId: z.string().min(1, "Admin ID is required"),
  message: z.string().min(3, "Message is required"),
});
