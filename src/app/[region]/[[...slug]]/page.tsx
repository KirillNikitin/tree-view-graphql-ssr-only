import { fetchDataByQuery } from "@/api"
import { CreateRegionsList } from "@/consts/lists"
import { Region } from "@/graphql/graphql"
import {
  citiesQueryByStateId,
  countriesQueryByRegion,
  stateQueryBy_StateCode_and_CountryCode,
  statesQueryByCountryId,
} from "@/graphql/queries"
import MainContent from "@/app/main-content"
import LeftSideBar from "@/app/left-side-bar"
import { ModeToggle } from "@/components/mode-toggle"
import { validateName } from "@/app/helpers/functions"

type RegionFieldToUpdate = {
  name: Region;
  value: Region;
  edges?: any[];
} | undefined

export default async function Routes(
  { params }: {
    params: {
      region: any
      slug: string[]
    },
  }) {

  let path: string = '/';
  if (params.region) {
    path += params.region
  }
  if (params.slug) {
    for (const el of params.slug) {
      path += '/' + el;
    }

  }

  console.log(path)

  let regionFieldToUpdate: RegionFieldToUpdate,
    countriesData,
    statesData,
    fullStateInfo,
    citiesData,
    dataToPresent;

  // helper function to find region, country, state, city by the name
  function _findInArray(arr: any[], val: string) {
    return arr.find((el: { node: { name: String } }) => el.node['name'] === validateName(val))
  }

  dataToPresent = { 'edges': CreateRegionsList() };

  if (params.hasOwnProperty('region')) {
    countriesData = await fetchDataByQuery(countriesQueryByRegion(params.region));

    regionFieldToUpdate = dataToPresent.edges.find(i => i.value === params.region);
    regionFieldToUpdate!.edges = countriesData.data?.countries.edges;
  }

  if (params.hasOwnProperty('slug') && params.slug.length) {
    const country = _findInArray(regionFieldToUpdate?.edges!, params.slug[0])

    statesData = await fetchDataByQuery(statesQueryByCountryId(country.node.id));
    const countryFieldToUpdate = regionFieldToUpdate!.edges!.find((i: { node: { [x: string]: string } }) => i.node['name'] === validateName(params.slug[0]));

    countryFieldToUpdate.edges = statesData.data.states.edges;

    if (params.slug.length == 2 || params.slug.length == 3) {
      const state = _findInArray(countryFieldToUpdate?.edges, params.slug[1])

      fullStateInfo = await fetchDataByQuery(
        stateQueryBy_StateCode_and_CountryCode(state.node.state_code, state.node.country_code));

      citiesData = await fetchDataByQuery(
        citiesQueryByStateId(fullStateInfo.data.state.id, state.node.country_code, 30));

      state.edges = citiesData.data.cities.edges;
    }
  }

  return (
    <>
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
      <div className="left-sidebar-grid min-h-screen">
        <MainContent props={params} />
        <LeftSideBar props={{ dataToPresent, path }} />
      </div>
    </>

  )
}

