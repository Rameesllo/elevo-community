// src/lib/mockData.ts
import type { Event, TeamMember, Announcement, WhatWeDoItem, WhyJoinItem } from "@/types";

export const MOCK_EVENTS: Event[] = [
  {
    id: "e1",
    title: "Elevo Annual Sports Carnival 2025",
    date: "2025-01-18",
    time: "08:00 AM - 06:00 PM",
    location: "Elevo Stadium Ground, Kerala",
    description:
      "Our premier sporting celebration featuring football, cricket, volleyball, badminton, tug-of-war, and track events. Open to all registered community youth across all age categories.",
    category: "sports",
    upcoming: true,
    featured: true,
  },
  {
    id: "e2",
    title: "Youth Leadership & Skill Summit",
    date: "2024-12-08",
    time: "09:30 AM - 04:30 PM",
    location: "Elevo Community Hall",
    description:
      "A power-packed 1-day workshop covering public speaking, local governance, project management, digital literacy, and collaborative problem-solving for aspiring young leaders.",
    category: "educational",
    upcoming: true,
    featured: true,
  },
  {
    id: "e3",
    title: "Green Elevo: Riverbank Tree Plantation Drive",
    date: "2024-11-24",
    time: "07:00 AM - 11:30 AM",
    location: "Elevo Riverbank & Canal Roads",
    description:
      "Join 100+ volunteers as we plant 500 indigenous shade and fruit saplings along the waterfront to prevent erosion and create a greener village ecosystem.",
    category: "social",
    upcoming: true,
    featured: false,
  },
  {
    id: "e4",
    title: "Mega Medical & Health Screening Camp",
    date: "2024-11-03",
    time: "08:30 AM - 02:00 PM",
    location: "Elevo Primary Health Center",
    description:
      "Free medical check-ups, eye screenings, and diabetes consultations conducted in collaboration with district medical doctors for senior citizens and families.",
    category: "social",
    upcoming: true,
    featured: false,
  },
  {
    id: "e5",
    title: "Onam Cultural Fest & Sadya 2024",
    date: "2024-09-14",
    time: "09:00 AM",
    location: "Elevo Community Center",
    description:
      "Grand celebration featuring traditional Onam pookalam competitions, pulikali, vadam vali, folk performances, and a community feast serving over 600 attendees.",
    category: "cultural",
    upcoming: false,
  },
  {
    id: "e6",
    title: "Monsoon Clean Village Initiative",
    date: "2024-07-28",
    time: "07:00 AM",
    location: "Elevo Central Junction",
    description:
      "Preventive sanitation and anti-dengue drive across key public areas and drainage channels, clearing over 2 tons of non-biodegradable waste.",
    category: "social",
    upcoming: false,
  },
  {
    id: "e7",
    title: "Elevo Premier Cricket Cup 2024",
    date: "2024-05-18",
    time: "08:30 AM",
    location: "Elevo Sports Ground",
    description:
      "High-energy inter-ward cricket tournament with 10 participating teams, culminating in an electric finale cheered by over 1,200 spectators.",
    category: "sports",
    upcoming: false,
  },
  {
    id: "e8",
    title: "Career Guidance & Higher Education Seminar",
    date: "2024-04-20",
    time: "10:00 AM",
    location: "Elevo Library Auditorium",
    description:
      "Interactive mentoring session for 10th and 12th grade students with university counselors covering career pathways, entrance exams, and scholarship opportunities.",
    category: "educational",
    upcoming: false,
  },
];

