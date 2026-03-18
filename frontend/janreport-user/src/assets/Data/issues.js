import bridgeImg from "./Bridge.png";
import garbageImg from "./Garbage.png";
import HospitalImg from "./Hospital.png";
import waterLeakageImg from "./Water Lekage.png";

const issues = [
  {
    id: 1,
    title: "Water logging near main road",
    status: "Pending",
    reportedOn: "2025-12-10",
    votes: 12,
    location: "Hyderabad",
    lat: 17.385,
    lng: 78.4867,
    image: waterLeakageImg,
    tracking: [
      { step: "Reported", description: "Issue reported", date: "2025-12-08" },
      { step: "Verified", description: "Verified by admin", date: "2025-12-11" },
      { step: "Assigned", description: "Assigned to department", date: null },
      { step: "In Progress", description: "Work started", date: null },
      { step: "Resolved", description: "Resolved", date: null }
    ]
  },

  {
    id: 2,
    title: "Primary Health Center Running Without Power Supply",
    status: "In Progress",
    reportedOn: "2025-12-08",
    votes: 25,
    location: "Warangal",
    lat: 17.9689,
    lng: 79.5941,
    image: HospitalImg,
    tracking: [  {
        step: "Reported",
        description: "Issue reported by citizen",
        date: "2025-12-10",
      },
      {
        step: "Verified",
        description: "Verified by admin",
        date: "2025-12-11",
      },
      {
        step: "Assigned",
        description: "Assigned to department",
        date: null,
      },
      {
        step: "In Progress",
        description: "Work started",
        date: null,
      },
      {
        step: "Resolved",
        description: "Issue resolved",
        date: null,
      },]
  },

  {
    id: 3,
    title: "Garbage overflow near school",
    status: "Resolved",
    reportedOn: "2025-12-05",
    votes: 50,
    location: "Hyderabad",
    lat: 17.4065,
    lng: 78.4772,
    image: garbageImg,
    tracking: [  {
        step: "Reported",
        description: "Issue reported by citizen",
        date: "2025-12-10",
      },
      {
        step: "Verified",
        description: "Verified by admin",
        date: "2025-12-11",
      },
      {
        step: "Assigned",
        description: "Assigned to department",
        date: null,
      },
      {
        step: "In Progress",
        description: "Work started",
        date: null,
      },
      {
        step: "Resolved",
        description: "Issue resolved",
        date: null,
      }, ]
  }
];


export default issues;

