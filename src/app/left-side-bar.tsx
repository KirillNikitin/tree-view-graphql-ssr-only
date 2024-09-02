'use server';

import RecursiveTree from "./recursive-tree";
import { CreateRegionsList } from "@/consts/lists";

export default async function LeftSideBar({ ...props }) {

  let regionsList = { 'edges': CreateRegionsList() };

  return <>
    <section className="left-sidebar w-[300px] font-normal border-r p-4 text-primary dark:text-slate-100 dark:font-extralight">
      <RecursiveTree
        tree={Object.keys(props).length > 0 ? props.props.dataToPresent : regionsList}
        path={Object.keys(props).length > 0 ? props.props.path : ''} />
    </section>
  </>
}

