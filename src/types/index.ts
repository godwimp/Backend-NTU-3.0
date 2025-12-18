interface BaseModelData {
    id?: number;
    timestamp: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface WaterQualityMetrics {
    flow1: number;
    turbidity: number;
    ph: number;
    tds: number;
}

interface LevelMetrics {
    level1: number;
    level2: number;
}

export interface PanelAData extends BaseModelData, WaterQualityMetrics {}

export interface PanelBData extends BaseModelData, WaterQualityMetrics {}

export interface PanelCData extends BaseModelData, LevelMetrics {}

export interface PanelDData extends BaseModelData, LevelMetrics {}

export interface PanelEData extends BaseModelData, WaterQualityMetrics {}

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