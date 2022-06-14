export class AuditStatus {
    name: string;
    count: number;
    keyOHigh: string;
    keyOLow: string;
    keyOModerate: string;
    countOHigh: number;
    countOLow: number;
    countOModerate: number;
    keyCHigh: string;
    keyCLow: string;
    keyCModerate: string;
    countCHigh: number;
    countCLow: number;
    countCModerate: number;
    // open: KeyCount[] = [];
    // close: KeyCount[] = [];

}

export class KeyCount {
    keyHigh: string;
    keyLow: string;
    keyModerate: string;
    countHigh: number;
    countLow: number;
    countModerate: number;
}