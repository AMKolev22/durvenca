import React from "react"
import "../../utils/tailwind.css"
import { background, textstyle} from "../../utils/global"


export default function Hero(){


    return(
        <div className="w-[100vw] h-[100vh] overflow-hidden flex flex-col justify-center items-center bg-no-repeat" id = "hero" style={background} >
            <p className="absolute text-center font-extrabold text-[10rem] leading-tight tracking-wide mb-[10%] opacity-[0.95]" style={textstyle}>Explore a nature<br /> sandbox.</p>

        </div>
    )
}