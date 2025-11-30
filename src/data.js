export const CURRENT_USER_ID = "user1";

export const lists = [
  {
    id: "1",
    title: "Nákup na víkend",
    status: "active",
    ownerId: "user1",
    items: [
      { id: "1-1", name: "Mléko", resolved: true },
      { id: "1-2", name: "Chléb", resolved: false },
      { id: "1-3", name: "Vejce", resolved: false },
    ],
    members: [
      { id: "user1", name: "Jan Novák", role: "owner" },
      { id: "user2", name: "Petra Svobodová", role: "member" },
    ],
  },
  {
    id: "2",
    title: "Grilovačka na zahradě",
    status: "active",
    ownerId: "user1",
    items: [
      { id: "2-1", name: "Steaky", resolved: false },
      { id: "2-2", name: "Zelenina na salát", resolved: false },
      { id: "2-3", name: "Uhlí / brikety", resolved: true },
    ],
    members: [
      { id: "user1", name: "Jan Novák", role: "owner" },
      { id: "user3", name: "Karel Dvořák", role: "member" },
    ],
  },
  {
    id: "3",
    title: "Vánoční nákup",
    status: "archived",
    ownerId: "user2",
    items: [
      { id: "3-1", name: "Cukroví", resolved: true },
      { id: "3-2", name: "Dárky", resolved: true },
      { id: "3-3", name: "Štědrovečerní večeře", resolved: true },
    ],
    members: [
      { id: "user2", name: "Marie Novotná", role: "owner" },
      { id: "user1", name: "Jan Novák", role: "member" },
    ],
  },
];
