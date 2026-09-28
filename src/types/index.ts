// src/types/index.ts

export interface NavLink {
  href: string;
  label: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  meetingLink?: string;
  description: string;
  category: "sports" | "cultural" | "social" | "educational" | "other";
  status?: "UPCOMING" | "COMPLETED" | "CANCELLED";
  upcoming: boolean;
  featured?: boolean;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Founders" | "Current Team" | "Alumni" | "Executive Committee" | "Office Bearers" | "Program Coordinators" | "Youth Wing";
  bio?: string;
  email?: string;
  phone?: string;
  initials: string;
  badge?: string;
  image?: string;
  linkedin?: string;
  instagram?: string;
  isActive?: boolean;
  displayOrder?: number;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  joinedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  category: "General" | "Urgent" | "Event" | "Meeting" | "Notice";
  important?: boolean;
  badge?: string;
}

export interface WhatWeDoItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  stats?: string;
  highlights: string[];
}

export interface WhyJoinItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
