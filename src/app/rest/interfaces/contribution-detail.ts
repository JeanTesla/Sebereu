import { MusicalGenre } from "src/app/enum/musical-genre.enum";
import { SheetType } from "src/app/enum/sheet-type.enum";

export interface ContributionDetail {
    contributionId: String;
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