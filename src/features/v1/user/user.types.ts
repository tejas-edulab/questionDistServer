export enum IRoles {
    SUPER_ADMIN = 'SUPER_ADMIN',
    COE_HEAD = 'COE_HEAD',
    COE_STAFF = 'COE_STAFF',
    PAPER_SETTER = 'PAPER_SETTER',
    SME = 'SME',
    MODERATOR = 'MODERATOR',
    CENTER_COORDINATOR = 'CENTER_COORDINATOR',
}


// Omitting the SUPER_ADMIN role
export enum ICreateRoles {
    COE_HEAD = 'COE_HEAD',
    COE_STAFF = 'COE_STAFF',
    PAPER_SETTER = 'PAPER_SETTER',
    SME = 'SME',
    MODERATOR = 'MODERATOR',
    CENTER_COORDINATOR = 'CENTER_COORDINATOR',
}

export interface IKeycloakRole {
    id: string,
    name: IRoles,
    description: string,
    composite: boolean,
    clientRole: boolean,
    containerId: string
}

export interface IfetchMultiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roleInfo: {
    roleId: number;
    role: string;
  }[];
}
