import Link from "next/link";
import { ReactElement } from "react";

type Tree = {
  dataToPresent?: any;
  node: { id: Number, name: string };
  id: string;
  name: string;
  path?: string;
  icons?: JSX.Element[];
  edges?: Tree[];
};

type RecursiveTreeProps = {
  tree: Tree;
  path: string;
};

interface CustomDetailsProps extends Omit<Tree, "id"> {
  renderTree: ReactElement;
}

const CustomDetails = (props: CustomDetailsProps) => {

  const { icons, name, path, renderTree } = props;

  // if icons
  //const hasIcons = icons && icons.length > 0;

  return (
    <>
      <Link href={'/' + path}>
        <summary>
          <span className="text-sm truncate">{name}</span>
        </summary>
      </Link>
      {renderTree}
    </>
    /*
      if icons
     <Link href={'/' + path}>
       <summary className={hasIcons ? "custom-icons" : undefined}>
         {hasIcons && (isOpen ? icons[1] : icons[0])}
         <span className="text-sm truncate">{name}</span>
       </summary>
     </Link>
    */
  );
};

const RecursiveTree = (props: RecursiveTreeProps) => {

  const { path, tree } = props;

  let linksData: any[] = [];
  if (tree?.dataToPresent && tree?.dataToPresent.edges) {
    linksData = tree.dataToPresent.edges;
  } else if (tree && tree.edges) {
    linksData = tree.edges;
  }

  return (
    <ul>
      {linksData.map((item) => (
        <li key={`key-${(item.id || item.name) ?? (item.node?.id ?? item.node?.name)}`}>
          <CustomDetails
            icons={item.icons}
            name={(item.name ?? item.node?.name)}
            path={item.name
              ? item.name
              : path + '/' + item.node?.name}
            renderTree={<RecursiveTree tree={item} path={item.name
              ? item.name
              : path + '/' + item.node?.name} />}
            node={item.node} />
        </li>
      ))}
    </ul>
  );
};

export default RecursiveTree;