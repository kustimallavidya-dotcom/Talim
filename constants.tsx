
import React from 'react';
import { 
  Trophy, 
  MapPin, 
  Dumbbell, 
  Clock, 
  User, 
  Search, 
  Plus, 
  ShieldCheck, 
  MessageSquare,
  Calendar
} from 'lucide-react';
import { Talim, Language } from './types';

export const TRANSLATIONS = {
  [Language.EN]: {
    appName: "Talim",
    tagline: "The heartbeat of Kushti",
    searchPlaceholder: "Search by Talim, District or Coach...",
    addTalim: "Add Talim",
    explore: "Explore",
    events: "Events",
    ustadAI: "Ask Ustad AI",
    facilities: "Facilities",
    mudAkhada: "Mud Akhada",
    mat: "Wrestling Mat",
    equipment: "Equipment",
    achievements: "Achievements",
    nearby: "Nearby Talims",
    filters: "Filters",
    applyFilters: "Apply Filters"
  },
  [Language.MR]: {
    appName: "तालीम",
    tagline: "कुस्तीची पंढरी",
    searchPlaceholder: "तालीम, जिल्हा किंवा वस्ताद शोधा...",
    addTalim: "तालीम जोडा",
    explore: "शोध",
    events: "मैदान",
    ustadAI: "उस्ताद एआय",
    facilities: "सुविधा",
    mudAkhada: "मातीचा आखाडा",
    mat: "मॅट",
    equipment: "साहित्य",
    achievements: "यश",
    nearby: "जवळच्या तालमी",
    filters: "फिल्टर्स",
    applyFilters: "फिल्टर्स लावा"
  },
  [Language.HI]: {
    appName: "तालीम",
    tagline: "कुश्ती की धड़कन",
    searchPlaceholder: "तालीम, जिला या उस्ताद खोजें...",
    addTalim: "तालीम जोड़ें",
    explore: "खोज",
    events: "दंगल",
    ustadAI: "उस्ताद एआई",
    facilities: "सुविधाएं",
    mudAkhada: "मिट्टी का अखाड़ा",
    mat: "मैट",
    equipment: "सामग्री",
    achievements: "उपलब्धियां",
    nearby: "पास की तालीमें",
    filters: "फिल्टर्स",
    applyFilters: "फिल्टर्स लगाएं"
  }
};

export const MOCK_TALIMS: Talim[] = [
  {
    id: '1',
    name: 'Motibag Talim',
    ustadName: 'Vastad Hindurao Patil',
    phoneNumber: '9876543210',
    location: {
      lat: 16.7050,
      lng: 74.2433,
      city: 'Kolhapur',
      district: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India',
      address: 'Bhavani Mandap Road, Kolhapur'
    },
    facilities: {
      mudAkhada: true,
      wrestlingMat: true,
      equipment: ['Gada', 'Mugdar', 'Barbell']
    },
    timings: '5:00 AM - 9:00 AM, 5:00 PM - 8:00 PM',
    achievements: [
      { level: 'National', description: 'Produced 12 Maharashtra Kesari winners', year: 2023 }
    ],
    images: ['https://picsum.photos/seed/talim1/800/600'],
    rating: 4.8,
    reviewsCount: 156,
    status: 'approved',
    addedBy: 'admin'
  },
  {
    id: '2',
    name: 'Ganesh Talim',
    ustadName: 'Ustad Kaka Pawar',
    phoneNumber: '9822113344',
    location: {
      lat: 18.5204,
      lng: 73.8567,
      city: 'Pune',
      district: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      address: 'Shukrawar Peth, Pune'
    },
    facilities: {
      mudAkhada: false,
      wrestlingMat: true,
      equipment: ['Dumbbells', 'Rope', 'Barbell']
    },
    timings: '6:00 AM - 10:00 AM',
    achievements: [
      { level: 'International', description: 'Olympics Bronze medal preparation', year: 2020 }
    ],
    images: ['https://picsum.photos/seed/talim2/800/600'],
    rating: 4.9,
    reviewsCount: 210,
    status: 'approved',
    addedBy: 'admin'
  }
];

export const DISTRICTS = [
  "Kolhapur", "Pune", "Satara", "Sangli", "Solapur", "Ahmednagar", "Nashik", "Aurangabad", "Beed", "Mumbai"
];

export const EQUIPMENTS = ["Gada", "Mugdar", "Dumbbells", "Barbell", "Rope", "Climbing Pole"];
