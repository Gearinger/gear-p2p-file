export interface SendContentModel {
    sendUserName: string,
    type: string,   // 'text', 'file', 'stream'
    fileName?: string,
    fileExt?: string, // zip, jpg, png, txt...
    textContent?: string,
    byteContent?: ArrayBuffer,
    sliceNode?: string,  // 第一个分片标识为start，最后一个分片标识为end
    totalSliceCount?: Number
}