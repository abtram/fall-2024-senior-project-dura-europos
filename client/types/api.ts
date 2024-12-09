export type LocationObjectResponse = [
  number,
  number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

// export type LocationObjectResponse = [
//   number,
//   number,
//   string,
//   string,
//   string,
//   string,
//   string,
//   string,
//   string
// ];

export interface LocationObject {
  id: number;
  objectId: number;
  name: string;
  link: string;
  imageLink: string;
  locationLabel: string;
  locationName: string;
  type: string;
  accession: string;
  negativeNumber: string;
  imageSrc: string;
  imageType: string;
}

// export interface LocationObject {
//   id: number;
//   objectId: number;
//   name: string;
//   locationLabel: string;
//   locationName: string;
//   type: string;
//   accession: string;
//   negativeNumber: string;
//   uploadFileName: string;
// }