import {useEffect} from "react"
import "../../utils/tailwind.css"
import AOS from "aos";
import "aos/dist/aos.css"
import { textstyle } from "../../utils/global"
export default function Card({theme}){
    return(
        <a>
            <div id = "card" className="w-[45rem] h-[53rem] rounded-lg flex flex-col border-solid border-[0.3rem] font-extrabold relative gap-5" style={{borderColor: theme.color}}>
                <p className="pl-16 pt-[4rem] opacity-100 text-[4rem]" style={ textstyle } id = "heading">{theme.heading}</p>
                <h1 className="text-[8.5rem] pl-16 pt-24" style={ textstyle }>{theme.stats}</h1>
                <h2 className = "text-[2.4rem] pl-20 pt-4 font-semibold opacity-90 leading-snug whitespace-pre-wrap" style={ textstyle }><span>{theme.info}&nbsp;</span><span className="font-extrabold underline inline-block">{theme.highlight}</span>.</h2>
                <h2 className="underline font-semibold text-[2rem] pl-20 absolute bottom-0 mb-[4.5rem]" id = "src" style={ textstyle }>Source</h2>
            </div>
        </a>
    )
}