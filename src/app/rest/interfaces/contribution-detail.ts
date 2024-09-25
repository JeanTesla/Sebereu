import { MusicalGenre } from "../../enum/musical-genre.enum";
import { SheetType } from "../../enum/sheet-type.enum";

export interface ContributionDetail {
    contributionId: String;
    userId: string;
    arrangement: String;
    composer: String;
    views: Number;
    createdAt: Date;
    description: String;
    genrePicker: String[];
    instrumentPicker: String[];
    musicalGenre: MusicalGenre;
    sheetType: SheetType;
    title: String | undefined;
}