export const ROLES_VALUES = ["CLUB", "ADMIN", "TEAM_ADMIN"] as const;

// export type Role = (typeof ROLES_VALUES)[number];

export const ROLES = {
  CLUB: "CLUB",
  ADMIN: "ADMIN",
  TEAM_ADMIN: "TEAM_ADMIN",
};

export type Role = keyof typeof ROLES;
