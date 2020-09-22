import { RepairNoteLine } from './repair-note-line';

export class RepairNote {
    public id: string;
    public capturer: string;
    public lines: RepairNoteLine[];

    constructor() {
        this.id = '';
        this.capturer = '';
        this.lines = [];
    }
}
