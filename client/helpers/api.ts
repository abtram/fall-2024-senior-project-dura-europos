import { LocationObject, LocationObjectResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

const API_URL = "http://127.0.0.1:8000"

/**
 * Hook that returns react query for getting all objects in location
 *
 * @returns React query for getting all objects in location
 */
export const useLocationObjects = () => {
  const router = useRouter();
  const { location } = router.query;

  const queryFn = async () => {
    const response = await axios.get(
      `${API_URL}/location-query`,
      {
        params: {
          location: location
        }
      }
    );

    return response.data.map((object: LocationObjectResponse) => ({
      id: object[0],
      objectId: object[1],
      name: object[2],
      link: object[3],
      imageLink: object[4],
      locationLabel: object[5],
      locationName: object[6],
      type: object[7],
      accession: object[8],
      negativeNumber: object[9],
      imageSrc: object[10],
      imageType: object[11],
    }))

    // return response.data.map((object: LocationObjectResponse) => ({
    //   id: object[0],
    //   objectId: object[1],
    //   name: object[2],
    //   locationLabel: object[3],
    //   locationName: object[4],
    //   type: object[5],
    //   accession: object[6],
    //   negativeNumber: object[7],
    //   uploadFileName: object[8],
    // }))
  };

  return useQuery<LocationObject[]>({
    queryKey: ["locationObjects", location],
    queryFn,
    enabled: Boolean(location),
  });
};

