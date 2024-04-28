import { MusicalGenre } from "../../enum/musical-genre.enum";
import { SheetType } from "../../enum/sheet-type.enum";

export interface ContributionDetail {
    contributionId: String;
    userId: String;
    arrangement: String;
    artist: String;
    views: Number;
    createdAt: String;
    description: String;
    genrePicker: String[];
    instrumentPicker: String[];
    musicalGenre: MusicalGenre;
    sheetType: SheetType;
    title: String | undefined;
}