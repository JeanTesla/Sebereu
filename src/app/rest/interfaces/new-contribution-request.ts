import { MusicalGenre } from "../../enum/musical-genre.enum";
import { SheetType } from "../../enum/sheet-type.enum";

export interface NewContributionRequest {
    userId: String;
    uploadId: String;
    title: String;
    artist: String;
    arrangement: String;
    musicalGenre: MusicalGenre;
    sheetType: SheetType;
    genres: Array<String>;
    instruments: Array<String>;
}