export const MOCK_TEAM: TeamMember[] = [
  {
    id: "t1",
    name: "Arjun Menon",
    role: "President",
    department: "Office Bearers",
    bio: "Community organizer with 8+ years leading youth engagement, sports infrastructure, and public welfare programs across Elevo.",
    initials: "AM",
    badge: "Executive Head",
  },
  {
    id: "t2",
    name: "Deepa Krishnan",
    role: "Vice President",
    department: "Office Bearers",
    bio: "Passionate education advocate spearheading student tutoring wings, skill development cohorts, and women youth outreach programs.",
    initials: "DK",
    badge: "Leadership",
  },
  {
    id: "t3",
    name: "Rahul Nair",
    role: "General Secretary",
    department: "Office Bearers",
    bio: "Coordinates day-to-day operations, official communications, partner tie-ups, and municipal coordination for Elevo initiatives.",
    initials: "RN",
    badge: "Operations",
  },
  {
    id: "t4",
    name: "Priya Suresh",
    role: "Treasurer",
    department: "Office Bearers",
    bio: "Chartered accountant managing community finances with 100% transparency, donor auditing, and responsible project budgeting.",
    initials: "PS",
    badge: "Finance",
  },
  {
    id: "t5",
    name: "Karthik V.",
    role: "Sports Director",
    department: "Program Coordinators",
    bio: "Former state volleyball player heading coaching clinics, multi-sport tourneys, and ground maintenance initiatives.",
    initials: "KV",
    badge: "Athletics",
  },
  {
    id: "t6",
    name: "Meera Thomas",
    role: "Cultural Secretary",
    department: "Program Coordinators",
    bio: "Classical artist orchestrating festival celebrations, drama fests, traditional arts workshops, and community showcases.",
    initials: "MT",
    badge: "Culture",
  },
  {
    id: "t7",
    name: "Harikrishnan P.",
    role: "Tech & Media Coordinator",
    department: "Program Coordinators",
    bio: "Software developer driving the Elevo digital platform, live event coverage, media communications, and tech workshops.",
    initials: "HP",
    badge: "Technology",
  },
  {
    id: "t8",
    name: "Ananya Rajesh",
    role: "Social Welfare Lead",
    department: "Program Coordinators",
    bio: "Social worker supervising community health drives, environmental campaigns, and emergency relief distribution wings.",
    initials: "AR",
    badge: "Welfare",
  },
  {
    id: "t9",
    name: "Firoz Khan",
    role: "Volunteer Operations Head",
    department: "Youth Wing",
    bio: "Mobilizes our 150+ student and working volunteer force for swift event deployment and ground action.",
    initials: "FK",
    badge: "Volunteers",
  },
  {
    id: "t10",
    name: "Sneha Balan",
    role: "Youth Wing Coordinator",
    department: "Youth Wing",
    bio: "Engaging younger members through creative clubs, debate circles, and campus ambassador networks.",
    initials: "SB",
    badge: "Youth",
  },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1",
    title: "Registration Now Open for Elevo Sports Carnival 2025",
    date: "2024-10-20",
    summary:
      "Team captain and player registrations are now live across all 6 sporting events. Entry deadline is January 5th, 2025.",
    content:
      "We are delighted to open registrations for the upcoming Elevo Annual Sports Carnival 2025. Captains can submit team rosters online or at the Elevo Community Center office during evening hours. Fixtures and tournament regulations will be published on January 10th. All participating athletes will receive official jersey kits and digital participation credentials.",
    category: "Event",
    important: true,
    badge: "Action Required",
  },
  {
    id: "a2",
    title: "Annual General Body Meeting Notice — October 2024",
    date: "2024-10-12",
    summary:
      "All registered members are requested to attend the upcoming AGM to review annual accounts and upcoming project plans.",
    content:
      "Notice is hereby given that the Annual General Body Meeting of Elevo Community will be convened at the Community Hall on Sunday, October 27, 2024, at 4:30 PM. The agenda includes presentation of the annual activity report, audited financial statements for FY 2023-24, and election of ward representatives.",
    category: "Meeting",
    important: true,
    badge: "Official",
  },
  {
    id: "a3",
    title: "Elevo Student Merit Scholarships 2024 Announced",
    date: "2024-09-28",
    summary:
      "Cash scholarships and certificates for top-scoring 10th & 12th grade students from Elevo will be distributed next month.",
    content:
      "In our continued dedication to academic excellence, Elevo Community is proud to announce the 2024 Student Merit Awards. Deserving students who secured top grades in SSLC and Plus-Two examinations are invited to submit their mark lists and certificates before November 10th. The award ceremony will take place during the Youth Summit.",
    category: "Notice",
    important: false,
    badge: "Scholarship",
  },
  {
    id: "a4",
    title: "Riverbank Tree Plantation Drive Volunteer Call",
    date: "2024-09-15",
    summary:
      "Volunteer slots are now available for our upcoming environmental protection drive along the Elevo canal basin.",
    content:
      "We need 60 energetic volunteers for digging, sapling distribution, and watering systems setup on Sunday, November 24th. T-shirts, gardening kits, and refreshments will be provided to all volunteers. Sign up through the coordinator desk or contact our Social Welfare wing.",
    category: "General",
    important: false,
    badge: "Eco Action",
  },
  {
    id: "a5",
    title: "Emergency Blood Donor Registry Update",
    date: "2024-08-30",
    summary:
      "We are refreshing our 24/7 community blood donor directory to provide rapid support to local emergency wards.",
    content:
      "Over the past year, the Elevo Blood Donor Network assisted over 140 emergency requests at district hospitals. We are updating our emergency registry with blood groups and contact details. If you are eligible to donate, please register with our welfare coordinators.",
    category: "Urgent",
    important: true,
    badge: "Critical",
  },
];

