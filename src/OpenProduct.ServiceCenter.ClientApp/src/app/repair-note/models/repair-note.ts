import { RepairNoteLine } from './repair-note-line';

export interface RepairNote {
    id: string;
    capturer: string;
    lines: RepairNoteLine[];
}
