import { MusicalGenre } from "../../enum/musical-genre.enum";
import { SheetType } from "../../enum/sheet-type.enum";

export interface ContributionDetail {
    contributionId: string;
    userId: string;
    arrangement: string;
    composer: string;
    views: Number;
    createdAt: Date;
    description: string;
    genrePicker: string[];
    instrumentPicker: string[];
    musicalGenre: MusicalGenre;
    sheetType: SheetType;
    title: string;
}