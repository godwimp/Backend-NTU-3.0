export interface PanelAData {
  id?: number;
  timestamp: Date;
  flow1: number;
  turbidity: number;
  ph: number;
  tds: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PanelBData {
  id?: number;
  timestamp: Date;
  flow1: number;
  turbidity: number;
  ph: number;
  tds: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PanelCData {
  id?: number;
  timestamp: Date;
  level1: number;
  level2: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PanelDData {
  id?: number;
  timestamp: Date;
  level1: number;
  level2: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PanelEData {
  id?: number;
  timestamp: Date;
  flow1: number;
  turbidity: number;
  ph: number;
  tds: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserAttributes {
  id?: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JWTPayload {
  id: number;
  email: string;
  role: string;
  name: string;
  username: string;
}

export type TimeFilter = "daily" | "weekly" | "monthly";
