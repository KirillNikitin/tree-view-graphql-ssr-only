import Link from "next/link";
import { validateName } from "./helpers/functions";

export default function MainContent({ ...props }) {

  return <main className="main-content font-normal p-4 text-primary dark:text-slate-100 dark:font-extralight">
    <Link href={`/${props?.props?.region}`}> {props?.props?.region}</Link>
    {props?.props?.slug ? <span> / <Link href={`/${props?.props?.region}/${props?.props?.slug[0]}`}>{validateName(props?.props?.slug[0])}</Link></span> : ''}
    {props?.props?.slug && props?.props?.slug[1] ? <span> / <Link href={`/${props?.props?.region}/${props?.props?.slug[0]}/${props?.props?.slug[1]}`}>{validateName(props?.props?.slug[1])}</Link></span> : ''}
    {props?.props?.slug && props?.props?.slug[2] && props?.props?.slug[props.props.slug.length - 1] ? <span> / {validateName(props?.props?.slug[2])}</span> : ''}

    {props?.props?.slug && props.props.slug[2] ? <div className="w-full flex mt-2"><Link className="font-medium" href={`https://en.wikipedia.org/wiki/${props.props.slug[2]}`}>Read about {validateName(props?.props?.slug[2])}</Link></div> : null}

  </main>
} 