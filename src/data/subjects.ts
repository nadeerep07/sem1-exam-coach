/**
 * @file subjects.ts
 * @description Module implementation for BCA Sem 1 Exam Coach platform.
 * @module src/data/subjects.ts
 */
import { SubjectMeta } from '../types/exam';

export const SUBJECTS: SubjectMeta[] = [
  {
    code: 'DCA1110',
    name: 'Environmental Science',
    examDate: '2026-08-22T15:30:00+05:30',
    credits: 4,
    description: 'Ecology, natural resources, biodiversity, pollution, conservation, and environmental legislation.',
    totalUnits: 7,
    iconName: 'Leaf',
    color: '#10b981', // emerald
  },
  {
    code: 'DCA1106',
    name: 'Technical Communication',
    examDate: '2026-08-23T12:00:00+05:30',
    credits: 2,
    description: 'Professional communication, grammar, sentence construction, business reports, emails, and public speaking.',
    totalUnits: 7,
    iconName: 'MessageSquare',
    color: '#3b82f6', // blue
  },
  {
    code: 'DCA1108',
    name: 'Fundamentals of Computers & Digital Systems',
    examDate: '2026-08-29T15:30:00+05:30',
    credits: 4,
    description: 'Computer hardware, input/output devices, number systems, Boolean logic, counters, and registers.',
    totalUnits: 14,
    iconName: 'Cpu',
    color: '#8b5cf6', // purple
  },
  {
    code: 'DCA1109',
    name: 'Introduction to Web Programming',
    examDate: '2026-08-30T15:30:00+05:30',
    credits: 4,
    description: 'HTML5, CSS layout & styling, JavaScript fundamentals, DOM manipulation, JSON, and web architectures.',
    totalUnits: 14,
    iconName: 'Globe',
    color: '#ec4899', // pink
  },
  {
    code: 'DCA1105',
    name: 'Fundamentals of Mathematics',
    examDate: '2026-09-05T15:30:00+05:30',
    credits: 4,
    description: 'Functions, limits, differentiation, Rolle’s theorem, integration, calculus applications, and partial fractions.',
    totalUnits: 14,
    iconName: 'Calculator',
    color: '#f59e0b', // amber
  },
  {
    code: 'DCA1107',
    name: 'C Programming',
    examDate: '2026-09-06T15:30:00+05:30',
    credits: 4,
    description: 'C syntax, control structures, functions, recursion, arrays, string handling, pointers, and sorting algorithms.',
    totalUnits: 14,
    iconName: 'Code',
    color: '#6366f1', // indigo
  },
];
