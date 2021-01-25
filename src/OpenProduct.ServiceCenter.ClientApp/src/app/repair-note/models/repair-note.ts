export interface RepairNote {
    id: string;
    capturer: string;
    lines: RepairNoteLine[];
}

export interface RepairNoteLine {
    partNumber: string;
    quantity: number;
}