export const WHAT_WE_DO: WhatWeDoItem[] = [
  {
    id: "w1",
    title: "Youth Leadership & Mentorship",
    description:
      "Empowering young minds through structured workshops, public speaking forums, and hands-on governance to create future changemakers.",
    iconName: "Users",
    stats: "300+ Youth Mentored",
    highlights: ["Public speaking seminars", "Civic governance workshops", "Youth representation"],
  },
  {
    id: "w2",
    title: "Competitive Sports & Athletics",
    description:
      "Encouraging health, teamwork, and athletic talent through seasonal football leagues, cricket cups, badminton camps, and training.",
    iconName: "Trophy",
    stats: "12+ Annual Tournaments",
    highlights: ["Inter-ward cricket leagues", "Open football championships", "Fitness & training clinics"],
  },
  {
    id: "w3",
    title: "Social Service & Community Relief",
    description:
      "Leading emergency relief programs, regular village sanitation drives, blood donor networks, and senior citizen assistance.",
    iconName: "Heart",
    stats: "50+ Drives Conducted",
    highlights: ["24/7 Blood donor desk", "Monsoon clean campaigns", "Emergency relief response"],
  },
  {
    id: "w4",
    title: "Skill Workshops & Career Guidance",
    description:
      "Bridging the opportunity gap with career counseling, interview training, digital skills, and student scholarship mentorship.",
    iconName: "Compass",
    stats: "400+ Students Guided",
    highlights: ["College entrance counseling", "Resume & interview bootcamps", "Student merit scholarships"],
  },
  {
    id: "w5",
    title: "Cultural Heritage & Celebrations",
    description:
      "Preserving local traditions and creating joyous communal memories through Onam carnivals, art showcases, and youth talent fests.",
    iconName: "Sparkles",
    stats: "800+ Attendees Per Event",
    highlights: ["Onam & festival carnivals", "Folk art & music showcases", "Village cultural evenings"],
  },
  {
    id: "w6",
    title: "Sustainability & Green Initiatives",
    description:
      "Protecting our local environment with native tree plantations, riverbank cleanups, plastic-reduction campaigns, and recycling.",
    iconName: "Leaf",
    stats: "2,000+ Saplings Planted",
    highlights: ["Riverbank re-greening", "Zero-plastic drives", "School eco-clubs"],
  },
];

export const WHY_JOIN: WhyJoinItem[] = [
  {
    id: "y1",
    title: "Create Real Local Impact",
    description:
      "Don't just watch from the sidelines. Directly lead and take part in projects that improve health, sports, and well-being in our village.",
    iconName: "Zap",
  },
  {
    id: "y2",
    title: "Lifelong Brotherhood & Friends",
    description:
      "Form bonds that last for decades with like-minded, ambitious, and caring young people who support each other in work and life.",
    iconName: "Smile",
  },
  {
    id: "y3",
    title: "Leadership & Event Experience",
    description:
      "Gain real-world leadership, event management, budgeting, and public speaking skills that stand out on any resume or career path.",
    iconName: "TrendingUp",
  },
  {
    id: "y4",
    title: "Play In Premier Sports Leagues",
    description:
      "Access organized sports grounds, participate in high-stakes regional tournaments, and hone athletic skills with fellow teammates.",
    iconName: "Award",
  },
  {
    id: "y5",
    title: "Volunteer Certificates & Recognition",
    description:
      "Receive official verified volunteer hours and credentials that boost college applications and job opportunities.",
    iconName: "CheckCircle2",
  },
  {
    id: "y6",
    title: "100% Free & Welcoming For All",
    description:
      "No membership fees or barriers. Every young resident between 15 and 35 in Elevo is welcome to participate and lead.",
    iconName: "ShieldCheck",
  },
];
