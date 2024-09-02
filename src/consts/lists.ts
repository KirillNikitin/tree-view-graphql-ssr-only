import { Region } from "@/graphql/graphql";

export function CreateRegionsList() {
  return Object.values(Region)
    .map(value => ({ name: value, value }));
}