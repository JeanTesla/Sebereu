
export interface NewContributionRequest {
    userId: String;
    uploadId: String;
    title: String;
    artist: String;
    arrangement: String;
    genrePicker: Array<String>;
    instrumentPicker: Array<String>;
}